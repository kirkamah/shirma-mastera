import { useEffect, useMemo, useState, type JSX } from 'react'
import { GiTrashCan, GiMagnifyingGlass } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useSettings } from '../store/settings'
import { useSpellPopup } from '../store/spellPopup'
import { useCustom } from '../hooks/useCustom'
import { uid } from '../utils/monster'
import { SCHOOL_RU } from '@shared/translations'
import { RU_SPELLS } from '../data/spells-ru'
import { schoolVisual } from '../data/school-visuals'
import type { Spell } from '@shared/types'

type Source = 'ru' | 'open5e'
type SortMode = 'level' | 'school' | 'name'
const LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const levelLabel = (l: number): string => (l === 0 ? 'Заговор' : `${l} уровень`)
const levelHeader = (l: number): string => (l === 0 ? 'Заговоры' : `${l} уровень`)
const SORTS: { id: SortMode; label: string }[] = [
  { id: 'level', label: 'По уровню' },
  { id: 'school', label: 'По школе' },
  { id: 'name', label: 'По алфавиту' }
]

interface SpellGroup {
  key: string
  label: string
  spells: Spell[]
}

const SPELL_FIELDS: FormField[] = [
  { key: 'name', label: 'Название' },
  { key: 'level', label: 'Уровень (0–9)', type: 'number' },
  { key: 'school', label: 'Школа', type: 'select', options: Object.values(SCHOOL_RU).map((s) => ({ value: s, label: s })) },
  { key: 'castingTime', label: 'Время накладывания', placeholder: '1 действие' },
  { key: 'rangeText', label: 'Дистанция', placeholder: '60 футов' },
  { key: 'components', label: 'Компоненты', placeholder: 'В, С, М' },
  { key: 'duration', label: 'Длительность', placeholder: 'Мгновенная' },
  { key: 'concentration', label: 'Концентрация', type: 'checkbox' },
  { key: 'ritual', label: 'Ритуал', type: 'checkbox' },
  {
    key: 'classes',
    label: 'Классы',
    type: 'tags',
    placeholder: 'Например: Волшебник',
    suggestions: ['Бард', 'Жрец', 'Друид', 'Колдун', 'Паладин', 'Следопыт', 'Волшебник', 'Чародей', 'Изобретатель']
  },
  { key: 'desc', label: 'Описание', type: 'textarea' },
  { key: 'higherLevel', label: 'На более высоких уровнях', type: 'textarea' }
]

function spellToValues(s: Spell): FormValues {
  return {
    name: s.name, level: s.level, school: s.school, castingTime: s.castingTime ?? '', rangeText: s.rangeText ?? '',
    components: s.components, duration: s.duration ?? '', concentration: s.concentration, ritual: s.ritual,
    classes: s.classes.join(', '), desc: s.desc, higherLevel: s.higherLevel ?? ''
  }
}
function valuesToSpell(v: FormValues, key: string): Spell {
  return {
    key, name: String(v.name || 'Без названия'), level: Number(v.level) || 0, school: String(v.school || ''),
    castingTime: String(v.castingTime || '') || undefined, rangeText: String(v.rangeText || '') || undefined,
    components: String(v.components || ''), duration: String(v.duration || '') || undefined,
    concentration: Boolean(v.concentration), ritual: Boolean(v.ritual),
    classes: String(v.classes || '').split(',').map((s) => s.trim()).filter(Boolean),
    desc: String(v.desc || ''), higherLevel: String(v.higherLevel || '') || undefined
  }
}

