import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiMagnifyingGlass } from 'react-icons/gi'
import RangeSlider from './RangeSlider'
import { SIZES, SIZE_RU, TYPES, MOVE_MODES, type Filters, type SortMode } from '../utils/filters'
import { translateType } from '@shared/translations'

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
  habitatOptions: string[]
  alignmentOptions: string[]
  /** Show the «классы-враги» visibility toggle (bestiary only). */
  classEnemyToggle?: boolean
}

/** Collapsible filter group ("folder"): a clickable header that hides/shows its
 *  options. A badge shows how many options are currently active so the user
 *  knows a collapsed group is still filtering. */
function Section({ title, count, children }: { title: string; count?: number; children: React.ReactNode }): JSX.Element {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-md border border-ink-brown/15 bg-parchment/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs font-semibold text-ink-brown/75 transition-colors hover:bg-black/5"
      >
        <span className="text-[10px] text-ink-brown/50">{open ? '▾' : '▸'}</span>
        <span>{title}</span>
        {count ? <span className="rounded-full bg-accent/20 px-1.5 text-[10px] font-bold text-accent">{count}</span> : null}
      </button>
      {open && <div className="border-t border-ink-brown/10 px-2.5 py-2">{children}</div>}
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
        active
          ? 'border-accent bg-accent text-parchment'
          : 'border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
      }`}
    >
      {label}
    </button>
  )
}

export default function SearchPanel({ filters, onChange, habitatOptions, alignmentOptions, classEnemyToggle }: Props): JSX.Element {
  const { t } = useTranslation()
  // Filters start collapsed; the search box and sort stay visible.
  const [open, setOpen] = useState(false)

  const set = (patch: Partial<Filters>): void => onChange({ ...filters, ...patch })
  const toggle = (key: 'sizes' | 'types' | 'habitats' | 'alignments', value: string): void => {
    const arr = filters[key]
    set({ [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] } as Partial<Filters>)
  }
  // Tri-state cycle per movement mode: any → has → no → any.
  const cycleSpeed = (mode: string): void => {
    const cur = filters.speeds[mode]
    const next = cur === undefined ? 'has' : cur === 'has' ? 'no' : undefined
    const speeds = { ...filters.speeds }
    if (next === undefined) delete speeds[mode]
    else speeds[mode] = next
    set({ speeds })
  }

  const inputCls =
    'rounded-md border border-ink-brown/30 bg-parchment/60 px-3 py-1.5 text-sm text-ink-brown placeholder:text-ink-brown/40 focus:border-accent focus:outline-none'

  return (
    <div className="rounded-lg border border-ink-brown/20 bg-parchment-dark/40">
      <div className="flex items-center gap-2 p-2">
        <GiMagnifyingGlass className="text-ink-brown/50" />
        <input
          value={filters.text}
          onChange={(e) => set({ text: e.target.value })}
          placeholder={t('common.search')}
          className={`min-w-0 flex-1 ${inputCls}`}
        />
        <select value={filters.sort} onChange={(e) => set({ sort: e.target.value as SortMode })} className={inputCls}>
          <option value="name">{t('bestiary.sortName')}</option>
          <option value="cr-asc">{t('bestiary.sortCrAsc')}</option>
          <option value="cr-desc">{t('bestiary.sortCrDesc')}</option>
          <option value="type">{t('bestiary.sortType')}</option>
        </select>
        <button onClick={() => setOpen((o) => !o)} className={`${inputCls} hover:bg-parchment`}>
          {open ? '▲' : '▼'} {t('common.filters')}
        </button>
      </div>

      {open && (
        <div className="space-y-3 border-t border-ink-brown/15 p-3 text-sm text-ink-brown">
          {classEnemyToggle && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-brown/70">Классы-враги в бестиарии:</span>
              <button
                type="button"
                onClick={() => set({ showClassEnemies: !filters.showClassEnemies })}
                title="Враги-классы (Воин/Жрец/Маг… по уровням). По умолчанию скрыты из общего списка."
                className={`rounded-full border px-3 py-0.5 text-xs font-semibold transition-colors ${
                  filters.showClassEnemies ? 'border-accent bg-accent text-parchment' : 'border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
                }`}
              >
                {filters.showClassEnemies ? 'Показаны' : 'Скрыты'}
              </button>
            </div>
          )}

          <Section title={t('bestiary.crFull')} count={filters.crMin !== 0 || filters.crMax !== 30 ? 1 : 0}>
            <div className="mb-1 text-xs text-ink-brown/70">
              {t('bestiary.cr')}: {filters.crMin} — {filters.crMax}
            </div>
            <RangeSlider min={0} max={30} low={filters.crMin} high={filters.crMax} onChange={(lo, hi) => set({ crMin: lo, crMax: hi })} />
          </Section>

          <Section title={t('bestiary.size')} count={filters.sizes.length}>
            <div className="flex flex-wrap gap-1">
              {SIZES.map((s) => (
                <Chip key={s} label={SIZE_RU[s]} active={filters.sizes.includes(s)} onClick={() => toggle('sizes', s)} />
              ))}
            </div>
          </Section>

          <Section title={t('bestiary.creatureType')} count={filters.types.length}>
            <div className="flex flex-wrap gap-1">
              {TYPES.map((tp) => (
                <Chip key={tp} label={translateType(tp)} active={filters.types.includes(tp)} onClick={() => toggle('types', tp)} />
              ))}
            </div>
          </Section>

          {habitatOptions.length > 0 && (
            <Section title={t('bestiary.habitat')} count={filters.habitats.length}>
              <div className="flex flex-wrap gap-1">
                {habitatOptions.map((h) => (
                  <Chip key={h} label={h} active={filters.habitats.includes(h)} onClick={() => toggle('habitats', h)} />
                ))}
              </div>
            </Section>
          )}

          {alignmentOptions.length > 0 && (
            <Section title={t('bestiary.alignment')} count={filters.alignments.length}>
              <div className="flex flex-wrap gap-1">
                {alignmentOptions.map((a) => (
                  <Chip key={a} label={a} active={filters.alignments.includes(a)} onClick={() => toggle('alignments', a)} />
                ))}
              </div>
            </Section>
          )}

          <Section title={t('bestiary.movement')} count={Object.keys(filters.speeds).length}>
            <div className="mb-1.5 text-[10px] text-ink-brown/45">{t('bestiary.movementHint')}</div>
            <div className="flex flex-wrap gap-1">
              {MOVE_MODES.map((mode) => {
                const state = filters.speeds[mode]
                const cls =
                  state === 'has'
                    ? 'border-accent bg-accent text-parchment'
                    : state === 'no'
                      ? 'border-red-700 bg-red-700/80 text-parchment'
                      : 'border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => cycleSpeed(mode)}
                    title={t('bestiary.movementHint')}
                    className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${cls}`}
                  >
                    {state === 'has' ? '✓ ' : state === 'no' ? '✗ ' : ''}
                    {t('bestiary.move_' + mode)}
                  </button>
                )
              })}
            </div>
          </Section>
        </div>
      )}
    </div>
  )
}
