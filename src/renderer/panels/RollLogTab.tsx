import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useRolls, useRollFavorites } from '../store/rolls'
import { useDiceRoller } from '../hooks/useDiceRoller'
import type { RollMode } from '../utils/roll'

const PRESETS = [4, 6, 8, 10, 12, 20, 100]

export default function RollLogTab(): JSX.Element {
  const { t } = useTranslation()
  const { log, clear } = useRolls()
  const { favorites, add: addFav, remove: removeFav } = useRollFavorites()
  const { rollText, rollFormula, rollBonus } = useDiceRoller()
  const [formula, setFormula] = useState('')
  const [mode, setMode] = useState<RollMode>('normal')
  const [count, setCount] = useState(1)

  const rollPreset = (sides: number): void => {
    if (sides === 20 && mode !== 'normal') rollBonus(0, 'd20', mode)
    else rollFormula({ count: 1, sides, modifier: 0 }, `d${sides}`)
  }

  const rollCustom = (f: string): void => {
    const n = Math.max(1, Math.min(20, count))
    for (let i = 0; i < n; i++) rollText(f, n > 1 ? `${f} (#${i + 1})` : f)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="text-xs text-parchment/50">{log.length}</span>
        <button onClick={clear} className="text-xs text-accent hover:underline">
          {t('notebook.clearLog')}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {log.length === 0 && <div className="p-3 text-xs text-parchment/40">{t('notebook.noRolls')}</div>}
        <ul className="space-y-1">
          {log.map((r) => (
            <li key={r.id} className="rounded bg-ink/50 px-2 py-1 text-xs">
              <div className="flex justify-between text-parchment/40">
                <span className="truncate">{r.label}</span>
                <span>{new Date(r.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
              <div className="text-parchment">
                <span className="text-parchment/60">{r.formula}</span> →{' '}
                <span className={`font-semibold ${r.crit === 'hit' ? 'text-emerald-300' : r.crit === 'miss' ? 'text-red-400' : 'text-amber-300'}`}>
                  {r.result}
                </span>
                {r.crit === 'hit' && <span className="ml-1 text-emerald-300">✦крит</span>}
                {r.crit === 'miss' && <span className="ml-1 text-red-400">✦провал</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Manual roll */}
      <div className="space-y-2 border-t border-white/10 p-2">
        <div className="text-xs font-semibold text-parchment/70">{t('notebook.manualRoll')}</div>
        <div className="flex flex-wrap gap-1">
          {PRESETS.map((s) => (
            <button key={s} onClick={() => rollPreset(s)} className="rounded border border-white/15 px-2 py-1 text-xs text-parchment/80 hover:bg-white/10">
              d{s}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setMode(mode === 'advantage' ? 'normal' : 'advantage')}
            className={`flex-1 rounded px-1 py-1 text-xs ${mode === 'advantage' ? 'bg-emerald-600 text-white' : 'bg-black/30 text-parchment/60'}`}
          >
            ↑ {t('notebook.advantage')}
          </button>
          <button
            onClick={() => setMode(mode === 'disadvantage' ? 'normal' : 'disadvantage')}
            className={`flex-1 rounded px-1 py-1 text-xs ${mode === 'disadvantage' ? 'bg-accent text-white' : 'bg-black/30 text-parchment/60'}`}
          >
            ↓ {t('notebook.disadvantage')}
          </button>
        </div>
        <div className="flex gap-1">
          <input
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && formula.trim() && rollCustom(formula)}
            placeholder={t('notebook.customFormula')}
            className="min-w-0 flex-1 rounded bg-black/40 px-2 py-1 text-sm text-parchment"
          />
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(+e.target.value)}
            title={t('notebook.rollCount')}
            className="w-12 rounded bg-black/40 px-1 text-center text-sm text-parchment"
          />
          <button onClick={() => formula.trim() && rollCustom(formula)} className="rounded bg-accent/80 px-3 py-1 text-sm font-semibold text-white hover:bg-accent">
            {t('notebook.roll')}
          </button>
          <button
            onClick={() => formula.trim() && addFav(formula)}
            title={t('notebook.addFavorite')}
            className="rounded border border-gold/40 px-2 text-sm text-gold hover:bg-gold/10"
          >
            ★
          </button>
        </div>
        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {favorites.map((f) => (
              <span key={f} className="flex items-center gap-0.5 rounded-full bg-gold/15 px-2 py-0.5 text-xs text-gold-soft">
                <button onClick={() => rollCustom(f)} className="hover:text-white" title={t('notebook.roll')}>
                  {f}
                </button>
                <button onClick={() => removeFav(f)} className="text-gold-soft/50 hover:text-white">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
