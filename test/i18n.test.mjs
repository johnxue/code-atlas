// ==============================================================================
// test/i18n.test.mjs — CLI 文案本地化（en/zh/ja）回归测试
// ==============================================================================
// 覆盖：detectLang 优先级链（CODE_ATLAS_LANG > LC_ALL > LC_CTYPE > LANG）、前缀匹配、
// 无效值回退英文；-h 三语输出与「已知限制」块在所有语言下都不复活；
// LANG=zh_CN.UTF-8 时 install 首行 🔎 文案为中文（子进程端到端）。
// 子进程环境显式构造，不依赖机器 locale；npm test 其余文件钉 CODE_ATLAS_LANG=en。
// 运行：node test/i18n.test.mjs   （npm test 的最后一环）
// ==============================================================================

import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { detectLang, MESSAGES, t } from '../src/i18n.mjs'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CLI = path.join(REPO_ROOT, 'bin', 'code-atlas.mjs')

let PASS = 0
let FAIL = 0

const ok = (t) => { console.log(`  \x1b[32m✔\x1b[0m ${t}`); PASS++ }
const fail = (t) => { console.log(`  \x1b[31m✘ ${t}\x1b[0m`); FAIL++ }

function assert(label, cond) {
  if (cond) ok(label)
  else fail(label)
}

// 构造干净的子进程环境：清掉全部 locale 变量后按需覆盖（不依赖机器 locale）
function cliEnv(overrides = {}) {
  const env = { ...process.env }
  delete env.CODE_ATLAS_LANG
  delete env.LC_ALL
  delete env.LC_CTYPE
  delete env.LANG
  return { ...env, ...overrides }
}

function runHelp(envOverrides) {
  return spawnSync(process.execPath, [CLI, '-h'], { encoding: 'utf8', env: cliEnv(envOverrides) })
}

