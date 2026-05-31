import { type JSX } from 'react'
import { GiPencil } from 'react-icons/gi'
import { useSpellPopup } from '../store/spellPopup'
import { schoolVisual } from '../data/school-visuals'
import DiceText from './DiceText'

/** Global modal that shows a spell's full card when a «spell» link is clicked. */
export default function SpellPopup(): JSX.Element | null {
  const spell = useSpellPopup((s) => s.spell)
  const onEdit = useSpellPopup((s) => s.onEdit)
  const close = useSpellPopup((s) => s.close)
  if (!spell) return null

  const { Icon, color } = schoolVisual(spell.school)

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6" onClick={close}>
      <div
        className="parchment-texture tome-border max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg p-5 shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-accent">
            <Icon className="shrink-0" style={{ color }} /> {spell.name}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            {onEdit && (
              <button
                onClick={() => {
                  onEdit(spell)
                  close()
                }}
                title="Редактировать заклинание"
                className="text-gold-soft hover:text-accent"
              >
                <GiPencil />
              </button>
            )}
            <button onClick={close} className="text-ink-brown/50 hover:text-ink-brown">✕</button>
          </div>
        </div>
        <p className="text-sm italic text-ink-brown/70">
          {spell.level === 0 ? 'Заговор' : `${spell.level} уровень`} · <span style={{ color }} className="font-semibold not-italic">{spell.school}</span>
          {spell.concentration ? ' · концентрация' : ''}
          {spell.ritual ? ' · ритуал' : ''}
        </p>
        <hr className="fleuron" />
        <div className="grid grid-cols-2 gap-1 text-sm text-ink-brown">
          {spell.castingTime && <p><b className="text-accent">Время:</b> {spell.castingTime}</p>}
          {spell.rangeText && <p><b className="text-accent">Дистанция:</b> {spell.rangeText}</p>}
          {spell.components && <p><b className="text-accent">Компоненты:</b> {spell.components}</p>}
          {spell.duration && <p><b className="text-accent">Длительность:</b> {spell.duration}</p>}
          {spell.classes.length > 0 && <p className="col-span-2"><b className="text-accent">Классы:</b> {spell.classes.join(', ')}</p>}
        </div>
        <hr className="fleuron" />
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
          <DiceText text={spell.desc} label={spell.name} />
        </p>
        {spell.higherLevel && (
          <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
            <b className="text-accent">На более высоких уровнях.</b> <DiceText text={spell.higherLevel} label={spell.name} />
          </p>
        )}
      </div>
    </div>
  )
}
