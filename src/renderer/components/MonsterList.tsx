import { type JSX } from 'react'
import type { StatBlock } from '@shared/types'

interface Props {
  monsters: StatBlock[]
  selectedKey?: string
  onSelect: (m: StatBlock) => void
}

export default function MonsterList({ monsters, selectedKey, onSelect }: Props): JSX.Element {
  return (
    <ul className="divide-y divide-white/5">
      {monsters.map((m) => (
        <li key={m.key}>
          <button
            onClick={() => onSelect(m)}
            className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors ${
              selectedKey === m.key ? 'bg-accent/25' : 'hover:bg-white/5'
            }`}
          >
            <div className="min-w-0">
              <div className="truncate font-medium text-parchment">{m.name}</div>
              <div className="truncate text-xs text-parchment/50">
                {m.size}, {m.type}
                {m.environments.length > 0 && ` · ${m.environments.slice(0, 2).join(', ')}`}
              </div>
            </div>
            <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-xs font-bold text-accent">
              ПО {m.crDisplay}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
