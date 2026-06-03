// English overlay for the curated RU spell set, merged from translation parts.
// Keyed by the EXACT Russian spell name; `spellsFor(lang)` in spells-ru.ts uses it
// (RU fallback per spell). School and classes are localised separately via maps.
import p1 from './part1'
import p2 from './part2'
import p3 from './part3'
import p4 from './part4'
import p5 from './part5'
import p6 from './part6'
import p7 from './part7'
import p8 from './part8'
import p9 from './part9'
import p10 from './part10'

export interface SpellEn {
  name: string
  time: string
  range: string
  comp: string
  duration: string
  desc: string
  higher?: string
}

export const SPELL_EN: Record<string, SpellEn> = {
  ...p1,
  ...p2,
  ...p3,
  ...p4,
  ...p5,
  ...p6,
  ...p7,
  ...p8,
  ...p9,
  ...p10
}
