// Character-sheet data model + a single pure `deriveSheet()` that turns stored
// selections into everything the printable sheet shows. Both the interactive
// React sheet and the HTML/PDF export use deriveSheet, so display logic lives in
// exactly one place.
import { uid } from '../utils/monster'
import { FEAT_BUILDS, featByName, type BuildTrait } from './character-build'
import { findRace, findClass, findBackground } from './custom-builds'
import { MASTERY_RU, type MasteryKey, type ArmorTier } from './equipment-ru'
import { METAMAGIC } from './metamagic'
import { MANEUVERS } from './maneuvers'
import {
  ABILITIES,
  ABILITY_RU,
  SKILL_ABILITY,
  ALL_SKILLS,
  abilityMod,
  proficiencyBonus,
  finalAbility,
  parseAbilityList,
  parseWeaponProps,
  weaponAttack,
  abilityFromRu,
  type AbilityKey
} from './character-rules'

export type SheetMode = 'manual' | 'constructor'
export type HpMethod = 'average' | 'rolled' | 'manual'
export type AbilityMethod = 'point-buy' | 'standard-array' | 'roll' | 'manual'

/** A line of inventory. Weapons (`weapon: true`) auto-generate an attack. */
export interface InvItem {
  id: string
  name: string
  qty: number
  cost?: string // original cost string, used to refund on removal
  weapon?: boolean
  rawProps?: string
  ranged?: boolean
  masteryKey?: MasteryKey
  useVersatile?: boolean
  masteryOn?: boolean
  // armour (auto-equipped → contributes to КД)
  armorTier?: ArmorTier
  armorBase?: number // body armour base AC, or shield bonus
  /** Marks items auto-granted by the class / background starting kit, so the
   *  items↔gold toggle can cleanly add and remove the whole grant. */
  grant?: 'class' | 'bg'
}

export type Abilities = Record<AbilityKey, number>

export interface CharacterSheet {
  key: string
  name: string
  mode: SheetMode
  updatedAt: number

  // selections (ids into *_BUILDS)
  raceId?: string
  subraceName?: string
  classId?: string
  subclassName?: string
  level: number
  backgroundId?: string
  alignment?: string
  // free-text identity shown on the sheet header (constructor fills these on
  // pick; manual mode types them directly).
  raceText?: string
  classText?: string
  backgroundText?: string
  playerName?: string

  // abilities
  abilityMethod: AbilityMethod
  baseAbilities: Abilities
  backgroundIncreases: Partial<Abilities>

  // hp
  hpMethod: HpMethod
  hpRolls?: number[]
  maxHp: number
  currentHp?: number
  tempHp?: number

  // proficiencies
  chosenClassSkills: string[]
  extraSkills?: string[]
  extraSaves?: AbilityKey[]
  /** Skills with Expertise (proficiency bonus doubled), e.g. Rogue/Bard. */
  expertiseSkills?: string[]
  removedSkills?: string[] // manually un-checked on the sheet (override)
  removedSaves?: AbilityKey[]
  otherProficiencies?: string

  // combat / gear
  items: InvItem[] // structured inventory (constructor); weapons become attacks
  armorClass?: number
  speed?: number
  inventory?: string // free-text notes / manual-mode equipment
  equipChoice?: 'items' | 'gold' // class starting equipment: take items or gold
  bgEquipChoice?: 'items' | 'gold' // background starting equipment: take items or gold

  // page 1 extras (official 2014 sheet)
  inspiration?: boolean
  experience?: string
  coins?: { cp?: number; sp?: number; ep?: number; gp?: number; pp?: number }
  deathSuccesses?: number // 0..3
  deathFailures?: number // 0..3

  // free-text (roleplay / page 1 & 2)
  notes?: string
  personality?: string
  ideals?: string
  bonds?: string
  flaws?: string
  appearance?: string
  backstory?: string
  // page 2 (character details)
  age?: string
  height?: string
  weight?: string
  eyes?: string
  skin?: string
  hair?: string
  allies?: string
  additionalFeatures?: string
  treasure?: string
  magicItems?: string // «Мои артефакты и магические предметы» (page 4)

