import { type JSX } from 'react'
import { GiRollingDices } from 'react-icons/gi'
import { rollDice } from '../../utils/roll'
import { hitDieSize, HIT_DIE_AVG, formatMod } from '../../data/character-rules'
import type { CharacterSheet } from '../../data/character-sheet'

export default function HpStep({
  sheet,
  onChange,
  hitDie,
  conMod
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  hitDie?: string
  conMod: number
}): JSX.Element {
  if (!hitDie) return <p className="text-xs italic text-ink-brown/50">Выберите класс, чтобы рассчитать хиты.</p>
  const die = hitDieSize(hitDie)
  const rolls = sheet.hpRolls ?? []
  const extraLevels = Math.max(0, sheet.level - 1)

  // Sum: level 1 = max die + CON; each rolled level adds max(1, roll + CON).
  const totalFromRolls = (rs: number[]): number => {
    let t = die + conMod
    for (let i = 0; i < extraLevels; i++) if (rs[i]) t += Math.max(1, rs[i] + conMod)
    return t
  }
  const rolledCount = rolls.slice(0, extraLevels).filter(Boolean).length

  const setRolls = (rs: number[]): void => onChange({ hpMethod: 'rolled', hpRolls: rs, maxHp: totalFromRolls(rs) })
  const rollOne = (idx: number): void => {
    const rs = [...rolls]
    rs[idx] = rollDice({ count: 1, sides: die, modifier: 0 }).rolls[0]
    setRolls(rs)
  }
  const rollAll = (): void => {
    const rs = Array.from({ length: extraLevels }, () => rollDice({ count: 1, sides: die, modifier: 0 }).rolls[0])
    setRolls(rs)
  }
  const applyAverage = (): void => {
    const avg = HIT_DIE_AVG[die] ?? Math.floor(die / 2) + 1
    onChange({ hpMethod: 'average', maxHp: die + conMod + extraLevels * Math.max(1, avg + conMod) })
  }

  const btn = (active: boolean): string =>
    `rounded-full px-2.5 py-0.5 text-xs font-semibold ${active ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`

  return (
    <div className="space-y-2 text-sm">
      <div className="flex flex-wrap gap-1">
        <button className={btn(sheet.hpMethod === 'average')} onClick={applyAverage}>
          Среднее ({HIT_DIE_AVG[die] ?? '—'}/ур.)
        </button>
        <button className={btn(sheet.hpMethod === 'rolled')} onClick={() => onChange({ hpMethod: 'rolled' })}>
          Броски костей
        </button>
        <button className={btn(sheet.hpMethod === 'manual')} onClick={() => onChange({ hpMethod: 'manual' })}>
          Вручную
        </button>
      </div>

      <p className="text-xs text-ink-brown/70">
        1 ур.: максимум {hitDie} = <b>{die}</b> + Телосложение ({formatMod(conMod)}) = <b>{die + conMod}</b>.
      </p>

      {sheet.hpMethod === 'rolled' && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button onClick={rollAll} className="inline-flex items-center gap-1 rounded bg-accent px-2.5 py-1 text-xs font-semibold text-parchment hover:bg-accent/80">
              <GiRollingDices /> Бросить все ({extraLevels}{hitDie})
            </button>
            <span className="text-[11px] text-ink-brown/50">брошено {rolledCount}/{extraLevels}</span>
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {Array.from({ length: extraLevels }, (_, i) => {
              const lvl = i + 2
              const r = rolls[i]
              return (
                <div key={i} className="flex items-center gap-2 rounded border border-ink-brown/15 bg-parchment/40 px-2 py-0.5 text-[12px]">
                  <span className="w-12 text-ink-brown/60">Ур. {lvl}</span>
                  {r ? (
                    <span className="font-mono">
                      [<b className="text-accent">{r}</b>] {formatMod(conMod)} = <b>{Math.max(1, r + conMod)}</b>
                    </span>
                  ) : (
                    <span className="text-ink-brown/40">не брошено</span>
                  )}
                  <button onClick={() => rollOne(i)} className="ml-auto inline-flex items-center gap-1 rounded border border-accent/40 px-2 text-xs text-accent hover:bg-accent/10">
                    <GiRollingDices /> {hitDie}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-brown/60">Максимум хитов:</span>
        <input
          type="number"
          value={sheet.maxHp || ''}
          onChange={(e) => onChange({ hpMethod: 'manual', maxHp: Math.max(0, +e.target.value) })}
          className="w-20 rounded border border-ink-brown/30 bg-parchment/60 px-2 py-0.5 text-sm font-bold text-accent"
        />
      </div>
    </div>
  )
}
