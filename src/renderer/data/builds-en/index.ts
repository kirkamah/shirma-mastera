// English overlays for the «Игрок» reference data (races/classes/feats/backgrounds),
// keyed by build id. Used for DISPLAY only via the localize* helpers in
// character-build.ts; the canonical RU arrays stay the source of truth for the
// character constructor and sheet derivation (which match by id and by name).
import races from './races'
import classes1 from './classes1'
import classes2 from './classes2'
import feats1 from './feats1'
import feats2 from './feats2'
import backgrounds from './backgrounds'

export interface RaceEn {
  name: string
  asi: string
  size: string
  langs: string
  traits: [string, string][]
  subraces?: { name: string; asi: string; traits: [string, string][] }[]
}
export interface ClassEn {
  name: string
  primary: string
  saves: string
  armor: string
  weapons: string
  tools?: string
  skills: string
  features: [string, string][]
  subclasses?: { name: string; meta?: string; features: [string, string][] }[]
}
export interface FeatEn {
  name: string
  prereq?: string
  desc: string
  bonuses: string[]
}
export interface BackgroundEn {
  name: string
  skills: string
  tools?: string
  langs?: string
  equipment: string
  abilities?: string
  feat?: string
  suggestion?: string
  lore?: string
  feature?: [string, string]
}

export const RACE_BUILD_EN: Record<string, RaceEn> = { ...races }
export const CLASS_BUILD_EN: Record<string, ClassEn> = { ...classes1, ...classes2 }
export const FEAT_BUILD_EN: Record<string, FeatEn> = { ...feats1, ...feats2 }
export const BACKGROUND_BUILD_EN: Record<string, BackgroundEn> = { ...backgrounds }
