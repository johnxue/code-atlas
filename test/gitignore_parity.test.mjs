// ==============================================================================
// test/gitignore_parity.test.mjs — gitignore 语义 Node vs Bash 对拍回归
// ==============================================================================
// 覆盖：[!a] 取反字符类、[b-d] 范围类、\!/\# 转义、未闭合 [ 降级字面量、
// 锚定目录（/build/、sub/gen/）与否定复活（!generated.dart）。
// 断言：Node 版与 Bash 版（wisdom_app 仓扫描器，只读）对同一 fixture 的扫描
// 结果 normalize 后逐字节一致，且扫描/忽略集合符合 gitignore(5) 预期。
// 注：.gitignore 仅在 git 仓内生效（require_git），fixture 位于本仓内满足该条件。
// ==============================================================================

import { spawnSync } from 'node:child_process'
import { mkdtempSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeMap } from './helpers.mjs'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const NODE_CLI = path.join(REPO_ROOT, 'bin', 'scan_repo_map.mjs')
const BASH_CLI = '/Users/xuehai/development/wisdom_app/scripts/scan_repo_map.sh'
const FIXTURE_ROOT = path.join(REPO_ROOT, 'test', 'fixtures', 'gitignore_parity')

let PASS = 0
let FAIL = 0

const ok = (t) => { console.log(`  \x1b[32m✔\x1b[0m ${t}`); PASS++ }
const fail = (t) => { console.log(`  \x1b[31m✘ ${t}\x1b[0m`); FAIL++ }

// 每个 case：{ dir, scan: [必须出现的正则], ignore: [必须不出现的正则] }
const CASES = [
  {
    name: 'case-negclass（[!a] 取反类 / [b-d] 范围类）',
    dir: 'case-negclass',
    scan: ['^📁 a\\.dart', '^📁 ab\\.dart', '^📁 ex\\.dart'],
    ignore: ['^📁 b\\.dart', '^📁 z\\.dart', '^📁 bx\\.dart'],
  },
  {
    name: 'case-escape-bang（\\! 与 \\# 转义字面量）',
    dir: 'case-escape-bang',
    scan: ['^📁 literal\\.dart', '^📁 hash\\.dart'],
    ignore: ['^📁 !literal\\.dart', '^📁 #hash\\.dart'],
  },
  {
    name: 'case-literal-bracket（未闭合 [ 降级字面量）',
    dir: 'case-literal-bracket',
    scan: ['^📁 abd\\.dart'],
    ignore: ['^📁 \\[abc\\.dart'],
  },
  {
    name: 'case-anchored-dir（锚定目录 / 锚定子路径 / 否定复活）',
    dir: 'case-anchored-dir',
    scan: ['^📁 deep/build/y\\.dart', '^📁 gen/w\\.dart', '^📁 generated\\.dart'],
    ignore: ['^📁 build/', '^📁 sub/gen/', '^📁 genx\\.dart'],
  },
]

// 剥离符号行区间列（v2.1.0 演进列）：本测试只关心文件发现语义，与 golden.sh 同一变换
function stripIntervals(lines) {
  return lines.map((l) => l.replace(/\[L([0-9]+)-L[0-9]+\]/g, '[L$1]'))
}

function runBoth(caseDir, outDir) {
  const a = path.join(outDir, 'a.md')
  const b = path.join(outDir, 'b.md')
  const bash = spawnSync('bash', [BASH_CLI, '-d', caseDir, '-n', 'parity', '-o', a], { encoding: 'utf8' })
  const node = spawnSync(process.execPath, [NODE_CLI, '-d', caseDir, '-n', 'parity', '-o', b], { encoding: 'utf8' })
  return { bash, node, a, b }
}

function main() {
  if (!existsSync(BASH_CLI)) {
    console.error('  ✘ 依赖缺失: Bash 参考实现不存在（/Users/xuehai/development/wisdom_app/scripts/scan_repo_map.sh）')
    console.error('  !! 无法运行 gitignore 对拍测试，以非零退出码结束，避免 CI 假绿。')
    process.exit(1)
  }
  const outDir = mkdtempSync(path.join(tmpdir(), 'gi_parity_'))
  for (const c of CASES) {
    console.log(`\n== ${c.name} ==`)
    const caseDir = path.join(FIXTURE_ROOT, c.dir)
    const { bash, node, a, b } = runBoth(caseDir, outDir)
    if (bash.status !== 0 || node.status !== 0) {
      fail(`扫描退出码非零（bash=${bash.status} node=${node.status}）`)
      continue
    }
    const na = normalizeMap(a)
    const nb = stripIntervals(normalizeMap(b))
    if (JSON.stringify(na) === JSON.stringify(nb)) ok('Node 与 Bash 输出 normalize 后逐字节一致')
    else {
      fail('Node 与 Bash 输出不一致')
      console.error('  Bash:', JSON.stringify(na))
      console.error('  Node:', JSON.stringify(nb))
    }
    // 扫描/忽略集合断言（防两边同错）：内容行（📁 开头 = 符号/导入/API 行）出现与否
    const body = (lines) => lines.filter((l) => l.startsWith('📁') || l.startsWith('🚪'))
    const content = body(nb)
    let sane = true
    for (const re of c.scan) {
      if (!content.some((l) => new RegExp(re).test(l))) { fail(`应扫描却未见: ${re}`); sane = false }
    }
    for (const re of c.ignore) {
      if (content.some((l) => new RegExp(re).test(l))) { fail(`应忽略却出现: ${re}`); sane = false }
    }
    if (sane) ok('扫描/忽略集合符合 gitignore 语义预期')
  }
  console.log('\n========================================')
  console.log(`  gitignore 对拍  PASS: ${PASS}   FAIL: ${FAIL}`)
  console.log('========================================')
  process.exit(FAIL > 0 ? 1 : 0)
}

main()
