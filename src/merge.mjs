// ==============================================================================
// src/merge.mjs — 合并模式（lib.sh merge_main 的等价层）
// ==============================================================================

import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { existsSync } from 'node:fs'
import {
  assembleSymbols, assembleApi, sortUnique, excludeRows, SECTION_HEADERS,
} from './assemble.mjs'
import { buildFreshnessHeader, ensureOutputDir } from './freshness.mjs'

function grepHeaderLine(mapFile, prefix) {
  const lines = readFileSync(mapFile, 'utf8').split('\n')
  const line = lines.find((l) => l.startsWith(prefix))
  return line === undefined ? '' : line
}

// 逐输入地图按 `## ` 区头分片：🌐/🚪/🔗/📡/⚠️ 各自归片，其余进符号片；# 注释行与空行跳过
function splitSections(mapFile, buckets) {
  let section = ''
  const lines = readFileSync(mapFile, 'utf8').split('\n')
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop()
  for (const line of lines) {
    if (line.startsWith('## ')) {
      section = line.slice(3)
      continue
    }
    if (line.startsWith('#') || line === '') continue
    if (section.startsWith('🌐')) buckets.imp.push(line)
    else if (section.startsWith('🚪')) buckets.exp.push(line)
    else if (section.startsWith('🔗')) buckets.ref.push(line)
    else if (section.startsWith('📡')) buckets.api.push(line)
    else if (section.startsWith('⚠️')) buckets.war.push(line)
    else buckets.sym.push(line)
  }
}

export async function mergeMain(opts, cfg) {
  const { moduleName, outputFile, excludes } = { ...opts, ...cfg }
  const inputs = opts.mergeInputs

  if (inputs.length === 0) {
    console.error('❌ --merge 需要至少一个输入地图')
    process.exit(1)
  }
  for (const f of inputs) {
    let ok = false
    try { ok = existsSync(f) && statSync(f).isFile() } catch { ok = false }
    if (!ok) {
      console.error(`❌ 输入地图不存在: ${f}`)
      process.exit(1)
    }
  }

  const buckets = { sym: [], imp: [], exp: [], ref: [], api: [], war: [] }
  const mergedExtra = []
  let firstRoot = null
  for (const f of inputs) {
    // freshness 从输入地图自身 header 读取，不取自当前 -d
    // （r 为完整行，用于不一致警告；src/commit/wtree 为去前缀后的值）
    const strip = (prefix) => {
      const line = grepHeaderLine(f, prefix)
      return line === '' ? '' : line.slice(prefix.length)
    }
    let src = strip('# Source Path: ')
    let commit = strip('# Source Commit: ')
    let wtree = strip('# Worktree: ')
    if (src === '') src = 'unavailable'
    if (commit === '') commit = 'unavailable'
    if (wtree === '') wtree = 'unavailable'
    mergedExtra.push(`Merged Source Path: ${src} (${f})`)
    mergedExtra.push(`Merged Source Commit: ${commit} (${f})`)
    mergedExtra.push(`Merged Worktree: ${wtree} (${f})`)
    const r = grepHeaderLine(f, '# Source Path:')
    if (firstRoot === null) firstRoot = r
    else if (r !== firstRoot) {
      console.error(`⚠️ 输入地图 Source Path 不一致（${firstRoot} vs ${r}）：不同相对根下的行键可能冲突，建议在同一仓库根扫描`)
    }
    splitSections(f, buckets)
  }

  // 合并输出的 freshness 元数据：Merged from / Combined by / 逐模块三行
  const extraLines = [
    `Merged from: ${inputs.join(' ')}`,
    `Combined by: scan_repo_map.mjs v2.0.0 (merge)`,
    ...mergedExtra,
  ]
  const headerLines = buildFreshnessHeader({
    name: moduleName,
    sourcePath: cfg.targetDirAbs,
    merge: true,
    extraLines,
    langList: cfg.langList,
  })
  const headerLineCount = headerLines.length

  ensureOutputDir(outputFile)
  const out = [...headerLines]
  out.push(...assembleSymbols(excludeRows(buckets.sym, excludes), opts.maxLines))
  const total = out.length - headerLineCount

  if (buckets.imp.length > 0) {
    out.push(SECTION_HEADERS.imports)
    out.push(...sortUnique(excludeRows(buckets.imp, excludes)))
  }
  if (buckets.exp.length > 0) {
    out.push(SECTION_HEADERS.exports)
    out.push(...sortUnique(excludeRows(buckets.exp, excludes)))
  }
  if (buckets.ref.length > 0) {
    out.push(SECTION_HEADERS.backrefs)
    out.push(...sortUnique(excludeRows(buckets.ref, excludes)))
  }
  if (buckets.api.length > 0) {
    out.push(SECTION_HEADERS.api)
    out.push(...assembleApi(excludeRows(buckets.api, excludes)))
  }
  if (buckets.war.length > 0) {
    out.push(SECTION_HEADERS.warningsMerged)
    out.push(...sortUnique(buckets.war))
  }

  writeFileSync(outputFile, out.join('\n') + '\n')
  console.log(`✅ Merged [${moduleName}] -> ${outputFile} (${total} symbols)`)
}
