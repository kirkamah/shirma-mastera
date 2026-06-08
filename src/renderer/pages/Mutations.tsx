import { useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiTrashCan, GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import Modal from '../components/Modal'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useToolkit } from '../hooks/useToolkit'
import { useCustom } from '../hooks/useCustom'
import { pick } from '../utils/toolkitRoll'
import { uid } from '../utils/monster'
import { MUTATIONS } from '../data/toolkit/mutations'
import { BODY_PARTS, bodyPartLabel, CAUSES, causeLabel } from '../data/toolkit/labels'
import type { BodyPart, Mutation, MutationCause, MutationData } from '../data/toolkit/types'

const TIERS: (1 | 2 | 3)[] = [1, 2, 3]

interface Tracker { key: string; name: string; slots: Partial<Record<BodyPart, string>> }
const TRACKER_KEY = 'tracker:main'

function parseScaling(text: string): { level: number; effect: string }[] | undefined {
  const rows = text.split('\n').map((l) => l.trim()).filter(Boolean)
    .map((l) => { const m = l.match(/^(\d+)\s*[:\-—]\s*(.+)$/); return m ? { level: Number(m[1]), effect: m[2] } : null })
    .filter((x): x is { level: number; effect: string } => x !== null)
  return rows.length ? rows : undefined
}
const linesToText = (a?: readonly string[]): string => (a ?? []).join('\n')
const scalingToText = (s?: { level: number; effect: string }[]): string => (s ?? []).map((x) => `${x.level}: ${x.effect}`).join('\n')

