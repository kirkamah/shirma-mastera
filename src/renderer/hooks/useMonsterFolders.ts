import { useCallback, useEffect, useRef, useState } from 'react'
import { uid } from '../utils/monster'
import { DEFAULT_FOLDER_COLOR, type FolderColorKey } from '../data/folder-colors'

const KV_KEY = 'monster-folders'

export interface MonsterFolder {
  id: string
  name: string
  color: FolderColorKey
  parentId: string | null
  order: number
}

export interface FolderData {
  folders: MonsterFolder[]
  /** monsterKey → folderId. Absent ⇒ monster lives at the root (unfiled). */
  assign: Record<string, string>
}

export type DropPos = 'before' | 'inside' | 'after'

const EMPTY: FolderData = { folders: [], assign: {} }

/** Folder tree for «Мои монстры», persisted as JSON in the kv table. Pure
 *  in-memory tree ops (nest / reorder / move) with cycle protection. */
export function useMonsterFolders(): {
  data: FolderData
  ready: boolean
  childFolders: (parentId: string | null) => MonsterFolder[]
  addFolder: (parentId: string | null) => void
  renameFolder: (id: string, name: string) => void
  setColor: (id: string, color: FolderColorKey) => void
  deleteFolder: (id: string) => void
  moveMonster: (monsterKey: string, folderId: string | null) => void
  moveFolder: (dragId: string, targetId: string, pos: DropPos) => void
  moveFolderToRoot: (dragId: string) => void
} {
  const [data, setData] = useState<FolderData>(EMPTY)
  const [ready, setReady] = useState(false)
  const loaded = useRef(false)

  useEffect(() => {
    window.api.db.getKv(KV_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as FolderData
          if (parsed && Array.isArray(parsed.folders)) setData({ folders: parsed.folders, assign: parsed.assign ?? {} })
        } catch {
          /* corrupt → start empty */
        }
      }
      loaded.current = true
      setReady(true)
    })
  }, [])

  // Persist after every change (but not before the initial load completes).
  useEffect(() => {
    if (!loaded.current) return
    window.api.db.setKv(KV_KEY, JSON.stringify(data))
  }, [data])

  const childFolders = useCallback(
    (parentId: string | null): MonsterFolder[] =>
      data.folders.filter((f) => f.parentId === parentId).sort((a, b) => a.order - b.order),
    [data.folders]
  )

  const addFolder = useCallback((parentId: string | null): void => {
    setData((d) => {
      const siblings = d.folders.filter((f) => f.parentId === parentId)
      const order = siblings.length ? Math.max(...siblings.map((s) => s.order)) + 1 : 0
      const folder: MonsterFolder = { id: uid('fld'), name: 'Новая папка', color: DEFAULT_FOLDER_COLOR, parentId, order }
      return { ...d, folders: [...d.folders, folder] }
    })
  }, [])

  const renameFolder = useCallback((id: string, name: string): void => {
    setData((d) => ({ ...d, folders: d.folders.map((f) => (f.id === id ? { ...f, name } : f)) }))
  }, [])

  const setColor = useCallback((id: string, color: FolderColorKey): void => {
    setData((d) => ({ ...d, folders: d.folders.map((f) => (f.id === id ? { ...f, color } : f)) }))
  }, [])

  const deleteFolder = useCallback((id: string): void => {
    setData((d) => {
      // Gather the whole subtree to remove.
      const toRemove = new Set<string>()
      const walk = (fid: string): void => {
        toRemove.add(fid)
        d.folders.filter((f) => f.parentId === fid).forEach((c) => walk(c.id))
      }
      walk(id)
      const folders = d.folders.filter((f) => !toRemove.has(f.id))
      // Monsters in any removed folder fall back to the root (unfiled).
      const assign: Record<string, string> = {}
      for (const [k, v] of Object.entries(d.assign)) if (!toRemove.has(v)) assign[k] = v
      return { folders, assign }
    })
  }, [])

  const moveMonster = useCallback((monsterKey: string, folderId: string | null): void => {
    setData((d) => {
      const assign = { ...d.assign }
      if (folderId) assign[monsterKey] = folderId
      else delete assign[monsterKey]
      return { ...d, assign }
    })
  }, [])

  const moveFolder = useCallback((dragId: string, targetId: string, pos: DropPos): void => {
    if (dragId === targetId) return
    setData((d) => {
      const target = d.folders.find((f) => f.id === targetId)
      const drag = d.folders.find((f) => f.id === dragId)
      if (!target || !drag) return d
      // Reject moving a folder into its own descendant (would orphan a cycle).
      const isDescendant = (ancestor: string, node: string): boolean => {
        let cur: string | null = node
        while (cur) {
          if (cur === ancestor) return true
          cur = d.folders.find((f) => f.id === cur)?.parentId ?? null
        }
        return false
      }
      if (isDescendant(dragId, targetId)) return d

      const newParent = pos === 'inside' ? target.id : target.parentId
      // Build the sibling list under newParent, excluding the dragged folder,
      // ordered, then splice the dragged folder into place.
      const siblings = d.folders
        .filter((f) => f.parentId === newParent && f.id !== dragId)
        .sort((a, b) => a.order - b.order)
      let insertAt: number
      if (pos === 'inside') {
        insertAt = siblings.length
      } else {
        const ti = siblings.findIndex((f) => f.id === targetId)
        insertAt = pos === 'before' ? ti : ti + 1
      }
      siblings.splice(insertAt, 0, { ...drag, parentId: newParent })
      const reindexed = new Map<string, number>()
      siblings.forEach((f, i) => reindexed.set(f.id, i))
      const folders = d.folders.map((f) => {
        if (f.id === dragId) return { ...f, parentId: newParent, order: reindexed.get(dragId) ?? 0 }
        if (reindexed.has(f.id)) return { ...f, order: reindexed.get(f.id)! }
        return f
      })
      return { ...d, folders }
    })
  }, [])

  const moveFolderToRoot = useCallback((dragId: string): void => {
    setData((d) => {
      const drag = d.folders.find((f) => f.id === dragId)
      if (!drag || drag.parentId === null) return d
      const roots = d.folders.filter((f) => f.parentId === null && f.id !== dragId)
      const order = roots.length ? Math.max(...roots.map((s) => s.order)) + 1 : 0
      return { ...d, folders: d.folders.map((f) => (f.id === dragId ? { ...f, parentId: null, order } : f)) }
    })
  }, [])

  return { data, ready, childFolders, addFolder, renameFolder, setColor, deleteFolder, moveMonster, moveFolder, moveFolderToRoot }
}
