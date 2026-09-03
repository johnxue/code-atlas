// ==============================================================================
// test/install.test.mjs — code-atlas install 子命令单元测试
// ==============================================================================
// 全程使用临时目录作为假 HOME（注入 homedir），npm install 用注入的桩 runner 模拟
// 成功/失败——不触碰真实 $HOME，不触网。真实端到端（真 npm）由冷装验证覆盖。
// 覆盖：根目录探测、复制内容完整且排除项正确、已存在同版本跳过/异版本覆盖、
// 四根全不存在时的默认行为、npm 失败报错并继续下一目标、重复运行幂等。
// 运行：node test/install.test.mjs   （npm test 的最后一环）
// ==============================================================================

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { detectRoots, installSkill } from '../src/install.mjs'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

let PASS = 0
let FAIL = 0

const ok = (t) => { console.log(`  \x1b[32m✔\x1b[0m ${t}`); PASS++ }
const fail = (t) => { console.log(`  \x1b[31m✘ ${t}\x1b[0m`); FAIL++ }
const section = (t) => console.log(`\n\x1b[1m== ${t} ==\x1b[0m`)

function assert(label, cond) {
  if (cond) ok(label)
  else fail(label)
}

function assertNoPath(label, p) {
  if (!existsSync(p)) ok(label)
  else fail(`${label}（不应存在: ${p}）`)
}

// 假 HOME + 按需创建部分 skills 根
function fakeHome() {
  return mkdtempSync(path.join(tmpdir(), 'code_atlas_install_test_'))
}
function makeRoots(home, ids) {
  for (const id of ids) {
    const r = detectRoots(home).find((x) => x.id === id)
    mkdirSync(r.root, { recursive: true })
  }
}
const destOf = (home, id) => path.join(detectRoots(home).find((x) => x.id === id).root, 'code-atlas')

// npm 桩：记录调用，可按 cwd 注入失败
function stubNpm({ failFor = () => false } = {}) {
  const calls = []
  const run = (cwd) => {
    calls.push(cwd)
    if (failFor(cwd)) return { ok: false, error: 'simulated npm failure (test stub)' }
    return { ok: true }
  }
  return { run, calls }
}

const NOLOG = () => {}

