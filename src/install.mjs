// ==============================================================================
// src/install.mjs — code-atlas install：三级探测并把 skill 本体装进 agent skills 目录
// ==============================================================================
// 探测三级：① skills 目录存在 → 照旧；② 目录缺失但 agent 本体存在（home 专属目录
// 或 PATH 可执行文件，见 AGENT_PROBES）→ 创建该 skills 目录并安装；③ 本体也没有 → 跳过。
// 四根全落空时兜底创建 ~/.agents/skills（语义不变）。
// 纯 Node API（fs.cpSync / mkdirSync / rmSync），文件操作不经 shell（Windows 兼容）。
// 唯一的子进程是 npm install --omit=dev（spawnSync 无 shell；Windows 走 npm.cmd + shell，
// 因新版 Node 对 .cmd 直接 spawn 会 EINVAL）。homedir / npmRunner 可注入：
// 测试用临时 HOME + 桩 runner，绝不触碰真实 $HOME、不触网。
// 幂等：目标已存在且 package.json version 相同（且无未完成标记）→ 跳过；不同 → 打印
// 路径后整体替换。安装中途失败：本次新建的目录整体回滚；替换旧版时无法廉价还原，
// 写 .install-incomplete 标记——下次运行据此重试而非被「版本相同」误判为已完成。
// ==============================================================================

