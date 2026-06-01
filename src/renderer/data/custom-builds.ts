// Registry that merges built-in race/class/background definitions with the
// user's custom ones. Custom entries are persisted as DB custom-content of kinds
// 'race-build' / 'class-build' / 'background-build' and loaded into these
// module-level arrays at app start (and after each edit) by the customBuilds
// store. deriveSheet() and the character constructor resolve selections through
// these getters, so a custom race/class/background grants REAL bonuses exactly
// like a built-in one.
import {
  RACE_BUILDS,
  CLASS_BUILDS,
  BACKGROUND_BUILDS,
  type RaceBuild,
  type ClassBuild,
  type BackgroundBuild
} from './character-build'

export const CUSTOM_RACE_KIND = 'race-build'
export const CUSTOM_CLASS_KIND = 'class-build'
export const CUSTOM_BACKGROUND_KIND = 'background-build'

/** Label shown on the source chip for user-made content. */
export const CUSTOM_SOURCE = 'Своё'

let customRaces: RaceBuild[] = []
let customClasses: ClassBuild[] = []
let customBackgrounds: BackgroundBuild[] = []

/** Replace the in-memory custom arrays (called by the store after loading). */
export function setCustomBuilds(r: RaceBuild[], c: ClassBuild[], b: BackgroundBuild[]): void {
  customRaces = r
  customClasses = c
  customBackgrounds = b
}

export function allRaces(): RaceBuild[] {
  return [...RACE_BUILDS, ...customRaces]
}
export function allClasses(): ClassBuild[] {
  return [...CLASS_BUILDS, ...customClasses]
}
export function allBackgrounds(): BackgroundBuild[] {
  return [...BACKGROUND_BUILDS, ...customBackgrounds]
}

export function findRace(id: string | undefined): RaceBuild | undefined {
  return id ? allRaces().find((r) => r.id === id) : undefined
}
export function findClass(id: string | undefined): ClassBuild | undefined {
  return id ? allClasses().find((c) => c.id === id) : undefined
}
export function findBackground(id: string | undefined): BackgroundBuild | undefined {
  return id ? allBackgrounds().find((b) => b.id === id) : undefined
}

/** True for ids generated for user content (so the UI can offer edit/delete). */
export function isCustomBuildId(id: string | undefined): boolean {
  return !!id && id.startsWith('cb_')
}

export function newCustomBuildId(): string {
  return `cb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}