  // manual-mode editing (when there's no class/derivation)
  manualHitDice?: string
  manualAttacks?: ManualAttack[]
  manualFeatures?: string

  // constructor choices
  chosenFeatIds: string[]
  metamagic?: string[]
  maneuvers?: string[]
  /** Picks for class/subclass features that offer options (e.g. Druid Primal
   *  Order). Keyed by the feature's name → chosen option name. */
  featureChoices?: Record<string, string>

  // page 4 (spellcasting)
  spellcasting?: {
    className?: string
    ability?: AbilityKey
    saveDC?: number
    attackBonus?: number
    cantrips?: SpellLine[]
    levels?: { total?: number; used?: number; lines?: SpellLine[] }[] // index 0 = spell level 1
  }

  // forward-compat
  knownCantrips: string[]
  knownSpells: string[]
  spellAbility?: AbilityKey
}

export interface ManualAttack {
  id: string
  name: string
  bonus?: number
  damage?: string
}
/** One spell on the spell page: a name + fillable component/ritual/conc circles. */
export interface SpellLine {
  name?: string
  v?: boolean // вербальный
  s?: boolean // соматический
  m?: boolean // материальный
  r?: boolean // ритуал
  c?: boolean // концентрация
}

export function emptyAbilities(): Abilities {
  return { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }
}

export function emptyCharacterSheet(mode: SheetMode): CharacterSheet {
  return {
    key: uid('char'),
    name: '',
    mode,
    updatedAt: Date.now(),
    level: 1,
    abilityMethod: mode === 'constructor' ? 'standard-array' : 'manual',
    baseAbilities: emptyAbilities(),
    backgroundIncreases: {},
    hpMethod: mode === 'constructor' ? 'average' : 'manual',
    maxHp: 0,
    chosenClassSkills: [],
    items: [],
    chosenFeatIds: [],
    knownCantrips: [],
    knownSpells: []
  }
}

// ---- derived view ----
export interface SkillView {
  skill: string
  ability: AbilityKey
  proficient: boolean
  /** Expertise — proficiency bonus is doubled for this skill. */
  expert: boolean
  bonus: number
}
export interface SaveView {
  ability: AbilityKey
  proficient: boolean
  bonus: number
}
export interface FeatureView {
  source: string
  name: string
  desc: string
  level?: number
}
export interface AttackView {
  name: string
  bonus: number
  damage: string
  mastery?: string
}
export interface MasteryView {
  weapon: string
  name: string
  desc: string
}

export interface SheetView {
  raceName: string
  className: string
  subclassName: string
  backgroundName: string
  hitDie: string
  proficiencyBonus: number
  finalAbilities: Abilities
  mods: Abilities
  saves: SaveView[]
  skills: SkillView[]
  passivePerception: number
  initiative: number
  maxHp: number
  speed: number
  features: FeatureView[]
  featuresPage1: FeatureView[]
  featuresPage2: FeatureView[]
  featSlots: number
  attacks: AttackView[]
  masteries: MasteryView[]
  equipmentText: string
  derivedAC: number
  proficienciesText: string
  grantedCantrips: string[]
  grantedSpells: string[]
  featNames: string[]
  primaryAbility?: AbilityKey
}

const LEVEL_GATE = /\(с\s*(\d+)\s*ур\.?\)/i

