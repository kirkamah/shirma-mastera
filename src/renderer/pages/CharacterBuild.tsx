import { useEffect, useState, type JSX } from 'react'
import { GiScrollQuill } from 'react-icons/gi'
import type { IconType } from 'react-icons'
import PageFrame from '../components/PageFrame'
import Portrait, { emblemForRace, emblemForClass } from '../components/Portrait'
import DiceText from '../components/DiceText'
import { featIcon, bgIcon } from '../data/build-icons'
import {
  RACE_BUILDS,
  CLASS_BUILDS,
  FEAT_BUILDS,
  BACKGROUND_BUILDS,
  featByName,
  type RaceBuild,
  type ClassBuild,
  type FeatBuild,
  type BackgroundBuild,
  type BuildTrait,
  type ClassProgression
} from '../data/character-build'
import { progressionFor, FULL_CASTER_SLOTS, HALF_CASTER_SLOTS, THIRD_CASTER_SLOTS, PACT_SLOTS } from '../data/class-progression'
import type { CasterKind } from '../data/character-build'
import { useFeatPopup } from '../store/featPopup'
import { useNav } from '../store/nav'
import CreateHub from '../components/character/CreateHub'

type Tab = 'races' | 'classes' | 'feats' | 'backgrounds' | 'create'

const TABS: { id: Tab; label: string }[] = [
  { id: 'races', label: 'Расы' },
  { id: 'classes', label: 'Классы' },
  { id: 'feats', label: 'Черты' },
  { id: 'backgrounds', label: 'Предыстории' }
]

function SourceChip({ source }: { source?: string }): JSX.Element | null {
  if (!source) return null
  return (
    <span className="rounded-full border border-gold/50 px-2 py-0.5 text-[11px] font-semibold text-gold">
      {source}
    </span>
  )
}

function TraitRow({ trait, showLevel }: { trait: BuildTrait; showLevel?: boolean }): JSX.Element {
  return (
    <div className="border-b border-ink-brown/10 pb-2 last:border-b-0 last:pb-0">
      <div className="flex items-baseline gap-2">
        {showLevel && trait.level != null && (
          <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[11px] font-bold text-accent">
            {trait.level} ур.
          </span>
        )}
        <h4 className="font-serif text-[14px] font-semibold text-ink-brown">{trait.name}</h4>
      </div>
      <p className="mt-0.5 text-[14px] leading-snug text-ink-brown/85">
        <DiceText text={trait.desc} label={trait.name} />
      </p>
    </div>
  )
}

/** Section card with a tinted header bar — used for "Расовые черты", "Ключевые умения",
 *  and each subrace. Variant changes colour weight so subraces read more strongly than
 *  the base race-trait block. */
function SectionCard({
  title,
  meta,
  variant = 'muted',
  children
}: {
  title: string
  meta?: string
  variant?: 'muted' | 'accent'
  children: React.ReactNode
}): JSX.Element {
  const styles =
    variant === 'accent'
      ? {
          wrap: 'mt-4 overflow-hidden rounded-lg border-l-4 border-accent border-y border-r border-y-accent/40 border-r-accent/40 bg-parchment/40 shadow-sm',
          bar: 'flex items-baseline gap-2 border-b border-accent/30 bg-accent/15 px-4 py-2',
          title: 'font-serif text-lg font-bold uppercase tracking-wide text-accent',
          meta: 'text-xs italic text-accent/70'
        }
      : {
          wrap: 'mt-4 overflow-hidden rounded-lg border border-ink-brown/20 bg-parchment-dark/15',
          bar: 'flex items-baseline gap-2 border-b border-ink-brown/15 bg-ink-brown/[0.06] px-4 py-1.5',
          title: 'font-serif text-[13px] font-bold uppercase tracking-wider text-ink-brown/70',
          meta: 'text-xs italic text-ink-brown/55'
        }
  return (
    <section className={styles.wrap}>
      <div className={styles.bar}>
        <h3 className={styles.title}>{title}</h3>
        {meta && meta !== '—' && <span className={styles.meta}>{meta}</span>}
      </div>
      <div className="space-y-2 px-4 py-3">{children}</div>
    </section>
  )
}

function StatLine({ label, value }: { label: string; value: string | number }): JSX.Element {
  return (
    <p className="text-sm leading-snug">
      <span className="font-semibold text-accent">{label}</span> <span className="text-ink-brown">{value}</span>
    </p>
  )
}

