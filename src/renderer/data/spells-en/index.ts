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
// Full-text desc/higher overlay regenerated 2026-06-07 from the rewritten RU
// descriptions (next.dnd.su 2024). Overrides the older, shorter part* descs.
import d1 from './descs1'
import d2 from './descs2'
import d3 from './descs3'
import d4 from './descs4'
import d5 from './descs5'
import d6 from './descs6'
import d7 from './descs7'
import d8 from './descs8'
import d11 from './descs11'
import d12 from './descs12'
import d13 from './descs13'
import d14 from './descs14'
import d15 from './descs15'
import d16 from './descs16'
import d17 from './descs17'
import d18 from './descs18'
import d19 from './descs19'

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

const DESC_EN: Record<string, { desc: string; higher?: string }> = {
  ...d1, ...d2, ...d3, ...d4, ...d5, ...d6, ...d7, ...d8,
  ...d11, ...d12, ...d13, ...d14, ...d15, ...d16, ...d17, ...d18, ...d19
}
for (const [name, o] of Object.entries(DESC_EN)) {
  const e = SPELL_EN[name]
  if (!e) continue
  e.desc = o.desc
  if (o.higher) e.higher = o.higher
  else delete e.higher
}
