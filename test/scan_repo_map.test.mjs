// ==============================================================================
// test/scan_repo_map.test.mjs — scan_repo_map Node 版 fixture 回归测试
// ==============================================================================
// Bash 版 scripts/tests/scan_repo_map_test.sh 的 17 组共 77 项断言移植。
// 自包含：fixture 写入 mktemp 临时目录，不写真实仓库业务文件。
// 缺 git 依赖时明确报告并以非零退出（原 Bash 版 exit 77 语义改为 1 + 明确信息）。
//
// 运行：node test/scan_repo_map.test.mjs   （或 npm test）
// ==============================================================================

import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, existsSync, symlinkSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Engine } from '../src/engine.mjs'
import { normalizeMap } from './helpers.mjs'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CLI = path.join(REPO_ROOT, 'bin', 'scan_repo_map.mjs')
const COMMITTED_FIXTURE = path.join(REPO_ROOT, 'test', 'fixtures', 'scan_repo_map', 'sample_repo')

let PASS = 0
let FAIL = 0
let SKIP = 0

const info = (t) => console.log(`\n\x1b[1m== ${t} ==\x1b[0m`)
const ok = (t) => { console.log(`  \x1b[32m✔\x1b[0m ${t}`); PASS++ }
const fail = (t) => { console.log(`  \x1b[31m✘ ${t}\x1b[0m`); FAIL++ }
const skip = (t) => { console.log(`  \x1b[33m- ${t}\x1b[0m`); SKIP++ }

// 运行一次扫描（子进程，等价 Bash run_scan）
function runScan(args) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' })
}

// expect_ok <label> <args...>：扫描必须成功
function expectOk(label, ...args) {
  const r = runScan(args)
  if (r.status === 0) ok(label)
  else fail(`${label} (exit=${r.status}, stderr=${(r.stderr || '').slice(0, 200)})`)
}

// expect_fail <label> <args...>：扫描必须失败
function expectFail(label, ...args) {
  const r = runScan(args)
  if (r.status !== 0) ok(label)
  else fail(`${label} (应失败却成功)`)
}

// expect_grep <label> <regex> <file>：文件必须含匹配行
function expectGrep(label, re, file) {
  const content = existsSync(file) ? readFileSync(file, 'utf8') : ''
  if (content.split('\n').some((l) => new RegExp(re).test(l))) ok(label)
  else fail(`${label} (未找到: ${re})`)
}

// expect_nogrep <label> <regex> <file>：文件必须不含匹配行
function expectNogrep(label, re, file) {
  const content = existsSync(file) ? readFileSync(file, 'utf8') : ''
  if (content.split('\n').some((l) => new RegExp(re).test(l))) fail(`${label} (不应出现: ${re})`)
  else ok(label)
}

// ----------------------------------------------------------------
// 依赖检查：git 缺失 → 明确报告并以非零退出（不假绿）
// ----------------------------------------------------------------
function requireTools() {
  const missing = []
  if (spawnSync('git', ['--version'], { encoding: 'utf8' }).status !== 0) missing.push('git')
  if (missing.length > 0) {
    console.error(`  \x1b[31m✘ 依赖缺失: ${missing.join(', ')} 未安装\x1b[0m`)
    console.error(`\n\x1b[31m!! 缺少必要依赖: ${missing.join(', ')}\x1b[0m`)
    console.error('\x1b[31m!! 无法运行扫描相关测试，以非零退出码结束，避免 CI 假绿。\x1b[0m')
    return false
  }
  return true
}

