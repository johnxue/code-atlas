// ==============================================================================
// src/extract.mjs — 共享抽取函数（lib.sh extract_* 的等价层）
// ==============================================================================
// 每个 extract_* 对应一种规则；规则清单在 src/rules/*.mjs。
// 输出行进入 ctx 的四个桶：symbols / imports / urls / routes（对应 Bash 临时文件）。
// ==============================================================================

import {
  symname, autoKindLabel, classlikeLine, dartTopvarLine,
  importRaw, importAs, importKindDart, importKindGo, importKindJs, firstArgUrl,
} from './textproc.mjs'
import { readdirSync, statSync, readFileSync } from 'node:fs'
import path from 'node:path'

export const DEFAULT_EXCLUDES = '/node_modules/ /.git/ /build/ /.dart_tool/ /Pods/'
const DEFAULT_EXCLUDE_SUBSTRINGS = DEFAULT_EXCLUDES.split(' ').filter(Boolean)

// find 等价遍历：-not -path '*/.*'（任意隐藏段排除）+ DEFAULT_EXCLUDES 子串排除，
// 不跟随符号链接但列出符号链接本身（find 默认语义）。
export function findLikeWalk(targetDirAbs, namePredicate) {
  const out = []
  const hasHiddenSegment = (abs) => {
    const rel = path.relative(targetDirAbs, abs)
    if (!rel || rel.startsWith('..')) return false
    return rel.split(path.sep).some((seg) => seg.startsWith('.'))
  }
  const excluded = (abs) =>
    hasHiddenSegment(abs) || DEFAULT_EXCLUDE_SUBSTRINGS.some((s) => abs.includes(s))
  const visit = (dirAbs) => {
    let entries
    try {
      entries = readdirSync(dirAbs, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const abs = path.join(dirAbs, entry.name)
      if (entry.isDirectory()) {
        if (excluded(abs)) continue
        visit(abs)
      } else {
        // 符号链接：lstat 语义（find 列出链接本身，不解析目标）
        let isFile = entry.isFile()
        if (entry.isSymbolicLink()) {
          try { isFile = statSync(abs).isFile() } catch { isFile = true /* find 仍列出坏链接 */ }
        }
        if (!isFile) continue
        if (excluded(abs)) continue
        if (namePredicate(entry.name)) out.push(abs)
      }
    }
  }
  visit(targetDirAbs)
  return out.sort()
}

function relPath(targetDirAbs, abs) {
  return abs.startsWith(targetDirAbs + '/') ? abs.slice(targetDirAbs.length + 1) : abs
}

const PATTERN_ERROR_MSG = 'Warning: Pattern contains an ERROR node and may cause unexpected results.'

// extract_symbols <lang> <pattern> <prefix>
export function extractSymbols(engine, ctx, rule) {
  const { lang, pattern, label } = rule
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { pattern }, pattern)
  if (matches.length === 0 && engine.patternRootIsError(lang, pattern)) {
    engine.recordWarning(lang, pattern, PATTERN_ERROR_MSG)
  }
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line = node.range().start.line + 1
    const name = node.getMatch('NAME')?.text() ?? 'anonymous'
    ctx.symbols.push(`📁 ${rel} [L${line}] ${label} ${name}`)
  }
}

// extract_route <lang> <pattern> <prefix>：PATH → Handler 保留 API 语义
export function extractRoute(engine, ctx, rule) {
  const { lang, pattern, label } = rule
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { pattern }, pattern)
  if (matches.length === 0 && engine.patternRootIsError(lang, pattern)) {
    engine.recordWarning(lang, pattern, PATTERN_ERROR_MSG)
  }
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line = node.range().start.line + 1
    const p = node.getMatch('PATH')?.text() ?? '?'
    const name = node.getMatch('NAME')?.text() ?? 'anonymous'
    ctx.symbols.push(`📁 ${rel} [L${line}] ${label} ${p} → ${name}`)
  }
}

// extract_kinds <lang> <kind> <prefix> [auto]
export function extractKinds(engine, ctx, rule) {
  const { lang, kind, label, auto } = rule
  const subject = `kind:${kind}`
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { kind }, subject)
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line = node.range().start.line + 1
    const lbl = auto ? autoKindLabel(node.text()) : label
    ctx.symbols.push(`📁 ${rel} [L${line}] ${lbl} ${symname(node.text())}`)
  }
}

// extract_kind_jq <lang> <kind> <jqfile>：classlike / dart_topvar
export function extractKindJq(engine, ctx, rule) {
  const { lang, kind, jq, jqLang } = rule
  const subject = `kind:${kind}`
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { kind }, subject)
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line0 = node.range().start.line
    if (jq === 'classlike') {
      ctx.symbols.push(classlikeLine(jqLang ?? lang, rel, line0, node.text()))
    } else {
      ctx.symbols.push(dartTopvarLine(rel, line0, node.text()))
    }
  }
}

