// PH24 starting equipment per class: option A (a kit of items) OR option B (gold
// to buy your own). Keyed by ClassBuild id. Used by the constructor's inventory
// step. Item lists are concise Russian summaries of the PH24 packages.
export interface StartEquipment {
  items: string
  gold: number
}

export const CLASS_START_EQUIPMENT: Record<string, StartEquipment> = {
  'barbarian-ph24': { items: 'Секира, 4 ручных топора, набор путешественника, 15 зм', gold: 75 },
  'bard-ph24': { items: 'Кожаный доспех, 2 кинжала, музыкальный инструмент, набор артиста, 19 зм', gold: 90 },
  'cleric-ph24': { items: 'Кольчужная рубаха, щит, булава, священный символ, набор священника, 7 зм', gold: 110 },
  'druid-ph24': { items: 'Кожаный доспех, щит, серп, друидическая фокусировка, набор травника, набор путешественника, 9 зм', gold: 50 },
  'fighter-ph24': { items: 'Кольчуга, щит, воинское оружие, 8 метательных копий, набор исследователя подземелий, 4 зм', gold: 155 },
  'monk-ph24': { items: 'Копьё, 5 кинжалов, набор инструментов ремесленника, набор путешественника, 11 зм', gold: 50 },
  'paladin-ph24': { items: 'Кольчуга, щит, воинское оружие, 6 метательных копий, священный символ, набор священника, 9 зм', gold: 150 },
  'ranger-ph24': { items: 'Проклёпанный кожаный доспех, скимитар, короткий меч, длинный лук и 20 стрел, набор путешественника, 7 зм', gold: 150 },
  'rogue-ph24': { items: 'Кожаный доспех, 2 кинжала, короткий меч, короткий лук и 20 стрел, воровские инструменты, набор взломщика, 8 зм', gold: 100 },
  'sorcerer-ph24': { items: 'Копьё, 2 кинжала, магическая фокусировка (кристалл), набор исследователя подземелий, 28 зм', gold: 50 },
  'warlock-ph24': { items: 'Кожаный доспех, серп, 2 кинжала, магическая фокусировка, набор учёного, 15 зм', gold: 100 },
  'wizard-ph24': { items: '2 кинжала, магическая фокусировка (боевой посох), книга заклинаний, набор учёного, 5 зм', gold: 55 }
}

/** Convert an equipment cost string ("10 зм", "5 см", "7 мм") to a gold value. */
export function costToGp(cost: string): number {
  const m = cost.match(/([\d.,]+)\s*(зм|см|мм|пм|ом)/i)
  if (!m) return 0
  const n = parseFloat(m[1].replace(',', '.'))
  switch (m[2].toLowerCase()) {
    case 'зм':
      return n
    case 'см':
      return n / 10
    case 'мм':
    case 'ом':
      return n / 100
    case 'пм':
      return n * 10
    default:
      return 0
  }
}

/** Convert a cost string to copper pieces (1 зм = 100 мм, 1 см = 10 мм) so coins
 *  can be spent without ever producing a fractional gold balance. */
export function costToCp(cost: string): number {
  return Math.round(costToGp(cost) * 100)
}
