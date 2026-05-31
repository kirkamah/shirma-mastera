import { create } from 'zustand'

export type SearchSection =
  | 'bestiary'
  | 'conditions'
  | 'races'
  | 'equipment'
  | 'hazards'
  | 'classes'
  | 'backgrounds'
  | 'rules'

interface NavState {
  /** target a page should select after navigation, then clear */
  pending: { section: SearchSection; key: string } | null
  setPending: (section: SearchSection, key: string) => void
  clear: () => void
}

export const useNav = create<NavState>((set) => ({
  pending: null,
  setPending: (section, key) => set({ pending: { section, key } }),
  clear: () => set({ pending: null })
}))
