// English overlay for the curated RU bestiary, merged from translation parts.
// Keyed by the EXACT Russian monster name. `monstersFor(lang)` in bestiary-ru.ts
// overlays the free-text fields (RU fallback per monster). Size/type/alignment,
// skills and environments are localised separately at display via maps.
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
import p11 from './part11'
import p12 from './part12'
import p13 from './part13'
import p14 from './part14'
import p15 from './part15'
import flavor1 from './flavor1'
import flavor2 from './flavor2'
import flavor3 from './flavor3'
import newA from './newA'
import newB from './newB'
import newC from './newC'

/** English flavor blurbs keyed by RU monster name (overlay for MONSTER_FLAVOR). */
export const MONSTER_FLAVOR_EN: Record<string, string> = { ...flavor1, ...flavor2, ...flavor3 }

export interface MonsterEn {
  name: string
  flavor?: string
  senses?: string
  langs?: string
  resist?: string
  immune?: string
  condImmune?: string
  traits?: [string, string][]
  actions?: [string, string][]
  bonus?: [string, string][]
  reactions?: [string, string][]
  legendary?: [string, string][]
}

export const MONSTER_EN: Record<string, MonsterEn> = {
  ...p1,
  ...p2,
  ...p3,
  ...p4,
  ...p5,
  ...p6,
  ...p7,
  ...p8,
  ...p9,
  ...p10,
  ...p11,
  ...p12,
  ...p13,
  ...p14,
  ...p15,
  ...newA,
  ...newB,
  ...newC
}
