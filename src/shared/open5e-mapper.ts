import type { Spell, StatBlock, NamedEntry } from './types'
import {
  translateAlignment,
  translateMonsterName,
  translateSize,
  translateType,
  translateSchool,
  translateSpellName,
  translateSpellMeta
} from './translations'

interface RawSpell {
  key?: string
  name?: string
  level?: number
  school?: { name?: string } | string
  desc?: string
  higher_level?: string
  range_text?: string
  casting_time?: string
  duration?: string
  verbal?: boolean
  somatic?: boolean
  material?: boolean
  concentration?: boolean
  ritual?: boolean
  classes?: ({ name?: string } | string)[]
}

export function mapSpell(s: RawSpell): Spell {
  const comp: string[] = []
  if (s.verbal) comp.push('В')
  if (s.somatic) comp.push('С')
  if (s.material) comp.push('М')
  return {
    key: s.key ?? s.name ?? Math.random().toString(36).slice(2),
    name: translateSpellName(s.name ?? ''),
    level: s.level ?? 0,
    school: translateSchool(typeof s.school === 'string' ? s.school : s.school?.name ?? ''),
    desc: s.desc ?? '',
    higherLevel: s.higher_level || undefined,
    rangeText: translateSpellMeta(s.range_text || undefined),
    castingTime: translateSpellMeta(s.casting_time || undefined),
    duration: translateSpellMeta(s.duration || undefined),
    components: comp.join(', '),
    concentration: Boolean(s.concentration),
    ritual: Boolean(s.ritual),
    classes: (s.classes ?? []).map((c) => (typeof c === 'string' ? c : c.name ?? '')).filter(Boolean)
  }
}

// Loose raw shape from the Open5e v2 /creatures/ endpoint.
export interface RawCreature {
  key?: string
  name?: string
  challenge_rating?: number
  hit_points?: number
  hit_dice?: string
  armor_class?: number
  armor_detail?: string
  proficiency_bonus?: number
  alignment?: string
  type?: { name?: string } | string
  size?: { name?: string } | string
  subcategory?: string | null
  speed_all?: Record<string, number | boolean>
  ability_scores?: Record<string, number>
  saving_throws?: Record<string, number>
  skill_bonuses?: Record<string, number>
  resistances_and_immunities?: {
    damage_immunities_display?: string
    damage_resistances_display?: string
    damage_vulnerabilities_display?: string
    condition_immunities_display?: string
  }
  languages?: { as_string?: string }
  passive_perception?: number
  normal_sight_range?: number | null
  darkvision_range?: number | null
  blindsight_range?: number | null
  tremorsense_range?: number | null
  truesight_range?: number | null
  actions?: RawAction[]
  traits?: { name?: string; desc?: string }[]
  environments?: ({ name?: string } | string)[]
}

interface RawAction {
  name?: string
  desc?: string
  action_type?: string
  legendary_action_cost?: number | null
}

const ABILITY_MAP: Record<string, keyof StatBlock['abilities']> = {
  strength: 'str',
  dexterity: 'dex',
  constitution: 'con',
  intelligence: 'int',
  wisdom: 'wis',
  charisma: 'cha'
}

function name(v: { name?: string } | string | undefined, fallback = ''): string {
  if (!v) return fallback
  return typeof v === 'string' ? v : v.name ?? fallback
}

export function crToDisplay(cr: number): string {
  if (cr === 0.125) return '1/8'
  if (cr === 0.25) return '1/4'
  if (cr === 0.5) return '1/2'
  return String(cr)
}

let entryCounter = 0
function entry(name: string, desc: string): NamedEntry {
  return { id: `e${Date.now()}_${entryCounter++}`, name, desc }
}

function buildSenses(c: RawCreature): string {
  const parts: string[] = []
  if (c.blindsight_range) parts.push(`слепое зрение ${c.blindsight_range} фт.`)
  if (c.darkvision_range) parts.push(`тёмное зрение ${c.darkvision_range} фт.`)
  if (c.tremorsense_range) parts.push(`чувство вибрации ${c.tremorsense_range} фт.`)
  if (c.truesight_range) parts.push(`истинное зрение ${c.truesight_range} фт.`)
  if (c.passive_perception != null) parts.push(`пассивная Внимательность ${c.passive_perception}`)
  return parts.join(', ')
}

export function mapCreature(c: RawCreature): StatBlock {
  const cr = c.challenge_rating ?? 0
  const abilities: StatBlock['abilities'] = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }
  if (c.ability_scores) {
    for (const [k, v] of Object.entries(c.ability_scores)) {
      const short = ABILITY_MAP[k]
      if (short) abilities[short] = v
    }
  }

  const savingThrows: Record<string, number> = {}
  if (c.saving_throws) {
    for (const [k, v] of Object.entries(c.saving_throws)) {
      const short = ABILITY_MAP[k]
      if (short) savingThrows[short] = v
    }
  }

  const speed: Record<string, number> = {}
  if (c.speed_all) {
    for (const [mode, val] of Object.entries(c.speed_all)) {
      if (mode === 'unit' || mode === 'hover') continue
      if (typeof val === 'number' && val > 0) speed[mode] = val
    }
  }
  if (Object.keys(speed).length === 0) speed.walk = 30

  const ri = c.resistances_and_immunities ?? {}

  const traits: NamedEntry[] = (c.traits ?? []).map((t) => entry(t.name ?? '', t.desc ?? ''))
  const actions: NamedEntry[] = []
  const bonusActions: NamedEntry[] = []
  const reactions: NamedEntry[] = []
  const legendaryActions: NamedEntry[] = []
  for (const a of c.actions ?? []) {
    const e = entry(a.name ?? '', a.desc ?? '')
    const t = (a.action_type ?? 'ACTION').toUpperCase()
    if (a.legendary_action_cost != null || t.includes('LEGENDARY')) legendaryActions.push(e)
    else if (t.includes('BONUS')) bonusActions.push(e)
    else if (t.includes('REACTION')) reactions.push(e)
    else actions.push(e)
  }

  const environments = (c.environments ?? [])
    .map((e) => name(e))
    .filter((s): s is string => Boolean(s))

  return {
    key: c.key ?? c.name ?? Math.random().toString(36).slice(2),
    name: translateMonsterName(c.name ?? 'Без имени'),
    size: translateSize(name(c.size, 'Medium')),
    type: translateType(name(c.type, 'Существо')),
    subtype: c.subcategory ?? undefined,
    alignment: translateAlignment(c.alignment ?? 'unaligned'),
    armorClass: c.armor_class ?? 10,
    armorDetail: c.armor_detail || undefined,
    hitPoints: c.hit_points ?? 1,
    hitDice: c.hit_dice || undefined,
    speed,
    abilities,
    savingThrows,
    skills: c.skill_bonuses ?? {},
    damageVulnerabilities: ri.damage_vulnerabilities_display || undefined,
    damageResistances: ri.damage_resistances_display || undefined,
    damageImmunities: ri.damage_immunities_display || undefined,
    conditionImmunities: ri.condition_immunities_display || undefined,
    senses: buildSenses(c) || undefined,
    languages: c.languages?.as_string || undefined,
    challengeRating: cr,
    crDisplay: crToDisplay(cr),
    proficiencyBonus: c.proficiency_bonus ?? undefined,
    traits,
    actions,
    bonusActions,
    reactions,
    legendaryActions,
    environments,
    source: 'open5e'
  }
}
