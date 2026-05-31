import { useState, type CSSProperties, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiShield, GiCog } from 'react-icons/gi'
import { useSettings } from '../store/settings'
import { useUi } from '../store/ui'
import SearchBar from './SearchBar'
import SettingsModal from './SettingsModal'

export default function TopBar(): JSX.Element {
  const { t } = useTranslation()
  const { language, toggleLanguage } = useSettings()
  const online = useUi((s) => s.online)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // The header doubles as the window's drag handle (native title bar is hidden);
  // interactive controls opt out so they stay clickable.
  const noDrag = { WebkitAppRegion: 'no-drag' } as CSSProperties

  return (
    <header
      className="flex h-12 shrink-0 items-center justify-between border-b-2 border-gold/40 bg-sidebar pl-4 pr-[150px]"
      style={{ boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.4)', WebkitAppRegion: 'drag' } as CSSProperties}
    >
      <div className="flex items-center gap-2">
        <GiShield className="text-xl text-gold-soft" />
        <h1 className="font-serif text-2xl font-bold tracking-wide text-gold-soft">
          {t('app.title')}
        </h1>
      </div>

      <div style={noDrag}>
        <SearchBar />
      </div>

      <div className="flex items-center gap-3" style={noDrag}>
        {!online && (
          <span className="flex items-center gap-1 rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-white">
            ● {t('app.offline')}
          </span>
        )}

        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="rounded-full border border-parchment/30 px-3 py-1 text-xs font-bold text-parchment hover:border-parchment/60"
          title="RU / EN"
        >
          {language.toUpperCase()}
        </button>

        <button
          onClick={() => setSettingsOpen(true)}
          className="rounded-full border border-parchment/30 px-2 py-1 text-sm text-parchment hover:border-parchment/60"
          title={t('settings.title')}
        >
          <GiCog className="text-base" />
        </button>
      </div>

      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </header>
  )
}
