import { useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiPerspectiveDiceSixFacesRandom, GiRollingDices } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import { useCustom } from '../hooks/useCustom'
import { generate, tableFromStrings, fillTemplate } from '../utils/toolkitRoll'
import { uid } from '../utils/monster'
import { NPC_SLOTS, NPC_GENERATOR } from '../data/toolkit/npc-tables'
import type { TableData } from '../data/toolkit/types'

/** User-added line for one generator slot. */
interface NpcLine {
  key: string
  name: string
  slot: string
  text: string
}

export default function NpcGenerator(): JSX.Element {
  const { t } = useTranslation()
  const { items: lines, save: saveLine, remove: removeLine } = useCustom<NpcLine>('npc-line')
  const [parts, setParts] = useState<Record<string, string>>({})
  const [savedFlash, setSavedFlash] = useState(false)
  const [adding, setAdding] = useState<{ slot: string; text: string } | null>(null)

  // Pool per slot = bundled rows + user-added lines. Generator reads it via tableById.
  const pools = useMemo<Record<string, string[]>>(() => {
    const map: Record<string, string[]> = {}
    for (const s of NPC_SLOTS) map[s.key] = [...s.rows, ...lines.filter((l) => l.slot === s.key).map((l) => l.text)]
    return map
  }, [lines])

  const tableById = (id: string): TableData | undefined => (pools[id] ? tableFromStrings(pools[id]) : undefined)

  const rollAll = (): void => setParts(generate(NPC_GENERATOR, tableById).parts)
  const rerollSlot = (slot: string): void => {
    const keep = { ...parts }
    delete keep[slot]
    setParts(generate(NPC_GENERATOR, tableById, keep).parts)
  }

  const hasResult = Object.keys(parts).length > 0
  const sentence = hasResult ? fillTemplate(NPC_GENERATOR.template, parts) : ''

  const saveToCodex = async (): Promise<void> => {
    if (!hasResult) return
    await window.api.db.saveCodex({
      key: uid('codex'),
      kind: 'npc',
      name: parts.archetype || t('lore.npc.unnamed'),
      subtitle: parts.trait || '',
      description: sentence,
      fields: [
        { label: t('lore.npc.slotWant'), value: parts.want || '' },
        { label: t('lore.npc.slotSecret'), value: parts.secret || '' },
        { label: t('lore.npc.slotManner'), value: parts.manner || '' }
      ],
      tags: ['generated']
    })
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 2000)
  }

  const addLine = (): void => {
    if (!adding || !adding.text.trim()) { setAdding(null); return }
    saveLine({ key: uid('npcline'), name: adding.text.trim(), slot: adding.slot, text: adding.text.trim() })
    setAdding(null)
  }

  return (
    <PageFrame
      title={t('nav.npcGen')}
      subtitle={t('lore.npc.subtitle')}
      actions={
        <button onClick={rollAll} className="inline-flex items-center gap-1 rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">
          <GiPerspectiveDiceSixFacesRandom /> {t('lore.npc.generate')}
        </button>
      }
    >
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto pr-1">
        {!hasResult && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-ink-brown/55">
            <GiRollingDices className="text-6xl text-accent/25" />
            <p>{t('lore.npc.empty')}</p>
          </div>
        )}

        {hasResult && (
          <article className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
            <p className="font-serif text-lg leading-relaxed text-ink-brown">{sentence}</p>
            <hr className="fleuron" />
            <div className="space-y-1.5">
              {NPC_SLOTS.map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <span className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-accent/70">{t(s.labelKey)}</span>
                  <span className="flex-1 text-[15px] text-ink-brown">{parts[s.key] || '—'}</span>
                  <button onClick={() => rerollSlot(s.key)} title={t('lore.npc.rerollSlot')} className="rounded border border-accent/40 px-2 py-0.5 text-xs text-accent hover:bg-accent/10">
                    <GiPerspectiveDiceSixFacesRandom />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              {savedFlash && <span className="text-xs font-semibold text-green-700">{t('lore.npc.saved')}</span>}
              <button onClick={saveToCodex} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">{t('lore.npc.saveToCodex')}</button>
            </div>
          </article>
        )}

        {/* Custom lines: let the GM extend any slot table; new lines join the rolls. */}
        <section className="rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-3">
          <h3 className="mb-2 font-serif text-sm font-semibold text-accent">{t('lore.npc.customTitle')}</h3>
          <div className="flex flex-wrap gap-1.5">
            {NPC_SLOTS.map((s) => (
              <button key={s.key} onClick={() => setAdding({ slot: s.key, text: '' })} className="rounded-full border border-ink-brown/30 px-2.5 py-1 text-xs text-ink-brown/80 hover:border-accent/60">
                + {t(s.labelKey)}
              </button>
            ))}
          </div>
          {adding && (
            <div className="mt-2 flex gap-2">
              <input
                autoFocus
                value={adding.text}
                onChange={(e) => setAdding({ ...adding, text: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') addLine(); if (e.key === 'Escape') setAdding(null) }}
                placeholder={`${t(NPC_SLOTS.find((s) => s.key === adding.slot)!.labelKey)}…`}
                className="flex-1 rounded-md border border-ink-brown/30 bg-parchment/70 px-3 py-1.5 text-sm text-ink-brown focus:border-accent focus:outline-none"
              />
              <button onClick={addLine} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">{t('common.add')}</button>
            </div>
          )}
          {lines.length > 0 && (
            <ul className="mt-2 space-y-1">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-2 text-sm text-ink-brown/85">
                  <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] uppercase text-accent">{t(NPC_SLOTS.find((s) => s.key === l.slot)?.labelKey ?? 'lore.npc.slotArchetype')}</span>
                  <span className="flex-1">{l.text}</span>
                  <button onClick={() => removeLine(l.key)} className="text-ink-brown/40 hover:text-red-500">✕</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageFrame>
  )
}
