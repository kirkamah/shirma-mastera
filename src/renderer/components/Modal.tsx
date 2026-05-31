import { type JSX, type ReactNode } from 'react'

interface Props {
  onClose: () => void
  children: ReactNode
  max?: string
}

/** Centered scrollable overlay used to show a detail card (monster / spell) as a popup. */
export default function Modal({ onClose, children, max = 'max-w-3xl' }: Props): JSX.Element {
  return (
    <div className="fixed inset-0 z-[75] overflow-y-auto bg-black/60" onClick={onClose}>
      <button
        onClick={onClose}
        className="fixed right-4 top-4 z-[76] rounded-full border border-gold/50 bg-sidebar/90 px-3 py-1 text-lg text-parchment hover:bg-accent/40"
        title="Закрыть (Esc / клик вне окна)"
      >
        ✕
      </button>
      <div className={`mx-auto my-8 w-full px-4 ${max}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
