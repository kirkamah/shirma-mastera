import { create } from 'zustand'
import {
  setCustomBuilds,
  CUSTOM_RACE_KIND,
  CUSTOM_CLASS_KIND,
  CUSTOM_BACKGROUND_KIND
} from '../data/custom-builds'
import type { RaceBuild, ClassBuild, BackgroundBuild } from '../data/character-build'

interface CustomBuildsState {
  races: RaceBuild[]
  classes: ClassBuild[]
  backgrounds: BackgroundBuild[]
  loaded: boolean
  reload: () => Promise<void>
}

/** Holds the user's custom race/class/background definitions, kept in sync with
 *  the module-level registry (custom-builds.ts) that deriveSheet reads. */
export const useCustomBuilds = create<CustomBuildsState>((set) => ({
  races: [],
  classes: [],
  backgrounds: [],
  loaded: false,
  reload: async () => {
    const [races, classes, backgrounds] = await Promise.all([
      window.api.db.listCustom<RaceBuild>(CUSTOM_RACE_KIND),
      window.api.db.listCustom<ClassBuild>(CUSTOM_CLASS_KIND),
      window.api.db.listCustom<BackgroundBuild>(CUSTOM_BACKGROUND_KIND)
    ])
    setCustomBuilds(races, classes, backgrounds)
    set({ races, classes, backgrounds, loaded: true })
  }
}))
