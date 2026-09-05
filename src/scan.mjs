// ==============================================================================
// src/scan.mjs — 主流程调度（lib.sh scan_main + assemble_sections 的等价层）
// ==============================================================================

import { writeFileSync } from 'node:fs'
import process from 'node:process'
import { Engine } from './engine.mjs'
import { applyRule, detectVue } from './extract.mjs'
import { resolveMapPkg, normalizeImportLines } from './normalize.mjs'
import {
  assembleSymbols, assembleApi, importsGraph, fileExports, backrefs, apiSection,
  excludeRows, SECTION_HEADERS,
} from './assemble.mjs'
import { buildFreshnessHeader, ensureOutputDir } from './freshness.mjs'
import { t } from './i18n.mjs'

export async function scanMain(opts) {
  const { targetDirAbs, moduleName, outputFile, langList, crosslayer, excludes, maxLines } = opts

  // 引擎装载：文件发现 + 按语言解析并缓存 AST（对应 Bash 逐规则调 CLI）
  const engine = new Engine()
  await engine.load(targetDirAbs, langList)

  // 头部（freshness 元数据）先行，HEADER_LINES 供输出组装定位
  const headerLines = buildFreshnessHeader({ name: moduleName, sourcePath: targetDirAbs, langList })
  const headerLineCount = headerLines.length

  console.log(t('scan.start', { name: moduleName, dir: targetDirAbs }))

  const ctx = {
    targetDirAbs,
    langList,
    crosslayer,
    symbols: [],
    imports: [],
    urls: [],
    routes: [],
  }
  for (const rulesModule of [
    (await import('./rules/typescript.mjs')).RULES,
    (await import('./rules/python.mjs')).RULES,
    (await import('./rules/go.mjs')).RULES,
    (await import('./rules/dart.mjs')).RULES,
    (await import('./rules/native.mjs')).RULES,
  ]) {
    for (const rule of rulesModule) applyRule(engine, ctx, rule)
  }

  detectVue(engine, ctx)

  // 导入归一化（CROSSLAYER=1 且 imports 非空时）
  if (crosslayer && ctx.imports.length > 0) {
    const mapPkg = resolveMapPkg(targetDirAbs)
    try {
      ctx.imports = normalizeImportLines(ctx.imports, targetDirAbs, mapPkg)
      ctx.mapPkg = mapPkg
    } catch {
      engine.recordWarning('note', 'normalize', '导入归一化失败，保留原始 import 字符串')
    }
  }

  if (maxLines !== '') {
    engine.recordWarning('note', 'max-lines', `符号区已按 --max-lines=${maxLines} 截断`)
  }

  // 输出组装
  ensureOutputDir(outputFile)
  const out = [...headerLines]
  out.push(...assembleSymbols(excludeRows(ctx.symbols, excludes), maxLines))

  const total = out.length - headerLineCount

  if (ctx.imports.length > 0) {
    out.push(SECTION_HEADERS.imports)
    out.push(...importsGraph(ctx.imports, excludes))
  }

  // Bash 守卫是 `[[ -s TEMP_FILE ]]`：TEMP_FILE 含 header 恒非空 → CROSSLAYER=1 时必输出该区标题
  if (crosslayer) {
    out.push(SECTION_HEADERS.exports)
    out.push(...fileExports(ctx.symbols, excludes))
  }

  if (ctx.imports.length > 0) {
    out.push(SECTION_HEADERS.backrefs)
    out.push(...backrefs(ctx.imports, excludes, targetDirAbs, ctx.mapPkg ?? ''))
  }

  if (ctx.urls.length > 0 || ctx.routes.length > 0) {
    out.push(SECTION_HEADERS.api)
    out.push(...apiSection(ctx.routes, ctx.urls, excludes))
  }

  if (engine.warnings.length > 0) {
    out.push(SECTION_HEADERS.warnings)
    out.push(...engine.warnings)
  }

  writeFileSync(outputFile, out.join('\n') + '\n')

  console.log(t('scan.done', { name: moduleName, file: outputFile, total }))

  if (engine.warnings.length > 0) {
    console.error(t('scan.warningsFooter', { count: engine.warnings.length }))
    for (const w of engine.warnings) console.error(w)
  }
}