export default function Spells(): JSX.Element {
  const edition = useSettings((s) => s.edition)
  const openSpell = useSpellPopup((s) => s.open)
  const { items: customSpells, save, remove } = useCustom<Spell>('spell')
  const [source, setSource] = useState<Source>('ru')
  const [fetched, setFetched] = useState<Spell[]>([])
  const [loading, setLoading] = useState(false)
  const [offline, setOffline] = useState(false)
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<number | 'all'>('all')
  const [school, setSchool] = useState<string>('all')
  const [sort, setSort] = useState<SortMode>('level')
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)

  const customKeys = useMemo(() => new Set(customSpells.map((c) => c.key)), [customSpells])
  const builtinSpellIds = useMemo(() => new Set(RU_SPELLS.map((s) => s.key)), [])
  const customByKey = useMemo(() => new Map(customSpells.map((c) => [c.key, c])), [customSpells])

  useEffect(() => {
    if (source !== 'open5e') return
    let mounted = true
    setLoading(true)
    window.api.open5e
      .searchSpells({ edition, limit: 400 })
      .then((res) => {
        if (!mounted) return
        setFetched(res.results)
        setOffline(res.offline)
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [source, edition])

  // For the RU set, overlay user overrides over built-in spells, then append fully custom ones.
  const pool =
    source === 'ru'
      ? [...RU_SPELLS.map((s) => customByKey.get(s.key) ?? s), ...customSpells.filter((c) => !builtinSpellIds.has(c.key))]
      : fetched
  const schools = useMemo(() => [...new Set(pool.map((s) => s.school))].filter(Boolean).sort(), [pool])
  const byName = (a: Spell, b: Spell): number => a.name.localeCompare(b.name, 'ru')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = pool.filter(
      (s) => (!q || s.name.toLowerCase().includes(q)) && (level === 'all' || s.level === level) && (school === 'all' || s.school === school)
    )
    if (sort === 'name') return list.sort(byName)
    if (sort === 'school') return list.sort((a, b) => a.school.localeCompare(b.school, 'ru') || a.level - b.level || byName(a, b))
    return list.sort((a, b) => a.level - b.level || byName(a, b))
  }, [pool, query, level, school, sort])

  // Section headers: by level (0→9) or by school (A→Я). Flat for alphabetical.
  const groups = useMemo<SpellGroup[]>(() => {
    if (sort === 'name') return [{ key: 'all', label: '', spells: filtered }]
    const map = new Map<string, SpellGroup>()
    for (const s of filtered) {
      const key = sort === 'level' ? String(s.level) : s.school
      const label = sort === 'level' ? levelHeader(s.level) : s.school
      const g = map.get(key) ?? { key, label, spells: [] }
      g.spells.push(s)
      map.set(key, g)
    }
    return [...map.values()]
  }, [filtered, sort])

  const sel = 'rounded-md border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm text-ink-brown focus:border-accent focus:outline-none'
  const hasFilters = query.trim() !== '' || level !== 'all' || school !== 'all'
  const resetFilters = (): void => {
    setQuery('')
    setLevel('all')
    setSchool('all')
  }
  const srcBtn = (id: Source, label: string): JSX.Element => (
    <button onClick={() => setSource(id)} className={`rounded-full px-3 py-1 text-xs font-semibold ${source === id ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/70 hover:border-accent/60'}`}>
      {label}
    </button>
  )

  return (
    <PageFrame
      title="Заклинания"
      subtitle={source === 'ru' ? `${RU_SPELLS.length + customSpells.length} заклинаний` : offline ? 'Офлайн — кэш' : 'Open5e (англ. описания)'}
      actions={
        <div className="flex items-center gap-1">
          {srcBtn('ru', 'Русские')}
          {srcBtn('open5e', 'Open5e')}
          <button
            onClick={() => setEditing({ key: null, values: { level: 1, school: 'Воплощение', castingTime: '1 действие', components: 'В, С', duration: 'Мгновенная', concentration: false, ritual: false } })}
            className="ml-1 rounded bg-accent px-2 py-1 text-xs font-semibold text-parchment hover:bg-accent/80"
          >
            + Заклинание
          </button>
        </div>
      }
    >
      <div className="mb-3 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-2.5 shadow-inner">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-44 flex-1">
            <GiMagnifyingGlass className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-brown/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск заклинания…"
              className="w-full rounded-md border border-ink-brown/30 bg-parchment/70 py-1.5 pl-8 pr-7 text-sm text-ink-brown focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
            {query && (
              <button onClick={() => setQuery('')} title="Очистить" className="absolute right-1.5 top-1/2 -translate-y-1/2 text-ink-brown/40 hover:text-accent">
                ✕
              </button>
            )}
          </div>
          <select value={level} onChange={(e) => setLevel(e.target.value === 'all' ? 'all' : +e.target.value)} className={sel}>
            <option value="all">Все уровни</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>{levelLabel(l)}</option>
            ))}
          </select>
          <select value={school} onChange={(e) => setSchool(e.target.value)} className={sel}>
            <option value="all">Все школы</option>
            {(schools.length ? schools : Object.values(SCHOOL_RU)).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex items-center overflow-hidden rounded-md border border-ink-brown/30">
            {SORTS.map((o) => (
              <button
                key={o.id}
                onClick={() => setSort(o.id)}
                className={`px-2.5 py-1 text-xs font-semibold transition-colors ${
                  sort === o.id ? 'bg-accent text-parchment' : 'bg-parchment/50 text-ink-brown/70 hover:bg-parchment/80'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            {loading ? 'Загрузка…' : `${filtered.length} закл.`}
          </span>
          {hasFilters && (
            <button onClick={resetFilters} className="text-xs text-ink-brown/55 underline decoration-dotted underline-offset-2 hover:text-accent">
              Сбросить
            </button>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {(schools.length ? schools : Object.values(SCHOOL_RU)).map((s) => {
            const { Icon, color } = schoolVisual(s)
            const active = school === s
            return (
              <button
                key={s}
                onClick={() => setSchool(active ? 'all' : s)}
                title={s}
                className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  active ? 'border-transparent text-parchment' : 'border-ink-brown/20 bg-parchment/50 text-ink-brown/75 hover:border-accent/50'
                }`}
                style={active ? { backgroundColor: color } : { color }}
              >
                <Icon className="shrink-0" />
                {s}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {groups.map((g) => {
          const head = g.label && sort === 'school' ? schoolVisual(g.label) : null
          return (
            <section key={g.key} className="mb-5">
              {g.label && (
                <h3 className="mb-2 flex items-center gap-2 border-b border-ink-brown/15 pb-1 font-serif text-base font-bold">
                  {head && <head.Icon className="text-xl" style={{ color: head.color }} />}
                  <span style={head ? { color: head.color } : undefined} className={head ? '' : 'text-accent'}>
                    {g.label}
                  </span>
                  <span className="text-xs font-normal text-ink-brown/45">{g.spells.length}</span>
                </h3>
              )}
              <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, 10.5rem)', justifyContent: 'start' }}>
                {g.spells.map((s) => {
                  const isCustom = customKeys.has(s.key)
                  const { Icon, color } = schoolVisual(s.school)
                  return (
                    <div key={s.key} className="relative">
                      {source === 'ru' && isCustom && (
                        <div className="absolute right-1 top-1 z-10 flex gap-1">
                          <button onClick={() => remove(s.key)} title={builtinSpellIds.has(s.key) ? 'Сбросить к оригиналу' : 'Удалить'} className="rounded bg-sidebar/80 px-1 text-xs text-accent hover:text-red-400">
                            {builtinSpellIds.has(s.key) ? '↺' : <GiTrashCan />}
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => openSpell(s, source === 'ru' ? (sp) => setEditing({ key: sp.key, values: spellToValues(sp) }) : undefined)}
                        className="flex h-full w-full flex-col gap-1.5 rounded-lg border border-ink-brown/20 bg-parchment-dark/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-parchment/70 hover:shadow-panel"
                      >
                        <div className="flex items-center gap-2 self-stretch">
                          <Icon className="shrink-0 text-3xl drop-shadow-sm" style={{ color }} title={s.school} />
                          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold wax-seal">
                            {s.level === 0 ? '0' : s.level}
                          </span>
                        </div>
                        <div className="line-clamp-2 font-serif text-[15px] font-semibold leading-tight text-accent">
                          {isCustom && '✎ '}
                          {s.name}
                        </div>
                        <div className="line-clamp-1 text-[11px] font-medium leading-tight" style={{ color }}>
                          {s.school}
                          <span className="text-ink-brown/65">
                            {s.concentration ? ' · конц.' : ''}
                            {s.ritual ? ' · ритуал' : ''}
                          </span>
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
        {filtered.length === 0 && !loading && <div className="p-6 text-center text-ink-brown/50">Ничего не найдено</div>}
      </div>

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? 'Новое заклинание' : 'Редактировать заклинание'}
          fields={SPELL_FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          onSave={(v, mode) => {
            const base = editing.key
            const key = mode === 'copy' || base === null ? uid('cspell') : base
            const sp = valuesToSpell(v, key)
            save(mode === 'copy' && !/\(копия\)/i.test(sp.name) ? { ...sp, name: `${sp.name} (копия)` } : sp)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