/** Compute everything the sheet displays from the stored selections. Pure. */
export function deriveSheet(s: CharacterSheet): SheetView {
  const race = findRace(s.raceId)
  const cls = findClass(s.classId)
  const bg = findBackground(s.backgroundId)
  const sub = cls?.subclasses?.find((x) => x.name === s.subclassName)
  const subrace = race?.subraces?.find((x) => x.name === s.subraceName)

  const pb = proficiencyBonus(s.level)

  const finalAbilities = {} as Abilities
  const mods = {} as Abilities
  for (const k of ABILITIES) {
    finalAbilities[k] = finalAbility(s.baseAbilities[k] ?? 10, s.backgroundIncreases[k] ?? 0)
    mods[k] = abilityMod(finalAbilities[k])
  }

  // Saving throws — proficiency from class.saves free text + manual extras − removed.
  const removedSaves = new Set(s.removedSaves ?? [])
  const saveProf = new Set<AbilityKey>([...(cls ? parseAbilityList(cls.saves) : []), ...(s.extraSaves ?? [])].filter((a) => !removedSaves.has(a)))
  const saves: SaveView[] = ABILITIES.map((ability) => ({
    ability,
    proficient: saveProf.has(ability),
    bonus: mods[ability] + (saveProf.has(ability) ? pb : 0)
  }))

  // Skill proficiencies — class picks + background fixed + extras − removed.
  const bgSkills = bg ? ALL_SKILLS.filter((sk) => (bg.skills || '').includes(sk)) : []
  const removedSkills = new Set(s.removedSkills ?? [])
  const skillProf = new Set<string>([...s.chosenClassSkills, ...bgSkills, ...(s.extraSkills ?? [])].filter((sk) => !removedSkills.has(sk)))
  // Expertise only applies to skills you're actually proficient in.
  const expertiseSet = new Set((s.expertiseSkills ?? []).filter((sk) => skillProf.has(sk)))
  const skills: SkillView[] = ALL_SKILLS.map((skill) => {
    const ability = SKILL_ABILITY[skill]
    const proficient = skillProf.has(skill)
    const expert = proficient && expertiseSet.has(skill)
    return { skill, ability, proficient, expert, bonus: mods[ability] + (proficient ? pb * (expert ? 2 : 1) : 0) }
  })
  const perception = skills.find((sk) => sk.skill === 'Внимательность')
  const passivePerception = 10 + (perception?.bonus ?? mods.wis)

  // Auto-granted features (class ≤ level, subclass ≤ level if L≥3, race, subrace).
  // The ASI / epic-boon slots are NOT abilities — they're feat opportunities,
  // shown via featSlots + chosen feats, so skip them in the list.
  const features: FeatureView[] = []
  const isFeatSlot = (name: string): boolean => /^(Улучшение характеристик|Эпический дар)/i.test(name)
  const gate = (t: BuildTrait, dflt: number): boolean => (t.level ?? dflt) <= s.level
  // Features that make the player pick an option: append the chosen option's
  // text (and remember any proficiency it grants) to the description.
  const choiceArmor: string[] = []
  const choiceWeapons: string[] = []
  const withChoice = (f: BuildTrait): string => {
    // Unconditional proficiency a feature grants (e.g. College of Valor).
    if (f.armor) choiceArmor.push(f.armor)
    if (f.weapons) choiceWeapons.push(f.weapons)
    if (!f.choices?.length) return f.desc
    const opt = f.choices.find((o) => o.name === s.featureChoices?.[f.name])
    if (!opt) return `${f.desc}\n▸ Выбор не сделан: ${f.choices.map((o) => `«${o.name}»`).join(' / ')}.`
    if (opt.armor) choiceArmor.push(opt.armor)
    if (opt.weapons) choiceWeapons.push(opt.weapons)
    return `${f.desc}\n▸ Выбрано — «${opt.name}»: ${opt.desc}`
  }
  if (cls) for (const f of cls.features) if (gate(f, 1) && !isFeatSlot(f.name)) features.push({ source: 'Класс', name: f.name, desc: withChoice(f), level: f.level })
  if (sub && s.level >= 3) for (const f of sub.features) if (gate(f, 3)) features.push({ source: 'Подкласс', name: f.name, desc: withChoice(f), level: f.level })
  if (race)
    for (const t of race.traits) {
      const m = t.name.match(LEVEL_GATE)
      if (!m || Number(m[1]) <= s.level) features.push({ source: 'Раса', name: t.name, desc: t.desc })
    }
  if (subrace) for (const t of subrace.traits) features.push({ source: 'Подраса', name: t.name, desc: t.desc })

  const featSlots = cls ? cls.features.filter((f) => f.name === 'Улучшение характеристик' && (f.level ?? 99) <= s.level).length : 0

  // Feats (background + chosen), metamagic, maneuvers — written out as features.
  const featNames: string[] = []
  // Feats: show only the gameplay part (bonuses) on the sheet; the narrative
  // intro (f.desc) is available in the «Черты» reference tab.
  if (bg?.feat) {
    const f = featByName(bg.feat)
    featNames.push(bg.feat)
    features.push({ source: 'Черта (предыстория)', name: bg.feat, desc: f && f.bonuses?.length ? f.bonuses.join(' ') : f?.desc ?? '' })
  }
  for (const id of s.chosenFeatIds ?? []) {
    const f = FEAT_BUILDS.find((x) => x.id === id) ?? featByName(id)
    if (f) {
      featNames.push(f.name)
      features.push({ source: 'Черта', name: f.name, desc: f.bonuses?.length ? f.bonuses.join(' ') : f.desc })
    }
  }
  for (const name of s.metamagic ?? []) {
    const m = METAMAGIC.find((x) => x.name === name)
    if (m) features.push({ source: 'Метамагия', name: m.name, desc: m.desc })
  }
  for (const name of s.maneuvers ?? []) {
    const m = MANEUVERS.find((x) => x.name === name)
    if (m) features.push({ source: 'Боевой приём', name: m.name, desc: m.desc })
  }

  // Proficiencies (armour / weapons / tools / languages) — collected into the
  // «Прочие владения и языки» box instead of cluttering the features list.
  const profParts: string[] = []
  const armorAll = [cls?.armor, ...choiceArmor].filter(Boolean).join(', ')
  const weaponsAll = [cls?.weapons, ...choiceWeapons].filter(Boolean).join(', ')
  if (armorAll) profParts.push(`Доспехи: ${armorAll}`)
  if (weaponsAll) profParts.push(`Оружие: ${weaponsAll}`)
  const tools = [cls?.tools, bg?.tools].filter(Boolean).join(', ')
  if (tools) profParts.push(`Инструменты: ${tools}`)
  const langs = [race?.langs, bg?.langs].filter(Boolean).join(', ')
  if (langs) profParts.push(`Языки: ${langs}`)
  const proficienciesText = profParts.join('\n')

  // Spells/cantrips granted by features → surfaced on the spell page.
  const grantedCantrips: string[] = []
  const grantedSpells: string[] = []
  for (const f of features) {
    const refs = [...f.desc.matchAll(/«([^»]+)»/g)].map((m) => m[1])
    if (!refs.length) continue
    if (/заговор/i.test(f.desc)) refs.forEach((r) => !grantedCantrips.includes(r) && grantedCantrips.push(r))
    else if (/заклинани\w*\s+«|знает заклинание/i.test(f.desc)) refs.forEach((r) => !grantedSpells.includes(r) && grantedSpells.push(r))
  }

  // Attacks — one per owned weapon item, recomputed from current mods.
  const items = s.items ?? []
  const weaponItems = items.filter((i) => i.weapon && i.rawProps)
  const attacks: AttackView[] = weaponItems.map((w) => {
    const parse = parseWeaponProps(w.rawProps!)
    const res = weaponAttack(parse, !!w.ranged, mods, pb, { useVersatile: w.useVersatile })
    const mastery = w.masteryOn && w.masteryKey ? MASTERY_RU[w.masteryKey].name : undefined
    return { name: w.name, bonus: res.attackBonus, damage: res.damageString, mastery }
  })
  // Manual (custom) attacks typed on the sheet.
  for (const a of s.manualAttacks ?? []) {
    if (a.name?.trim()) attacks.push({ name: a.name, bonus: a.bonus ?? 0, damage: a.damage ?? '' })
  }
  const masteries: MasteryView[] = weaponItems
    .filter((w) => w.masteryOn && w.masteryKey)
    .map((w) => ({ weapon: w.name, name: MASTERY_RU[w.masteryKey!].name, desc: MASTERY_RU[w.masteryKey!].desc }))

  // Armour → Класс Доспеха (auto). Body armour gives base + Dex (capped by type);
  // a shield adds its bonus. No body armour → 10 + Dex (без доспеха).
  const dexFor = (tier: ArmorTier): number => (tier === 'light' ? mods.dex : tier === 'medium' ? Math.min(mods.dex, 2) : 0)
  const bodyArmor = items.filter((i) => i.armorTier && i.armorTier !== 'shield')
  const shieldItem = items.find((i) => i.armorTier === 'shield')
  const bodyAC = bodyArmor.length ? Math.max(...bodyArmor.map((i) => (i.armorBase ?? 10) + dexFor(i.armorTier!))) : 10 + mods.dex
  const derivedAC = bodyAC + (shieldItem?.armorBase ?? 0)
  const armorLine = (i: InvItem): string =>
    i.armorTier === 'shield' ? ` (+${i.armorBase ?? 2} к КД)` : ` (КД ${(i.armorBase ?? 10) + dexFor(i.armorTier!)})`

  // Equipment display: "[qty] name" per item (armour shows the КД it grants).
  const itemLines = items.map((i) => `${i.qty > 1 ? `[${i.qty}] ` : ''}${i.name}${i.armorTier ? armorLine(i) : ''}`).join('\n')
  const equipmentText = [itemLines, s.inventory].filter((t) => t && t.trim()).join('\n')

  // Split features so the page-1 «Умения и черты» box stays readable; only the
  // genuine overflow lands in page-2 «Дополнительные умения и черты». The budget
  // is generous so page 1 fills up first (most characters fit entirely there).
  const featuresPage1: FeatureView[] = []
  const featuresPage2: FeatureView[] = []
  let budget = 2000
  for (const f of features) {
    if (budget > 0) {
      featuresPage1.push(f)
      budget -= f.name.length + f.desc.length + 10
    } else featuresPage2.push(f)
  }

  return {
    raceName: s.raceText?.trim() || (race ? race.name + (subrace ? ` (${subrace.name})` : '') : ''),
    className: s.classText?.trim() || cls?.name || '',
    subclassName: sub?.name ?? s.subclassName ?? '',
    backgroundName: s.backgroundText?.trim() || bg?.name || '',
    hitDie: cls?.hitDie ?? '',
    proficiencyBonus: pb,
    finalAbilities,
    mods,
    saves,
    skills,
    passivePerception,
    initiative: mods.dex,
    maxHp: s.maxHp,
    speed: s.speed ?? race?.speed ?? 30,
    features,
    featuresPage1,
    featuresPage2,
    featSlots,
    attacks,
    masteries,
    equipmentText,
    derivedAC,
    proficienciesText,
    grantedCantrips,
    grantedSpells,
    featNames,
    primaryAbility: cls ? abilityFromRu(cls.primary) ?? undefined : undefined
  }
}

