// Go (Gin / GORM / Microservices) 语言规则 — 自 rules_go.sh 逐条机械移植（勿手改 pattern，改动须与 Bash 版同步）
// crosslayer: true 的规则仅在 CROSSLAYER=1 时执行（对应 Bash 版 if CROSSLAYER==1 块）

export const RULES = [
  { fn: "symbols", lang: "go", pattern: "type $NAME struct { $$$ }", label: "struct" },
  { fn: "symbols", lang: "go", pattern: "type $NAME interface { $$$ }", label: "interface" },
  { fn: "symbols", lang: "go", pattern: "type $NAME $TYPE", label: "type-alias" },
  { fn: "symbols", lang: "go", pattern: "func $NAME(c *gin.Context) { $$$ }", label: "gin-handler" },
  { fn: "symbols", lang: "go", pattern: "func $NAME(ctx *gin.Context) { $$$ }", label: "gin-handler" },
  { fn: "symbols", lang: "go", pattern: "func ($RECV) $NAME(c *gin.Context) { $$$ }", label: "gin-handler-method" },
  { fn: "symbols", lang: "go", pattern: "func ($RECV) $NAME(ctx *gin.Context) { $$$ }", label: "gin-handler-method" },
  { fn: "symbols", lang: "go", pattern: "func $NAME($$$) gin.HandlerFunc { $$$ }", label: "gin-middleware" },
  { fn: "symbols", lang: "go", pattern: "func ($RECV) $NAME($$$) gin.HandlerFunc { $$$ }", label: "gin-middleware" },
  { fn: "symbols", lang: "go", pattern: "func ($RECV) $NAME($$$) { $$$ }", label: "method" },
  { fn: "symbols", lang: "go", pattern: "func ($RECV) $NAME($$$) ($RET) { $$$ }", label: "method" },
  { fn: "symbols", lang: "go", pattern: "func ($RECV) $NAME($$$) $RET { $$$ }", label: "method" },
  { fn: "symbols", lang: "go", pattern: "func $NAME($$$) { $$$ }", label: "func" },
  { fn: "symbols", lang: "go", pattern: "func $NAME($$$) ($RET) { $$$ }", label: "func" },
  { fn: "symbols", lang: "go", pattern: "func $NAME($$$) $RET { $$$ }", label: "func" },

  // --- 跨层：导入抽取 / API 路径（--no-crosslayer 时跳过） ---
  { fn: "importKind", lang: "go", kind: "import_spec", mode: "go" , crosslayer: true },
];
