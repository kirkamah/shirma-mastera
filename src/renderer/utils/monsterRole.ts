import type { StatBlock } from '@shared/types'
import type { IconType } from 'react-icons'
import { GiCrossedSwords, GiBowArrow, GiMagicSwirl, GiShield, GiCrownedSkull } from 'react-icons/gi'
import { RU_BESTIARY } from '../data/bestiary-ru'

/** Tactical role used for filtering and the corner badge on monster tiles.
 *  A monster has exactly one primary role; the `boss` flag is orthogonal. */
export type MonsterRole = 'melee' | 'ranged' | 'caster' | 'tank'

export interface MonsterRoleInfo {
  primary: MonsterRole
  boss: boolean
}

export const ROLE_LABELS: Record<MonsterRole | 'boss', string> = {
  melee: 'Ближник',
  ranged: 'Дальник',
  caster: 'Маг',
  tank: 'Танк',
  boss: 'Босс'
}

export const ROLE_ICONS: Record<MonsterRole | 'boss', IconType> = {
  melee: GiCrossedSwords,
  ranged: GiBowArrow,
  caster: GiMagicSwirl,
  tank: GiShield,
  boss: GiCrownedSkull
}

/** Tailwind classes for the small role badge — picked to stay legible on the
 *  parchment tile background and to be visually distinct from the gold/red CR
 *  wax-seal in the opposite corner. */
export const ROLE_BADGE_CLASS: Record<MonsterRole | 'boss', string> = {
  melee: 'bg-red-800 text-amber-50',
  ranged: 'bg-emerald-800 text-amber-50',
  caster: 'bg-purple-800 text-amber-50',
  tank: 'bg-sky-900 text-amber-50',
  boss: 'bg-amber-500 text-stone-900'
}

const SPELLCASTING_NAME = /использован.{0,5}заклинан|врожд.{0,4}колдовств|магия договор|тайнств.{0,5}аркан|колдовств(?:о|а|ом)/i
const RANGED_ATTACK = /дальнобойн[аояы]/i
const MELEE_ATTACK = /рукопашн[аояы]/i

/** Strip the "(N ур.)" suffix from class-NPC names so that all level variants
 *  (3 ур. / 7 ур. / 13 ур. / 18 ур.) of the same archetype share a key and end
 *  up with a single, consistent role. */
function baseName(name: string): string {
  return name.replace(/\s*\(\s*\d+\s*ур\.\s*\)\s*$/i, '').trim()
}

/** Heuristic role for one monster, without consulting siblings. */
function classifyPrimary(m: StatBlock): MonsterRole {
  // Caster — has any spellcasting-style trait/action.
  const hasCaster =
    m.traits.some((t) => SPELLCASTING_NAME.test(t.name)) ||
    m.actions.some((a) => SPELLCASTING_NAME.test(a.name)) ||
    m.bonusActions.some((a) => SPELLCASTING_NAME.test(a.name))
  if (hasCaster) return 'caster'

  // Ranged — strictly more ranged attacks than melee in the action list. An
  // equal count means the ranged option is a backup (e.g. a barbarian's thrown
  // axe) and the creature stays a melee.
  let ranged = 0
  let melee = 0
  for (const a of m.actions) {
    if (RANGED_ATTACK.test(a.desc)) ranged++
    if (MELEE_ATTACK.test(a.desc)) melee++
  }
  if (ranged > 0 && ranged > melee) return 'ranged'

  // Tank — narrow definition: dedicated defender. Class-NPCs without armor
  // (raging barbarians, monks) explicitly miss this branch.
  const resPieces = (m.damageResistances ?? '').split(/[,;]/).filter((s) => s.trim()).length
  const immPieces = (m.damageImmunities ?? '').split(/[,;]/).filter((s) => s.trim()).length
  const isConstruct = /construct|конструкт/i.test(m.type)
  if (
    (isConstruct && m.armorClass >= 17 && m.hitPoints >= 50) ||
    resPieces + immPieces >= 4 ||
    (m.armorClass >= 19 && m.hitPoints >= 100)
  ) {
    return 'tank'
  }

  // 4. Default — melee bruiser.
  return 'melee'
}

/** Cached primary role per base name. Lazily initialised from RU_BESTIARY on
 *  first call so that all variants of a class NPC share their highest-CR
 *  variant's classification, avoiding the "role flips between levels" bug. */
let BASE_ROLE: Map<string, MonsterRole> | null = null

function ensureIndex(): Map<string, MonsterRole> {
  if (BASE_ROLE) return BASE_ROLE
  const groups = new Map<string, StatBlock[]>()
  for (const m of RU_BESTIARY) {
    const k = baseName(m.name)
    const arr = groups.get(k)
    if (arr) arr.push(m)
    else groups.set(k, [m])
  }
  const result = new Map<string, MonsterRole>()
  for (const [k, arr] of groups) {
    // Sort by CR descending and classify the most-developed variant. Lower-CR
    // entries (e.g. lvl 3 barbarian without his lvl-18 toolkit) inherit it.
    arr.sort((a, b) => b.challengeRating - a.challengeRating)
    result.set(k, classifyPrimary(arr[0]))
  }
  BASE_ROLE = result
  return result
}

/** Public API: returns the primary role (shared across all level variants of a
 *  class archetype) plus a per-variant `boss` flag (so only the higher-CR
 *  entries get the crown). */
export function monsterRole(m: StatBlock): MonsterRoleInfo {
  const idx = ensureIndex()
  const k = baseName(m.name)
  const primary = idx.get(k) ?? classifyPrimary(m)
  const boss = m.legendaryActions.length > 0 || m.challengeRating >= 11
  return { primary, boss }
}
