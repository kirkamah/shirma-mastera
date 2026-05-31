import { useEffect, useRef, useState } from 'react'
import type { SearchParams, SearchResult } from '@shared/types'

interface State {
  data: SearchResult | null
  loading: boolean
  error: string | null
}

/** Debounced creature search via the IPC bridge. */
export function useCreatureSearch(params: SearchParams, debounceMs = 350): State & { reload: () => void } {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null })
  const [nonce, setNonce] = useState(0)
  const key = JSON.stringify(params)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Inactive (limit 0) — don't hit the network.
    if (params.limit === 0) {
      setState({ data: { count: 0, results: [], fromCache: false, offline: false }, loading: false, error: null })
      return
    }
    setState((s) => ({ ...s, loading: true, error: null }))
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      try {
        const data = await window.api.open5e.searchCreatures(params)
        setState({ data, loading: false, error: null })
      } catch (e) {
        setState({ data: null, loading: false, error: (e as Error).message })
      }
    }, debounceMs)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce])

  return { ...state, reload: () => setNonce((n) => n + 1) }
}

export function formatCacheAge(ms?: number): string {
  if (ms == null) return ''
  const min = Math.floor(ms / 60000)
  if (min < 1) return 'только что'
  if (min < 60) return `${min} мин.`
  const h = Math.floor(min / 60)
  return `${h} ч.`
}
