// A small fixed palette for monster folders. Each colour is an RGB triplet used
// only as a low-opacity tint / border over the current parchment background, so
// it automatically harmonises with whatever theme palette is active (dark,
// light, blue, ember, forest) without needing per-palette overrides — the hue
// stays recognisable but always sits in the page's tone.

export type FolderColorKey = 'slate' | 'red' | 'amber' | 'green' | 'blue' | 'violet'

export interface FolderColor {
  key: FolderColorKey
  name: string
  rgb: string
}

export const FOLDER_COLORS: FolderColor[] = [
  { key: 'slate', name: 'Серый', rgb: '120 124 134' },
  { key: 'red', name: 'Красный', rgb: '178 60 56' },
  { key: 'amber', name: 'Янтарный', rgb: '186 132 50' },
  { key: 'green', name: 'Зелёный', rgb: '72 132 84' },
  { key: 'blue', name: 'Синий', rgb: '64 108 162' },
  { key: 'violet', name: 'Фиолетовый', rgb: '132 86 162' }
]

export const DEFAULT_FOLDER_COLOR: FolderColorKey = 'slate'

export function folderRgb(key: FolderColorKey): string {
  return (FOLDER_COLORS.find((c) => c.key === key) ?? FOLDER_COLORS[0]).rgb
}

/** A tint of the folder colour at the given alpha, for backgrounds/borders. */
export function folderTint(key: FolderColorKey, alpha: number): string {
  return `rgb(${folderRgb(key)} / ${alpha})`
}
