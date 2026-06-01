import { useEffect, useRef, useState, type JSX } from 'react'
import { useDialogStore } from '../store/dialog'

/** Single mounted host that renders the app-styled confirm / alert / prompt
 *  dialog. Driven imperatively via confirmDialog / alertDialog / promptDialog. */
export default function ConfirmHost(): JSX.Element | null {
  const current = useDialogStore((s) => s.current)
  const close = useDialogStore((s) => s.close)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (current?.kind === 'prompt') {
      setValue(current.defaultValue ?? '')
      // focus after mount
      setTimeout(() => inputRef.current?.select(), 0)
    }
  }, [current])

  if (!current) return null

  const finish = (result: boolean | string | null): void => {
    current.resolve(result)
    close()
  }

  const onConfirm = (): void => {
    if (current.kind === 'prompt') finish(value)
    else finish(true)
  }
  const onCancel = (): void => {
    if (current.kind === 'alert') finish(true)
    else finish(current.kind === 'prompt' ? null : false)
  }

  const confirmLabel = current.confirmText ?? (current.kind === 'alert' ? 'OK' : 'Подтвердить')

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-6"
      onClick={onCancel}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onCancel()
        if (e.key === 'Enter' && current.kind !== 'prompt') onConfirm()
      }}
    >
      <div
        className="w-full max-w-sm rounded-lg border border-accent/40 bg-sidebar p-4 text-parchment shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {current.title && <h2 className="mb-1.5 font-serif text-lg font-semibold text-gold-soft">{current.title}</h2>}
        <p className="whitespace-pre-line text-sm leading-snug text-parchment/85">{current.message}</p>

        {current.kind === 'prompt' && (
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={current.placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onConfirm()
            }}
            className="mt-2.5 w-full rounded border border-white/15 bg-ink px-2 py-1.5 text-sm text-parchment focus:border-accent focus:outline-none"
          />
        )}

        <div className="mt-4 flex justify-end gap-2">
          {current.kind !== 'alert' && (
            <button onClick={onCancel} className="rounded border border-white/20 px-3 py-1.5 text-sm text-parchment/70 hover:bg-white/5">
              {current.cancelText ?? 'Отмена'}
            </button>
          )}
          <button
            onClick={onConfirm}
            autoFocus={current.kind !== 'prompt'}
            className={`rounded px-3 py-1.5 text-sm font-semibold ${
              current.danger
                ? 'bg-accent text-parchment hover:bg-accent/80'
                : 'border border-accent/50 text-accent hover:bg-accent/10'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
