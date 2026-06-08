import type { BodyPart, MutationCause, Severity, SettlementTierId } from './types'

// Двуязычные подписи перечислений тулкита (как armorTierLabel в equipment-ru).
const en = (lang: string): boolean => lang.startsWith('en')

const SEVERITY: Record<Severity, [ru: string, en: string]> = {
  minor: ['Лёгкое', 'Minor'],
  moderate: ['Среднее', 'Moderate'],
  severe: ['Тяжёлое', 'Severe']
}
export const SEVERITIES: Severity[] = ['minor', 'moderate', 'severe']
export const severityLabel = (s: Severity, lang: string): string => SEVERITY[s][en(lang) ? 1 : 0]
export const severityColor: Record<Severity, string> = {
  minor: '#6b8e23',
  moderate: '#c9842b',
  severe: '#a3331f'
}

const BODY_PART: Record<BodyPart, [string, string]> = {
  head: ['Голова', 'Head'],
  eyes: ['Глаза', 'Eyes'],
  hands: ['Руки', 'Hands'],
  feet: ['Ноги', 'Feet'],
  torso: ['Торс', 'Torso'],
  lungs: ['Лёгкие', 'Lungs'],
  other: ['Прочее', 'Other']
}
export const BODY_PARTS: BodyPart[] = ['head', 'eyes', 'hands', 'feet', 'torso', 'lungs', 'other']
export const bodyPartLabel = (p: BodyPart, lang: string): string => BODY_PART[p][en(lang) ? 1 : 0]

const CAUSE: Record<MutationCause, [string, string]> = {
  curse: ['Проклятие', 'Curse'],
  pact: ['Пакт', 'Pact'],
  alchemy: ['Алхимия', 'Alchemy'],
  experiment: ['Эксперимент', 'Experiment']
}
export const CAUSES: MutationCause[] = ['curse', 'pact', 'alchemy', 'experiment']
export const causeLabel = (c: MutationCause, lang: string): string => CAUSE[c][en(lang) ? 1 : 0]

const TIER: Record<SettlementTierId, [string, string]> = {
  capital: ['Столица', 'Capital'],
  city: ['Город', 'City'],
  town: ['Городок', 'Town'],
  village: ['Деревня', 'Village'],
  farm: ['Хутор', 'Farm']
}
export const settlementTierLabel = (t: SettlementTierId, lang: string): string => TIER[t][en(lang) ? 1 : 0]
