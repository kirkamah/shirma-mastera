import { useEffect, useState, type JSX, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import {
  RACE_BUILDS,
  CLASS_BUILDS,
  BACKGROUND_BUILDS,
  FEAT_BUILDS,
  featCategory,
  type RaceBuild,
  type ClassBuild,
  type BackgroundBuild
} from '../../data/character-build'
import { findRace, findClass, findBackground } from '../../data/custom-builds'
import { useCustomBuilds } from '../../store/customBuilds'
import { parseAbilityList, ALL_SKILLS } from '../../data/character-rules'
import { CLASS_PROGRESSION } from '../../data/class-progression'
import { markupToHtml } from '../../utils/markup'
import { deriveSheet, metamagicCount, maneuverCount, expertiseCount, type CharacterSheet } from '../../data/character-sheet'
import { METAMAGIC } from '../../data/metamagic'
import { MANEUVERS } from '../../data/maneuvers'
import ChoiceList from './ChoiceList'
import InteractiveSheet from './InteractiveSheet'
import PickerModal, { type PickItem } from './PickerModal'
import AbilityScoreStep from './AbilityScoreStep'
import SkillStep from './SkillStep'
import HpStep from './HpStep'
import InventoryStep from './InventoryStep'

type PickerKind = 'race' | 'class' | 'subclass' | 'background' | null
type SubclassItem = PickItem & NonNullable<ClassBuild['subclasses']>[number]

export default function CharacterConstructor({
  sheet,
  onChange,
  onSave,
  onPrint,
  onPdf,
  onBack
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  onSave: () => void
  onPrint: () => void
  onPdf: () => void
  onBack: () => void
}): JSX.Element {
  const { t } = useTranslation()
  const [picker, setPicker] = useState<PickerKind>(null)

  // Custom race/class/background definitions, loaded once so they're selectable
  // here and resolve to real bonuses in deriveSheet.
  const customRaces = useCustomBuilds((s) => s.races)
  const customClasses = useCustomBuilds((s) => s.classes)
  const customBackgrounds = useCustomBuilds((s) => s.backgrounds)
  const reloadCustom = useCustomBuilds((s) => s.reload)
  useEffect(() => {
    reloadCustom()
  }, [reloadCustom])

  const race = findRace(sheet.raceId)
  const cls = findClass(sheet.classId)
  const bg = findBackground(sheet.backgroundId)
  const view = deriveSheet(sheet)
  const bgTrio = bg ? parseAbilityList(bg.abilities) : []
  const bgSkills = bg ? ALL_SKILLS.filter((sk) => (bg.skills || '').includes(sk)) : []

  const races = [...RACE_BUILDS.filter((r) => r.source === 'PH24'), ...customRaces]
  const classes = [...CLASS_BUILDS, ...customClasses]
  const backgrounds = [...BACKGROUND_BUILDS, ...customBackgrounds]
  const subclassItems: SubclassItem[] = (cls?.subclasses ?? []).map((s) => ({ ...s, id: s.name }))

  // Class/subclass features (≤ current level) that make the player pick an option.
  const sub = cls?.subclasses?.find((x) => x.name === sheet.subclassName)
  const choiceFeatures = [
    ...(cls?.features ?? []).filter((f) => f.choices?.length && (f.level ?? 1) <= sheet.level),
    ...(sub && sheet.level >= 3 ? sub.features : []).filter((f) => f.choices?.length && (f.level ?? 3) <= sheet.level)
  ]
  const pickFeature = (name: string, option: string): void =>
    onChange({ featureChoices: { ...sheet.featureChoices, [name]: option } })

  // Expertise (doubled proficiency) — pick among skills you're proficient in.
  const expertSlots = expertiseCount(sheet.classId, sheet.level)
  const proficientSkills = view.skills.filter((sk) => sk.proficient).map((sk) => sk.skill)

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <button onClick={onBack} className="rounded border border-ink-brown/30 px-3 py-1 text-sm text-ink-brown/80 hover:border-accent/60">
          ← {t('cc.ctor.back')}
        </button>
        <h2 className="font-serif text-lg font-bold text-accent">{t('cc.ctor.title')}</h2>
        <div className="ml-auto flex gap-1">
          <button onClick={onSave} className="rounded bg-accent px-3 py-1 text-sm font-semibold text-parchment hover:bg-accent/80">
            {t('cc.ctor.save')}
          </button>
          <button onClick={onPrint} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">
            {t('cc.ctor.print')}
          </button>
          <button onClick={onPdf} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">
            {t('cc.ctor.downloadPdf')}
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        {/* steps */}
        <div className="w-[25rem] shrink-0 space-y-2 overflow-y-auto pr-1">
          <StepCard n={1} title={t('cc.ctor.stepRace')}>
            <PickButton label={view.raceName || t('cc.ctor.pickRace')} onClick={() => setPicker('race')} />
            {race?.subraces && race.subraces.length > 0 && (
              <select
                value={sheet.subraceName ?? ''}
                onChange={(e) => onChange({ subraceName: e.target.value || undefined })}
                className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm"
              >
                <option value="">{t('cc.ctor.subraceOptional')}</option>
                {race.subraces.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.asi})
                  </option>
                ))}
              </select>
            )}
          </StepCard>

          <StepCard n={2} title={t('cc.ctor.stepClass')}>
            <PickButton label={view.className || t('cc.ctor.pickClass')} onClick={() => setPicker('class')} />
          </StepCard>

          <StepCard n={3} title={t('cc.ctor.stepLevel')}>
            <input
              type="number"
              min={1}
              max={20}
              value={sheet.level}
              onChange={(e) => onChange({ level: Math.max(1, Math.min(20, +e.target.value)) })}
              className="w-20 rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm font-bold text-accent"
            />
            <span className="ml-2 text-xs text-ink-brown/60">{t('cc.ctor.proficiencyBonus')} {view.proficiencyBonus >= 0 ? '+' : ''}{view.proficiencyBonus}</span>
          </StepCard>

          {cls?.subclasses && cls.subclasses.length > 0 && (
            <StepCard n={4} title={t('cc.ctor.stepSubclass')}>
              {sheet.level >= 3 ? (
                <PickButton label={view.subclassName || t('cc.ctor.pickSubclass')} onClick={() => setPicker('subclass')} />
              ) : (
                <p className="text-xs italic text-ink-brown/50">{t('cc.ctor.subclassFrom3')}</p>
              )}
            </StepCard>
          )}

          <StepCard n={5} title={t('cc.ctor.stepBackground')}>
            <PickButton label={view.backgroundName || t('cc.ctor.pickBackground')} onClick={() => setPicker('background')} />
            {bg?.feat && <p className="mt-1 text-xs text-ink-brown/60">{t('cc.ctor.featLabel')} <b>{bg.feat}</b></p>}
          </StepCard>

          <StepCard n={6} title={t('cc.ctor.stepAbilities')}>
            <AbilityScoreStep sheet={sheet} onChange={onChange} bgTrio={bgTrio} />
          </StepCard>

          <StepCard n={7} title={t('cc.ctor.stepSkills')}>
            <SkillStep sheet={sheet} onChange={onChange} classSkillsText={cls?.skills} bgSkills={bgSkills} />
          </StepCard>

          {expertSlots > 0 && (
            <StepCard n={8} title={t('cc.ctor.stepExpertise')}>
              <p className="mb-1 text-[11px] italic text-ink-brown/60">{t('cc.ctor.expertiseHint', { n: expertSlots, skill: expertSlots === 1 ? t('cc.ctor.skillSingular') : t('cc.ctor.skillFew') })}</p>
              {proficientSkills.length === 0 ? (
                <p className="text-[11px] italic text-accent/70">{t('cc.ctor.expertiseNoProf')}</p>
              ) : (
                <ChoiceList
                  options={proficientSkills.map((sk) => ({ key: sk, name: sk }))}
                  selected={(sheet.expertiseSkills ?? []).filter((sk) => proficientSkills.includes(sk))}
                  max={expertSlots}
                  onChange={(expertiseSkills) => onChange({ expertiseSkills })}
                />
              )}
            </StepCard>
          )}

          <StepCard n={9} title={t('cc.ctor.stepHp')}>
            <HpStep sheet={sheet} onChange={onChange} hitDie={cls?.hitDie} conMod={view.mods.con} />
          </StepCard>

          <StepCard n={10} title={t('cc.ctor.stepEquipment')}>
            <p className="mb-1 text-[11px] italic text-ink-brown/60">{t('cc.ctor.equipmentHint')}</p>
            <InventoryStep sheet={sheet} onChange={onChange} classId={cls?.id} bgEquipment={bg?.equipment} />
          </StepCard>

          {choiceFeatures.length > 0 && (
            <StepCard n={11} title={t('cc.ctor.stepClassChoices')}>
              <div className="space-y-3">
                {choiceFeatures.map((f) => (
                  <div key={f.name}>
                    <div className="text-sm font-semibold text-accent">{f.level ? t('cc.ctor.levelPrefix', { n: f.level }) : ''}{f.name}</div>
                    <div className="mt-1 space-y-1">
                      {f.choices!.map((o) => {
                        const active = sheet.featureChoices?.[f.name] === o.name
                        return (
                          <button
                            key={o.name}
                            onClick={() => pickFeature(f.name, o.name)}
                            className={`block w-full rounded border px-2 py-1 text-left text-xs ${active ? 'border-accent bg-accent/10' : 'border-ink-brown/25 hover:border-accent/50'}`}
                          >
                            <b className={active ? 'text-accent' : 'text-ink-brown'}>{o.name}.</b>{' '}
                            <span className="text-ink-brown/80"><Fmt text={o.desc} /></span>
                          </button>
                        )
                      })}
                    </div>
                    {!sheet.featureChoices?.[f.name] && <p className="mt-0.5 text-[11px] italic text-accent/70">{t('cc.ctor.makeChoice')}</p>}
                  </div>
                ))}
              </div>
            </StepCard>
          )}

          {view.featSlots > 0 && (
            <StepCard n={12} title={t('cc.ctor.stepFeats')}>
              <ChoiceList
                options={FEAT_BUILDS.map((f) => ({ key: f.id, name: f.name, desc: f.desc, group: featCategory(f) }))}
                selected={sheet.chosenFeatIds ?? []}
                max={view.featSlots}
                onChange={(chosenFeatIds) => onChange({ chosenFeatIds })}
                searchable
              />
            </StepCard>
          )}

          {metamagicCount(sheet.classId, sheet.level) > 0 && (
            <StepCard n={13} title={t('cc.ctor.stepMetamagic')}>
              <ChoiceList
                options={METAMAGIC.map((m) => ({ key: m.name, name: m.name, desc: m.desc }))}
                selected={sheet.metamagic ?? []}
                max={metamagicCount(sheet.classId, sheet.level)}
                onChange={(metamagic) => onChange({ metamagic })}
              />
            </StepCard>
          )}

          {maneuverCount(sheet.subclassName, sheet.level) > 0 && (
            <StepCard n={14} title={t('cc.ctor.stepManeuvers')}>
              <ChoiceList
                options={MANEUVERS.map((m) => ({ key: m.name, name: m.name, desc: m.desc }))}
                selected={sheet.maneuvers ?? []}
                max={maneuverCount(sheet.subclassName, sheet.level)}
                onChange={(maneuvers) => onChange({ maneuvers })}
              />
            </StepCard>
          )}
        </div>

        {/* live sheet */}
        <div className="min-w-0 flex-1 overflow-y-auto">
          <InteractiveSheet sheet={sheet} onChange={onChange} />
        </div>
      </div>

      {picker === 'race' && (
        <PickerModal
          title={t('cc.ctor.modalRace')}
          items={races}
          selectedId={sheet.raceId}
          renderDetail={(r) => raceDetail(r, t)}
          onPick={(r) => {
            onChange({ raceId: r.id, raceText: r.name, subraceName: undefined, speed: r.speed })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === 'class' && (
        <PickerModal
          title={t('cc.ctor.modalClass')}
          items={classes}
          selectedId={sheet.classId}
          renderDetail={(c) => classDetail(c, t)}
          onPick={(c) => {
            onChange({ classId: c.id, classText: c.name, subclassName: undefined, chosenClassSkills: [] })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === 'subclass' && (
        <PickerModal
          title={t('cc.ctor.modalSubclass')}
          items={subclassItems}
          selectedId={sheet.subclassName}
          renderDetail={(s) => subclassDetail(s, t)}
          onPick={(s) => {
            onChange({ subclassName: s.name })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === 'background' && (
        <PickerModal
          title={t('cc.ctor.modalBackground')}
          items={backgrounds}
          selectedId={sheet.backgroundId}
          renderDetail={(b) => backgroundDetail(b, t)}
          onPick={(b) => {
            onChange({ backgroundId: b.id, backgroundText: b.name, backgroundIncreases: {} })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  )
}

// ---- small pieces ----
function StepCard({ n, title, children }: { n: number; title: string; children: ReactNode }): JSX.Element {
  return (
    <section className="rounded-lg border border-ink-brown/20 bg-parchment-dark/15">
      <div className="flex items-center gap-2 border-b border-ink-brown/15 bg-ink-brown/[0.06] px-3 py-1.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-parchment">{n}</span>
        <h3 className="font-serif text-sm font-bold uppercase tracking-wide text-ink-brown/70">{title}</h3>
      </div>
      <div className="p-3">{children}</div>
    </section>
  )
}

function PickButton({ label, onClick }: { label: string; onClick: () => void }): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="w-full rounded border border-accent/40 bg-accent/5 px-3 py-1.5 text-left text-sm font-semibold text-accent hover:bg-accent/15"
    >
      {label} <span className="float-right text-ink-brown/40">▾</span>
    </button>
  )
}

// ---- compact picker detail renderers ----
/** Inline text with **жирный** / *курсив* / __подчёркнутый__ / {цвет:текст} markup. */
function Fmt({ text }: { text?: string }): JSX.Element {
  return <span dangerouslySetInnerHTML={{ __html: markupToHtml(text) }} />
}

function raceDetail(r: RaceBuild, t: TFunction): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      <p className="italic text-ink-brown/70">{r.asi}</p>
      <p className="mt-1 text-xs text-ink-brown/60">{t('cc.ctor.size')} {r.size} · {t('cc.ctor.speed')} {r.speed} {t('cc.ctor.feet')} · {t('cc.ctor.languages')} {r.langs}</p>
      <ul className="mt-2 space-y-1">
        {r.traits.map((t) => (
          <li key={t.name}>
            <b className="text-accent">{t.name}.</b> <Fmt text={t.desc} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function classDetail(c: ClassBuild, t: TFunction): JSX.Element {
  const prog = CLASS_PROGRESSION[c.id]
  // Resource columns = the progression's declared columns plus any extra keys
  // present in the rows (e.g. casters carry "Макс. ур. ячеек").
  const extraKeys = prog ? [...new Set(prog.rows.flatMap((r) => Object.keys(r.cols ?? {})))].filter((k) => !prog.columns.includes(k)) : []
  const colKeys = prog ? [...prog.columns, ...extraKeys] : []
  return (
    <div className="text-sm text-ink-brown">
      <p className="text-xs text-ink-brown/70">{t('cc.ctor.hitDie')} 1{c.hitDie} · {t('cc.ctor.saves')} {c.saves}</p>
      <p className="mt-0.5 text-xs text-ink-brown/70">{t('cc.ctor.armor')} {c.armor} · {t('cc.ctor.weapons')} {c.weapons}</p>
      <p className="mt-0.5 text-xs text-ink-brown/70">{t('cc.ctor.skills')} {c.skills}</p>

      {prog && (
        <div className="mt-2 overflow-x-auto rounded border border-ink-brown/15">
          <table className="w-full border-collapse text-[10px] leading-tight">
            <thead>
              <tr className="border-b border-ink-brown/40 bg-parchment-dark/40 text-ink-brown/70">
                <th className="px-1.5 py-1 text-left">{t('cc.ctor.thLevel')}</th>
                <th className="px-1 py-1" title={t('cc.ctor.proficiencyBonusFull')}>{t('cc.ctor.thPb')}</th>
                {colKeys.map((k) => (
                  <th key={k} className="px-1 py-1">{k}</th>
                ))}
                <th className="px-1.5 py-1 text-left">{t('cc.ctor.thFeatures')}</th>
              </tr>
            </thead>
            <tbody>
              {prog.rows.map((r) => (
                <tr key={r.level} className="border-b border-ink-brown/10 odd:bg-parchment/30">
                  <td className="px-1.5 py-0.5 text-center font-semibold text-accent">{r.level}</td>
                  <td className="px-1 py-0.5 text-center">+{r.pb}</td>
                  {colKeys.map((k) => (
                    <td key={k} className="px-1 py-0.5 text-center">{r.cols?.[k] ?? '—'}</td>
                  ))}
                  <td className="px-1.5 py-0.5">{r.features === 'ASI' ? t('cc.ctor.asiFeat') : r.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ul className="mt-2 space-y-1">
        {c.features.map((f) => (
          <li key={`${f.level}-${f.name}`}>
            <b className="text-accent">{f.level ? t('cc.ctor.levelPrefix', { n: f.level }) : ''}{f.name}.</b> <Fmt text={f.desc} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function subclassDetail(s: SubclassItem, t: TFunction): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      {s.meta && <p className="italic text-ink-brown/60"><Fmt text={s.meta} /></p>}
      <ul className="mt-1 space-y-1">
        {s.features.map((f) => (
          <li key={f.name}>
            <b className="text-accent">{f.level ? t('cc.ctor.levelPrefix', { n: f.level }) : ''}{f.name}.</b> <Fmt text={f.desc} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function backgroundDetail(b: BackgroundBuild, t: TFunction): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      {b.abilities && <p className="text-xs text-ink-brown/70">{t('cc.ctor.abilities')} {b.abilities}</p>}
      <p className="text-xs text-ink-brown/70">{t('cc.ctor.skills')} {b.skills}</p>
      {b.tools && <p className="text-xs text-ink-brown/70">{t('cc.ctor.tools')} {b.tools}</p>}
      {b.feat && <p className="text-xs text-ink-brown/70">{t('cc.ctor.feat')} {b.feat}</p>}
      <p className="mt-1 text-xs text-ink-brown/70">{t('cc.ctor.equipment')} {b.equipment}</p>
      {b.lore && <p className="mt-2 italic text-ink-brown/80"><Fmt text={b.lore} /></p>}
    </div>
  )
}
