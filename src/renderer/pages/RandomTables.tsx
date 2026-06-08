import { useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiRollingDices } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import Modal from '../components/Modal'
import { useCustom, type CustomBase } from '../hooks/useCustom'
import { useDiceRoller } from '../hooks/useDiceRoller'
import { confirmDialog } from '../store/dialog'
import {
  BUILTIN_RANDOM_TABLES,
  entryForRoll,
  type RandomTable,
  type RandomTableEntry
} from '../data/random-tables'

interface CustomTable extends CustomBase {
  die: number
  category: string
  desc?: string
  entries: RandomTableEntry[]
}

const uid = (): string => `rt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`

// «1-5: текст» / «7: текст» / «1–5 | текст» → строки таблицы.
function parseEntries(text: string): RandomTableEntry[] {
  const out: RandomTableEntry[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const m = line.match(/^(\d+)\s*(?:[-–—]\s*(\d+))?\s*[:|).]\s*(.+)$/)
    if (!m) continue
    const a = parseInt(m[1], 10)
    const b = m[2] ? parseInt(m[2], 10) : a
    out.push({ min: Math.min(a, b), max: Math.max(a, b), result: m[3].trim() })
  }
  return out
}

function entriesToText(entries: RandomTableEntry[]): string {
  return entries
    .map((e) => (e.min === e.max ? `${e.min}` : `${e.min}-${e.max}`) + `: ${e.result}`)
    .join('\n')
}

function customToTable(c: CustomTable): RandomTable {
  return { id: c.key, name: c.name, category: c.category || 'Свои', die: c.die, desc: c.desc, entries: c.entries }
}

interface EditorState {
  key: string | null // null = новая
  name: string
  die: number
  desc: string
  entriesText: string
}

