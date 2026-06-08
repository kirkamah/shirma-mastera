import { useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiTrashCan, GiPerspectiveDiceSixFacesRandom, GiCardPickup } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import Modal from '../components/Modal'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useToolkit, type ToolkitItem } from '../hooks/useToolkit'
import { pick } from '../utils/toolkitRoll'
import { uid } from '../utils/monster'
import { CURSES, CURSE_HOOKS, CURSE_EFFECTS, CURSE_LIFTS } from '../data/toolkit/curses'
import { SEVERITIES, severityLabel, severityColor } from '../data/toolkit/labels'
import type { Ability, Curse, CurseData, Severity } from '../data/toolkit/types'

const ABILITIES: Ability[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

function curseToValues(c: Curse): FormValues {
  return {
    name: c.name, severity: c.data.severity, tags: c.tags.join(', '),
    flavor: c.data.flavor, effects: c.data.effects, lifting: c.data.lifting,
    saveAbility: c.data.save?.ability ?? '', saveDc: c.data.save?.dc ?? 0, savePeriod: c.data.save?.period ?? ''
  }
}
function valuesToCurse(v: FormValues, key: string): Curse {
  const ability = String(v.saveAbility || '')
  const dc = Number(v.saveDc) || 0
  const save = ability && dc ? { ability: ability as Ability, dc, period: String(v.savePeriod || '') || undefined } : null
  return {
    key, type: 'curse', source: 'user',
    name: String(v.name || 'Без названия'),
    tags: String(v.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
    data: {
      flavor: String(v.flavor || ''), effects: String(v.effects || ''), lifting: String(v.lifting || ''),
      severity: (String(v.severity || 'moderate') as Severity), save
    }
  }
}

export default function Curses(): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { items, saveUser, remove, fork, toggleFavorite } = useToolkit<CurseData>('curse', CURSES)

  const [query, setQuery] = useState('')
  const [sev, setSev] = useState<Severity | 'all'>('all')
  const [tag, setTag] = useState<string>('all')
  const [onlyFav, setOnlyFav] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)
  const [combo, setCombo] = useState<{ hook: string; effect: string; lift: string } | null>(null)

  const tags = useMemo(() => [...new Set(items.flatMap((c) => c.tags))].sort(), [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (c) =>
        (!onlyFav || c.favorite) &&
        (sev === 'all' || c.data.severity === sev) &&
        (tag === 'all' || c.tags.includes(tag)) &&
        (!q || c.name.toLowerCase().includes(q) || c.data.flavor.toLowerCase().includes(q) || c.data.effects.toLowerCase().includes(q))
    )
  }, [items, query, sev, tag, onlyFav])

  const selected = items.find((c) => c.key === selectedKey) ?? null

  const CURSE_FIELDS: FormField[] = [
    { key: 'name', label: t('lore.curses.fName') },
    { key: 'severity', label: t('lore.curses.fSeverity'), type: 'select', options: SEVERITIES.map((s) => ({ value: s, label: severityLabel(s, lang) })) },
    { key: 'tags', label: t('lore.curses.fTags'), type: 'tags', suggestions: tags },
    { key: 'flavor', label: t('lore.curses.fFlavor'), type: 'textarea' },
    { key: 'effects', label: t('lore.curses.fEffects'), type: 'textarea' },
    { key: 'lifting', label: t('lore.curses.fLifting'), type: 'textarea' },
    { key: 'saveAbility', label: t('lore.curses.fSaveAbility'), type: 'select', options: [{ value: '', label: '—' }, ...ABILITIES.map((a) => ({ value: a, label: a }))] },
    { key: 'saveDc', label: t('lore.curses.fSaveDc'), type: 'number' },
    { key: 'savePeriod', label: t('lore.curses.fSavePeriod'), placeholder: t('lore.curses.fSavePeriodPh') }
  ]

  const rollRandom = (): void => {
    const c = pick(filtered.length ? filtered : items)
    if (c) setSelectedKey(c.key)
  }
  const rollCombo = (): void => {
    setCombo({ hook: pick(CURSE_HOOKS) ?? '', effect: pick(CURSE_EFFECTS) ?? '', lift: pick(CURSE_LIFTS) ?? '' })
  }
  const saveCombo = (): void => {
    if (!combo) return
    const key = uid('c-curse')
    const c: Curse = {
      key, type: 'curse', source: 'user', name: t('lore.curses.composedName'), tags: ['composed'],
      data: { flavor: combo.hook, effects: combo.effect, lifting: combo.lift, severity: 'moderate', save: null }
    }
    saveUser(c)
    setCombo(null)
    setSelectedKey(key)
  }

  const sel = 'rounded-md border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none'

  return (
    <PageFrame
      title={t('nav.curses')}
      subtitle={t('lore.curses.subtitle', { n: items.length })}
      actions={
        <div className="flex items-center gap-1">
          <button onClick={rollCombo} className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/10">
            <GiCardPickup /> {t('lore.curses.compose')}
          </button>
          <button onClick={rollRandom} className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/10">
            <GiPerspectiveDiceSixFacesRandom /> {t('lore.curses.random')}
          </button>
          <button onClick={() => setEditing({ key: null, values: { severity: 'moderate' } })} className="ml-1 rounded bg-accent px-2 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">
            {t('lore.curses.add')}
          </button>
        </div>
      }
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-2.5 shadow-inner">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('lore.curses.searchPh')} className="min-w-44 flex-1 rounded-md border border-ink-brown/30 bg-parchment/70 px-3 py-1.5 text-sm text-ink-brown focus:border-accent focus:outline-none" />
        <select value={sev} onChange={(e) => setSev(e.target.value as Severity | 'all')} className={sel}>
          <option value="all">{t('lore.curses.allSeverity')}</option>
          {SEVERITIES.map((s) => <option key={s} value={s}>{severityLabel(s, lang)}</option>)}
        </select>
        <select value={tag} onChange={(e) => setTag(e.target.value)} className={sel}>
          <option value="all">{t('lore.curses.allTags')}</option>
          {tags.map((tg) => <option key={tg} value={tg}>{tg}</option>)}
        </select>
        <button onClick={() => setOnlyFav((v) => !v)} className={`rounded-full px-3 py-1 text-xs font-semibold ${onlyFav ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/70 hover:border-accent/60'}`}>
          ★ {t('lore.curses.favorites')}
        </button>
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">{filtered.length}</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))' }}>
          {filtered.map((c) => (
            <button key={c.key} onClick={() => setSelectedKey(c.key)} className="flex flex-col gap-1.5 rounded-lg border border-ink-brown/20 bg-parchment-dark/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-parchment/70 hover:shadow-panel">
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-parchment" style={{ backgroundColor: severityColor[c.data.severity] }}>
                  {severityLabel(c.data.severity, lang)}
                </span>
                {c.favorite && <span className="text-gold">★</span>}
                {c.source === 'user' && <span className="text-[11px] text-accent" title={t('lore.common.custom')}>✎</span>}
              </div>
              <div className="font-serif text-[15px] font-semibold leading-tight text-accent">{c.name}</div>
              <p className="line-clamp-3 text-[13px] italic leading-snug text-ink-brown/75">{c.data.flavor}</p>
            </button>
          ))}
        </div>
        {filtered.length === 0 && <div className="p-6 text-center text-ink-brown/50">{t('common.empty')}</div>}
      </div>

      {selected && (
        <Modal onClose={() => setSelectedKey(null)} max="max-w-2xl">
          <article className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-parchment" style={{ backgroundColor: severityColor[selected.data.severity] }}>
                  {severityLabel(selected.data.severity, lang)}
                </span>
                <h2 className="mt-1 font-serif text-3xl font-bold text-accent">{selected.name}</h2>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => toggleFavorite(selected.key)} title={t('lore.curses.favorites')} className={`rounded border px-2 py-1 text-sm ${selected.favorite ? 'border-gold bg-gold/15 text-gold' : 'border-ink-brown/30 text-ink-brown/70 hover:bg-black/5'}`}>★</button>
                {selected.source === 'user' ? (
                  <>
                    <button onClick={() => setEditing({ key: selected.key, values: curseToValues(selected) })} title={t('common.edit')} className="rounded border border-accent/50 px-2 py-1 text-sm text-accent hover:bg-accent/10">✎</button>
                    <button onClick={() => { remove(selected.key); setSelectedKey(null) }} title={t('common.delete')} className="rounded border border-accent/40 px-2 py-1 text-sm text-accent hover:bg-accent/10"><GiTrashCan /></button>
                  </>
                ) : (
                  <button onClick={async () => { const k = await fork(selected); setSelectedKey(k) }} className="rounded border border-accent/50 px-2 py-1 text-xs font-semibold text-accent hover:bg-accent/10">{t('lore.common.makeMine')}</button>
                )}
              </div>
            </div>
            <p className="mt-2 text-[15px] italic leading-relaxed text-ink-brown/80">{selected.data.flavor}</p>
            <hr className="fleuron" />
            <DetailBlock title={t('lore.curses.effects')} text={selected.data.effects} />
            <DetailBlock title={t('lore.curses.lifting')} text={selected.data.lifting} />
            {selected.data.save && (
              <p className="mt-3 text-sm text-ink-brown"><b className="text-accent">{t('lore.curses.save')}:</b> {selected.data.save.ability} DC {selected.data.save.dc}{selected.data.save.period ? ` · ${selected.data.save.period}` : ''}</p>
            )}
            {selected.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {selected.tags.map((tg) => <span key={tg} className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] text-accent">{tg}</span>)}
              </div>
            )}
          </article>
        </Modal>
      )}

      {combo && (
        <Modal onClose={() => setCombo(null)} max="max-w-xl">
          <article className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
            <h2 className="font-serif text-2xl font-bold text-accent">{t('lore.curses.composedTitle')}</h2>
            <DetailBlock title={t('lore.curses.hook')} text={combo.hook} />
            <DetailBlock title={t('lore.curses.effects')} text={combo.effect} />
            <DetailBlock title={t('lore.curses.lifting')} text={combo.lift} />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={rollCombo} className="inline-flex items-center gap-1 rounded border border-accent/50 px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent/10"><GiPerspectiveDiceSixFacesRandom /> {t('lore.curses.reroll')}</button>
              <button onClick={saveCombo} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">{t('lore.curses.saveAsMine')}</button>
            </div>
          </article>
        </Modal>
      )}

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? t('lore.curses.newCurse') : t('lore.curses.editCurse')}
          fields={CURSE_FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          onSave={(v, mode) => {
            const base = editing.key
            const key = mode === 'copy' || base === null ? uid('c-curse') : base
            const c = valuesToCurse(v, key)
            saveUser(mode === 'copy' && !/\(копия\)/i.test(c.name) ? { ...c, name: `${c.name} (копия)` } : c)
            setSelectedKey(key)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}

function DetailBlock({ title, text }: { title: string; text: string }): JSX.Element | null {
  if (!text.trim()) return null
  return (
    <section className="mt-3">
      <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-accent/80">{title}</h3>
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">{text}</p>
    </section>
  )
}
