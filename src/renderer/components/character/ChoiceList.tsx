import { useMemo, useState, type JSX } from 'react'

export interface Choice {
  key: string
  name: string
  desc: string
}

/** Multi-select list with descriptions, capped at `max`. Used for feats,
 *  metamagic and maneuvers. */
export default function ChoiceList({
  options,
  selected,
  max,
  onChange,
  searchable
}: {
  options: Choice[]
  selected: string[]
  max: number
  onChange: (next: string[]) => void
  searchable?: boolean
}): JSX.Element {
  const [q, setQ] = useState('')
  const full = selected.length >= max
  const toggle = (key: string): void => {
    if (selected.includes(key)) onChange(selected.filter((k) => k !== key))
    else if (!full) onChange([...selected, key])
  }
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return searchable && s ? options.filter((o) => o.name.toLowerCase().includes(s)) : options
  }, [options, q, searchable])

  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-ink-brown/70">Выбрано <b className="text-accent">{selected.length}/{max}</b></p>
      {searchable && (
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск…" className="w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm focus:border-accent focus:outline-none" />
      )}
      <div className="max-h-56 overflow-y-auto rounded border border-ink-brown/15">
        {list.map((o) => {
          const on = selected.includes(o.key)
          return (
            <label key={o.key} className={`flex items-start gap-1.5 border-b border-ink-brown/10 px-2 py-1 ${!on && full ? 'opacity-40' : ''}`}>
              <input type="checkbox" checked={on} disabled={!on && full} onChange={() => toggle(o.key)} className="mt-0.5 accent-accent" />
              <span className="min-w-0 flex-1">
                <b className="text-ink-brown">{o.name}</b>
                <span className="block text-[11px] leading-snug text-ink-brown/60">{o.desc}</span>
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
