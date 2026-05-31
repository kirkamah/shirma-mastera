import { useEffect, useRef, useState, type JSX } from 'react'
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi'
import { tokenize, formatFormula, formatBonusFormula, type ParsedDice } from '../utils/diceParser'
import { useDiceRoller } from '../hooks/useDiceRoller'
import type { RollMode, RollOutcome } from '../utils/roll'
import { spellByName } from '../data/spells-ru'
import { conditionByKey } from '../data/conditions-fallback'
import { glossaryByName } from '../data/glossary'
import { useSpellPopup } from '../store/spellPopup'
import { useConditionPopup } from '../store/conditionPopup'
import { useGlossaryPopup } from '../store/glossaryPopup'

interface ChipProps {
  text: string
  formula: string
  label: string
  supportsAdv: boolean
  roll: (mode: RollMode) => RollOutcome
}

function DiceChip({ text, formula, label, supportsAdv, roll }: ChipProps): JSX.Element {
  const [outcome, setOutcome] = useState<RollOutcome | null>(null)
  const [mode, setMode] = useState<RollMode>('normal')
  const [visible, setVisible] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const onClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    if (timer.current) clearTimeout(timer.current)
    const m: RollMode = supportsAdv ? (e.altKey ? 'advantage' : e.shiftKey ? 'disadvantage' : 'normal') : 'normal'
    const result = roll(m)
    setMode(m)
    setOutcome(result)
    setVisible(true)
    setSpinning(true)
    setTimeout(() => setSpinning(false), 350)
    timer.current = setTimeout(() => setVisible(false), 2000)
  }

  const resultColor =
    outcome?.crit === 'hit' ? 'text-emerald-300' : outcome?.crit === 'miss' ? 'text-red-400' : 'text-amber-300'
  const modeTag = mode === 'advantage' ? ' ⬆' : mode === 'disadvantage' ? ' ⬇' : ''

  return (
    <span className="group relative inline-block">
      <button
        type="button"
        onClick={onClick}
        title={supportsAdv ? `${label} · Alt — преимущество, Shift — помеха` : label}
        className="cursor-pointer rounded px-0.5 font-semibold text-accent underline decoration-dotted decoration-accent/50 underline-offset-2 transition-colors hover:bg-accent/10 hover:decoration-accent"
      >
        <span className={spinning ? 'inline-block animate-dice-pop' : 'inline-block'}>{text}</span>
      </button>
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-accent/40 bg-ink px-2 py-1 text-xs font-medium text-parchment shadow-panel transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <GiDiceTwentyFacesTwenty className="mr-1 inline" />
        {outcome && visible ? (
          <span>
            {label}
            {modeTag}: {formula} → <span className={`font-bold ${resultColor}`}>{outcome.detail}</span>
            {outcome.crit === 'hit' && ' ✦крит'}
            {outcome.crit === 'miss' && ' ✦провал'}
          </span>
        ) : (
          <span>{formula}</span>
        )}
      </span>
    </span>
  )
}

function DcChip({ text }: { text: string }): JSX.Element {
  return (
    <span className="rounded bg-accent/15 px-1 font-semibold text-accent" title="Сложность — без броска">
      {text}
    </span>
  )
}

function SpellLink({ text, name }: { text: string; name: string }): JSX.Element {
  const open = useSpellPopup((s) => s.open)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        const sp = spellByName(name)
        if (sp) open(sp)
      }}
      title="Открыть описание заклинания"
      className="font-semibold text-spell underline decoration-dotted underline-offset-2 hover:text-spell/70"
    >
      {text}
    </button>
  )
}

/** Clickable «…» reference for class glossary terms (metamagic, eldritch
 *  invocations, ...). Styled distinctly from spells so users can tell them apart. */
function GlossaryLink({ text, name }: { text: string; name: string }): JSX.Element {
  const open = useGlossaryPopup((s) => s.open)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        const t = glossaryByName(name)
        if (t) open(t)
      }}
      title="Открыть описание термина"
      className="font-semibold text-accent underline decoration-dotted underline-offset-2 hover:text-accent/70"
    >
      {text}
    </button>
  )
}

