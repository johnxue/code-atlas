// ==============================================================================
// src/install.mjs — code-atlas install：把 skill 本体装进探测到的 agent skills 目录
// ==============================================================================
// 纯 Node API（fs.cpSync / mkdirSync / rmSync），文件操作不经 shell（Windows 兼容）。
// 唯一的子进程是 npm install --omit=dev（spawnSync 无 shell；Windows 走 npm.cmd + shell，
// 因新版 Node 对 .cmd 直接 spawn 会 EINVAL）。homedir / npmRunner 可注入：
// 测试用临时 HOME + 桩 runner，绝不触碰真实 $HOME、不触网。
// 幂等：目标已存在且 package.json version 相同（且无未完成标记）→ 跳过；不同 → 打印
// 路径后整体替换。安装中途失败：本次新建的目录整体回滚；替换旧版时无法廉价还原，
// 写 .install-incomplete 标记——下次运行据此重试而非被「版本相同」误判为已完成。
// ==============================================================================

import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
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

export function detectRoots(homedir = os.homedir()) {
  return SKILL_ROOTS.map((r) => {
    const root = path.join(homedir, ...r.relative.split('/'))
    return { ...r, root, exists: isDir(root) }
  })
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

/**
 * 安装 skill 本体到所有已存在的 skills 根；四个都不存在时创建 ~/.agents/skills 并装入。
 * @returns {{ code: number, summary: Array<{root: string, dest: string,
 *   status: 'installed'|'skipped'|'failed', version?: string, reason?: string}> }}
 */
export function installSkill(options = {}) {
  const {
    homedir = os.homedir(),
    sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
    log = (m) => console.log(m),
    runNpmInstall = defaultNpmRunner,
  } = options
  const version = readVersion(path.join(sourceRoot, 'package.json')) || 'unknown'
  log(tr('install.title', { version }))

  const roots = detectRoots(homedir)
  log(tr('install.probing'))
  for (const r of roots) {
    const label = tr(r.labelKey)
    log(`   ${r.exists ? tr('install.probe.exists') : tr('install.probe.missing')}  ~/${r.relative}  (${label})`)
  }

  let targets = roots.filter((r) => r.exists)
  if (targets.length === 0) {
    const fallback = roots.find((r) => r.id === 'agents')
    mkdirSync(fallback.root, { recursive: true })
    log(tr('install.fallback', { root: fallback.relative }))
    targets = [fallback]
  }

  const summary = []
  for (const tgt of targets) {
    const dest = path.join(tgt.root, 'code-atlas')
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
      summary.push({ root: tgt.root, dest, status: 'failed', reason: tr('install.reason.copyFailed', { message: e.message }) })
      continue
    }
    log(tr('install.npmRunning'))
    const npmResult = runNpmInstall(dest)
    if (!npmResult.ok) {
      log(tr('install.npmFailed', { detail: indent(npmResult.error || '') }))
      failTarget(dest, destPreExisted, log)
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
