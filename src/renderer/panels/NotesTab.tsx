import { useCallback, useEffect, useRef, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiTrashCan } from 'react-icons/gi'
import { confirmDialog, promptDialog } from '../store/dialog'

const AUTOSAVE_MS = 30000

interface NotePage {
  id: string
  title: string
  html: string
}

const uid = (): string => Math.random().toString(36).slice(2)

function parsePages(raw: string): NotePage[] {
  if (!raw) return [{ id: uid(), title: 'Главная', html: '' }]
  try {
    const data = JSON.parse(raw)
    if (Array.isArray(data) && data.length && data[0].title != null) return data as NotePage[]
  } catch {
    /* legacy single-note HTML */
  }
  return [{ id: uid(), title: 'Главная', html: raw }]
}

const WIKI_RE = /\[\[([^\]]+)\]\]/g

export default function NotesTab(): JSX.Element {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<NotePage[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [links, setLinks] = useState<string[]>([])
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const pagesRef = useRef<NotePage[]>([])
  pagesRef.current = pages

  const computeLinks = useCallback((html: string): void => {
    const found = new Set<string>()
    let m: RegExpExecArray | null
    WIKI_RE.lastIndex = 0
    while ((m = WIKI_RE.exec(html))) found.add(m[1].trim())
    setLinks([...found])
  }, [])

  // Flush the editor's current HTML into the active page (in memory).
  const flush = useCallback((): NotePage[] => {
    const html = ref.current?.innerHTML ?? ''
    const next = pagesRef.current.map((p) => (p.id === activeId ? { ...p, html } : p))
    pagesRef.current = next
    return next
  }, [activeId])

  const persist = useCallback((next: NotePage[]): void => {
    window.api.db.saveNotes(JSON.stringify(next))
    setSavedAt(Date.now())
  }, [])

  // Initial load.
  useEffect(() => {
    window.api.db.getNotes().then((raw) => {
      const p = parsePages(raw)
      setPages(p)
      setActiveId(p[0].id)
    })
  }, [])

  // When the active page changes, load its HTML into the editor.
  useEffect(() => {
    const page = pages.find((p) => p.id === activeId)
    if (page && ref.current) {
      ref.current.innerHTML = page.html
      computeLinks(page.html)
    }
  }, [activeId]) // eslint-disable-line react-hooks/exhaustive-deps

  const save = useCallback((): void => {
    persist(flush())
  }, [flush, persist])

  // Autosave + save on unmount.
  useEffect(() => {
    const id = setInterval(save, AUTOSAVE_MS)
    return () => {
      clearInterval(id)
      save()
    }
  }, [save])

  const switchTo = (id: string): void => {
    setPages(flush())
    setActiveId(id)
  }

  const addPage = (title = 'Новая страница'): string => {
    const flushed = flush()
    const page = { id: uid(), title, html: '' }
    const next = [...flushed, page]
    setPages(next)
    setActiveId(page.id)
    persist(next)
    return page.id
  }

  const renamePage = async (): Promise<void> => {
    const title = await promptDialog({
      title: 'Переименовать страницу',
      message: 'Название страницы:',
      defaultValue: pages.find((p) => p.id === activeId)?.title
    })
    if (!title) return
    const next = flush().map((p) => (p.id === activeId ? { ...p, title } : p))
    setPages(next)
    persist(next)
  }

  const deletePage = async (): Promise<void> => {
    if (pages.length <= 1) return
    if (!(await confirmDialog({ title: 'Удалить страницу', message: 'Удалить эту страницу?', danger: true, confirmText: 'Удалить' }))) return
    const next = pagesRef.current.filter((p) => p.id !== activeId)
    setPages(next)
    setActiveId(next[0].id)
    persist(next)
  }

  const openWiki = (title: string): void => {
    const flushed = flush()
    const existing = flushed.find((p) => p.title.toLowerCase() === title.toLowerCase())
    if (existing) {
      setPages(flushed)
      setActiveId(existing.id)
    } else {
      addPage(title)
    }
  }

  const exec = (cmd: string, value?: string): void => {
    document.execCommand(cmd, false, value)
    ref.current?.focus()
  }

  return (
    <div className="flex h-full flex-col">
      {/* Page selector */}
      <div className="flex items-center gap-1 border-b border-white/10 p-2">
        <select
          value={activeId}
          onChange={(e) => switchTo(e.target.value)}
          className="min-w-0 flex-1 rounded border border-white/15 bg-ink px-2 py-1 text-xs text-parchment"
        >
          {pages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <button onClick={() => addPage()} title="Новая страница" className="rounded border border-white/15 px-2 py-1 text-xs hover:bg-white/10">＋</button>
        <button onClick={renamePage} title="Переименовать" className="rounded border border-white/15 px-2 py-1 text-xs hover:bg-white/10">✎</button>
        <button onClick={deletePage} title="Удалить страницу" className="rounded border border-white/15 px-2 py-1 text-xs text-accent hover:bg-white/10"><GiTrashCan /></button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
        <ToolBtn onClick={() => exec('bold')} label="Ж" bold />
        <ToolBtn onClick={() => exec('italic')} label="К" italic />
        <ToolBtn onClick={() => exec('formatBlock', '<h3>')} label="H" />
        <ToolBtn onClick={() => exec('insertUnorderedList')} label="• —" />
        <ToolBtn onClick={() => exec('insertOrderedList')} label="1." />
        <ToolBtn onClick={() => exec('removeFormat')} label="⌫" />
      </div>

      <div
        ref={ref}
        contentEditable
        onInput={() => computeLinks(ref.current?.innerHTML ?? '')}
        onBlur={save}
        data-placeholder={`${t('notebook.notesPlaceholder')}  Свяжите страницы через [[Название]].`}
        className="prose-notes min-h-0 flex-1 overflow-y-auto p-3 text-sm leading-relaxed text-parchment focus:outline-none"
        suppressContentEditableWarning
      />

      {/* Wiki links found on this page */}
      {links.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 border-t border-white/10 p-2">
          <span className="text-[11px] text-parchment/40">Связи:</span>
          {links.map((l) => (
            <button key={l} onClick={() => openWiki(l)} className="rounded-full bg-accent/25 px-2 py-0.5 text-xs text-parchment hover:bg-accent/40">
              {l}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-white/10 px-3 py-1 text-right text-xs text-parchment/40">
        {savedAt ? `✓ ${t('notebook.saved')}` : ''}
      </div>
    </div>
  )
}

function ToolBtn({ onClick, label, bold, italic }: { onClick: () => void; label: string; bold?: boolean; italic?: boolean }): JSX.Element {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`rounded border border-white/15 px-2 py-1 text-xs text-parchment/80 hover:bg-white/10 ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''}`}
    >
      {label}
    </button>
  )
}
