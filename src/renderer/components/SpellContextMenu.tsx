import { useEffect, useLayoutEffect, useRef, useState, type JSX } from 'react'
import { createPortal } from 'react-dom'
import type { SpellContextPayload } from '@shared/types'

/**
 * Контекстное меню правой кнопки в стиле приложения (пергамент / акцент).
 * Нативное меню Electron нельзя стилизовать, поэтому main-процесс присылает
 * данные о слове по IPC ('spell:context'), а меню рисуется здесь.
 *
 * Действия (замена слова, вырезать/копировать/вставить) выполняет main над
 * сфокусированным полем. Чтобы не сбить выделение/фокус при клике по меню,
 * контейнер гасит mousedown (preventDefault) — поле остаётся активным.
 */
export default function SpellContextMenu(): JSX.Element | null {
  const [menu, setMenu] = useState<SpellContextPayload | null>(null)
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => window.api.spell.onContext(setMenu), [])

  // Закрытие по клику в стороне / Esc / прокрутке / потере фокуса окна.
  useEffect(() => {
    if (!menu) return
    const close = (): void => setMenu(null)
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('mousedown', close)
    window.addEventListener('blur', close)
    window.addEventListener('resize', close)
    window.addEventListener('wheel', close, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', close)
      window.removeEventListener('blur', close)
      window.removeEventListener('resize', close)
      window.removeEventListener('wheel', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])

  // Держим меню рядом с курсором и в пределах окна. Координаты из нативного
  // события приходят в физических пикселях, а CSS position:fixed работает в
  // CSS-пикселях — при зуме (fontScale) их надо разделить на коэффициент зума,
  // иначе меню «уезжает» от курсора в угол.
  useLayoutEffect(() => {
    if (!menu || !ref.current) return
    const zoom = window.api.getZoom?.() || 1
    const cx = menu.x / zoom
    const cy = menu.y / zoom
    const r = ref.current.getBoundingClientRect()
    const pad = 6
    const left = Math.min(cx, window.innerWidth - r.width - pad)
    const top = Math.min(cy, window.innerHeight - r.height - pad)
    setPos({ left: Math.max(pad, left), top: Math.max(pad, top) })
  }, [menu])

  if (!menu) return null

  const hasSpelling = !!menu.misspelledWord
  const hasEditing = menu.isEditable || !!menu.selectionText
  if (!hasSpelling && !hasEditing) return null

  const act = (fn: () => void): void => {
    fn()
    setMenu(null)
  }

  const itemCls =
    'flex w-full items-center justify-between gap-3 rounded px-2.5 py-1.5 text-left text-sm text-ink-brown hover:bg-accent/15 hover:text-accent'

  return createPortal(
    <div
      ref={ref}
      // preventDefault сохраняет выделение/фокус в поле ввода (чтобы
      // replaceMisspelling / cut / copy сработали по нужному месту), а
      // stopPropagation не даёт глобальному «закрытию по mousedown» убрать
      // меню раньше, чем сработает onClick кнопки.
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      // position/zIndex заданы инлайном намеренно: класс .parchment-texture
      // объявляет position: relative и иначе перебивает Tailwind-класс `fixed`,
      // из-за чего меню уезжало в поток документа далеко от курсора.
      style={{ position: 'fixed', zIndex: 200, left: pos.left, top: pos.top }}
      className="parchment-texture min-w-[200px] max-w-[320px] rounded-lg border border-accent/40 bg-parchment p-1 shadow-panel"
    >
      {hasSpelling && (
        <>
          {menu.suggestions.length > 0 ? (
            menu.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => act(() => window.api.spell.replace(s))}
                className={`${itemCls} font-serif font-semibold`}
              >
                {s}
              </button>
            ))
          ) : (
            <div className="px-2.5 py-1.5 text-sm italic text-ink-brown/40">Нет вариантов</div>
          )}
          <div className="my-1 border-t border-ink-brown/15" />
          <button
            onClick={() => act(() => window.api.spell.addWord(menu.misspelledWord))}
            className={itemCls}
          >
            <span>Добавить в словарь</span>
            <span className="truncate text-xs text-ink-brown/40">«{menu.misspelledWord}»</span>
          </button>
          {hasEditing && <div className="my-1 border-t border-ink-brown/15" />}
        </>
      )}

      {menu.isEditable ? (
        <>
          <button
            disabled={!menu.canCut}
            onClick={() => act(() => window.api.spell.edit('cut'))}
            className={`${itemCls} disabled:cursor-default disabled:text-ink-brown/30 disabled:hover:bg-transparent`}
          >
            Вырезать
          </button>
          <button
            disabled={!menu.canCopy}
            onClick={() => act(() => window.api.spell.edit('copy'))}
            className={`${itemCls} disabled:cursor-default disabled:text-ink-brown/30 disabled:hover:bg-transparent`}
          >
            Копировать
          </button>
          <button
            disabled={!menu.canPaste}
            onClick={() => act(() => window.api.spell.edit('paste'))}
            className={`${itemCls} disabled:cursor-default disabled:text-ink-brown/30 disabled:hover:bg-transparent`}
          >
            Вставить
          </button>
          <button onClick={() => act(() => window.api.spell.edit('selectAll'))} className={itemCls}>
            Выделить всё
          </button>
        </>
      ) : (
        menu.selectionText && (
          <button onClick={() => act(() => window.api.spell.edit('copy'))} className={itemCls}>
            Копировать
          </button>
        )
      )}
    </div>,
    document.body
  )
}
