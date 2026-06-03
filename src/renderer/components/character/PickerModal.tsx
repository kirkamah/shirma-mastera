import { useState, type JSX, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../Modal'

export interface PickItem {
  id: string
  name: string
}

/**
 * Generic "click a field → choose from a list with descriptions → Выбрать"
 * modal used for race / class / subclass / background in the constructor.
 */
export default function PickerModal<T extends PickItem>({
  title,
  items,
  selectedId,
  renderDetail,
  onPick,
  onClose
}: {
  title: string
  items: T[]
  selectedId?: string
  renderDetail: (item: T) => ReactNode
  onPick: (item: T) => void
  onClose: () => void
}): JSX.Element {
  const { t } = useTranslation()
  const [sel, setSel] = useState<string>(selectedId ?? items[0]?.id ?? '')
  const current = items.find((i) => i.id === sel) ?? items[0]

  return (
    <Modal onClose={onClose} max="max-w-4xl">
      <div className="parchment-texture tome-border flex max-h-[80vh] flex-col rounded-lg p-4 shadow-panel">
        <h2 className="mb-2 font-serif text-2xl font-bold text-accent">{title}</h2>
        <div className="flex min-h-0 flex-1 gap-3">
          <div className="w-48 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30 py-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => setSel(it.id)}
                className={`block w-full px-3 py-1.5 text-left font-serif transition-colors ${
                  current?.id === it.id ? 'rounded bg-accent/20 font-semibold text-accent' : 'text-ink-brown/90 hover:bg-black/5'
                }`}
              >
                {it.name}
              </button>
            ))}
          </div>
          <div className="min-w-0 flex-1 overflow-y-auto pr-1">
            {current && renderDetail(current)}
          </div>
        </div>
        <div className="mt-3 flex shrink-0 justify-end gap-2 border-t border-ink-brown/15 pt-3">
          <button onClick={onClose} className="rounded border border-ink-brown/30 px-4 py-1.5 text-sm text-ink-brown/80 hover:border-accent/60">
            {t('cc.picker.cancel')}
          </button>
          <button
            onClick={() => current && onPick(current)}
            disabled={!current}
            className="rounded bg-accent px-5 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80 disabled:opacity-40"
          >
            {t('cc.picker.select')}
          </button>
        </div>
      </div>
    </Modal>
  )
}
