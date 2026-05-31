import { useEffect, useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiScrollUnfurled } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import DiceText from '../components/DiceText'
import { useNav } from '../store/nav'
import { FALLBACK_CONDITIONS } from '../data/conditions-fallback'
import type { ConditionItem } from '@shared/types'

export default function Conditions(): JSX.Element {
  const { t } = useTranslation()
  const [items] = useState<ConditionItem[]>(FALLBACK_CONDITIONS)
  const [selectedKey, setSelectedKey] = useState<string>(FALLBACK_CONDITIONS[0]?.key ?? '')

  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)

  // Try to enrich from the API cache in the background (kept optional/offline-safe).
  useEffect(() => {
    window.api.open5e.getConditions('5e-2024').catch(() => {})
  }, [])

  // Selection from global search.
  useEffect(() => {
    if (pending?.section === 'conditions') {
      setSelectedKey(pending.key)
      clearPending()
    }
  }, [pending, clearPending])

  const selected = useMemo(() => items.find((c) => c.key === selectedKey) ?? items[0], [items, selectedKey])

  const descFor = (c: ConditionItem | undefined): string => {
    if (!c) return ''
    const exact = c.descriptions.find((d) => d.gamesystem === '5e-2024')
    return (exact ?? c.descriptions[0])?.desc ?? ''
  }
  const escapeFor = (c: ConditionItem | undefined): string => {
    if (!c?.escape) return ''
    const exact = c.escape.find((d) => d.gamesystem === '5e-2024')
    return (exact ?? c.escape[0])?.desc ?? ''
  }

  return (
    <PageFrame title={t('conditions.title')} subtitle="Редакция 2024">
      <div className="flex min-h-0 flex-1 gap-3">
        <div className="w-60 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30">
          <ul className="divide-y divide-ink-brown/10">
            {items.map((c) => (
              <li key={c.key}>
                <button
                  onClick={() => setSelectedKey(c.key)}
                  className={`flex w-full items-center justify-between gap-1 px-3 py-2 text-left font-serif transition-colors ${
                    selected?.key === c.key ? 'bg-accent/20 text-accent' : 'text-ink-brown/90 hover:bg-black/5'
                  }`}
                >
                  <span>{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          {selected && (
            <>
              <h2 className="font-serif text-4xl font-bold text-accent">{selected.name}</h2>
              <hr className="fleuron" />
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
                <DiceText text={descFor(selected) || t('conditions.noDiff')} label={selected.name} />
              </p>

              {escapeFor(selected) && (
                <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
                  <h3 className="mb-1.5 flex items-center gap-2 font-serif text-lg font-bold text-accent">
                    <GiScrollUnfurled className="shrink-0" /> Как выйти из состояния
                  </h3>
                  <p className="whitespace-pre-line text-[16px] leading-relaxed text-ink-brown">
                    <DiceText text={escapeFor(selected)} label={selected.name} />
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageFrame>
  )
}
