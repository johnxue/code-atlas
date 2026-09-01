// ==============================================================================
// src/engine.mjs — run_ast_grep 等价层
// ==============================================================================
// Bash 版每条规则 = 一次 `ast-grep run --lang L (--pattern P | --kind K) --json DIR`。
// Node 版：对每个语言的全部文件解析一次并缓存 AST，然后对缓存 root 执行 findAll
// （纯查询，结果与逐规则独立调用 CLI 一致）。
//
// 错误语义（对齐 lib.sh run_ast_grep）：
//   - 该语言在目录下无文件 → 合法空结果，静默跳过（CLI rc=1）
//   - pattern 含 ERROR 节点 → 记诊断 `⚠️ [lang/subject] <msg>`，该规则返回空，不阻断
//   - 查询非法（未知 kind 等）→ 记诊断，该规则返回空，不阻断
//   - 文件解析失败 → 记诊断，跳过该文件继续
//   - 未知语言名 → 记诊断并跳过
//
// 文件发现复刻 ast-grep CLI（ignore crate）行为：
//   - 隐藏目录跳过、隐藏文件包含；不跟随符号链接
//   - 尊重 .gitignore（含扫描根的全部祖先目录，git / 非 git 目录均生效）
//   - 无内置目录排除（node_modules 等仅由 .gitignore / dart 行级 find 排除）
// ==============================================================================

import { createRequire } from 'node:module'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { parse, parseAsync, registerDynamicLanguage } from '@ast-grep/napi'

const require = createRequire(import.meta.url)

// 语言 → 扩展名映射：与 ast-grep CLI 0.45.2 的 from_extension 实测一致（.h 归 c，不归 cpp）
export const LANG_EXTENSIONS = {
  typescript: ['ts', 'mts', 'cts'],
  javascript: ['js', 'cjs', 'jsx', 'mjs'],
  tsx: ['tsx'],
  python: ['py', 'pyi'],
  go: ['go'],
  kotlin: ['kt', 'ktm', 'kts'],
  java: ['java'],
  swift: ['swift'],
  c: ['c', 'h'],
  cpp: ['cpp', 'cc', 'cxx', 'hpp', 'hh', 'cu', 'ino'],
  dart: ['dart'],
}

// 需要注册的动态语言：语言名 → npm 包说明符 / 本仓包
const DYNAMIC_LANG_PACKAGES = {
  python: '@ast-grep/lang-python',
  go: '@ast-grep/lang-go',
  kotlin: '@ast-grep/lang-kotlin',
  java: '@ast-grep/lang-java',
  swift: '@ast-grep/lang-swift',
  c: '@ast-grep/lang-c',
  cpp: '@ast-grep/lang-cpp',
  dart: '@scan-repo-map/lang-dart',
}

let registered = false
function registerLanguages(langList) {
  if (registered) return
  const registrations = {}
  for (const lang of langList) {
    const pkgName = DYNAMIC_LANG_PACKAGES[lang]
    if (!pkgName) continue
    let reg
    try {
      reg = require(pkgName)
    } catch (e) {
      throw new Error(`语言包加载失败 (${lang}): ${e.message}`)
    }
    if (!reg || typeof reg.libraryPath !== 'string') {
      throw new Error(`语言包 ${pkgName} 的 libraryPath 不可解析（prebuild 未就位）`)
    }
    registrations[lang] = reg
  }
  if (Object.keys(registrations).length > 0) {
    registerDynamicLanguage(registrations)
  }
  registered = true
}

// ----------------------------------------------------------------
// gitignore 匹配（对齐 ignore crate：祖先目录 + 行走中发现的 .gitignore）
// ----------------------------------------------------------------
function parseIgnoreFile(text) {
  const rules = []
  for (let raw of text.split('\n')) {
    // 去掉未被转义的尾随空格
    raw = raw.replace(/(?<!\\)\s+$/, '')
    if (raw === '' || raw.startsWith('#')) continue
    let negated = false
    if (raw.startsWith('!')) { negated = true; raw = raw.slice(1) }
    let dirOnly = false
    if (raw.endsWith('/')) { dirOnly = true; raw = raw.slice(0, -1) }
    let anchored = false
    if (raw.startsWith('/')) { anchored = true; raw = raw.slice(1) }
    else if (raw.includes('/')) anchored = true
    // glob → regex：** 跨段；* / ? 不跨段；[...] 原样
    let re = ''
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i]
      if (ch === '*') {
        if (raw[i + 1] === '*') {
          // `**` 或 `/**/`
          if (raw[i + 2] === '/') { re += '(?:.*/)?'; i += 2 } else { re += '.*'; i += 1 }
        } else re += '[^/]*'
      } else if (ch === '?') re += '[^/]'
      else if (ch === '[') {
        const end = raw.indexOf(']', i + 1)
        if (end === -1) { re += '\\[' } else { re += raw.slice(i, end + 1); i = end }
      } else re += ch.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    }
    const body = anchored ? `^${re}(?:/.*)?$` : `(?:^|/)${re}(?:/.*)?$`
    rules.push({ negated, dirOnly, regex: new RegExp(body) })
  }
  return rules
}

