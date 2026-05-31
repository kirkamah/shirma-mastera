import { useEffect, useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiTrashCan } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import Portrait, { emblemForRace } from '../components/Portrait'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { RACES, type RaceCategory, type RaceData } from '../data/races'
import { useCustom } from '../hooks/useCustom'
import { useNav } from '../store/nav'
import { uid } from '../utils/monster'

/** A persisted race override / custom race. Key doubles as the race id. */
type StoredRace = RaceData & { key: string }

const RACE_FIELDS: FormField[] = [
  { key: 'name', label: 'Название' },
  { key: 'category', label: 'Категория', type: 'select', options: [{ value: 'player', label: 'Игровая' }, { value: 'enemy', label: 'Враждебная' }] },
  { key: 'source', label: 'Источник (бейдж)', placeholder: 'PHB 2014' },
  { key: 'subraces', label: 'Подвиды (через запятую)', placeholder: 'Высший, Лесной…' },
  { key: 'origin', label: 'Происхождение и история', type: 'textarea' },
  { key: 'society', label: 'Общество и культура', type: 'textarea' },
  { key: 'culture', label: 'Обычаи и ритуалы', type: 'textarea' },
  { key: 'faith', label: 'Вера и боги', type: 'textarea' },
  { key: 'personality', label: 'Характер и поведение', type: 'textarea' },
  { key: 'habitat', label: 'Среда обитания', type: 'textarea' },
  { key: 'relations', label: 'Отношения с другими расами', type: 'textarea' },
  { key: 'notable', label: 'Известные личности и фракции', type: 'textarea' }
]

function raceToValues(r: RaceData): FormValues {
  return {
    name: r.name, category: r.category, source: r.source ?? '', subraces: (r.subraces ?? []).join(', '),
    origin: r.origin, society: r.society, culture: r.culture ?? '', faith: r.faith ?? '',
    personality: r.personality, habitat: r.habitat, relations: r.relations, notable: r.notable
  }
}
function valuesToRace(v: FormValues, id: string): StoredRace {
  const subraces = String(v.subraces || '').split(',').map((s) => s.trim()).filter(Boolean)
  return {
    key: id, id,
    name: String(v.name || 'Без названия'),
    category: (v.category === 'enemy' ? 'enemy' : 'player') as RaceCategory,
    source: String(v.source || '') || undefined,
    subraces: subraces.length ? subraces : undefined,
    origin: String(v.origin || ''), society: String(v.society || ''),
    culture: String(v.culture || '') || undefined, faith: String(v.faith || '') || undefined,
    personality: String(v.personality || ''),
    habitat: String(v.habitat || ''), relations: String(v.relations || ''), notable: String(v.notable || '')
  }
}

function Section({ title, text }: { title: string; text?: string }): JSX.Element | null {
  if (!text || !text.trim()) return null
  return (
    <section className="mt-4">
      <h3 className="tome-heading mb-1 font-serif text-lg font-semibold">{title}</h3>
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">{text}</p>
    </section>
  )
}

