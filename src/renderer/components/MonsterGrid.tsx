import { useMemo, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import type { StatBlock } from '@shared/types'
import type { SortMode } from '../utils/filters'
import MonsterTile from './MonsterTile'
import { monTypeLabel } from '../data/bestiary-ru'

interface Props {
  monsters: StatBlock[]
  selectedKey?: string
  onSelect: (m: StatBlock) => void
  /** Keys of monsters multi-selected for «add to initiative». */
  pickedKeys?: Set<string>
  /** Right-click handler — toggles multi-selection. */
  onPick?: (m: StatBlock) => void
  /** Active sort — when set, tiles are split into labelled groups (by CR /
   *  type / first letter) separated by a thin rule. */
  sort?: SortMode
}

/** The group a monster falls into for the current sort. The list is already
 *  sorted, so monsters sharing a key are contiguous. */
function groupOf(m: StatBlock, sort: SortMode, lang: string, crLabel: string): { key: string; label: string } {
  if (sort === 'type') return { key: m.type || '—', label: monTypeLabel(m.type || '—', lang) }
  if (sort === 'cr-asc' || sort === 'cr-desc') return { key: String(m.challengeRating), label: `${crLabel} ${m.crDisplay}` }
  // name (and any default) — group by first letter
  const ch = (m.name.trim()[0] ?? '#').toUpperCase()
  return { key: ch, label: ch }
}

/** Grid of illuminated catalogue tiles for the bestiary. Each tile is
 *  rendered by a memoized component so changing one monster's pick state
 *  or selection doesn't force every other tile to repaint. */
export default function MonsterGrid({ monsters, selectedKey, onSelect, pickedKeys, onPick, sort }: Props): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const tile = (m: StatBlock): JSX.Element => (
    <MonsterTile
      key={m.key}
      monster={m}
      selected={selectedKey === m.key}
      picked={pickedKeys?.has(m.key) ?? false}
      onSelect={onSelect}
      onPick={onPick}
    />
  )

  const gridStyle = { gridTemplateColumns: 'repeat(auto-fill, 10.5rem)', justifyContent: 'start' } as const

  // Split the already-sorted list into contiguous runs sharing a group key.
  const groups = useMemo(() => {
    if (!sort) return null
    const out: { key: string; label: string; items: StatBlock[] }[] = []
    for (const m of monsters) {
      const g = groupOf(m, sort, lang, t('bestiary.cr'))
      const last = out[out.length - 1]
      if (last && last.key === g.key) last.items.push(m)
      else out.push({ key: g.key, label: g.label, items: [m] })
    }
    return out
  }, [monsters, sort])

  if (!groups) {
    return (
      <div className="grid gap-2 p-1" style={gridStyle}>
        {monsters.map(tile)}
      </div>
    )
  }

  return (
    <div className="space-y-3 p-1">
      {groups.map((g) => (
        <div key={g.key}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-brown/50">{g.label}</span>
            <div className="h-px flex-1 bg-ink-brown/15" />
            <span className="shrink-0 text-[10px] text-ink-brown/30">{g.items.length}</span>
          </div>
          <div className="grid gap-2" style={gridStyle}>
            {g.items.map(tile)}
          </div>
        </div>
      ))}
    </div>
  )
}
