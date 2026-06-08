// «Мастерский тулкит» — единый конверт для любого контента раздела «Лор и мир».
// Один общий конверт + типизированная начинка в `data`, дискриминируемая полем `type`.
// Хранение переиспользует существующую таблицу custom_content (kind = type) через
// useCustom/useToolkit — отдельных таблиц на каждый тип НЕТ. Официальный контент —
// бандл-файлы data/toolkit/*, только чтение; пользовательский — те же конверты в БД.
//
// Адаптация к проекту: вместо ContentBase.id/title используем key/name (контракт
// useCustom). Поля visibility/ownerId/«поделиться» из исходного ТЗ опущены — приложение
// офлайн-однопользовательское, шаринга нет; их легко добавить позже, не ломая схему.

export type ContentType =
  | 'curse'
  | 'mutation'
  | 'archetype'
  | 'table'
  | 'generator'
  | 'room'
  | 'settlementRules'

/** Универсальный конверт. `D` уточняется по полю `type` (см. *Data ниже). */
export interface ContentBase<D = unknown> {
  /** Уникальный ключ; одновременно служит id контента. */
  key: string
  type: ContentType
  /** Заголовок карточки (в БД пишется в колонку name). */
  name: string
  source: 'official' | 'user'
  /** Ключ оригинала, если пользователь форкнул официальную карточку. */
  forkedFrom?: string
  /** Теги-фильтры: 'horror', 'social', 'lv1-4'… */
  tags: string[]
  data: D
}

/** Связь «пользователь ↔ контент» — отдельно от самого контента (kind='toolkit_state'). */
export interface UserContentState {
  /** key конверта, к которому относится отметка. */
  contentId: string
  favorite: boolean
  lastUsedAt?: number
  notes?: string
}

// ---- Абстракция «таблица + генератор» (переиспользуется в F1 «Собрать» и F3/F5) ----

export interface TableRow {
  id: string
  /** Вес для взвешенного броска (по умолчанию 1). */
  weight: number
  /** Текст строки; может содержать {ссылки} на слоты генератора. */
  text: string
}

/** data при type === 'table'. */
export interface TableData {
  rows: TableRow[]
  /** 'd20' — только для красивого отображения. */
  dice?: string
}

export interface GeneratorSlot {
  key: string
  tableId: string
  optional?: boolean
}

/** data при type === 'generator'. */
export interface GeneratorData {
  slots: GeneratorSlot[]
  /** Шаблон: "Перед вами {archetype}. {trait}. Секрет: {secret}." */
  template: string
}

// ---- F1 Проклятия ----

export type Severity = 'minor' | 'moderate' | 'severe'
export type Ability = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA'

/** data при type === 'curse'. */
export interface CurseData {
  flavor: string
  effects: string
  lifting: string
  severity: Severity
  save?: { ability: Ability; dc: number; period?: string } | null
}

// ---- F2 Мутации ----

export type BodyPart = 'head' | 'eyes' | 'hands' | 'feet' | 'torso' | 'lungs' | 'other'
export type MutationCause = 'curse' | 'pact' | 'alchemy' | 'experiment'

/** data при type === 'mutation'. */
export interface MutationData {
  bodyPart: BodyPart
  flavor: string
  benefits: string[]
  drawbacks: string[]
  scaling?: { level: number; effect: string }[]
  tier: 1 | 2 | 3
  cause?: MutationCause
}

// ---- F4 Комнаты подземелья ----

/** data при type === 'room'. */
export interface RoomData {
  kind: string // 'trap' | 'guardpost' | 'altar' | 'cache' | 'gallery' | 'sunken' | …
  flavor: string
  mechanics?: string
  hooks?: string[]
  imageUrl?: string
}

// ---- F5 Логика мира ----

export type SettlementTierId = 'capital' | 'city' | 'town' | 'village' | 'farm'

export interface SettlementTier {
  tier: SettlementTierId
  perKingdom: [number, number]
  population: [number, number]
  traits: string[]
}

export interface StarterPreset {
  startAt: 'village' | 'town' | 'city'
  around: string[]
}

/** data при type === 'settlementRules' (одна запись-конфиг). */
export interface SettlementRulesData {
  tiers: SettlementTier[]
  starters: StarterPreset[]
}

// Удобные алиасы конвертов по типу.
export type Curse = ContentBase<CurseData>
export type Mutation = ContentBase<MutationData>
export type Room = ContentBase<RoomData>
export type Generator = ContentBase<GeneratorData>
export type RollTable = ContentBase<TableData>
export type SettlementRules = ContentBase<SettlementRulesData>
