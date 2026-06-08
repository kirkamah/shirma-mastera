// Общий движок броска для «Мастерского тулкита». Пишется один раз, используется
// режимом «Собрать» в F1 (проклятия), генератором NPC (F3) и генератором региона (F5).
import type { GeneratorData, TableData, TableRow } from '../data/toolkit/types'

const weightOf = (r: TableRow): number => (r.weight > 0 ? r.weight : 1)

/** Взвешенный выбор строки из таблицы. null — если таблица пуста. */
export function rollRow(table: TableData): TableRow | null {
  const rows = table.rows
  if (!rows.length) return null
  const total = rows.reduce((s, r) => s + weightOf(r), 0)
  let n = Math.random() * total
  for (const r of rows) {
    n -= weightOf(r)
    if (n < 0) return r
  }
  return rows[rows.length - 1]
}

/** Текст одной случайной строки таблицы. */
export function roll(table: TableData): string {
  return rollRow(table)?.text ?? ''
}

export interface GenerateResult {
  /** Готовый текст по шаблону. */
  text: string
  /** Значение, выпавшее в каждом слоте (для «перекатить один слот»). */
  parts: Record<string, string>
}

/**
 * Прогоняет каждый слот генератора через его таблицу и подставляет результаты в
 * `template` по ключу слота. `tableById` отдаёт таблицу по её ключу (официальную
 * или пользовательскую — генератор не различает, поэтому моддинг бесплатный).
 *
 * `keep` позволяет зафиксировать уже выпавшие слоты и перекатить лишь остальные.
 */
export function generate(
  gen: GeneratorData,
  tableById: (id: string) => TableData | undefined,
  keep: Record<string, string> = {}
): GenerateResult {
  const parts: Record<string, string> = { ...keep }
  for (const slot of gen.slots) {
    if (parts[slot.key] !== undefined) continue
    const tbl = tableById(slot.tableId)
    const val = tbl ? roll(tbl) : ''
    if (!val && slot.optional) continue
    parts[slot.key] = val
  }
  const text = fillTemplate(gen.template, parts)
  return { text, parts }
}

/** Подставляет {ключ} → значение; неизвестные плейсхолдеры схлопываются в пустую строку. */
export function fillTemplate(template: string, parts: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => parts[k] ?? '')
}

/** Целое в диапазоне [min, max] включительно. Для population/perKingdom и т. п. */
export function randInt(min: number, max: number): number {
  if (max < min) [min, max] = [max, min]
  return min + Math.floor(Math.random() * (max - min + 1))
}

/** Случайный элемент массива (undefined для пустого). */
export function pick<T>(arr: readonly T[]): T | undefined {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined
}

/** Оборачивает массив строк в TableData (вес 1) — мостик от простых сидов к движку. */
export function tableFromStrings(items: readonly string[]): TableData {
  return { rows: items.map((text, i) => ({ id: String(i), weight: 1, text })) }
}
