// One-off conversion: D&D 5e standard 1.5 m -> 5 ft.
// Converts "N м" (and chained "A/B м", "AxB м", "A×B м") to "N футов" in data files.
const fs = require('fs')

const map = {
  '0,9': '3',
  '1,5': '5',
  '3': '10',
  '4,5': '15',
  '6': '20',
  '7,5': '25',
  '9': '30',
  '12': '40',
  '13,5': '45',
  '15': '50',
  '18': '60',
  '21': '70',
  '24': '80',
  '27': '90',
  '30': '100',
  '36': '120',
  '45': '150',
  '60': '200',
  '72': '240',
  '75': '250',
  '90': '300',
  '96': '320',
  '120': '400',
  '150': '500',
  '180': '600',
  '300': '1000',
  '500': '1500'
}

function convertNum(n) {
  if (map[n]) return map[n]
  return null
}

function convertFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8')
  let single = 0
  let chained = 0
  const unknown = new Set()

  // Cyrillic м is not an ASCII \w so \b boundaries fail. Use a Unicode-friendly
  // lookahead (next char must not be Cyrillic letter) and a preceding boundary
  // that allows start-of-string/digit/space/punctuation.
  const TAIL = '(?![\\u0400-\\u04FF])' // not followed by Cyrillic letter

  // Special: Project Image 800m -> 500 миль (canonical PHB value).
  src = src.replace(new RegExp(`(^|[^\\d])800\\s*м${TAIL}`, 'g'), (m, pre) => {
    chained++
    return `${pre}500 миль`
  })

  // Chained: "6/18 м", "3×3 м", "7,5/30 м", "1,5/4,5 м"
  src = src.replace(new RegExp(`(\\d+(?:,\\d+)?(?:[\\/×x]\\d+(?:,\\d+)?)+)\\s*м${TAIL}`, 'g'), (match, group1) => {
    const parts = group1.split(/([\/×x])/)
    const out = []
    let ok = true
    for (const p of parts) {
      if (/[\/×x]/.test(p)) out.push(p)
      else {
        const c = convertNum(p)
        if (c === null) {
          unknown.add(p)
          ok = false
          out.push(p)
        } else out.push(c)
      }
    }
    if (!ok) return match
    chained++
    return `${out.join('')} футов`
  })

  // Single: "9 м" — require leading non-digit (so we don't re-match the second
  // half of a chained pair we left unchanged, and to avoid eating "К9 м" etc).
  src = src.replace(new RegExp(`(^|[^\\d\\/×x])(\\d+(?:,\\d+)?)\\s*м${TAIL}`, 'g'), (match, pre, n) => {
    const c = convertNum(n)
    if (c === null) {
      unknown.add(n)
      return match
    }
    single++
    return `${pre}${c} футов`
  })

  fs.writeFileSync(filePath, src, 'utf8')
  return { single, chained, unknown: [...unknown] }
}

const files = [
  'C:/projects/shirma-mastera/src/renderer/data/spells-ru.ts',
  'C:/projects/shirma-mastera/src/renderer/data/bestiary-ru.ts',
  'C:/projects/shirma-mastera/src/renderer/data/hazards-ru.ts',
  'C:/projects/shirma-mastera/src/renderer/data/equipment-ru.ts',
  'C:/projects/shirma-mastera/src/renderer/pages/Spells.tsx'
]

for (const f of files) {
  const r = convertFile(f)
  console.log(`${f.split('/').pop()}: single=${r.single} chained=${r.chained} unknown=${JSON.stringify(r.unknown)}`)
}
