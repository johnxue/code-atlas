# Code Atlas

[English](README.md) | [中文](README.zh-CN.md)

> Code Atlas：AI コーディング Agent 向けスキル——任意のリポジトリを grep 可能な AST 地図
> （シンボルの行区間・逆参照・API ルート）に変え、Agent がコードベースを探し回ることなく、
> ごく低いトークンコストで「X 機能はどこ」に答えられるようにします。

## 1. Code Atlas とは

Code Atlas は AI コーディング Agent（Claude Code、Codex CLI、pi、Kimi Code CLI、opencode、
Hermes）向けの **skill** です。リポジトリを一度スキャンして 1 つの Markdown 地図を生成します
——すべてのシンボルに `ファイル:L開始-L終了` の行区間、誰が誰を import しているか、API ルートの
定義と呼び出し箇所——Agent はファイルを端から読む代わりに地図を grep して定位系の質問に答えます。

- **トークン節約のための設計**：地図が索引。Agent は地図が指す行だけを読みます；
- **システム依存ゼロ**：`npm install` 一度きり。LSP もインデックスサーバも、
  jq/perl/ast-grep CLI のインストールも不要（AST エンジンと全言語文法は prebuild 付き
  npm パッケージとして同梱）；
- **9 言語対応**：TypeScript/JavaScript/TSX、Python、Go、Dart/Flutter、Kotlin/Java/Android、Swift、C/C++；
- **フレッシュネス内蔵**：すべての地図に Source Commit と Worktree 状態を記録。
  いつ再スキャンすべきかを Agent が判断できます。

```bash
node bin/code-atlas.mjs -d ./あなたのリポジトリ -n app -o map.md
grep '^🔗 lib/auth' map.md     # これを変えると誰に影響する？
```

## 2. 各 Agent プラットフォームでのインストール

Node >= 18 が必要です。推奨：`npm install -g code-atlas && code-atlas install`——インストーラは
各 Agent の skills ディレクトリ（下表）を検出し、skill を `code-atlas/` としてコピーして
その場で `npm install` します。

ソースからの場合：このリポジトリを使用中の Agent の skills ディレクトリに `code-atlas`
という名前で clone（またはコピー）し、依存を一度インストールします：

| Agent プラットフォーム | skills ディレクトリ |
|---|---|
| Claude Code | `~/.claude/skills/` |
| Kimi Code CLI | `~/.agents/skills/` |
| Codex CLI | `~/.codex/skills/`（または汎用の `~/.agents/skills/`） |
| opencode | `~/.config/opencode/skills/`（または汎用の `~/.agents/skills/`） |
| pi | `pi install git:<このリポジトリのURL>`（または汎用の `~/.agents/skills/`） |
| Hermes | `~/.agents/skills/` |

汎用パスの例：

```bash
git clone https://github.com/johnxue/code-atlas ~/.agents/skills/code-atlas
cd ~/.agents/skills/code-atlas && npm install
```

プラットフォームのパスが異なる場合は、そのプラットフォームが `SKILL.md` をスキャンする場所に
置いてください——ディレクトリ名は `code-atlas`、リポジトリの `SKILL.md` がその直下にある必要があります。
macOS arm64/x64 はコミット済み prebuild で即座に動きます；Linux/Windows は CI の prebuild が
揃うまで、初回インストール時に Dart 文法をソースからビルドします（その場合のみ C ツールチェインが必要）。

## 3. Agent／人間からの使い方

**実行するのはあなたではなく Agent です。** インストール後は自然言語で尋ねるだけ：

- 「再生レジューム機能はどこに実装されている？」
- 「`AudioRepository` を変えると誰に影響する？」
- 「ログインページはどの API ルートを呼んでいる？」

Agent が `code-atlas` スキルを自動で起動し、スキャン（または新鮮な地図を再利用）→ 地図を grep →
`ファイル:行号` で回答します。明示的に呼ぶには `/code-atlas` と入力してください
（`build` / `check` / `merge` のレシピは SKILL.md 参照）。

パワーユーザは CLI を直接実行することもできます（第 6 節）。CI で地図を事前生成したり、
`--merge` で複数モジュールの地図を統合したりする場合に便利です。

## 4. 地図のセクション構成と検索パターン

