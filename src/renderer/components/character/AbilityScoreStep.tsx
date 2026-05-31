import { useState, type JSX } from 'react'
import { rollDice } from '../../utils/roll'
import {
  ABILITIES,
  ABILITY_RU,
  STANDARD_ARRAY,
  POINT_BUY_COST,
  POINT_BUY_BUDGET,
  POINT_BUY_MIN,
  POINT_BUY_MAX,
  abilityMod,
  formatMod,
  pointBuySpent,
  type AbilityKey
} from '../../data/character-rules'
import type { Abilities, AbilityMethod, CharacterSheet } from '../../data/character-sheet'

const METHODS: { id: AbilityMethod; label: string }[] = [
  { id: 'point-buy', label: 'Покупка очков' },
  { id: 'standard-array', label: 'Стандартный набор' },
  { id: 'roll', label: '4к6 − мин.' },
  { id: 'manual', label: 'Вручную' }
]

/** Assign the values of `pool` to the six abilities in order (a starting permutation). */
function assignInOrder(pool: number[]): Abilities {
  const out = {} as Abilities
  ABILITIES.forEach((k, i) => (out[k] = pool[i] ?? 10))
  return out
}

export default function AbilityScoreStep({
  sheet,
  onChange,
  bgTrio
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  bgTrio: AbilityKey[]
}): JSX.Element {
  const [pool, setPool] = useState<number[]>([])
  const a = sheet.baseAbilities
  const setA = (next: Abilities): void => onChange({ baseAbilities: next })
  const setOne = (k: AbilityKey, n: number): void => setA({ ...a, [k]: n })

  const method = sheet.abilityMethod
  const spent = pointBuySpent(ABILITIES.map((k) => a[k]))

  const selectMethod = (m: AbilityMethod): void => {
    if (m === 'standard-array') onChange({ abilityMethod: m, baseAbilities: assignInOrder(STANDARD_ARRAY) })
    else if (m === 'point-buy') onChange({ abilityMethod: m, baseAbilities: assignInOrder([8, 8, 8, 8, 8, 8]) })
    else onChange({ abilityMethod: m })
  }

  const rollPool = (): void => {
    const arrays = Array.from({ length: 6 }, () => {
      const r = rollDice({ count: 4, sides: 6, modifier: 0 }).rolls.sort((x, y) => y - x)
      return r[0] + r[1] + r[2]
    }).sort((x, y) => y - x)
    setPool(arrays)
    setA(assignInOrder(arrays))
  }

  // Swap-on-conflict: assigning `val` to k gives k's old value to whoever had `val`.
  // Keeps the six abilities a permutation of the pool, so each value is used once.
  const assignValue = (k: AbilityKey, val: number): void => {
    const other = ABILITIES.find((o) => o !== k && a[o] === val)
    const next = { ...a, [k]: val }
    if (other) next[other] = a[k]
    setA(next)
  }

  const assignPool: number[] | null = method === 'standard-array' ? STANDARD_ARRAY : method === 'roll' ? pool : null

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => selectMethod(m.id)}
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              method === m.id ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {method === 'point-buy' && (
        <p className="text-xs text-ink-brown/70">
          Осталось очков: <b className={spent > POINT_BUY_BUDGET ? 'text-red-600' : 'text-accent'}>{POINT_BUY_BUDGET - spent}</b> из {POINT_BUY_BUDGET}
        </p>
      )}
      {method === 'standard-array' && (
        <p className="text-xs text-ink-brown/70">Набор: {STANDARD_ARRAY.join(', ')} — каждое значение используется один раз.</p>
      )}
      {method === 'roll' && (
        <button onClick={rollPool} className="rounded bg-accent px-3 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">
          {pool.length ? 'Перебросить' : 'Бросить'} 4к6 ×6
        </button>
      )}
      {method === 'roll' && pool.length > 0 && (
        <p className="text-xs text-ink-brown/70">Выпало: {pool.join(', ')} — распределите по характеристикам (каждое значение один раз).</p>
      )}

      <div className="space-y-1">
        {ABILITIES.map((k) => {
          const base = a[k]
          const inc = sheet.backgroundIncreases[k] ?? 0
          const total = Math.min(20, base + inc)
          return (
            <div key={k} className="flex items-center gap-2 text-sm">
              <span className="w-28 shrink-0 font-semibold text-ink-brown">{ABILITY_RU[k]}</span>
              {method === 'point-buy' ? (
                <div className="flex items-center gap-1">
                  <Stepper
                    value={base}
                    onDec={() => base > POINT_BUY_MIN && setOne(k, base - 1)}
                    onInc={() => base < POINT_BUY_MAX && spent + (POINT_BUY_COST[base + 1] - POINT_BUY_COST[base]) <= POINT_BUY_BUDGET && setOne(k, base + 1)}
                  />
                  <span className="w-10 text-[11px] text-ink-brown/50">{POINT_BUY_COST[base]} оч.</span>
                </div>
              ) : assignPool && assignPool.length > 0 ? (
                <select
                  value={base}
                  onChange={(e) => assignValue(k, +e.target.value)}
                  className="rounded border border-ink-brown/30 bg-parchment/60 px-2 py-0.5 text-sm"
                >
                  {assignPool.map((val, i) => (
                    <option key={i} value={val}>
                      {val}
                    </option>
                  ))}
                  {!assignPool.includes(base) && <option value={base}>{base}</option>}
                </select>
              ) : method === 'roll' ? (
                <span className="text-xs italic text-ink-brown/50">бросьте кости выше</span>
              ) : (
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={base}
                  onChange={(e) => setOne(k, Math.max(1, Math.min(30, +e.target.value)))}
                  className="w-16 rounded border border-ink-brown/30 bg-parchment/60 px-2 py-0.5 text-sm"
                />
              )}
              {inc > 0 && <span className="text-xs text-accent">+{inc}</span>}
              <span className="ml-auto text-xs text-ink-brown/60">
                = {total} ({formatMod(abilityMod(total))})
              </span>
            </div>
          )
        })}
      </div>

      <BackgroundIncreases sheet={sheet} onChange={onChange} bgTrio={bgTrio} />
    </div>
  )
}

