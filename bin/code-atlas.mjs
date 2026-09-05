#!/usr/bin/env node
// ==============================================================================
// bin/code-atlas.mjs — Multi-Stack AST Repo Map Generator (Node + @ast-grep/napi)
// ==============================================================================
// Node.js rewrite of the Bash scheduler (wisdom_app scripts/scan_repo_map.sh).
// Responsibilities: CLI parsing → path validation → dispatch to scan or merge.
// Engine/rules/output semantics live in src/*.
// ==============================================================================

import { statSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { t } from '../src/i18n.mjs'
import { VERSION } from '../src/version.mjs'

const SUPPORTED_LANGUAGES = [
  'typescript', 'javascript', 'tsx', 'python', 'go', 'dart',
  'kotlin', 'java', 'swift', 'c', 'cpp',
]

function showHelp(argv0) {
  const self = path.basename(String(argv0))
  console.log([
    t('help.usage', { self }),
    t('help.description'),
    t('help.subcommands'),
    t('help.options'),
    t('help.examples', { self }),
  ].join('\n\n'))
}

export function parseArgs(argv, argv0) {
  const opts = {
    targetDir: '.',
    outputFile: '',
    moduleName: '',
    crosslayer: true,
    excludes: [],
    maxLines: '',
    languages: '',
    languagesSet: false,
    mergeMode: false,
    mergeInputs: [],
  }
  let i = 0
  const needValue = (flag) => {
    i += 1
    if (i >= argv.length) {
      console.error(t('err.flagNeedsValue', { flag }))
      process.exit(1)
    }
    return argv[i]
  }
  while (i < argv.length) {
    const a = argv[i]
    switch (a) {
      case '-d': case '--dir': opts.targetDir = needValue(a); break
      case '-o': case '--output': opts.outputFile = needValue(a); break
      case '-n': case '--name': opts.moduleName = needValue(a); break
      case '-x': case '--no-crosslayer': opts.crosslayer = false; break
      case '-e': case '--exclude': opts.excludes.push(needValue(a)); break
      case '-m': case '--max-lines': opts.maxLines = needValue(a); break
      case '--languages': opts.languagesSet = true; opts.languages = needValue(a); break
      case '--merge': opts.mergeMode = true; break
      case '-v': case '--version':
        console.log(`code-atlas v${VERSION}`)
        process.exit(0)
        break
      case '-h': case '--help':
        showHelp(argv0)
        process.exit(0)
        break
      default:
        if (opts.mergeMode) {
          opts.mergeInputs.push(a)
        } else {
          console.error(t('err.unknownOption', { option: a }))
          showHelp(argv0)
          process.exit(1)
        }
    }
    i += 1
  }
  return opts
}

export function resolveScanConfig(opts) {
  // 与 Bash `[[ ! -d ]]` 一致：必须存在且为目录（传文件路径同样报错，退出码 1）
  let isDir = false
  try {
    isDir = statSync(opts.targetDir).isDirectory()
  } catch { /* 不存在 */ }
  if (!isDir) {
    console.error(t('err.targetDirMissing', { dir: opts.targetDir }))
    process.exit(1)
  }
  // 逻辑绝对路径（与 Bash `cd && pwd` 的逻辑 PWD 语义一致，不解析符号链接）
  const targetDirAbs = path.resolve(opts.targetDir)
  const moduleName = opts.moduleName || path.basename(targetDirAbs)
  const outputFile = opts.outputFile || path.join(targetDirAbs, `.repo_map_${moduleName}.md`)

  let langList
  if (opts.languagesSet) {
    if (opts.languages === '') {
      console.error(t('err.languagesEmpty'))
      process.exit(1)
    }
    if (opts.languages.startsWith(',') || opts.languages.endsWith(',') || opts.languages.includes(',,')) {
      console.error(t('err.languagesEmptyField', { value: opts.languages }))
      process.exit(1)
    }
    langList = opts.languages.split(',')
    for (const l of langList) {
      if (!SUPPORTED_LANGUAGES.includes(l)) {
        console.error(t('err.unsupportedLanguage', { lang: l, langs: SUPPORTED_LANGUAGES.join(',') }))
        process.exit(1)
      }
    }
  } else {
    langList = [...SUPPORTED_LANGUAGES]
  }
  return { targetDirAbs, moduleName, outputFile, langList }
}

export async function main(argv, argv0 = fileURLToPath(import.meta.url)) {
  if (argv[0] === 'install') {
    if (argv.length > 1) {
      const usage = `${path.basename(String(argv0))} install`
      console.error(t('err.installExtraArgs', { args: argv.slice(1).join(' '), usage }))
      process.exit(1)
    }
    const { installSkill } = await import('../src/install.mjs')
    process.exitCode = installSkill().code
    return
  }
  const opts = parseArgs(argv, argv0)
  // 与 Bash 版一致：merge 模式也先做目录与 --languages 校验
  const cfg = resolveScanConfig(opts)
  if (opts.mergeMode) {
    const { mergeMain } = await import('../src/merge.mjs')
    await mergeMain(opts, cfg)
    return
  }
  const { scanMain } = await import('../src/scan.mjs')
  await scanMain({ ...opts, ...cfg })
}

// Direct execution (not under test) — run main.
import { realpathSync } from 'node:fs'
if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main(process.argv.slice(2), process.argv[1])
}
