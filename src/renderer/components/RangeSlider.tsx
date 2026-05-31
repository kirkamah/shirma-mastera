import { useCallback, useRef, type JSX } from 'react'

interface Props {
  min: number
  max: number
  low: number
  high: number
  onChange: (low: number, high: number) => void
}

/** Single dual-thumb range slider (min..max selection on one track). */
export default function RangeSlider({ min, max, low, high, onChange }: Props): JSX.Element {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'low' | 'high' | null>(null)

  const valueFromClientX = useCallback(
    (clientX: number): number => {
      const el = trackRef.current
      if (!el) return min
      const rect = el.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      return Math.round(min + ratio * (max - min))
    },
    [min, max]
  )

  const onPointerMove = useCallback(
    (e: PointerEvent): void => {
      if (!dragging.current) return
      const v = valueFromClientX(e.clientX)
      if (dragging.current === 'low') onChange(Math.min(v, high), high)
      else onChange(low, Math.max(v, low))
    },
    [valueFromClientX, low, high, onChange]
  )

  const stop = useCallback((): void => {
    dragging.current = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stop)
  }, [onPointerMove])

  const startDrag = (which: 'low' | 'high') => (e: React.PointerEvent): void => {
    e.preventDefault()
    dragging.current = which
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stop)
  }

  const pct = (v: number): number => ((v - min) / (max - min)) * 100

  return (
    <div ref={trackRef} className="relative h-6 w-full select-none">
      <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-black/30" />
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
        style={{ left: `${pct(low)}%`, width: `${pct(high) - pct(low)}%`, background: 'linear-gradient(90deg,#7a1414,#b8893b)' }}
      />
      {(['low', 'high'] as const).map((which) => {
        const v = which === 'low' ? low : high
        return (
          <button
            key={which}
            onPointerDown={startDrag(which)}
            className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-gold bg-parchment shadow active:cursor-grabbing"
            style={{ left: `${pct(v)}%` }}
            title={String(v)}
          />
        )
      })}
    </div>
  )
}
