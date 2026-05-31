import { create } from 'zustand'
import type { FeatBuild } from '../data/character-build'

interface FeatPopupState {
  feat: FeatBuild | null
  open: (feat: FeatBuild) => void
  close: () => void
}

/** Global popup shown when a feat reference (e.g. background's Origin Feat) is clicked. */
export const useFeatPopup = create<FeatPopupState>((set) => ({
  feat: null,
  open: (feat) => set({ feat }),
  close: () => set({ feat: null })
}))
