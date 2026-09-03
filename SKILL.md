---
name: scan-repo-map
description: AST 代码地图生成与检索。当需要在陌生/大型代码库中定位某个功能的实现、查符号定义所在文件与行区间、分析改动的反向引用影响面、检索 API 路由与调用点、或评估地图是否过期需要重扫时使用。支持 TS/JS/TSX、Python、Go、Dart/Flutter、Kotlin/Java/Android、Swift、C/C++。
---

# scan-repo-map

生成并检索一个仓库的 AST 代码地图：一份带 freshness 头的 Markdown 索引，用 grep 定位代码，
代替逐文件阅读。检索技巧见本目录 README.md（工具手册）；本文件只含执行步骤与地图语义。

## 步骤

1. **定位 skill 目录**：本 SKILL.md 所在目录即扫描器根（含 `bin/scan_repo_map.mjs`）。
2. **确保依赖已装**：skill 目录下无 `node_modules/` 时，在其中运行 `npm install`
   （Dart 语法 prebuild 已随包分发，macOS arm64/x64 免编译；其他平台首次安装需 C 编译链）。
3. **生成地图**（在目标仓或其子目录上）：
   ```
   node <SKILL_DIR>/bin/scan_repo_map.mjs -d <目标目录> -n <模块名> -o <输出.md>
   ```
   完成标准：输出打印 `✅ Generated`，地图头部 `# Source Commit`/`# Worktree` 非空。
   - 只扫一种语言用 `--languages dart`（值域见 `--help`）；多份地图合并用 `--merge`。
   - **已有地图先查 freshness**：`# Source Commit` 与目标仓 HEAD 一致且 `# Worktree: clean`
     才可复用，否则重扫。
4. **检索地图**（全部是对地图文件 grep，勿读源码全文）：
   - 找定义：`grep ' <名字>$' 地图.md`（符号区行 `[Lstart-Lend]` 给出行区间，再精确 Read）
   - 找影响面：`grep '^🔗 <模块路径>' 地图.md`（反向引用：谁 import 了它）
   - 找文件依赖：`grep '^📁 <文件> .*imports(' 地图.md`（🌐 区）
   - 找 API 端点：`grep '/api/<路径>' 地图.md`（📡 区，api-route 定义 / api-call 调用点，启发式）
   - 查库的使用方：`grep '<包名>' 地图.md` 的 🔗/🌐 区行

完成标准：每次回答定位类问题时，结论必须落到 `文件:行号`，且该行号取自地图或地图指引下的 Read。

## 地图语义（检索时参照）

- 符号区：`📁 <仓库相对路径> [L起-L止] <标签> <名字>`；标签表优先级与含义见 README.md。
- 🌐 导入图谱：文件 → 依赖模块（相对导入已归一化为仓库相对路径）。
- 🚪 文件符号清单：文件内符号名全集（超 25 个截断）。
- 🔗 反向引用：模块 ← 引用它的文件（名单超 10 个截断；可证实的外部依赖折叠为 `(N importers, external)`）。
- 📡 API 路径：启发式，Dart 为行级匹配，跨多行的调用不覆盖。
- ⚠️ 诊断区：扫描中出现的问题；**有内容时检索结论须带着它一起判断**。

## 已知边界

- Vue SFC / Objective-C 无语法不索引；TS 路径别名（`@/`）不解析，按原字符串聚合。
- 无法证实为外部的引用（Python 裸名、Java/Kotlin 包路径）在 🔗 区保留原名单。
- 地图是索引不是真相：行区间定位后必须 Read 代码确认。
