import { useState, type JSX, type ReactNode } from 'react'
import TagInput from './TagInput'

export interface FormField {
  key: string
  label: string
  type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'tags'
  options?: { value: string; label: string }[]
  placeholder?: string
  /** Autocomplete pool for `type: 'tags'` — existing tags to suggest/dedupe against. */
  suggestions?: string[]
  /** Optional predicate — render this field only when it returns true for the current values. */
  showIf?: (values: FormValues) => boolean
}

export type FormValues = Record<string, string | number | boolean>

export type SaveMode = 'overwrite' | 'copy'

interface Props {
  title: string
  fields: FormField[]
  initial: FormValues
  onSave: (values: FormValues, mode: SaveMode) => void
  onClose: () => void
  /** When editing an existing entry, offer «overwrite» vs «save a renamed copy». */
  allowCopy?: boolean
  /** Optional extra block rendered under the fields (e.g. a formatting cheat-sheet). */
  extraContent?: ReactNode
}

/** Schema-driven modal form used to create/edit custom content (spells, gear, hazards). */
export default function CustomFormDialog({ title, fields, initial, onSave, onClose, allowCopy = false, extraContent }: Props): JSX.Element {
  const [values, setValues] = useState<FormValues>(initial)
  const set = (k: string, v: string | number | boolean): void => setValues((s) => ({ ...s, [k]: v }))

  const input = 'w-full rounded border border-white/15 bg-ink px-2 py-1 text-sm text-parchment focus:border-accent focus:outline-none'

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-6" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-accent/40 bg-sidebar p-4 shadow-panel" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-gold-soft">{title}</h2>
          <button onClick={onClose} className="text-parchment/50 hover:text-parchment">✕</button>
        </div>

        <div className="space-y-2">
          {fields.filter((f) => !f.showIf || f.showIf(values)).map((f) => (
            <label key={f.key} className="block text-xs text-parchment/70">
              {f.label}
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={String(values[f.key] ?? '')}
                  onChange={(e) => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className={`${input} mt-0.5`}
                />
              ) : f.type === 'select' ? (
                <select value={String(values[f.key] ?? '')} onChange={(e) => set(f.key, e.target.value)} className={`${input} mt-0.5`}>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === 'tags' ? (
                <div className="mt-0.5">
                  <TagInput
                    value={String(values[f.key] ?? '')
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)}
                    onChange={(next) => set(f.key, next.join(', '))}
                    placeholder={f.placeholder}
                    suggestions={f.suggestions}
                  />
                </div>
              ) : f.type === 'checkbox' ? (
                <div className="mt-0.5">
                  <input type="checkbox" checked={Boolean(values[f.key])} onChange={(e) => set(f.key, e.target.checked)} className="accent-accent" />
                </div>
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={String(values[f.key] ?? '')}
                  onChange={(e) => set(f.key, f.type === 'number' ? +e.target.value : e.target.value)}
                  placeholder={f.placeholder}
                  className={`${input} mt-0.5`}
                />
              )}
            </label>
          ))}
        </div>

        {extraContent && <div className="mt-3">{extraContent}</div>}

        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border border-white/20 px-3 py-1.5 text-sm text-parchment/70 hover:bg-white/5">
            Отмена
          </button>
          {allowCopy && (
            <button
              onClick={() => onSave(values, 'copy')}
              title="Создать новую запись «… (копия)», оригинал не трогать"
              className="rounded border border-accent/50 px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent/10"
            >
              Сохранить копию
            </button>
          )}
          <button
            onClick={() => onSave(values, 'overwrite')}
            title={allowCopy ? 'Полностью изменить эту запись' : undefined}
            className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80"
          >
            {allowCopy ? 'Перезаписать' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  )
}
