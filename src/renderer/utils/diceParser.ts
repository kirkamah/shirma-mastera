// Parses dice expressions and bonuses out of stat-block text so they can be
// made interactive. Recognises XdY / XкY / +N / -N / XdY+N / XкY+N
// (both Latin "d" and Cyrillic "к").

export interface ParsedDice {
  count: number
  sides: number
  modifier: number
}

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'dice'; text: string; dice: ParsedDice }
  | { kind: 'bonus'; text: string; bonus: number } // rolls 1d20 + bonus
  | { kind: 'dc'; text: string; dc: number } // highlight only, no roll

const DICE_LETTERS = 'dDкК'

// Order matters: dice first (consumes its own +N), then DC, then a lone bonus.
const MASTER = new RegExp(
  [
    `(?<dice>\\d*\\s*[${DICE_LETTERS}]\\s*\\d+(?:\\s*[+\\-]\\s*\\d+)?)`,
    `(?<dc>(?:СЛ|Сложность|Сл|DC)\\s*\\d+)`,
    `(?<bonus>(?<![\\w/])[+\\-]\\s*\\d+)`
  ].join('|'),
  'gu'
)

const DICE_ONLY = new RegExp(
  `(\\d*)\\s*[${DICE_LETTERS}]\\s*(\\d+)(?:\\s*([+\\-])\\s*(\\d+))?`
)

/** Parse a single dice substring like "2к6+3" into structured form. */
export function parseDiceToken(token: string): ParsedDice | null {
  const m = DICE_ONLY.exec(token)
  if (!m) return null
  const count = m[1] ? parseInt(m[1], 10) : 1
  const sides = parseInt(m[2], 10)
  let modifier = 0
  if (m[3] && m[4]) modifier = m[3] === '-' ? -parseInt(m[4], 10) : parseInt(m[4], 10)
  return { count, sides, modifier }
}

function parseBonus(token: string): number {
  const n = parseInt(token.replace(/\s+/g, ''), 10)
  return Number.isNaN(n) ? 0 : n
}

function parseDc(token: string): number {
  const m = token.match(/\d+/)
  return m ? parseInt(m[0], 10) : 0
}

/** Split text into renderable segments, flagging interactive dice / bonus / DC. */
export function tokenize(text: string): Segment[] {
  if (!text) return []
  const segments: Segment[] = []
  let last = 0
  for (const match of text.matchAll(MASTER)) {
    const idx = match.index ?? 0
    if (idx > last) segments.push({ kind: 'text', text: text.slice(last, idx) })
    const raw = match[0]
    const groups = match.groups ?? {}
    if (groups.dice) {
      const dice = parseDiceToken(raw)
      if (dice && dice.sides > 0) segments.push({ kind: 'dice', text: raw, dice })
      else segments.push({ kind: 'text', text: raw })
    } else if (groups.dc) {
      segments.push({ kind: 'dc', text: raw, dc: parseDc(raw) })
    } else if (groups.bonus) {
      segments.push({ kind: 'bonus', text: raw, bonus: parseBonus(raw) })
    } else {
      segments.push({ kind: 'text', text: raw })
    }
    last = idx + raw.length
  }
  if (last < text.length) segments.push({ kind: 'text', text: text.slice(last) })
  return segments
}

/** Human-readable formula in Russian "к" notation, e.g. "1к6 + 2". */
export function formatFormula(dice: ParsedDice): string {
  let s = `${dice.count}к${dice.sides}`
  if (dice.modifier > 0) s += ` + ${dice.modifier}`
  else if (dice.modifier < 0) s += ` − ${Math.abs(dice.modifier)}`
  return s
}

export function formatBonusFormula(bonus: number): string {
  return bonus >= 0 ? `1к20 + ${bonus}` : `1к20 − ${Math.abs(bonus)}`
}
