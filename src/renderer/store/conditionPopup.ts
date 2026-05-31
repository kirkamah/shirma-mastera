import { create } from 'zustand'
import type { ConditionItem } from '@shared/types'

interface ConditionPopupState {
  condition: ConditionItem | null
  open: (c: ConditionItem) => void
  close: () => void
}

/** Global popup shown when a condition reference is clicked anywhere in the app. */
export const useConditionPopup = create<ConditionPopupState>((set) => ({
  condition: null,
  open: (condition) => set({ condition }),
  close: () => set({ condition: null })
}))
