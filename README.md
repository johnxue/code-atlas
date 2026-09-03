# scan_repo_map

将 Bash 版 `scripts/scan_repo_map.sh`（位于 wisdom_app 仓库）重写为 Node.js + `@ast-grep/napi` 的项目，后续会封装为 agent skill。本仓库包含完整的 Node 版扫描器与 ast-grep 动态语言包。

## 目录结构

```
bin/scan_repo_map.mjs   CLI 入口（参数解析/调度/校验），对应 scan_repo_map.sh
src/
  engine.mjs            run_ast_grep 等价层：文件发现(gitignore) + 按语言缓存 AST + findAll + 错误语义
  extract.mjs           extract_symbols/route/kinds/kind_jq/import/import_kind/urls/dart_api_lines
  textproc.mjs          jq/perl 等价物：import 清洗、urls 首参提取、classlike 标签、dart_topvar、symname
  normalize.mjs         导入归一化 + 外部依赖折叠
  assemble.mjs          排序/去重/截断 + 各区组装
  freshness.mjs         git 元数据 + header
  merge.mjs             --merge 模式
  rules/*.mjs           语言规则清单（与 Bash 版 rules_*.sh 逐条机械对应）
test/
  scan_repo_map.test.mjs  77 项断言（Bash 版测试的移植）
  rules_parity.test.mjs   规则清单与 Bash 源文件机械交叉校验
  golden.sh               Node 版 vs Bash 版 golden 对拍（normalize 后 diff 须为空）
  fixtures/               已提交 fixture 仓库
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

## 使用

```bash
npm install
node bin/scan_repo_map.mjs -d <目标目录> -n <模块名> -o <输出地图.md>
node bin/scan_repo_map.mjs --merge a.md b.md -n all -o all.md
```

CLI 参数与 Bash 版完全一致（-d/-o/-n/-x/-e/-m/--languages/--merge/-v/-h）。

## 地图分区结构与检索模式

| 区 | 行形态 | 回答的问题 | 检索方式 |
|---|---|---|---|
| 符号区 | `📁 <relpath> [L起-L止] <标签> <名称>` | X 定义在哪 | `grep 'class AuthRepository' map.md` → `read 文件:L起-L止` |
| 🌐 导入图谱 | `📁 <file> imports(k): a, b…` | 文件依赖什么 | `grep '^📁 <file>' map.md` |
| 🚪 文件符号清单 | `🚪 <file> exports(k): n1, n2…` | 哪个文件有某符号（含私有） | `grep 'exports(.*<名称>' map.md` |
| 🔗 反向引用 | `🔗 <模块> (k importers): f1…` | 改它影响谁 | `grep '^🔗 <模块>' map.md` |
| 📡 API 路径 | `api-route` 定义 / `api-call` 调用点 | 前后端路由对应 | 跨端 grep 同一路径字面量 |

空区自动省略。**组合跳转示例**——"某页面的数据从哪来、改字段影响谁"：

1. `grep '<PageName>' map.md` → 拿到文件与行区间；
2. `grep '^📁 <该文件> imports'` → 见其 providers/controllers 依赖；
3. `grep '^🔗 <controller/repository 路径>'` → 拿到全部调用方（影响面）；
4. 命中后才 `read` 具体文件。

## 标签速查（符号区）

`class/abstract-class/final-class/sealed-class/interface/enum/method/func/async-func`、
`provider/top-var/const`、`react-component/custom-hook/composable`、
`nest-controller/nest-service/typeorm-entity/room-entity/room-dao/hilt-module`、
`api-route/api-call/api-get/api-post/…`、`gin-handler/gin-middleware`、
`c-struct/cpp-class/cpp-func` 等。同符号命中多个标签时只保留最具体者。

## 已知限制

- **Vue (.vue) / Objective-C**：无 tree-sitter 语法，不索引（检测到 .vue 会告警）。
- **Dart api-call 为行级启发式**：跨多行调用、动态拼接 URL 可能遗漏。
- **启发式标签**（api-route/api-call、zustand-store 等）：命中 ≠ 100% 语义，
  遵守"地图定位 + 代码确认"两步。
- **导入归一化**：相对路径 / Python 点式 / Dart `package:self` 解析为仓库相对路径后聚合；
  TS 别名（`@/`、`~/`）不解析，按原字符串聚合。
- **🔗 外部依赖折叠**：`dart:*`、非 self `package:`、可证实的 JS 裸包名折叠为
  `(N importers, external)`；查"谁在用某库"改从 🌐 区 `grep '<模块名>'`。
- **无语义完备性**：地图不含调用图、字段读写图；不能据地图断言"全部调用方"。
- **--merge 假定各输入同属一个 Source Path 根**；不同根合并会告警。


## 测试与对拍

```bash
npm test        # 77 项 fixture 断言 + 规则清单与 Bash 源文件交叉校验
npm run golden  # 对 scan_repo_map 仓自身与 wisdom_app lib/ 做 Node vs Bash 对拍（须逐字节一致）
```

语言包可用性基线：@ast-grep/lang-{python,go,kotlin,java,swift,c,cpp} 各包所需 kind 全部可用，无需自建（dart 用本仓 lang-dart）。

性能基线（wisdom_app lib/，106 个 dart 文件）：Bash 版 ~5.1s，Node 版 ~0.5s（AST 每文件仅解析一次）。

## gitignore 语义（与 Bash 版一致的已知行为）

- `.gitignore` 仅当扫描目录位于 git 仓内（自身或祖先含 `.git`）时生效（ast-grep → ignore crate 的 require_git 默认语义）；生效时祖先与逐层 `.gitignore` 深层覆盖浅层。
- 字符类支持取反 `[!a]`（即 `[^a]`）、范围 `[a-z]`、`]` 紧随 `[`/`[!` 时为字面量、未闭合 `[` 降级为字面量；`\!`、`\#`、`\[` 等反斜杠转义有效。
- 目录被规则命中即整棵剪枝（被忽略目录内不可用否定规则复活，与 git 一致）。
- Dart api-call 行级回退会跟随软链读取文件（对应 Bash 版 `find` 无 `-type f` + perl `open` 跟随软链）：坏软链读失败记入 ⚠️ 诊断区。**已知行为，两版一致，勿单方面收紧**（会破坏 golden 契约）。

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
