// ==============================================================================
// src/normalize.mjs — 导入归一化 + 外部依赖折叠（normalize_imports.pl / collapse_external.pl 等价层）
// ==============================================================================

import fs from 'node:fs'
import path from 'node:path'

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// resolve_map_pkg：pubspec.yaml 的 name（Dart package:self 判别依据）。
// 只看 <dir>/pubspec.yaml 或 <dir>/../pubspec.yaml 第一个存在的文件；无 name: 行则空串。
export function resolveMapPkg(targetDirAbs) {
  for (const p of [path.join(targetDirAbs, 'pubspec.yaml'), path.join(targetDirAbs, '..', 'pubspec.yaml')]) {
    if (!fs.existsSync(p)) continue
    const text = fs.readFileSync(p, 'utf8')
    for (const line of text.split('\n')) {
      const m = line.match(/^name:[ \t\v\f\r]*/)
      if (m) return line.slice(m[0].length).replace(/[ "']/g, '')
    }
    return ''
  }
  return ''
}

// normalize_imports.pl 逐分支移植。lines 为中间态 import 行数组。
export function normalizeImportLines(lines, base, pkg) {
  const cache = new Map()
  const fexists = (r) => {
    if (cache.has(r)) return cache.get(r)
    let v = false
    try { v = fs.existsSync(path.join(base, r)) } catch { v = false }
    cache.set(r, v)
    return v
  }
  const canon = (p) => {
    const out = []
    for (const seg of p.split('/')) {
      if (seg === '' || seg === '.') continue
      if (seg === '..') {
        if (out.length > 0 && out[out.length - 1] !== '..') out.pop()
        continue
      }
      out.push(seg)
    }
    return out.join('/')
  }
  const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.dart', '.py']
  const indexExts = ['/index.ts', '/index.tsx', '/index.js', '/index.jsx', '/__init__.py']

  const out = []
  for (const line of lines) {
    const m = line.match(/^📁 (.*) \[L(\d+)\] import (.*)$/)
    if (!m) { out.push(line); continue }
    const f = m[1]
    const ln = m[2]
    let mod = m[3]
    let newM
    const dir = f.replace(/\/[^/]*$/, '')
    if (/^\.{1,2}\//.test(mod)) {
      // ./ ../ 相对路径
      const c = canon(`${dir}/${mod}`)
      if (fexists(c)) {
        newM = c
      } else {
        for (const e of exts) { if (fexists(`${c}${e}`)) { newM = `${c}${e}`; break } }
        if (newM === undefined) {
          for (const e of indexExts) { if (fexists(`${c}${e}`)) { newM = `${c}${e}`; break } }
        }
        if (newM === undefined) newM = c // 降级：文本归一化结果仍跨引用者一致
      }
    } else if (/\.(dart|ts|tsx|js|jsx)$/.test(f) && /^[\w./-]+\.(dart|ts|tsx|js|jsx)$/.test(mod) && !mod.startsWith('/')) {
      // 同目录裸文件名导入（import 'auth_interceptor.dart'），按引用者目录解析
      const c = canon(`${dir}/${mod}`)
      if (fexists(c)) newM = c
    } else if (/\.py$/.test(f) && /^(\.+)([\w.]+)?$/.test(mod)) {
      // python 相对导入 from ..core import x
      const mm = mod.match(/^(\.+)([\w.]+)?$/)
      const ups = mm[1].length - 1
      let rest = mm[2] ?? ''
      rest = rest.replace(/\./g, '/')
      let d = dir
      for (let i = 0; i < ups; i++) d = d.replace(/\/[^/]*$/, '')
      const c = canon(rest === '' ? d : `${d}/${rest}`)
      if (fexists(`${c}.py`)) newM = `${c}.py`
      else if (fexists(`${c}/__init__.py`)) newM = `${c}/__init__.py`
      else if (fexists(c)) newM = c
    } else if (/\.py$/.test(f) && /^[A-Za-z_]\w*(\.[A-Za-z_]\w*)*$/.test(mod)) {
      // python 绝对导入
      const c = mod.replace(/\./g, '/')
      if (fexists(`${c}.py`)) newM = `${c}.py`
      else if (fexists(`${c}/__init__.py`)) newM = `${c}/__init__.py`
    } else if (/^package:[^/]+\/(.+)$/.test(mod)) {
      // dart package:...
      const rest = mod.match(/^package:[^/]+\/(.+)$/)[1]
      if (pkg !== '' && new RegExp(`^package:${escapeRe(pkg)}/`).test(mod)) {
        newM = `lib/${rest}` // 自身包：按 pubspec name 判别，不依赖文件存在
      } else if (fexists(`lib/${rest}`)) newM = `lib/${rest}`
      else if (fexists(`src/${rest}`)) newM = `src/${rest}`
    }
    if (newM !== undefined) mod = newM
    out.push(`📁 ${f} [L${ln}] import ${mod}`)
  }
  return out
}

// collapse_external.pl 逐分支移植。输入 `module\tcnt\tfiles` 聚合行；仅折叠可证实外部依赖。
export function collapseExternalLines(lines, base, pkg) {
  const nmRoots = [base, path.join(base, '..'), path.join(base, '..', '..')]
    .filter((r) => { try { return fs.statSync(path.join(r, 'node_modules')).isDirectory() } catch { return false } })
  const out = []
  for (const line of lines) {
    const i1 = line.indexOf('\t')
    const i2 = i1 === -1 ? -1 : line.indexOf('\t', i1 + 1)
    if (i1 === -1 || i2 === -1) { out.push(line); continue }
    const m = line.slice(0, i1)
    const cnt = line.slice(i1 + 1, i2)
    let ext = false
    if (/^dart:/.test(m)) {
      ext = true
    } else if (/^package:/.test(m)) {
      ext = !(pkg !== '' && new RegExp(`^package:${escapeRe(pkg)}/`).test(m))
    } else if (/^[A-Za-z0-9._-]+$/.test(m) || /^@[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/.test(m)) {
      for (const r of nmRoots) {
        try { if (fs.existsSync(path.join(r, 'node_modules', m))) { ext = true; break } } catch { /* 略 */ }
      }
    }
    // python 裸名 / Java/Kotlin/Swift/Go 包路径 / TS 别名：无法证实为外部 → 保留
    out.push(ext ? `${m}\t${cnt}\tEXTERNAL` : line)
  }
  return out
}