/** Clickable feat name — opens the global feat popup. Falls back to plain text
 *  when the feat isn't registered yet. */
function FeatLink({ name }: { name: string }): JSX.Element {
  const open = useFeatPopup((s) => s.open)
  const feat = featByName(name)
  if (!feat) return <span className="text-ink-brown">{name}</span>
  return (
    <button
      type="button"
      onClick={() => open(feat)}
      title="Открыть описание черты"
      className="font-semibold text-spell underline decoration-dotted underline-offset-2 hover:text-spell/70"
    >
      {name}
    </button>
  )
}

function RaceDetail({ r }: { r: RaceBuild }): JSX.Element {
  return (
    <div>
      <div className="flex items-start justify-between gap-3 border-b-2 border-accent/30 pb-2">
        <div>
          <h2 className="font-serif text-3xl font-bold text-accent">{r.name}</h2>
          <p className="text-sm italic text-ink-brown/70">{r.asi}</p>
        </div>
        <SourceChip source={r.source} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <StatLine label="Размер:" value={r.size} />
        <StatLine label="Скорость:" value={`${r.speed} фт.`} />
        <StatLine label="Языки:" value={r.langs} />
      </div>
      <SectionCard title="Расовые черты" variant="muted">
        {r.traits.map((t) => (
          <TraitRow key={t.name} trait={t} />
        ))}
      </SectionCard>
      {r.subraces?.map((sub) => (
        <SectionCard key={sub.name} title={sub.name} meta={sub.asi} variant="accent">
          {sub.traits.map((t) => (
            <TraitRow key={t.name} trait={t} />
          ))}
        </SectionCard>
      ))}
    </div>
  )
}

/** PHB-style table: Level / Proficiency Bonus / Features / class-specific
 *  scaling columns + (for casters) spell-slot columns by spell level.
 *  The wrapper uses w-fit so the table shrinks to its content instead of
 *  stretching across the entire detail panel. */
