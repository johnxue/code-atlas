// ==============================================================================
// src/textproc.mjs — jq/perl 文本处理等价物（逐分支对照 lib.sh 的 jq/perl 程序翻译）
// ==============================================================================
// 注意：jq/Oniguruma 的 \s 是 ASCII 集合 [ \t\r\n\f\v]，比 JS \s 窄，此处保持一致。
// ==============================================================================

const WS = '[ \\t\\r\\n\\f\\v]'
const collapseWs = (s) => s.replace(new RegExp(`${WS}+`, 'g'), ' ')
const trimWs = (s) => s.replace(new RegExp(`^${WS}+|${WS}+$`, 'g'), '')

// 正则元字符转义（引擎 glob 翻译与 normalize 的包名正则共用）
export const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// extract_kinds 的 symname：split("(")[0] → split("=>")[0] → split("{")[0] → 去 ; →
// 压缩空白 → trim → 最后一段（lib.sh extract_kinds jq def symname）
export function symname(text) {
  let s = text.split('(')[0]
  s = s.split('=>')[0]
  s = s.split('{')[0]
  s = s.replace(/;/g, '')
  s = trimWs(collapseWs(s))
  const parts = s.split(' ')
  return parts[parts.length - 1]
}

// extract_kinds auto 模式标签树（lib.sh:408-415）
export function autoKindLabel(text) {
  if (text.startsWith('data class')) return 'data-class'
  if (text.startsWith('enum class')) return 'enum'
  if (text.startsWith('sealed class')) return 'sealed-class'
  if (text.startsWith('sealed interface')) return 'sealed-interface'
  if (text.startsWith('abstract class')) return 'abstract-class'
  if (text.startsWith('interface')) return 'interface'
  return 'class'
}

// ----------------------------------------------------------------
// classlike.jq（dart/swift/java 声明关键字定位 + 标签判定树 + 行号修正）
// ----------------------------------------------------------------
const CLASSLIKE_KWRE = {
  swift: /(?<kw>final class|class|struct|enum|actor|extension)[ \t\r\n\f\v]+(?<n>[A-Za-z_0-9]+)/,
  java: /(?<kw>abstract class|final class|class|interface|enum|@interface)[ \t\r\n\f\v]+(?<n>[A-Za-z_0-9]+)/,
  dart: /(?<kw>abstract class|sealed class|base class|final class|interface class|mixin class|mixin|class|enum|extension type|extension)[ \t\r\n\f\v]+(?<n>[A-Za-z_0-9]+)/,
}

function classlikeLabel(lang, kw, decl, ann) {
  if (lang === 'swift') {
    if (kw === 'final class') return 'final-class'
    if (kw === 'class') return 'class'
    if (kw === 'struct') return /[:,][ \t\r\n\f\v]*View\b/.test(decl) ? 'swiftui-view' : 'struct'
    if (kw === 'enum') return 'enum'
    if (kw === 'actor') return 'actor'
    if (kw === 'extension') return 'extension'
    return 'class'
  }
  if (lang === 'java') {
    if (/@Entity\b/.test(ann) && /class/.test(kw)) return 'room-entity'
    if (/@Dao\b/.test(ann) && kw === 'interface') return 'room-dao'
    if (kw === 'abstract class') return 'abstract-class'
    if (kw === 'final class') return 'final-class'
    if (kw === 'class') return 'class'
    if (kw === 'interface' || kw === '@interface') return 'interface'
    if (kw === 'enum') return 'enum'
    return 'class'
  }
  if (kw === 'abstract class') return 'abstract-class'
  if (kw === 'sealed class') return 'sealed-class'
  if (kw === 'final class') return 'final-class'
  if (kw === 'mixin') return 'mixin'
  if (kw === 'enum') return 'enum'
  if (kw.startsWith('extension')) return 'extension'
  return 'class'
}

// 返回符号行 `📁 <rel> [L<ln>] <label> <name>`（无匹配时 kw=""、n="?"、off=0，照 jq 语义）
export function classlikeLine(lang, rel, startLine0, nodeText) {
  const re = CLASSLIKE_KWRE[lang] ?? CLASSLIKE_KWRE.dart
  const m = re.exec(nodeText)
  let kw = ''
  let n = '?'
  let off = 0
  if (m) {
    kw = m.groups.kw
    n = m.groups.n
    off = m.index
  }
  const decl = nodeText.split('{')[0]
  const ann = nodeText.slice(0, off)
  const label = classlikeLabel(lang, kw, decl, ann)
  const newlines = nodeText.slice(0, off).split('\n').length - 1
  return `📁 ${rel} [L${startLine0 + 1 + newlines}] ${label} ${n}`
}

// ----------------------------------------------------------------
// dart_topvar.jq：Riverpod provider 打标的顶层变量
// ----------------------------------------------------------------
export function dartTopvarLine(rel, startLine0, nodeText) {
  let head = nodeText.split('=')[0].split(';')[0]
  head = trimWs(collapseWs(head))
  const nm = /[A-Za-z_0-9]$/.test(head) ? head.split(' ').pop() : '?'
  const label = /Provider/.test(nodeText) ? 'provider' : 'top-var'
  return `📁 ${rel} [L${startLine0 + 1}] ${label} ${nm}`
}

// ----------------------------------------------------------------
// import 行清洗（import_raw / import_as）
// ----------------------------------------------------------------
export function importRaw(mvText) {
  const m = mvText ?? '?'
  return m.length > 0 ? m : null
}

export function importAs(mvText) {
  let m = mvText ?? '?'
  m = m.replace(/ as .*$/, '')
  m = trimWs(collapseWs(m))
  return m.length > 0 ? m : null
}

// ----------------------------------------------------------------
// import_kind 模块名解析（dart / go / js）
// ----------------------------------------------------------------
export function importKindDart(nodeText) {
  const m = nodeText.replace(/^[^'"]*['"]/, '').replace(/['"].*$/, '')
  return m.length > 0 ? m : null
}

export function importKindGo(nodeText) {
  const parts = nodeText.replace(/"/g, '').split(' ')
  const m = parts[parts.length - 1]
  return m.length > 0 ? m : null
}

export function importKindJs(nodeText) {
  let m = nodeText.replace(/^import /, '')
  if (m.includes(' from ')) m = m.replace(/^.* from /, '')
  m = m.replace(/;[\r\n]*$/, '')
  m = m.replace(/^["']/, '')
  m = m.replace(/["']$/, '')
  return m.length > 0 ? m : null
}

// ----------------------------------------------------------------
// urls.jq firstarg：调用节点文本 → 疑似 URL 的字符串首参
// 返回 null 表示该节点不产出（引号检查失败）
// ----------------------------------------------------------------
export function firstArgUrl(callText) {
  let s = callText.replace(/^[^(]*\(/, '')
  s = s.replace(/^[ \t\r\n\f\v]+/, '')
  s = s.replace(/^[bfruBFUR]*/, '')
  const q = s[0]
  if (q !== '"' && q !== "'") return null
  const rest = s.slice(1)
  const i = rest.indexOf(q)
  const u = i === -1 ? rest : rest.slice(0, i)
  if (!(u.length > 1)) return null
  if (!(u.startsWith('/') || u.includes('://'))) return null
  return u
}
