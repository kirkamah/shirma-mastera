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

// Category key. Built-in keys are 'npc' | 'location'; custom blocks use a generated uid.
export type CodexKind = string

export interface CodexCategory {
  key: CodexKind
  name: string
}

export interface CodexField {
  label: string
  value: string
  /** Hidden on the player-facing PNG card (e.g. мотив, секрет). */
  hidden?: boolean
}

/** Aspect ratio for an image attached to a codex entry. */
export type CodexImageAspect = 'wide' | 'square' | 'tall'

export interface CodexImage {
  /** data: URI (downscaled on import). */
  src: string
  aspect: CodexImageAspect
  /** Optional caption shown under the image. */
  caption?: string
}

export interface CodexEntry {
  key: string
  kind: CodexKind
  name: string
  subtitle?: string
  description: string
  fields: CodexField[]
  tags: string[]
  /** Portrait shown on the player card (data: URI). */
  portrait?: string
  /** Aspect ratio of the portrait on the player card. */
  portraitAspect?: CodexImageAspect
  /** Reference images attached to the entry, with a chosen aspect ratio. */
  images?: CodexImage[]
  /** Hide these blocks on the player-facing card. */
  hideName?: boolean
  hideSubtitle?: boolean
  hideDescription?: boolean
}

// ---- IPC bridge surface (exposed on window.api) ----
export interface DbApi {
  listMonsters: () => Promise<StatBlock[]>
  getMonster: (key: string) => Promise<StatBlock | null>
  saveMonster: (monster: StatBlock) => Promise<StatBlock>
  deleteMonster: (key: string) => Promise<void>
  getNotes: () => Promise<string>
  saveNotes: (content: string) => Promise<void>
  /** Generic persisted key/value store (folder tree, misc UI state). */
  getKv: (key: string) => Promise<string>
  setKv: (key: string, value: string) => Promise<void>
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

// ---- Spellcheck context menu (themed, drawn in the renderer) ----
export type SpellEditAction = 'cut' | 'copy' | 'paste' | 'selectAll'

export interface SpellContextPayload {
  /** Cursor position in CSS pixels relative to the page. */
  x: number
  y: number
  /** Non-empty when the right-clicked word is flagged as misspelled. */
  misspelledWord: string
  /** Spelling suggestions for the misspelled word. */
  suggestions: string[]
  isEditable: boolean
  selectionText: string
  canCut: boolean
  canCopy: boolean
  canPaste: boolean
}

export interface SpellApi {
  /** Subscribe to native context-menu events forwarded from the main process.
   *  Returns an unsubscribe function. */
  onContext: (cb: (payload: SpellContextPayload) => void) => () => void
  /** Replace the right-clicked misspelled word with a suggestion. */
  replace: (word: string) => void
  /** Add a word to the persistent custom dictionary (stops underlining it). */
  addWord: (word: string) => void
  /** Standard clipboard / selection actions on the focused field. */
  edit: (action: SpellEditAction) => void
}

export interface BridgeApi {
  db: DbApi
  open5e: Open5eApi
  spell: SpellApi
  onlineStatus: () => Promise<boolean>
  exportData: () => Promise<BackupResult>
  importData: () => Promise<BackupResult>
  exportPdf: (html: string, suggestedName: string) => Promise<BackupResult>
  /** Render card HTML at a fixed width to a PNG file (save dialog). */
  savePng: (html: string, width: number, suggestedName: string) => Promise<BackupResult>
  /** PNG data URI of the image on the OS clipboard, or null if there's none. */
  readClipboardImage: () => Promise<string | null>
  /** Real browser zoom of the whole window (Ctrl+= style). Scales UI and
   *  content together while keeping layout height and scrolling correct
   *  (unlike CSS `zoom`, which breaks 100vh and clips the page). */
  setZoom: (factor: number) => void
  /** Current zoom factor. Needed to convert native context-menu coordinates
   *  (reported in physical px) into CSS px for positioning overlays. */
  getZoom: () => number
}
