# Code Atlas

[中文](README.zh-CN.md) | [日本語](README.ja.md)

> Code Atlas: an agent skill that turns any repo into a greppable AST map — symbols with line
> ranges, reverse references, and API routes — so AI agents stop rummaging through the codebase
> and answer "where is X" at a fraction of the token cost.

## 1. What is Code Atlas

Code Atlas is a **skill for AI coding agents** (Claude Code, Codex CLI, pi, Kimi Code CLI,
opencode, Hermes). It scans a repository once into a single Markdown map — every symbol with its
`file:Lstart-Lend` range, who-imports-whom, API route definitions and call sites — so the agent
answers locate-style questions with a `grep` on the map instead of reading files one by one.

- **Token-cheap by design**: the map is the index; the agent reads only the lines the map points to.
- **Zero system dependencies**: one `npm install`. No LSP, no indexing server, no jq/perl/ast-grep
  CLI to install (the AST engine and all language grammars ship as npm packages with prebuilds).
- **9 languages**: TypeScript/JavaScript/TSX, Python, Go, Dart/Flutter, Kotlin/Java/Android, Swift, C/C++.
- **Freshness built in**: every map carries the source commit and worktree state, so the agent
  knows when to rescan.

```bash
node bin/scan_repo_map.mjs -d ./your-repo -n app -o map.md
grep '^🔗 lib/auth' map.md     # who breaks if I change this?
```

## 2. Install

Requires Node >= 18. Clone (or copy) this repo into your agent's skills directory under the name
`repo-map`, then install dependencies once:

| Agent platform | Skills directory |
|---|---|
| Claude Code | `~/.claude/skills/` |
| Kimi Code CLI | `~/.agents/skills/` |
| Codex CLI | `~/.codex/skills/` (or the universal `~/.agents/skills/`) |
| opencode | `~/.config/opencode/skills/` (or the universal `~/.agents/skills/`) |
| pi | `pi install git:<this-repo-url>` (or the universal `~/.agents/skills/`) |
| Hermes | `~/.agents/skills/` |

Example (universal path):

```bash
git clone https://github.com/johnxue/code-atlas ~/.agents/skills/repo-map
cd ~/.agents/skills/repo-map && npm install
```

If your platform's path differs, put it wherever that platform scans `SKILL.md` folders — the
folder must be named `repo-map` and contain this repo's `SKILL.md` at its root.
macOS arm64/x64 run instantly from committed prebuilds; Linux/Windows build the Dart grammar
from source on first install until CI prebuilds land (a C toolchain is needed only there).

## 3. Using the skill

**You don't run it — your agent does.** Once installed, just ask in natural language:

- "Where is the playback resume feature implemented?"
- "What breaks if I change `AudioRepository`?"
- "Which API routes does the login page call?"

The agent fires the `repo-map` skill on its own: it scans (or reuses a fresh map), greps the map,
and answers with `file:line` references. To invoke it explicitly, type `/repo-map`.

Power users can also run the CLI directly (see section 6), e.g. to pre-generate maps in CI or to
merge several module maps with `--merge`.

## 4. Map sections and query patterns

| Section | Row shape | Answers | Query |
|---|---|---|---|
| Symbols | `📁 <relpath> [Lstart-Lend] <label> <name>` | Where is X defined | `grep 'class AuthRepository' map.md` → read `file:Lstart-Lend` |
| 🌐 Import graph | `📁 <file> imports(k): a, b…` | What a file depends on | `grep '^📁 <file>' map.md` |
| 🚪 File symbol index | `🚪 <file> exports(k): n1, n2…` | Which file has a symbol (incl. private) | `grep 'exports(.*<name>' map.md` |
| 🔗 Reverse references | `🔗 <module> (k importers): f1…` | Who is affected by changing it | `grep '^🔗 <module>' map.md` |
| 📡 API paths | `api-route` definitions / `api-call` sites | Cross-stack route pairing | grep the same path literal across stacks |

Empty sections are omitted. **Combined jump example** — "where does this page's data come from,
who is affected by changing a field":

1. `grep '<PageName>' map.md` → file and line range;
2. `grep '^📁 <that-file> imports'` → its providers/controllers;
3. `grep '^🔗 <controller/repository path>'` → all callers (blast radius);
4. Only then `read` the concrete files.

Label glossary: `class/abstract-class/sealed-class/interface/enum/method/func/async-func`,
`provider/top-var/const`, `react-component/custom-hook/composable`,
`nest-controller/typeorm-entity/room-entity/room-dao`, `api-route/api-call/api-get/…`,
`gin-handler/gin-middleware`, `c-struct/cpp-class/cpp-func`, etc. When several labels hit one
symbol, only the most specific survives.

## 5. Known limitations

- **Vue (.vue) / Objective-C**: no tree-sitter grammar, not indexed (a .vue detection warning is emitted).
- **Heuristic labels** (api-route/api-call, zustand-store, …): a hit ≠ 100% semantics — always
  "locate via map, confirm in code". Dart api-call matching is line-level and misses multi-line calls.
- **Import normalization**: relative paths / Python dotted / Dart `package:self` resolve to
  repo-relative paths; TS aliases (`@/`, `~/`) are not resolved.
- **🔗 external-dependency collapsing**: `dart:*`, non-self `package:`, and provable JS bare package
  names fold into `(N importers, external)`; grep 🌐 for library consumers instead.
- **No semantic completeness**: no call graph or field read/write graph; never claim "all callers"
  from the map.
- **--merge assumes one shared Source Path root**; merging maps from different roots warns.

## 6. Development

CLI flags (identical to the legacy Bash scanner): `-d/-o/-n/-x/-e/-m/--languages/--merge/-v/-h`
— see `--help`.

```bash
npm test        # fixture assertions + rule-manifest parity + gitignore parity
npm run golden  # strip-compare against the Bash reference + snapshot guard
```

Repository layout: `bin/` CLI entry · `src/` engine, extractors, normalization, assembly, merge ·
`src/rules/` per-language rule manifests · `test/` fixtures and parity suites ·
`packages/lang-dart/` the self-built Dart grammar pack
([nielsenko/tree-sitter-dart @ b57d734c](https://github.com/nielsenko/tree-sitter-dart),
committed C sources, 5-platform prebuild CI in `.github/workflows/prebuilds.yml`).

Detailed engineering notes (gitignore semantics, Dart grammar source and upgrades, the prebuild
pipeline, verification baselines) are in `docs/` — start with
[NODE_REWRITE_SPEC.md](docs/NODE_REWRITE_SPEC.md) for the output contract.

License: MIT © johnxue.