class IgnoreStack {
  constructor() {
    // 浅→深的 ruleset 列表：{ dir(绝对路径), rules }
    this.stack = []
  }
  add(dir, text) {
    this.stack.push({ dir, rules: parseIgnoreFile(text) })
  }
  // 返回最深匹配规则的结果：true=忽略 false=显式不忽略 null=无规则命中
  ignored(relAbsPath, isDir) {
    let result = null
    for (const { dir, rules } of this.stack) {
      const rel = path.relative(dir, relAbsPath)
      if (rel.startsWith('..') || path.isAbsolute(rel)) continue
      const relPosix = rel.split(path.sep).join('/')
      for (const rule of rules) {
        if (rule.dirOnly && !isDir) continue
        if (rule.regex.test(relPosix)) result = !rule.negated
      }
    }
    return result
  }
}

function collectAncestorIgnores(rootAbs, stack) {
  const dirs = []
  let cur = rootAbs
  while (true) {
    dirs.push(cur)
    const parent = path.dirname(cur)
    if (parent === cur) break
    cur = parent
  }
  dirs.reverse() // 浅→深
  for (const d of dirs) {
    const f = path.join(d, '.gitignore')
    if (existsSync(f)) {
      try { stack.add(d, readFileSync(f, 'utf8')) } catch { /* 不可读则跳过 */ }
    }
  }
}

// ----------------------------------------------------------------
// 文件发现：单次遍历，按语言分组
// ----------------------------------------------------------------
export function collectLanguageFiles(targetDirAbs, langList) {
  const extToLang = {}
  for (const lang of langList) {
    const exts = LANG_EXTENSIONS[lang]
    if (!exts) continue
    for (const e of exts) extToLang[e] = lang
  }
  const byLang = {}
  for (const lang of new Set(Object.values(extToLang))) byLang[lang] = []
  if (Object.keys(extToLang).length === 0) return byLang

  const ignore = new IgnoreStack()
  collectAncestorIgnores(targetDirAbs, ignore)

  const visit = (dirAbs) => {
    const gitignore = path.join(dirAbs, '.gitignore')
    if (existsSync(gitignore)) {
      try { ignore.add(dirAbs, readFileSync(gitignore, 'utf8')) } catch { /* 跳过 */ }
    }
    let entries
    try {
      entries = readdirSync(dirAbs, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const abs = path.join(dirAbs, entry.name)
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.')) continue // 隐藏目录跳过
        if (ignore.ignored(abs, true) === true) continue // 被忽略的目录整棵剪掉
        visit(abs)
      } else if (entry.isFile()) {
        if (ignore.ignored(abs, false) === true) continue
        const ext = path.extname(entry.name).slice(1)
        const lang = extToLang[ext]
        if (lang) byLang[lang].push(abs)
      }
      // 符号链接不跟随（与 CLI 一致）
    }
  }
  visit(targetDirAbs)
  for (const lang of Object.keys(byLang)) byLang[lang].sort()
  return byLang
}

// ----------------------------------------------------------------
// AST 缓存 + 查询
// ----------------------------------------------------------------
// CLI（crates/language/src/lib.rs）的 pre_process_pattern：解析 pattern 前把元变量
// 前缀 `$` 换成该语言的 expando 字符（该语言标识符不接受 `$` 时）；stub 语言不处理。
const EXPANDO_CHARS = {
  typescript: null,
  javascript: null,
  tsx: null,
  dart: null,
  java: null,
  python: 'µ',
  go: 'µ',
  kotlin: 'µ',
  swift: 'µ',
  c: '𐀀',
  cpp: '𐀀',
}