function main() {
  // ----------------------------------------------------------------
  section('detect_roots')
  {
    const home = fakeHome()
    const none = detectRoots(home)
    assert('四根全不存在时 exists 全 false', none.every((r) => !r.exists))
    assert('探测路径正确（agents）',
      none.find((r) => r.id === 'agents').root === path.join(home, '.agents', 'skills'))
    assert('探测路径正确（opencode）',
      none.find((r) => r.id === 'opencode').root === path.join(home, '.config', 'opencode', 'skills'))
    makeRoots(home, ['claude', 'codex'])
    const some = detectRoots(home)
    assert('部分根存在时 exists 精确',
      some.find((r) => r.id === 'claude').exists && some.find((r) => r.id === 'codex').exists
      && !some.find((r) => r.id === 'agents').exists && !some.find((r) => r.id === 'opencode').exists)
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('partial_roots_install_into_existing_only')
  {
    const home = fakeHome()
    makeRoots(home, ['claude', 'codex'])
    const npm = stubNpm()
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run })
    assert('退出码 0', code === 0)
    assert('恰好安装到 2 个已存在根',
      summary.length === 2 && summary.every((s) => s.status === 'installed'))
    assert('安装目录正确',
      summary.map((s) => s.dest).sort().join('|')
        === [destOf(home, 'claude'), destOf(home, 'codex')].sort().join('|'))
    assert('不存在根未被顺手创建',
      !existsSync(path.join(home, '.agents')) && !existsSync(path.join(home, '.config')))
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('copy_content_and_exclusions')
  {
    const home = fakeHome()
    makeRoots(home, ['agents'])
    const npm = stubNpm()
    installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run })
    const dest = destOf(home, 'agents')
    for (const rel of ['SKILL.md', 'package.json', 'bin/code-atlas.mjs', 'src/install.mjs',
      'src/engine.mjs', 'packages/lang-dart/package.json', 'packages/lang-dart/index.js',
      'README.md', 'README.zh-CN.md', 'README.ja.md']) {
      assert(`复制完整: ${rel}`, existsSync(path.join(dest, rel)))
    }
    assert('SKILL.md 内容与源一致',
      readFileSync(path.join(dest, 'SKILL.md'), 'utf8')
        === readFileSync(path.join(REPO_ROOT, 'SKILL.md'), 'utf8'))
    for (const rel of ['node_modules', 'test', 'docs', '.git', 'package-lock.json',
      'packages/lang-dart/node_modules', 'packages/lang-dart/test']) {
      assertNoPath(`排除项未混入: ${rel}`, path.join(dest, rel))
    }
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('existing_same_version_skips')
  {
    const home = fakeHome()
    makeRoots(home, ['claude'])
    const first = stubNpm()
    installSkill({ homedir: home, log: NOLOG, runNpmInstall: first.run })
    const dest = destOf(home, 'claude')
    writeFileSync(path.join(dest, 'sentinel.txt'), 'untouched')
    const second = stubNpm()
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: second.run })
    assert('重复运行退出码 0', code === 0)
    assert('同版本目标标记 skipped', summary.length === 1 && summary[0].status === 'skipped')
    assert('跳过时不重跑 npm install', second.calls.length === 0)
    assert('跳过时不覆盖已装内容',
      readFileSync(path.join(dest, 'sentinel.txt'), 'utf8') === 'untouched')
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('existing_different_version_replaces')
  {
    const home = fakeHome()
    makeRoots(home, ['claude'])
    const dest = destOf(home, 'claude')
    mkdirSync(dest, { recursive: true })
    writeFileSync(path.join(dest, 'package.json'), JSON.stringify({ name: 'code-atlas', version: '0.0.1' }))
    writeFileSync(path.join(dest, 'stale-row.md'), 'old junk')
    const npm = stubNpm()
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run })
    assert('异版本目标退出码 0', code === 0)
    assert('异版本目标标记 installed', summary.length === 1 && summary[0].status === 'installed')
    assert('覆盖时重跑 npm install', npm.calls.length === 1)
    assert('旧内容被清除', !existsSync(path.join(dest, 'stale-row.md')))
    assert('新内容就位', existsSync(path.join(dest, 'SKILL.md')))
    assert('package.json 已更新到本机版本',
      JSON.parse(readFileSync(path.join(dest, 'package.json'), 'utf8')).version
        === JSON.parse(readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')).version)
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('no_roots_exist_defaults_to_agents_skills')
  {
    const home = fakeHome()
    const npm = stubNpm()
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run })
    assert('默认路径退出码 0', code === 0)
    assert('默认创建并安装到 ~/.agents/skills/code-atlas',
      summary.length === 1 && summary[0].dest === destOf(home, 'agents')
      && summary[0].status === 'installed')
    assert('默认路径确实落盘', existsSync(path.join(destOf(home, 'agents'), 'SKILL.md')))
    assert('其余三根未被创建',
      !existsSync(path.join(home, '.claude')) && !existsSync(path.join(home, '.codex'))
      && !existsSync(path.join(home, '.config')))
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('npm_failure_reports_and_continues')
  {
    const home = fakeHome()
    makeRoots(home, ['claude', 'codex'])
    const badDest = destOf(home, 'claude')
    const npm = stubNpm({ failFor: (cwd) => cwd === badDest })
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run })
    assert('有失败时整体退出码 1', code === 1)
    const byDest = Object.fromEntries(summary.map((s) => [s.dest, s]))
    assert('失败目标标记 failed 且注明原因',
      byDest[badDest].status === 'failed' && byDest[badDest].reason.includes('npm install'))
    assert('失败后继续下一目标且成功',
      byDest[destOf(home, 'codex')].status === 'installed')
    assert('失败目标也被复制（失败发生在 npm 环节）',
      existsSync(path.join(badDest, 'SKILL.md')))
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('idempotent_repeat_run')
  {
    const home = fakeHome()
    makeRoots(home, ['claude', 'opencode'])
    const first = stubNpm()
    const r1 = installSkill({ homedir: home, log: NOLOG, runNpmInstall: first.run })
    const second = stubNpm()
    const r2 = installSkill({ homedir: home, log: NOLOG, runNpmInstall: second.run })
    assert('两次运行退出码一致且为 0', r1.code === 0 && r2.code === 0)
    assert('第二次全部 skipped',
      r2.summary.length === 2 && r2.summary.every((s) => s.status === 'skipped'))
    assert('第二次未触发任何 npm install', second.calls.length === 0)
    const dests1 = r1.summary.map((s) => s.dest).sort().join('|')
    const dests2 = r2.summary.map((s) => s.dest).sort().join('|')
    assert('两次安装目标集合一致', dests1 === dests2)
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('cli_rejects_install_extra_args')
  {
    const home = fakeHome()
    const r = spawnSync(process.execPath,
      [path.join(REPO_ROOT, 'bin', 'code-atlas.mjs'), 'install', '--help'],
      { encoding: 'utf8', env: { ...process.env, HOME: home } })
    assert('install 带多余参数退出非零', r.status === 1)
    assert('报错信息指明 install 不接受额外参数', (r.stderr || '').includes('install 子命令不接受额外参数'))
    assert('报错路径未发生任何安装', !existsSync(path.join(home, '.claude'))
      && !existsSync(path.join(home, '.agents')))
    rmSync(home, { recursive: true, force: true })
  }

  console.log('\n========================================')
  console.log(`  install 单元  PASS: ${PASS}   FAIL: ${FAIL}`)
  console.log('========================================')
  if (FAIL > 0) process.exit(1)
}

try {
  main()
} catch (e) {
  console.error('\x1b[31m!! install 测试运行器自身异常:\x1b[0m', e)
  process.exit(1)
}
