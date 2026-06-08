import { useCallback, useMemo } from 'react'
import { useCustom } from './useCustom'
import { uid } from '../utils/monster'
import type { ContentBase, ContentType, UserContentState } from '../data/toolkit/types'

/** Конверт + флаг избранного (вычисляется из toolkit_state). */
export type ToolkitItem<D> = ContentBase<D> & { favorite: boolean }

/** Состояние «юзер ↔ контент» в БД: контракту useCustom нужны key+name. */
type StoredState = UserContentState & { key: string; name: string }

/**
 * Единый доступ к контенту тулкита одного типа: официальный сид (read-only) +
 * пользовательские конверты из custom_content, плюс форк и избранное.
 *
 * `official` — бандл-сид (массив конвертов с source:'official'). Сливается с
 * пользовательскими записями того же типа; форки официальных карточек получают
 * новый key и source:'user', поэтому в merge просто дописываются в конец.
 */
export function useToolkit<D>(
  type: ContentType,
  official: ContentBase<D>[] = []
): {
  items: ToolkitItem<D>[]
  saveUser: (entry: ContentBase<D>) => Promise<void>
  remove: (key: string) => Promise<void>
  fork: (item: ContentBase<D>) => Promise<string>
  toggleFavorite: (contentId: string) => void
  reload: () => void
} {
  const { items: user, save, remove, reload } = useCustom<ContentBase<D>>(type)
  const { items: states, save: saveState } = useCustom<StoredState>('toolkit_state')

  const favSet = useMemo(
    () => new Set(states.filter((s) => s.favorite).map((s) => s.contentId)),
    [states]
  )

  const items = useMemo<ToolkitItem<D>[]>(() => {
    const merged: ContentBase<D>[] = [
      ...official.map((o) => ({ ...o, source: 'official' as const })),
      ...user.map((u) => ({ ...u, source: 'user' as const }))
    ]
    return merged.map((c) => ({ ...c, favorite: favSet.has(c.key) }))
  }, [official, user, favSet])

  const saveUser = useCallback(
    (entry: ContentBase<D>) => save({ ...entry, source: 'user' }),
    [save]
  )

  // «Сделать своим»: глубокая копия официальной карточки в новый user-конверт.
  const fork = useCallback(
    async (item: ContentBase<D>): Promise<string> => {
      const key = uid(`c-${type}`)
      const name = /\(копия\)/i.test(item.name) ? item.name : `${item.name} (копия)`
      await save({ ...item, key, source: 'user', forkedFrom: item.key, name })
      return key
    },
    [save, type]
  )

  const toggleFavorite = useCallback(
    (contentId: string): void => {
      const cur = states.find((s) => s.contentId === contentId)
      saveState({ key: contentId, name: contentId, contentId, favorite: !cur?.favorite, notes: cur?.notes, lastUsedAt: cur?.lastUsedAt })
    },
    [states, saveState]
  )

  return { items, saveUser, remove, fork, toggleFavorite, reload }
}
