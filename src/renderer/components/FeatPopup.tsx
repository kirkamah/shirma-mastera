import { type JSX } from 'react'
import { GiStarMedal } from 'react-icons/gi'
import { useFeatPopup } from '../store/featPopup'
import DiceText from './DiceText'

/** Global modal that shows a feat's full description when its name is clicked. */
export default function FeatPopup(): JSX.Element | null {
  const feat = useFeatPopup((s) => s.feat)
  const close = useFeatPopup((s) => s.close)
  if (!feat) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6" onClick={close}>
      <div
        className="parchment-texture tome-border max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg p-5 shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-accent">
            <GiStarMedal className="shrink-0" /> {feat.name}
          </h2>
          <button onClick={close} className="text-ink-brown/50 hover:text-ink-brown">✕</button>
        </div>
        <p className="text-sm italic text-ink-brown/70">
          Черта
          {feat.source ? ` · ${feat.source}` : ''}
          {feat.prereq ? ` · требование: ${feat.prereq}` : ''}
        </p>
        <hr className="fleuron" />
        <p className="text-[15px] leading-relaxed text-ink-brown">
          <DiceText text={feat.desc} label={feat.name} />
        </p>
        {feat.bonuses.length > 0 && (
          <>
            <hr className="fleuron" />
            <ul className="list-disc space-y-1 pl-5 text-[14px] leading-snug text-ink-brown">
              {feat.bonuses.map((b, i) => (
                <li key={i}>
                  <DiceText text={b} label={feat.name} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
