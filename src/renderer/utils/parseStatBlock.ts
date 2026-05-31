import type { NamedEntry, StatBlock } from '@shared/types'
import { emptyStatBlock, uid } from './monster'

// Parses a pasted Russian stat block (D&D 2024-style layout) into a StatBlock.

const SIZE_STEMS: [string, string][] = [
  ['крошечн', 'Крошечный'],
  ['маленьк', 'Маленький'],
  ['средн', 'Средний'],
  ['больш', 'Большой'],
  ['огромн', 'Огромный'],
  ['громадн', 'Громадный']
]

const ABIL: Record<string, keyof StatBlock['abilities']> = {
  СИЛ: 'str',
  ЛОВ: 'dex',
  ТЕЛ: 'con',
  ИНТ: 'int',
  МДР: 'wis',
  ХАР: 'cha'
}

const MOVE: Record<string, string> = {
  скорость: 'walk',
  ходьбы: 'walk',
  полёт: 'fly',
  полёта: 'fly',
  плавание: 'swim',
  плавания: 'swim',
  лазание: 'climb',
  лазания: 'climb',
  копание: 'burrow',
  копания: 'burrow',
  рытьё: 'burrow',
  рытья: 'burrow',
  парение: 'fly'
}

const SECTIONS: Record<string, keyof Pick<StatBlock, 'traits' | 'actions' | 'bonusActions' | 'reactions' | 'legendaryActions'>> = {
  Особенности: 'traits',
  Действия: 'actions',
  'Бонусные действия': 'bonusActions',
  Реакции: 'reactions',
  'Легендарные действия': 'legendaryActions'
}

const stripQ = (s: string): string => s.replace(/\?/g, '').trim()

function normalizeSize(token: string): string {
  const t = token.replace(/\?/g, '').toLowerCase()
  for (const [stem, ru] of SIZE_STEMS) if (t.startsWith(stem)) return ru
  return token.replace(/\?/g, '')
}

function parseCr(disp: string): number {
  const map: Record<string, number> = { '0': 0, '1/8': 0.125, '1/4': 0.25, '1/2': 0.5 }
  return map[disp] ?? (Number(disp) || 0)
}

function parseSpeed(line: string): Record<string, number> {
  const out: Record<string, number> = {}
  const body = line.replace(/^Скорость\s*/i, '')
  for (const part of body.split(',')) {
    const p = part.trim()
    const numM = p.match(/(\d+)/)
    if (!numM) continue
    const wordM = p.match(/^([А-Яа-яёЁ]+)/)
    const word = wordM ? wordM[1].toLowerCase() : ''
    out[MOVE[word] || 'walk'] = parseInt(numM[1], 10)
  }
  if (Object.keys(out).length === 0) out.walk = 30
  return out
}

function parseEntries(body: string): NamedEntry[] {
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  const entries: NamedEntry[] = []
  for (const b of blocks) {
    if (/^У этого существа|^У данного существа/.test(b)) continue // legendary preamble
    const m = b.match(/^([^\n.]{1,64})\.\s+([\s\S]+)$/)
    if (m) entries.push({ id: uid('e'), name: m[1].trim(), desc: m[2].trim() })
    else if (entries.length) entries[entries.length - 1].desc += '\n\n' + b
    else entries.push({ id: uid('e'), name: '', desc: b })
  }
  return entries
}