// extract_import <lang> <pattern> <metavar> <raw|as-strip>
export function extractImport(engine, ctx, rule) {
  const { lang, pattern, metavar, clean } = rule
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { pattern }, pattern)
  if (matches.length === 0 && engine.patternRootIsError(lang, pattern)) {
    engine.recordWarning(lang, pattern, PATTERN_ERROR_MSG)
  }
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line = node.range().start.line + 1
    const m = clean === 'as-strip' ? importAs(node.getMatch(metavar)?.text()) : importRaw(node.getMatch(metavar)?.text())
    if (m === null) continue
    ctx.imports.push(`📁 ${rel} [L${line}] import ${m}`)
  }
}

// extract_import_kind <lang> <kind> <dart|go|js>
export function extractImportKind(engine, ctx, rule) {
  const { lang, kind, mode } = rule
  const subject = `kind:${kind}`
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { kind }, subject)
  const clean = mode === 'dart' ? importKindDart : mode === 'go' ? importKindGo : importKindJs
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line = node.range().start.line + 1
    const m = clean(node.text())
    if (m === null) continue
    ctx.imports.push(`📁 ${rel} [L${line}] import ${m}`)
  }
}

// extract_urls <lang> <kind> <label>：api-call / api-route
export function extractUrls(engine, ctx, rule) {
  const { lang, kind, label } = rule
  const subject = `url-${kind}`
  if (!engine.hasLanguage(lang)) return
  const matches = engine.findAll(lang, { kind }, subject)
  for (const { file, node } of matches) {
    const rel = relPath(ctx.targetDirAbs, file)
    const line = node.range().start.line + 1
    const u = firstArgUrl(node.text())
    if (u === null) continue
    const row = `📁 ${rel} [L${line}] ${label} ${u}`
    if (label === 'api-route') ctx.routes.push(row)
    else ctx.urls.push(row)
  }
}

// extract_dart_api_lines：Dart api-call 行级启发式（kind 路线不可用）
// 正则与 perl 版逐字符一致；输出复刻 perl → `while IFS=: read` 管道的行切分行为。
export function extractDartApiLines(engine, ctx) {
  if (!ctx.langList.includes('dart')) return
  const files = findLikeWalk(ctx.targetDirAbs, (name) => name.endsWith('.dart'))
  const re = /(?:\.(?:get|post|put|delete|patch|request|download)[^(\n]*|Uri\.parse[^(\n]*)\(\s*[frubFRUB]*(['"`])(.*?)\1/gs
  for (const abs of files) {
    const f = relPath(ctx.targetDirAbs, abs)
    let src
    try {
      src = readFileSync(abs, 'utf8')
    } catch (e) {
      const msg = String(e?.message ?? e).split('\n')[0]
      engine.recordWarning('dart', `api-lines:${f}`, `Dart API 行级扫描失败: ${msg}`)
      continue
    }
    let out = ''
    re.lastIndex = 0
    let m
    while ((m = re.exec(src)) !== null) {
      const ln = 1 + (src.slice(0, m.index).split('\n').length - 1)
      const url = m[2]
      if ((url.startsWith('/') || url.includes('://')) && !url.includes('${')) {
        out += `${ln}:${url}\n`
      }
    }
    // 复刻 Bash `while IFS=: read -r dl durl`：按物理行切分、首个冒号分列
    const physical = out.split('\n')
    physical.pop() // 末尾换行产生的空段（read 在 EOF 停止）
    for (const pl of physical) {
      const i = pl.indexOf(':')
      const dl = i === -1 ? pl : pl.slice(0, i)
      const durl = i === -1 ? '' : pl.slice(i + 1)
      ctx.urls.push(`📁 ${f} [L${dl}] api-call ${durl}`)
    }
  }
}

// detect_vue：.vue SFC 已知限制提示（仅 TS/JS 相关语言启用时）
export function detectVue(engine, ctx) {
  if (!ctx.langList.some((l) => l === 'typescript' || l === 'javascript' || l === 'tsx')) return
  const n = findLikeWalk(ctx.targetDirAbs, (name) => name.endsWith('.vue')).length
  if (n > 0) {
    engine.recordWarning('note', 'vue', `检测到 ${n} 个 .vue 文件：ast-grep 无 Vue 语法，SFC 内容不会被索引；若需 Vue 支持请配合自定义 tree-sitter 语法配置`)
  }
}

export function applyRule(engine, ctx, rule) {
  if (rule.crosslayer && !ctx.crosslayer) return
  switch (rule.fn) {
    case 'symbols': return extractSymbols(engine, ctx, rule)
    case 'route': return extractRoute(engine, ctx, rule)
    case 'kinds': return extractKinds(engine, ctx, rule)
    case 'kindJq': return extractKindJq(engine, ctx, rule)
    case 'import': return extractImport(engine, ctx, rule)
    case 'importKind': return extractImportKind(engine, ctx, rule)
    case 'urls': return extractUrls(engine, ctx, rule)
    case 'dartApiLines': return extractDartApiLines(engine, ctx)
    default: return
  }
}
