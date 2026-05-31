import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RollLogEntry } from '@shared/types'

interface RollsState {
  log: RollLogEntry[]
  addRoll: (entry: Omit<RollLogEntry, 'id' | 'timestamp'>) => void
  clear: () => void
}

export const useRolls = create<RollsState>((set) => ({
  log: [],
  addRoll: (entry) =>
    set((s) => ({
      log: [
        { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() },
        ...s.log
      ].slice(0, 200)
    })),
  clear: () => set({ log: [] })
}))

interface FavoritesState {
  favorites: string[]
  add: (formula: string) => void
  remove: (formula: string) => void
}

export const useRollFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: ['1к20', '2к6+3', '1к8+2', '4к6'],
      add: (formula) => {
        const f = formula.trim()
        if (f && !get().favorites.includes(f)) set({ favorites: [...get().favorites, f] })
      },
      remove: (formula) => set({ favorites: get().favorites.filter((x) => x !== formula) })
    }),
    { name: 'shirma-roll-favorites' }
  )
)
