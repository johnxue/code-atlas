// Verification for @scan-repo-map/lang-dart dynamic language pack.
// Equivalent to wisdom_app/scripts/tmp/napi-check/check2.mjs, but loads the
// parser through the package's index.js (prebuild resolution included).
//
// Usage: node test/verify.mjs <dart-source-dir>
import { parseAsync, registerDynamicLanguage } from '@ast-grep/napi';
import { createRequire } from 'module';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const require = createRequire(import.meta.url);
registerDynamicLanguage({ dart: require('../index.js') });

const KINDS = ['class_declaration','enum_declaration','mixin_declaration','extension_declaration','extension_type_declaration','top_level_variable_declaration','method_declaration','library_import'];
const PATTERNS = ['typedef $NAME = $$$;','void $NAME($$$) { $$$ }','$TYPE $NAME($$$) { $$$ }'];

function* walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.dart')) yield p;
  }
}

const files = [...walk(process.argv[2])];
const hits = Object.fromEntries(KINDS.map(k => [k, 0]));
let pat = 0, errors = 0;
for (const file of files) {
  let root;
  try { root = (await parseAsync('dart', readFileSync(file, 'utf8'))).root(); }
  catch (e) { errors++; console.error('PARSE FAIL', file, e.message); continue; }
  for (const k of KINDS) hits[k] += root.findAll({ rule: { kind: k } }).length;
  for (const p of PATTERNS) {
    try { pat += root.findAll({ rule: { pattern: p } }).length; }
    catch (e) { console.error('PATTERN FAIL', p, e.message); }
  }
}
console.log('libraryPath:', require('../index.js').libraryPath);
console.log('files:', files.length, 'parse errors:', errors);
console.log(JSON.stringify(hits));
console.log('pattern hits:', pat);
