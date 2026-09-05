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
import { chmodSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { detectRoots, installSkill } from '../src/install.mjs'

// 断言 install 输出/摘要 reason 文案的用例统一钉在英文基线（en），任意 locale 机器结果一致
process.env.CODE_ATLAS_LANG = 'en'

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

// 假 PATH 目录：注入可执行文件桩（X_OK 权限位），模拟「PATH 上有某 agent 本体」
function fakeBinDir(home, names) {
  const binDir = path.join(home, 'fakebin')
  mkdirSync(binDir, { recursive: true })
  for (const n of names) {
    writeFileSync(path.join(binDir, n), '#!/bin/sh\n')
    chmodSync(path.join(binDir, n), 0o755)
  }
  return binDir
}

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
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run, pathEnv: '' })
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
  section('three_level_dir_missing_but_agent_detected_creates')
  {
    // 三级探测第 2 级：skills 目录缺失但 agent 本体存在 → 创建该 skills 目录并安装。
    // 四根逐个验证；证据类型覆盖 PATH 可执行文件（claude/agents）与 home 专属目录（codex/opencode）。
    const cases = [
      { id: 'claude', agent: 'claude', rel: '.claude/skills', setup: (home) => fakeBinDir(home, ['claude']) },
      { id: 'agents', agent: 'kimi', rel: '.agents/skills', setup: (home) => fakeBinDir(home, ['kimi']) },
      { id: 'codex', agent: 'codex', rel: '.codex/skills',
        setup: (home) => mkdirSync(path.join(home, '.codex'), { recursive: true }) },
      { id: 'opencode', agent: 'opencode', rel: '.config/opencode/skills',
        setup: (home) => mkdirSync(path.join(home, '.config', 'opencode'), { recursive: true }) },
    ]
    for (const c of cases) {
      const home = fakeHome()
      const pathEnv = c.setup(home) // home 目录证据场景返回 undefined → 注入空 pathEnv（无 PATH 证据）
      const lines = []
      const npm = stubNpm()
      const { code, summary } = installSkill({
        homedir: home, log: (m) => lines.push(m), runNpmInstall: npm.run, pathEnv: pathEnv || '',
      })
      const root = path.dirname(destOf(home, c.id))
      assert(`${c.id} 本体存在（目录缺失）→ 退出码 0`, code === 0)
      assert(`${c.id} 目录缺失但本体存在 → 创建该 skills 目录并安装`,
        summary.length === 1 && summary[0].status === 'installed' && summary[0].root === root)
      assert(`${c.id} skills 目录已落盘且 SKILL.md 就位`,
        existsSync(path.join(root, 'code-atlas', 'SKILL.md')))
      assert(`${c.id} 探测输出打印 ✚ 已创建 ~/${c.rel}（检测到 ${c.agent}）`,
        lines.some((l) => l.includes(`✚ Created ~/${c.rel} (detected ${c.agent})`)))
      assert(`${c.id} 创建安装时 npm 恰跑一次`, npm.calls.length === 1)
      rmSync(home, { recursive: true, force: true })
    }
    {
      // 波及面检查：单一根经 PATH 证据创建时，其余三根未被顺手创建
      const home = fakeHome()
      installSkill({ homedir: home, log: NOLOG, runNpmInstall: stubNpm().run, pathEnv: fakeBinDir(home, ['claude']) })
      assert('claude 经 PATH 证据创建，其余三根未被创建',
        existsSync(path.join(home, '.claude', 'skills', 'code-atlas', 'SKILL.md'))
        && !existsSync(path.join(home, '.agents')) && !existsSync(path.join(home, '.codex'))
        && !existsSync(path.join(home, '.config')))
      rmSync(home, { recursive: true, force: true })
    }
  }

  // ----------------------------------------------------------------
  section('three_level_agent_also_missing_skips')
  {
    // 三级探测第 3 级：本体也没有 → 跳过该根（锚一个已存在根，避免触发四根全空的兜底）
    const cases = [
      { id: 'claude', anchor: 'codex' },
      { id: 'agents', anchor: 'claude' },
      { id: 'codex', anchor: 'claude' },
      { id: 'opencode', anchor: 'claude' },
    ]
    for (const c of cases) {
      const home = fakeHome()
      makeRoots(home, [c.anchor])
      const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: stubNpm().run, pathEnv: '' })
      const root = path.dirname(destOf(home, c.id))
      assert(`${c.id} 本体也没有 → 退出码 0 且仅锚根安装`,
        code === 0 && summary.length === 1 && summary[0].root === path.dirname(destOf(home, c.anchor)))
      assert(`${c.id} 不进安装目标`, !summary.some((s) => s.root === root))
      assert(`${c.id} skills 目录未被创建`, !existsSync(root))
      rmSync(home, { recursive: true, force: true })
    }
  }

  // ----------------------------------------------------------------
  section('three_level_mixed_existing_and_creatable')
  {
    // 已存在根与可创建根共存：两个都装；探测行分别为 ✔ 与 ✚，创建行打印 ✚ 已创建
    const home = fakeHome()
    makeRoots(home, ['claude'])
    const binDir = fakeBinDir(home, ['codex'])
    const lines = []
    const { code, summary } = installSkill({
      homedir: home, log: (m) => lines.push(m), runNpmInstall: stubNpm().run, pathEnv: binDir,
    })
    assert('已存在根 + 可创建根共存 → 退出码 0', code === 0)
    // codex 在 PATH 上同时是 agents（通用根）与 codex 两个根的本体证据 → 共 3 个目标
    assert('已存在根 + 两个可创建根都安装',
      summary.length === 3 && summary.every((s) => s.status === 'installed'))
    assert('探测输出同时出现 ✔ 存在与 ✚ 可创建（检测到 codex）',
      lines.some((l) => l.includes('✔ exists') && l.includes('~/.claude/skills'))
      && lines.filter((l) => l.includes('✚ creatable (detected codex)')).length === 2)
    assert('安装循环打印 ✚ 已创建 ~/.codex/skills（检测到 codex）',
      lines.some((l) => l.includes('✚ Created ~/.codex/skills (detected codex)'))
      && lines.some((l) => l.includes('✚ Created ~/.agents/skills (detected codex)')))
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('copy_content_and_exclusions')
  {
    const home = fakeHome()
    makeRoots(home, ['agents'])
    const npm = stubNpm()
    installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run, pathEnv: '' })
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
    installSkill({ homedir: home, log: NOLOG, runNpmInstall: first.run, pathEnv: '' })
    const dest = destOf(home, 'claude')
    writeFileSync(path.join(dest, 'sentinel.txt'), 'untouched')
    const second = stubNpm()
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: second.run, pathEnv: '' })
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
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run, pathEnv: '' })
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
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run, pathEnv: '' })
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
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run, pathEnv: '' })
    assert('有失败时整体退出码 1', code === 1)
    const byDest = Object.fromEntries(summary.map((s) => [s.dest, s]))
    assert('失败目标标记 failed 且注明原因',
      byDest[badDest].status === 'failed' && byDest[badDest].reason.includes('npm install'))
    assert('失败后继续下一目标且成功',
      byDest[destOf(home, 'codex')].status === 'installed')
    assertNoPath('新建失败目标已整体回滚（不留假完成目录）', badDest)
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('retry_after_failure_next_run_retries')
  {
    const SOURCE_VERSION = JSON.parse(
      readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')).version
    const failNpm = () => ({ ok: false, error: 'simulated npm failure (round 1)' })

    // 场景 1：全新安装 npm 失败 → dest 整体回滚 → 下轮重试为 installed
    const home1 = fakeHome()
    makeRoots(home1, ['claude'])
    const r1 = installSkill({ homedir: home1, log: NOLOG, runNpmInstall: failNpm, pathEnv: '' })
    assert('场景1 第一轮 failed 且整体退出码 1',
      r1.code === 1 && r1.summary[0].status === 'failed')
    assertNoPath('场景1 失败目录已回滚', destOf(home1, 'claude'))
    const good1 = stubNpm()
    const r2 = installSkill({ homedir: home1, log: NOLOG, runNpmInstall: good1.run, pathEnv: '' })
    assert('场景1 第二轮重试为 installed 而非 skipped',
      r2.code === 0 && r2.summary[0].status === 'installed')
    assert('场景1 第二轮确实重跑了 npm install', good1.calls.length === 1)
    rmSync(home1, { recursive: true, force: true })

    // 场景 2：替换旧版时 npm 失败 → 同版本 package.json 已就位 + 未完成标记
    // → 下轮必须重试（这正是「版本相同则跳过」的假幂等隐患）→ 成功后标记消失
    const home2 = fakeHome()
    makeRoots(home2, ['claude'])
    const dest2 = destOf(home2, 'claude')
    mkdirSync(dest2, { recursive: true })
    writeFileSync(path.join(dest2, 'package.json'),
      JSON.stringify({ name: 'code-atlas', version: '0.0.1' }))
    const r1b = installSkill({ homedir: home2, log: NOLOG, runNpmInstall: failNpm, pathEnv: '' })
    assert('场景2 第一轮 failed 且整体退出码 1',
      r1b.code === 1 && r1b.summary[0].status === 'failed')
    assert('场景2 失败后写入 .install-incomplete 标记',
      existsSync(path.join(dest2, '.install-incomplete')))
    assert('场景2 目录残留同版本 package.json（假幂等隐患的前提）',
      JSON.parse(readFileSync(path.join(dest2, 'package.json'), 'utf8')).version === SOURCE_VERSION)
    const good2 = stubNpm()
    const r2b = installSkill({ homedir: home2, log: NOLOG, runNpmInstall: good2.run, pathEnv: '' })
    assert('场景2 第二轮同版本也重试为 installed 而非 skipped',
      r2b.code === 0 && r2b.summary[0].status === 'installed')
    assert('场景2 第二轮确实重跑了 npm install', good2.calls.length === 1)
    assert('场景2 成功后标记清除', !existsSync(path.join(dest2, '.install-incomplete')))
    rmSync(home2, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('idempotent_repeat_run')
  {
    const home = fakeHome()
    makeRoots(home, ['claude', 'opencode'])
    const first = stubNpm()
    const r1 = installSkill({ homedir: home, log: NOLOG, runNpmInstall: first.run, pathEnv: '' })
    const second = stubNpm()
    const r2 = installSkill({ homedir: home, log: NOLOG, runNpmInstall: second.run, pathEnv: '' })
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
    assert('报错信息指明 install 不接受额外参数',
      (r.stderr || '').includes('install subcommand does not accept extra arguments'))
    assert('报错路径未发生任何安装', !existsSync(path.join(home, '.claude'))
      && !existsSync(path.join(home, '.agents')))
    rmSync(home, { recursive: true, force: true })
  }

  // ----------------------------------------------------------------
  section('non_dir_dest_is_preserved')
  {
    // 场景 1：普通文件占位 → 报错保留、计入失败、继续其余目标、整体退出码 1
    const home = fakeHome()
    makeRoots(home, ['claude', 'agents'])
    const fileDest = destOf(home, 'claude')
    writeFileSync(fileDest, 'precious user file\n')
    const npm = stubNpm()
    const { code, summary } = installSkill({ homedir: home, log: NOLOG, runNpmInstall: npm.run, pathEnv: '' })
    const byDest = Object.fromEntries(summary.map((s) => [s.dest, s]))
    assert('文件占位 → 整体退出码 1', code === 1)
    assert('文件占位 → 状态 failed 且注明非目录占用',
      byDest[fileDest].status === 'failed' && byDest[fileDest].reason.includes('non-directory'))
    assert('普通文件内容原样保留',
      readFileSync(fileDest, 'utf8') === 'precious user file\n')
    assert('其余目标照常安装（继续而非中止）',
      byDest[destOf(home, 'agents')].status === 'installed')
    assert('占位目标未触发任何 npm install',
      npm.calls.length === 1 && npm.calls[0] === destOf(home, 'agents'))
    rmSync(home, { recursive: true, force: true })

    // 场景 2：软链指向目录（lstat 不跟随 → 按占用报错，软链与其目标都原样保留）
    const home2 = fakeHome()
    makeRoots(home2, ['claude'])
    const linkDest = destOf(home2, 'claude')
    const real = path.join(home2, 'elsewhere', 'my-code-atlas')
    mkdirSync(real, { recursive: true })
    writeFileSync(path.join(real, 'keep.txt'), 'inside symlink target')
    symlinkSync(real, linkDest)
    const r2 = installSkill({ homedir: home2, log: NOLOG, runNpmInstall: stubNpm().run, pathEnv: '' })
    assert('目录软链占位 → failed 且整体退出码 1',
      r2.code === 1 && r2.summary[0].status === 'failed')
    assert('目录软链占位 → reason 注明 symlink',
      r2.summary[0].reason.includes('symlink'))
    assert('软链本身原样保留（lstat 仍为 symlink）',
      lstatSync(linkDest).isSymbolicLink())
    assert('软链目标目录内容未被动过',
      readFileSync(path.join(real, 'keep.txt'), 'utf8') === 'inside symlink target')
    rmSync(home2, { recursive: true, force: true })

    // 场景 3：悬空软链（existsSync 为 false，lstat 仍存在 → 也按占用保护）
    const home3 = fakeHome()
    makeRoots(home3, ['claude'])
    const dangling = destOf(home3, 'claude')
    symlinkSync(path.join(home3, 'nowhere'), dangling)
    const r3 = installSkill({ homedir: home3, log: NOLOG, runNpmInstall: stubNpm().run, pathEnv: '' })
    assert('悬空软链占位 → failed（existsSync 看不见但 lstat 看得见）',
      r3.code === 1 && r3.summary[0].status === 'failed')
    assert('悬空软链原样保留',
      lstatSync(dangling).isSymbolicLink())
    rmSync(home3, { recursive: true, force: true })
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
