import { useEffect, useMemo, useState, type JSX } from 'react'
import { GiPerson, GiCastle } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import FormatHelp from '../components/FormatHelp'
import DiceText from '../components/DiceText'
import { uid } from '../utils/monster'
import TagInput from '../components/TagInput'
import { alertDialog, confirmDialog } from '../store/dialog'
import type { CodexCategory, CodexEntry, CodexKind } from '@shared/types'

const PRESET_FIELDS: Record<string, string[]> = {
  npc: ['Раса', 'Занятие', 'Местонахождение', 'Мотив', 'Секрет'],
  location: ['Тип', 'Население', 'Правитель', 'Особенность']
}

// Built-in blocks. Their names can be overridden (renamed) but the keys are fixed.
const DEFAULT_CATEGORIES: CodexCategory[] = [
  { key: 'npc', name: 'НИП' },
  { key: 'location', name: 'Локации' }
]
const isBuiltin = (key: CodexKind): boolean => DEFAULT_CATEGORIES.some((c) => c.key === key)

function categoryIcon(key: CodexKind): JSX.Element {
  if (key === 'npc') return <GiPerson />
  if (key === 'location') return <GiCastle />
  return <span className="text-[13px] leading-none">❖</span>
}

function blank(kind: CodexKind, defaultName: string): CodexEntry {
  return {
    key: uid('codex'),
    kind,
    name: defaultName,
    subtitle: '',
    description: '',
    fields: (PRESET_FIELDS[kind] ?? []).map((label) => ({ label, value: '' })),
    tags: []
  }
}