export default function RandomTables(): JSX.Element {
  const { t } = useTranslation()
  const { items, save, remove } = useCustom<CustomTable>('random-tables')
  const { rollFormula } = useDiceRoller()

  const tables = useMemo<RandomTable[]>(
    () => [...BUILTIN_RANDOM_TABLES, ...items.map(customToTable)],
    [items]
  )
  const customKeys = useMemo(() => new Set(items.map((i) => i.key)), [items])

  const [selectedId, setSelectedId] = useState<string>(BUILTIN_RANDOM_TABLES[0]?.id ?? '')
  const [rolled, setRolled] = useState<{ id: string; roll: number } | null>(null)
  const [editor, setEditor] = useState<EditorState | null>(null)

  const selected = tables.find((t) => t.id === selectedId) ?? tables[0]
  const rolledEntry = selected && rolled && rolled.id === selected.id ? entryForRoll(selected, rolled.roll) : null

  // After a roll, bring the matching row into view so the result is never
  // missed when the table is long enough to scroll.
  const hitRowRef = useRef<HTMLTableRowElement>(null)
  useEffect(() => {
    if (rolled) hitRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [rolled])

  // Группировка списка по категориям (порядок появления).
  const groups = useMemo(() => {
    const map = new Map<string, RandomTable[]>()
    for (const t of tables) {
      if (!map.has(t.category)) map.set(t.category, [])
      map.get(t.category)!.push(t)
    }
    return [...map.entries()]
  }, [tables])

  const doRoll = (table: RandomTable): void => {
    const outcome = rollFormula({ count: 1, sides: table.die, modifier: 0 }, table.name)
    setRolled({ id: table.id, roll: outcome.total })
  }

  const openNew = (): void =>
    setEditor({ key: null, name: '', die: 20, desc: '', entriesText: '1-5: \n6-10: ' })

  const openEdit = (c: CustomTable): void =>
    setEditor({ key: c.key, name: c.name, die: c.die, desc: c.desc ?? '', entriesText: entriesToText(c.entries) })

  const saveEditor = async (): Promise<void> => {
    if (!editor) return
    const entries = parseEntries(editor.entriesText)
    const entry: CustomTable = {
      key: editor.key ?? uid(),
      name: editor.name.trim() || 'Без названия',
      die: editor.die,
      category: 'Свои',
      desc: editor.desc.trim() || undefined,
      entries
    }
    await save(entry)
    setSelectedId(entry.key)
    setEditor(null)
  }

  const deleteCustom = async (c: CustomTable): Promise<void> => {
    if (!(await confirmDialog({ title: t('tables.deleteTitle'), message: t('tables.deleteConfirm', { name: c.name }), danger: true }))) return
    await remove(c.key)
    if (selectedId === c.key) setSelectedId(BUILTIN_RANDOM_TABLES[0]?.id ?? '')
  }

  return (
    <PageFrame
      title={t('tables.title')}
      subtitle={t('tables.subtitle')}
      actions={
        <button
          onClick={openNew}
          className="rounded-md border border-gold/60 bg-gold/15 px-3 py-1.5 font-serif text-sm font-bold text-accent transition-colors hover:bg-gold/25"
        >
          {t('tables.newTable')}
        </button>
      }
    >
      <div className="flex min-h-0 flex-1 gap-3">
        {/* Список таблиц по категориям */}
        <div className="w-56 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30 py-1">
          {groups.map(([cat, list]) => (
            <div key={cat} className="mb-1">
              <div className="px-2 py-1 font-serif text-[11px] font-bold uppercase tracking-wider text-ink-brown/55">
                {cat}
              </div>
              {list.map((tbl) => (
                <button
                  key={tbl.id}
                  onClick={() => setSelectedId(tbl.id)}
                  className={`flex w-full items-center gap-2 px-2 py-1.5 text-left font-serif transition-colors ${
                    selected?.id === tbl.id
                      ? 'rounded bg-accent/20 font-semibold text-accent'
                      : 'text-ink-brown/90 hover:bg-black/5'
                  }`}
                >
                  <GiRollingDices className="shrink-0 text-lg text-ink-brown/60" />
                  <span className="min-w-0 truncate">{tbl.name}</span>
                  <span className="ml-auto shrink-0 text-[10px] font-bold text-ink-brown/45">к{tbl.die}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Детали таблицы */}
        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          {selected && (
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 border-b-2 border-accent/20 pb-3">
                <h2 className="font-serif text-2xl font-bold text-accent">{selected.name}</h2>
                {selected.source && (
                  <span className="rounded-full border border-gold/50 px-2 py-0.5 text-[11px] font-semibold text-gold">
                    {selected.source}
                  </span>
                )}
                <button
                  onClick={() => doRoll(selected)}
                  className="ml-auto inline-flex items-center gap-2 rounded-md border-2 border-gold/60 bg-gold/20 px-4 py-1.5 font-serif text-base font-bold text-accent shadow-sm transition-colors hover:bg-gold/30"
                >
                  <GiRollingDices className="text-xl" /> {t('tables.roll', { die: selected.die })}
                </button>
                {customKeys.has(selected.id) && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(items.find((i) => i.key === selected.id)!)}
                      className="rounded border border-ink-brown/30 px-2 py-1 text-xs text-ink-brown/80 hover:border-accent hover:text-accent"
                    >
                      {t('common.edit')}
                    </button>
                    <button
                      onClick={() => deleteCustom(items.find((i) => i.key === selected.id)!)}
                      className="rounded border border-red-700/40 px-2 py-1 text-xs text-red-800 hover:bg-red-700/10"
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                )}
              </div>

              {selected.desc && <p className="mb-3 text-sm italic text-ink-brown/75">{selected.desc}</p>}

              {rolled && rolled.id === selected.id && (
                <div className="mb-3 rounded-lg border-2 border-accent/40 bg-accent/10 px-4 py-2">
                  <span className="font-serif text-lg font-bold text-accent">{t('tables.rolled', { n: rolled.roll })}</span>{' '}
                  <span className="text-ink-brown">{rolledEntry?.result ?? t('tables.outOfRange')}</span>
                </div>
              )}

              <table className="w-full border-collapse text-sm">
                <tbody>
                  {selected.entries.map((e, i) => {
                    const hit = rolled?.id === selected.id && rolled.roll >= e.min && rolled.roll <= e.max
                    return (
                      <tr
                        key={i}
                        ref={hit ? hitRowRef : undefined}
                        className={`border-b border-ink-brown/10 ${hit ? 'bg-accent/15' : i % 2 ? 'bg-black/[0.02]' : ''}`}
                      >
                        <td className="w-16 whitespace-nowrap py-1.5 pr-3 align-top font-mono font-bold text-accent">
                          {e.min === e.max ? e.min : `${e.min}–${e.max}`}
                        </td>
                        <td className="py-1.5 align-top text-ink-brown">{e.result}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {editor && (
        <Modal onClose={() => setEditor(null)} max="max-w-2xl">
          <div className="parchment-texture tome-border rounded-lg p-5">
            <h2 className="mb-3 font-serif text-2xl font-bold text-accent">
              {editor.key ? t('tables.editorEdit') : t('tables.editorNew')}
            </h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <label className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-brown/60">{t('tables.fName')}</span>
                  <input
                    value={editor.name}
                    onChange={(e) => setEditor({ ...editor, name: e.target.value })}
                    className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-ink-brown focus:border-accent focus:outline-none"
                    placeholder={t('tables.fNamePh')}
                  />
                </label>
                <label>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-brown/60">{t('tables.fDie')}</span>
                  <select
                    value={editor.die}
                    onChange={(e) => setEditor({ ...editor, die: Number(e.target.value) })}
                    className="mt-1 block rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-ink-brown focus:border-accent focus:outline-none"
                  >
                    <option value={20}>к20</option>
                    <option value={100}>к100</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-brown/60">{t('tables.fDesc')}</span>
                <input
                  value={editor.desc}
                  onChange={(e) => setEditor({ ...editor, desc: e.target.value })}
                  className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-ink-brown focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-brown/60">{t('tables.fEntries')}</span>
                <textarea
                  value={editor.entriesText}
                  onChange={(e) => setEditor({ ...editor, entriesText: e.target.value })}
                  rows={10}
                  className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 font-mono text-sm text-ink-brown focus:border-accent focus:outline-none"
                  placeholder={t('tables.entriesPh')}
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditor(null)}
                className="rounded border border-ink-brown/30 px-3 py-1.5 text-sm text-ink-brown/80 hover:bg-black/5"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={saveEditor}
                className="rounded border-2 border-gold/60 bg-gold/20 px-4 py-1.5 font-serif text-sm font-bold text-accent hover:bg-gold/30"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </PageFrame>
  )
}
