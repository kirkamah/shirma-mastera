// Applies full spell descriptions to src/renderer/data/spells-ru.ts.
// Input file (arg) holds blocks, one field per line:
//   NAME: <exact russian spell name as in the DB>
//   DESC: <full effect description, single line>
//   HIGHER: <higher-level text, single line, or - if none>
// Replaces the desc (and higher) of the matching curated sp({...}) entry OR the
// matching compact row (fields 9 and 10). Reports matched / unmatched.
const fs = require('fs')
const FILE = 'src/renderer/data/spells-ru.ts'
const INPUT = process.argv[2] || '/tmp/descs.txt'

function clean(s) {
  return s
    .replace(/`/g, "'")          // backticks break the template literal
    .replace(/\$\{/g, '$ {')      // ${ triggers template interpolation
    .replace(/\|/g, '/')          // pipe is the compact delimiter
    .replace(/\b(\d+)d(\d+)\b/g, '$1к$2') // dice d -> к notation
    .replace(/\s+/g, ' ')
    .trim()
}

// ---- parse input ----
const map = {}
let cur = null
for (const line of fs.readFileSync(INPUT, 'utf8').split(/\r?\n/)) {
  if (line.startsWith('NAME:')) { if (cur) map[cur.name] = cur; cur = { name: line.slice(5).trim(), desc: '', higher: '' } }
  else if (line.startsWith('DESC:') && cur) cur.desc = line.slice(5).trim()
  else if (line.startsWith('HIGHER:') && cur) cur.higher = line.slice(7).trim()
}
if (cur) map[cur.name] = cur

let src = fs.readFileSync(FILE, 'utf8')
const matched = new Set()
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const sq = (s) => s.replace(/'/g, "\\'") // for single-quoted JS strings

// ---- curated sp({...}) entries ----
for (const name of Object.keys(map)) {
  const { desc, higher } = map[name]
  const d = clean(desc), h = higher && higher !== '-' && higher !== '—' ? clean(higher) : ''
  // desc:
  const reDesc = new RegExp("(name: '" + esc(name) + "'[\\s\\S]{0,400}?desc: ')([^']*)(')")
  if (reDesc.test(src)) {
    src = src.replace(reDesc, (m, a, _b, c) => a + sq(d) + c)
    matched.add(name)
    if (h) {
      const reH = new RegExp("(name: '" + esc(name) + "'[\\s\\S]{0,1600}?higher: ')([^']*)(')")
      if (reH.test(src)) src = src.replace(reH, (m, a, _b, c) => a + sq(h) + c)
      // if no higher field present, leave as-is (curated without higher stays)
    }
  }
}

// ---- compact rows ----
const startMark = 'const SPELLS_COMPACT = `'
const si = src.indexOf(startMark)
if (si !== -1) {
  const bs = si + startMark.length
  const be = src.indexOf('`', bs)
  const block = src.slice(bs, be)
  const newBlock = block.split('\n').map((line) => {
    if (!line.includes('|') || line.trim().startsWith('#')) return line
    const parts = line.split('|')
    const nm = parts[0].trim()
    if (parts.length >= 10 && /^\d$/.test((parts[1] || '').trim()) && map[nm]) {
      while (parts.length < 11) parts.push('')
      parts[9] = clean(map[nm].desc)
      const h = map[nm].higher
      parts[10] = h && h !== '-' && h !== '—' ? clean(h) : ''
      matched.add(nm)
      return parts.join('|')
    }
    return line
  }).join('\n')
  src = src.slice(0, bs) + newBlock + src.slice(be)
}

fs.writeFileSync(FILE, src)
const unmatched = Object.keys(map).filter((n) => !matched.has(n))
console.log(`applied: ${matched.size} / ${Object.keys(map).length}`)
if (unmatched.length) console.log('UNMATCHED (name not found in DB):\n  ' + unmatched.join('\n  '))