// ----------------------------------------------------------------
// fixture 源码（多语言；含相对导入、package:self、URL 调用点、空格路径）
// ----------------------------------------------------------------
function buildFixture(work) {
  const SRC = path.join(work, 'src')
  for (const d of ['dartlib/models', 'pyapp', 'tsapp', 'gosrc', 'dir with space']) {
    mkdirSync(path.join(SRC, d), { recursive: true })
  }
  writeFileSync(path.join(SRC, 'pubspec.yaml'), 'name: wisdom_app\n')
  writeFileSync(path.join(SRC, 'dartlib/models/playable.dart'), `class Playable {
  final String id;
  Playable(this.id);
  void play() {}
}
`)
  writeFileSync(path.join(SRC, 'dartlib/models/audio_track.dart'), `import 'package:wisdom_app/dartlib/models/playable.dart';
import 'package:flutter/material.dart';
class AudioTrack extends Playable {
  AudioTrack(super.id);
  void pause() {}
}
`)
  writeFileSync(path.join(SRC, 'dartlib/audio_repository.dart'), `import 'package:wisdom_app/dartlib/models/audio_track.dart';
import '../dartlib/models/playable.dart';
class AudioRepository {
  Future<void> fetchTracks() async {
    await Future.value(1);
  }
}
`)
  writeFileSync(path.join(SRC, 'dartlib/player_engine.dart'), `import 'package:wisdom_app/dartlib/audio_repository.dart';
class PlayerEngine {
  final AudioRepository repo;
  PlayerEngine(this.repo);
  void load() {
    // api-call 行级启发式（Dart 无 method_invocation kind）
    final url = Uri.parse('/api/v1/tracks');
    print(url);
  }
}
`)
  writeFileSync(path.join(SRC, 'pyapp/__init__.py'), '')
  writeFileSync(path.join(SRC, 'pyapp/models.py'), `from pydantic import BaseModel
class Track(BaseModel):
    id: int
    title: str
`)
  writeFileSync(path.join(SRC, 'pyapp/routes.py'), `from .models import Track
def get_tracks():
    return []
`)
  writeFileSync(path.join(SRC, 'tsapp/types.ts'), `export interface Track {
  id: number;
  title: string;
}
export function fetchTracks(): Promise<Track[]> {
  return Promise.resolve([]);
}
`)
  writeFileSync(path.join(SRC, 'tsapp/index.ts'), `import { fetchTracks, Track } from './types';
export const load = async () => {
  const t: Track[] = await fetchTracks();
  return t;
};
`)
  writeFileSync(path.join(SRC, 'gosrc/main.go'), `package main
import "fmt"
type Track struct {
    ID    int
    Title string
}
func main() { fmt.Println("hi") }
`)
  writeFileSync(path.join(SRC, 'dir with space/model.dart'), `class SpaceModel {
  void ping() {}
}
`)
  return SRC
}

