#!/usr/bin/env node
// ==============================================================================
// bin/scan_repo_map.mjs — Multi-Stack AST Repo Map Generator (Node + @ast-grep/napi)
// ==============================================================================
// Node.js rewrite of the Bash scheduler (wisdom_app scripts/scan_repo_map.sh).
// Responsibilities: CLI parsing → path validation → dispatch to scan or merge.
// Engine/rules/output semantics live in src/*.
// ==============================================================================

import { statSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { VERSION } from '../src/version.mjs'

const SUPPORTED_LANGUAGES = [
  'typescript', 'javascript', 'tsx', 'python', 'go', 'dart',
  'kotlin', 'java', 'swift', 'c', 'cpp',
]

function showHelp(argv0) {
  const self = path.basename(String(argv0))
  console.log(`Usage: ${self} [OPTIONS]

High-performance Multi-Stack AST Repo Map Generator using ast-grep.
Supports: React/TS/TSX, Python, Go, Flutter (Dart), Android (Kotlin/Java), iOS (Swift/C/C++).

已知限制:
  - Vue (.vue SFC) 与 Objective-C (.m/.mm) 无 tree-sitter 语法，ast-grep 无法解析，不索引
    （检测到 .vue 文件时会输出警告；Vue 相关 pattern 仅覆盖 .ts/.js 中直接调用其 API 的场景）
  - 自动跳过 DEFAULT_EXCLUDES 列出的目录（node_modules/、.git/、build/、.dart_tool/、Pods/）
  - 地图包含四个跨层索引区：🌐 导入图谱（文件→依赖）、🚪 文件符号清单（文件内符号全集）、
    🔗 反向引用（模块←引用它的文件）、📡 API 路径（api-route 路由定义 / api-call 调用点，启发式）
  - Dart 的 api-call 为行级启发式（调用形态 + URL 字面量三重过滤），跨多行的调用不覆盖
  - 导入归一化：相对路径（./ ../）、Python 点式导入、Dart package:self（按 pubspec name 判别）
    会解析为仓库相对路径后再聚合；找不到目标文件的相对导入按文本归一化结果聚合；
    TS 路径别名（@/、~/ 等）不解析，按原字符串聚合
  - 🔗 区对可证实的外部依赖（dart:* / package:非self / node_modules 可证实的 JS 裸包名）
    折叠 importer 名单为 "(N importers, external)"；具体引用文件可在 🌐 区 grep 模块名获得

Options:
  -d, --dir <path>       Target source directory to scan (default: current directory '.')
  -o, --output <file>    Output markdown file path (default: <target_dir>/.repo_map_<name>.md)
  -n, --name <tag>       Module name tag (default: target folder name)
  -x, --no-crosslayer   Skip all cross-layer sections (smaller map; symbol map only)
  -e, --exclude <sub>    Exclude rows whose relative path contains <sub> (repeatable; no '|' in value)
  -m, --max-lines <N>    Trim symbol section to N rows (safety belt for huge repos)
  --languages <csv>      Scan only these languages (comma-separated, no spaces):
                         typescript,javascript,tsx,python,go,dart,kotlin,java,swift,c,cpp
                         (default: all supported languages)
  --merge <map...>       Merge previously generated maps (assume same Source Path root; -o/-n apply)
  -v, --version          Show script version
  -h, --help             Show this help message

Examples:
  ./bin/scan_repo_map.mjs -d ./admin-web -n frontend
  ./bin/scan_repo_map.mjs -d ./backend -n backend -o ./docs/backend_map.md
  ./bin/scan_repo_map.mjs -d ./flutter_app -n flutter
  ./bin/scan_repo_map.mjs --merge ./backend_map.md ./flutter_map.md -n all -o ./all_map.md
  ./bin/scan_repo_map.mjs -d ./lib -n flutter --languages dart -o docs/ast-maps/flutter-ast-map.md`)
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
      console.error(`❌ Error: ${flag} 需要一个参数值`)
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
        console.log(`scan_repo_map.mjs v${VERSION}`)
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
          console.error(`❌ Unknown option: ${a}`)
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
    console.error(`❌ Error: Target directory does not exist: ${opts.targetDir}`)
    process.exit(1)
  }
  // 逻辑绝对路径（与 Bash `cd && pwd` 的逻辑 PWD 语义一致，不解析符号链接）
  const targetDirAbs = path.resolve(opts.targetDir)
  const moduleName = opts.moduleName || path.basename(targetDirAbs)
  const outputFile = opts.outputFile || path.join(targetDirAbs, `.repo_map_${moduleName}.md`)

  let langList
  if (opts.languagesSet) {
    if (opts.languages === '') {
      console.error('❌ Error: --languages 为空值')
      process.exit(1)
    }
    if (opts.languages.startsWith(',') || opts.languages.endsWith(',') || opts.languages.includes(',,')) {
      console.error(`❌ Error: --languages 含空字段: '${opts.languages}'（请用逗号分隔且不留空位）`)
      process.exit(1)
    }
    langList = opts.languages.split(',')
    for (const l of langList) {
      if (!SUPPORTED_LANGUAGES.includes(l)) {
        console.error(`❌ Error: 未知或不支持的语言: '${l}'（支持: ${SUPPORTED_LANGUAGES.join(',') }）`)
        process.exit(1)
      }
    }
  } else {
    langList = [...SUPPORTED_LANGUAGES]
  }
  return { targetDirAbs, moduleName, outputFile, langList }
}

export async function main(argv, argv0 = fileURLToPath(import.meta.url)) {
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