| セクション | 行の形 | 答える問い | 検索方法 |
|---|---|---|---|
| シンボル区 | `📁 <relpath> [L開始-L終了] <ラベル> <名前>` | X はどこに定義されているか | `grep 'class AuthRepository' map.md` → `read ファイル:L開始-L終了` |
| 🌐 インポートグラフ | `📁 <file> imports(k): a, b…` | ファイルが何に依存しているか | `grep '^📁 <file>' map.md` |
| 🚪 ファイルシンボル一覧 | `🚪 <file> exports(k): n1, n2…` | どのファイルにそのシンボルがあるか（私有含む） | `grep 'exports(.*<名前>' map.md` |
| 🔗 逆参照 | `🔗 <モジュール> (k importers): f1…` | それを変えると誰に影響するか | `grep '^🔗 <モジュール>' map.md` |
| 📡 API パス | `api-route` 定義 / `api-call` 呼び出し点 | フロント/バックのルート対応 | 同じパスリテラルを跨端 grep |

空セクションは自動で省略されます。**組み合わせジャンプ例**——「このページのデータはどこから
来るか、フィールドを変えると誰に影響するか」：

1. `grep '<PageName>' map.md` → ファイルと行区間を取得；
2. `grep '^📁 <そのファイル> imports'` → providers/controllers への依存を確認；
3. `grep '^🔗 <controller/repository のパス>'` → 全呼び出し元（影響範囲）を取得；
4. ヒットしてから初めて `read` で具体的なファイルを読む。

ラベル早見表：`class/abstract-class/sealed-class/interface/enum/method/func/async-func`、
`provider/top-var/const`、`react-component/custom-hook/composable`、
`nest-controller/typeorm-entity/room-entity/room-dao`、`api-route/api-call/api-get/…`、
`gin-handler/gin-middleware`、`c-struct/cpp-class/cpp-func` など。1 つのシンボルに複数ラベルが
ヒットした場合は最も具体的なものだけが残ります。

## 5. 既知の制限

- **Vue (.vue) / Objective-C**：tree-sitter 文法がなく、インデックスされません（.vue 検出時は警告）。
- **ヒューリスティックラベル**（api-route/api-call、zustand-store 等）：ヒット ≠ 100% の意味論——
  必ず「地図で特定 → コードで確認」の二段階を。Dart の api-call は行レベルのヒューリスティックで、
  複数行にまたがる呼び出しを取りこぼします。
- **インポート正規化**：相対パス / Python ドット式 / Dart `package:self` はリポジトリ相対パスに
  解決；TS エイリアス（`@/`、`~/`）は解決せず書かれたまま集約。
- **🔗 外部依存の折りたたみ**：`dart:*`、非 self の `package:`、実証可能な JS ベアパッケージ名は
  `(N importers, external)` に折りたたまれます；ライブラリ利用箇所は 🌐 区を grep。
- **意味論的完全性なし**：コールグラフやフィールド読み書きグラフは含みません；
  地図から「すべての呼び出し元」と断言しないでください。
- **--merge は各入力が同一の Source Path ルートに属することを前提**；異なるルートのマージは警告します。

## 6. 開発（その他）

CLI フラグ（旧 Bash 版と同一）：`-d/-o/-n/-x/-e/-m/--languages/--merge/-v/-h`、`--help` 参照。

```bash
npm test        # fixture アサーション + ルール定義パリティ + gitignore 対拍
npm run golden  # Bash 参照実装との剥離対拍 + スナップショット監視
```

ディレクトリ構成：`bin/` CLI エントリ · `src/` エンジン、抽出、正規化、組み立て、merge ·
`src/rules/` 言語別ルール定義 · `test/` fixture と parity スイート · `packages/lang-dart/`
自建 Dart 文法パック（[nielsenko/tree-sitter-dart @ b57d734c](https://github.com/nielsenko/tree-sitter-dart)、
C ソースはコミット済み、5 プラットフォーム prebuild CI は `.github/workflows/prebuilds.yml`）。

詳細なエンジニアリングノート（gitignore 意味論、Dart 文法ソースと更新手順、prebuild パイプライン、
検証ベースライン）は [docs/NODE_REWRITE_SPEC.md](docs/NODE_REWRITE_SPEC.md)（出力契約）と
`docs/` ディレクトリを参照してください。

License: MIT © johnxue.
