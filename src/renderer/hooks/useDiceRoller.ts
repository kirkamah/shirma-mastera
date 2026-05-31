import { useCallback } from 'react'
import { useRolls } from '../store/rolls'
import { rollD20, rollDice, type RollMode, type RollOutcome } from '../utils/roll'
import { formatBonusFormula, formatFormula, parseDiceToken, type ParsedDice } from '../utils/diceParser'
import { playRollSound } from '../utils/sound'

export interface UseDiceRoller {
  rollFormula: (dice: ParsedDice, label?: string) => RollOutcome
  rollBonus: (bonus: number, label?: string, mode?: RollMode) => RollOutcome
  rollText: (formula: string, label?: string) => RollOutcome | null
}

export function useDiceRoller(): UseDiceRoller {
  const addRoll = useRolls((s) => s.addRoll)

  const rollFormula = useCallback(
    (dice: ParsedDice, label = 'Бросок') => {
      const outcome = rollDice(dice)
      playRollSound()
      addRoll({ label, formula: formatFormula(dice), result: outcome.detail, crit: outcome.crit })
      return outcome
    },
    [addRoll]
  )

  const rollBonus = useCallback(
    (bonus: number, label = 'Проверка', mode: RollMode = 'normal') => {
      const outcome = rollD20(bonus, mode)
      playRollSound()
      const suffix = mode === 'advantage' ? ' (с преим.)' : mode === 'disadvantage' ? ' (с помех.)' : ''
      addRoll({ label: label + suffix, formula: formatBonusFormula(bonus), result: outcome.detail, crit: outcome.crit })
      return outcome
    },
    [addRoll]
  )

  const rollText = useCallback(
    (formula: string, label = 'Бросок') => {
      const dice = parseDiceToken(formula)
      if (!dice) return null
      const outcome = rollDice(dice)
      addRoll({ label, formula: formatFormula(dice), result: outcome.detail })
      return outcome
    },
    [addRoll]
  )

  return { rollFormula, rollBonus, rollText }
}
