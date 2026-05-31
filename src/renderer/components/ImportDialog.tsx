import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreatureSearch } from '../hooks/useOpenFive'
import { useSettings } from '../store/settings'
import { uid } from '../utils/monster'
import type { StatBlock as SB } from '@shared/types'

interface Props {
  onClose: () => void
  onImported: () => void
}

export default function ImportDialog({ onClose, onImported }: Props): JSX.Element {
  const { t } = useTranslation()
  const edition = useSettings((s) => s.edition)
  const [query, setQuery] = useState('')
  const { data, loading } = useCreatureSearch({ search: query || undefined, edition, limit: 40 })

  const copy = async (m: SB): Promise<void> => {
    await window.api.db.saveMonster({ ...m, key: uid('custom'), source: 'custom' })
    onImported()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={onClose}>
      <div
        className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-lg border border-accent/40 bg-sidebar shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-3">
          <h2 className="font-serif text-lg font-semibold text-parchment">{t('myMonsters.importTitle')}</h2>
          <button onClick={onClose} className="text-parchment/50 hover:text-parchment">
            ✕
          </button>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('common.search')}
          autoFocus
          className="m-3 rounded border border-white/15 bg-ink px-3 py-2 text-sm text-parchment focus:border-accent focus:outline-none"
        />
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          {loading && <div className="p-2 text-sm text-parchment/50">{t('common.loading')}</div>}
          <ul className="divide-y divide-white/5">
            {(data?.results ?? []).map((m) => (
              <li key={m.key} className="flex items-center justify-between gap-2 py-2">
                <div className="min-w-0">
                  <div className="truncate text-sm text-parchment">{m.name}</div>
                  <div className="truncate text-xs text-parchment/50">
                    {m.size}, {m.type} · ПО {m.crDisplay}
                  </div>
                </div>
                <button
                  onClick={() => copy(m)}
                  className="shrink-0 rounded bg-accent/80 px-2 py-1 text-xs font-semibold text-white hover:bg-accent"
                >
                  {t('myMonsters.copy')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