function NameColumn({ title, names }: { title: string; names: string[] }): JSX.Element | null {
  if (!names.length) return null
  return (
    <div className="min-w-0 flex-1">
      <h4 className="mb-1 font-serif text-sm font-semibold uppercase tracking-wide text-accent/80">{title}</h4>
      <ul className="space-y-0.5 text-[14px] leading-snug text-ink-brown">
        {names.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

function Names({ names }: { names: NonNullable<RaceData['names']> }): JSX.Element {
  return (
    <section className="mt-4">
      <h3 className="tome-heading mb-2 font-serif text-lg font-semibold">Имена</h3>
      <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-3">
        <NameColumn title="Мужские" names={names.male} />
        <NameColumn title="Женские" names={names.female} />
        <NameColumn title={names.familyLabel ?? 'Фамилии'} names={names.family} />
      </div>
    </section>
  )
}

export default function Races(): JSX.Element {
  const { t } = useTranslation()
  const { items: overrides, save, remove } = useCustom<StoredRace>('race')
  const [selectedId, setSelectedId] = useState<string>(RACES[0].id)
  const [editing, setEditing] = useState<RaceData | null | 'new'>(null)
  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)

  // Apply persisted overrides on top of the built-in races, then append fully custom ones.
  const { races, overriddenIds, customIds } = useMemo(() => {
    const map = new Map(overrides.map((o) => [o.id, o]))
    const baseIds = new Set(RACES.map((r) => r.id))
    // Spread so fields not present in the edit form (e.g. name tables) survive overrides.
    const merged = RACES.map((r) => (map.has(r.id) ? { ...r, ...map.get(r.id)! } : r))
    const extras = overrides.filter((o) => !baseIds.has(o.id))
    return {
      races: [...merged, ...extras],
      overriddenIds: new Set(overrides.filter((o) => baseIds.has(o.id)).map((o) => o.id)),
      customIds: new Set(extras.map((o) => o.id))
    }
  }, [overrides])

  const selected = races.find((r) => r.id === selectedId) ?? races[0]

  useEffect(() => {
    if (pending?.section === 'races') {
      if (races.some((x) => x.id === pending.key)) setSelectedId(pending.key)
      clearPending()
    }
  }, [pending, clearPending, races])

  const players = races.filter((r) => r.category === 'player')
  const enemies = races.filter((r) => r.category === 'enemy')
  const isEdited = overriddenIds.has(selected.id)
  const isCustom = customIds.has(selected.id)

  const renderGroup = (label: string, list: RaceData[]): JSX.Element => (
    <div>
      <div className="px-3 py-1 font-serif text-xs font-semibold uppercase tracking-wide text-ink-brown/50">{label}</div>
      {list.map((r) => (
        <button
          key={r.id}
          onClick={() => setSelectedId(r.id)}
          className={`flex w-full items-center gap-2 px-2 py-1.5 text-left transition-colors ${
            selected.id === r.id ? 'rounded bg-accent/20 text-accent' : 'text-ink-brown/90 hover:bg-black/5'
          }`}
        >
          <Portrait emblem={emblemForRace(r.id)} size={30} />
          <span className="flex-1 font-serif font-semibold">{r.name}</span>
          {(overriddenIds.has(r.id) || customIds.has(r.id)) && <span className="text-[11px] text-gold" title="Изменено">✎</span>}
        </button>
      ))}
    </div>
  )

  return (
    <PageFrame
      title={t('races.title')}
      subtitle="Хроники народов"
      actions={
        <button onClick={() => setEditing('new')} className="rounded bg-accent px-2 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">
          + Раса
        </button>
      }
    >
      <div className="flex min-h-0 flex-1 gap-3">
        <div className="w-52 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30 py-1">
          {renderGroup(t('races.playerRaces'), players)}
          {renderGroup(t('races.enemyRaces'), enemies)}
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          <div className="flex items-start gap-4 border-b-2 border-accent/30 pb-3">
            <Portrait emblem={emblemForRace(selected.id)} size={80} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-4xl font-bold text-accent">{selected.name}</h2>
                {selected.source && (
                  <span className="rounded-full border border-gold/50 px-2 py-0.5 text-[11px] font-semibold text-gold">
                    {selected.source}
                  </span>
                )}
              </div>
              {selected.subraces && <p className="text-sm italic text-ink-brown/70">{selected.subraces.join(' · ')}</p>}
            </div>
            {(
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  onClick={() => setEditing(selected)}
                  className="rounded border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20"
                >
                  ✎ Редактировать лор
                </button>
                {(isEdited || isCustom) && (
                  <button
                    onClick={() => {
                      if (!window.confirm(isCustom ? `Удалить расу «${selected.name}»?` : `Вернуть оригинальный лор «${selected.name}»?`)) return
                      remove(selected.id)
                      if (isCustom) setSelectedId(RACES[0].id)
                    }}
                    className="rounded border border-ink-brown/30 px-3 py-1 text-xs text-ink-brown/80 hover:bg-black/5"
                  >
                    {isCustom ? <span className="inline-flex items-center gap-1"><GiTrashCan /> Удалить расу</span> : '↺ Сбросить лор'}
                  </button>
                )}
              </div>
            )}
          </div>
          <Section title={t('races.origin')} text={selected.origin} />
          <Section title={t('races.society')} text={selected.society} />
          <Section title="Обычаи и ритуалы" text={selected.culture} />
          <Section title="Вера и боги" text={selected.faith} />
          <Section title={t('races.personality')} text={selected.personality} />
          <Section title={t('races.habitat')} text={selected.habitat} />
          <Section title={t('races.relations')} text={selected.relations} />
          <Section title={t('races.notable')} text={selected.notable} />
          {selected.names && <Names names={selected.names} />}
        </div>
      </div>

      {editing && (
        <CustomFormDialog
          title={editing === 'new' ? 'Новая раса' : `Редактировать: ${editing.name}`}
          fields={RACE_FIELDS}
          initial={editing === 'new' ? { category: 'player' } : raceToValues(editing)}
          allowCopy={editing !== 'new'}
          onSave={(v, mode) => {
            const base = editing === 'new' ? null : editing.id
            const id = mode === 'copy' || base === null ? uid('crace') : base
            const name = mode === 'copy' && !/\(копия\)/i.test(String(v.name)) ? `${v.name} (копия)` : String(v.name)
            save(valuesToRace({ ...v, name }, id))
            setSelectedId(id)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