function Stepper({ value, onDec, onInc }: { value: number; onDec: () => void; onInc: () => void }): JSX.Element {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onDec} className="h-6 w-6 rounded border border-ink-brown/30 text-sm hover:bg-black/5">
        −
      </button>
      <span className="w-6 text-center font-semibold">{value}</span>
      <button onClick={onInc} className="h-6 w-6 rounded border border-ink-brown/30 text-sm hover:bg-black/5">
        +
      </button>
    </div>
  )
}

/** +2/+1 (or +1/+1/+1) distribution among the background's ability trio. */
function BackgroundIncreases({
  sheet,
  onChange,
  bgTrio
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  bgTrio: AbilityKey[]
}): JSX.Element {
  const inc = sheet.backgroundIncreases
  const pattern = Object.values(inc).some((n) => n === 2) ? '2+1' : '1+1+1'
  const plusTwo = (Object.keys(inc) as AbilityKey[]).find((k) => inc[k] === 2)
  const plusOne = (Object.keys(inc) as AbilityKey[]).find((k) => inc[k] === 1 && pattern === '2+1')

  if (bgTrio.length < 2) {
    return <p className="text-xs italic text-ink-brown/50">Выберите предысторию, чтобы распределить прибавки к характеристикам.</p>
  }

  const apply = (p: '2+1' | '1+1+1', two?: AbilityKey, one?: AbilityKey): void => {
    const next: Partial<Abilities> = {}
    if (p === '1+1+1') for (const k of bgTrio) next[k] = 1
    else {
      if (two) next[two] = 2
      if (one && one !== two) next[one] = 1
    }
    onChange({ backgroundIncreases: next })
  }

  return (
    <div className="rounded border border-accent/30 bg-accent/5 p-2 text-sm">
      <div className="mb-1 text-xs font-semibold text-accent">Прибавки предыстории ({bgTrio.map((k) => ABILITY_RU[k]).join(', ')})</div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-1 text-xs">
          <input type="radio" checked={pattern === '2+1'} onChange={() => apply('2+1', bgTrio[0], bgTrio[1])} /> +2 и +1
        </label>
        <label className="flex items-center gap-1 text-xs">
          <input type="radio" checked={pattern === '1+1+1'} onChange={() => apply('1+1+1')} /> +1/+1/+1
        </label>
      </div>
      {pattern === '2+1' && (
        <div className="mt-1 flex flex-wrap gap-2 text-xs">
          <label className="flex items-center gap-1">
            +2:
            <select value={plusTwo ?? bgTrio[0]} onChange={(e) => apply('2+1', e.target.value as AbilityKey, plusOne)} className="rounded border border-ink-brown/30 bg-parchment/60 px-1">
              {bgTrio.map((k) => (
                <option key={k} value={k}>
                  {ABILITY_RU[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-1">
            +1:
            <select value={plusOne ?? bgTrio.find((k) => k !== plusTwo)} onChange={(e) => apply('2+1', plusTwo ?? bgTrio[0], e.target.value as AbilityKey)} className="rounded border border-ink-brown/30 bg-parchment/60 px-1">
              {bgTrio.filter((k) => k !== plusTwo).map((k) => (
                <option key={k} value={k}>
                  {ABILITY_RU[k]}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  )
}
