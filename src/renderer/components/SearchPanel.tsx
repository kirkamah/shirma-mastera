import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiMagnifyingGlass } from 'react-icons/gi'
import RangeSlider from './RangeSlider'
import { SIZES, SIZE_RU, TYPES, type Filters, type SortMode } from '../utils/filters'
import { translateType } from '@shared/translations'
import { ROLE_LABELS, ROLE_ICONS, ROLE_BADGE_CLASS, type MonsterRole } from '../utils/monsterRole'
import { useSettings } from '../store/settings'

const ROLE_ORDER: MonsterRole[] = ['melee', 'ranged', 'caster', 'tank']

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
  habitatOptions: string[]
  alignmentOptions: string[]
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

export default function SearchPanel({ filters, onChange, habitatOptions, alignmentOptions }: Props): JSX.Element {
  const { t } = useTranslation()
  const showRoles = useSettings((s) => s.roleBadges)
  // Filters start collapsed; the search box and sort stay visible.
  const [open, setOpen] = useState(false)

  const set = (patch: Partial<Filters>): void => onChange({ ...filters, ...patch })
  const toggle = (key: 'sizes' | 'types' | 'habitats' | 'alignments', value: string): void => {
    const arr = filters[key]
    set({ [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] } as Partial<Filters>)
  }
  const toggleRole = (r: MonsterRole): void => {
    set({ roles: filters.roles.includes(r) ? filters.roles.filter((x) => x !== r) : [...filters.roles, r] })
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
          {showRoles && (
          <div>
            <div className="mb-1 text-xs text-ink-brown/70">Тактическая роль</div>
            <div className="flex flex-wrap items-center gap-1">
              {ROLE_ORDER.map((r) => {
                const Icon = ROLE_ICONS[r]
                const active = filters.roles.includes(r)
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRole(r)}
                    title={ROLE_LABELS[r]}
                    className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                      active
                        ? `${ROLE_BADGE_CLASS[r]} border-transparent`
                        : 'border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
                    }`}
                  >
                    <Icon /> {ROLE_LABELS[r]}
                  </button>
                )
              })}
              {(() => {
                const Icon = ROLE_ICONS.boss
                const active = filters.bossOnly
                return (
                  <button
                    type="button"
                    onClick={() => set({ bossOnly: !filters.bossOnly })}
                    title={ROLE_LABELS.boss}
                    className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors ${
                      active
                        ? `${ROLE_BADGE_CLASS.boss} border-transparent`
                        : 'border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
                    }`}
                  >
                    <Icon /> Только боссы
                  </button>
                )
              })()}
            </div>
          </div>
          )}

          <div>
            <div className="mb-1 text-xs text-ink-brown/70">
              {t('bestiary.cr')}: {filters.crMin} — {filters.crMax}
            </div>
            <RangeSlider min={0} max={30} low={filters.crMin} high={filters.crMax} onChange={(lo, hi) => set({ crMin: lo, crMax: hi })} />
          </div>

          <div>
            <div className="mb-1 text-xs text-ink-brown/70">{t('bestiary.size')}</div>
            <div className="flex flex-wrap gap-1">
              {SIZES.map((s) => (
                <Chip key={s} label={SIZE_RU[s]} active={filters.sizes.includes(s)} onClick={() => toggle('sizes', s)} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs text-ink-brown/70">{t('bestiary.type')}</div>
            <div className="flex flex-wrap gap-1">
              {TYPES.map((tp) => (
                <Chip key={tp} label={translateType(tp)} active={filters.types.includes(tp)} onClick={() => toggle('types', tp)} />
              ))}
            </div>
          </div>

          {habitatOptions.length > 0 && (
            <div>
              <div className="mb-1 text-xs text-ink-brown/70">{t('bestiary.habitat')}</div>
              <div className="flex flex-wrap gap-1">
                {habitatOptions.map((h) => (
                  <Chip key={h} label={h} active={filters.habitats.includes(h)} onClick={() => toggle('habitats', h)} />
                ))}
              </div>
            </div>
          )}

          {alignmentOptions.length > 0 && (
            <div>
              <div className="mb-1 text-xs text-ink-brown/70">{t('bestiary.alignment')}</div>
              <div className="flex flex-wrap gap-1">
                {alignmentOptions.map((a) => (
                  <Chip key={a} label={a} active={filters.alignments.includes(a)} onClick={() => toggle('alignments', a)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
