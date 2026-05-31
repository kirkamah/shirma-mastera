import { create } from 'zustand'
import type { GlossaryTerm } from '../data/glossary'

interface GlossaryPopupState {
  term: GlossaryTerm | null
  open: (term: GlossaryTerm) => void
  close: () => void
}

/** Global popup for class glossary terms (metamagic, eldritch invocations, …)
 *  referenced from bestiary feature descriptions. */
export const useGlossaryPopup = create<GlossaryPopupState>((set) => ({
  term: null,
  open: (term) => set({ term }),
  close: () => set({ term: null })
}))