import { spawnSync } from 'node:child_process'
import { accessSync, constants as fsConstants, cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { t as tr } from './i18n.mjs'

// skill 本体 = 仓根以下条目（README* 另行通配）；排除项对任意深度生效
// （含 packages/lang-dart 下的 node_modules 与 test）。
const COPY_ENTRIES = ['SKILL.md', 'bin', 'src', 'packages', 'package.json']
const COPY_README = /^README/
const COPY_EXCLUDE = new Set(['node_modules', 'test', 'docs', '.git'])
// 安装中途失败且无法回滚到旧版时留下的标记：版本相同跳过判定先看它，有标记则重试
const INCOMPLETE_MARKER = '.install-incomplete'

export const SKILL_ROOTS = [
  { id: 'claude', labelKey: 'install.agent.claude', relative: '.claude/skills' },
  { id: 'agents', labelKey: 'install.agent.agents', relative: '.agents/skills' },
  { id: 'codex', labelKey: 'install.agent.codex', relative: '.codex/skills' },
  { id: 'opencode', labelKey: 'install.agent.opencode', relative: '.config/opencode/skills' },
]

export function detectRoots(homedir = os.homedir(), { pathEnv = process.env.PATH } = {}) {
  return SKILL_ROOTS.map((r) => {
    const root = path.join(homedir, ...r.relative.split('/'))
    const exists = isDir(root)
    // 三级探测：skills 目录缺失但检测到 agent 本体 → 可创建（agent=证据名，空串=未检测到）
    return { ...r, root, exists, agent: exists ? '' : detectAgent(r.id, homedir, pathEnv) }
  })
}

// 三级探测的本体证据：一级 = home 下专属目录；二级 = PATH 上的可执行文件
// （agents 为通用根，无专属目录，只认 PATH 上的四个通用 CLI 之一）。
const AGENT_PROBES = {
  claude: { homeDir: '.claude', bins: ['claude'] },
  agents: { homeDir: '', bins: ['kimi', 'codex', 'pi', 'hermes'] },
  codex: { homeDir: '.codex', bins: ['codex'] },
  opencode: { homeDir: '.config/opencode', bins: ['opencode'] },
}

// PATH 查找：按平台分隔符切目录；候选必须是常规文件（755 目录的 X_OK 也通过，先决
// isFile 排除目录；statSync 跟随软链——软链到可执行文件仍是合法本体）再验 X_OK 权限位；
// Windows 额外匹配可执行扩展名。返回命中路径，未命中返回空串。
function findOnPath(name, pathEnv) {
  if (!pathEnv) return ''
  const exts = process.platform === 'win32' ? ['', '.exe', '.cmd', '.bat'] : ['']
  for (const dir of pathEnv.split(path.delimiter)) {
    if (!dir) continue
    for (const ext of exts) {
      const candidate = path.join(dir, name + ext)
      try {
        if (!statSync(candidate).isFile()) continue
        accessSync(candidate, fsConstants.X_OK)
        return candidate
      } catch { /* 不是这个，继续找 */ }
    }
  }
  return ''
}

// 返回检测到的 agent 证据名（探测输出「检测到 <agent>」用）；空串 = 完全未检测到
function detectAgent(id, homedir, pathEnv) {
  const probe = AGENT_PROBES[id]
  if (probe.homeDir && isDir(path.join(homedir, ...probe.homeDir.split('/')))) return id
  for (const bin of probe.bins) {
    if (findOnPath(bin, pathEnv)) return bin
  }
  return ''
}

function isDir(p) {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

// lstat 语义区分 dest 现状（不跟随软链）：absent=不存在；dir=目录；
// other=普通文件/软链等占位——一律保留不动、报错计入失败。
function classifyDest(p) {
  try {
    const st = lstatSync(p)
    if (st.isDirectory()) return { kind: 'dir' }
    const type = st.isSymbolicLink() ? 'symlink' : st.isFile() ? 'regular file' : 'other'
    return { kind: 'other', type }
  } catch {
    return { kind: 'absent' }
  }
}

function readVersion(pkgJsonPath) {
  try {
    return JSON.parse(readFileSync(pkgJsonPath, 'utf8')).version ?? ''
  } catch {
    return ''
  }
}

// 默认依赖安装器：spawnSync 直接调 npm（不经 shell；Windows 例外，见文件头注释）。
function defaultNpmRunner(cwd) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const r = spawnSync(npm, ['install', '--omit=dev'], {
    cwd,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })
  if (r.status === 0) return { ok: true }
  const detail = (r.stderr || r.stdout || `npm exit=${r.status}`).trim()
  return { ok: false, error: detail.split('\n').slice(-6).join('\n') }
}

function copySkillFiles(sourceRoot, destDir) {
  rmSync(destDir, { recursive: true, force: true })
  mkdirSync(destDir, { recursive: true })
  const keep = (src) => !COPY_EXCLUDE.has(path.basename(src))
  for (const entry of COPY_ENTRIES) {
    const from = path.join(sourceRoot, entry)
    if (!existsSync(from)) continue
    cpSync(from, path.join(destDir, entry), { recursive: true, filter: keep })
  }
  for (const entry of readdirSync(sourceRoot)) {
    if (COPY_README.test(entry)) {
      cpSync(path.join(sourceRoot, entry), path.join(destDir, entry), { filter: keep })
    }
  }
}

const indent = (s) => s.split('\n').map((l) => `       ${l}`).join('\n')

// 失败收尾：本次新建的目录直接回滚（全量复制，无数据可失）；替换旧目录时无法廉价
// 还原旧版，保留现场并写 .install-incomplete 标记，让下次运行重试而非误跳过。
function failTarget(dest, destPreExisted, log) {
  if (!destPreExisted) {
    rmSync(dest, { recursive: true, force: true })
    log(tr('install.rolledBack', { dest }))
  } else {
    writeFileSync(path.join(dest, INCOMPLETE_MARKER), `incomplete install at ${new Date().toISOString()}\n`)
    log(tr('install.markedIncomplete', { marker: INCOMPLETE_MARKER }))
  }
}

// 本轮新建根的失败收尾：目标回滚后根应为空 → 一并删除（残留空根会让下一轮一级探测
// 误选中）；若根内出现其他内容（非空，可能混入用户数据）则保留并说明，绝不误删。
function rollbackCreatedRoot(root, created, log) {
  if (!created) return
  let empty = false
  try { empty = readdirSync(root).length === 0 } catch { return } // 不可读就不动它
  if (!empty) {
    log(tr('install.rootKept', { root }))
    return
  }
  rmSync(root, { recursive: true, force: true })
  log(tr('install.rootRolledBack', { root }))
}

/**
 * 三级探测安装 skill 本体：
 *   1. skills 目录存在 → 照旧安装；
 *   2. 目录缺失但检测到 agent 本体（home 专属目录或 PATH 可执行文件）→ 创建该目录并安装；
 *   3. 完全检测不到 → 跳过。四个根都检测不到时兜底创建 ~/.agents/skills 并装入（不变）。
 * @param {{ homedir?: string, sourceRoot?: string, log?: Function,
 *   runNpmInstall?: Function, pathEnv?: string }} options
 *   pathEnv 为 PATH 注入 seam（本体探测用；空串 = 无任何 PATH 证据）
 * @returns {{ code: number, summary: Array<{root: string, dest: string,
 *   status: 'installed'|'skipped'|'failed', version?: string, reason?: string}> }}
 */
export function installSkill(options = {}) {
  const {
    homedir = os.homedir(),
    sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
    log = (m) => console.log(m),
    runNpmInstall = defaultNpmRunner,
    pathEnv = process.env.PATH,
  } = options
  const version = readVersion(path.join(sourceRoot, 'package.json')) || 'unknown'
  log(tr('install.title', { version }))

  const roots = detectRoots(homedir, { pathEnv })
  log(tr('install.probing'))
  for (const r of roots) {
    const state = r.exists ? `✔ ${tr('install.probe.exists')}`
      : r.agent ? `✚ ${tr('install.probe.creatable', { agent: r.agent })}`
      : `✘ ${tr('install.probe.missing')}`
    log(`   ${state}  ~/${r.relative}  (${tr(r.labelKey)})`)
  }

  const summary = []
  let targets = roots.filter((r) => r.exists || r.agent)
  if (targets.length === 0) {
    const fallback = roots.find((r) => r.id === 'agents')
    // 兜底创建同样纳入逐目标错误语义：根被占位/创建失败 → 计 failed（退出码 1），不再整体中止
    try {
      mkdirSync(fallback.root, { recursive: true })
      // 兜底根由本轮创建 → 携带 rootCreated 进入下方循环：失败时空根一并回滚，
      // 与二级创建同一条状态机语义；否则残留空根会被下一轮一级探测误选中
      fallback.rootCreated = true
      fallback.exists = true // 兜底目录本次已就位，避免下方循环把它当「待创建」再打 ✚ 行
      log(tr('install.fallback', { root: fallback.relative }))
      targets = [fallback]
    } catch (e) {
      log(tr('install.rootCreateFailed', { root: `~/${fallback.relative}`, message: e.message }))
      summary.push({
        root: fallback.root,
        dest: path.join(fallback.root, 'code-atlas'),
        status: 'failed',
        reason: tr('install.reason.rootCreateFailed', { message: e.message }),
      })
      targets = [] // 兜底失败：无任何目标可装，落到统一收尾（failed>0 → 退出码 1）
    }
  }

  for (const tgt of targets) {
    const dest = path.join(tgt.root, 'code-atlas')
    // 兜底根已在兜底分支创建（rootCreated 随对象带入）；二级目标在下方创建分支置位
    let rootCreated = tgt.rootCreated === true
    if (!tgt.exists) {
      // 三级探测第 2 级：目录缺失但本体存在 → 创建 skills 目录再安装。
      // 先分类再动作（与 f51da49 占位保护语义一致）：根被非目录占用/创建失败
      // → 本目标 failed、继续其余目标，绝不在逐目标错误处理之外抛出中止全部。
      const rootState = classifyDest(tgt.root)
      if (rootState.kind === 'other') {
        log(tr('install.rootOccupied', { root: `~/${tgt.relative}`, type: rootState.type }))
        summary.push({
          root: tgt.root, dest, status: 'failed',
          reason: tr('install.reason.rootOccupied', { type: rootState.type }),
        })
        continue
      }
      try {
        mkdirSync(tgt.root, { recursive: true })
      } catch (e) {
        log(tr('install.rootCreateFailed', { root: `~/${tgt.relative}`, message: e.message }))
        summary.push({
          root: tgt.root, dest, status: 'failed',
          reason: tr('install.reason.rootCreateFailed', { message: e.message }),
        })
        continue
      }
      rootCreated = true
      log(tr('install.created', { root: `~/${tgt.relative}`, agent: tgt.agent }))
    }
    const cur = classifyDest(dest)
    if (cur.kind === 'other') {
      log(tr('install.destOccupied', { dest, type: cur.type }))
      summary.push({ root: tgt.root, dest, status: 'failed', reason: tr('install.reason.occupied', { type: cur.type }) })
      continue
    }
    const destVersion = cur.kind === 'dir' ? readVersion(path.join(dest, 'package.json')) : ''
    const incomplete = cur.kind === 'dir' && existsSync(path.join(dest, INCOMPLETE_MARKER))
    if (destVersion && destVersion === version && !incomplete) {
      log(tr('install.skipSameVersion', { dest, version: destVersion }))
      summary.push({ root: tgt.root, dest, status: 'skipped', version: destVersion })
      continue
    }
    const destPreExisted = cur.kind === 'dir'
    if (incomplete) log(tr('install.retryIncomplete', { dest, version }))
    else if (destPreExisted) log(tr('install.replace', { dest, old: destVersion || '?', new: version }))
    else log(tr('install.copying', { dest }))
    try {
      copySkillFiles(sourceRoot, dest)
      log(tr('install.copied'))
    } catch (e) {
      log(tr('install.copyFailed', { message: e.message }))
      failTarget(dest, destPreExisted, log)
      rollbackCreatedRoot(tgt.root, rootCreated, log)
      summary.push({ root: tgt.root, dest, status: 'failed', reason: tr('install.reason.copyFailed', { message: e.message }) })
      continue
    }
    log(tr('install.npmRunning'))
    const npmResult = runNpmInstall(dest)
    if (!npmResult.ok) {
      log(tr('install.npmFailed', { detail: indent(npmResult.error || '') }))
      failTarget(dest, destPreExisted, log)
      rollbackCreatedRoot(tgt.root, rootCreated, log)
      summary.push({ root: tgt.root, dest, status: 'failed', reason: tr('install.reason.npmFailed') })
      continue
    }
    log(tr('install.npmDone'))
    summary.push({ root: tgt.root, dest, status: 'installed', version })
  }

  const installed = summary.filter((s) => s.status === 'installed')
  const skipped = summary.filter((s) => s.status === 'skipped')
  const failed = summary.filter((s) => s.status === 'failed')
  log('')
  log(tr('install.summaryTitle'))
  for (const s of summary) {
    const tail = s.status === 'failed' ? tr('install.summary.failedTail', { reason: s.reason })
      : s.status === 'skipped' ? tr('install.summary.skippedTail', { version: s.version })
      : tr('install.summary.installedTail', { version: s.version })
    const mark = s.status === 'failed' ? '❌' : s.status === 'skipped' ? '⏭️ ' : '✅'
    log(`   ${mark} ${s.dest}${tail}`)
  }
  if (failed.length > 0) {
    log(tr('install.doneFailed', { installed: installed.length, skipped: skipped.length, failed: failed.length }))
    return { code: 1, summary }
  }
  log(tr('install.doneOk', { installed: installed.length, skipped: skipped.length }))
  return { code: 0, summary }
}
