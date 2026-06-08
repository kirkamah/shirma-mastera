import { Fragment, useEffect, useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { GiTrashCan, GiBroadsword } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import DiceText from '../components/DiceText'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useCustom } from '../hooks/useCustom'
import { useNav } from '../store/nav'
import { uid } from '../utils/monster'
import {
  EQUIPMENT,
  EQUIP_CATEGORIES,
  equipmentFor,
  categoryLabel,
  armorTierLabel,
  mountTierLabel,
  masteryFor,
  type ArmorTier,
  type MountTier,
  type EquipCategory,
  type EquipItem
} from '../data/equipment-ru'

interface CustomEquip {
  key: string
  name: string
  category: EquipCategory
  cost: string
  weight: string
  props: string
  /** armor only: which armor subgroup it belongs to */
  tier?: ArmorTier
  /** mounts only: which transport subgroup it belongs to */
  mountTier?: MountTier
  /** weapons only: ranged vs melee subgroup */
  ranged?: boolean
}

/** Renders an item description: splits into sections, bolds the leading keyword
 *  (e.g. «Компоненты», «Магия»), and draws a divider between sections. */
function EquipDescription({ text, label }: { text: string; label: string }): JSX.Element {
  const paras = text.split('\n\n').filter((p) => p.trim() !== '')
  return (
    <div>
      {paras.map((p, i) => {
        const m = p.match(/^([^.:\n]{1,28}[.:])([\s\S]*)$/)
        const keyword = m ? m[1] : null
        const rest = m ? m[2] : p
        const isActionsTable = keyword !== null && /Действия/i.test(keyword)
        return (
          <Fragment key={i}>
            {i > 0 && <hr className="my-2 border-t border-ink-brown/20" />}
            {isActionsTable ? (
              <div>
                <b className="font-semibold text-accent">{keyword}</b>
                <table className="mt-1 w-auto border-collapse text-sm">
                  <thead>
                    <tr className="bg-accent/10 text-[11px] uppercase tracking-wide text-accent/80">
                      <th className="border border-ink-brown/30 px-3 py-1 text-left font-semibold">Действие</th>
                      <th className="border border-ink-brown/30 px-3 py-1 text-left font-semibold">Сложность</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rest
                      .split('\n')
                      .map((l) => l.trim())
                      .filter(Boolean)
                      .map((line, j) => {
                        const parts = line.split(/\s*—\s*/)
                        const action = parts[0]
                        const dc = parts.slice(1).join(' — ')
                        return (
                          <tr key={j}>
                            <td className="border border-ink-brown/30 px-3 py-1 text-ink-brown">{action}</td>
                            <td className="whitespace-nowrap border border-ink-brown/30 px-3 py-1 font-semibold text-accent">{dc || '—'}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
                {keyword && <b className="font-semibold text-accent">{keyword}</b>}
                <DiceText text={rest} label={label} />
              </p>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

interface SubGroup {
  label: string | null
  items: EquipItem[]
}

function subgroups(category: EquipCategory, items: EquipItem[], lang: string, t: (k: string) => string): SubGroup[] {
  if (category === 'weapon-simple' || category === 'weapon-martial') {
    const melee = items.filter((i) => !i.ranged)
    const ranged = items.filter((i) => i.ranged)
    const out: SubGroup[] = []
    if (melee.length) out.push({ label: t('equip.melee'), items: melee })
    if (ranged.length) out.push({ label: t('equip.rangedGroup'), items: ranged })
    return out
  }
  if (category === 'armor') {
    const order: ArmorTier[] = ['light', 'medium', 'heavy', 'shield']
    const out: SubGroup[] = order.map((tier) => ({ label: armorTierLabel(tier, lang), items: items.filter((i) => i.tier === tier) }))
    const rest = items.filter((i) => !i.tier)
    if (rest.length) out.push({ label: t('equip.otherGroup'), items: rest })
    return out.filter((g) => g.items.length)
  }
  if (category === 'mounts') {
    const order: MountTier[] = ['beast', 'tack', 'cart', 'ship']
    const out: SubGroup[] = order.map((tier) => ({ label: mountTierLabel(tier, lang), items: items.filter((i) => i.mountTier === tier) }))
    const rest = items.filter((i) => !i.mountTier)
    if (rest.length) out.push({ label: t('equip.otherGroup'), items: rest })
    return out.filter((g) => g.items.length)
  }
  return [{ label: null, items }]
}

export default function Equipment(): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { items: custom, save, remove } = useCustom<CustomEquip>('equipment')
  const [cat, setCat] = useState<EquipCategory | 'all'>('weapon-simple')

  const EQUIP_FIELDS: FormField[] = useMemo(
    () => [
      { key: 'name', label: t('equip.fName') },
      { key: 'category', label: t('equip.fCategory'), type: 'select', options: EQUIP_CATEGORIES.map((c) => ({ value: c.id, label: categoryLabel(c, lang) })) },
      {
        key: 'tier',
        label: t('equip.fTier'),
        type: 'select',
        options: (['light', 'medium', 'heavy', 'shield'] as ArmorTier[]).map((tr) => ({ value: tr, label: armorTierLabel(tr, lang) })),
        showIf: (v) => v.category === 'armor'
      },
      {
        key: 'mountTier',
        label: t('equip.fMountTier'),
        type: 'select',
        options: (['beast', 'tack', 'cart', 'ship'] as MountTier[]).map((tr) => ({ value: tr, label: mountTierLabel(tr, lang) })),
        showIf: (v) => v.category === 'mounts'
      },
      { key: 'ranged', label: t('equip.fRanged'), type: 'checkbox', showIf: (v) => v.category === 'weapon-simple' || v.category === 'weapon-martial' },
      { key: 'cost', label: t('equip.cost'), placeholder: t('equip.costPh') },
      { key: 'weight', label: t('equip.weight'), placeholder: t('equip.weightPh') },
      { key: 'props', label: t('equip.fProps'), type: 'textarea' }
    ],
    [t, lang]
  )
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string>('')
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)
  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)

  const customKeys = useMemo(() => new Set(custom.map((c) => c.key)), [custom])
  const builtinIds = useMemo(() => new Set(EQUIPMENT.map((e) => e.id)), [])
  // Overlay overrides (same id as a built-in) in place, then append fully custom ones.
  const all: EquipItem[] = useMemo(() => {
    const byKey = new Map(custom.map((c) => [c.key, { ...c, id: c.key }]))
    const merged = equipmentFor(lang).map((e) => byKey.get(e.id) ?? e)
    const extras = custom.filter((c) => !builtinIds.has(c.key)).map((c) => ({ ...c, id: c.key }))
    return [...merged, ...extras]
  }, [custom, builtinIds, lang])

  // Selection from global search: switch to the item's category so it shows in the list.
  useEffect(() => {
    if (pending?.section !== 'equipment') return
    const found = all.find((e) => e.id === pending.key)
    if (found) {
      setQuery('')
      setCat(found.category)
      setSelectedId(found.id)
    }
    clearPending()
  }, [pending, clearPending, all])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter((e) => (cat === 'all' || e.category === cat) && (!q || e.name.toLowerCase().includes(q)))
  }, [all, cat, query])

  const categoriesShown = EQUIP_CATEGORIES.filter((c) => filtered.some((e) => e.category === c.id))
  const selected = all.find((e) => e.id === selectedId) ?? filtered[0]
  const selIsOverride = selected ? customKeys.has(selected.id) && builtinIds.has(selected.id) : false
  const selIsCustomOnly = selected ? customKeys.has(selected.id) && !builtinIds.has(selected.id) : false

  const tile = (e: EquipItem): JSX.Element => (
    <button
      key={e.id}
      onClick={() => setSelectedId(e.id)}
      title={e.name}
      className={`flex h-11 items-center justify-center rounded border px-1.5 text-center text-[13px] font-semibold leading-tight transition-all ${
        selected?.id === e.id
          ? 'border-accent bg-accent/25 text-accent shadow-sm'
          : 'border-ink-brown/20 bg-parchment-dark/30 text-ink-brown/90 hover:border-accent/60 hover:bg-parchment/60'
      }`}
    >
      <span className="line-clamp-2">
        {customKeys.has(e.id) && '✎ '}
        {e.name}
      </span>
    </button>
  )

  const chip = (id: EquipCategory | 'all', label: string, Icon?: IconType): JSX.Element => (
    <button
      onClick={() => setCat(id)}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${cat === id ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}
    >
      {Icon && <Icon className="text-sm" />}
      {label}
    </button>
  )

  return (
    <PageFrame
      title={t('equip.title')}
      subtitle={t('equip.subtitle')}
      actions={
        <button onClick={() => setEditing({ key: null, values: { category: cat === 'all' ? 'gear' : cat, tier: 'medium', mountTier: 'beast', ranged: false } })} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">
          {t('equip.addItem')}
        </button>
      }
    >
      <div className="mb-2 flex flex-wrap items-center gap-1">
        {chip('all', t('equip.all'))}
        {EQUIP_CATEGORIES.map((c) => chip(c.id, categoryLabel(c, lang), c.icon))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('equip.searchPh')}
          className="ml-auto rounded-md border border-ink-brown/30 bg-parchment/60 px-3 py-1 text-sm text-ink-brown placeholder:text-ink-brown/40 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        {/* List: 2-column tile grid per category, names only. */}
        <div className="w-80 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30">
          {categoriesShown.length === 0 && <div className="p-4 text-sm text-ink-brown/50">{t('common.empty')}</div>}
          {categoriesShown.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.id}>
                <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1 font-serif text-sm font-semibold text-accent">
                  <Icon className="text-base" /> {categoryLabel(c, lang)}
                </div>
                {subgroups(c.id, filtered.filter((e) => e.category === c.id), lang, t).map((sg, i) => {
                  // Custom-only items (not overrides of a built-in) get split off behind a divider.
                  const official = sg.items.filter((e) => !(customKeys.has(e.id) && !builtinIds.has(e.id)))
                  const mine = sg.items.filter((e) => customKeys.has(e.id) && !builtinIds.has(e.id))
                  return (
                    <Fragment key={i}>
                      {sg.label && (
                        <div className="flex items-center gap-2 px-3 pt-1.5 text-[10px] uppercase tracking-wide text-ink-brown/45">
                          <span>{sg.label}</span>
                          <span className="h-px flex-1 bg-ink-brown/20" />
                        </div>
                      )}
                      {official.length > 0 && <div className="grid grid-cols-2 gap-1 p-1">{official.map(tile)}</div>}
                      {mine.length > 0 && (
                        <>
                          <div className="flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-wide text-accent/70">
                            <span className="h-px flex-1 bg-accent/30" />
                            <span>{t('equip.customGroup')}</span>
                            <span className="h-px flex-1 bg-accent/30" />
                          </div>
                          <div className="grid grid-cols-2 gap-1 p-1">{mine.map(tile)}</div>
                        </>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Detail */}
        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          {selected ? (
            <article className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-serif text-3xl font-bold text-accent">{selected.name}</h2>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => setEditing({ key: selected.id, values: { name: selected.name, category: selected.category, cost: selected.cost, weight: selected.weight, props: selected.props, tier: selected.tier ?? 'medium', mountTier: selected.mountTier ?? 'beast', ranged: selected.ranged ?? false } })}
                    title={t('common.edit')}
                    className="rounded border border-accent/50 px-2 py-1 text-xs text-accent hover:bg-accent/10"
                  >
                    ✎
                  </button>
                  {(selIsCustomOnly || selIsOverride) && (
                    <button
                      onClick={() => { remove(selected.id); setSelectedId('') }}
                      title={selIsOverride ? t('equip.resetOriginal') : t('common.delete')}
                      className="rounded border border-accent/40 px-2 py-1 text-xs text-accent hover:bg-accent/10"
                    >
                      {selIsOverride ? '↺' : <GiTrashCan />}
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm italic text-ink-brown/60">
                {(() => {
                  const c = EQUIP_CATEGORIES.find((x) => x.id === selected.category)
                  return c ? categoryLabel(c, lang) : ''
                })()}
                {selected.tier ? ` · ${armorTierLabel(selected.tier, lang)}` : ''}
                {selected.ranged ? ` · ${t('equip.ranged')}` : ''}
                {selected.mastery ? ` · ${t('equip.masteryInline')}: ${masteryFor(selected.mastery, lang).name}` : ''}
              </p>
              <hr className="fleuron" />
              <div className="mb-2 flex gap-6 text-sm text-ink-brown">
                <span><b className="text-accent">{t('equip.cost')}:</b> {selected.cost}</span>
                <span><b className="text-accent">{t('equip.weight')}:</b> {selected.weight}</span>
              </div>
              <EquipDescription text={selected.props} label={selected.name} />
              {selected.mastery && (
                <div className="mt-3 rounded-md border border-gold/40 bg-gold/10 p-3">
                  <div className="flex items-center gap-1.5 font-serif text-sm font-semibold text-accent">
                    <GiBroadsword className="shrink-0" /> {t('equip.weaponMastery')}: {masteryFor(selected.mastery, lang).name}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-brown">{masteryFor(selected.mastery, lang).desc}</p>
                </div>
              )}
            </article>
          ) : (
            <div className="flex h-full items-center justify-center text-ink-brown/40">{t('equip.selectPrompt')}</div>
          )}
        </div>
      </div>

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? t('equip.newItem') : t('equip.editItem')}
          fields={EQUIP_FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          onSave={(v, mode) => {
            const base = editing.key
            const key = mode === 'copy' || base === null ? uid('cequip') : base
            const name = mode === 'copy' && !/\(копия\)/i.test(String(v.name)) ? `${v.name} (копия)` : String(v.name || 'Без названия')
            const category = (String(v.category) as EquipCategory) || 'gear'
            save({
              key,
              name,
              category,
              cost: String(v.cost || '—'),
              weight: String(v.weight || '—'),
              props: String(v.props || ''),
              tier: category === 'armor' ? (String(v.tier || 'medium') as ArmorTier) : undefined,
              mountTier: category === 'mounts' ? (String(v.mountTier || 'beast') as MountTier) : undefined,
              ranged: category === 'weapon-simple' || category === 'weapon-martial' ? Boolean(v.ranged) : undefined
            })
            setSelectedId(key)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
