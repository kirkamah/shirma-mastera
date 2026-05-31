import { create } from 'zustand'
import type { Spell } from '@shared/types'

interface SpellPopupState {
  spell: Spell | null
  /** Optional edit handler — set only when the spell is opened from a surface
   *  that supports editing (the Spells page). The popup shows a pencil when present. */
  onEdit: ((spell: Spell) => void) | null
  open: (spell: Spell, onEdit?: (spell: Spell) => void) => void
  close: () => void
}

/** Global popup shown when a spell reference is clicked anywhere in the app. */
export const useSpellPopup = create<SpellPopupState>((set) => ({
  spell: null,
  onEdit: null,
  open: (spell, onEdit) => set({ spell, onEdit: onEdit ?? null }),
  close: () => set({ spell: null, onEdit: null })
}))
