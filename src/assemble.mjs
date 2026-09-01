// ==============================================================================
// src/assemble.mjs — 排序/去重/截断 + 各区组装（lib.sh assemble_* 的等价层）
// ==============================================================================
// 全部排序 = LC_ALL=C 字节序（Buffer.compare）；数值行号列按数值升序；
// sort 的 tie-break = 整行字节序（BSD/GNU sort 的 last-resort 比较语义）。
// ==============================================================================

import { collapseExternalLines } from './normalize.mjs'

export const SYMBOL_ROW_RE = /^📁 (.*) \[L(\d+)\] (\S+) (.*)$/
export const IMPORT_ROW_RE = /^📁 (.*) \[L(\d+)\] import (.*)$/
export const API_ROW_RE = /^📁 (.*) \[L(\d+)\] (api-\S+) (.*)$/

export function byteCompare(a, b) {
  return Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'))
}

// sort -u：字节序排序后去重（整行为键）
export function sortUnique(lines) {
  const sorted = [...lines].sort(byteCompare)
  const out = []
  for (const l of sorted) {
    if (out.length === 0 || out[out.length - 1] !== l) out.push(l)
  }
  return out
}

// exclude_rows：行内容含任一排除子串即丢
export function excludeRows(lines, excludes) {
  if (!excludes || excludes.length === 0) return lines
  return lines.filter((line) => !excludes.some((e) => e !== '' && line.includes(e)))
}

// 组装管道排序键：路径字节序 → 行号数值 → 整行字节序（last-resort tie-break）
function rowComparator(a, b) {
  const p = byteCompare(a.f, b.f)
  if (p !== 0) return p
  if (a.ln !== b.ln) return a.ln - b.ln
  return byteCompare(a.raw, b.raw)
}

// 符号区标签优先级（靠前优先；不在列表 = -1 最低）
const LABEL_PRIORITY = [
  'nest-controller', 'nest-service', 'nest-module', 'typeorm-entity', 'room-entity', 'room-dao',
  'hilt-module', 'composable', 'swiftui-view', 'final-class', 'data-class', 'sealed-class',
  'sealed-interface', 'abstract-class', 'object-singleton', 'dataclass', 'pydantic-model',
  'orm-model', 'django-model', 'typed-dict', 'tortoise-model', 'mixin', 'extension', 'type-alias',
  'cpp-namespace', 'namespace', 'zod-schema', 'valibot-schema', 'typebox-schema', 'zustand-store',
  'pinia-store', 'redux-slice', 'redux-thunk', 'trpc-router', 'hono-app', 'express-router',
  'custom-hook', 'react-context', 'forward-ref-component', 'memo-component', 'default-component',
  'react-component', 'const-func', 'async-const-func', 'vue-component', 'enum', 'interface', 'class',
]
const PRIO = new Map(LABEL_PRIORITY.map((l, i) => [l, LABEL_PRIORITY.length - 1 - i]))

// assemble_symbols：排序 → 同 (路径,行号,名字) 去重（更具体标签优先）→ 可选截断
export function assembleSymbols(lines, maxLines) {
  const rows = lines.map((raw) => {
    const m = raw.match(SYMBOL_ROW_RE)
    if (!m) return { raw, f: raw, ln: 0, label: '', name: '' }
    return { raw, f: m[1], ln: Number(m[2]), label: m[3], name: m[4] }
  })
  rows.sort(rowComparator)
  const out = []
  let prev = null
  const flush = () => { if (prev) out.push(prev.raw) }
  for (const row of rows) {
    if (prev && prev.f === row.f && prev.ln === row.ln && prev.name === row.name) {
      // 同键：仅当新行优先级严格更高才替换（等优先级保留先出现者）
      const np = PRIO.get(row.label) ?? -1
      const pp = PRIO.get(prev.label) ?? -1
      if (np > pp) prev = row
      continue
    }
    flush()
    prev = row
  }
  flush()
  if (maxLines !== '' && maxLines !== undefined && maxLines !== null) {
    const n = Number(maxLines)
    if (!Number.isNaN(n)) return out.slice(0, n)
  }
  return out
}

// assemble_api：同键去重，api-route 定义优先于 api-call 调用点
export function assembleApi(lines) {
  const rows = []
  for (const raw of lines) {
    const m = raw.match(API_ROW_RE)
    if (!m) continue // NF < 4 { next }
    rows.push({ raw, f: m[1], ln: Number(m[2]), label: m[3], name: m[4] })
  }
  rows.sort(rowComparator)
  const out = []
  let prev = null
  const flush = () => { if (prev) out.push(prev.raw) }
  for (const row of rows) {
    if (prev && prev.f === row.f && prev.ln === row.ln && prev.name === row.name) {
      if (row.label === 'api-route') prev = row
      continue
    }
    flush()
    prev = row
  }
  flush()
  return out
}

