import { create } from 'zustand'

export type DialogKind = 'confirm' | 'alert' | 'prompt'

export interface DialogRequest {
  kind: DialogKind
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  /** Render the confirm button in the destructive (accent) style. */
  danger?: boolean
  /** prompt only */
  defaultValue?: string
  placeholder?: string
  resolve: (value: boolean | string | null) => void
}

interface DialogState {
  current: DialogRequest | null
  open: (req: DialogRequest) => void
  close: () => void
}

export const useDialogStore = create<DialogState>((set) => ({
  current: null,
  open: (req) => set({ current: req }),
  close: () => set({ current: null })
}))

interface ConfirmOpts {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

/** Styled replacement for window.confirm. Resolves true if confirmed. */
export function confirmDialog(opts: ConfirmOpts): Promise<boolean> {
  return new Promise((resolve) => {
    useDialogStore.getState().open({
      kind: 'confirm',
      ...opts,
      resolve: (v) => resolve(v === true)
    })
  })
}

/** Styled replacement for window.alert. */
export function alertDialog(message: string, title?: string): Promise<void> {
  return new Promise((resolve) => {
    useDialogStore.getState().open({
      kind: 'alert',
      message,
      title,
      resolve: () => resolve()
    })
  })
}

interface PromptOpts {
  title?: string
  message: string
  defaultValue?: string
  placeholder?: string
  confirmText?: string
}

/** Styled replacement for window.prompt. Resolves the entered string, or null if cancelled. */
export function promptDialog(opts: PromptOpts): Promise<string | null> {
  return new Promise((resolve) => {
    useDialogStore.getState().open({
      kind: 'prompt',
      ...opts,
      resolve: (v) => resolve(typeof v === 'string' ? v : null)
    })
  })
}