function main() {
  // ----------------------------------------------------------------
  console.log('\n\x1b[1m== detect_lang ==\x1b[0m')
  {
    assert('CODE_ATLAS_LANG 压过 LC_ALL/LANG',
      detectLang({ CODE_ATLAS_LANG: 'ja', LC_ALL: 'zh_CN.UTF-8', LANG: 'en_US.UTF-8' }) === 'ja')
    assert('LC_ALL 压过 LC_CTYPE/LANG',
      detectLang({ LC_ALL: 'zh_CN.UTF-8', LC_CTYPE: 'ja_JP.UTF-8', LANG: 'en_US.UTF-8' }) === 'zh')
    assert('LC_CTYPE 压过 LANG',
      detectLang({ LC_CTYPE: 'ja_JP.UTF-8', LANG: 'en_US.UTF-8' }) === 'ja')
    assert('LANG 兜底生效', detectLang({ LANG: 'zh_CN.UTF-8' }) === 'zh')
    assert('全空 → en', detectLang({}) === 'en')
    assert('前缀匹配 zh_CN.UTF-8 → zh', detectLang({ LANG: 'zh_CN.UTF-8' }) === 'zh')
    assert('前缀匹配 ja_JP.UTF-8 → ja', detectLang({ LANG: 'ja_JP.UTF-8' }) === 'ja')
    assert('大小写不敏感（JA）→ ja', detectLang({ CODE_ATLAS_LANG: 'JA' }) === 'ja')
    assert('无效值（fr）→ en，不回退链上后续变量',
      detectLang({ CODE_ATLAS_LANG: 'fr_FR.UTF-8', LANG: 'ja_JP.UTF-8' }) === 'en')
    assert('空字符串视为未设置，落到链上下一变量',
      detectLang({ CODE_ATLAS_LANG: '', LANG: 'ja_JP.UTF-8' }) === 'ja')
    // P2-1/P2-2：语言标签边界匹配（子标签分隔符 - / _）
    assert('zh_HK → zh', detectLang({ CODE_ATLAS_LANG: 'zh_HK' }) === 'zh')
    assert('zh_TW → zh', detectLang({ CODE_ATLAS_LANG: 'zh_TW' }) === 'zh')
    assert('ja-JP → ja', detectLang({ CODE_ATLAS_LANG: 'ja-JP' }) === 'ja')
    assert('zhfoo 非法标签不命中 → en', detectLang({ CODE_ATLAS_LANG: 'zhfoo' }) === 'en')
    assert('jafoo 非法标签不命中 → en', detectLang({ CODE_ATLAS_LANG: 'jafoo' }) === 'en')
  }

  // ----------------------------------------------------------------
  console.log('\n\x1b[1m== help_i18n ==\x1b[0m')
  {
    const ja = runHelp({ CODE_ATLAS_LANG: 'ja' })
    assert('CODE_ATLAS_LANG=ja 时 -h 输出为日文（使い方）', ja.stdout.includes('使い方'))
    assert('ja help 含オプション区', ja.stdout.includes('オプション:'))
    assert('ja help 不含英文 Options: 行', !ja.stdout.includes('Options:'))
    assert('ja help 不含「已知限制」块', !ja.stdout.includes('已知限制'))
    assert('ja help 不含「既知の制限」块', !ja.stdout.includes('既知の制限'))

    const zh = runHelp({ CODE_ATLAS_LANG: 'zh' })
    assert('CODE_ATLAS_LANG=zh 时 -h 输出为中文（用法）', zh.stdout.includes('用法:'))
    assert('zh help 含选项区', zh.stdout.includes('选项:'))
    assert('zh help 不含英文 Options: 行', !zh.stdout.includes('Options:'))
    assert('zh help 不含「已知限制」块', !zh.stdout.includes('已知限制'))

    const en = runHelp({ CODE_ATLAS_LANG: 'en' })
    assert('en help 结构完整（Subcommands/Options/Examples）',
      en.stdout.includes('Subcommands:') && en.stdout.includes('Options:')
      && en.stdout.includes('Examples:'))
    assert('en help 不含「已知限制」块', !en.stdout.includes('已知限制'))

    const fallback = runHelp({ CODE_ATLAS_LANG: 'fr_FR.UTF-8', LANG: 'ja_JP.UTF-8' })
    assert('无效值回退英文（Usage:）', fallback.stdout.includes('Usage:'))
    assert('无效值回退英文（Options:）', fallback.stdout.includes('Options:'))

    const def = runHelp({ LANG: 'en_US.UTF-8' })
    assert('未设 CODE_ATLAS_LANG 时按 LANG 解析（en_US → Usage:）', def.stdout.includes('Usage:'))

    const zhfoo = runHelp({ CODE_ATLAS_LANG: 'zhfoo', LANG: 'zh_CN.UTF-8' })
    assert('CLI 层 zhfoo 回退英文（Usage:，LANG 里的 zh 不再兜底）', zhfoo.stdout.includes('Usage:'))
    assert('CLI 层 zhfoo 不含中文选项区', !zhfoo.stdout.includes('选项:'))
  }

  // ----------------------------------------------------------------
  console.log('\n\x1b[1m== t_missing_key_fallback ==\x1b[0m')
  {
    // P2-2：当前语言表缺键、英文表有键 → 回退英文（含占位符插值）；两表都缺 → 原样返回键名。
    // 用 MESSAGES 注入临时键构造分支，测毕清理；t() 走真实 process.env，临时切换后恢复。
    const saved = process.env.CODE_ATLAS_LANG
    process.env.CODE_ATLAS_LANG = 'zh'
    MESSAGES.en['i18n.test.only_en'] = 'EN FALLBACK {x}'
    try {
      assert('zh 表缺键、英文表有键 → 回退英文并插值', t('i18n.test.only_en', { x: 7 }) === 'EN FALLBACK 7')
      process.env.CODE_ATLAS_LANG = 'en'
      assert('en 为当前语言时直接命中 en 表（非回退分支）', t('i18n.test.only_en', { x: 8 }) === 'EN FALLBACK 8')
      assert('en 环境下普通键直接命中 en 表',
        t('install.title', { version: '9.9.9' }) === '🔎 Code Atlas skill installer (local skill v9.9.9)')
      assert('两表都缺键 → 原样返回键名', t('i18n.test.nowhere') === 'i18n.test.nowhere')
    } finally {
      delete MESSAGES.en['i18n.test.only_en']
      if (saved === undefined) delete process.env.CODE_ATLAS_LANG
      else process.env.CODE_ATLAS_LANG = saved
    }
    assert('临时键已清理，不污染消息表', !('i18n.test.only_en' in MESSAGES.en))
  }

  // ----------------------------------------------------------------
  console.log('\n\x1b[1m== install_first_line_zh ==\x1b[0m')
  {
    // 假 HOME + PATH 清空：探测全部落空、npm spawn 必然失败——首行文案在装包前就已输出，
    // 端到端验证 LANG=zh_CN.UTF-8（CODE_ATLAS_LANG 未设）时 install 首行为中文
    const home = mkdtempSync(path.join(tmpdir(), 'code_atlas_i18n_'))
    const r = spawnSync(process.execPath, [CLI, 'install'], {
      encoding: 'utf8',
      env: cliEnv({ LANG: 'zh_CN.UTF-8', PATH: '/nonexistent', HOME: home }),
    })
    const first = (r.stdout || '').split('\n')[0] || ''
    assert('LANG=zh_CN.UTF-8 时 install 首行 🔎 文案为中文',
      /^🔎 Code Atlas skill 安装器（本机 skill v\d+\.\d+\.\d+）$/.test(first))
    assert('install 首行不含英文 installer 字样', !first.includes('installer'))
    rmSync(home, { recursive: true, force: true })
  }

  console.log('\n========================================')
  console.log(`  i18n  PASS: ${PASS}   FAIL: ${FAIL}`)
  console.log('========================================')
  if (FAIL > 0) process.exit(1)
}

try {
  main()
} catch (e) {
  console.error('\x1b[31m!! i18n 测试运行器自身异常:\x1b[0m', e)
  process.exit(1)
}
