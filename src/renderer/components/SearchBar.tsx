import { useCallback, useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  GiDragonHead,
  GiBattleGear,
  GiSpellBook,
  GiStarMedal,
  GiScrollUnfurled,
  GiElfHelmet,
  GiBroadsword,
  GiPoisonBottle,
  GiVortex,
  GiOpenBook,
  GiScrollQuill
} from 'react-icons/gi'
import { useNav, type SearchSection } from '../store/nav'
import { useSpellPopup } from '../store/spellPopup'
import { useConditionPopup } from '../store/conditionPopup'
import { useFeatPopup } from '../store/featPopup'
import { useGlossaryPopup } from '../store/glossaryPopup'
import type { Spell, ConditionItem } from '@shared/types'
import type { FeatBuild } from '../data/character-build'
import type { GlossaryTerm } from '../data/glossary'

/** Search groups, in display order. Each result row carries its `group`, and the
 *  group config decides how a click resolves: either navigate to a page (and let
 *  that page select the item via the nav store) or open a global popup. */
type GroupId =
  | 'bestiary'
  | 'classes'
  | 'spells'
  | 'feats'
  | 'backgrounds'
  | 'races'
  | 'equipment'
  | 'hazards'
  | 'conditions'
  | 'glossary'
  | 'rules'

interface GroupConfig {
  id: GroupId
  label: string
  icon: IconType
  /** Page-navigation groups: route + the nav-store section the page listens for. */
  route?: string
  section?: SearchSection
  /** Popup groups open a global popup instead of navigating. */
  popup?: 'spell' | 'condition' | 'feat' | 'glossary'
}

const GROUPS: GroupConfig[] = [
  { id: 'bestiary', label: 'Бестиарий', icon: GiDragonHead, route: '/bestiary', section: 'bestiary' },
  { id: 'classes', label: 'Классы', icon: GiBattleGear, route: '/character', section: 'classes' },
  { id: 'spells', label: 'Заклинания', icon: GiSpellBook, popup: 'spell' },
  { id: 'feats', label: 'Черты', icon: GiStarMedal, popup: 'feat' },
  { id: 'backgrounds', label: 'Предыстории', icon: GiScrollUnfurled, route: '/character', section: 'backgrounds' },
  { id: 'races', label: 'Расы', icon: GiElfHelmet, route: '/races', section: 'races' },
  { id: 'equipment', label: 'Снаряжение', icon: GiBroadsword, route: '/equipment', section: 'equipment' },
  { id: 'hazards', label: 'Опасности', icon: GiPoisonBottle, route: '/hazards', section: 'hazards' },
  { id: 'rules', label: 'Опциональные правила', icon: GiScrollQuill, route: '/rules', section: 'rules' },
  { id: 'conditions', label: 'Состояния', icon: GiVortex, popup: 'condition' },
  { id: 'glossary', label: 'Термины', icon: GiOpenBook, popup: 'glossary' }
]

const GROUP_BY_ID = Object.fromEntries(GROUPS.map((g) => [g.id, g])) as Record<GroupId, GroupConfig>

interface Entry {
  group: GroupId
  key: string
  label: string
  sub: string
  /** Source object — used by popup groups to open the right item. */
  data: unknown
}

/** How many items to show per expanded group before a "показать ещё" note. */
const PER_GROUP_CAP = 30

