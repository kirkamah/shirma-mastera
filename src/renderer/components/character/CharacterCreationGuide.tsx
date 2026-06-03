import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiScrollQuill } from 'react-icons/gi'
import DiceText from '../DiceText'

interface CreationStep {
  title: string
  lead: string
  points: string[]
  ref?: string
}

/** Standalone step-by-step character-creation reference. */
export default function CharacterCreationGuide(): JSX.Element {
  const { t } = useTranslation()

  const CREATION_STEPS: CreationStep[] = [
    {
      title: t('cc.guide.step1.title'),
      lead: t('cc.guide.step1.lead'),
      points: [
        t('cc.guide.step1.point1'),
        t('cc.guide.step1.point2'),
        t('cc.guide.step1.point3')
      ]
    },
    {
      title: t('cc.guide.step2.title'),
      lead: t('cc.guide.step2.lead'),
      points: [
        t('cc.guide.step2.point1'),
        t('cc.guide.step2.point2'),
        t('cc.guide.step2.point3')
      ],
      ref: t('cc.guide.step2.ref')
    },
    {
      title: t('cc.guide.step3.title'),
      lead: t('cc.guide.step3.lead'),
      points: [
        t('cc.guide.step3.point1'),
        t('cc.guide.step3.point2'),
        t('cc.guide.step3.point3'),
        t('cc.guide.step3.point4')
      ],
      ref: t('cc.guide.step3.ref')
    },
    {
      title: t('cc.guide.step4.title'),
      lead: t('cc.guide.step4.lead'),
      points: [
        t('cc.guide.step4.point1'),
        t('cc.guide.step4.point2'),
        t('cc.guide.step4.point3'),
        t('cc.guide.step4.point4')
      ],
      ref: t('cc.guide.step4.ref')
    },
    {
      title: t('cc.guide.step5.title'),
      lead: t('cc.guide.step5.lead'),
      points: [
        t('cc.guide.step5.point1'),
        t('cc.guide.step5.point2'),
        t('cc.guide.step5.point3'),
        t('cc.guide.step5.point4'),
        t('cc.guide.step5.point5')
      ]
    },
    {
      title: t('cc.guide.step6.title'),
      lead: t('cc.guide.step6.lead'),
      points: [
        t('cc.guide.step6.point1'),
        t('cc.guide.step6.point2'),
        t('cc.guide.step6.point3'),
        t('cc.guide.step6.point4')
      ]
    },
    {
      title: t('cc.guide.step7.title'),
      lead: t('cc.guide.step7.lead'),
      points: [
        t('cc.guide.step7.point1'),
        t('cc.guide.step7.point2'),
        t('cc.guide.step7.point3')
      ]
    },
    {
      title: t('cc.guide.step8.title'),
      lead: t('cc.guide.step8.lead'),
      points: [
        t('cc.guide.step8.point1'),
        t('cc.guide.step8.point2'),
        t('cc.guide.step8.point3'),
        t('cc.guide.step8.point4')
      ]
    },
    {
      title: t('cc.guide.step9.title'),
      lead: t('cc.guide.step9.lead'),
      points: [
        t('cc.guide.step9.point1'),
        t('cc.guide.step9.point2'),
        t('cc.guide.step9.point3')
      ]
    },
    {
      title: t('cc.guide.step10.title'),
      lead: t('cc.guide.step10.lead'),
      points: [
        t('cc.guide.step10.point1'),
        t('cc.guide.step10.point2'),
        t('cc.guide.step10.point3')
      ]
    }
  ]

  return (
    <div className="mx-auto max-w-3xl pb-6">
      <div className="rounded-xl border-2 border-gold/50 bg-gradient-to-b from-accent/15 to-parchment-dark/10 p-5 shadow-panel">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold/60 bg-accent/20 text-2xl text-accent">
            <GiScrollQuill />
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-accent">{t('cc.guide.heading')}</h2>
            <p className="text-sm italic text-ink-brown/70">
              {t('cc.guide.subtitle')}
            </p>
          </div>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-brown/85">
          {t('cc.guide.intro')}
        </p>
      </div>

      <ol className="mt-4 space-y-3">
        {CREATION_STEPS.map((s, i) => (
          <li key={s.title} className="overflow-hidden rounded-lg border border-ink-brown/20 bg-parchment-dark/15 shadow-sm">
            <div className="flex items-center gap-3 border-b border-ink-brown/15 bg-ink-brown/[0.06] px-4 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-sm font-bold text-parchment">
                {i + 1}
              </span>
              <h3 className="font-serif text-lg font-bold text-accent">{s.title}</h3>
              {s.ref && (
                <span className="ml-auto rounded-full border border-gold/50 px-2 py-0.5 text-[11px] font-semibold text-gold">
                  {t('cc.guide.tabBadge', { n: s.ref })}
                </span>
              )}
            </div>
            <div className="px-4 py-3">
              <p className="mb-2 text-[14px] italic leading-snug text-ink-brown/80">{s.lead}</p>
              <ul className="list-disc space-y-1 pl-5 text-[14px] leading-snug text-ink-brown">
                {s.points.map((p, j) => (
                  <li key={j}>
                    <DiceText text={p} label={s.title} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
