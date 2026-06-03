import { type JSX } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HUBS, hubForPath } from '../data/nav-hubs'

export default function Sidebar(): JSX.Element {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const active = hubForPath(pathname)

  return (
    <nav
      className="flex w-28 shrink-0 flex-col gap-1.5 overflow-y-auto border-r-2 border-gold/30 bg-sidebar p-2"
      style={{ boxShadow: 'inset -8px 0 12px rgba(0,0,0,0.5)' }}
    >
      {HUBS.map((hub) => {
        const Icon = hub.icon
        const isActive = hub.id === active.id
        return (
          <button
            key={hub.id}
            onClick={() => navigate(hub.routes[0].to)}
            className={`flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-center text-xs transition-all ${
              isActive
                ? 'border-gold/60 bg-accent/90 text-parchment shadow-panel'
                : 'border-transparent text-gold-soft/80 hover:border-gold/30 hover:bg-white/5 hover:text-gold-soft'
            }`}
          >
            <Icon className="text-2xl" />
            <span className="font-serif font-semibold leading-tight">{t(hub.key)}</span>
          </button>
        )
      })}
    </nav>
  )
}