export function parseStatBlock(text: string): StatBlock {
  const sb: StatBlock = { ...emptyStatBlock(), savingThrows: {}, skills: {}, traits: [], actions: [], bonusActions: [], reactions: [], legendaryActions: [], environments: [], source: 'custom', key: uid('custom') }
  const lines = text.replace(/\r/g, '').split('\n')

  // Locate section headers (exact line match).
  type SectionKey = (typeof SECTIONS)[keyof typeof SECTIONS]
  const marks: { i: number; key: SectionKey }[] = []
  lines.forEach((l, i) => {
    const t = l.trim()
    if (SECTIONS[t]) marks.push({ i, key: SECTIONS[t] })
  })
  const headerEnd = marks.length ? marks[0].i : lines.length

  // ---- Header block ----
  const head = lines.slice(0, headerEnd).map((l) => l.trim()).filter(Boolean)
  if (head[0]) sb.name = head[0].split('[')[0].trim() || head[0]

  // size / type / alignment is the second meaningful line
  if (head[1] && head[1].includes(',')) {
    const comma = head[1].indexOf(',')
    const left = head[1].slice(0, comma).trim()
    const right = head[1].slice(comma + 1).trim()
    const tokens = left.split(/\s+/)
    sb.size = normalizeSize(tokens[0] || 'Средний')
    const typeStr = tokens.slice(1).join(' ').replace(/\?/g, '').trim()
    const tm = typeStr.match(/^([^(]+?)\s*(?:\(([^)]+)\))?$/)
    sb.type = (tm ? tm[1] : typeStr).trim() || 'Существо'
    if (tm && tm[2]) sb.subtype = tm[2].trim()
    sb.alignment = right
  }

  for (const line of head.slice(2)) {
    const t = line.trim()
    let m: RegExpMatchArray | null

    if ((m = t.match(/^Класс Защиты\s+(\d+)/i))) sb.armorClass = parseInt(m[1], 10)
    else if ((m = t.match(/^Хиты\s+(\d+)\s*(?:\(([^)]+)\))?/i))) {
      sb.hitPoints = parseInt(m[1], 10)
      if (m[2]) sb.hitDice = m[2].trim()
    } else if (/^Скорость/i.test(t)) sb.speed = parseSpeed(t)
    else if (/^Навыки/i.test(t)) {
      for (const part of t.replace(/^Навыки\s*/i, '').split(',')) {
        const sm = part.trim().match(/^(.+?)\s*([+-]\d+)$/)
        if (sm) sb.skills[stripQ(sm[1])] = parseInt(sm[2], 10)
      }
    } else if (/^Сопротивление/i.test(t)) sb.damageResistances = t.replace(/^Сопротивление( урону)?\s*/i, '').trim()
    else if (/^Уязвимост/i.test(t)) sb.damageVulnerabilities = t.replace(/^Уязвимост\S*( урону)?\s*/i, '').trim()
    else if (/^Иммунитет/i.test(t)) {
      const body = t.replace(/^Иммунитет\S*\s*/i, '')
      const parts = body.split(';')
      sb.damageImmunities = stripQ(parts[0])
      if (parts[1]) sb.conditionImmunities = stripQ(parts[1])
    } else if (/^Чувства/i.test(t)) sb.senses = stripQ(t.replace(/^Чувства\s*/i, ''))
    else if (/^Языки/i.test(t)) sb.languages = t.replace(/^Языки\s*/i, '').trim()
    else if (/^Среда обитания/i.test(t)) sb.environments = t.replace(/^Среда обитания\s*/i, '').split(',').map((s) => stripQ(s)).filter(Boolean)
    else if ((m = t.match(/^Опасность\s+(\S+)/i))) {
      sb.crDisplay = m[1]
      sb.challengeRating = parseCr(m[1])
      const pb = t.match(/БВ\s*\+?(\d+)/i)
      if (pb) sb.proficiencyBonus = parseInt(pb[1], 10)
    } else if ((m = t.match(/^(СИЛ|ЛОВ|ТЕЛ|ИНТ|МДР|ХАР)\s+(\d+)\s+([+-]?\d+)\s+([+-]?\d+)/))) {
      const key = ABIL[m[1]]
      sb.abilities[key] = parseInt(m[2], 10)
      const mod = parseInt(m[3], 10)
      const save = parseInt(m[4], 10)
      if (save !== mod) sb.savingThrows[key] = save
    }
  }

  // ---- Sections ----
  for (let s = 0; s < marks.length; s++) {
    const start = marks[s].i + 1
    const end = s + 1 < marks.length ? marks[s + 1].i : lines.length
    sb[marks[s].key] = parseEntries(lines.slice(start, end).join('\n'))
  }

  return sb
}