// 🌐 导入图谱：按路径聚合，同文件模块按行号序拼接（不去重）
export function importsGraph(importLines, excludes) {
  const rows = []
  for (const raw of sortUnique(importLines)) {
    for (const line of excludeRows([raw], excludes)) {
      const m = line.match(IMPORT_ROW_RE)
      if (!m) continue // NF < 3 { next }
      rows.push({ f: m[1], ln: Number(m[2]), mod: m[3], raw: line })
    }
  }
  rows.sort(rowComparator)
  const out = []
  let cur = null
  const flush = () => {
    if (cur) out.push(`📁 ${cur.f} [L${cur.firstLine}] imports(${cur.cnt}): ${cur.mods.join(', ')}`)
  }
  for (const row of rows) {
    if (!cur || cur.f !== row.f) {
      flush()
      cur = { f: row.f, firstLine: row.ln, cnt: 0, mods: [] }
    }
    cur.mods.push(row.mod)
    cur.cnt++
  }
  flush()
  return out
}

// 🚪 文件符号清单：符号区原始行 → 取名字最后一段 → 跳过 anonymous/? → 按路径聚合
export function fileExports(symbolLines, excludes) {
  const rows = []
  for (const raw of excludeRows(symbolLines, excludes)) {
    const m = raw.match(SYMBOL_ROW_RE)
    if (!m) continue
    rows.push({ f: m[1], name: m[4], raw: `${m[1]}\t${m[4]}` })
  }
  // sort -k1,1：路径字节序，tie-break 整行（= name 序）
  rows.sort((a, b) => {
    const p = byteCompare(a.f, b.f)
    if (p !== 0) return p
    return byteCompare(a.raw, b.raw)
  })
  const out = []
  let cur = null
  const flush = () => {
    if (!cur) return
    const n = cur.names.length
    const lim = Math.min(n, 25)
    let s = cur.names.slice(0, lim).join(', ')
    if (n > 25) s += ` …+${n - 25}`
    out.push(`🚪 ${cur.f} exports(${n}): ${s}`)
  }
  for (const row of rows) {
    const parts = row.name.split(' ')
    const nm = parts[parts.length - 1]
    if (nm === 'anonymous' || nm === '?') continue
    if (!cur || cur.f !== row.f) {
      flush()
      cur = { f: row.f, names: [], seen: new Set() }
    }
    if (!cur.seen.has(nm)) {
      cur.seen.add(nm)
      cur.names.push(nm)
    }
  }
  flush()
  return out
}

// 🔗 反向引用：按模块聚合（同模块同文件去重），名单最多 10 个，再整行排序 + 外部折叠
export function backrefs(importLines, excludes, targetDirAbs, mapPkg) {
  const rows = []
  for (const raw of sortUnique(importLines)) {
    for (const line of excludeRows([raw], excludes)) {
      const m = line.match(IMPORT_ROW_RE)
      if (!m) continue
      rows.push({ f: m[1], mod: m[3], raw: line })
    }
  }
  // sort -k3,3 -k1,1：模块序 → 文件序 → 整行 tie-break
  rows.sort((a, b) => {
    const c1 = byteCompare(a.mod, b.mod)
    if (c1 !== 0) return c1
    const c2 = byteCompare(a.f, b.f)
    if (c2 !== 0) return c2
    return byteCompare(a.raw, b.raw)
  })
  const aggregated = []
  let cur = null
  const flush = () => {
    if (!cur) return
    const n = cur.cnt
    const lim = Math.min(n, 10)
    let files = cur.files.slice(0, lim).join(', ')
    if (n > 10) files += ` …+${n - 10}`
    aggregated.push(`${cur.mod}\t${n}\t${files}`)
  }
  for (const row of rows) {
    if (!cur || cur.mod !== row.mod) {
      flush()
      cur = { mod: row.mod, cnt: 0, files: [], seen: new Set() }
    }
    if (!cur.seen.has(row.f)) {
      cur.seen.add(row.f)
      cur.cnt++
      cur.files.push(row.f)
    }
  }
  flush()
  const collapsed = collapseExternalLines(aggregated.sort(byteCompare), targetDirAbs, mapPkg)
  return collapsed.map((line) => {
    const i1 = line.indexOf('\t')
    const i2 = line.indexOf('\t', i1 + 1)
    const m = line.slice(0, i1)
    const cnt = line.slice(i1 + 1, i2)
    const files = line.slice(i2 + 1)
    if (files === 'EXTERNAL') return `🔗 ${m} (${cnt} importers, external)`
    return `🔗 ${m} (${cnt} importers): ${files}`
  })
}

// 📡 API 区：sort -u(routes) 与 sort -u(urls) 拼接 → exclude → assemble_api
export function apiSection(routes, urls, excludes) {
  const combined = [...sortUnique(routes), ...sortUnique(urls)]
  return assembleApi(excludeRows(combined, excludes))
}

export const SECTION_HEADERS = {
  imports: '\n## 🌐 导入图谱（跨层链路：文件 → 依赖模块）\n\n',
  exports: '\n## 🚪 文件符号清单（文件内符号全集，跨层链路终点）\n\n',
  backrefs: '\n## 🔗 反向引用：被导入模块 ← 引用文件（改动影响面）\n\n',
  api: '\n## 📡 API 路径（api-route 路由定义 / api-call 调用点，跨端链路线索）\n\n',
  warnings: '\n## ⚠️ 诊断（本次扫描中的 ast-grep 问题）\n\n',
  warningsMerged: '\n## ⚠️ 诊断（原各模块扫描中的 ast-grep 问题）\n\n',
}
