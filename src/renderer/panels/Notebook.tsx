import { useCallback, type JSX, type PointerEvent as ReactPointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { GiNotebook, GiCrossedSwords, GiDiceTwentyFacesTwenty, GiOpenBook } from 'react-icons/gi'
import { useUi, type NotebookTab } from '../store/ui'
import ErrorBoundary from '../components/ErrorBoundary'
import NotesTab from './NotesTab'
import InitiativeTab from './InitiativeTab'
import RollLogTab from './RollLogTab'

const TABS: { id: NotebookTab; icon: IconType; key: string }[] = [
  { id: 'notes', icon: GiNotebook, key: 'notebook.notes' },
  { id: 'initiative', icon: GiCrossedSwords, key: 'notebook.initiative' },
  { id: 'rolls', icon: GiDiceTwentyFacesTwenty, key: 'notebook.rolls' }
]

export default function Notebook(): JSX.Element {
  const { t } = useTranslation()
  const { notebookOpen, notebookTab, notebookWidth, toggleNotebook, setNotebookTab, setNotebookWidth } = useUi()

  // Drag the left edge of the panel to resize. Width grows when pointer moves
  // left (panel is on the right side of the screen).
  const startResize = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault()
      const startX = e.clientX
      const startW = notebookWidth
      const move = (ev: PointerEvent): void => {
        setNotebookWidth(startW + (startX - ev.clientX))
      }
      const up = (): void => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    },
    [notebookWidth, setNotebookWidth]
  )

  return (
    <>
      {/* Edge tab button (always visible) */}
      <button
        onClick={toggleNotebook}
        className="absolute top-1/2 z-30 -translate-y-1/2 rounded-l-lg border border-r-0 border-accent/50 bg-sidebar px-1.5 py-4 text-2xl shadow-panel transition-colors hover:bg-accent/30"
        title={t('notebook.title')}
        style={{ right: notebookOpen ? notebookWidth : 0 }}
      >
        <GiOpenBook />
      </button>

      <aside
        className="absolute right-0 top-0 z-20 flex h-full flex-col border-l border-black/40 bg-sidebar shadow-panel transition-[transform,width] duration-200 ease-out"
        style={{ width: notebookWidth, transform: notebookOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Left-edge drag handle to widen/narrow the panel. */}
        {notebookOpen && (
          <div
            role="separator"
            aria-orientation="vertical"
            onPointerDown={startResize}
            onDoubleClick={() => setNotebookWidth(360)}
            title="Потяните, чтобы изменить ширину Записной книжки · двойной клик — по умолчанию"
            className="group absolute inset-y-0 -left-1.5 z-30 w-3 cursor-col-resize"
          >
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-gold/30 transition-colors group-hover:bg-gold/90" />
          </div>
        )}

        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <h2 className="font-serif text-lg font-semibold text-parchment">{t('notebook.title')}</h2>
          <button onClick={toggleNotebook} className="text-parchment/50 hover:text-parchment" title={t('common.close')}>
            ✕
          </button>
        </div>

        <div className="flex border-b border-white/10">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
            <button
              key={tab.id}
              onClick={() => setNotebookTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
                notebookTab === tab.id ? 'bg-accent/80 text-white' : 'text-parchment/60 hover:bg-white/5'
              }`}
            >
              <Icon className="text-sm" />
              {t(tab.key)}
            </button>
            )
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ErrorBoundary name="Notebook">
            {notebookTab === 'notes' && <NotesTab />}
            {notebookTab === 'initiative' && <InitiativeTab />}
            {notebookTab === 'rolls' && <RollLogTab />}
          </ErrorBoundary>
        </div>
      </aside>
    </>
  )
}