export default function SearchBar(): JSX.Element {
  const navigate = useNavigate()
  const setPending = useNav((s) => s.setPending)
  const openSpell = useSpellPopup((s) => s.open)
  const openCondition = useConditionPopup((s) => s.open)
  const openFeat = useFeatPopup((s) => s.open)
  const openGlossary = useGlossaryPopup((s) => s.open)

  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState<Entry[] | null>(null)
  const [loadingIndex, setLoadingIndex] = useState(false)
  // Which groups the user has manually expanded/collapsed this query.
  const [expanded, setExpanded] = useState<Set<GroupId>>(new Set())

  // The search index pulls in every big data file, so it is built lazily on first
  // use (dynamic import) — this keeps it out of the initial bundle, matching how
  // the page chunks are code-split in App.tsx.
  const loadIndex = useCallback(async (): Promise<void> => {
    if (index || loadingIndex) return
    setLoadingIndex(true)
    try {
      const [bestiary, spells, conditions, build, equip, hazards, races, glossary, rules] = await Promise.all([
        import('../data/bestiary-ru'),
        import('../data/spells-ru'),
        import('../data/conditions-fallback'),
        import('../data/character-build'),
        import('../data/equipment-ru'),
        import('../data/hazards-ru'),
        import('../data/races'),
        import('../data/glossary'),
        import('../data/optional-rules')
      ])

      const equipCatLabel = new Map(equip.EQUIP_CATEGORIES.map((c) => [c.id, c.label]))
      const hazardCatLabel = new Map(hazards.HAZARD_CATEGORIES.map((c) => [c.id, c.label]))

      const e: Entry[] = []
      for (const m of bestiary.RU_BESTIARY)
        e.push({ group: 'bestiary', key: m.key, label: m.name, sub: `${m.type} · ПО ${m.crDisplay}`, data: m })
      for (const c of build.CLASS_BUILDS)
        e.push({ group: 'classes', key: c.id, label: c.name, sub: 'Класс', data: c })
      for (const s of spells.RU_SPELLS)
        e.push({
          group: 'spells',
          key: s.key,
          label: s.name,
          sub: s.level === 0 ? `Заговор · ${s.school}` : `${s.level} ур. · ${s.school}`,
          data: s
        })
      for (const f of build.FEAT_BUILDS)
        e.push({ group: 'feats', key: f.id, label: f.name, sub: f.prereq ? `Черта · ${f.prereq}` : 'Черта', data: f })
      for (const b of build.BACKGROUND_BUILDS)
        e.push({ group: 'backgrounds', key: b.id, label: b.name, sub: 'Предыстория', data: b })
      for (const r of races.RACES)
        e.push({ group: 'races', key: r.id, label: r.name, sub: r.category === 'player' ? 'Раса' : 'Враждебная раса', data: r })
      for (const item of equip.EQUIPMENT)
        e.push({ group: 'equipment', key: item.id, label: item.name, sub: equipCatLabel.get(item.category) ?? 'Снаряжение', data: item })
      for (const h of hazards.HAZARDS)
        e.push({ group: 'hazards', key: h.id, label: h.name, sub: hazardCatLabel.get(h.category) ?? 'Опасность', data: h })
      for (const c of conditions.FALLBACK_CONDITIONS)
        e.push({ group: 'conditions', key: c.key, label: c.name, sub: 'Состояние', data: c })
      for (const term of glossary.GLOSSARY_TERMS)
        e.push({ group: 'glossary', key: term.name, label: term.name, sub: term.category, data: term })
      for (const r of rules.OPTIONAL_RULES)
        e.push({ group: 'rules', key: r.id, label: r.name, sub: r.tag ?? r.category, data: r })

      setIndex(e)
    } finally {
      setLoadingIndex(false)
    }
  }, [index, loadingIndex])

  // Group the matches by section. Results stay grouped so that a flood of one
  // section (e.g. many "Плут" enemies) never buries the others.
  const grouped = useMemo<{ group: GroupConfig; items: Entry[] }[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q || !index) return []
    const byGroup = new Map<GroupId, Entry[]>()
    for (const entry of index) {
      if (!entry.label.toLowerCase().includes(q)) continue
      const arr = byGroup.get(entry.group)
      if (arr) arr.push(entry)
      else byGroup.set(entry.group, [entry])
    }
    return GROUPS.filter((g) => byGroup.has(g.id)).map((g) => ({ group: g, items: byGroup.get(g.id)! }))
  }, [query, index])

  // Reset manual expansion whenever the query changes. A single matching section
  // auto-expands (nothing to disambiguate); with several, all start collapsed so
  // the user picks a section first.
  useEffect(() => {
    setExpanded(grouped.length === 1 ? new Set(grouped.map((g) => g.group.id)) : new Set())
  }, [query, grouped.length])

  const toggleGroup = (id: GroupId): void => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Ctrl/Cmd+K focuses the search field.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent): void => {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = (): void => {
    setQuery('')
    setOpen(false)
    setExpanded(new Set())
    inputRef.current?.blur()
  }

  const go = (entry: Entry): void => {
    const cfg = GROUP_BY_ID[entry.group]
    if (cfg.popup) {
      if (cfg.popup === 'spell') openSpell(entry.data as Spell)
      else if (cfg.popup === 'condition') openCondition(entry.data as ConditionItem)
      else if (cfg.popup === 'feat') openFeat(entry.data as FeatBuild)
      else if (cfg.popup === 'glossary') openGlossary(entry.data as GlossaryTerm)
    } else if (cfg.section && cfg.route) {
      setPending(cfg.section, entry.key)
      navigate(cfg.route)
    }
    close()
  }

  const totalCount = grouped.reduce((n, g) => n + g.items.length, 0)
  const showDropdown = open && query.trim().length > 0

  return (
    <div className="relative w-72">
      <input
        ref={inputRef}
        value={query}
        onFocus={() => {
          setOpen(true)
          void loadIndex()
        }}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          void loadIndex()
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(ev) => {
          if (ev.key === 'Escape') close()
        }}
        placeholder="Поиск…  (Ctrl+K)"
        className="w-full rounded-full border border-gold/30 bg-black/30 px-3 py-1 text-sm text-parchment placeholder:text-parchment/40 focus:border-gold/60 focus:outline-none"
      />
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[70vh] overflow-y-auto rounded-md border border-gold/40 bg-sidebar shadow-panel">
          {loadingIndex && !index && <div className="px-3 py-3 text-center text-sm text-parchment/50">Загрузка…</div>}
          {index && totalCount === 0 && <div className="px-3 py-3 text-center text-sm text-parchment/50">Ничего не найдено</div>}
          {grouped.map(({ group, items }) => {
            const Icon = group.icon
            const isOpen = expanded.has(group.id)
            const shown = items.slice(0, PER_GROUP_CAP)
            return (
              <div key={group.id} className="border-b border-gold/10 last:border-b-0">
                <button
                  type="button"
                  onMouseDown={(ev) => {
                    ev.preventDefault()
                    toggleGroup(group.id)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-gold-soft hover:bg-white/5"
                >
                  <Icon className="shrink-0 text-gold-soft/80" />
                  <span className="flex-1">{group.label}</span>
                  <span className="rounded-full bg-black/30 px-1.5 text-xs font-normal text-parchment/60">{items.length}</span>
                  <span className="text-xs text-parchment/40">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <ul className="pb-1">
                    {shown.map((entry) => (
                      <li key={`${entry.group}-${entry.key}`}>
                        <button
                          type="button"
                          onMouseDown={(ev) => {
                            ev.preventDefault()
                            go(entry)
                          }}
                          className="flex w-full items-center gap-2 py-1 pl-9 pr-3 text-left text-sm text-parchment/80 hover:bg-accent/30 hover:text-parchment"
                        >
                          <span className="flex-1 truncate">{entry.label}</span>
                          <span className="shrink-0 text-xs text-parchment/40">{entry.sub}</span>
                        </button>
                      </li>
                    ))}
                    {items.length > PER_GROUP_CAP && (
                      <li className="py-1 pl-9 pr-3 text-xs italic text-parchment/40">
                        …и ещё {items.length - PER_GROUP_CAP}. Уточните запрос.
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
