import type { NamedEntry, Spell, StatBlock } from '@shared/types'

// Compact authoring formats + parsers. Lets new translations be written as
// short pipe-delimited lines instead of verbose object literals — far fewer
// tokens per entry and no structural boilerplate to get wrong.

let _k = 0
const uid = (p: string): string => `${p}-${_k++}`

function parseCr(disp: string): number {
  const map: Record<string, number> = { '0': 0, '1/8': 0.125, '1/4': 0.25, '1/2': 0.5 }
  return map[disp] ?? (Number(disp) || 0)
}

// ---------------- Spells ----------------
// One spell per line:
//   name | level | school | range | comp | time | duration | flags | classes | desc | higher
// flags: contains "c" = концентрация, "r" = ритуал. Empty fields use defaults.
export function parseSpells(text: string): Spell[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((line) => {
      const f = line.split('|').map((s) => s.trim())
      const [name, level, school, range, comp, time, duration, flags = '', classes = '', desc = '', higher = ''] = f
      return {
        key: uid('ru-cs'),
        name,
        level: Number(level) || 0,
        school,
        desc,
        higherLevel: higher || undefined,
        rangeText: range || undefined,
        castingTime: time || '1 действие',
        duration: duration || 'Мгновенная',
        components: comp || 'В, С',
        concentration: flags.includes('c'),
        ritual: flags.includes('r'),
        classes: classes ? classes.split(',').map((c) => c.trim()) : []
      } satisfies Spell
    })
}

// ---------------- Monsters ----------------
// Records separated by a blank line. First line = header:
//   name | size | type | alignment | ac | acDetail | hp | hd | speed | str,dex,con,int,wis,cha | crDisplay | pb
//   speed: "30" (walk) or "walk:30 fly:60 swim:40"
// Following lines, prefixed:
//   se| senses        la| languages      ev| env (comma)
//   sk| skill bonuses ("Скрытность 6, Внимательность 3")
//   sv| saves ("dex 5, con 8")            ri| resist  im| immune  ci| condImmune
//   t|name|desc  a|name|desc  b|...  r|...  l|...   (trait/action/bonus/reaction/legendary)
const ABIL = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const

function parseSpeed(s: string): Record<string, number> {
  if (!s) return { walk: 30 }
  if (!s.includes(':')) return { walk: Number(s) || 30 }
  const out: Record<string, number> = {}
  for (const part of s.split(/\s+/)) {
    const [mode, v] = part.split(':')
    if (mode && v) out[mode] = Number(v) || 0
  }
  return out
}

function parseBonusMap(s: string): Record<string, number> {
  const out: Record<string, number> = {}
  if (!s) return out
  for (const part of s.split(',')) {
    const m = part.trim().match(/^(.+)\s([+-]?\d+)$/)
    if (m) out[m[1].trim()] = Number(m[2])
  }
  return out
}

export function parseMonsters(text: string): StatBlock[] {
  const records = text
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((r) => r.trim())
    .filter((r) => r && !r.startsWith('#'))

  return records.map((rec) => {
    const lines = rec.split('\n').map((l) => l.trim()).filter(Boolean)
    const h = lines[0].split('|').map((s) => s.trim())
    const [name, size, type, alignment, ac, acDetail, hp, hd, speed, abils, crD, pb] = h
    const a = (abils || '10,10,10,10,10,10').split(',').map((n) => Number(n.trim()) || 10)
    const abilities = Object.fromEntries(ABIL.map((k, i) => [k, a[i] ?? 10])) as unknown as StatBlock['abilities']

    const sb: StatBlock = {
      key: uid('ru-cm'),
      name,
      size,
      type,
      alignment,
      armorClass: Number(ac) || 10,
      armorDetail: acDetail || undefined,
      hitPoints: Number(hp) || 1,
      hitDice: hd || undefined,
      speed: parseSpeed(speed),
      abilities,
      savingThrows: {},
      skills: {},
      challengeRating: parseCr(crD),
      crDisplay: crD,
      proficiencyBonus: pb ? Number(pb) : 2,
      traits: [],
      actions: [],
      bonusActions: [],
      reactions: [],
      legendaryActions: [],
      environments: [],
      source: 'open5e'
    }

    const bucket: Record<string, NamedEntry[]> = {
      t: sb.traits,
      a: sb.actions,
      b: sb.bonusActions,
      r: sb.reactions,
      l: sb.legendaryActions
    }

    for (const line of lines.slice(1)) {
      const idx = line.indexOf('|')
      if (idx < 0) continue
      const tag = line.slice(0, idx).trim()
      const rest = line.slice(idx + 1)
      if (bucket[tag]) {
        const p = rest.indexOf('|')
        bucket[tag].push({ id: uid('e'), name: p < 0 ? '' : rest.slice(0, p).trim(), desc: (p < 0 ? rest : rest.slice(p + 1)).trim() })
      } else if (tag === 'de') sb.flavor = rest.trim()
      else if (tag === 'se') sb.senses = rest.trim()
      else if (tag === 'la') sb.languages = rest.trim()
      else if (tag === 'ev') sb.environments = rest.split(',').map((s) => s.trim()).filter(Boolean)
      else if (tag === 'sk') sb.skills = parseBonusMap(rest)
      else if (tag === 'sv') sb.savingThrows = parseBonusMap(rest)
      else if (tag === 'ri') sb.damageResistances = rest.trim()
      else if (tag === 'im') sb.damageImmunities = rest.trim()
      else if (tag === 'ci') sb.conditionImmunities = rest.trim()
    }
    return sb
  })
}
