# scan_repo_map

将 Bash 版 `scripts/scan_repo_map.sh`（位于 wisdom_app 仓库）重写为 Node.js + `@ast-grep/napi` 的项目，后续会封装为 agent skill。本仓库首先提供 ast-grep 动态语言包。

## 目录结构

```
packages/lang-dart/     Dart 动态语言包（@ast-grep/lang-* 系列风格）
  index.js              语言注册入口（libraryPath / extensions / languageSymbol / expandoChar）
  index.d.ts            LanguageRegistration 类型（与官方包一致）
  type.d.ts             节点类型声明，由 gen-types.js 从 src/node-types.json 生成
  gen-types.js          type.d.ts 生成脚本
  postinstall.js        无 prebuild 时回退本地构建（@ast-grep/setup-lang）
  src/                  tree-sitter generate 的 C 产物（grammar.json / parser.c / scanner.c / tree_sitter/）
  prebuilds/            预编译 parser.so（按 prebuild-<平台>-<架构>/ 目录约定）
  test/verify.mjs       端到端验证脚本
.github/workflows/prebuilds.yml   5 平台 prebuild CI
```

## Dart 语法源

官方 `@ast-grep/lang-dart@0.0.7` 的语法过旧不可用。本包语法源为：

- **nielsenko/tree-sitter-dart @ `b57d734c84f510bbd524097902cab671e4dbfca9`**

`src/` 内是该 commit 经 `tree-sitter generate` 产出的 C 文件（已提交进仓库，CI 直接构建，无需重新 generate）。如需升级语法，clone 上述仓库、checkout 固定 commit、`tree-sitter generate` 后替换 `src/`。

## 构建

```bash
cd packages/lang-dart
npm install
npm run build          # tree-sitter build -o parser.so（需要 tree-sitter-cli，已列入 devDependencies）
```

把产物放入 `prebuilds/prebuild-<平台>-<架构>/parser.so`（如 `prebuild-macOS-ARM64`），`index.js` 通过 `@ast-grep/setup-lang` 的 `resolvePrebuild` 自动解析；找不到 prebuild 时 postinstall 回退本地编译。

## CI（prebuilds）

`.github/workflows/prebuilds.yml`：触发方式为 `workflow_dispatch` 与 `push tag v*`。matrix 5 平台：macos-13（X64）、macos-14（ARM64）、ubuntu-latest（Linux X64）、ubuntu-24.04-arm（Linux ARM64）、windows-latest（Windows X64）。每平台 `npm ci` 后用仓内 `src/` 执行 `tree-sitter build`，上传 `prebuild-<平台>/parser.so`；`merge` job 把各平台产物合并为完整 `prebuilds/` bundle（artifact `prebuilds-all`），供 release 或手动取用。

## 验证

```bash
cd packages/lang-dart
node test/verify.mjs /path/to/dart/sources
```

脚本通过 `registerDynamicLanguage` 注册本包（走 prebuild 解析），对目录全量 `.dart` 解析，输出 kind 计数（class/enum/mixin/extension/extension_type/top_level_variable/method/import）、3 个 pattern 命中数与 parse errors。

当前基线（wisdom_app 仓库，只读对拍）：

- `lib/features/player`（9 文件）：class 29 / enum 1 / top-var 12 / method 110 / import 60，与 ast-grep CLI 对拍一致
- 全量 `lib/`（106 文件）：parse errors = 0，kind 计数与直接加载语法源 dart.so 的结果完全一致
