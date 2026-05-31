import type { ParsedDice } from './diceParser'

export interface RollOutcome {
  rolls: number[]
  modifier: number
  total: number
  /** formatted like "[4] + 2 = 6" or "[6, 3] + 1 = 10" */
  detail: string
  /** set for single-d20 rolls that land a natural 20 / natural 1 */
  crit?: 'hit' | 'miss'
}

function critOf(roll: number, sides: number): 'hit' | 'miss' | undefined {
  if (sides !== 20) return undefined
  if (roll === 20) return 'hit'
  if (roll === 1) return 'miss'
  return undefined
}

function rollDie(sides: number): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1)
    crypto.getRandomValues(buf)
    return (buf[0] % sides) + 1
  }
  return Math.floor(Math.random() * sides) + 1
}

export function rollDice(dice: ParsedDice): RollOutcome {
  const rolls: number[] = []
  for (let i = 0; i < Math.max(1, dice.count); i++) rolls.push(rollDie(dice.sides))
  const sum = rolls.reduce((a, b) => a + b, 0)
  const total = sum + dice.modifier
  const crit = rolls.length === 1 ? critOf(rolls[0], dice.sides) : undefined
  return { rolls, modifier: dice.modifier, total, detail: formatOutcome(rolls, dice.modifier, total), crit }
}

export type RollMode = 'normal' | 'advantage' | 'disadvantage'

/** Roll 1d20 + bonus, with optional advantage / disadvantage. */
export function rollD20(bonus: number, mode: RollMode = 'normal'): RollOutcome {
  if (mode === 'normal') {
    const r = rollDie(20)
    const total = r + bonus
    return { rolls: [r], modifier: bonus, total, detail: formatOutcome([r], bonus, total), crit: critOf(r, 20) }
  }
  const a = rollDie(20)
  const b = rollDie(20)
  const chosen = mode === 'advantage' ? Math.max(a, b) : Math.min(a, b)
  const total = chosen + bonus
  const sign = bonus >= 0 ? `+ ${bonus}` : `− ${Math.abs(bonus)}`
  const detail = `[${a}, ${b}] → ${chosen} ${bonus !== 0 ? sign + ' ' : ''}= ${total}`
  return { rolls: [a, b], modifier: bonus, total, detail, crit: critOf(chosen, 20) }
}

function formatOutcome(rolls: number[], modifier: number, total: number): string {
  const dice = `[${rolls.join(', ')}]`
  if (modifier === 0) return rolls.length > 1 ? `${dice} = ${total}` : `${dice}`
  const sign = modifier > 0 ? `+ ${modifier}` : `− ${Math.abs(modifier)}`
  return `${dice} ${sign} = ${total}`
}