// Condition stems (handles Russian declension): stem matches the inflected forms.
const C = '[а-яё]'
const COND_DEFS: { key: string; src: string }[] = [
  { key: 'blinded', src: `ослепл${C}*` },
  { key: 'charmed', src: `очарован${C}*` },
  { key: 'deafened', src: `оглох${C}*|глух${C}*` },
  { key: 'exhaustion', src: `истощ${C}*` },
  { key: 'frightened', src: `испуган${C}*` },
  { key: 'grappled', src: `схвач${C}*|захвач${C}*` },
  { key: 'incapacitated', src: `недееспособ${C}*` },
  { key: 'invisible', src: `невидим${C}*` },
  { key: 'paralyzed', src: `парализ${C}*` },
  { key: 'petrified', src: `окамен${C}*` },
  { key: 'poisoned', src: `отравл${C}*` },
  { key: 'prone', src: `ничком|сби${C}+ с ног` },
  { key: 'restrained', src: `опута${C}*` },
  { key: 'stunned', src: `ошеломл${C}*` },
  { key: 'unconscious', src: `без сознани${C}*` }
]
const COND_RE = new RegExp(COND_DEFS.map((d, i) => `(?<c${i}>${d.src})`).join('|'), 'gi')

function ConditionLink({ text, condKey }: { text: string; condKey: string }): JSX.Element {
  const open = useConditionPopup((s) => s.open)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        const c = conditionByKey(condKey)
        if (c) open(c)
      }}
      title="Открыть описание состояния"
      className="text-cond underline decoration-dotted underline-offset-2 hover:text-cond/70"
    >
      {text}
    </button>
  )
}

/** Render a plain (no spell refs) chunk: dice / bonuses / DCs made interactive. */
function diceNodes(
  text: string,
  label: string,
  rollFormula: (d: ParsedDice, l?: string) => RollOutcome,
  rollBonus: (b: number, l?: string, m?: RollMode) => RollOutcome,
  keyBase: string
): JSX.Element[] {
  return tokenize(text).map((seg, i) => {
    const key = `${keyBase}-${i}`
    if (seg.kind === 'dice') {
      const dice: ParsedDice = seg.dice
      return <DiceChip key={key} text={seg.text} formula={formatFormula(dice)} label={label} supportsAdv={false} roll={() => rollFormula(dice, label)} />
    }
    if (seg.kind === 'bonus') {
      return <DiceChip key={key} text={seg.text} formula={formatBonusFormula(seg.bonus)} label={label} supportsAdv roll={(mode) => rollBonus(seg.bonus, label, mode)} />
    }
    if (seg.kind === 'dc') return <DcChip key={key} text={seg.text} />
    return <span key={key}>{seg.text}</span>
  })
}

/** Split a chunk by condition references, linking them; dice between them. */
function condNodes(
  text: string,
  label: string,
  rollFormula: (d: ParsedDice, l?: string) => RollOutcome,
  rollBonus: (b: number, l?: string, m?: RollMode) => RollOutcome,
  keyBase: string
): JSX.Element[] {
  const out: JSX.Element[] = []
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  COND_RE.lastIndex = 0
  while ((m = COND_RE.exec(text)) !== null) {
    if (m.index > last) out.push(...diceNodes(text.slice(last, m.index), label, rollFormula, rollBonus, `${keyBase}-d${i}`))
    let key: string | null = null
    if (m.groups) {
      for (let g = 0; g < COND_DEFS.length; g++) {
        if (m.groups[`c${g}`] !== undefined) {
          key = COND_DEFS[g].key
          break
        }
      }
    }
    if (key) out.push(<ConditionLink key={`${keyBase}-c${i}`} text={m[0]} condKey={key} />)
    else out.push(<span key={`${keyBase}-c${i}`}>{m[0]}</span>)
    last = m.index + m[0].length
    i++
  }
  if (last < text.length) out.push(...diceNodes(text.slice(last), label, rollFormula, rollBonus, `${keyBase}-dend`))
  return out
}

interface DiceTextProps {
  text: string
  label?: string
  className?: string
}

const SPELL_REF = /«([^»]+)»/g

type RollFormula = (d: ParsedDice, l?: string) => RollOutcome
type RollBonus = (b: number, l?: string, m?: RollMode) => RollOutcome