function ProgressionTable({ progression }: { progression: ClassProgression }): JSX.Element {
  const slotHeaders: string[] =
    progression.caster === 'pact'
      ? ['Ячеек', 'Ур. ячейки']
      : progression.caster === 'half'
        ? ['1', '2', '3', '4', '5']
        : progression.caster === 'full'
          ? ['1', '2', '3', '4', '5', '6', '7', '8', '9']
          : []

  const slotValues = (lvl: number): (string | number)[] => {
    const i = lvl - 1
    if (progression.caster === 'pact') {
      const [count, slvl] = PACT_SLOTS[i]
      return [count, slvl]
    }
    if (progression.caster === 'half') return HALF_CASTER_SLOTS[i].map((n) => (n === 0 ? '—' : n))
    if (progression.caster === 'full') return FULL_CASTER_SLOTS[i].map((n) => (n === 0 ? '—' : n))
    return []
  }

  const groupLabel = progression.caster === 'pact' ? 'Магия договора' : 'Ячейки заклинаний'

  return (
    <div className="mt-4 inline-block max-w-full overflow-x-auto rounded-lg border border-ink-brown/25 bg-parchment-dark/20">
      <table className="border-collapse text-[12px] leading-tight">
        <thead>
          {progression.caster && (
            <tr className="bg-spell/10 text-[10px] uppercase tracking-wider text-spell">
              <th colSpan={3 + progression.columns.length}></th>
              <th
                colSpan={slotHeaders.length}
                className="border-l border-spell/30 px-2 py-1 text-center font-serif font-semibold"
              >
                {groupLabel}
              </th>
            </tr>
          )}
          <tr className="border-b border-ink-brown/25 bg-ink-brown/[0.08] font-serif text-[11px] uppercase tracking-wider text-ink-brown/70">
            <th className="px-2 py-1.5 text-center">Ур.</th>
            <th className="px-2 py-1.5 text-center">БМ</th>
            <th className="px-2 py-1.5 text-left">Особенности</th>
            {progression.columns.map((c) => (
              <th key={c} className="px-2 py-1.5 text-center whitespace-nowrap">{c}</th>
            ))}
            {slotHeaders.map((h, i) => (
              <th
                key={`sh-${i}`}
                className={`px-2 py-1.5 text-center whitespace-nowrap ${i === 0 ? 'border-l border-spell/30' : ''}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-ink-brown">
          {progression.rows.map((r) => {
            const slots = slotValues(r.level)
            return (
              <tr key={r.level} className="border-t border-ink-brown/10 even:bg-ink-brown/[0.03]">
                <td className="px-2 py-1 text-center font-semibold text-accent">{r.level}</td>
                <td className="px-2 py-1 text-center">+{r.pb}</td>
                <td className="px-2 py-1">{r.features || '—'}</td>
                {progression.columns.map((c) => (
                  <td key={c} className="px-2 py-1 text-center whitespace-nowrap">{r.cols?.[c] ?? '—'}</td>
                ))}
                {slots.map((s, i) => (
                  <td
                    key={`sv-${i}`}
                    className={`px-2 py-1 text-center whitespace-nowrap ${i === 0 ? 'border-l border-spell/20' : ''} ${s === '—' ? 'text-ink-brown/30' : ''}`}
                  >
                    {s}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** Compact slot table for a subclass-level caster (Eldritch Knight, Arcane
 *  Trickster). Rendered inside the subclass card. */
function SubclassSlotsTable({ kind }: { kind: CasterKind }): JSX.Element | null {
  const data =
    kind === 'third' ? THIRD_CASTER_SLOTS
    : kind === 'half' ? HALF_CASTER_SLOTS
    : kind === 'full' ? FULL_CASTER_SLOTS
    : null
  if (!data) return null
  const maxLvl = data[0].length
  const headers = Array.from({ length: maxLvl }, (_, i) => i + 1)
  return (
    <div className="inline-block max-w-full overflow-x-auto rounded-lg border border-spell/40 bg-spell/[0.05]">
      <div className="border-b border-spell/30 bg-spell/10 px-3 py-1 font-serif text-[11px] uppercase tracking-wider text-spell">
        Ячейки заклинаний подкласса
      </div>
      <table className="border-collapse text-[12px] leading-tight">
        <thead>
          <tr className="border-b border-spell/20 bg-spell/[0.05] text-[11px] uppercase tracking-wider text-spell/70">
            <th className="px-2 py-1 text-center">Ур.</th>
            {headers.map((h) => (
              <th key={h} className="px-2 py-1 text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-ink-brown">
          {data.map((row, i) => (
            <tr key={i} className="border-t border-spell/10 even:bg-spell/[0.03]">
              <td className="px-2 py-1 text-center font-semibold text-accent">{i + 1}</td>
              {row.map((n, j) => (
                <td key={j} className={`px-2 py-1 text-center ${n === 0 ? 'text-ink-brown/30' : ''}`}>
                  {n === 0 ? '—' : n}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Expanded-spell list as a compact table: per spell level → spell names
 *  (clickable through DiceText «...» refs). Rendered inside the subclass card
 *  to show what spells the subclass adds as «always prepared». */
function ExpandedSpellsTable({
  rows,
  label
}: {
  rows: { level: number; spells: string[] }[]
  label: string
}): JSX.Element {
  return (
    <div className="inline-block max-w-full overflow-x-auto rounded-lg border border-spell/40 bg-spell/[0.05]">
      <div className="border-b border-spell/30 bg-spell/10 px-3 py-1 font-serif text-[11px] uppercase tracking-wider text-spell">
        Расширенные заклинания подкласса
      </div>
      <table className="border-collapse text-[12px] leading-tight">
        <thead>
          <tr className="border-b border-spell/20 bg-spell/[0.05] text-[11px] uppercase tracking-wider text-spell/70">
            <th className="px-2 py-1 text-center">Ур. ячейки</th>
            <th className="px-2 py-1 text-left">Заклинания (всегда подготовлены)</th>
          </tr>
        </thead>
        <tbody className="text-ink-brown">
          {rows.map((r) => (
            <tr key={r.level} className="border-t border-spell/10 even:bg-spell/[0.03]">
              <td className="px-2 py-1 text-center font-semibold text-accent">{r.level}</td>
              <td className="px-2 py-1">
                <DiceText text={r.spells.map((s) => `«${s}»`).join(', ')} label={label} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ClassDetail({ c }: { c: ClassBuild }): JSX.Element {
  const progression = progressionFor(c.id)
  return (
    <div>
      <div className="flex items-start justify-between gap-3 border-b-2 border-accent/30 pb-2">
        <div>
          <h2 className="font-serif text-3xl font-bold text-accent">{c.name}</h2>
          <p className="text-sm italic text-ink-brown/70">Основная характеристика — {c.primary.toLowerCase()}</p>
        </div>
        <SourceChip source={c.source} />
      </div>
      <div className="mt-3 space-y-1">
        <StatLine label="Кость хитов:" value={`1${c.hitDie} за уровень`} />
        <StatLine label="Спасброски:" value={c.saves} />
        <StatLine label="Броня:" value={c.armor} />
        <StatLine label="Оружие:" value={c.weapons} />
        {c.tools && <StatLine label="Инструменты:" value={c.tools} />}
        <StatLine label="Навыки:" value={c.skills} />
      </div>
      {progression && <ProgressionTable progression={progression} />}
      <SectionCard title="Ключевые умения" variant="muted">
        {c.features.map((t) => (
          <TraitRow key={`${t.level}-${t.name}`} trait={t} showLevel />
        ))}
      </SectionCard>
      {c.subclasses?.map((sub) => {
        const hasSidebar = Boolean(sub.expandedSpells || sub.caster)
        return (
          <SectionCard key={sub.name} title={sub.name} meta={sub.meta} variant="accent">
            <div className={hasSidebar ? 'flex flex-wrap items-start gap-3' : ''}>
              <div className={`${hasSidebar ? 'min-w-0 flex-1' : ''} space-y-2`}>
                {sub.features.map((t) => (
                  <TraitRow key={`${t.level}-${t.name}`} trait={t} showLevel />
                ))}
              </div>
              {hasSidebar && (
                <div className="shrink-0 space-y-2">
                  {sub.expandedSpells && (
                    <ExpandedSpellsTable rows={sub.expandedSpells} label={sub.name} />
                  )}
                  {sub.caster && <SubclassSlotsTable kind={sub.caster} />}
                </div>
              )}
            </div>
          </SectionCard>
        )
      })}
    </div>
  )
}

function FeatDetail({ f }: { f: FeatBuild }): JSX.Element {
  return (
    <div>
      <div className="flex items-start justify-between gap-3 border-b-2 border-accent/30 pb-2">
        <div>
          <h2 className="font-serif text-3xl font-bold text-accent">{f.name}</h2>
          {f.prereq && <p className="text-sm italic text-ink-brown/70">Требование: {f.prereq}</p>}
        </div>
        <SourceChip source={f.source} />
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-brown">
        <DiceText text={f.desc} label={f.name} />
      </p>
      <SectionCard title="Что даёт" variant="muted">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-snug text-ink-brown">
          {f.bonuses.map((b, i) => (
            <li key={i}>
              <DiceText text={b} label={f.name} />
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}

function BackgroundDetail({ b }: { b: BackgroundBuild }): JSX.Element {
  return (
    <div>
      <div className="flex items-start justify-between gap-3 border-b-2 border-accent/30 pb-2">
        <div>
          <h2 className="font-serif text-3xl font-bold text-accent">{b.name}</h2>
        </div>
        <SourceChip source={b.source} />
      </div>
      {b.lore && (
        <section className="mt-4 rounded-lg border-l-4 border-accent/40 bg-parchment-dark/15 px-4 py-3">
          <p className="drop-cap text-[15px] italic leading-relaxed text-ink-brown/90">{b.lore}</p>
        </section>
      )}
      <div className="mt-3 space-y-1">
        {b.abilities && <StatLine label="Характеристики (+2/+1 или +1/+1/+1):" value={b.abilities} />}
        <StatLine label="Владение навыками:" value={b.skills} />
        {b.tools && <StatLine label="Владение инструментами:" value={b.tools} />}
        {b.langs && <StatLine label="Языки:" value={b.langs} />}
        <StatLine label="Снаряжение:" value={b.equipment} />
        {b.feat && (
          <p className="text-sm leading-snug">
            <span className="font-semibold text-accent">Черта:</span> <FeatLink name={b.feat} />
          </p>
        )}
      </div>
      {b.feature && (
        <SectionCard title="Особенность" variant="muted">
          <TraitRow trait={b.feature} />
        </SectionCard>
      )}
      {b.suggestion && (
        <SectionCard title="Зацепки для отыгрыша" variant="muted">
          <p className="text-[14px] italic leading-snug text-ink-brown/80">{b.suggestion}</p>
        </SectionCard>
      )}
    </div>
  )
}

export default function CharacterBuild(): JSX.Element {
  const [tab, setTab] = useState<Tab>('races')
  const [selectedId, setSelectedId] = useState<string>(RACE_BUILDS[0].id)
  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)

  // Selection from global search — switch to the matching tab and select the item.
  useEffect(() => {
    if (pending?.section === 'classes') {
      setTab('classes')
      setSelectedId(pending.key)
      clearPending()
    } else if (pending?.section === 'backgrounds') {
      setTab('backgrounds')
      setSelectedId(pending.key)
      clearPending()
    }
  }, [pending, clearPending])

  const list: { id: string; name: string }[] =
    tab === 'races' ? RACE_BUILDS :
    tab === 'classes' ? CLASS_BUILDS :
    tab === 'feats' ? FEAT_BUILDS :
    BACKGROUND_BUILDS

  const iconFor = (id: string): IconType => {
    if (tab === 'races') return emblemForRace(id)
    if (tab === 'classes') return emblemForClass(id)
    if (tab === 'feats') return featIcon(id)
    return bgIcon(id)
  }

  // Ensure selectedId is valid for the current tab; reset if not.
  const selected = list.find((x) => x.id === selectedId) ?? list[0]
  if (selected && selected.id !== selectedId) {
    setSelectedId(selected.id)
  }

  const detail = (() => {
    if (!selected) return null
    if (tab === 'races') {
      const r = RACE_BUILDS.find((x) => x.id === selected.id)
      return r ? <RaceDetail r={r} /> : null
    }
    if (tab === 'classes') {
      const c = CLASS_BUILDS.find((x) => x.id === selected.id)
      return c ? <ClassDetail c={c} /> : null
    }
    if (tab === 'feats') {
      const f = FEAT_BUILDS.find((x) => x.id === selected.id)
      return f ? <FeatDetail f={f} /> : null
    }
    const b = BACKGROUND_BUILDS.find((x) => x.id === selected.id)
    return b ? <BackgroundDetail b={b} /> : null
  })()

  return (
    <PageFrame title="Игрок" subtitle="Сборка персонажа: расы, классы, черты, предыстории">
      <div className="mb-3 flex shrink-0 items-end gap-1 border-b border-ink-brown/20">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id)
              const next = (t.id === 'races' ? RACE_BUILDS : t.id === 'classes' ? CLASS_BUILDS : t.id === 'feats' ? FEAT_BUILDS : BACKGROUND_BUILDS)[0]
              if (next) setSelectedId(next.id)
            }}
            className={`rounded-t-md border-x border-t px-3 py-1.5 font-serif text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'border-accent/40 bg-accent/15 text-accent'
                : 'border-transparent text-ink-brown/70 hover:bg-black/5 hover:text-ink-brown'
            }`}
          >
            {t.label}
          </button>
        ))}
        {/* «Создание персонажа» намеренно отделено: это не справочник, а
            пошаговый гид — поэтому отдельная золочёная кнопка справа. */}
        <span className="mx-2 self-stretch border-l border-ink-brown/20" />
        <button
          onClick={() => setTab('create')}
          className={`-mb-px inline-flex items-center gap-1.5 rounded-t-lg border-x-2 border-t-2 px-3.5 py-1.5 font-serif text-sm font-bold transition-colors ${
            tab === 'create'
              ? 'border-gold/70 bg-gold/20 text-accent shadow-sm'
              : 'border-gold/40 bg-gold/5 text-gold hover:bg-gold/15'
          }`}
        >
          <GiScrollQuill className="text-base" />
          Создание персонажа
        </button>
      </div>

      {tab === 'create' ? (
        <div className="min-h-0 flex-1 overflow-hidden pr-1">
          <CreateHub />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 gap-3">
          <div className="w-52 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30 py-1">
            {list.map((x) => (
              <button
                key={x.id}
                onClick={() => setSelectedId(x.id)}
                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left font-serif transition-colors ${
                  selected?.id === x.id
                    ? 'rounded bg-accent/20 font-semibold text-accent'
                    : 'text-ink-brown/90 hover:bg-black/5'
                }`}
              >
                <Portrait emblem={iconFor(x.id)} size={28} />
                <span className="min-w-0 truncate">{x.name}</span>
              </button>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-y-auto pr-1">{detail}</div>
        </div>
      )}
    </PageFrame>
  )
}
