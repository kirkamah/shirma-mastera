import type { IconType } from 'react-icons'
import {
  GiDragonHead,
  GiSpellBook,
  GiKnapsack,
  GiScrollQuill,
  GiCharacter,
  GiBookCover
} from 'react-icons/gi'

/** One destination inside a hub (a former top-level page). */
export interface HubRoute {
  to: string
  /** i18n key for the tab label */
  key: string
}

/** A sidebar hub: a themed group of related pages shown as inner tabs. */
export interface Hub {
  id: string
  icon: IconType
  /** i18n key for the hub's sidebar label */
  key: string
  routes: HubRoute[]
}

/** Sidebar structure: 6 hubs, each grouping the related pages it owns. The first
 *  route is the hub's landing page. Single-route hubs render no inner tabs. */
export const HUBS: Hub[] = [
  {
    id: 'bestiary',
    icon: GiDragonHead,
    key: 'hub.bestiary',
    routes: [
      { to: '/bestiary', key: 'nav.bestiary' },
      { to: '/my-monsters', key: 'nav.myMonsters' },
      { to: '/editor', key: 'nav.editor' }
    ]
  },
  {
    id: 'spells',
    icon: GiSpellBook,
    key: 'hub.spells',
    routes: [{ to: '/spells', key: 'nav.spells' }]
  },
  {
    id: 'equipment',
    icon: GiKnapsack,
    key: 'hub.equipment',
    routes: [{ to: '/equipment', key: 'nav.equipment' }]
  },
  {
    id: 'reference',
    icon: GiScrollQuill,
    key: 'hub.reference',
    routes: [
      { to: '/rules', key: 'nav.rules' },
      { to: '/conditions', key: 'nav.conditions' },
      { to: '/hazards', key: 'nav.hazards' }
    ]
  },
  {
    id: 'character',
    icon: GiCharacter,
    key: 'hub.character',
    routes: [
      { to: '/character', key: 'nav.character' },
      { to: '/races', key: 'nav.races' }
    ]
  },
  {
    id: 'campaign',
    icon: GiBookCover,
    key: 'hub.campaign',
    routes: [
      { to: '/codex', key: 'nav.codex' },
      { to: '/random-tables', key: 'nav.randomTables' }
    ]
  }
]

/** True when `pathname` belongs to this route (exact, or a nested path like /editor/:key). */
export function matchesRoute(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`)
}

/** The hub that owns the current path (defaults to the first hub). */
export function hubForPath(pathname: string): Hub {
  return HUBS.find((h) => h.routes.some((r) => matchesRoute(pathname, r.to))) ?? HUBS[0]
}