/** One chunk without formatting markup: «spells» → conditions → dice/bonuses/DCs. */
function richNodes(text: string, label: string, rollFormula: RollFormula, rollBonus: RollBonus, keyBase: string): JSX.Element[] {
  const out: JSX.Element[] = []
  let last = 0
  let k = 0
  let m: RegExpExecArray | null
  SPELL_REF.lastIndex = 0
  while ((m = SPELL_REF.exec(text)) !== null) {
    if (m.index > last) out.push(...condNodes(text.slice(last, m.index), label, rollFormula, rollBonus, `${keyBase}-b${k}`))
    if (spellByName(m[1])) out.push(<SpellLink key={`${keyBase}-s${k}`} text={m[0]} name={m[1]} />)
    else if (glossaryByName(m[1])) out.push(<GlossaryLink key={`${keyBase}-g${k}`} text={m[0]} name={m[1]} />)
    else out.push(...condNodes(m[0], label, rollFormula, rollBonus, `${keyBase}-u${k}`))
    last = m.index + m[0].length
    k++
  }
  if (last < text.length) out.push(...condNodes(text.slice(last), label, rollFormula, rollBonus, `${keyBase}-end`))
  return out
}

/** Named text colours for the {colour:text} markup (chosen to read on parchment). */
const TEXT_COLORS: Record<string, string> = {
  красный: '#b3261e',
  red: '#b3261e',
  оранжевый: '#b45309',
  orange: '#b45309',
  жёлтый: '#9a7209',
  желтый: '#9a7209',
  yellow: '#9a7209',
  зелёный: '#15803d',
  зеленый: '#15803d',
  green: '#15803d',
  синий: '#1d4ed8',
  blue: '#1d4ed8',
  голубой: '#0369a1',
  фиолетовый: '#7e22ce',
  purple: '#7e22ce',
  золотой: '#9a6b1e',
  gold: '#9a6b1e',
  серый: '#57534e',
  gray: '#57534e',
  grey: '#57534e'
}

function colorValue(name: string): string | undefined {
  const k = name.trim().toLowerCase()
  if (/^#[0-9a-f]{3,8}$/i.test(k)) return k
  return TEXT_COLORS[k]
}

// **bold** | __underline__ | *italic* | {colour:text}
const FORMAT_RE = /\*\*([\s\S]+?)\*\*|__([\s\S]+?)__|\*([\s\S]+?)\*|\{([^:{}]+):([\s\S]+?)\}/g

/** Top layer: applies bold/underline/italic/colour markup, recursing into richNodes for inner text. */
function formatNodes(text: string, label: string, rollFormula: RollFormula, rollBonus: RollBonus): JSX.Element[] {
  const out: JSX.Element[] = []
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  FORMAT_RE.lastIndex = 0
  while ((m = FORMAT_RE.exec(text)) !== null) {
    if (m.index > last) out.push(...richNodes(text.slice(last, m.index), label, rollFormula, rollBonus, `f${i}`))
    if (m[1] !== undefined) {
      out.push(
        <strong key={`b${i}`} className="font-bold">
          {richNodes(m[1], label, rollFormula, rollBonus, `b${i}`)}
        </strong>
      )
    } else if (m[2] !== undefined) {
      out.push(
        <u key={`u${i}`}>{richNodes(m[2], label, rollFormula, rollBonus, `u${i}`)}</u>
      )
    } else if (m[3] !== undefined) {
      out.push(
        <em key={`i${i}`} className="italic">
          {richNodes(m[3], label, rollFormula, rollBonus, `i${i}`)}
        </em>
      )
    } else if (m[4] !== undefined && m[5] !== undefined) {
      const c = colorValue(m[4])
      out.push(
        <span key={`c${i}`} style={c ? { color: c } : undefined}>
          {richNodes(m[5], label, rollFormula, rollBonus, `c${i}`)}
        </span>
      )
    }
    last = m.index + m[0].length
    i++
  }
  if (last < text.length) out.push(...richNodes(text.slice(last), label, rollFormula, rollBonus, 'fend'))
  return out
}

/** Renders text with **bold**, *italic*, {colour:text}, interactive dice/bonuses/DCs,
 *  clickable «spell» references and auto-highlighted conditions. */
export default function DiceText({ text, label = 'Бросок', className }: DiceTextProps): JSX.Element {
  const { rollFormula, rollBonus } = useDiceRoller()
  return <span className={className}>{formatNodes(text, label, rollFormula, rollBonus)}</span>
}
