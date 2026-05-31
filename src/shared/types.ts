// Shared types used by both the Electron main process and the renderer.

export type Edition = '5e-2014' | '5e-2024'
export type Language = 'ru' | 'en'

export interface AbilityScores {
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}

/** A named block of text (trait / action / reaction / etc.). */
export interface NamedEntry {
  id: string
  name: string
  desc: string
}

/** Normalized stat block consumed by the UI and stored for custom monsters. */
export interface StatBlock {
  key: string
  name: string
  /** short flavour: who/what it is and how it looks (RU) */
  flavor?: string
  size: string
  type: string
  subtype?: string
  alignment: string
  armorClass: number
  armorDetail?: string
  hitPoints: number
  hitDice?: string
  /** mode -> distance in feet, e.g. { walk: 30, fly: 60 } */
  speed: Record<string, number>
  abilities: AbilityScores
  /** ability key (str/dex/...) -> save bonus, only proficient saves */
  savingThrows: Record<string, number>
  /** skill slug -> bonus, only proficient skills */
  skills: Record<string, number>
  damageVulnerabilities?: string
  damageResistances?: string
  damageImmunities?: string
  conditionImmunities?: string
  senses?: string
  languages?: string
  /** numeric CR for sorting */
  challengeRating: number
  /** display CR, e.g. "1/4" */
  crDisplay: string
  proficiencyBonus?: number
  traits: NamedEntry[]
  actions: NamedEntry[]
  bonusActions: NamedEntry[]
  reactions: NamedEntry[]
  legendaryActions: NamedEntry[]
  environments: string[]
  source: 'open5e' | 'custom'
  /** optional custom portrait (URL or data URI) */
  imageUrl?: string
}

export interface ConditionDescription {
  desc: string
  gamesystem: string
}

export interface ConditionItem {
  key: string
  name: string
  descriptions: ConditionDescription[]
  /** Per-edition "how to get out of it" text, shown in its own block. */
  escape?: ConditionDescription[]
}

export interface Spell {
  key: string
  name: string
  level: number
  school: string
  desc: string
  higherLevel?: string
  rangeText?: string
  castingTime?: string
  duration?: string
  components: string
  concentration: boolean
  ritual: boolean
  classes: string[]
}

export interface SpellsResult {
  results: Spell[]
  fromCache: boolean
  cacheAge?: number
  offline: boolean
}

export interface SearchParams {
  search?: string
  crMin?: number
  crMax?: number
  edition?: Edition
  ordering?: string
  page?: number
  limit?: number
}

export interface SearchResult {
  count: number
  results: StatBlock[]
  fromCache: boolean
  cacheAge?: number // ms since cached
  offline: boolean
}

export interface ConditionsResult {
  results: ConditionItem[]
  fromCache: boolean
  cacheAge?: number
  offline: boolean
}

export interface RollLogEntry {
  id: string
  timestamp: number
  label: string
  formula: string
  result: string
  crit?: 'hit' | 'miss'
}

export type CodexKind = 'npc' | 'location'

export interface CodexField {
  label: string
  value: string
}

export interface CodexEntry {
  key: string
  kind: CodexKind
  name: string
  subtitle?: string
  description: string
  fields: CodexField[]
  tags: string[]
}

// ---- IPC bridge surface (exposed on window.api) ----
export interface DbApi {
  listMonsters: () => Promise<StatBlock[]>
  getMonster: (key: string) => Promise<StatBlock | null>
  saveMonster: (monster: StatBlock) => Promise<StatBlock>
  deleteMonster: (key: string) => Promise<void>
  getNotes: () => Promise<string>
  saveNotes: (content: string) => Promise<void>
  listCodex: () => Promise<CodexEntry[]>
  saveCodex: (entry: CodexEntry) => Promise<CodexEntry>
  deleteCodex: (key: string) => Promise<void>
  listCustom: <T = unknown>(kind: string) => Promise<T[]>
  saveCustom: (kind: string, entry: { key: string; name: string }) => Promise<void>
  deleteCustom: (key: string) => Promise<void>
}

export interface Open5eApi {
  searchCreatures: (params: SearchParams) => Promise<SearchResult>
  getCreature: (key: string) => Promise<StatBlock | null>
  getConditions: (edition: Edition) => Promise<ConditionsResult>
  searchSpells: (params: { search?: string; edition?: Edition; limit?: number }) => Promise<SpellsResult>
}

export interface BackupResult {
  ok: boolean
  path?: string
  monsters?: number
  error?: string
}

export interface BridgeApi {
  db: DbApi
  open5e: Open5eApi
  onlineStatus: () => Promise<boolean>
  exportData: () => Promise<BackupResult>
  importData: () => Promise<BackupResult>
  exportPdf: (html: string, suggestedName: string) => Promise<BackupResult>
  /** Real browser zoom of the whole window (Ctrl+= style). Scales UI and
   *  content together while keeping layout height and scrolling correct
   *  (unlike CSS `zoom`, which breaks 100vh and clips the page). */
  setZoom: (factor: number) => void
}
