/** D&D class archetypes that appear as humanoid NPC enemies in the bestiary —
 *  e.g. "Жрец домена Света (7 ур.)", "Плут-убийца (13 ур.)". Drives the
 *  «Классы врагов» filter in the bestiary SearchPanel. Order = display order.
 *  Each archetype has subclass variants at character levels 3 / 7 / 13 / 18. */
export const ENEMY_CLASSES = [
  'Воин',
  'Варвар',
  'Монах',
  'Паладин',
  'Следопыт',
  'Плут',
  'Бард',
  'Жрец',
  'Друид',
  'Волшебник',
  'Чародей',
  'Колдун',
  'Артефактор'
] as const

export type EnemyClass = (typeof ENEMY_CLASSES)[number]

// A class enemy always carries a "(N ур.)" character-level suffix in its name.
const LEVEL_SUFFIX = /\(\s*\d+\s*ур\.\s*\)/

/** The D&D class of a bestiary creature, derived from its name, or null if the
 *  creature isn't a class-based NPC. The class word is the start of the name,
 *  followed by a space (subclass like "Жрец домена …") or a hyphen
 *  ("Плут-вор"); em-dash variants ("Воин — мастер …") start with a space too. */
export function enemyClassOf(name: string): EnemyClass | null {
  if (!LEVEL_SUFFIX.test(name)) return null
  for (const c of ENEMY_CLASSES) {
    if (name === c || name.startsWith(`${c} `) || name.startsWith(`${c}-`)) return c
  }
  return null
}
