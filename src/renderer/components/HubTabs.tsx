import { type JSX } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { hubForPath } from '../data/nav-hubs'

/** Secondary navigation strip shown at the top of a page when its sidebar hub
 *  owns more than one page. Single-page hubs render nothing. */
export default function HubTabs(): JSX.Element | null {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const hub = hubForPath(pathname)
  if (hub.routes.length < 2) return null

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      {hub.routes.map((r) => (
        <NavLink
          key={r.to}
          to={r.to}
          className={({ isActive }) =>
            `rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-accent text-parchment'
                : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
            }`
          }
        >
          {t(r.key)}
        </NavLink>
      ))}
    </div>
  )
}
