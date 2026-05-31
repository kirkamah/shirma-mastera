// Pure rules engine for the character constructor (PH24 / D&D 2024). No React.
// Constants + parsers that turn the app's free-text class/background/weapon data
// into structured values, plus the small calculators a simple builder needs.
// Every parser degrades gracefully (returns empty/null) so the UI can fall back
// to manual entry instead of failing.
import { parseDiceToken } from '../utils/diceParser'

export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'

export const ABILITIES: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

export const ABILITY_RU: Record<AbilityKey, string> = {
  str: 'Сила',
  dex: 'Ловкость',
  con: 'Телосложение',
  int: 'Интеллект',
  wis: 'Мудрость',
  cha: 'Харизма'
}

export const ABILITY_ABBR: Record<AbilityKey, string> = {
  str: 'СИЛ',
  dex: 'ЛОВ',
  con: 'ТЕЛ',
  int: 'ИНТ',
  wis: 'МДР',
  cha: 'ХАР'
}

// Maps every Russian ability spelling (full name + abbreviation, any case) → key.
export const RU_TO_ABILITY: Record<string, AbilityKey> = (() => {
  const m: Record<string, AbilityKey> = {}
  for (const k of ABILITIES) {
    m[ABILITY_RU[k].toLowerCase()] = k
    m[ABILITY_ABBR[k].toLowerCase()] = k
  }
  return m
})()

/** Look up an ability key from a Russian word (full or abbreviated). */
export function abilityFromRu(word: string): AbilityKey | null {
  return RU_TO_ABILITY[word.trim().toLowerCase().replace(/\.$/, '')] ?? null
}

// All 18 skills (2024 RU names) → governing ability. Names match those used in
// the class/background text in character-build.ts.
export const SKILL_ABILITY: Record<string, AbilityKey> = {
  Акробатика: 'dex',
  Анализ: 'int',
  Атлетика: 'str',
  Внимательность: 'wis',
  Выживание: 'wis',
  Выступление: 'cha',
  Запугивание: 'cha',
  История: 'int',
  'Ловкость рук': 'dex',
  Магия: 'int',
  Медицина: 'wis',
  Обман: 'cha',
  Природа: 'int',
  Проницательность: 'wis',
  Религия: 'int',
  Скрытность: 'dex',
  Убеждение: 'cha',
  'Уход за животными': 'wis'
}

export const ALL_SKILLS = Object.keys(SKILL_ABILITY)

// Each skill has a gameplay description (`play` — what you roll it for, used in
// the sheet/compact UI) and a narrative one (`lore` — what it represents, read
// on demand).
export interface SkillDesc {
  play: string
  lore: string
}
export const SKILL_DESC: Record<string, SkillDesc> = {
  Акробатика: { play: 'Удержать равновесие, кувыркаться, вырваться из захвата, устоять на скользком.', lore: 'Грация, гибкость и владение телом в движении — от канатоходца до акробата.' },
  Анализ: { play: 'Искать улики, осматривать место, разгадывать загадки по деталям.', lore: 'Логика, внимание к мелочам и дедукция — ум сыщика.' },
  Атлетика: { play: 'Лазать, прыгать, плавать, толкать, бороться и удерживать силой.', lore: 'Грубая физическая мощь и натренированное тело.' },
  Внимательность: { play: 'Заметить скрытое, услышать шорох, увидеть детали вокруг.', lore: 'Острота чувств и постоянная бдительность.' },
  Выживание: { play: 'Идти по следу, ориентироваться, добыть еду, читать погоду и местность.', lore: 'Опыт жизни в дикой природе, чутьё следопыта.' },
  Выступление: { play: 'Развлечь публику музыкой, танцем, речью или представлением.', lore: 'Артистизм и сценическое обаяние.' },
  Запугивание: { play: 'Добиться своего угрозами, давлением и демонстрацией силы.', lore: 'Умение внушать страх и подчинять чужую волю.' },
  История: { play: 'Вспомнить события, державы, войны, легенды и важные личности.', lore: 'Знание прошлого мира и его наследия.' },
  'Ловкость рук': { play: 'Карманная кража, фокусы, незаметно подложить или спрятать предмет.', lore: 'Проворство и точность пальцев.' },
  Магия: { play: 'Опознать заклинание, магический предмет, символ или план бытия.', lore: 'Знание тайн магии и её устройства.' },
  Медицина: { play: 'Стабилизировать умирающего, опознать болезнь, оказать помощь.', lore: 'Врачевание тела и знание недугов.' },
  Обман: { play: 'Солгать, сблефовать, ввести собеседника в заблуждение.', lore: 'Искусство убедительной неправды.' },
  Природа: { play: 'Опознать животных, растения, погоду и природные явления.', lore: 'Знание мира природы и её циклов.' },
  Проницательность: { play: 'Понять намерения, заметить ложь по поведению и мимике.', lore: 'Чтение людей и их истинных мотивов.' },
  Религия: { play: 'Вспомнить божеств, обряды, культы, нежить и небожителей.', lore: 'Знание священного и потустороннего.' },
  Скрытность: { play: 'Спрятаться и передвигаться незаметно и бесшумно.', lore: 'Умение оставаться невидимым и неслышимым.' },
  Убеждение: { play: 'Повлиять тактом, логикой и добрым словом.', lore: 'Сила слова и искреннее обаяние.' },
  'Уход за животными': { play: 'Успокоить, понять и направить животное или ездового зверя.', lore: 'Связь и взаимопонимание с животными.' }
}

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8]