async function main() {
  if (!requireTools()) {
    skip('依赖缺失：全部扫描测试 SKIP（以非零退出结束）')
    finish(1)
    return
  }

  const WORK = mkdtempSync(path.join(tmpdir(), 'srm_test_'))
  const SRC = buildFixture(WORK)
  const w = (...p) => path.join(WORK, ...p)

  // 1. Dart 符号扫描
  info('dart_symbols')
  expectOk('Dart 扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'dartlib', '-o', w('dart_symbols/sym.md'))
  expectGrep('class AudioTrack 在符号区', '^📁 models/audio_track\\.dart \\[.*\\] class AudioTrack$', w('dart_symbols/sym.md'))
  expectGrep('method play 在符号区', '^📁 models/playable\\.dart \\[.*\\] method play$', w('dart_symbols/sym.md'))

  // 2. Dart package:self 导入归一化
  info('dart_package_self')
  expectOk('package:self 扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'dartlib', '-o', w('dart_package_self/m.md'))
  expectGrep('package:self 归一化为 lib/ 路径', 'lib/dartlib/models/playable\\.dart', w('dart_package_self/m.md'))

  // 3. 相对 import 归一化
  info('relative_import')
  expectOk('相对导入扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'dartlib', '-o', w('relative_import/m.md'))
  expectGrep('相对导入归一到真实模块', 'dartlib/models/playable\\.dart', w('relative_import/m.md'))

  // 4. 反向引用生成
  info('backrefs')
  expectOk('反向引用扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'dartlib', '-o', w('backrefs/m.md'))
  expectGrep('反向引用区出现', '^## 🔗', w('backrefs/m.md'))
  expectGrep('audio_track 有反向引用', '^🔗 .*audio_track\\.dart .*importers', w('backrefs/m.md'))

  // 5. --no-crosslayer 不输出跨层区
  info('no_crosslayer')
  expectOk('no-crosslayer 扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'd', '-x', '-o', w('no_crosslayer/m.md'))
  expectNogrep('无 🌐 区', '^## 🌐', w('no_crosslayer/m.md'))
  expectNogrep('无 🔗 区', '^## 🔗', w('no_crosslayer/m.md'))
  expectNogrep('无 📡 区', '^## 📡', w('no_crosslayer/m.md'))
  expectGrep('仍有符号区', '^📁 .*class ', w('no_crosslayer/m.md'))

  // 6. --exclude 生效
  info('exclude')
  expectOk('exclude 扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'd', '-e', 'models', '-o', w('exclude/m.md'))
  expectNogrep('models/ 被排除', 'models/', w('exclude/m.md'))
  expectGrep('非排除文件仍在', 'audio_repository\\.dart', w('exclude/m.md'))

  // 7. --merge 可生成有效地图
  info('merge')
  runScan(['-d', path.join(SRC, 'dartlib'), '-n', 'a', '-o', w('merge/a.md')])
  runScan(['-d', path.join(SRC, 'pyapp'), '-n', 'b', '-o', w('merge/b.md')])
  expectOk('merge 成功', '--merge', w('merge/a.md'), w('merge/b.md'), '-n', 'ab', '-o', w('merge/merged.md'))
  expectGrep('合并地图含 Architecture Map', '^# Architecture Map: ab', w('merge/merged.md'))
  expectGrep('合并地图含 Dart 符号', 'AudioTrack', w('merge/merged.md'))
  expectGrep('合并地图含 Python 符号', 'def get_tracks', w('merge/merged.md'))
  expectGrep('合并地图有 freshness 头', '^# Source Commit: .*', w('merge/merged.md'))
  expectGrep('合并头含 Merged Source Path', '^# Merged Source Path: .*dartlib .*a\\.md', w('merge/merged.md'))
  expectGrep('合并头含 pyapp 的 Merged Source Path', '^# Merged Source Path: .*pyapp .*b\\.md', w('merge/merged.md'))
  expectGrep('合并头含 Merged Source Commit', '^# Merged Source Commit: .*', w('merge/merged.md'))
  expectGrep('合并头含 Merged Worktree', '^# Merged Worktree: (clean|dirty|unavailable) .*', w('merge/merged.md'))
  expectGrep('顶层 Source Path 标记 merged', '^# Source Path: \\(merged', w('merge/merged.md'))
  expectGrep('顶层 Source Commit 标记 merged', '^# Source Commit: unavailable \\(merged\\)', w('merge/merged.md'))
  // 无法读取时标 unavailable：构造一个无 freshness 头的输入地图
  writeFileSync(w('merge/old.md'), '# Architecture Map: old\n# Source Path: /some/old/path\n\n📁 file.dart [L1] class Foo\n')
  expectOk('merge 含旧格式输入成功', '--merge', w('merge/old.md'), w('merge/b.md'), '-n', 'ab', '-o', w('merge/merged_old.md'))
  expectGrep('旧格式输入的 commit 标 unavailable', '^# Merged Source Commit: unavailable .*old\\.md', w('merge/merged_old.md'))
  expectGrep('旧格式输入的 worktree 标 unavailable', '^# Merged Worktree: unavailable .*old\\.md', w('merge/merged_old.md'))

  // 8. --languages dart 不运行/不输出其他语言规则
  info('languages_dart_only')
  expectOk('dart-only 扫描成功', '-d', SRC, '-n', 'all', '--languages', 'dart', '-o', w('languages_dart_only/m.md'))
  expectNogrep('无 Python 符号', '^📁 .*\\.py ', w('languages_dart_only/m.md'))
  expectNogrep('无 Go 符号', '^📁 .*\\.go ', w('languages_dart_only/m.md'))
  expectNogrep('无 TS 符号', '^📁 .*\\.ts ', w('languages_dart_only/m.md'))
  expectGrep('有 Dart 符号', '^📁 .*\\.dart ', w('languages_dart_only/m.md'))

  // 9. 无效 --languages 非零退出
  info('languages_invalid')
  expectFail('未知语言退出非零', '-d', SRC, '-n', 'x', '--languages', 'ruby', '-o', w('languages_invalid/m.md'))
  expectFail('空 --languages 退出非零', '-d', SRC, '-n', 'x', '--languages', '', '-o', w('languages_invalid/m.md'))
  expectFail('混合未知语言退出非零', '-d', SRC, '-n', 'x', '--languages', 'dart,go,perl', '-o', w('languages_invalid/m.md'))
  expectFail('尾随逗号退出非零', '-d', SRC, '-n', 'x', '--languages', 'dart,', '-o', w('languages_invalid/m.md'))
  expectFail('前导逗号退出非零', '-d', SRC, '-n', 'x', '--languages', ',dart', '-o', w('languages_invalid/m.md'))
  expectFail('连续逗号退出非零', '-d', SRC, '-n', 'x', '--languages', 'dart,,go', '-o', w('languages_invalid/m.md'))
  {
    const r = runScan(['-d', SRC, '-n', 'x', '--languages', 'dart,', '-o', w('languages_invalid/m.md')])
    if (r.status === 0) fail('尾随逗号本应报错（退出码为 0）')
    else if ((r.stderr || '').includes('空字段')) ok('尾随逗号错误信息明确（含 空字段）')
    else fail('尾随逗号错误信息不明确')
  }

  // 10. header 含 Source Commit / Worktree / Scanner Version / Languages
  info('freshness_header')
  expectOk('freshness 扫描成功', '-d', SRC, '-n', 'f', '-o', w('freshness_header/m.md'))
  expectGrep('Source Commit 存在', '^# Source Commit: .*', w('freshness_header/m.md'))
  expectGrep('Worktree 存在', '^# Worktree: (clean|dirty|unavailable)', w('freshness_header/m.md'))
  expectGrep('Scanner Version 存在', '^# Scanner Version: .*', w('freshness_header/m.md'))
  expectGrep('Languages 存在', '^# Languages: .*', w('freshness_header/m.md'))
  expectGrep('Languages 值正确', '^# Languages: typescript,javascript,tsx,python,go,dart,kotlin,java,swift,c,cpp', w('freshness_header/m.md'))

  // 11. 输出排序稳定：连续两次运行内容一致（忽略生成时间）
  info('determinism')
  runScan(['-d', SRC, '-n', 'd', '-o', w('determinism/m1.md')])
  runScan(['-d', SRC, '-n', 'd', '-o', w('determinism/m2.md')])
  if (JSON.stringify(normalizeMap(w('determinism/m1.md'))) === JSON.stringify(normalizeMap(w('determinism/m2.md')))) {
    ok('两次运行内容一致')
  } else {
    fail('两次运行内容不一致')
  }

  // 12. 规则错误时的 ⚠️ 诊断契约（Node 版直接测 Engine 层语义）
  info('rule_error_diagnostic')
  {
    // 非法 lang → 记诊断并返回空（对应 Bash run_ast_grep rc=2 契约）
    const e1 = new Engine()
    const r1 = e1.findAll('nonexistent_lang', { pattern: 'x' }, 'bad-lang-test')
    if (r1.length === 0) ok('非法 lang 返回空（不阻断）')
    else fail('非法 lang 应返回空')
    if (e1.warnings.some((x) => x.includes('⚠️ [nonexistent_lang/bad-lang-test]'))) ok('非法 lang 记入诊断')
    else fail('非法 lang 未记入诊断')
    // 无匹配 → 静默跳过，无诊断（对应 rc=1 契约）
    const e2 = new Engine()
    await e2.load(path.join(SRC, 'dartlib'), ['dart'])
    const before = e2.warnings.length
    const r2 = e2.findAll('dart', { pattern: 'class DefinitelyNotPresentXYZ { $$$ }' }, 'no-match')
    if (r2.length === 0) ok('无匹配返回空（静默跳过）')
    else fail('无匹配应返回空')
    if (e2.warnings.length === before) ok('无匹配不产生诊断')
    else fail('无匹配不应产生诊断')
    // 端到端：单规则失败不阻断整图——含坏 dart 源文件的目录仍产出地图
    const TESTDIR = w('rule_error_diagnostic')
    mkdirSync(TESTDIR, { recursive: true })
    writeFileSync(path.join(TESTDIR, 'broken.dart'), 'class Broken {\n  void x( {\n}\n')
    expectOk('含坏源文件仍完成扫描', '-d', TESTDIR, '-n', 'b', '-o', path.join(TESTDIR, 'm.md'))
    expectGrep('坏源目录仍产出符号', 'Broken', path.join(TESTDIR, 'm.md'))
    // Dart API 回退扫描的真实错误（坏软链）须写入 ⚠️ 诊断，不静默丢弃
    const APIDIR = path.join(TESTDIR, 'api_err')
    mkdirSync(APIDIR, { recursive: true })
    try { symlinkSync('/nonexistent/nowhere.dart', path.join(APIDIR, 'broken_link.dart')) } catch { /* 已存在 */ }
    expectOk('含坏链接的 dart 扫描成功', '-d', APIDIR, '-n', 'ae', '-o', path.join(APIDIR, 'm.md'))
    expectGrep('Dart API 回退错误写入诊断区', 'api-lines', path.join(APIDIR, 'm.md'))
    // 无坏文件的正常目录不应出现 api-lines 诊断
    expectOk('正常 dart 目录扫描成功', '-d', path.join(SRC, 'dartlib'), '-n', 'ok', '-o', path.join(APIDIR, 'normal.md'))
    expectNogrep('正常目录无 api-lines 诊断', 'api-lines', path.join(APIDIR, 'normal.md'))
  }

  // 13. 路径含空格时可工作
  info('spaces_in_path')
  expectOk('空格路径扫描成功', '-d', path.join(SRC, 'dir with space'), '-n', 'sp ace', '-o', w('spaces_in_path/out.md'))
  expectGrep('空格路径含符号', '^📁 model\\.dart \\[.*\\] class SpaceModel$', w('spaces_in_path/out.md'))

  // 14. 目标目录无 .git 时扫描正常完成，header 写 unavailable
  info('no_git')
  if (existsSync(path.join(SRC, '.git'))) {
    skip('fixture 意外含 .git，跳过无 git 用例')
  } else {
    expectOk('无 git 扫描成功', '-d', SRC, '-n', 'nogit', '-o', w('no_git/m.md'))
    expectGrep('Source Commit 写 unavailable', '^# Source Commit: unavailable', w('no_git/m.md'))
    expectGrep('Worktree 写 unavailable', '^# Worktree: unavailable', w('no_git/m.md'))
  }

  // 15. 真实 Flutter 目录（wisdom_app lib/）若存在且是 git 仓库 → 验证 header 有 commit
  info('git_freshness')
  const LIB = '/Users/xuehai/development/wisdom_app/lib'
  if (existsSync(LIB) && spawnSync('git', ['-C', '/Users/xuehai/development/wisdom_app', 'rev-parse', '--git-dir']).status === 0) {
    expectOk('git 仓库扫描成功', '-d', LIB, '-n', 'lib', '-o', w('git_freshness/m.md'))
    expectGrep('Source Commit 为 SHA', '^# Source Commit: [0-9a-f]{40}', w('git_freshness/m.md'))
    expectGrep('Worktree 为 clean 或 dirty', '^# Worktree: (clean|dirty)', w('git_freshness/m.md'))
  } else {
    skip('无本仓 lib/ 或非 git，跳过')
  }

  // 16. 多语言中某语言无文件应继续（部分语言可扫）
  info('partial_language')
  expectOk('多语言扫描成功', '-d', SRC, '-n', 'multi', '--languages', 'dart,python,go', '-o', w('partial_language/m.md'))
  expectGrep('含 Dart', '^📁 .*\\.dart ', w('partial_language/m.md'))
  expectGrep('含 Python', '^📁 .*\\.py ', w('partial_language/m.md'))
  expectGrep('含 Go', '^📁 .*\\.go ', w('partial_language/m.md'))

  // 17. 已提交 fixture 仓库可扫描（test/fixtures/scan_repo_map/sample_repo，无 .git）
  info('committed_fixture')
  if (existsSync(COMMITTED_FIXTURE)) {
    expectOk('fixture 仓库扫描成功', '-d', COMMITTED_FIXTURE, '-n', 'fixture', '-o', w('committed_fixture/m.md'))
    expectGrep('fixture 含 Dart 符号', '^📁 .*\\.dart .*class (Item|Tag)', w('committed_fixture/m.md'))
    expectGrep('fixture 含 Python 符号', '^📁 .*\\.py ', w('committed_fixture/m.md'))
    if (spawnSync('git', ['-C', COMMITTED_FIXTURE, 'rev-parse', '--git-dir']).status === 0) {
      expectGrep('fixture 在 git 内 → 有 commit', '^# Source Commit: [0-9a-f]{40}', w('committed_fixture/m.md'))
    } else {
      expectGrep('fixture 无 git → unavailable', '^# Source Commit: unavailable', w('committed_fixture/m.md'))
    }
  } else {
    skip('已提交 fixture 缺失，跳过')
  }

  rmSync(WORK, { recursive: true, force: true })
  finish(0)
}

function finish(code) {
  console.log('\n========================================')
  console.log(`  PASS: ${PASS}   FAIL: ${FAIL}   SKIP: ${SKIP}`)
  console.log('========================================')
  if (FAIL > 0) process.exit(1)
  process.exit(code)
}

main().catch((e) => {
  console.error('\x1b[31m!! 测试运行器自身异常:\x1b[0m', e)
  finish(1)
})
