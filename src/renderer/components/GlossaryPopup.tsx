import { type JSX } from 'react'
import { GiSpellBook } from 'react-icons/gi'
import { useGlossaryPopup } from '../store/glossaryPopup'
import DiceText from './DiceText'

/** Modal that shows a class glossary term (Metamagic option, Eldritch Invocation, …)
 *  when its «…» reference is clicked. */
export default function GlossaryPopup(): JSX.Element | null {
  const term = useGlossaryPopup((s) => s.term)
  const close = useGlossaryPopup((s) => s.close)
  if (!term) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6" onClick={close}>
      <div
        className="parchment-texture tome-border max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg p-5 shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-accent">
            <GiSpellBook className="shrink-0" /> {term.name}
          </h2>
          <button onClick={close} className="text-ink-brown/50 hover:text-ink-brown">✕</button>
        </div>
        <p className="text-sm italic text-ink-brown/70">
          {term.category}
          {term.source ? ` · ${term.source}` : ''}
        </p>
        <hr className="fleuron" />
        <p className="text-[15px] leading-relaxed text-ink-brown">
          <DiceText text={term.desc} label={term.name} />
        </p>
      </div>
    </div>
  )
}
