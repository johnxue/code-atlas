// ==============================================================================
// test/rules_parity.test.mjs — 规则清单与 Bash 源文件的机械交叉校验
// ==============================================================================
// 从 wisdom_app 的 rules_*.sh 机械提取全部规则，与 src/rules/*.mjs 的 RULES
// 逐条比对（fn/lang/pattern/kind/label/metavar/clean/mode/auto/crosslayer），
// 防止手改漂移。wisdom_app 仓只读。
// ==============================================================================

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASH_RULES_DIR = '/Users/xuehai/development/wisdom_app/scripts/repo_map'
const FILES = ['rules_typescript.sh', 'rules_python.sh', 'rules_go.sh', 'rules_dart.sh', 'rules_native.sh']
const CROSS_FNS = new Set(['extract_import', 'extract_import_kind', 'extract_urls', 'extract_dart_api_lines'])
// Bash 函数名 → Node 规则 fn 名（src/rules/*.mjs 的命名）
const FN_MAP = {
  extract_symbols: 'symbols',
  extract_route: 'route',
  extract_kinds: 'kinds',
  extract_kind_jq: 'kindJq',
  extract_import: 'import',
  extract_import_kind: 'importKind',
  extract_urls: 'urls',
  extract_dart_api_lines: 'dartApiLines',
}

function unquoteDq(s) { return s.replace(/\\\$/g, '$') }
function unquoteDollar(s) { return s.replace(/\\n/g, '\n') }

function extractBashRules(file) {
  const lines = readFileSync(path.join(BASH_RULES_DIR, file), 'utf8').split('\n')
  const rules = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const m = line.match(/^\s*(extract_\w+)\s*/)
    if (!m) continue
    const fn = m[1]
    const args = []
    let s = line.trim().slice(fn.length).trim()
    while (s.length) {
      if (s.startsWith(`$'`)) {
        const end = s.indexOf(`'`, 2)
        args.push({ q: 'dollars', v: unquoteDollar(s.slice(2, end)) })
        s = s.slice(end + 1).trim()
      } else if (s.startsWith('"')) {
        const end = s.indexOf('"', 1)
        args.push({ q: 'dq', v: unquoteDq(s.slice(1, end)) })
        s = s.slice(end + 1).trim()
      } else {
        const sp = s.indexOf(' ')
        const tok = sp === -1 ? s : s.slice(0, sp)
        args.push({ q: 'bare', v: tok })
        s = sp === -1 ? '' : s.slice(sp + 1).trim()
      }
    }
    const rule = { fn: FN_MAP[fn] }
    switch (fn) {
      case 'extract_dart_api_lines': break
      default: throw new Error(`unknown fn ${fn} in ${file}:${i + 1}`)
      case 'extract_symbols': rule.lang = args[0].v; rule.pattern = args[1].v; rule.label = args[2].v; break
      case 'extract_route': rule.lang = args[0].v; rule.pattern = args[1].v; rule.label = args[2].v; break
      case 'extract_kinds':
        rule.lang = args[0].v; rule.kind = args[1].v; rule.label = args[2].v
        if (args[3]) rule.auto = true
        break
      case 'extract_kind_jq':
        rule.lang = args[0].v; rule.kind = args[1].v
        rule.jq = args[2].v.includes('classlike') ? 'classlike' : 'dart_topvar'
        if (args[3]) rule.jqLang = args[3].v
        break
      case 'extract_import': rule.lang = args[0].v; rule.pattern = args[1].v; rule.metavar = args[2].v; rule.clean = args[3].v; break
      case 'extract_import_kind': rule.lang = args[0].v; rule.kind = args[1].v; rule.mode = args[2].v; break
      case 'extract_urls': rule.lang = args[0].v; rule.kind = args[1].v; rule.label = args[2].v; break
    }
    if (CROSS_FNS.has(fn)) rule.crosslayer = true
    rules.push(rule)
  }
  return rules
}

function toComparable(rule) {
  // 只保留有语义的键做比对（顺序无关）
  const out = {}
  for (const k of ['fn', 'lang', 'pattern', 'kind', 'label', 'metavar', 'clean', 'mode', 'auto', 'jq', 'jqLang', 'crosslayer']) {
    if (rule[k] !== undefined) out[k] = rule[k]
  }
  return JSON.stringify(out)
}

let failures = 0
for (const file of FILES) {
  const expected = extractBashRules(file).map(toComparable)
  const mod = await import(path.join(REPO_ROOT, 'src', 'rules', file.replace('rules_', '').replace('.sh', '.mjs')))
  const actual = mod.RULES.map(toComparable)
  if (expected.length !== actual.length) {
    console.error(`✘ ${file}: 条数不一致 Bash=${expected.length} Node=${actual.length}`)
    failures++
    continue
  }
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      console.error(`✘ ${file} 第 ${i + 1} 条不一致:`)
      console.error(`  Bash: ${expected[i]}`)
      console.error(`  Node: ${actual[i]}`)
      failures++
    }
  }
  console.log(`✔ ${file}: ${expected.length} 条规则逐条一致`)
}

if (failures > 0) {
  console.error(`\n规则清单校验失败: ${failures} 处不一致`)
  process.exit(1)
}
console.log('\n规则清单与 Bash 源文件完全一致')