export default function Codex(): JSX.Element {
  const [entries, setEntries] = useState<CodexEntry[]>([])
  const [cats, setCats] = useState<CodexCategory[]>(DEFAULT_CATEGORIES)
  const [kind, setKind] = useState<CodexKind>('npc')
  const [draft, setDraft] = useState<CodexEntry | null>(null)
  const [editing, setEditing] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [snapshot, setSnapshot] = useState<CodexEntry | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)
  // Инлайновый ввод названия блока (window.prompt не поддерживается в Electron).
  const [editor, setEditor] = useState<{ mode: 'add' | 'rename'; value: string } | null>(null)

  const loadEntries = (): void => {
    window.api.db.listCodex().then(setEntries)
  }
  // All tags used across the card index → autocomplete pool for new tags.
  const tagPool = useMemo(() => [...new Set(entries.flatMap((e) => e.tags ?? []))], [entries])
  const loadCats = (): void => {
    window.api.db.listCustom<CodexCategory>('codex_category').then((stored) => {
      const map = new Map<CodexKind, CodexCategory>()
      for (const c of DEFAULT_CATEGORIES) map.set(c.key, { ...c })
      const extras: CodexCategory[] = []
      for (const c of stored) {
        if (map.has(c.key)) map.set(c.key, { key: c.key, name: c.name })
        else extras.push({ key: c.key, name: c.name })
      }
      const ordered = [...DEFAULT_CATEGORIES.map((d) => map.get(d.key)!), ...extras]
      setCats(ordered)
    })
  }
  useEffect(() => {
    loadEntries()
    loadCats()
  }, [])

  const list = useMemo(() => entries.filter((e) => e.kind === kind), [entries, kind])
  const activeCat = useMemo(() => cats.find((c) => c.key === kind), [cats, kind])

  // ---- selection / mode ----
  const selectCategory = (k: CodexKind): void => {
    setKind(k)
    setDraft(null)
    setEditing(false)
    setIsNew(false)
  }
  const selectEntry = (e: CodexEntry): void => {
    setDraft(e)
    setEditing(false)
    setIsNew(false)
  }
  const createEntry = (): void => {
    setDraft(blank(kind, activeCat ? `Новый «${activeCat.name}»` : 'Новая запись'))
    setEditing(true)
    setIsNew(true)
  }
  const startEdit = (): void => {
    setSnapshot(draft)
    setEditing(true)
  }
  const cancelEdit = (): void => {
    if (isNew) setDraft(null)
    else setDraft(snapshot)
    setEditing(false)
    setIsNew(false)
  }

  const set = (patch: Partial<CodexEntry>): void => setDraft((d) => (d ? { ...d, ...patch } : d))

  const save = async (): Promise<void> => {
    if (!draft) return
    await window.api.db.saveCodex(draft)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1200)
    setEditing(false)
    setIsNew(false)
    loadEntries()
  }
  const remove = async (): Promise<void> => {
    if (!draft) return
    if (!(await confirmDialog({ title: 'Удалить', message: `Удалить «${draft.name}»?`, danger: true, confirmText: 'Удалить' }))) return
    await window.api.db.deleteCodex(draft.key)
    setDraft(null)
    setEditing(false)
    setIsNew(false)
    loadEntries()
  }

  // ---- category management ----
  const submitEditor = async (): Promise<void> => {
    if (!editor) return
    const name = editor.value.trim()
    if (!name) {
      setEditor(null)
      return
    }
    if (editor.mode === 'add') {
      const key = uid('cat')
      await window.api.db.saveCustom('codex_category', { key, name })
      setEditor(null)
      loadCats()
      selectCategory(key)
    } else {
      if (activeCat && name !== activeCat.name) {
        await window.api.db.saveCustom('codex_category', { key: activeCat.key, name })
      }
      setEditor(null)
      loadCats()
    }
  }
  const deleteCategory = async (): Promise<void> => {
    if (!activeCat || isBuiltin(activeCat.key)) return
    if (list.length > 0) {
      await alertDialog('Сначала удалите или перенесите записи этого блока.')
      return
    }
    if (!(await confirmDialog({ title: 'Удалить блок', message: `Удалить блок «${activeCat.name}»?`, danger: true, confirmText: 'Удалить' }))) return
    await window.api.db.deleteCustom(activeCat.key)
    loadCats()
    selectCategory('npc')
  }

  const inputCls =
    'w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none'

  return (
    <PageFrame
      title="Картотека"
      subtitle="НИП, враги и локации вашей кампании"
      actions={
        <button
          onClick={createEntry}
          className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80"
        >
          + Создать
        </button>
      }
    >
      <div className="mb-2 flex flex-wrap items-center gap-1">
        {cats.map((c) => (
          <button
            key={c.key}
            onClick={() => selectCategory(c.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${kind === c.key ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}
          >
            {categoryIcon(c.key)} {c.name}
          </button>
        ))}
        {/* Block management */}
        <div className="ml-1 flex items-center gap-1 border-l border-ink-brown/20 pl-2">
          {editor ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitEditor()
              }}
              className="flex items-center gap-1"
            >
              <input
                autoFocus
                value={editor.value}
                onChange={(e) => setEditor({ ...editor, value: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setEditor(null)
                }}
                placeholder={editor.mode === 'add' ? 'Название блока' : 'Новое название'}
                className="w-44 rounded-full border border-accent/50 bg-parchment/70 px-3 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                title="Сохранить"
                className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-parchment hover:bg-accent/80"
              >
                ✓
              </button>
              <button
                type="button"
                onClick={() => setEditor(null)}
                title="Отмена"
                className="rounded-full border border-ink-brown/30 px-2.5 py-1 text-xs text-ink-brown/70 hover:border-accent/60"
              >
                ✕
              </button>
            </form>
          ) : (
            <>
              <button
                onClick={() => activeCat && setEditor({ mode: 'rename', value: activeCat.name })}
                title="Переименовать текущий блок"
                className="rounded-full border border-ink-brown/30 px-2 py-1 text-xs text-ink-brown/70 hover:border-accent/60 hover:text-accent"
              >
                ✎ Переименовать
              </button>
              {activeCat && !isBuiltin(activeCat.key) && (
                <button
                  onClick={deleteCategory}
                  title="Удалить текущий блок"
                  className="rounded-full border border-ink-brown/30 px-2 py-1 text-xs text-ink-brown/70 hover:border-red-600/60 hover:text-red-700"
                >
                  🗑
                </button>
              )}
              <button
                onClick={() => setEditor({ mode: 'add', value: '' })}
                title="Добавить новый блок"
                className="rounded-full border border-accent/40 px-2 py-1 text-xs font-semibold text-accent hover:bg-accent/10"
              >
                + блок
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        <div className="flex w-60 shrink-0 flex-col overflow-hidden rounded-lg border border-ink-brown/20 bg-parchment-dark/30">
          <div className="min-h-0 flex-1 overflow-y-auto">
            {list.length === 0 ? (
              <div className="p-4 text-sm text-ink-brown/50">Пусто. Нажмите «Создать».</div>
            ) : (
              <ul className="divide-y divide-ink-brown/10">
                {list.map((e) => (
                  <li key={e.key}>
                    <button
                      onClick={() => selectEntry(e)}
                      className={`w-full px-3 py-2 text-left transition-colors ${draft?.key === e.key ? 'bg-accent/20 text-accent' : 'text-ink-brown/90 hover:bg-black/5'}`}
                    >
                      <div className="font-serif font-semibold">{e.name}</div>
                      {e.subtitle && <div className="truncate text-xs text-ink-brown/50">{e.subtitle}</div>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          {draft ? (
            editing ? (
              /* ---------- EDIT MODE ---------- */
              <div className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <input
                      value={draft.name}
                      onChange={(e) => set({ name: e.target.value })}
                      placeholder="Имя / название"
                      className={`${inputCls} font-serif text-xl font-bold text-accent`}
                    />
                    <input
                      value={draft.subtitle ?? ''}
                      onChange={(e) => set({ subtitle: e.target.value })}
                      placeholder="Подзаголовок (напр. «Человек · Трактирщик»)"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex shrink-0 flex-col gap-1">
                    <button
                      onClick={save}
                      className="rounded bg-accent px-3 py-1 text-xs font-semibold text-parchment hover:bg-accent/80"
                    >
                      {savedFlash ? '✓ Сохранено' : 'Сохранить'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded border border-ink-brown/30 px-3 py-1 text-xs text-ink-brown/80 hover:border-accent/60"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={remove}
                      className="rounded border border-accent/40 px-3 py-1 text-xs text-accent hover:bg-accent/10"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <hr className="fleuron" />

                {/* Custom fields */}
                <div className="space-y-1">
                  {draft.fields.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        value={f.label}
                        onChange={(e) =>
                          set({ fields: draft.fields.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })
                        }
                        className="w-32 shrink-0 rounded border border-ink-brown/20 bg-parchment/50 px-2 py-1 text-xs font-semibold text-accent"
                      />
                      <input
                        value={f.value}
                        onChange={(e) =>
                          set({ fields: draft.fields.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })
                        }
                        className={inputCls}
                      />
                      <button
                        onClick={() => set({ fields: draft.fields.filter((_, j) => j !== i) })}
                        className="text-accent hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => set({ fields: [...draft.fields, { label: 'Поле', value: '' }] })}
                    className="text-xs text-accent hover:underline"
                  >
                    + поле
                  </button>
                </div>

                <hr className="fleuron" />

                <div className="mb-2">
                  <FormatHelp tone="light" />
                </div>
                <label className="text-xs font-semibold text-accent">Описание</label>
                <textarea
                  value={draft.description}
                  onChange={(e) => set({ description: e.target.value })}
                  rows={8}
                  placeholder="История, внешность, заметки…"
                  className={`${inputCls} mt-1`}
                />
                {draft.description.trim() && (
                  <div className="mt-1 rounded border border-ink-brown/15 bg-parchment/50 p-2">
                    <div className="mb-1 text-[10px] uppercase tracking-wide text-ink-brown/40">Предпросмотр</div>
                    <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink-brown">
                      <DiceText text={draft.description} label={draft.name} />
                    </p>
                  </div>
                )}

                <label className="mt-2 block text-xs font-semibold text-accent">Теги</label>
                <div className="mt-1">
                  <TagInput
                    variant="parchment"
                    value={draft.tags}
                    onChange={(next) => set({ tags: next })}
                    suggestions={tagPool}
                    placeholder="Например: Таверна"
                  />
                </div>
              </div>
            ) : (
              /* ---------- VIEW MODE ---------- */
              <div className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-2xl font-bold text-accent">{draft.name}</h2>
                    {draft.subtitle && <div className="text-sm text-ink-brown/60">{draft.subtitle}</div>}
                  </div>
                  <div className="flex shrink-0 flex-col gap-1">
                    <button
                      onClick={startEdit}
                      className="rounded bg-accent px-3 py-1 text-xs font-semibold text-parchment hover:bg-accent/80"
                    >
                      ✎ Редактировать
                    </button>
                    <button
                      onClick={remove}
                      className="rounded border border-accent/40 px-3 py-1 text-xs text-accent hover:bg-accent/10"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <hr className="fleuron" />

                {draft.fields.some((f) => f.value.trim()) && (
                  <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-sm">
                    {draft.fields
                      .filter((f) => f.value.trim())
                      .map((f, i) => (
                        <div key={i} className="contents">
                          <dt className="font-semibold text-accent">{f.label}</dt>
                          <dd className="text-ink-brown">
                            <DiceText text={f.value} label={draft.name} />
                          </dd>
                        </div>
                      ))}
                  </dl>
                )}

                {draft.description.trim() && (
                  <>
                    <hr className="fleuron" />
                    <p className="whitespace-pre-line text-[14px] leading-relaxed text-ink-brown">
                      <DiceText text={draft.description} label={draft.name} />
                    </p>
                  </>
                )}

                {draft.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {draft.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink-brown/25 px-2 py-0.5 text-xs text-ink-brown/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center text-ink-brown/40">
              Выберите запись или создайте новую
            </div>
          )}
        </div>
      </div>
    </PageFrame>
  )
}
