import { useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiTrashCan, GiPerspectiveDiceSixFacesRandom, GiDungeonGate } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import Modal from '../components/Modal'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useToolkit } from '../hooks/useToolkit'
import { useCustom } from '../hooks/useCustom'
import { pick } from '../utils/toolkitRoll'
import { uid } from '../utils/monster'
import { ROOMS, roomKindLabel } from '../data/toolkit/rooms'
import type { Room, RoomData } from '../data/toolkit/types'

/** Persisted basket entry: a chosen room snapshot for the assembled dungeon. */
interface BasketEntry { key: string; name: string; roomKey: string; roomName: string; kind: string; flavor: string }

const linesToText = (a?: readonly string[]): string => (a ?? []).join('\n')

function roomToValues(r: Room): FormValues {
  return { name: r.name, kind: r.data.kind, tags: r.tags.join(', '), flavor: r.data.flavor, mechanics: r.data.mechanics ?? '', hooks: linesToText(r.data.hooks), imageUrl: r.data.imageUrl ?? '' }
}
function valuesToRoom(v: FormValues, key: string): Room {
  const hooks = String(v.hooks || '').split('\n').map((s) => s.trim()).filter(Boolean)
  return {
    key, type: 'room', source: 'user',
    name: String(v.name || 'Без названия'),
    tags: String(v.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
    data: {
      kind: String(v.kind || 'other'),
      flavor: String(v.flavor || ''),
      mechanics: String(v.mechanics || '') || undefined,
      hooks: hooks.length ? hooks : undefined,
      imageUrl: String(v.imageUrl || '') || undefined
    }
  }
}

export default function Rooms(): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { items, saveUser, remove, fork } = useToolkit<RoomData>('room', ROOMS)
  const { items: basket, save: saveBasket, remove: removeBasket } = useCustom<BasketEntry>('dungeon_basket')

  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<string>('all')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)

  const kinds = useMemo(() => [...new Set(items.map((r) => r.data.kind))].sort(), [items])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((r) => (kind === 'all' || r.data.kind === kind) && (!q || r.name.toLowerCase().includes(q) || r.data.flavor.toLowerCase().includes(q)))
  }, [items, query, kind])

  const selected = items.find((r) => r.key === selectedKey) ?? null

  const addToBasket = (r: Room): void => {
    saveBasket({ key: uid('basket'), name: r.name, roomKey: r.key, roomName: r.name, kind: r.data.kind, flavor: r.data.flavor })
  }
  const rollRandom = (): void => {
    const pool = kind === 'all' ? filtered : items.filter((r) => r.data.kind === kind)
    const r = pick(pool.length ? pool : items)
    if (r) setSelectedKey(r.key)
  }

  const FIELDS: FormField[] = [
    { key: 'name', label: t('lore.rooms.fName') },
    { key: 'kind', label: t('lore.rooms.fKind'), placeholder: t('lore.rooms.fKindPh') },
    { key: 'tags', label: t('lore.rooms.fTags'), type: 'tags' },
    { key: 'flavor', label: t('lore.rooms.fFlavor'), type: 'textarea' },
    { key: 'mechanics', label: t('lore.rooms.fMechanics'), type: 'textarea' },
    { key: 'hooks', label: t('lore.rooms.fHooks'), type: 'textarea', placeholder: t('lore.rooms.fHooksPh') },
    { key: 'imageUrl', label: t('lore.rooms.fImage'), placeholder: 'https://…' }
  ]

  const sel = 'rounded-md border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none'

  return (
    <PageFrame
      title={t('nav.rooms')}
      subtitle={t('lore.rooms.subtitle', { n: items.length })}
      actions={
        <div className="flex items-center gap-1">
          <button onClick={rollRandom} className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/10"><GiPerspectiveDiceSixFacesRandom /> {t('lore.rooms.random')}</button>
          <button onClick={() => setEditing({ key: null, values: { kind: kind === 'all' ? '' : kind } })} className="ml-1 rounded bg-accent px-2 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">{t('lore.rooms.add')}</button>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex flex-wrap items-center gap-2 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-2.5 shadow-inner">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('lore.rooms.searchPh')} className="min-w-40 flex-1 rounded-md border border-ink-brown/30 bg-parchment/70 px-3 py-1.5 text-sm text-ink-brown focus:border-accent focus:outline-none" />
            <select value={kind} onChange={(e) => setKind(e.target.value)} className={sel}>
              <option value="all">{t('lore.rooms.allKinds')}</option>
              {kinds.map((k) => <option key={k} value={k}>{roomKindLabel(k, lang)}</option>)}
            </select>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))' }}>
              {filtered.map((r) => (
                <div key={r.key} className="flex flex-col gap-1 rounded-lg border border-ink-brown/20 bg-parchment-dark/40 p-3">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent">{roomKindLabel(r.data.kind, lang)}</span>
                    {r.source === 'user' && <span className="ml-auto text-accent">✎</span>}
                  </div>
                  <button onClick={() => setSelectedKey(r.key)} className="text-left font-serif text-[15px] font-semibold leading-tight text-accent hover:underline">{r.name}</button>
                  <p className="line-clamp-2 text-[13px] italic leading-snug text-ink-brown/75">{r.data.flavor}</p>
                  <button onClick={() => addToBasket(r)} className="mt-1 self-start rounded border border-accent/40 px-2 py-0.5 text-[11px] font-semibold text-accent hover:bg-accent/10">+ {t('lore.rooms.toBasket')}</button>
                </div>
              ))}
            </div>
            {filtered.length === 0 && <div className="p-6 text-center text-ink-brown/50">{t('common.empty')}</div>}
          </div>
        </div>

        {/* Dungeon basket */}
        <div className="flex w-72 shrink-0 flex-col overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-accent">{t('lore.rooms.basket')}</h3>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">{basket.length}</span>
          </div>
          {basket.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-ink-brown/45">
              <GiDungeonGate className="text-5xl text-accent/20" />
              <p className="text-xs">{t('lore.rooms.basketEmpty')}</p>
            </div>
          )}
          <ol className="space-y-1.5">
            {basket.map((b, i) => (
              <li key={b.key} className="rounded border border-ink-brown/15 bg-parchment/40 px-2 py-1.5">
                <div className="flex items-start gap-2">
                  <span className="font-serif text-sm font-bold text-accent/60">{i + 1}.</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-ink-brown">{b.roomName}</div>
                    <div className="text-[10px] uppercase tracking-wide text-ink-brown/45">{roomKindLabel(b.kind, lang)}</div>
                    <p className="line-clamp-2 text-[12px] italic text-ink-brown/65">{b.flavor}</p>
                  </div>
                  <button onClick={() => removeBasket(b.key)} className="text-ink-brown/40 hover:text-red-500">✕</button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {selected && (
        <Modal onClose={() => setSelectedKey(null)} max="max-w-2xl">
          <article className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">{roomKindLabel(selected.data.kind, lang)}</span>
                <h2 className="mt-1 font-serif text-3xl font-bold text-accent">{selected.name}</h2>
              </div>
              <div className="flex shrink-0 gap-1">
                {selected.source === 'user' ? (
                  <>
                    <button onClick={() => setEditing({ key: selected.key, values: roomToValues(selected) })} title={t('common.edit')} className="rounded border border-accent/50 px-2 py-1 text-sm text-accent hover:bg-accent/10">✎</button>
                    <button onClick={() => { remove(selected.key); setSelectedKey(null) }} title={t('common.delete')} className="rounded border border-accent/40 px-2 py-1 text-sm text-accent hover:bg-accent/10"><GiTrashCan /></button>
                  </>
                ) : (
                  <button onClick={async () => { const k = await fork(selected); setSelectedKey(k) }} className="rounded border border-accent/50 px-2 py-1 text-xs font-semibold text-accent hover:bg-accent/10">{t('lore.common.makeMine')}</button>
                )}
              </div>
            </div>
            {selected.data.imageUrl && <img src={selected.data.imageUrl} alt="" className="mt-3 max-h-64 w-full rounded object-cover" />}
            <p className="mt-2 text-[15px] italic leading-relaxed text-ink-brown/80">{selected.data.flavor}</p>
            {selected.data.mechanics && (
              <>
                <hr className="fleuron" />
                <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-accent/80">{t('lore.rooms.mechanics')}</h3>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">{selected.data.mechanics}</p>
              </>
            )}
            {selected.data.hooks && selected.data.hooks.length > 0 && (
              <>
                <h3 className="mt-3 font-serif text-sm font-semibold uppercase tracking-wide text-accent/80">{t('lore.rooms.hooks')}</h3>
                <ul className="list-disc pl-5 text-[15px] leading-relaxed text-ink-brown">{selected.data.hooks.map((h, i) => <li key={i}>{h}</li>)}</ul>
              </>
            )}
            <div className="mt-4 flex justify-end">
              <button onClick={() => { addToBasket(selected); setSelectedKey(null) }} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">+ {t('lore.rooms.toBasket')}</button>
            </div>
          </article>
        </Modal>
      )}

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? t('lore.rooms.newRoom') : t('lore.rooms.editRoom')}
          fields={FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          onSave={(v, mode) => {
            const base = editing.key
            const key = mode === 'copy' || base === null ? uid('c-room') : base
            const r = valuesToRoom(v, key)
            saveUser(mode === 'copy' && !/\(копия\)/i.test(r.name) ? { ...r, name: `${r.name} (копия)` } : r)
            setSelectedKey(key)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
