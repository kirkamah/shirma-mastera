import { useCallback, useEffect, useState } from 'react'

export interface CustomBase {
  key: string
  name: string
}

/** Loads/saves/deletes user-created content of a given kind via the IPC bridge. */
export function useCustom<T extends CustomBase>(kind: string): {
  items: T[]
  reload: () => void
  save: (entry: T) => Promise<void>
  remove: (key: string) => Promise<void>
} {
  const [items, setItems] = useState<T[]>([])

  const reload = useCallback(() => {
    window.api.db.listCustom<T>(kind).then(setItems)
  }, [kind])

  useEffect(reload, [reload])

  const save = useCallback(
    async (entry: T) => {
      await window.api.db.saveCustom(kind, entry)
      reload()
    },
    [kind, reload]
  )

  const remove = useCallback(
    async (key: string) => {
      await window.api.db.deleteCustom(key)
      reload()
    },
    [reload]
  )

  return { items, reload, save, remove }
}
