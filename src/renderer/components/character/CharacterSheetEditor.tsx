import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import InteractiveSheet from './InteractiveSheet'
import type { CharacterSheet } from '../../data/character-sheet'

/** Manual mode: a blank fillable white sheet with a save/print/export bar. */
export default function CharacterSheetEditor({
  sheet,
  onChange,
  onSave,
  onPrint,
  onPdf,
  onBack
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  onSave: () => void
  onPrint: () => void
  onPdf: () => void
  onBack: () => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <button onClick={onBack} className="rounded border border-ink-brown/30 px-3 py-1 text-sm text-ink-brown/80 hover:border-accent/60">
          ← {t('cc.sheet.back')}
        </button>
        <h2 className="font-serif text-lg font-bold text-accent">{t('cc.sheet.manualCreateTitle')}</h2>
        <div className="ml-auto flex gap-1">
          <button onClick={onSave} className="rounded bg-accent px-3 py-1 text-sm font-semibold text-parchment hover:bg-accent/80">
            {t('cc.sheet.save')}
          </button>
          <button onClick={onPrint} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">
            {t('cc.sheet.print')}
          </button>
          <button onClick={onPdf} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">
            {t('cc.sheet.downloadPdf')}
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <InteractiveSheet sheet={sheet} onChange={onChange} />
      </div>
    </div>
  )
}
