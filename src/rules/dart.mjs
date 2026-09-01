// Flutter / Dart 语言规则 — 自 rules_dart.sh 逐条机械移植（勿手改 pattern，改动须与 Bash 版同步）
// crosslayer: true 的规则仅在 CROSSLAYER=1 时执行（对应 Bash 版 if CROSSLAYER==1 块）

export const RULES = [
  { fn: "kindJq", lang: "dart", kind: "class_declaration", jq: "classlike" },
  { fn: "kindJq", lang: "dart", kind: "enum_declaration", jq: "classlike" },
  { fn: "kindJq", lang: "dart", kind: "mixin_declaration", jq: "classlike" },
  { fn: "kindJq", lang: "dart", kind: "extension_declaration", jq: "classlike" },
  { fn: "kindJq", lang: "dart", kind: "extension_type_declaration", jq: "classlike" },
  { fn: "symbols", lang: "dart", pattern: "typedef $NAME = $$$;", label: "typedef" },
  { fn: "kindJq", lang: "dart", kind: "top_level_variable_declaration", jq: "dart_topvar" },
  { fn: "kinds", lang: "dart", kind: "method_declaration", label: "method" },
  { fn: "symbols", lang: "dart", pattern: "void $NAME($$$) { $$$ }", label: "func" },
  { fn: "symbols", lang: "dart", pattern: "void $NAME($$$) async { $$$ }", label: "async-func" },
  { fn: "symbols", lang: "dart", pattern: "$TYPE $NAME($$$) { $$$ }", label: "func" },
  { fn: "symbols", lang: "dart", pattern: "$TYPE $NAME($$$) async { $$$ }", label: "async-func" },

  // --- 跨层：导入抽取 / API 路径（--no-crosslayer 时跳过） ---
  { fn: "importKind", lang: "dart", kind: "library_import", mode: "dart", crosslayer: true },
  { fn: "dartApiLines", crosslayer: true },
];
