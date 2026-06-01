import { useMemo, useRef, useState, type JSX, type DragEvent } from 'react'
import { GiFullFolder, GiTrashCan } from 'react-icons/gi'
import type { StatBlock } from '@shared/types'
import type { SortMode } from '../utils/filters'
import MonsterTile from './MonsterTile'
import { FOLDER_COLORS, folderRgb, folderTint, type FolderColorKey } from '../data/folder-colors'
import { useMonsterFolders, type DropPos, type MonsterFolder } from '../hooks/useMonsterFolders'
import { confirmDialog, promptDialog } from '../store/dialog'

interface Props {
  monsters: StatBlock[]
  selectedKey?: string
  onSelect: (m: StatBlock) => void
  sort?: SortMode
}

type Drag = { kind: 'monster'; key: string } | { kind: 'folder'; id: string } | null

const gridStyle = { gridTemplateColumns: 'repeat(auto-fill, 10.5rem)', justifyContent: 'start' } as const

export default function MonsterFolders({ monsters, selectedKey, onSelect }: Props): JSX.Element {
  const fs = useMonsterFolders()
  const drag = useRef<Drag>(null)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [dropHint, setDropHint] = useState<{ id: string; pos: DropPos } | null>(null)
  const [crumbHint, setCrumbHint] = useState<string | null>(null) // crumb id ('' = root) being hovered
  const [colorFor, setColorFor] = useState<string | null>(null)

  const folderById = (id: string | null): MonsterFolder | undefined =>
    id ? fs.data.folders.find((f) => f.id === id) : undefined

  // If the current folder was deleted elsewhere, fall back to root.
  const current = currentId && !folderById(currentId) ? null : currentId

  // Bucket all visible monsters by their assigned folder (deep counts need the
  // whole map, not just the current level).
  const byFolder = useMemo(() => {
    const folderIds = new Set(fs.data.folders.map((f) => f.id))
    const map = new Map<string | null, StatBlock[]>()
    for (const m of monsters) {
      const fid = fs.data.assign[m.key]
      const bucket = fid && folderIds.has(fid) ? fid : null
      if (!map.has(bucket)) map.set(bucket, [])
      map.get(bucket)!.push(m)
    }
    return map
  }, [monsters, fs.data])

  const deepCount = (id: string): number => {
    let n = byFolder.get(id)?.length ?? 0
    for (const c of fs.childFolders(id)) n += deepCount(c.id)
    return n
  }

  // Breadcrumb path root→current.
  const path: MonsterFolder[] = []
  {
    let cur = folderById(current)
    while (cur) {
      path.unshift(cur)
      cur = folderById(cur.parentId)
    }
  }

  const childFolders = fs.childFolders(current)
  const monstersHere = byFolder.get(current) ?? []

  // ---- drag-and-drop ----
  const onMonsterDragStart = (key: string) => (e: DragEvent): void => {
    drag.current = { kind: 'monster', key }
    e.dataTransfer.effectAllowed = 'move'
  }
  const onFolderDragStart = (id: string) => (e: DragEvent): void => {
    drag.current = { kind: 'folder', id }
    e.dataTransfer.effectAllowed = 'move'
  }
  const endDrag = (): void => {
    drag.current = null
    setDropHint(null)
    setCrumbHint(null)
  }

  const folderTileDragOver = (folder: MonsterFolder) => (e: DragEvent): void => {
    const d = drag.current
    if (!d) return
    e.preventDefault()
    if (d.kind === 'monster') {
      setDropHint({ id: folder.id, pos: 'inside' })
      return
    }
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const rel = (e.clientX - r.left) / r.width
    const pos: DropPos = rel < 0.33 ? 'before' : rel > 0.66 ? 'after' : 'inside'
    setDropHint({ id: folder.id, pos })
  }

  const folderTileDrop = (folder: MonsterFolder) => (e: DragEvent): void => {
    e.preventDefault()
    const d = drag.current
    const hint = dropHint
    if (d?.kind === 'monster') fs.moveMonster(d.key, folder.id)
    else if (d?.kind === 'folder' && hint) fs.moveFolder(d.id, folder.id, hint.pos)
    endDrag()
  }

  // Crumb drop: id === '' means root.
  const crumbDrop = (id: string) => (e: DragEvent): void => {
    e.preventDefault()
    const d = drag.current
    if (d?.kind === 'monster') fs.moveMonster(d.key, id || null)
    else if (d?.kind === 'folder') id ? fs.moveFolder(d.id, id, 'inside') : fs.moveFolderToRoot(d.id)
    endDrag()
  }

  const renameFolder = async (folder: MonsterFolder): Promise<void> => {
    const name = await promptDialog({ title: 'Переименовать папку', message: 'Название папки:', defaultValue: folder.name })
    if (name && name.trim()) fs.renameFolder(folder.id, name.trim())
  }
  const deleteFolder = async (folder: MonsterFolder): Promise<void> => {
    const ok = await confirmDialog({
      title: 'Удалить папку',
      message: `Удалить папку «${folder.name}»? Вложенные папки тоже удалятся, а монстры вернутся в общий список.`,
      danger: true,
      confirmText: 'Удалить'
    })
    if (ok) fs.deleteFolder(folder.id)
  }

  const monsterTile = (m: StatBlock): JSX.Element => (
    <div key={m.key} draggable onDragStart={onMonsterDragStart(m.key)} onDragEnd={endDrag} className="cursor-grab active:cursor-grabbing">
      <MonsterTile monster={m} selected={selectedKey === m.key} picked={false} onSelect={onSelect} />
    </div>
  )

  const folderTile = (folder: MonsterFolder): JSX.Element => {
    const hint = dropHint?.id === folder.id ? dropHint.pos : null
    const c = folder.color
    return (
      <div
        key={folder.id}
        draggable
        onDragStart={onFolderDragStart(folder.id)}
        onDragEnd={endDrag}
        onDragOver={folderTileDragOver(folder)}
        onDragLeave={() => setDropHint((h) => (h?.id === folder.id ? null : h))}
        onDrop={folderTileDrop(folder)}
        onClick={() => setCurrentId(folder.id)}
        title={`${folder.name} — открыть`}
        className={`group relative flex h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border p-2 text-center transition-all hover:-translate-y-0.5 ${
          hint === 'inside' ? 'ring-2 ring-accent' : ''
        }`}
        style={{
          backgroundColor: folderTint(c, 0.18),
          borderColor: folderTint(c, 0.55),
          borderLeft: hint === 'before' ? '3px solid rgb(var(--c-accent))' : undefined,
          borderRight: hint === 'after' ? '3px solid rgb(var(--c-accent))' : undefined
        }}
      >
        <span className="absolute right-1 top-1 rounded-full bg-ink-brown/15 px-1.5 text-[10px] font-bold text-ink-brown/70">{deepCount(folder.id)}</span>
        <GiFullFolder size={38} style={{ color: `rgb(${folderRgb(c)})` }} />
        <div className="line-clamp-2 w-full px-1 font-serif text-[12px] font-semibold leading-tight text-ink-brown" title={folder.name}>
          {folder.name}
        </div>

        {/* hover actions */}
        <div className="absolute left-1 top-1 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation()
              renameFolder(folder)
            }}
            title="Переименовать"
            className="rounded bg-parchment/80 px-1 text-[11px] text-ink-brown hover:bg-parchment"
          >
            ✎
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setColorFor(colorFor === folder.id ? null : folder.id)
            }}
            title="Цвет папки"
            className="rounded bg-parchment/80 px-0.5 hover:bg-parchment"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-ink-brown/30" style={{ backgroundColor: folderTint(c, 0.9) }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteFolder(folder)
            }}
            title="Удалить папку"
            className="rounded bg-parchment/80 px-1 text-[11px] text-accent hover:bg-parchment"
          >
            <GiTrashCan />
          </button>
        </div>
      </div>
    )
  }

  const colorTarget = colorFor ? folderById(colorFor) : undefined

  return (
    <div className="space-y-2">
      {/* Breadcrumb + create */}
      <div className="flex flex-wrap items-center gap-1 text-sm">
        {[{ id: '', name: 'Все монстры' }, ...path].map((crumb, i, arr) => {
          const isLast = i === arr.length - 1
          const hot = crumbHint === crumb.id
          return (
            <span key={crumb.id || 'root'} className="flex items-center gap-1">
              {i > 0 && <span className="text-ink-brown/40">›</span>}
              <button
                onClick={() => setCurrentId(crumb.id || null)}
                onDragOver={(e) => {
                  if (drag.current) {
                    e.preventDefault()
                    setCrumbHint(crumb.id)
                  }
                }}
                onDragLeave={() => setCrumbHint((h) => (h === crumb.id ? null : h))}
                onDrop={crumbDrop(crumb.id)}
                className={`rounded px-1.5 py-0.5 ${hot ? 'bg-accent/20 ring-1 ring-accent' : ''} ${
                  isLast ? 'font-semibold text-accent' : 'text-ink-brown/70 hover:text-accent'
                }`}
              >
                {crumb.name}
              </button>
            </span>
          )
        })}
        <button
          onClick={() => fs.addFolder(current)}
          className="ml-2 rounded border border-accent/50 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent hover:bg-accent/20"
        >
          ＋ Папка
        </button>
        <span className="text-[11px] text-ink-brown/45">Перетаскивайте монстров и папки мышью</span>
      </div>

      {/* Colour picker panel */}
      {colorTarget && (
        <div className="flex items-center gap-2 rounded border border-ink-brown/20 bg-parchment/50 px-2 py-1.5">
          <span className="text-xs text-ink-brown/70">Цвет «{colorTarget.name}»:</span>
          {FOLDER_COLORS.map((fc) => (
            <button
              key={fc.key}
              onClick={() => {
                fs.setColor(colorTarget.id, fc.key as FolderColorKey)
                setColorFor(null)
              }}
              title={fc.name}
              className={`h-5 w-5 rounded-full border ${colorTarget.color === fc.key ? 'ring-2 ring-accent' : 'border-ink-brown/30'}`}
              style={{ backgroundColor: `rgb(${fc.rgb})` }}
            />
          ))}
          <button onClick={() => setColorFor(null)} className="ml-auto text-xs text-ink-brown/50 hover:text-accent">
            ✕
          </button>
        </div>
      )}

      {/* Grid: folders first, then monsters in this folder */}
      {childFolders.length === 0 && monstersHere.length === 0 ? (
        <p className="px-1 py-6 text-center text-sm italic text-ink-brown/45">
          {current ? 'Папка пуста — перетащите сюда монстров или создайте подпапку.' : 'Перетащите монстров в папки или создайте папку.'}
        </p>
      ) : (
        <div className="grid gap-2 p-1" style={gridStyle}>
          {childFolders.map(folderTile)}
          {monstersHere.map(monsterTile)}
        </div>
      )}
    </div>
  )
}
