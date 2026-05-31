import type {
  ConditionItem,
  ConditionsResult,
  Edition,
  SearchParams,
  SearchResult,
  Spell,
  SpellsResult,
  StatBlock
} from '../../shared/types'
import { mapCreature, mapSpell, type RawCreature } from '../../shared/open5e-mapper'
import { getCache, setCache } from '../db/database'

const BASE = 'https://api.open5e.com/v2'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

let online = true
export function isOnline(): boolean {
  return online
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

/**
 * Fetch with a 24h SQLite cache. Returns parsed JSON plus cache metadata.
 * On network failure, falls back to cached data of any age.
 */
async function cachedFetch<T>(
  url: string
): Promise<{ data: T; fromCache: boolean; cacheAge?: number; offline: boolean }> {
  const cached = getCache(url)
  const now = Date.now()

  if (cached && now - cached.fetched_at < CACHE_TTL) {
    return { data: JSON.parse(cached.payload) as T, fromCache: true, cacheAge: now - cached.fetched_at, offline: false }
  }

  try {
    const data = (await fetchJson(url)) as T
    setCache(url, JSON.stringify(data))
    online = true
    return { data, fromCache: false, offline: false }
  } catch {
    online = false
    if (cached) {
      return { data: JSON.parse(cached.payload) as T, fromCache: true, cacheAge: now - cached.fetched_at, offline: true }
    }
    throw new Error('offline-no-cache')
  }
}

interface Paginated<T> {
  count: number
  results: T[]
}

/** Open5e aggregates several source documents, so the same creature/spell can
 *  appear multiple times. Keep the first occurrence of each name. */
function dedupeByName<T extends { name: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const it of items) {
    const key = it.name.trim().toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(it)
  }
  return out
}

export async function searchCreatures(params: SearchParams): Promise<SearchResult> {
  const qs = new URLSearchParams()
  qs.set('limit', String(params.limit ?? 50))
  if (params.page && params.page > 1) qs.set('offset', String((params.page - 1) * (params.limit ?? 50)))
  if (params.search) qs.set('search', params.search)
  if (params.crMin != null) qs.set('challenge_rating__gte', String(params.crMin))
  if (params.crMax != null) qs.set('challenge_rating__lte', String(params.crMax))
  if (params.edition) qs.set('document__gamesystem', params.edition)
  if (params.ordering) qs.set('ordering', params.ordering)

  const url = `${BASE}/creatures/?${qs.toString()}`
  try {
    const { data, fromCache, cacheAge, offline } = await cachedFetch<Paginated<RawCreature>>(url)
    const results = dedupeByName((data.results ?? []).map(mapCreature))
    return {
      count: results.length,
      results,
      fromCache,
      cacheAge,
      offline
    }
  } catch {
    return { count: 0, results: [], fromCache: false, offline: true }
  }
}

export async function getCreature(key: string): Promise<StatBlock | null> {
  const url = `${BASE}/creatures/${encodeURIComponent(key)}/`
  try {
    const { data } = await cachedFetch<RawCreature>(url)
    return mapCreature(data)
  } catch {
    return null
  }
}

interface RawCondition {
  key?: string
  name?: string
  descriptions?: { desc?: string; gamesystem?: string }[]
  desc?: string
}

export async function getConditions(edition: Edition): Promise<ConditionsResult> {
  const url = `${BASE}/conditions/?limit=100`
  try {
    const { data, fromCache, cacheAge, offline } = await cachedFetch<Paginated<RawCondition>>(url)
    const results: ConditionItem[] = (data.results ?? []).map((c) => ({
      key: c.key ?? c.name ?? '',
      name: c.name ?? '',
      descriptions: (c.descriptions ?? [{ desc: c.desc, gamesystem: edition }]).map((d) => ({
        desc: d.desc ?? '',
        gamesystem: d.gamesystem ?? '5e-2014'
      }))
    }))
    return { results, fromCache, cacheAge, offline }
  } catch {
    return { results: [], fromCache: false, offline: true }
  }
}

export async function searchSpells(params: {
  search?: string
  edition?: Edition
  limit?: number
}): Promise<SpellsResult> {
  const qs = new URLSearchParams()
  qs.set('limit', String(params.limit ?? 300))
  if (params.search) qs.set('search', params.search)
  if (params.edition) qs.set('document__gamesystem', params.edition)
  const url = `${BASE}/spells/?${qs.toString()}`
  try {
    const { data, fromCache, cacheAge, offline } = await cachedFetch<Paginated<unknown>>(url)
    const results = dedupeByName((data.results ?? []).map((s) => mapSpell(s as never)))
    return { results, fromCache, cacheAge, offline }
  } catch {
    return { results: [], fromCache: false, offline: true }
  }
}
