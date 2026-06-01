import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Edition, Language } from '@shared/types'

export type Palette = 'dark' | 'light' | 'blue' | 'ember' | 'forest'

interface SettingsState {
  /** Fixed to the 2024 ruleset — the app no longer exposes an edition switch. */
  edition: Edition
  language: Language
  palette: Palette
  sound: boolean
  fontScale: number
  texture: boolean
  devMode: boolean
  setPalette: (p: Palette) => void
  setLanguage: (l: Language) => void
  toggleLanguage: () => void
  setSound: (v: boolean) => void
  setFontScale: (v: number) => void
  setTexture: (v: boolean) => void
  setDevMode: (v: boolean) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      edition: '5e-2024',
      language: 'ru',
      palette: 'dark',
      sound: true,
      fontScale: 1,
      texture: true,
      devMode: false,
      setPalette: (palette) => set({ palette }),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set({ language: get().language === 'ru' ? 'en' : 'ru' }),
      setSound: (sound) => set({ sound }),
      setFontScale: (fontScale) => set({ fontScale }),
      setTexture: (texture) => set({ texture }),
      setDevMode: (devMode) => set({ devMode })
    }),
    {
      name: 'shirma-settings',
      // Force the edition to 2024 even if an older value was persisted.
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<SettingsState>),
        edition: '5e-2024'
      })
    }
  )
)
