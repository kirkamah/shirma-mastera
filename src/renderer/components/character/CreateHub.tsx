import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiScrollQuill, GiQuillInk, GiCharacter, GiTrashCan } from 'react-icons/gi'
import { useCustom } from '../../hooks/useCustom'
import { emptyCharacterSheet, deriveSheet, type CharacterSheet } from '../../data/character-sheet'
import { printSheet, downloadSheetPdf } from '../../utils/characterSheet'
import CharacterCreationGuide from './CharacterCreationGuide'
import CharacterSheetEditor from './CharacterSheetEditor'
import CharacterConstructor from './CharacterConstructor'
import InteractiveSheet from './InteractiveSheet'

type Mode = 'landing' | 'guide' | 'manual' | 'constructor' | 'view'

export default function CreateHub(): JSX.Element {
  const { t } = useTranslation()
  const { items, save, remove } = useCustom<CharacterSheet>('character')
  const [mode, setMode] = useState<Mode>('landing')
  const [draft, setDraft] = useState<CharacterSheet | null>(null)
  const [confirmDel, setConfirmDel] = useState<CharacterSheet | null>(null)

  const onChange = (patch: Partial<CharacterSheet>): void => setDraft((d) => (d ? { ...d, ...patch } : d))

  const openNew = (m: 'manual' | 'constructor'): void => {
    setDraft(emptyCharacterSheet(m))
    setMode(m)
  }
  const openSaved = (ch: CharacterSheet): void => {
    setDraft(ch)
    setMode('view') // open into read-only view; edit via button (always manual)
  }
  const doSave = (): void => {
    if (!draft) return
    const named = { ...draft, name: draft.name.trim() || t('cc.hub.defaultName'), updatedAt: Date.now() }
    setDraft(named)
    save(named)
    setMode('view') // after saving, show the read-only character view
  }
  const back = (): void => {
    setMode('landing')
    setDraft(null)
  }

  if (mode === 'guide') {
    return (
      <div className="h-full overflow-y-auto">
        <button onClick={back} className="mb-2 rounded border border-ink-brown/30 px-3 py-1 text-sm text-ink-brown/80 hover:border-accent/60">← {t('cc.hub.back')}</button>
        <CharacterCreationGuide />
      </div>
    )
  }
  if (mode === 'manual' && draft) {
    return <CharacterSheetEditor sheet={draft} onChange={onChange} onSave={doSave} onPrint={() => printSheet(draft)} onPdf={() => downloadSheetPdf(draft)} onBack={back} />
  }
  if (mode === 'constructor' && draft) {
    return <CharacterConstructor sheet={draft} onChange={onChange} onSave={doSave} onPrint={() => printSheet(draft)} onPdf={() => downloadSheetPdf(draft)} onBack={back} />
  }
  if (mode === 'view' && draft) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-2 flex shrink-0 items-center gap-2">
          <button onClick={back} className="rounded border border-ink-brown/30 px-3 py-1 text-sm text-ink-brown/80 hover:border-accent/60">← {t('cc.hub.close')}</button>
          <h2 className="font-serif text-lg font-bold text-accent">{draft.name || t('cc.hub.character')}</h2>
          <div className="ml-auto flex gap-1">
            <button onClick={() => setMode('manual')} className="rounded bg-accent px-3 py-1 text-sm font-semibold text-parchment hover:bg-accent/80">✎ {t('cc.hub.edit')}</button>
            <button onClick={() => printSheet(draft)} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">{t('cc.hub.print')}</button>
            <button onClick={() => downloadSheetPdf(draft)} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">{t('cc.hub.downloadPdf')}</button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <InteractiveSheet sheet={draft} onChange={() => {}} readOnly />
        </div>
      </div>
    )
  }

  // ---- landing ----
  return (
    <div className="mx-auto h-full max-w-4xl overflow-y-auto pb-6">
      <h2 className="mb-1 font-serif text-2xl font-bold text-accent">{t('cc.hub.title')}</h2>
      <p className="mb-4 text-sm text-ink-brown/70">{t('cc.hub.subtitle')}</p>

      <div className="grid gap-3 sm:grid-cols-3">
        <ChoiceCard icon={<GiScrollQuill />} title={t('cc.hub.guideTitle')} desc={t('cc.hub.guideDesc')} onClick={() => setMode('guide')} />
        <ChoiceCard icon={<GiQuillInk />} title={t('cc.hub.manualTitle')} desc={t('cc.hub.manualDesc')} onClick={() => openNew('manual')} />
        <ChoiceCard icon={<GiCharacter />} title={t('cc.hub.constructorTitle')} desc={t('cc.hub.constructorDesc')} highlight onClick={() => openNew('constructor')} />
      </div>

      {items.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 font-serif text-sm font-bold uppercase tracking-wider text-ink-brown/60">{t('cc.hub.myCharacters')}</h3>
          <ul className="divide-y divide-ink-brown/10 rounded-lg border border-ink-brown/20 bg-parchment-dark/20">
            {items.map((ch) => {
              const vw = deriveSheet(ch)
              const sub = [vw.className, ch.level ? t('cc.hub.level', { n: ch.level }) : '', vw.raceName].filter(Boolean).join(' · ')
              return (
                <li key={ch.key} className="flex items-center gap-2 px-3 py-2">
                  <button onClick={() => openSaved(ch)} className="min-w-0 flex-1 text-left">
                    <div className="truncate font-serif font-semibold text-ink-brown">{ch.name || t('cc.hub.noName')}</div>
                    {sub && <div className="truncate text-xs text-ink-brown/50">{sub}</div>}
                  </button>
                  <button onClick={() => printSheet(ch)} className="rounded border border-accent/40 px-2 py-1 text-xs text-accent hover:bg-accent/10" title={t('cc.hub.print')}>{t('cc.hub.print')}</button>
                  <button onClick={() => setConfirmDel(ch)} className="rounded border border-ink-brown/30 px-2 py-1 text-xs text-ink-brown/60 hover:border-red-600/60 hover:text-red-700" title={t('cc.hub.delete')}><GiTrashCan /></button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {confirmDel && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4" onClick={() => setConfirmDel(null)}>
          <div className="parchment-texture tome-border w-full max-w-sm rounded-lg p-5 shadow-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-bold text-accent">{t('cc.hub.deleteTitle')}</h3>
            <p className="mt-1 text-sm text-ink-brown">{t('cc.hub.deleteConfirm', { name: confirmDel.name || t('cc.hub.noName') })}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setConfirmDel(null)} className="rounded border border-ink-brown/30 px-4 py-1.5 text-sm text-ink-brown/80 hover:border-accent/60">{t('cc.hub.cancel')}</button>
              <button onClick={() => { remove(confirmDel.key); setConfirmDel(null) }} className="rounded bg-accent px-4 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">{t('cc.hub.delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ChoiceCard({ icon, title, desc, onClick, highlight }: { icon: JSX.Element; title: string; desc: string; onClick: () => void; highlight?: boolean }): JSX.Element {
  return (
    <button onClick={onClick} className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-colors ${highlight ? 'border-gold/60 bg-gold/10 hover:bg-gold/20' : 'border-ink-brown/20 bg-parchment-dark/15 hover:border-accent/50 hover:bg-accent/5'}`}>
      <span className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl ${highlight ? 'bg-gold/20 text-accent' : 'bg-accent/15 text-accent'}`}>{icon}</span>
      <h3 className="font-serif text-lg font-bold text-accent">{title}</h3>
      <p className="mt-1 text-[13px] leading-snug text-ink-brown/75">{desc}</p>
    </button>
  )
}
