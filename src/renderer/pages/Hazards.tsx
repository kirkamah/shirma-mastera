import { useEffect, useMemo, useState, type JSX } from 'react'
import { GiTrashCan, GiWolfTrap } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import DiceText from '../components/DiceText'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useCustom } from '../hooks/useCustom'
import { useNav } from '../store/nav'
import { uid } from '../utils/monster'
import { HAZARDS, HAZARD_CATEGORIES, TRAP_TIERS, TRAP_BASE_DAMAGE, TRAP_TIER_EFFECTS, scaleTrapDamage, type HazardCategory, type HazardItem } from '../data/hazards-ru'

interface CustomHazard {
  key: string
  name: string
  category: HazardCategory
  tag: string
  desc: string
}

const HAZARD_FIELDS: FormField[] = [
  { key: 'name', label: 'Название' },
  {
    key: 'category',
    label: 'Тип',
    type: 'select',
    options: [
      { value: 'trap', label: 'Ловушка' },
      { value: 'poison', label: 'Яд' },
      { value: 'disease', label: 'Болезнь' }
    ]
  },
  { key: 'tag', label: 'Подзаголовок', placeholder: 'напр. При попадании' },
  { key: 'desc', label: 'Описание / эффект', type: 'textarea' }
]

export default function Hazards(): JSX.Element {
  const { items: custom, save, remove } = useCustom<CustomHazard>('hazard')
  const [cat, setCat] = useState<HazardCategory>('trap')
  const [key, setKey] = useState<string>(HAZARDS.find((x) => x.category === 'trap')?.id ?? '')
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)
  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)

  const customKeys = useMemo(() => new Set(custom.map((c) => c.key)), [custom])
  const builtinIds = useMemo(() => new Set(HAZARDS.map((h) => h.id)), [])
  // Overlay overrides (same id as a built-in) in place, then append fully custom ones.
  const all: (HazardItem & { key?: string })[] = useMemo(() => {
    const byKey = new Map(
      custom.map((c) => [c.key, { id: c.key, key: c.key, name: c.name, category: c.category, tag: c.tag, desc: c.desc }])
    )
    const merged = HAZARDS.map((h) => byKey.get(h.id) ?? h)
    const extras = custom.filter((c) => !builtinIds.has(c.key)).map((c) => byKey.get(c.key)!)
    return [...merged, ...extras]
  }, [custom, builtinIds])
  // Selection from global search: switch to the item's category so it shows in the list.
  useEffect(() => {
    if (pending?.section !== 'hazards') return
    const found = all.find((x) => x.id === pending.key)
    if (found) {
      setCat(found.category)
      setKey(found.id)
    }
    clearPending()
  }, [pending, clearPending, all])

  const list = all.filter((x) => x.category === cat)
  const selected = list.find((x) => x.id === key) ?? list[0]
  const selIsOverride = selected ? customKeys.has(selected.id) && builtinIds.has(selected.id) : false
  const selIsCustomOnly = selected ? customKeys.has(selected.id) && !builtinIds.has(selected.id) : false

  const pick = (c: HazardCategory): void => {
    setCat(c)
    setKey(all.find((x) => x.category === c)?.id ?? '')
  }

  return (
    <PageFrame
      title="Опасности"
      subtitle="Ловушки, яды и болезни"
      actions={
        <button onClick={() => setEditing({ key: null, values: { category: cat } })} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">
          + Опасность
        </button>
      }
    >
      <div className="mb-2 flex gap-1">
        {HAZARD_CATEGORIES.map((c) => {
          const Icon = c.icon
          return (
          <button
            key={c.id}
            onClick={() => pick(c.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${cat === c.id ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}
          >
            <Icon className="text-base" /> {c.label}
          </button>
          )
        })}
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        <div className="w-60 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30">
          <ul className="divide-y divide-ink-brown/10">
            {list.map((x) => (
              <li key={x.id}>
                <button
                  onClick={() => setKey(x.id)}
                  className={`w-full px-3 py-2 text-left font-serif transition-colors ${selected?.id === x.id ? 'bg-accent/20 text-accent' : 'text-ink-brown/90 hover:bg-black/5'}`}
                >
                  {customKeys.has(x.id) && '✎ '}
                  {x.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          {selected && (
            <>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-accent">{selected.name}</h2>
                  {selected.tag && <p className="text-sm italic text-ink-brown/60">{selected.tag}</p>}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => setEditing({ key: selected.id, values: { name: selected.name, category: selected.category, tag: selected.tag ?? '', desc: selected.desc } })}
                    title="Редактировать"
                    className="rounded border border-accent/50 px-2 py-1 text-xs text-accent hover:bg-accent/10"
                  >
                    ✎
                  </button>
                  {(selIsCustomOnly || selIsOverride) && (
                    <button
                      onClick={() => { remove(selected.id); setKey('') }}
                      title={selIsOverride ? 'Сбросить к оригиналу' : 'Удалить'}
                      className="rounded border border-accent/40 px-2 py-1 text-xs text-accent hover:bg-accent/10"
                    >
                      {selIsOverride ? '↺' : <GiTrashCan />}
                    </button>
                  )}
                </div>
              </div>
              <hr className="fleuron" />
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
                <DiceText text={selected.desc} label={selected.name} />
              </p>

              {selected.category === 'trap' && (() => {
                const baseDmg = TRAP_BASE_DAMAGE[selected.name]
                const effects = TRAP_TIER_EFFECTS[selected.name]
                return (
                  <div className="mt-5 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-4">
                    <h3 className="mb-1 flex items-center gap-2 font-serif text-lg font-bold text-accent">
                      <GiWolfTrap className="shrink-0" /> Уровни силы ловушки (1–5)
                    </h3>
                    <p className="mb-3 text-[13px] leading-relaxed text-ink-brown/70">
                      {baseDmg ? (
                        <>
                          Чем выше уровень, тем сильнее масштабируется <b>собственный урон этой ловушки</b> (кликни по
                          костям, чтобы бросить), растёт СЛ и добавляются эффекты. Базовый уровень (2) — ровно как в
                          описании выше.
                        </>
                      ) : (
                        <>
                          Эта ловушка <b>не наносит урона</b> — повышение уровня лишь усиливает её эффект и поднимает СЛ.
                        </>
                      )}
                    </p>
                    <div className="overflow-hidden rounded-md border border-ink-brown/20">
                      <table className="w-full border-collapse text-left text-[13px]">
                        <thead>
                          <tr className="bg-accent/15 text-accent">
                            <th className="px-2 py-1.5 font-semibold">#</th>
                            <th className="px-2 py-1.5 font-semibold">Уровень</th>
                            <th className="px-2 py-1.5 font-semibold">Урон</th>
                            <th className="px-2 py-1.5 font-semibold">СЛ</th>
                            <th className="px-2 py-1.5 font-semibold">Дополнительный эффект</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TRAP_TIERS.map((tier) => (
                            <tr key={tier.level} className="border-t border-ink-brown/15 odd:bg-parchment/40 text-ink-brown">
                              <td className="px-2 py-1.5 text-center font-bold text-accent">{tier.level}</td>
                              <td className="whitespace-nowrap px-2 py-1.5 font-serif font-semibold">{tier.name}</td>
                              <td className="whitespace-nowrap px-2 py-1.5 font-semibold">
                                {baseDmg ? (
                                  <DiceText text={scaleTrapDamage(baseDmg, tier.factor)} label={`Урон · ${tier.name}`} />
                                ) : (
                                  <span className="text-ink-brown/40">—</span>
                                )}
                              </td>
                              <td className="px-2 py-1.5">{tier.dc}</td>
                              <td className="px-2 py-1.5 text-ink-brown/80">{effects?.[tier.level - 1] ?? tier.extra}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })()}
            </>
          )}
        </div>
      </div>

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? 'Новая опасность' : 'Редактировать опасность'}
          fields={HAZARD_FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          onSave={(v, mode) => {
            const base = editing.key
            const k = mode === 'copy' || base === null ? uid('chazard') : base
            const name = mode === 'copy' && !/\(копия\)/i.test(String(v.name)) ? `${v.name} (копия)` : String(v.name || 'Без названия')
            save({ key: k, name, category: String(v.category || 'trap') as HazardCategory, tag: String(v.tag || ''), desc: String(v.desc || '') })
            setCat(String(v.category || 'trap') as HazardCategory)
            setKey(k)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
