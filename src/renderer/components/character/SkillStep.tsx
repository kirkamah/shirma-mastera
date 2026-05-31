import { useState, type JSX } from 'react'
import { parseClassSkills, ABILITY_ABBR, SKILL_ABILITY, SKILL_DESC } from '../../data/character-rules'
import type { CharacterSheet } from '../../data/character-sheet'

export default function SkillStep({
  sheet,
  onChange,
  classSkillsText,
  bgSkills
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  classSkillsText?: string
  bgSkills: string[]
}): JSX.Element {
  const [showDesc, setShowDesc] = useState(false)
  const [loreFor, setLoreFor] = useState<string | null>(null)
  if (!classSkillsText) {
    return <p className="text-xs italic text-ink-brown/50">Выберите класс, чтобы выбрать навыки.</p>
  }
  const { count, options } = parseClassSkills(classSkillsText)
  const chosen = sheet.chosenClassSkills
  const full = chosen.length >= count

  const toggle = (skill: string): void => {
    if (chosen.includes(skill)) onChange({ chosenClassSkills: chosen.filter((s) => s !== skill) })
    else if (!full) onChange({ chosenClassSkills: [...chosen, skill] })
  }

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink-brown/70">Выберите навыки класса: <b className="text-accent">{chosen.length}/{count}</b></p>
        <button onClick={() => setShowDesc((s) => !s)} className="text-[11px] text-accent hover:underline">
          {showDesc ? 'Скрыть описания' : 'ⓘ Что делают навыки'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2">
        {options.map((skill) => {
          const checked = chosen.includes(skill)
          const fromBg = bgSkills.includes(skill)
          const d = SKILL_DESC[skill]
          return (
            <div key={skill} className={`${!checked && full && !fromBg ? 'opacity-50' : ''}`}>
              <label className="flex items-center gap-1.5 text-[13px]" title={d?.play}>
                <input type="checkbox" checked={checked || fromBg} disabled={fromBg || (!checked && full)} onChange={() => toggle(skill)} className="accent-accent" />
                <span>{skill}</span>
                <span className="text-[10px] uppercase text-ink-brown/40">{ABILITY_ABBR[SKILL_ABILITY[skill]]}</span>
                {fromBg && <span className="text-[10px] text-accent">предыст.</span>}
              </label>
              {showDesc && d && (
                <p className="ml-5 text-[11px] leading-snug text-ink-brown/60">
                  {d.play}{' '}
                  <button onClick={() => setLoreFor((c) => (c === skill ? null : skill))} className="text-accent hover:underline">{loreFor === skill ? 'скрыть' : 'образ'}</button>
                  {loreFor === skill && <span className="block italic text-ink-brown/45">{d.lore}</span>}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {bgSkills.length > 0 && (
        <p className="text-xs text-ink-brown/60">От предыстории (уже владеете): <b>{bgSkills.join(', ')}</b></p>
      )}
    </div>
  )
}
