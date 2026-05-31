import { type JSX } from 'react'
import type { StatBlock } from '@shared/types'
import MonsterTile from './MonsterTile'
import { monsterRole } from '../utils/monsterRole'
import { useSettings } from '../store/settings'

interface Props {
  monsters: StatBlock[]
  selectedKey?: string
  onSelect: (m: StatBlock) => void
  /** Keys of monsters multi-selected for «add to initiative». */
  pickedKeys?: Set<string>
  /** Right-click handler — toggles multi-selection. */
  onPick?: (m: StatBlock) => void
}

/** Grid of illuminated catalogue tiles for the bestiary. Each tile is
 *  rendered by a memoized component so changing one monster's pick state
 *  or selection doesn't force every other tile to repaint. */
export default function MonsterGrid({ monsters, selectedKey, onSelect, pickedKeys, onPick }: Props): JSX.Element {
  const showRoles = useSettings((s) => s.roleBadges)
  return (
    <div
      className="grid gap-2 p-1"
      style={{ gridTemplateColumns: 'repeat(auto-fill, 10.5rem)', justifyContent: 'start' }}
    >
      {monsters.map((m) => (
        <MonsterTile
          key={m.key}
          monster={m}
          role={monsterRole(m)}
          selected={selectedKey === m.key}
          picked={pickedKeys?.has(m.key) ?? false}
          showRole={showRoles}
          onSelect={onSelect}
          onPick={onPick}
        />
      ))}
    </div>
  )
}
