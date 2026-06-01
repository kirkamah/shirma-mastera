import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type NotebookTab = 'notes' | 'initiative' | 'rolls'

/** Routes available in the split-screen picker — kept in sync with App.tsx. */
export type SplitRoute =
  | '/bestiary'
  | '/conditions'
  | '/spells'
  | '/races'
  | '/equipment'
  | '/hazards'
  | '/codex'
  | '/rules'
  | '/random-tables'
  | '/character'
  | '/my-monsters'

interface UiState {
  notebookOpen: boolean
  notebookTab: NotebookTab
  /** Width of the Notebook side panel (px). Adjustable via a drag handle. */
  notebookWidth: number
  /** When true, the main pane shows two routes side-by-side. */
  splitOpen: boolean
  /** Route shown in the right half of the split view. The left half follows the URL. */
  splitRoute: SplitRoute
  /** Left/right ratio of the split view (% the left pane takes). */
  splitRatio: number
  online: boolean
  toggleNotebook: () => void
  setNotebookOpen: (open: boolean) => void
  setNotebookTab: (tab: NotebookTab) => void
  setNotebookWidth: (w: number) => void
  toggleSplit: () => void
  setSplitOpen: (open: boolean) => void
  setSplitRoute: (route: SplitRoute) => void
  setSplitRatio: (r: number) => void
  setOnline: (online: boolean) => void
}

const MIN_NOTEBOOK = 280
const MAX_NOTEBOOK = 960

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      notebookOpen: false,
      notebookTab: 'notes',
      notebookWidth: 360,
      splitOpen: false,
      splitRoute: '/hazards',
      splitRatio: 50,
      online: true,
      toggleNotebook: () => set((s) => ({ notebookOpen: !s.notebookOpen })),
      setNotebookOpen: (notebookOpen) => set({ notebookOpen }),
      setNotebookTab: (notebookTab) => set({ notebookTab, notebookOpen: true }),
      setNotebookWidth: (w) =>
        set({ notebookWidth: Math.min(MAX_NOTEBOOK, Math.max(MIN_NOTEBOOK, Math.round(w))) }),
      toggleSplit: () => set((s) => ({ splitOpen: !s.splitOpen })),
      setSplitOpen: (splitOpen) => set({ splitOpen }),
      setSplitRoute: (splitRoute) => set({ splitRoute }),
      setSplitRatio: (r) => set({ splitRatio: Math.min(85, Math.max(15, Math.round(r))) }),
      setOnline: (online) => set({ online })
    }),
    {
      name: 'shirma-ui',
      partialize: (s) => ({
        notebookWidth: s.notebookWidth,
        splitOpen: s.splitOpen,
        splitRoute: s.splitRoute,
        splitRatio: s.splitRatio,
        notebookTab: s.notebookTab
      })
    }
  )
)
