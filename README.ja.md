# Code Atlas (repo-map)

[English](README.md) | [中文](README.zh-CN.md)

Bash 版 `scan_repo_map.sh` を Node.js + `@ast-grep/napi` で書き直したプロジェクト。リポジトリの
ルートはそのまま agent スキル **repo-map** として機能します（SKILL.md 参照）。Node 版スキャナ
本体と ast-grep 動的言語パッケージを同梱しています。

## ディレクトリ構成

```
bin/scan_repo_map.mjs   CLI エントリ（引数解析/ディスパッチ/検証）、scan_repo_map.sh に対応
src/
  engine.mjs            run_ast_grep 相当層：ファイル探索（gitignore）+ 言語別 AST キャッシュ + findAll + エラー意味論
  extract.mjs           extract_symbols/route/kinds/kind_jq/import/import_kind/urls/dart_api_lines
  textproc.mjs          jq/perl 相当物：import クリーンアップ、URL 第一引数抽出、classlike ラベル、dart_topvar、symname
  normalize.mjs         import 正規化 + 外部依存の折りたたみ
  assemble.mjs          ソート/重複排除/打ち切り + セクション組み立て
  freshness.mjs         git メタデータ + ヘッダ
  merge.mjs             --merge モード
  rules/*.mjs           言語ルール定義（Bash 版 rules_*.sh と機械的に 1:1 対応）
test/
  scan_repo_map.test.mjs  84 件のアサーション（Bash 版テストの移植）
  rules_parity.test.mjs   ルール定義と Bash ソースの機械的交差検証
  gitignore_parity.test.mjs  Bash 実装との gitignore 意味論パリティ
  golden.sh               Node vs Bash の剥離対拍（normalize 後の diff が空であること）+ スナップショット監視
  fixtures/               コミット済み fixture リポジトリ
packages/lang-dart/     Dart 動的言語パック（@ast-grep/lang-* 系スタイル）
  index.js              言語登録エントリ（libraryPath / extensions / languageSymbol / expandoChar）
  type.d.ts             ノード型宣言（gen-types.js が src/node-types.json から生成）
  postinstall.js        prebuild が無い場合のローカルビルドへのフォールバック（@ast-grep/setup-lang）
  src/                  tree-sitter generate の C 生成物（grammar.json / parser.c / scanner.c / tree_sitter/）
  prebuilds/            プリビルト済み parser.so（prebuild-<プラットフォーム>-<アーキ>/ 規約、macOS 分はコミット済み）
  test/verify.mjs       エンドツーエンド検証スクリプト
.github/workflows/prebuilds.yml   5 プラットフォーム prebuild CI
```

## 使い方

```bash
npm install
node bin/scan_repo_map.mjs -d <対象ディレクトリ> -n <モジュール名> -o <地図.md>
node bin/scan_repo_map.mjs --merge a.md b.md -n all -o all.md
```

CLI フラグは Bash 版と完全に同一です（-d/-o/-n/-x/-e/-m/--languages/--merge/-v/-h）。

## 地図のセクション構成と検索パターン

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

## ラベル早見表（シンボル区）

`class/abstract-class/final-class/sealed-class/interface/enum/method/func/async-func`、
`provider/top-var/const`、`react-component/custom-hook/composable`、
`nest-controller/nest-service/typeorm-entity/room-entity/room-dao/hilt-module`、
`api-route/api-call/api-get/api-post/…`、`gin-handler/gin-middleware`、
`c-struct/cpp-class/cpp-func` など。1 つのシンボルに複数ラベルがヒットした場合は
最も具体的なものだけが残ります。

## 既知の制限

- **Vue (.vue) / Objective-C**：tree-sitter 文法がなく、インデックスされません（.vue 検出時は警告）。
- **Dart の api-call は行レベルのヒューリスティック**：複数行にまたがる呼び出しや動的に組み立てた URL は取りこぼすことがあります。
- **ヒューリスティックラベル**（api-route/api-call、zustand-store 等）：ヒット ≠ 100% の意味論——
  必ず「地図で特定 → コードで確認」の二段階を守ってください。
- **インポート正規化**：相対パス / Python ドット式 / Dart `package:self` はリポジトリ相対パスに
  解決して集約；TS エイリアス（`@/`、`~/`）は解決せず書かれたまま集約します。
- **🔗 外部依存の折りたたみ**：`dart:*`、非 self の `package:`、実証可能な JS ベアパッケージ名は
  `(N importers, external)` に折りたたまれます；ライブラリの利用箇所は 🌐 区で `grep '<モジュール名>'`。
- **意味論的完全性なし**：地図にコールグラフやフィールド読み書きグラフは含まれません；
  地図から「すべての呼び出し元」と断言しないでください。
