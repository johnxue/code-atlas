#!/usr/bin/env node
// Generates type.d.ts from src/node-types.json.
// Grammar source: nielsenko/tree-sitter-dart @ b57d734c84f510bbd524097902cab671e4dbfca9
// Format mirrors the official @ast-grep/lang-* type.d.ts (a TS type literal keyed by node type name).
const fs = require('node:fs')
const path = require('node:path')

const nodeTypes = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src', 'node-types.json'), 'utf8'),
)

// Group entries by node type name; single entry -> inline object, multiple -> "subtypes"-style union list
const byType = new Map()
for (const node of nodeTypes) {
  if (!byType.has(node.type)) byType.set(node.type, [])
  byType.get(node.type).push(node)
}

const lines = ['// Auto-generated from src/node-types.json (nielsenko/tree-sitter-dart @ b57d734c)', 'type dartTypes = {']
for (const [type, nodes] of byType) {
  const entry =
    nodes.length === 1
      ? nodes[0]
      : { type, named: nodes[0].named, subtypes: nodes.map(n => ({ type: n.type, named: n.named })) }
  lines.push(`  ${JSON.stringify(type)}: ${JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ')},`)
}
lines.push('};', 'export default dartTypes;', '')

fs.writeFileSync(path.join(__dirname, 'type.d.ts'), lines.join('\n'))
console.log(`type.d.ts written: ${byType.size} node types`)
