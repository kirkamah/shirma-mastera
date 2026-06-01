import { type JSX } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import {
  GiDragonHead,
  GiVortex,
  GiSpellBook,
  GiElfHelmet,
  GiKnapsack,
  GiWolfTrap,
  GiBookCover,
  GiScrollQuill,
  GiScrollUnfurled,
  GiCharacter,
  GiRollingDices
} from 'react-icons/gi'

const items: { to: string; icon: IconType; key: string }[] = [
  { to: '/bestiary', icon: GiDragonHead, key: 'nav.bestiary' },
  { to: '/conditions', icon: GiVortex, key: 'nav.conditions' },
  { to: '/spells', icon: GiSpellBook, key: 'nav.spells' },
  { to: '/races', icon: GiElfHelmet, key: 'nav.races' },
  { to: '/equipment', icon: GiKnapsack, key: 'nav.equipment' },
  { to: '/hazards', icon: GiWolfTrap, key: 'nav.hazards' },
  { to: '/codex', icon: GiBookCover, key: 'nav.codex' },
  { to: '/rules', icon: GiScrollQuill, key: 'nav.rules' },
  { to: '/random-tables', icon: GiRollingDices, key: 'nav.randomTables' },
  { to: '/character', icon: GiCharacter, key: 'nav.character' },
  { to: '/my-monsters', icon: GiScrollUnfurled, key: 'nav.myMonsters' }
]

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation()
  return (
    <nav
      className="flex w-28 shrink-0 flex-col gap-1.5 overflow-y-auto border-r-2 border-gold/30 bg-sidebar p-2"
      style={{ boxShadow: 'inset -8px 0 12px rgba(0,0,0,0.5)' }}
    >
      {items.map((it) => {
        const Icon = it.icon
        return (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-center text-xs transition-all ${
                isActive
                  ? 'border-gold/60 bg-accent/90 text-parchment shadow-panel'
                  : 'border-transparent text-gold-soft/80 hover:border-gold/30 hover:bg-white/5 hover:text-gold-soft'
              }`
            }
          >
            <Icon className="text-2xl" />
            <span className="font-serif font-semibold leading-tight">{t(it.key)}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
