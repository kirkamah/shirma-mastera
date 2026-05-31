import { memo, type JSX } from 'react'
import type { StatBlock } from '@shared/types'
import Portrait, { emblemForMonster } from './Portrait'
import { ROLE_ICONS, ROLE_LABELS, ROLE_BADGE_CLASS, type MonsterRoleInfo } from '../utils/monsterRole'

interface Props {
  monster: StatBlock
  selected: boolean
  picked: boolean
  /** Pre-computed role; passing it as a prop keeps tiles cheap to re-render. */
  role: MonsterRoleInfo
  /** Whether to show the coloured tactical-role badge in the corner. */
  showRole: boolean
  onSelect: (m: StatBlock) => void
  onPick?: (m: StatBlock) => void
}

/** One catalogue tile in the bestiary grid. React.memo'd so the grid only
 *  re-renders tiles whose props actually changed — a noticeable win once the
 *  bestiary grows past a few hundred entries. */
function MonsterTileBase({ monster: m, selected, picked, role, showRole, onSelect, onPick }: Props): JSX.Element {
  const RoleIcon = ROLE_ICONS[role.primary]
  const BossIcon = ROLE_ICONS.boss
  return (
    <button
      onClick={() => onSelect(m)}
      onContextMenu={
        onPick
          ? (e) => {
              e.preventDefault()
              onPick(m)
            }
          : undefined
      }
      className={`group relative flex h-28 flex-col items-center gap-0.5 rounded-md border p-2 text-center transition-all ${
        picked
          ? 'border-accent bg-accent/15 ring-2 ring-accent'
          : selected
            ? 'border-accent bg-parchment shadow-panel'
            : 'border-ink-brown/20 bg-parchment-dark/40 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-parchment/70'
      }`}
    >
      {showRole && (
        <span className="absolute left-1 top-1 flex items-center gap-0.5">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] shadow-sm ${ROLE_BADGE_CLASS[role.primary]}`}
            title={ROLE_LABELS[role.primary]}
          >
            <RoleIcon />
          </span>
          {role.boss && (
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] shadow-sm ${ROLE_BADGE_CLASS.boss}`}
              title={ROLE_LABELS.boss}
            >
              <BossIcon />
            </span>
          )}
        </span>
      )}
      {picked && (
        <span className="absolute -left-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-parchment ring-2 ring-parchment">
          ✓
        </span>
      )}
      <span className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold wax-seal">
        {m.crDisplay}
      </span>
      <Portrait emblem={emblemForMonster(m)} src={m.imageUrl} size={42} />
      <div
        className="line-clamp-2 w-full font-serif text-[12px] font-semibold leading-[1.15] tracking-tight text-accent"
        title={m.name}
      >
        {m.name}
      </div>
      <div className="line-clamp-1 w-full text-[10px] leading-tight text-ink-brown/70">
        {m.size}, {m.type}
      </div>
    </button>
  )
}

export default memo(MonsterTileBase)
