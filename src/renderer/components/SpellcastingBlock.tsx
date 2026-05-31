import { Fragment, type JSX } from 'react'
import DiceText from './DiceText'

interface Section {
  /** Bare label without the trailing colon, e.g. "Заговоры (неогр.)" or "1 ур. (4 яч.)". */
  label: string
  /** Optional shorter label rendered in the left cell (e.g. "Заговоры" or "1 ур."). */
  short?: string
  /** Slot/count text rendered in the middle cell ("неогр.", "4 яч.", "3"). */
  slots?: string
  /** Body text (the list of spell refs). */
  text: string
}

interface Parsed {
  intro: string
  sections: Section[]
}

// Labels that introduce a spell list. Each can have an optional "(parens)" qualifier
// — including ones with periods, e.g. "Заговоры (неогр.):". The label match has to
// allow such inner periods, so we use `[^:.(]` for plain chars combined with full
// `\([^)]*\)` paren blocks (which may contain periods).
const LABEL_TAIL = '(?:[^:.(]|\\([^)]*\\))*'
const LABEL_RE = new RegExp(
  `(Заговоры${LABEL_TAIL})\\s*:\\s*` +
    `|((?:Домен|Расширенные|Клятва|Покровитель|Известные|Расширенные заклинания)${LABEL_TAIL})\\s*:\\s*` +
    `|((\\d+)\\s*ур\\.\\s*(?:\\(([^)]*)\\))?)\\s*:\\s*`,
  'g'
)

/** Try to parse a wizard/cleric/etc. "Использование заклинаний" description into
 *  an intro paragraph and a list of clearly-delineated spell-level sections. */
function parse(desc: string): Parsed | null {
  // Quick reject — must contain at least one slot-level OR cantrip marker.
  if (!/\d+\s*ур\.\s*\(|Заговоры/i.test(desc)) return null

  LABEL_RE.lastIndex = 0
  const anchors: { start: number; end: number; section: Section }[] = []
  let m: RegExpExecArray | null
  while ((m = LABEL_RE.exec(desc)) !== null) {
    let section: Section
    if (m[1]) {
      const inner = m[1].match(/\(([^)]+)\)/)
      section = { label: m[1].trim(), short: 'Заговоры', slots: inner ? inner[1].trim() : 'неогр.', text: '' }
    } else if (m[2]) {
      const inner = m[2].match(/\(([^)]+)\)/)
      const base = m[2].replace(/\s*\([^)]+\)\s*$/, '').trim()
      section = { label: m[2].trim(), short: base, slots: inner ? inner[1].trim() : undefined, text: '' }
    } else {
      const lvl = m[4]
      const inner = m[5]?.trim()
      section = {
        label: m[3]!.trim(),
        short: `${lvl} ур.`,
        slots: inner ? inner.replace(/\bяч\.?$/, 'яч.') : undefined,
        text: ''
      }
    }
    anchors.push({ start: m.index, end: m.index + m[0].length, section })
  }
  if (anchors.length === 0) return null

  const intro = desc.slice(0, anchors[0].start).trim()
  for (let i = 0; i < anchors.length; i++) {
    const next = i + 1 < anchors.length ? anchors[i + 1].start : desc.length
    anchors[i].section.text = desc
      .slice(anchors[i].end, next)
      .trim()
      .replace(/^[.\s]+|[.\s]+$/g, '')
  }
  return { intro, sections: anchors.map((a) => a.section) }
}

interface Props {
  /** Description text from a spellcasting trait/action entry. */
  text: string
  /** Label passed to inner DiceText for dice/spell linkage. */
  label: string
}

/** Renders a spellcasting block as an intro paragraph + a 3-column "level | slots | spells"
 *  table. Falls back to plain DiceText if the description doesn't look like a spell list. */
export default function SpellcastingBlock({ text, label }: Props): JSX.Element {
  const parsed = parse(text)
  if (!parsed) return <DiceText text={text} label={label} />
  return (
    <span>
      {parsed.intro && (
        <p className="leading-snug">
          <DiceText text={parsed.intro} label={label} />
        </p>
      )}
      <div
        className="mt-2 grid items-baseline gap-x-3 gap-y-1 rounded-md border border-accent/25 bg-parchment-dark/30 px-3 py-2 text-[13px]"
        style={{ gridTemplateColumns: 'auto auto 1fr' }}
      >
        {parsed.sections.map((s, i) => (
          <Fragment key={i}>
            <div className="whitespace-nowrap font-serif font-semibold text-accent">{s.short ?? s.label}</div>
            <div className="whitespace-nowrap text-[12px] uppercase tracking-wide text-ink-brown/60">
              {s.slots ?? '—'}
            </div>
            <div className="leading-snug text-ink-brown">
              <DiceText text={s.text} label={label} />
            </div>
          </Fragment>
        ))}
      </div>
    </span>
  )
}
