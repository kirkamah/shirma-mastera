import type { RandomTable } from './random-tables'
import { PART_LOOT_A } from './random-tables-parts/loot-a'
import { PART_LOOT_B } from './random-tables-parts/loot-b'
import { PART_REWARD_A } from './random-tables-parts/reward-a'
import { PART_REWARD_B } from './random-tables-parts/reward-b'
import { PART_NATURE } from './random-tables-parts/nature'
import { PART_SOCIAL } from './random-tables-parts/social'
import { PART_ADVENTURE_A } from './random-tables-parts/adventure-a'
import { PART_ADVENTURE_B } from './random-tables-parts/adventure-b'
import { PART_NPC } from './random-tables-parts/npc'

// Дополнительные мастерские таблицы (RU). Текст переписан в атмосферном,
// «книжном» стиле под стать остальному продукту; механика (число строк, порядок,
// номиналы монет, ценности, круги свитков, ранги предметов) сохранена дословно.
// Таблицы разбиты на part-файлы по категориям в ./random-tables-parts/.
export const EXTRA_RANDOM_TABLES: RandomTable[] = [
  ...PART_LOOT_A,
  ...PART_LOOT_B,
  ...PART_REWARD_A,
  ...PART_REWARD_B,
  ...PART_NATURE,
  ...PART_SOCIAL,
  ...PART_ADVENTURE_A,
  ...PART_ADVENTURE_B,
  ...PART_NPC
]
