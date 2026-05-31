import { type JSX } from 'react'
import { GiVortex, GiScrollUnfurled } from 'react-icons/gi'
import { useConditionPopup } from '../store/conditionPopup'
import { useSettings } from '../store/settings'
import DiceText from './DiceText'

/** Global modal that shows a condition's description when its name is clicked. */
export default function ConditionPopup(): JSX.Element | null {
  const condition = useConditionPopup((s) => s.condition)
  const close = useConditionPopup((s) => s.close)
  const edition = useSettings((s) => s.edition)
  if (!condition) return null

  const desc =
    (condition.descriptions.find((d) => d.gamesystem === edition) ?? condition.descriptions[0])?.desc ?? ''
  const escape =
    (condition.escape?.find((d) => d.gamesystem === edition) ?? condition.escape?.[0])?.desc ?? ''

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6" onClick={close}>
      <div
        className="parchment-texture tome-border max-h-[85vh] w-full max-w-md overflow-y-auto rounded-lg p-5 shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-accent"><GiVortex className="shrink-0" /> {condition.name}</h2>
          <button onClick={close} className="text-ink-brown/50 hover:text-ink-brown">✕</button>
        </div>
        <hr className="fleuron" />
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
          <DiceText text={desc} label={condition.name} />
        </p>
        {escape && (
          <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-3">
            <h3 className="mb-1 flex items-center gap-1.5 font-serif text-base font-bold text-accent">
              <GiScrollUnfurled className="shrink-0" /> Как выйти из состояния
            </h3>
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
              <DiceText text={escape} label={condition.name} />
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