function mutToValues(m: Mutation): FormValues {
  return {
    name: m.name, bodyPart: m.data.bodyPart, tier: m.data.tier, cause: m.data.cause ?? '', tags: m.tags.join(', '),
    flavor: m.data.flavor, benefits: linesToText(m.data.benefits), drawbacks: linesToText(m.data.drawbacks), scaling: scalingToText(m.data.scaling)
  }
}
function valuesToMut(v: FormValues, key: string): Mutation {
  const splitLines = (s: string): string[] => s.split('\n').map((x) => x.trim()).filter(Boolean)
  return {
    key, type: 'mutation', source: 'user',
    name: String(v.name || 'Без названия'),
    tags: String(v.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
    data: {
      bodyPart: (String(v.bodyPart || 'other') as BodyPart),
      flavor: String(v.flavor || ''),
      benefits: splitLines(String(v.benefits || '')),
      drawbacks: splitLines(String(v.drawbacks || '')),
      scaling: parseScaling(String(v.scaling || '')),
      tier: (Number(v.tier) === 3 ? 3 : Number(v.tier) === 1 ? 1 : 2),
      cause: v.cause ? (String(v.cause) as MutationCause) : undefined
    }
  }
}

export default function Mutations(): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { items, saveUser, remove, fork } = useToolkit<MutationData>('mutation', MUTATIONS)
  const { items: trackers, save: saveTrackerRaw } = useCustom<Tracker>('mutation_tracker')
  const tracker: Tracker = trackers[0] ?? { key: TRACKER_KEY, name: TRACKER_KEY, slots: {} }

  const [query, setQuery] = useState('')
  const [part, setPart] = useState<BodyPart | 'all'>('all')
  const [tier, setTier] = useState<number | 'all'>('all')
  const [cause, setCause] = useState<MutationCause | 'all'>('all')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (m) =>
        (part === 'all' || m.data.bodyPart === part) &&
        (tier === 'all' || m.data.tier === tier) &&
        (cause === 'all' || m.data.cause === cause) &&
        (!q || m.name.toLowerCase().includes(q) || m.data.flavor.toLowerCase().includes(q))
    )
  }, [items, query, part, tier, cause])

  const selected = items.find((m) => m.key === selectedKey) ?? null
  const setSlot = (bodyPart: BodyPart, mutKey: string | null): void => {
    const slots = { ...tracker.slots }
    if (mutKey) slots[bodyPart] = mutKey
    else delete slots[bodyPart]
    saveTrackerRaw({ key: TRACKER_KEY, name: TRACKER_KEY, slots })
  }

  const attached = BODY_PARTS.map((bp) => ({ bp, mut: items.find((m) => m.key === tracker.slots[bp]) })).filter((x) => x.mut)
  const allBenefits = attached.flatMap((x) => x.mut!.data.benefits)
  const allDrawbacks = attached.flatMap((x) => x.mut!.data.drawbacks)

  const rollRandom = (): void => {
    const pool = part === 'all' ? filtered : items.filter((m) => m.data.bodyPart === part)
    const m = pick(pool.length ? pool : items)
    if (m) setSelectedKey(m.key)
  }

  const FIELDS: FormField[] = [
    { key: 'name', label: t('lore.mut.fName') },
    { key: 'bodyPart', label: t('lore.mut.fBodyPart'), type: 'select', options: BODY_PARTS.map((p) => ({ value: p, label: bodyPartLabel(p, lang) })) },
    { key: 'tier', label: t('lore.mut.fTier'), type: 'select', options: TIERS.map((tr) => ({ value: String(tr), label: `${t('lore.mut.tier')} ${tr}` })) },
    { key: 'cause', label: t('lore.mut.fCause'), type: 'select', options: [{ value: '', label: '—' }, ...CAUSES.map((c) => ({ value: c, label: causeLabel(c, lang) }))] },
    { key: 'tags', label: t('lore.mut.fTags'), type: 'tags' },
    { key: 'flavor', label: t('lore.mut.fFlavor'), type: 'textarea' },
    { key: 'benefits', label: t('lore.mut.fBenefits'), type: 'textarea', placeholder: t('lore.mut.fLinePh') },
    { key: 'drawbacks', label: t('lore.mut.fDrawbacks'), type: 'textarea', placeholder: t('lore.mut.fLinePh') },
    { key: 'scaling', label: t('lore.mut.fScaling'), type: 'textarea', placeholder: t('lore.mut.fScalingPh') }
  ]

  const sel = 'rounded-md border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none'

  return (
    <PageFrame
      title={t('nav.mutations')}
      subtitle={t('lore.mut.subtitle', { n: items.length })}
      actions={
        <div className="flex items-center gap-1">
          <button onClick={rollRandom} className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/10"><GiPerspectiveDiceSixFacesRandom /> {t('lore.mut.random')}</button>
          <button onClick={() => setEditing({ key: null, values: { bodyPart: part === 'all' ? 'other' : part, tier: 1 } })} className="ml-1 rounded bg-accent px-2 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">{t('lore.mut.add')}</button>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex flex-wrap items-center gap-2 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-2.5 shadow-inner">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('lore.mut.searchPh')} className="min-w-40 flex-1 rounded-md border border-ink-brown/30 bg-parchment/70 px-3 py-1.5 text-sm text-ink-brown focus:border-accent focus:outline-none" />
            <select value={tier} onChange={(e) => setTier(e.target.value === 'all' ? 'all' : +e.target.value)} className={sel}>
              <option value="all">{t('lore.mut.allTiers')}</option>
              {TIERS.map((tr) => <option key={tr} value={tr}>{t('lore.mut.tier')} {tr}</option>)}
            </select>
            <select value={cause} onChange={(e) => setCause(e.target.value as MutationCause | 'all')} className={sel}>
              <option value="all">{t('lore.mut.allCauses')}</option>
              {CAUSES.map((c) => <option key={c} value={c}>{causeLabel(c, lang)}</option>)}
            </select>
          </div>
          <div className="mb-2 flex flex-wrap gap-1">
            <button onClick={() => setPart('all')} className={`rounded-full px-2.5 py-0.5 text-xs ${part === 'all' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>{t('lore.mut.allParts')}</button>
            {BODY_PARTS.map((p) => (
              <button key={p} onClick={() => setPart(p)} className={`rounded-full px-2.5 py-0.5 text-xs ${part === p ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>{bodyPartLabel(p, lang)}</button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))' }}>
              {filtered.map((m) => (
                <button key={m.key} onClick={() => setSelectedKey(m.key)} className="flex flex-col gap-1 rounded-lg border border-ink-brown/20 bg-parchment-dark/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-parchment/70 hover:shadow-panel">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent">{bodyPartLabel(m.data.bodyPart, lang)}</span>
                    <span className="text-ink-brown/50">{t('lore.mut.tier')} {m.data.tier}</span>
                    {m.source === 'user' && <span className="ml-auto text-accent">✎</span>}
                  </div>
                  <div className="font-serif text-[15px] font-semibold leading-tight text-accent">{m.name}</div>
                  <p className="line-clamp-2 text-[13px] italic leading-snug text-ink-brown/75">{m.data.flavor}</p>
                </button>
              ))}
            </div>
            {filtered.length === 0 && <div className="p-6 text-center text-ink-brown/50">{t('common.empty')}</div>}
          </div>
        </div>

        {/* Body-map tracker */}
        <div className="flex w-72 shrink-0 flex-col overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-3">
          <h3 className="mb-2 font-serif text-base font-bold text-accent">{t('lore.mut.bodyMap')}</h3>
          <div className="space-y-1">
            {BODY_PARTS.map((bp) => {
              const mut = items.find((m) => m.key === tracker.slots[bp])
              return (
                <div key={bp} className="flex items-center gap-2 rounded border border-ink-brown/15 bg-parchment/40 px-2 py-1">
                  <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-ink-brown/55">{bodyPartLabel(bp, lang)}</span>
                  <span className="flex-1 truncate text-[13px] text-ink-brown">{mut ? mut.name : <span className="text-ink-brown/35">—</span>}</span>
                  {mut && <button onClick={() => setSlot(bp, null)} className="text-ink-brown/40 hover:text-red-500" title={t('lore.mut.detach')}>✕</button>}
                </div>
              )
            })}
          </div>
          {attached.length > 0 && (
            <div className="mt-3 space-y-2 text-[13px]">
              <div>
                <div className="font-semibold text-green-700">+ {t('lore.mut.benefits')}</div>
                <ul className="list-disc pl-4 text-ink-brown/85">{allBenefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
              <div>
                <div className="font-semibold text-red-700">− {t('lore.mut.drawbacks')}</div>
                <ul className="list-disc pl-4 text-ink-brown/85">{allDrawbacks.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <Modal onClose={() => setSelectedKey(null)} max="max-w-2xl">
          <article className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent">{bodyPartLabel(selected.data.bodyPart, lang)}</span>
                  <span className="text-ink-brown/55">{t('lore.mut.tier')} {selected.data.tier}</span>
                  {selected.data.cause && <span className="text-ink-brown/55">· {causeLabel(selected.data.cause, lang)}</span>}
                </div>
                <h2 className="mt-1 font-serif text-3xl font-bold text-accent">{selected.name}</h2>
              </div>
              <div className="flex shrink-0 gap-1">
                {selected.source === 'user' ? (
                  <>
                    <button onClick={() => setEditing({ key: selected.key, values: mutToValues(selected) })} title={t('common.edit')} className="rounded border border-accent/50 px-2 py-1 text-sm text-accent hover:bg-accent/10">✎</button>
                    <button onClick={() => { remove(selected.key); setSelectedKey(null) }} title={t('common.delete')} className="rounded border border-accent/40 px-2 py-1 text-sm text-accent hover:bg-accent/10"><GiTrashCan /></button>
                  </>
                ) : (
                  <button onClick={async () => { const k = await fork(selected); setSelectedKey(k) }} className="rounded border border-accent/50 px-2 py-1 text-xs font-semibold text-accent hover:bg-accent/10">{t('lore.common.makeMine')}</button>
                )}
              </div>
            </div>
            <p className="mt-2 text-[15px] italic leading-relaxed text-ink-brown/80">{selected.data.flavor}</p>
            <hr className="fleuron" />
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-green-700">+ {t('lore.mut.benefits')}</h3>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-ink-brown">{selected.data.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <h3 className="mt-3 font-serif text-sm font-semibold uppercase tracking-wide text-red-700">− {t('lore.mut.drawbacks')}</h3>
            <ul className="list-disc pl-5 text-[15px] leading-relaxed text-ink-brown">{selected.data.drawbacks.map((d, i) => <li key={i}>{d}</li>)}</ul>
            {selected.data.scaling && selected.data.scaling.length > 0 && (
              <>
                <h3 className="mt-3 font-serif text-sm font-semibold uppercase tracking-wide text-accent/80">{t('lore.mut.scaling')}</h3>
                <ul className="text-[15px] leading-relaxed text-ink-brown">{selected.data.scaling.map((s, i) => <li key={i}><b className="text-accent">{t('lore.mut.level')} {s.level}:</b> {s.effect}</li>)}</ul>
              </>
            )}
            <div className="mt-4 flex justify-end">
              <button onClick={() => { setSlot(selected.data.bodyPart, selected.key); setSelectedKey(null) }} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">{t('lore.mut.attach', { part: bodyPartLabel(selected.data.bodyPart, lang) })}</button>
            </div>
          </article>
        </Modal>
      )}

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? t('lore.mut.newMut') : t('lore.mut.editMut')}
          fields={FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          onSave={(v, mode) => {
            const base = editing.key
            const key = mode === 'copy' || base === null ? uid('c-mut') : base
            const m = valuesToMut(v, key)
            saveUser(mode === 'copy' && !/\(копия\)/i.test(m.name) ? { ...m, name: `${m.name} (копия)` } : m)
            setSelectedKey(key)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
