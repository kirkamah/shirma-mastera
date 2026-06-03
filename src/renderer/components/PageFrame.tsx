import { type JSX, type ReactNode } from 'react'
import HubTabs from './HubTabs'

interface Props {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

/** A parchment "page" of the tome with ornamental border and a titled header.
 *  When the current page's sidebar hub owns siblings, a tab strip is shown above
 *  the title so the user can switch between them. */
export default function PageFrame({ title, subtitle, actions, children }: Props): JSX.Element {
  return (
    <div className="h-full p-3">
      <div className="parchment-texture tome-border tome-page relative flex h-full flex-col rounded-lg p-4">
        <HubTabs />
        <div className="mb-2 flex items-end justify-between gap-3 border-b-2 border-accent/30 pb-2">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-wide text-accent">{title}</h1>
            {subtitle && <p className="text-sm italic text-ink-brown/70">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 pb-1">{actions}</div>}
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}
