import type { IconType } from 'react-icons'
import {
  GiFireball,
  GiPortal,
  GiCrystalBall,
  GiHearts,
  GiDominoMask,
  GiDeathSkull,
  GiMagicShield,
  GiMagicSwirl,
  GiSpellBook
} from 'react-icons/gi'
import { translateSchool } from '@shared/translations'

export interface SchoolVisual {
  Icon: IconType
  /** Hex colour chosen to read on parchment. */
  color: string
}

// Keyed by the Russian school name (the form stored on every spell). Each school
// gets a thematic game-icons.net glyph and an accent colour.
const VISUALS: Record<string, SchoolVisual> = {
  Воплощение: { Icon: GiFireball, color: '#b45309' }, // evocation — raw energy
  Вызов: { Icon: GiPortal, color: '#7e22ce' }, // conjuration — summoning
  Прорицание: { Icon: GiCrystalBall, color: '#1d4ed8' }, // divination — sight
  Очарование: { Icon: GiHearts, color: '#be185d' }, // enchantment — mind
  Иллюзия: { Icon: GiDominoMask, color: '#4338ca' }, // illusion — deception
  Некромантия: { Icon: GiDeathSkull, color: '#15803d' }, // necromancy — death
  Ограждение: { Icon: GiMagicShield, color: '#0369a1' }, // abjuration — protection
  Преобразование: { Icon: GiMagicSwirl, color: '#9a6b1e' } // transmutation — change
}

const FALLBACK: SchoolVisual = { Icon: GiSpellBook, color: '#9a6b1e' }

/** Visual (icon + colour) for a spell school. Accepts Russian or English names. */
export function schoolVisual(school: string): SchoolVisual {
  return VISUALS[school] ?? VISUALS[translateSchool(school)] ?? FALLBACK
}
