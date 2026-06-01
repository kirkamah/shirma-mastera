import type { StatBlock } from '@shared/types'
import { translateSize, translateType } from '@shared/translations'
import { enemyClassOf } from './enemyClass'

export type SortMode = 'name' | 'cr-asc' | 'cr-desc' | 'type'

export interface Filters {
  text: string
  crMin: number
  crMax: number
  sizes: string[]
  types: string[]
  habitats: string[]
  alignments: string[]
  /** Show class-based enemy NPCs (Воин/Жрец/Маг… by level) in the bestiary.
   *  When false (default), they're hidden from the general list. */
  showClassEnemies: boolean
  sort: SortMode
}

export const DEFAULT_FILTERS: Filters = {
  text: '',
  crMin: 0,
  crMax: 30,
  sizes: [],
  types: [],
  habitats: [],
  alignments: [],
  showClassEnemies: false,
  sort: 'name'
}

export const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']

export const SIZE_RU: Record<string, string> = {
  Tiny: 'Крошечный',
  Small: 'Маленький',
  Medium: 'Средний',
  Large: 'Большой',
  Huge: 'Огромный',
  Gargantuan: 'Громадный'
}

export const TYPES = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead'
]

/** Apply client-side multi-select filters and sorting. Data fields are Russian,
 *  so English filter keys are translated before comparison. */
export function applyFilters(list: StatBlock[], f: Filters): StatBlock[] {
  const text = f.text.trim().toLowerCase()
  const sizeSet = f.sizes.map((s) => translateSize(s).toLowerCase())
  const typeSet = f.types.map((tp) => translateType(tp).toLowerCase())

  let out = list.filter((m) => {
    if (text && !m.name.toLowerCase().includes(text)) return false
    if (m.challengeRating < f.crMin || m.challengeRating > f.crMax) return false
    if (sizeSet.length && !sizeSet.includes(m.size.toLowerCase())) return false
    if (typeSet.length && !typeSet.includes(m.type.toLowerCase())) return false
    if (f.habitats.length && !f.habitats.some((h) => m.environments.includes(h))) return false
    if (f.alignments.length && !f.alignments.some((a) => m.alignment.toLowerCase().includes(a.toLowerCase()))) return false
    if (!f.showClassEnemies && enemyClassOf(m.name)) return false
    return true
  })

  out = [...out].sort((a, b) => {
    if (f.sort === 'name') return a.name.localeCompare(b.name, 'ru')
    if (f.sort === 'cr-asc') return a.challengeRating - b.challengeRating
    if (f.sort === 'cr-desc') return b.challengeRating - a.challengeRating
    return a.type.localeCompare(b.type, 'ru') || a.challengeRating - b.challengeRating
  })
  return out
}

/** Collect distinct habitat and alignment options present in a list. */
export function collectOptions(list: StatBlock[]): { habitats: string[]; alignments: string[] } {
  const habitats = new Set<string>()
  const alignments = new Set<string>()
  for (const m of list) {
    m.environments.forEach((e) => habitats.add(e))
    if (m.alignment) alignments.add(m.alignment)
  }
  return { habitats: [...habitats].sort((a, b) => a.localeCompare(b, 'ru')), alignments: [...alignments].sort((a, b) => a.localeCompare(b, 'ru')) }
}
