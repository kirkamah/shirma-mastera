import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings, type Palette } from '../store/settings'

const PALETTES: { id: Palette; labelKey: string; swatch: [string, string, string] }[] = [
  { id: 'dark', labelKey: 'settings.paletteDark', swatch: ['#15100a', '#b8893b', '#7a1414'] },
  { id: 'light', labelKey: 'settings.paletteLight', swatch: ['#e4ded2', '#96702d', '#962020'] },
  { id: 'blue', labelKey: 'settings.paletteBlue', swatch: ['#0f141c', '#8aa0bc', '#3874b2'] },
  { id: 'ember', labelKey: 'settings.paletteEmber', swatch: ['#1a0e0a', '#d68430', '#c8481a'] },
  { id: 'forest', labelKey: 'settings.paletteForest', swatch: ['#0c1610', '#a0984a', '#287848'] }
]

const LANGS: { id: 'ru' | 'en'; labelKey: string }[] = [
  { id: 'ru', labelKey: 'settings.langRu' },
  { id: 'en', labelKey: 'settings.langEn' }
]

export default function SettingsModal({ onClose }: { onClose: () => void }): JSX.Element {
  const { t } = useTranslation()
  const { language, setLanguage, sound, setSound, fontScale, setFontScale, texture, setTexture, devMode, setDevMode, palette, setPalette } = useSettings()
  const [msg, setMsg] = useState('')

  const doExport = async (): Promise<void> => {
    const r = await window.api.exportData()
    setMsg(r.ok ? t('settings.savedTo', { path: r.path }) : r.error ? t('settings.errorMsg', { error: r.error }) : t('settings.cancelled'))
  }
  const doImport = async (): Promise<void> => {
    const r = await window.api.importData()
    setMsg(r.ok ? t('settings.importedMonsters', { n: r.monsters }) : r.error ? t('settings.errorMsg', { error: r.error }) : t('settings.cancelled'))
  }

  const Row = ({ label, children }: { label: string; children: React.ReactNode }): JSX.Element => (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-parchment/90">{label}</span>
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg border border-gold/40 bg-sidebar p-4 shadow-panel" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-gold-soft">{t('settings.title')}</h2>
          <button onClick={onClose} className="text-parchment/50 hover:text-parchment">✕</button>
        </div>

        <div className="mb-3">
          <div className="mb-1.5 text-sm text-parchment/90">{t('settings.language')}</div>
          <div className="flex gap-2">
            {LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLanguage(l.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  language === l.id ? 'border-gold bg-accent/30 text-parchment' : 'border-white/15 text-parchment/70 hover:border-gold/50'
                }`}
              >
                {t(l.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-1">
          <div className="mb-1.5 text-sm text-parchment/90">{t('settings.palette')}</div>
          <div className="flex flex-wrap gap-2">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPalette(p.id)}
                title={t(p.labelKey)}
                className={`flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  palette === p.id ? 'border-gold bg-accent/30 text-parchment' : 'border-white/15 text-parchment/70 hover:border-gold/50'
                }`}
              >
                <span className="flex overflow-hidden rounded-full border border-black/30">
                  {p.swatch.map((c, i) => (
                    <span key={i} className="h-3.5 w-2.5" style={{ background: c }} />
                  ))}
                </span>
                {t(p.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 divide-y divide-white/10">
          <Row label={t('settings.sound')}>
            <button
              onClick={() => setSound(!sound)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${sound ? 'bg-accent text-parchment' : 'bg-black/40 text-parchment/60'}`}
            >
              {sound ? t('settings.on') : t('settings.off')}
            </button>
          </Row>
          <Row label={t('settings.texture')}>
            <button
              onClick={() => setTexture(!texture)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${texture ? 'bg-accent text-parchment' : 'bg-black/40 text-parchment/60'}`}
            >
              {texture ? t('settings.on') : t('settings.off')}
            </button>
          </Row>
          <Row label={`${t('settings.fontSize')}: ${Math.round(fontScale * 100)}%`}>
            <input
              type="range"
              min={0.85}
              max={1.3}
              step={0.05}
              value={fontScale}
              onChange={(e) => setFontScale(+e.target.value)}
              className="w-40 accent-accent"
            />
          </Row>
        </div>

        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-parchment/50">{t('settings.dev')}</div>
          <Row label={t('settings.devMode')}>
            <button
              onClick={() => setDevMode(!devMode)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${devMode ? 'bg-accent text-parchment' : 'bg-black/40 text-parchment/60'}`}
            >
              {devMode ? t('settings.on') : t('settings.off')}
            </button>
          </Row>
          <p className="text-[11px] text-parchment/40">{t('settings.devHint')}</p>
        </div>

        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-parchment/50">{t('settings.data')}</div>
          <div className="flex gap-2">
            <button onClick={doExport} className="flex-1 rounded border border-gold/40 px-3 py-1.5 text-sm text-gold-soft hover:bg-gold/10">
              ⬇ {t('settings.export')}
            </button>
            <button onClick={doImport} className="flex-1 rounded border border-gold/40 px-3 py-1.5 text-sm text-gold-soft hover:bg-gold/10">
              ⬆ {t('settings.import')}
            </button>
          </div>
          {msg && <p className="mt-2 break-all text-xs text-parchment/60">{msg}</p>}
          <p className="mt-1 text-[11px] text-parchment/40">{t('settings.importHint')}</p>
        </div>

        <div
          className="mt-3 border-t border-white/10 pt-2 text-center text-[11px]"
          style={{ color: '#2FA37C' }}
          title="© 2026 Kirkamah · no harm org — All rights reserved."
        >
          ☮ no harm org · Kirkamah
        </div>
      </div>
    </div>
  )
}