- **--merge は各入力が同一の Source Path ルートに属することを前提**とします；異なるルートのマージは警告します。

## テストと剥離対拍

```bash
npm test        # fixture アサーション + ルール定義パリティ + gitignore パリティ
npm run golden  # 本リポジトリと wisdom_app lib/ で Node vs Bash 対拍（normalize 後 diff は空必須）+ スナップショット検査
```

言語パック可用性ベースライン：@ast-grep/lang-{python,go,kotlin,java,swift,c,cpp} の各パックで
必要な kind がすべて利用可能。自建パックは不要です（Dart は本リポジトリの lang-dart を使用）。

性能ベースライン（wisdom_app lib/、Dart 106 ファイル）：Bash 版 ~5.1s、Node 版 ~0.5s
（各ファイルの AST は一度だけ解析）。

## gitignore 意味論（Bash 版と同一の既知の振る舞い）

- `.gitignore` はスキャン対象ディレクトリが git リポジトリ内（自身または祖先に `.git`）にある
  場合のみ有効（ast-grep → ignore crate の require_git デフォルト意味論）；有効な場合、深い階層の
  .gitignore が浅いものを上書きします。
- 文字クラスは否定 `[!a]`（すなわち `[^a]`）、範囲 `[a-z]` をサポート；`[`/`[!` 直後の `]` は
  リテラルメンバー；閉じていない `[` はリテラルに降格；`\!`、`\#`、`\[` 等のバックスラッシュ
  エスケープが有効です。
- ディレクトリがルールにヒットするとサブツリーごと剪定されます（無視されたディレクトリ内は
  否定ルールで復活できません。git と同じ）。
- Dart api-call の行レベルフォールバックはシンボリックリンクをたどってファイルを読みます
  （Bash 版の `find` に `-type f` なし + perl の `open` がシンボリックリンクをたどることに対応）：
  壊れたシンボリックリンクは読み取り失敗として ⚠️ 診断区に記録されます。**既知の振る舞いであり
  両版で同一。片方だけを締めないでください**（golden 契約が壊れます）。

## Dart 文法ソース

公式 `@ast-grep/lang-dart@0.0.7` の文法は古すぎて使えません。本パックの文法ソース：

- **nielsenko/tree-sitter-dart @ `b57d734c84f510bbd524097902cab671e4dbfca9`**

`src/` はその commit を `tree-sitter generate` した C 生成物です（コミット済み。CI はそれを
直接ビルドし、再 generate は不要）。文法を更新する場合：上記リポジトリを clone し、固定 commit を
checkout、`tree-sitter generate` して `src/` を置き換えてください。

## ビルド

```bash
cd packages/lang-dart
npm install
npm run build          # tree-sitter build -o parser.so（tree-sitter-cli は devDependencies 済み）
```

生成物を `prebuilds/prebuild-<プラットフォーム>-<アーキ>/parser.so`（例：`prebuild-macOS-ARM64`）に
配置してください；`index.js` は `@ast-grep/setup-lang` の `resolvePrebuild` で自動解決し、
prebuild が見つからない場合は postinstall がローカルコンパイルにフォールバックします。

## CI（prebuilds）

`.github/workflows/prebuilds.yml`：`workflow_dispatch` と `push tag v*` で起動。5 プラットフォーム
matrix：macos-13（X64）、macos-14（ARM64）、ubuntu-latest（Linux X64）、ubuntu-24.04-arm
（Linux ARM64）、windows-latest（Windows X64）。各プラットフォームで `npm ci` 後にコミット済みの
`src/` から `tree-sitter build` を実行し、`prebuild-<プラットフォーム>/parser.so` をアップロード；
`merge` ジョブが各プラットフォームの生成物を完全な `prebuilds/` バンドル（artifact `prebuilds-all`）に
まとめ、release や手動取得に供します。

## 検証

```bash
cd packages/lang-dart
node test/verify.mjs /path/to/dart/sources
```

このパックを `registerDynamicLanguage` で登録し（prebuild 解決経由）、ディレクトリ以下の全 `.dart`
を解析して、kind カウント（class/enum/mixin/extension/extension_type/top_level_variable/method/import）、
3 つの pattern ヒット数、parse errors を出力します。

現在のベースライン（wisdom_app リポジトリ、読み取り専用対拍）：

- `lib/features/player`（9 ファイル）：class 29 / enum 1 / top-var 12 / method 110 / import 60 —— ast-grep CLI と一致
- 全量 `lib/`（106 ファイル）：parse errors = 0、kind カウントは文法 dart.so を直接ロードした結果と完全一致