function preProcessPattern(lang, query) {
  const expando = EXPANDO_CHARS[lang]
  if (!expando) return query
  let ret = ''
  let dollarCount = 0
  for (const c of query) {
    if (c === '$') {
      dollarCount++
      continue
    }
    // $A / $$A / $$$A（具名元变量首字符 A-Z 或 _）；$$$(匿名多捕获) 无论后随
    const needReplace = /[A-Z_]/.test(c) || dollarCount === 3
    ret += (needReplace ? expando : '$').repeat(dollarCount)
    dollarCount = 0
    ret += c
  }
  ret += (dollarCount === 3 ? expando : '$').repeat(dollarCount)
  return ret
}

export class Engine {
  constructor() {
    this.scans = new Map() // lang → [{ abs, rel, root }]
    this.warnings = []
    this.patternErrorCache = new Map() // `${lang}\u0000${pattern}` → bool
  }

  recordWarning(lang, subject, message) {
    const subj = String(subject).replace(/\n/g, ' ')
    this.warnings.push(`⚠️ [${lang}/${subj}] ${message}`)
  }

  async load(targetDirAbs, langList) {
    registerLanguages(langList)
    const byLang = collectLanguageFiles(targetDirAbs, langList)
    for (const lang of Object.keys(byLang)) {
      const files = byLang[lang]
      if (files.length === 0) continue // 无文件：合法空结果，静默跳过
      const roots = await parsePool(lang, files, (abs) => {
        // 解析失败：记诊断，跳过该文件
        const rel = abs.startsWith(targetDirAbs + '/') ? abs.slice(targetDirAbs.length + 1) : abs
        this.recordWarning(lang, `parse:${rel}`, '文件解析失败，已跳过')
        return null
      })
      const entries = []
      for (let i = 0; i < files.length; i++) {
        const root = roots[i]
        if (!root) continue
        const abs = files[i]
        const rel = abs.startsWith(targetDirAbs + '/') ? abs.slice(targetDirAbs.length + 1) : abs
        entries.push({ abs, rel, root })
      }
      this.scans.set(lang, entries)
    }
  }

  hasLanguage(lang) {
    return this.scans.has(lang)
  }

  // 对齐 CLI 的 PatternHasError 语义（run.rs）：
  //   仅 pattern 规则、且本次运行零匹配、且 pattern 根节点 kind == ERROR 时告警。
  // pattern 解析 = 原文解析（Dart/TS 等的 $METAVAR 由各语言语法/标识符规则天然吸收，
  // ast-grep 的 Pattern::has_error 只看 pattern 根节点，不深查子树）。
  patternRootIsError(lang, pattern) {
    const key = `${lang}\u0000${pattern}`
    if (this.patternErrorCache.has(key)) return this.patternErrorCache.get(key)
    let isErr = false
    try {
      const processed = preProcessPattern(lang, pattern)
      const kids = parse(lang, processed).root().children()
      // children != 1 对应 CLI PatternError（NoContent/MultipleNode），按错误处理
      isErr = kids.length !== 1 || kids[0].kind() === 'ERROR'
    } catch {
      isErr = true
    }
    this.patternErrorCache.set(key, isErr)
    return isErr
  }

  // 对语言全量缓存 root 执行 findAll；返回 { file, node } 列表
  // 查询失败 → 记诊断并返回空（不阻断）
  findAll(lang, ruleArg, subject) {
    const scan = this.scans.get(lang)
    if (!scan) return []
    const out = []
    for (const { abs, root } of scan) {
      let matches
      try {
        matches = root.findAll({ rule: ruleArg })
      } catch (e) {
        const firstLine = String(e?.message ?? e).split('\n')[0]
        this.recordWarning(lang, subject, `ast-grep 执行失败: ${firstLine}`)
        return out
      }
      for (const node of matches) out.push({ file: abs, node })
    }
    return out
  }
}

async function parsePool(lang, files, onError) {
  const CONCURRENCY = 8
  const results = new Array(files.length)
  let next = 0
  async function worker() {
    while (next < files.length) {
      const i = next++
      try {
        const src = readFileSync(files[i], 'utf8')
        results[i] = (await parseAsync(lang, src)).root()
      } catch {
        results[i] = null
        onError(files[i])
      }
    }
  }
  const workers = []
  for (let i = 0; i < Math.min(CONCURRENCY, files.length); i++) workers.push(worker())
  await Promise.all(workers)
  return results
}
