import { useMemo, useState, type JSX } from 'react'
import { markupToHtml } from '../../utils/markup'

export interface Choice {
  key: string
  name: string
  desc?: string
  /** Optional sub-section header — when present, the list groups options under it. */
  group?: string
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

  // Group options under their `group` header, preserving first-appearance order.
  const grouped = useMemo(() => {
    if (!list.some((o) => o.group)) return null
    const order: string[] = []
    const map = new Map<string, Choice[]>()
    for (const o of list) {
      const g = o.group ?? '—'
      if (!map.has(g)) {
        map.set(g, [])
        order.push(g)
      }
      map.get(g)!.push(o)
    }
    return order.map((g) => ({ group: g, items: map.get(g)! }))
  }, [list])

  const Item = (o: Choice): JSX.Element => {
    const on = selected.includes(o.key)
    return (
      <label key={o.key} className={`flex items-start gap-1.5 border-b border-ink-brown/10 px-2 py-1 ${!on && full ? 'opacity-40' : ''}`}>
        <input type="checkbox" checked={on} disabled={!on && full} onChange={() => toggle(o.key)} className="mt-0.5 accent-accent" />
        <span className="min-w-0 flex-1">
          <b className="text-ink-brown">{o.name}</b>
          {o.desc && <span className="block text-[11px] leading-snug text-ink-brown/60" dangerouslySetInnerHTML={{ __html: markupToHtml(o.desc) }} />}
        </span>
      </label>
    )
  }

  return (
    <div className="space-y-1 text-sm">
      <p className="text-xs text-ink-brown/70">Выбрано <b className="text-accent">{selected.length}/{max}</b></p>
      {searchable && (
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск…" className="w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm focus:border-accent focus:outline-none" />
      )}
      <div className="max-h-56 overflow-y-auto rounded border border-ink-brown/15">
        {grouped
          ? grouped.map((sec) => (
              <div key={sec.group}>
                <div className="sticky top-0 bg-parchment-dark/70 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">{sec.group}</div>
                {sec.items.map(Item)}
              </div>
            ))
          : list.map(Item)}
      </div>
    </div>
  )
}
