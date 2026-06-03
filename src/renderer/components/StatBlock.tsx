import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiCrossedSwords } from 'react-icons/gi'
import type { NamedEntry, StatBlock as SB } from '@shared/types'
import DiceText from './DiceText'
import SpellcastingBlock from './SpellcastingBlock'
import Portrait, { emblemForMonster } from './Portrait'
import { monSizeLabel, monTypeLabel, monAlignmentLabel, monSkillLabel, monEnvLabel, monSpeedMode, monFtLabel } from '../data/bestiary-ru'
import { useInitiative } from '../store/initiative'
import { useUi } from '../store/ui'
import { rollD20 } from '../utils/roll'

const ABIL_ORDER: (keyof SB['abilities'])[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

const SKILL_RU: Record<string, string> = {
  acrobatics: 'Акробатика',
  animal_handling: 'Уход за животными',
  arcana: 'Магия',
  athletics: 'Атлетика',
  deception: 'Обман',
  history: 'История',
  insight: 'Проницательность',
  intimidation: 'Запугивание',
  investigation: 'Анализ',
  medicine: 'Медицина',
  nature: 'Природа',
  perception: 'Внимательность',
  performance: 'Выступление',
  persuasion: 'Убеждение',
  religion: 'Религия',
  sleight_of_hand: 'Ловкость рук',
  stealth: 'Скрытность',
  survival: 'Выживание'
}

const SPEED_RU: Record<string, string> = {
  walk: '',
  fly: 'летая',
  swim: 'плавая',
  climb: 'лазая',
  burrow: 'копая',
  crawl: 'ползая'
}

function mod(score: number): number {
  return Math.floor((score - 10) / 2)
}
function signed(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`
}

function Field({ label, children }: { label: string; children: React.ReactNode }): JSX.Element {
  return (
    <p className="text-sm leading-snug">
      <span className="font-semibold text-accent">{label}</span> {children}
    </p>
  )
}

const SPELLCASTING_NAME = /использован.{0,5}заклинан|врожд.{0,4}колдовств|магия договор|тайнств.{0,5}аркан/i

function isSpellcastingEntry(e: NamedEntry): boolean {
  return SPELLCASTING_NAME.test(e.name) && /\d+\s*ур\.\s*\(|Заговоры/i.test(e.desc)
}

function EntryList({ title, entries }: { title: string; entries: NamedEntry[] }): JSX.Element | null {
  if (!entries.length) return null
  return (
    <section className="mt-3">
      <h3 className="mb-1 border-b-2 border-accent/60 pb-0.5 font-serif text-lg font-semibold text-accent">
        {title}
      </h3>
      <div className="space-y-1.5">
        {entries.map((e) => {
          const label = e.name || title
          return (
            <div key={e.id} className="text-sm leading-snug">
              {e.name && <span className="font-semibold italic">{e.name}. </span>}
              {isSpellcastingEntry(e) ? (
                <SpellcastingBlock text={e.desc} label={label} />
              ) : (
                <DiceText text={e.desc} label={label} />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

interface Props {
  monster: SB
  header?: React.ReactNode
}

export default function StatBlock({ monster: m, header }: Props): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const addCombatant = useInitiative((s) => s.addCombatant)
  const setNotebookTab = useUi((s) => s.setNotebookTab)

  const sendToCombat = (): void => {
    const dexMod = mod(m.abilities.dex)
    const initiative = rollD20(dexMod).total
    addCombatant({ name: m.name, initiative, hp: m.hitPoints, maxHp: m.hitPoints, ac: m.armorClass, notes: '', type: 'enemy' })
    setNotebookTab('initiative')
  }

  const ft = monFtLabel(lang)
  const speed = Object.entries(m.speed)
    .map(([mode, v]) => {
      const word = lang.startsWith('en') ? monSpeedMode(mode, lang) ?? '' : SPEED_RU[mode] ?? ''
      return (word ? `${word} ${v} ${ft}` : `${v} ${ft}`).trim()
    })
    .join(', ')

  const saves = ABIL_ORDER.filter((a) => m.savingThrows[a] != null)
    .map((a) => `${t('abilities.' + a)} ${signed(m.savingThrows[a])}`)
    .join(', ')

  const skills = Object.entries(m.skills)
    .map(([slug, b]) => `${lang.startsWith('en') ? monSkillLabel(slug, lang) : SKILL_RU[slug] ?? slug} ${signed(b)}`)
    .join(', ')

  return (
    <article className="parchment-texture tome-border tome-page relative mx-auto max-w-3xl rounded-lg p-5 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Portrait emblem={emblemForMonster(m)} src={m.imageUrl} size={64} />
          <div>
            <h2 className="font-serif text-3xl font-bold text-accent">{m.name}</h2>
            <p className="text-sm italic text-ink-brown/70">
              {monSizeLabel(m.size, lang)}, {monTypeLabel(m.type, lang)}
              {m.subtype ? ` (${m.subtype})` : ''}, {monAlignmentLabel(m.alignment, lang)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={sendToCombat}
            className="rounded border border-accent bg-accent px-3 py-1 text-xs font-bold text-parchment shadow hover:bg-accent/80"
            title="Добавить в трекер инициативы"
          >
            <span className="inline-flex items-center gap-1"><GiCrossedSwords /> В бой</span>
          </button>
          {header}
        </div>
      </div>

      {m.flavor && (
        <p className="mt-2 text-sm italic leading-snug text-ink-brown/75">
          <DiceText text={m.flavor} label={m.name} />
        </p>
      )}

      <hr className="stat-divider" />

      <Field label={t('statblock.ac')}>
        {m.armorClass}
        {m.armorDetail ? ` (${m.armorDetail})` : ''}
      </Field>
      <Field label={t('statblock.hp')}>
        {m.hitPoints} {m.hitDice && <DiceText text={`(${m.hitDice})`} label={t('statblock.hp')} />}
      </Field>
      <Field label={t('statblock.speed')}>{speed}</Field>

      <hr className="stat-divider" />

      {/* Ability scores */}
      <div className="grid grid-cols-6 gap-1 text-center">
        {ABIL_ORDER.map((a) => (
          <div key={a} className="rounded bg-black/5 py-1">
            <div className="text-xs font-bold uppercase text-accent">{t('abilities.' + a)}</div>
            <div className="text-sm">
              {m.abilities[a]}{' '}
              <DiceText text={`(${signed(mod(m.abilities[a]))})`} label={t('abilities.' + a)} />
            </div>
          </div>
        ))}
      </div>

      <hr className="stat-divider" />

      {saves && <Field label={t('statblock.savingThrows')}><DiceText text={saves} label={t('statblock.savingThrows')} /></Field>}
      {skills && <Field label={t('statblock.skills')}><DiceText text={skills} label={t('statblock.skills')} /></Field>}
      {m.damageVulnerabilities && <Field label={t('statblock.damageVulnerabilities')}>{m.damageVulnerabilities}</Field>}
      {m.damageResistances && <Field label={t('statblock.damageResistances')}>{m.damageResistances}</Field>}
      {m.damageImmunities && <Field label={t('statblock.damageImmunities')}>{m.damageImmunities}</Field>}
      {m.conditionImmunities && <Field label={t('statblock.conditionImmunities')}>{m.conditionImmunities}</Field>}
      {m.senses && <Field label={t('statblock.senses')}>{m.senses}</Field>}
      {m.languages && <Field label={t('statblock.languages')}>{m.languages}</Field>}
      <Field label={t('statblock.challenge')}>
        {m.crDisplay}
        {m.proficiencyBonus != null && (
          <span className="ml-3 text-ink-brown/70">
            {t('statblock.proficiencyBonus')}:{' '}
            <DiceText text={signed(m.proficiencyBonus)} label={t('statblock.proficiencyBonus')} />
          </span>
        )}
      </Field>

      {m.environments.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {m.environments.map((env) => (
            <span key={env} className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">
              {monEnvLabel(env, lang)}
            </span>
          ))}
        </div>
      )}

      <EntryList title={t('statblock.traits')} entries={m.traits} />
      <EntryList title={t('statblock.actions')} entries={m.actions} />
      <EntryList title={t('statblock.bonusActions')} entries={m.bonusActions} />
      <EntryList title={t('statblock.reactions')} entries={m.reactions} />
      <EntryList title={t('statblock.legendaryActions')} entries={m.legendaryActions} />
    </article>
  )
}
