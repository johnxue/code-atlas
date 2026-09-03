# Code Atlas

[English](README.md) | [日本語](README.ja.md)

> Code Atlas：一款 AI 编码 Agent 的 skill——把任意代码库变成一份可 grep 的 AST 地图
> （符号行区间、反向引用、API 路由），让 Agent 无需遍寻代码库，以极低 token 成本
> 回答"X 功能在哪里"。

## 1. Code Atlas 是什么

Code Atlas 是面向 AI 编码 Agent（Claude Code、Codex CLI、pi、Kimi Code CLI、opencode、
Hermes）的 **skill**。它把仓库一次性扫描成一份 Markdown 地图——每个符号带
`文件:L起-L止` 行区间、谁 import 了谁、API 路由定义与调用点——Agent 回答定位类问题时
只需 grep 地图，不再逐文件翻代码。

- **为省 token 而生**：地图即索引，Agent 只读地图指到的那几行；
- **零系统依赖**：一次 `npm install` 即可，无需 LSP、索引服务，也无需安装
  jq/perl/ast-grep CLI（AST 引擎与全部语言语法以 npm 包 + prebuild 形式随包分发）；
- **9 种语言**：TypeScript/JavaScript/TSX、Python、Go、Dart/Flutter、Kotlin/Java/Android、Swift、C/C++；
- **内建新鲜度**：每份地图带 Source Commit 与 Worktree 状态，Agent 知道何时该重扫。

```bash
node bin/code-atlas.mjs -d ./你的仓库 -n app -o map.md
grep '^🔗 lib/auth' map.md     # 改它会影响谁？
```

## 2. 在各 Agent 平台上安装

需要 Node >= 18。首选：`npm install -g code-atlas && code-atlas install`——安装器探测各 Agent
的 skills 目录（见下表），把 skill 以 `code-atlas/` 为名复制进去并就地 `npm install`。

从源码安装：把本仓 clone（或复制）到你所用 Agent 的 skills 目录下，目录名必须为
`code-atlas`，然后装一次依赖：

| Agent 平台 | skills 目录 |
|---|---|
| Claude Code | `~/.claude/skills/` |
| Kimi Code CLI | `~/.agents/skills/` |
| Codex CLI | `~/.codex/skills/`（或通用的 `~/.agents/skills/`） |
| opencode | `~/.config/opencode/skills/`（或通用的 `~/.agents/skills/`） |
| pi | `pi install git:<本仓地址>`（或通用的 `~/.agents/skills/`） |
| Hermes | `~/.agents/skills/` |

通用路径示例：

```bash
git clone https://github.com/johnxue/code-atlas ~/.agents/skills/code-atlas
cd ~/.agents/skills/code-atlas && npm install
```

若你的平台路径不同，把目录放到该平台扫描 `SKILL.md` 的位置即可——目录须命名为
`code-atlas` 且仓根的 `SKILL.md` 在其根部。
macOS arm64/x64 直接使用已入库的 prebuild，开箱即用；Linux/Windows 在 CI prebuild 补齐前，
首次安装会现场编译 Dart 语法（仅此时需要 C 编译链）。

## 3. Agent 或人类如何使用

**不是你跑，是 Agent 跑。** 装好后用自然语言直接问：

- "播放续播功能在哪里实现的？"
- "我改 `AudioRepository` 会影响谁？"
- "登录页调了哪些 API 路由？"

Agent 会自行触发 `code-atlas` skill：扫描（或复用新鲜地图）、grep 地图、以 `文件:行号`
作答。想显式调用就输入 `/code-atlas`（`build` / `check` / `merge` 配方见 SKILL.md）。

高级用户也可直接跑 CLI（见第 6 节），例如在 CI 里预生成地图，或用 `--merge` 合并多个模块地图。

## 4. 地图分区结构与检索模式

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

标签速查：`class/abstract-class/sealed-class/interface/enum/method/func/async-func`、
`provider/top-var/const`、`react-component/custom-hook/composable`、
`nest-controller/typeorm-entity/room-entity/room-dao`、`api-route/api-call/api-get/…`、
`gin-handler/gin-middleware`、`c-struct/cpp-class/cpp-func` 等。同符号命中多个标签时
只保留最具体者。

## 5. 已知限制

- **Vue (.vue) / Objective-C**：无 tree-sitter 语法，不索引（检测到 .vue 会告警）。
- **启发式标签**（api-route/api-call、zustand-store 等）：命中 ≠ 100% 语义，遵守
  "地图定位 + 代码确认"两步；Dart api-call 为行级启发式，跨多行调用会漏。
- **导入归一化**：相对路径 / Python 点式 / Dart `package:self` 解析为仓库相对路径；
  TS 别名（`@/`、`~/`）不解析，按原字符串聚合。
- **🔗 外部依赖折叠**：`dart:*`、非 self `package:`、可证实的 JS 裸包名折叠为
  `(N importers, external)`；查库的使用方改从 🌐 区 grep。
- **无语义完备性**：地图不含调用图、字段读写图；不能据地图断言"全部调用方"。
- **--merge 假定各输入同属一个 Source Path 根**；不同根合并会告警。

## 6. 开发（其它）

CLI 参数（与 Bash 旧版一致）：`-d/-o/-n/-x/-e/-m/--languages/--merge/-v/-h`，见 `--help`。

```bash
npm test        # fixture 断言 + 规则清单 parity + gitignore 对拍
npm run golden  # 与 Bash 参考实现剥离对拍 + 快照防回归
```

目录结构：`bin/` CLI 入口 · `src/` 引擎、抽取、归一化、组装、merge · `src/rules/`
各语言规则清单 · `test/` fixture 与 parity 套件 · `packages/lang-dart/` 自建 Dart 语法包
（[nielsenko/tree-sitter-dart @ b57d734c](https://github.com/nielsenko/tree-sitter-dart)，
C 源已入库，5 平台 prebuild CI 见 `.github/workflows/prebuilds.yml`）。

工程细节（gitignore 语义、Dart 语法源与升级流程、prebuild 管线、验证基线）见
[docs/NODE_REWRITE_SPEC.md](docs/NODE_REWRITE_SPEC.md)（输出契约）与仓内 docs/ 目录。

License: MIT © johnxue。
