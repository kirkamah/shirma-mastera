import { useMemo, useRef, useState, type JSX, type KeyboardEvent } from 'react'

/**
 * Tag/chip input. There is NO magic key handling — you type a tag freely
 * (spaces and commas allowed) and press the «Сохранить» button (or Enter) to
 * turn it into a chip. Chips are buttons that can only be deleted whole.
 *
 * While typing, existing tags that look similar (same up to case / spacing, or
 * a close typo) are suggested so the same tag isn't created twice in different
 * spellings.
 */

/** Normalise for similarity: lowercase, trim, collapse spaces, ё→е. */
function norm(s: string): string {
  return s.toLowerCase().trim().replace(/ё/g, 'е').replace(/\s+/g, ' ')
}

/** Levenshtein distance (small strings only). */
function dist(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[n]
}

export default function TagInput({
  label,
  value,
  onChange,
  placeholder,
  suggestions = [],
  variant = 'dark'
}: {
  label?: string
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  suggestions?: string[]
  /** «dark» for dark panels (default), «parchment» for the light parchment pages. */
  variant?: 'dark' | 'parchment'
}): JSX.Element {
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const dark = variant === 'dark'
  const th = {
    wrap: dark ? 'text-parchment/60' : 'text-ink-brown/70',
    chip: dark ? 'bg-accent/25 text-parchment hover:bg-accent/40' : 'bg-accent/15 text-ink-brown hover:bg-accent/25',
    chipX: dark ? 'text-parchment/60 group-hover:text-parchment' : 'text-ink-brown/50 group-hover:text-ink-brown',
    add: 'border-dashed border-accent/50 text-accent hover:bg-accent/10',
    input: dark
      ? 'border-white/15 bg-ink text-parchment'
      : 'border-ink-brown/30 bg-parchment/60 text-ink-brown',
    save: 'bg-accent text-parchment hover:bg-accent/80',
    cancel: dark ? 'border-white/20 text-parchment/60 hover:bg-white/5' : 'border-ink-brown/30 text-ink-brown/60 hover:bg-black/5',
    panel: dark ? 'border-white/15 bg-sidebar' : 'border-ink-brown/20 bg-parchment',
    dupe: dark ? 'text-gold-soft' : 'text-accent',
    subtitle: dark ? 'text-parchment/40' : 'text-ink-brown/40',
    sug: dark ? 'border-accent/40 text-parchment/90 hover:bg-accent/20' : 'border-accent/40 text-ink-brown hover:bg-accent/15'
  }

  // Pool of all known tags to suggest from (other entries + already-typed ones).
  const pool = useMemo(() => {
    const seen = new Map<string, string>() // norm → canonical spelling
    for (const t of [...suggestions, ...value]) {
      const k = norm(t)
      if (k && !seen.has(k)) seen.set(k, t)
    }
    return seen
  }, [suggestions, value])

  // Suggestions matching the current draft, excluding tags already added.
  const matches = useMemo(() => {
    const d = norm(draft)
    if (!d) return [] as string[]
    const added = new Set(value.map(norm))
    const scored: { tag: string; score: number }[] = []
    for (const [k, canonical] of pool) {
      if (added.has(k)) continue
      let score = -1
      if (k === d) score = 0
      else if (k.includes(d) || d.includes(k)) score = 1
      else {
        const dd = dist(k, d)
        if (dd <= (Math.min(k.length, d.length) >= 4 ? 2 : 1)) score = 2 + dd
      }
      if (score >= 0) scored.push({ tag: canonical, score })
    }
    return scored.sort((a, b) => a.score - b.score).slice(0, 6).map((s) => s.tag)
  }, [draft, pool, value])

  const commit = (raw: string): void => {
    const tag = raw.trim()
    if (!tag) return
    // Canonicalise to an existing spelling if one matches case-insensitively.
    const existing = pool.get(norm(tag))
    const final = existing ?? tag
    if (!value.some((v) => norm(v) === norm(final))) onChange([...value, final])
    setDraft('')
    inputRef.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commit(draft)
    } else if (e.key === 'Escape') {
      setDraft('')
      setAdding(false)
    }
  }

  const remove = (i: number): void => onChange(value.filter((_, j) => j !== i))

  // An exact (different-spelling) duplicate hint.
  const dupeHint = draft.trim() && pool.get(norm(draft)) && pool.get(norm(draft)) !== draft.trim() ? pool.get(norm(draft)) : null

  return (
    <div className={`flex flex-col gap-1 text-xs ${th.wrap}`}>
      {label}
      <div className="flex flex-wrap items-center gap-1">
        {value.map((tag, i) => (
          <button
            key={tag + i}
            type="button"
            onClick={() => remove(i)}
            title="Удалить тег"
            className={`group flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${th.chip}`}
          >
            <span>{tag}</span>
            <span className={th.chipX}>×</span>
          </button>
        ))}
        {!adding && (
          <button
            type="button"
            onClick={() => {
              setAdding(true)
              setTimeout(() => inputRef.current?.focus(), 0)
            }}
            className={`rounded-full border px-2 py-0.5 text-xs ${th.add}`}
          >
            + тег
          </button>
        )}
      </div>

      {adding && (
        <div className="relative">
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder ?? 'Введите тег…'}
              className={`min-w-0 flex-1 rounded border px-2 py-1 text-sm focus:border-accent focus:outline-none ${th.input}`}
            />
            <button
              type="button"
              onClick={() => commit(draft)}
              disabled={!draft.trim()}
              className={`rounded px-2.5 py-1 text-xs font-semibold disabled:opacity-40 ${th.save}`}
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft('')
                setAdding(false)
              }}
              title="Закрыть"
              className={`rounded border px-2 py-1 text-xs ${th.cancel}`}
            >
              ✕
            </button>
          </div>

          {(matches.length > 0 || dupeHint) && (
            <div className={`mt-1 rounded border p-1 shadow-panel ${th.panel}`}>
              {dupeHint && (
                <div className={`mb-1 px-1 text-[11px] ${th.dupe}`}>
                  Такой тег уже есть: «{dupeHint}» — он и будет использован.
                </div>
              )}
              {matches.length > 0 && (
                <>
                  <div className={`px-1 pb-0.5 text-[10px] uppercase tracking-wide ${th.subtitle}`}>Существующие теги</div>
                  <div className="flex flex-wrap gap-1">
                    {matches.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => commit(m)}
                        className={`rounded-full border px-2 py-0.5 text-xs ${th.sug}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