// ---- weapon mastery (PH24): how many weapons can use mastery at this level ----
const MASTERY_BASE: Record<string, number> = {
  'barbarian-ph24': 2,
  'fighter-ph24': 3,
  'paladin-ph24': 2,
  'ranger-ph24': 2,
  'rogue-ph24': 2
}
export function masteryCount(classId: string | undefined, level: number): number {
  if (!classId) return 0
  let n = MASTERY_BASE[classId] ?? 0
  if (n === 0) return 0
  if (classId === 'fighter-ph24') n += (level >= 4 ? 1 : 0) + (level >= 10 ? 1 : 0) + (level >= 16 ? 1 : 0)
  else if (level >= 10) n += 1
  return n
}

/** How many skills get Expertise (doubled proficiency) at this class/level. */
export function expertiseCount(classId: string | undefined, level: number): number {
  switch (classId) {
    case 'rogue-ph24':
      return 2 + (level >= 6 ? 2 : 0)
    case 'bard-ph24':
      return (level >= 2 ? 2 : 0) + (level >= 9 ? 2 : 0)
    case 'ranger-ph24':
      return level >= 9 ? 2 : 0
    case 'wizard-ph24':
      return level >= 2 ? 1 : 0
    default:
      return 0
  }
}

/** How many metamagic options a sorcerer knows at this level (PH24). */
export function metamagicCount(classId: string | undefined, level: number): number {
  if (classId !== 'sorcerer-ph24' || level < 2) return 0
  return 2 + (level >= 10 ? 1 : 0) + (level >= 17 ? 1 : 0)
}

/** How many maneuvers a Battle Master knows at this level (PH24). */
export function maneuverCount(subclassName: string | undefined, level: number): number {
  if (subclassName !== 'Мастер боевых искусств' || level < 3) return 0
  return 3 + (level >= 7 ? 2 : 0) + (level >= 10 ? 2 : 0) + (level >= 15 ? 2 : 0)
}

export const ABILITY_FULL = ABILITY_RU
