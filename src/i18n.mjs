// ==============================================================================
// src/i18n.mjs — CLI 人机交互文案的 en/zh/ja 本地化（最简机制）
// ==============================================================================
// 语言检测优先级：CODE_ATLAS_LANG > LC_ALL > LC_CTYPE > LANG；取链上第一个非空值，
// 前缀匹配 zh→中文、ja→日文，其余（含无效值，如 fr/C/POSIX）→英文。
// 范围红线：仅人机交互文案（-h 帮助、install 输出、扫描/合并进度与结果行、顶层参数错误）。
// 生成的 .md 地图内容、规则级诊断（⚠️ [lang/subject] 类，写入地图页脚）绝不经过本模块。
// 缺失键回退英文；键名英文语义化；占位符 {name} 形式。
// ==============================================================================

import process from 'node:process'

const MESSAGES = {
  en: {
    'help.usage': `Usage: {self} [OPTIONS]
       {self} install`,
    'help.description': `High-performance Multi-Stack AST Repo Map Generator using ast-grep.
Supports: React/TS/TSX/JSX, Python, Go, Flutter (Dart), Android (Kotlin/Java), iOS (Swift/C/C++).`,
    'help.subcommands': `Subcommands:
  install               Install this skill into every detected agent skills directory
                        (~/.claude/skills, ~/.agents/skills, ~/.codex/skills,
                        ~/.config/opencode/skills; if none exists, creates ~/.agents/skills).
                        Idempotent: an existing same-version target is skipped.`,
    'help.options': `Options:
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
  -h, --help             Show this help message`,
    'help.examples': `Examples:
  {self} install
  ./bin/code-atlas.mjs -d ./admin-web -n frontend
  ./bin/code-atlas.mjs -d ./backend -n backend -o ./docs/backend_map.md
  ./bin/code-atlas.mjs -d ./flutter_app -n flutter
  ./bin/code-atlas.mjs --merge ./backend_map.md ./flutter_map.md -n all -o ./all_map.md
  ./bin/code-atlas.mjs -d ./lib -n flutter --languages dart -o docs/ast-maps/flutter-ast-map.md`,

    'err.flagNeedsValue': '❌ Error: {flag} requires a value',
    'err.unknownOption': '❌ Unknown option: {option}',
    'err.targetDirMissing': '❌ Error: Target directory does not exist: {dir}',
    'err.languagesEmpty': '❌ Error: --languages is empty',
    'err.languagesEmptyField': "❌ Error: --languages contains empty fields: '{value}' (comma-separated, no gaps)",
    'err.unsupportedLanguage': "❌ Error: unknown or unsupported language: '{lang}' (supported: {langs})",
    'err.installExtraArgs': '❌ Error: install subcommand does not accept extra arguments: {args} (usage: {usage})',

    'scan.start': '🔍 Scanning [{name}] in {dir}...',
    'scan.done': '✅ Generated [{name}] map -> {file} ({total} symbols)',
    'scan.warningsFooter': '⚠️ Found {count} warnings (see map footer):',

    'merge.needsInput': '❌ Error: --merge requires at least one input map',
    'merge.inputMissing': '❌ Error: input map does not exist: {file}',
    'merge.rootMismatch': '⚠️ Input maps have different Source Paths ({first} vs {other}): row keys from different roots may collide; prefer scanning from one repo root',
    'merge.done': '✅ Merged [{name}] -> {file} ({total} symbols)',

    'install.title': '🔎 Code Atlas skill installer (local skill v{version})',
    'install.probing': 'Probing agent skills root directories:',
    'install.probe.exists': 'exists',
    'install.probe.creatable': 'creatable (detected {agent})',
    'install.probe.missing': 'not detected',
    'install.created': '✚ Created {root} (detected {agent})',
    'install.agent.claude': 'Claude Code',
    'install.agent.agents': 'Kimi Code / Codex / pi / Hermes (generic)',
    'install.agent.codex': 'Codex CLI',
    'install.agent.opencode': 'opencode',
    'install.fallback': 'ℹ️ None of the four skills directories exists; creating ~/{root} and installing there by default',
    'install.destOccupied': '❌ Target path is occupied by a non-directory; leaving it untouched to avoid clobbering: {dest} (type: {type})',
    'install.reason.occupied': 'target occupied by a non-directory ({type})',
    'install.rootOccupied': '❌ Agent root path is occupied by a non-directory; leaving it untouched to avoid clobbering: {root} (type: {type})',
    'install.reason.rootOccupied': 'agent root occupied by a non-directory ({type})',
    'install.rootCreateFailed': '❌ Failed to create agent root, skipping this target: {root} ({message})',
    'install.reason.rootCreateFailed': 'failed to create agent root ({message})',
    'install.rootRolledBack': '   ↩️ Rolled back the empty agent root created this run: {root}',
    'install.rootKept': '   ℹ️ Agent root not empty, kept as-is: {root}',
    'install.skipSameVersion': '⏭️  Skipping {dest} (same version v{version})',
    'install.retryIncomplete': '♻️ Retrying incomplete install {dest} (target v{version})',
    'install.replace': '🔄 Replacing {dest} (existing v{old} → v{new})',
    'install.copying': '📦 Installing to {dest}',
    'install.copied': '   ✔ Copied skill payload (SKILL.md + bin/ + src/ + packages/ + package.json + README*, excluding node_modules/test/docs/.git)',
    'install.copyFailed': '   ❌ Copy failed: {message}',
    'install.reason.copyFailed': 'copy failed: {message}',
    'install.rolledBack': '   ↩️ Rolled back the directory created this run (no half-installed leftovers): {dest}',
    'install.markedIncomplete': '   ⚠️ Kept the original directory and wrote marker {marker} — next run will retry instead of skipping',
    'install.npmRunning': '   ⏳ npm install --omit=dev ...',
    'install.npmFailed': '   ❌ npm install failed (giving up on this target, continuing with the rest):\n{detail}',
    'install.reason.npmFailed': 'npm install failed',
    'install.npmDone': '   ✔ npm install done',
    'install.summaryTitle': '📋 Summary:',
    'install.summary.failedTail': '({reason})',
    'install.summary.skippedTail': '(v{version} up to date, skipped)',
    'install.summary.installedTail': '(v{version})',
    'install.doneFailed': '❌ Done: {installed} newly installed, {skipped} skipped, {failed} failed',
    'install.doneOk': '✅ Done: {installed} newly installed, {skipped} skipped, 0 failed',
  },

  zh: {
    'help.usage': `用法: {self} [OPTIONS]
      {self} install`,
    'help.description': `基于 ast-grep 的高性能多语言 AST 仓库地图生成器。
支持: React/TS/TSX/JSX、Python、Go、Flutter (Dart)、Android (Kotlin/Java)、iOS (Swift/C/C++)。`,
    'help.subcommands': `子命令:
  install               把本 skill 安装到每个探测到的 agent skills 目录
                        (~/.claude/skills、~/.agents/skills、~/.codex/skills、
                        ~/.config/opencode/skills；若都不存在则创建 ~/.agents/skills)。
                        幂等: 已存在同版本目标会跳过。`,
    'help.options': `选项:
  -d, --dir <path>       要扫描的目标源码目录（默认: 当前目录 '.'）
  -o, --output <file>    输出 markdown 文件路径（默认: <target_dir>/.repo_map_<name>.md）
  -n, --name <tag>       模块名标签（默认: 目标文件夹名）
  -x, --no-crosslayer   跳过所有跨层区（地图更小；仅符号区）
  -e, --exclude <sub>    排除相对路径包含 <sub> 的行（可重复；值中不能含 '|'）
  -m, --max-lines <N>    符号区截断到 N 行（超大仓库的安全阀）
  --languages <csv>      只扫描这些语言（逗号分隔、无空格）:
                         typescript,javascript,tsx,python,go,dart,kotlin,java,swift,c,cpp
                         （默认: 全部支持的语言）
  --merge <map...>       合并此前生成的地图（假定同一 Source Path 根；-o/-n 生效）
  -v, --version          显示脚本版本
  -h, --help             显示本帮助`,
    'help.examples': `示例:
  {self} install
  ./bin/code-atlas.mjs -d ./admin-web -n frontend
  ./bin/code-atlas.mjs -d ./backend -n backend -o ./docs/backend_map.md
  ./bin/code-atlas.mjs -d ./flutter_app -n flutter
  ./bin/code-atlas.mjs --merge ./backend_map.md ./flutter_map.md -n all -o ./all_map.md
  ./bin/code-atlas.mjs -d ./lib -n flutter --languages dart -o docs/ast-maps/flutter-ast-map.md`,

    'err.flagNeedsValue': '❌ 错误：{flag} 需要一个参数值',
    'err.unknownOption': '❌ 未知选项: {option}',
    'err.targetDirMissing': '❌ 错误：目标目录不存在: {dir}',
    'err.languagesEmpty': '❌ 错误：--languages 为空值',
    'err.languagesEmptyField': "❌ 错误：--languages 含空字段: '{value}'（请用逗号分隔且不留空位）",
    'err.unsupportedLanguage': "❌ 错误：未知或不支持的语言: '{lang}'（支持: {langs}）",
    'err.installExtraArgs': '❌ 错误：install 子命令不接受额外参数: {args}（用法: {usage}）',

    'scan.start': '🔍 正在扫描 [{name}]（{dir}）...',
    'scan.done': '✅ 已生成 [{name}] 地图 -> {file}（{total} 个符号）',
    'scan.warningsFooter': '⚠️ 发现 {count} 条警告（详见地图页脚）：',

    'merge.needsInput': '❌ 错误：--merge 需要至少一个输入地图',
    'merge.inputMissing': '❌ 错误：输入地图不存在: {file}',
    'merge.rootMismatch': '⚠️ 输入地图 Source Path 不一致（{first} vs {other}）：不同相对根下的行键可能冲突，建议在同一仓库根扫描',
    'merge.done': '✅ 已合并 [{name}] -> {file}（{total} 个符号）',

    'install.title': '🔎 Code Atlas skill 安装器（本机 skill v{version}）',
    'install.probing': '探测 agent skills 根目录:',
    'install.probe.exists': '存在',
    'install.probe.creatable': '可创建（检测到 {agent}）',
    'install.probe.missing': '未检测到',
    'install.created': '✚ 已创建 {root}（检测到 {agent}）',
    'install.agent.claude': 'Claude Code',
    'install.agent.agents': 'Kimi Code / Codex / pi / Hermes（通用）',
    'install.agent.codex': 'Codex CLI',
    'install.agent.opencode': 'opencode',
    'install.fallback': 'ℹ️ 四个 skills 目录均不存在，默认创建 ~/{root} 并安装到那里',
    'install.destOccupied': '❌ 目标位置已被非目录占用，为防误删不做任何改动: {dest}（类型: {type}）',
    'install.reason.occupied': '目标位置被非目录占用（{type}）',
    'install.rootOccupied': '❌ agent 根目录被非目录占用，为防误删不做任何改动: {root}（类型: {type}）',
    'install.reason.rootOccupied': 'agent 根目录被非目录占用（{type}）',
    'install.rootCreateFailed': '❌ 根目录创建失败，跳过该目标: {root}（{message}）',
    'install.reason.rootCreateFailed': '根目录创建失败（{message}）',
    'install.rootRolledBack': '   ↩️ 已回滚本轮新建的空根目录: {root}',
    'install.rootKept': '   ℹ️ agent 根目录非空，原样保留: {root}',
    'install.skipSameVersion': '⏭️  跳过 {dest}（版本相同 v{version}）',
    'install.retryIncomplete': '♻️ 重试未完成的安装 {dest}（目标 v{version}）',
    'install.replace': '🔄 将替换 {dest}（现有 v{old} → v{new}）',
    'install.copying': '📦 安装到 {dest}',
    'install.copied': '   ✔ 已复制 skill 本体（SKILL.md + bin/ + src/ + packages/ + package.json + README*，'
      + '排除 node_modules/test/docs/.git）',
    'install.copyFailed': '   ❌ 复制失败: {message}',
    'install.reason.copyFailed': '复制失败: {message}',
    'install.rolledBack': '   ↩️ 已回滚本次新建的目录（失败不留半成品）: {dest}',
    'install.markedIncomplete': '   ⚠️ 已保留原目录并写入标记 {marker}——下次运行将重试而非跳过',
    'install.npmRunning': '   ⏳ npm install --omit=dev ...',
    'install.npmFailed': '   ❌ npm install 失败（该目标放弃，继续其余目标）:\n{detail}',
    'install.reason.npmFailed': 'npm install 失败',
    'install.npmDone': '   ✔ npm install 完成',
    'install.summaryTitle': '📋 汇总:',
    'install.summary.failedTail': '（{reason}）',
    'install.summary.skippedTail': '（v{version} 已是最新，跳过）',
    'install.summary.installedTail': '（v{version}）',
    'install.doneFailed': '❌ 完成：{installed} 个新装，{skipped} 个跳过，{failed} 个失败',
    'install.doneOk': '✅ 完成：{installed} 个新装，{skipped} 个跳过，0 个失败',
  },

  ja: {
    'help.usage': `使い方: {self} [OPTIONS]
        {self} install`,
    'help.description': `ast-grep を使った高速マルチスタック AST リポジトリマップ生成ツール。
対応: React/TS/TSX/JSX、Python、Go、Flutter (Dart)、Android (Kotlin/Java)、iOS (Swift/C/C++)。`,
    'help.subcommands': `サブコマンド:
  install               検出されたすべてのエージェント skills ディレクトリに本 skill をインストール
                        (~/.claude/skills、~/.agents/skills、~/.codex/skills、
                        ~/.config/opencode/skills；1 つも存在しない場合は ~/.agents/skills を作成)。
                        冪等: 同一バージョンの既存ターゲットはスキップ。`,
    'help.options': `オプション:
  -d, --dir <path>       走査対象のソースディレクトリ（既定: カレントディレクトリ '.'）
  -o, --output <file>    出力 markdown ファイルのパス（既定: <target_dir>/.repo_map_<name>.md）
  -n, --name <tag>       モジュール名タグ（既定: 対象フォルダ名）
  -x, --no-crosslayer   クロスレイヤー区をすべてスキップ（マップは小さく、シンボル区のみ）
  -e, --exclude <sub>    相対パスに <sub> を含む行を除外（繰り返し可；値に '|' は不可）
  -m, --max-lines <N>    シンボル区を N 行に切り詰め（巨大リポジトリ向けの安全弁）
  --languages <csv>      指定言語のみ走査（カンマ区切り、空白なし）:
                         typescript,javascript,tsx,python,go,dart,kotlin,java,swift,c,cpp
                         （既定: 対応する全言語）
  --merge <map...>       生成済みマップをマージ（同一 Source Path ルートを前提；-o/-n 有効）
  -v, --version          バージョンを表示
  -h, --help             このヘルプを表示`,
    'help.examples': `例:
  {self} install
  ./bin/code-atlas.mjs -d ./admin-web -n frontend
  ./bin/code-atlas.mjs -d ./backend -n backend -o ./docs/backend_map.md
  ./bin/code-atlas.mjs -d ./flutter_app -n flutter
  ./bin/code-atlas.mjs --merge ./backend_map.md ./flutter_map.md -n all -o ./all_map.md
  ./bin/code-atlas.mjs -d ./lib -n flutter --languages dart -o docs/ast-maps/flutter-ast-map.md`,

    'err.flagNeedsValue': '❌ エラー：{flag} には値が必要です',
    'err.unknownOption': '❌ 不明なオプション: {option}',
    'err.targetDirMissing': '❌ エラー：対象ディレクトリが存在しません: {dir}',
    'err.languagesEmpty': '❌ エラー：--languages が空です',
    'err.languagesEmptyField': "❌ エラー：--languages に空フィールドがあります: '{value}'（カンマ区切りで空欄は不可）",
    'err.unsupportedLanguage': "❌ エラー：不明または未対応の言語です: '{lang}'（対応: {langs}）",
    'err.installExtraArgs': '❌ エラー：install サブコマンドは追加引数を受け付けません: {args}（使い方: {usage}）',

    'scan.start': '🔍 [{name}] を走査中（{dir}）...',
    'scan.done': '✅ [{name}] のマップを生成 -> {file}（{total} シンボル）',
    'scan.warningsFooter': '⚠️ 警告が {count} 件あります（マップのフッターを参照）:',

    'merge.needsInput': '❌ エラー：--merge には入力マップが最低 1 つ必要です',
    'merge.inputMissing': '❌ エラー：入力マップが存在しません: {file}',
    'merge.rootMismatch': '⚠️ 入力マップの Source Path が不一致です（{first} vs {other}）：異なるルートの行キーが衝突する可能性があります。同一リポジトリルートからの走査を推奨します',
    'merge.done': '✅ [{name}] をマージ -> {file}（{total} シンボル）',

    'install.title': '🔎 Code Atlas skill インストーラー（ローカル skill v{version}）',
    'install.probing': 'エージェント skills ルートを検出中:',
    'install.probe.exists': '既存',
    'install.probe.creatable': '作成可（{agent} を検出）',
    'install.probe.missing': '未検出',
    'install.created': '✚ {root} を作成しました（{agent} を検出）',
    'install.agent.claude': 'Claude Code',
    'install.agent.agents': 'Kimi Code / Codex / pi / Hermes（共通）',
    'install.agent.codex': 'Codex CLI',
    'install.agent.opencode': 'opencode',
    'install.fallback': 'ℹ️ 4 つの skills ディレクトリがすべて存在しないため、既定で ~/{root} を作成してそこにインストールします',
    'install.destOccupied': '❌ 対象パスがディレクトリ以外で占有されているため、誤削除防止のため何もしません: {dest}（種別: {type}）',
    'install.reason.occupied': '対象パスがディレクトリ以外で占有（{type}）',
    'install.rootOccupied': '❌ エージェントルートパスがディレクトリ以外で占有されているため、誤削除防止のため何もしません: {root}（種別: {type}）',
    'install.reason.rootOccupied': 'エージェントルートがディレクトリ以外で占有（{type}）',
    'install.rootCreateFailed': '❌ エージェントルートの作成に失敗したためこの対象をスキップします: {root}（{message}）',
    'install.reason.rootCreateFailed': 'エージェントルート作成失敗（{message}）',
    'install.rootRolledBack': '   ↩️ 今回作成した空のエージェントルートをロールバックしました: {root}',
    'install.rootKept': '   ℹ️ エージェントルートは空でないためそのまま保持します: {root}',
    'install.skipSameVersion': '⏭️  {dest} をスキップ（同一バージョン v{version}）',
    'install.retryIncomplete': '♻️ 未完了のインストールを再試行 {dest}（目標 v{version}）',
    'install.replace': '🔄 置き換えます {dest}（既存 v{old} → v{new}）',
    'install.copying': '📦 インストール先 {dest}',
    'install.copied': '   ✔ skill 本体をコピーしました（SKILL.md + bin/ + src/ + packages/ + package.json + README*、'
      + 'node_modules/test/docs/.git は除外）',
    'install.copyFailed': '   ❌ コピー失敗: {message}',
    'install.reason.copyFailed': 'コピー失敗: {message}',
    'install.rolledBack': '   ↩️ 今回作成したディレクトリをロールバックしました（失敗しても中途半端な状態は残しません）: {dest}',
    'install.markedIncomplete': '   ⚠️ 元のディレクトリを保持しマーカー {marker} を書き込みました——次回はスキップせず再試行します',
    'install.npmRunning': '   ⏳ npm install --omit=dev ...',
    'install.npmFailed': '   ❌ npm install 失敗（この対象は諦め、残りを継続します）:\n{detail}',
    'install.reason.npmFailed': 'npm install 失敗',
    'install.npmDone': '   ✔ npm install 完了',
    'install.summaryTitle': '📋 サマリー:',
    'install.summary.failedTail': '（{reason}）',
    'install.summary.skippedTail': '（v{version} 最新のためスキップ）',
    'install.summary.installedTail': '（v{version}）',
    'install.doneFailed': '❌ 完了：新規 {installed} 件、スキップ {skipped} 件、失敗 {failed} 件',
    'install.doneOk': '✅ 完了：新規 {installed} 件、スキップ {skipped} 件、失敗 0 件',
  },
}

// 链上第一个非空值定胜负；无效值不回退到链上后续变量，直接落英文（可预期性优先）
export function detectLang(env = process.env) {
  const raw = String(env.CODE_ATLAS_LANG || env.LC_ALL || env.LC_CTYPE || env.LANG || '').toLowerCase()
  if (raw.startsWith('zh')) return 'zh'
  if (raw.startsWith('ja')) return 'ja'
  return 'en'
}

export function t(key, params = {}) {
  const table = MESSAGES[detectLang()] ?? MESSAGES.en
  let s = table[key] ?? MESSAGES.en[key] ?? key
  for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, String(v))
  return s
}