export const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9
}
export const POINT_BUY_BUDGET = 27
export const POINT_BUY_MIN = 8
export const POINT_BUY_MAX = 15

// "Take average" HP per level by hit-die size (PHB rounding).
export const HIT_DIE_AVG: Record<number, number> = { 6: 4, 8: 5, 10: 6, 12: 7 }

// ---- calculators ----
export function abilityMod(score: number): number {
  return Math.floor((score - 10) / 2)
}

export function formatMod(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`
}

export function proficiencyBonus(level: number): number {
  return 2 + Math.floor((Math.max(1, Math.min(20, level)) - 1) / 4)
}

export function finalAbility(base: number, increase = 0): number {
  return Math.min(20, base + increase)
}

export function pointBuySpent(scores: number[]): number {
  return scores.reduce((sum, s) => sum + (POINT_BUY_COST[s] ?? 0), 0)
}

export function isValidPointBuy(scores: number[]): boolean {
  return (
    scores.every((s) => s >= POINT_BUY_MIN && s <= POINT_BUY_MAX) &&
    pointBuySpent(scores) <= POINT_BUY_BUDGET
  )
}

/** Hit-die number from a "к10" string. */
export function hitDieSize(hitDie: string): number {
  const m = hitDie.match(/к(\d+)/i)
  return m ? Number(m[1]) : 8
}

/**
 * Max HP for a character.
 * Level 1 = max die + CON mod. Each later level adds either the die average
 * (method 'average') or a provided roll, plus CON mod, min +1 per level.
 */
export function computeMaxHp(
  hitDie: string,
  level: number,
  conMod: number,
  method: 'average' | 'rolled' | 'manual',
  rolls: number[] = [],
  manual?: number
): number {
  if (method === 'manual') return manual ?? 0
  const die = hitDieSize(hitDie)
  let hp = die + conMod
  for (let lvl = 2; lvl <= level; lvl++) {
    const gain = method === 'average' ? HIT_DIE_AVG[die] ?? Math.floor(die / 2) + 1 : rolls[lvl - 2] ?? 0
    hp += Math.max(1, gain + conMod)
  }
  return hp
}

// ---- parsers ----
const COUNT_WORDS: Record<string, number> = { одна: 1, одно: 1, две: 2, три: 3, четыре: 4, пять: 5 }

/**
 * Parse a class skills line such as:
 *   "Две на выбор: Уход за животными, Атлетика, …"
 *   "Три на выбор из любого списка."
 * Returns how many to pick and the allowed options. `anyList` means "any of all
 * 18 skills" (used when no explicit list is given).
 */
export function parseClassSkills(text: string): { count: number; options: string[]; anyList: boolean } {
  const lower = text.trim().toLowerCase()
  const countWord = Object.keys(COUNT_WORDS).find((w) => lower.startsWith(w))
  const count = countWord ? COUNT_WORDS[countWord] : 2

  const afterColon = text.includes(':') ? text.slice(text.indexOf(':') + 1) : text
  const tokens = afterColon
    .split(/[,·]/)
    .map((t) => t.trim().replace(/\.$/, '').trim())
    .filter(Boolean)
  const options = tokens.filter((t) => t in SKILL_ABILITY)

  if (options.length === 0 || /любого списка|любой/i.test(text)) {
    return { count, options: ALL_SKILLS, anyList: true }
  }
  return { count, options, anyList: false }
}

/** Parse a background ability trio: "Сила, Телосложение, Мудрость" → keys. */
export function parseAbilityList(text: string | undefined): AbilityKey[] {
  if (!text) return []
  const out: AbilityKey[] = []
  for (const part of text.split(/[,/·]/)) {
    const k = abilityFromRu(part)
    if (k && !out.includes(k)) out.push(k)
  }
  return out
}

export interface WeaponParse {
  die: string | null
  damageType: string | null
  finesse: boolean
  twoHanded: boolean
  thrown: boolean
  versatileDie: string | null
}

/**
 * Parse a weapon `props` string, e.g.
 *   "1к8 рубящего · универсальное (1к10)"
 *   "1к4 колющего · лёгкое, фехтовальное, метательное (20/60 футов)"
 * Damage die is read only from the segment before the first "·" so range tokens
 * like "20/60" are never mistaken for damage.
 */
export function parseWeaponProps(props: string): WeaponParse {
  const head = props.split('·')[0] ?? props
  const dieMatch = head.match(/(\d*к\d+)/i)
  const typeMatch = head.match(/(рубящего|колющего|дробящего)/i)
  const versatileMatch = props.match(/универсальн\w*\s*\((\d*к\d+)\)/i)
  return {
    die: dieMatch ? dieMatch[1] : null,
    damageType: typeMatch ? typeMatch[1] : null,
    finesse: /фехтовальн/i.test(props),
    twoHanded: /двуручн/i.test(props),
    thrown: /метательн/i.test(props),
    versatileDie: versatileMatch ? versatileMatch[1] : null
  }
}

export interface AttackResult {
  ability: AbilityKey
  attackBonus: number
  damageString: string
}

/**
 * Compute attack bonus + damage string for a weapon. Assumes proficiency (a
 * simple constructor — class weapon proficiency isn't modelled). Chooses the
 * ability: DEX for ranged, best of STR/DEX for finesse, otherwise STR.
 */
export function weaponAttack(
  parse: WeaponParse,
  ranged: boolean,
  mods: Record<AbilityKey, number>,
  pb: number,
  opts: { useVersatile?: boolean; forceTwoHanded?: boolean } = {}
): AttackResult {
  const ability: AbilityKey = ranged ? 'dex' : parse.finesse ? (mods.dex >= mods.str ? 'dex' : 'str') : 'str'
  const mod = mods[ability]
  const die = opts.useVersatile && parse.versatileDie ? parse.versatileDie : parse.die
  const dmgParts: string[] = []
  if (die) dmgParts.push(die)
  if (mod !== 0) dmgParts.push(mod > 0 ? `+ ${mod}` : `− ${Math.abs(mod)}`)
  const damageString = `${dmgParts.join(' ')}${parse.damageType ? ` ${parse.damageType}` : ''}`.trim() || '—'
  return { ability, attackBonus: mod + pb, damageString }
}

/** Average damage of a weapon's dice + ability mod (rough, for sorting/preview). */
export function averageDamage(die: string | null, mod: number): number {
  if (!die) return Math.max(0, mod)
  const parsed = parseDiceToken(die)
  if (!parsed) return Math.max(0, mod)
  const avgPerDie = (parsed.sides + 1) / 2
  return Math.max(1, Math.round(parsed.count * avgPerDie + mod))
}
