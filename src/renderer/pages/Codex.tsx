import { useEffect, useMemo, useState, type JSX } from 'react'
import { GiPerson, GiCastle } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import FormatHelp from '../components/FormatHelp'
import DiceText from '../components/DiceText'
import { uid } from '../utils/monster'
import type { CodexEntry, CodexKind } from '@shared/types'

const PRESET_FIELDS: Record<CodexKind, string[]> = {
  npc: ['Раса', 'Занятие', 'Местонахождение', 'Мотив', 'Секрет'],
  location: ['Тип', 'Население', 'Правитель', 'Особенность']
}

function blank(kind: CodexKind): CodexEntry {
  return {
    key: uid('codex'),
    kind,
    name: kind === 'npc' ? 'Новый НИП' : 'Новая локация',
    subtitle: '',
    description: '',
    fields: PRESET_FIELDS[kind].map((label) => ({ label, value: '' })),
    tags: []
  }
}

export default function Codex(): JSX.Element {
  const [entries, setEntries] = useState<CodexEntry[]>([])
  const [kind, setKind] = useState<CodexKind>('npc')
  const [draft, setDraft] = useState<CodexEntry | null>(null)
  const [savedFlash, setSavedFlash] = useState(false)

  const load = (): void => {
    window.api.db.listCodex().then(setEntries)
  }
  useEffect(load, [])

  const list = useMemo(() => entries.filter((e) => e.kind === kind), [entries, kind])

  const set = (patch: Partial<CodexEntry>): void => setDraft((d) => (d ? { ...d, ...patch } : d))

  const save = async (): Promise<void> => {
    if (!draft) return
    await window.api.db.saveCodex(draft)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1200)
    load()
  }
  const remove = async (): Promise<void> => {
    if (!draft) return
    if (!window.confirm(`Удалить «${draft.name}»?`)) return
    await window.api.db.deleteCodex(draft.key)
    setDraft(null)
    load()
  }

  const inputCls = 'w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none'

  return (
    <PageFrame
      title="Картотека"
      subtitle="НИП, враги и локации вашей кампании"
      actions={
        <button onClick={() => setDraft(blank(kind))} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">
          + Создать
        </button>
      }
    >
      <div className="mb-2 flex gap-1">
        {(['npc', 'location'] as CodexKind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${kind === k ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}
          >
            {k === 'npc' ? <><GiPerson /> НИП</> : <><GiCastle /> Локации</>}
          </button>
        ))}
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
                      onClick={() => setDraft(e)}
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
            <div className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-2">
                  <input value={draft.name} onChange={(e) => set({ name: e.target.value })} placeholder="Имя / название" className={`${inputCls} font-serif text-xl font-bold text-accent`} />
                  <input value={draft.subtitle ?? ''} onChange={(e) => set({ subtitle: e.target.value })} placeholder="Подзаголовок (напр. «Человек · Трактирщик»)" className={inputCls} />
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button onClick={save} className="rounded bg-accent px-3 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">
                    {savedFlash ? '✓' : 'Сохранить'}
                  </button>
                  <button onClick={remove} className="rounded border border-accent/40 px-3 py-1 text-xs text-accent hover:bg-accent/10">
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
                      onChange={(e) => set({ fields: draft.fields.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })}
                      className="w-32 shrink-0 rounded border border-ink-brown/20 bg-parchment/50 px-2 py-1 text-xs font-semibold text-accent"
                    />
                    <input
                      value={f.value}
                      onChange={(e) => set({ fields: draft.fields.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })}
                      className={inputCls}
                    />
                    <button onClick={() => set({ fields: draft.fields.filter((_, j) => j !== i) })} className="text-accent hover:text-red-700">✕</button>
                  </div>
                ))}
                <button onClick={() => set({ fields: [...draft.fields, { label: 'Поле', value: '' }] })} className="text-xs text-accent hover:underline">
                  + поле
                </button>
              </div>

              <hr className="fleuron" />

              <div className="mb-2"><FormatHelp tone="light" /></div>
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

              <label className="mt-2 block text-xs font-semibold text-accent">Теги (через запятую)</label>
              <input
                value={draft.tags.join(', ')}
                onChange={(e) => set({ tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                className={`${inputCls} mt-1`}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-ink-brown/40">Выберите запись или создайте новую</div>
          )}
        </div>
      </div>
    </PageFrame>
  )
}
