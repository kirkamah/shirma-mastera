import { useState, type JSX, type ReactNode } from 'react'
import {
  RACE_BUILDS,
  CLASS_BUILDS,
  BACKGROUND_BUILDS,
  FEAT_BUILDS,
  type RaceBuild,
  type ClassBuild,
  type BackgroundBuild
} from '../../data/character-build'
import { parseAbilityList, ALL_SKILLS } from '../../data/character-rules'
import { deriveSheet, metamagicCount, maneuverCount, type CharacterSheet } from '../../data/character-sheet'
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
  const [picker, setPicker] = useState<PickerKind>(null)

  const race = sheet.raceId ? RACE_BUILDS.find((r) => r.id === sheet.raceId) : undefined
  const cls = sheet.classId ? CLASS_BUILDS.find((c) => c.id === sheet.classId) : undefined
  const bg = sheet.backgroundId ? BACKGROUND_BUILDS.find((b) => b.id === sheet.backgroundId) : undefined
  const view = deriveSheet(sheet)
  const bgTrio = bg ? parseAbilityList(bg.abilities) : []
  const bgSkills = bg ? ALL_SKILLS.filter((sk) => (bg.skills || '').includes(sk)) : []

  const races = RACE_BUILDS.filter((r) => r.source === 'PH24')
  const subclassItems: SubclassItem[] = (cls?.subclasses ?? []).map((s) => ({ ...s, id: s.name }))

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <button onClick={onBack} className="rounded border border-ink-brown/30 px-3 py-1 text-sm text-ink-brown/80 hover:border-accent/60">
          ← Назад
        </button>
        <h2 className="font-serif text-lg font-bold text-accent">Конструктор персонажа</h2>
        <div className="ml-auto flex gap-1">
          <button onClick={onSave} className="rounded bg-accent px-3 py-1 text-sm font-semibold text-parchment hover:bg-accent/80">
            Сохранить
          </button>
          <button onClick={onPrint} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">
            Печать
          </button>
          <button onClick={onPdf} className="rounded border border-accent/40 px-3 py-1 text-sm text-accent hover:bg-accent/10">
            Скачать PDF
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        {/* steps */}
        <div className="w-[25rem] shrink-0 space-y-2 overflow-y-auto pr-1">
          <StepCard n={1} title="Раса">
            <PickButton label={view.raceName || 'Выбрать расу'} onClick={() => setPicker('race')} />
            {race?.subraces && race.subraces.length > 0 && (
              <select
                value={sheet.subraceName ?? ''}
                onChange={(e) => onChange({ subraceName: e.target.value || undefined })}
                className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm"
              >
                <option value="">— подраса (необязательно) —</option>
                {race.subraces.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.asi})
                  </option>
                ))}
              </select>
            )}
          </StepCard>

          <StepCard n={2} title="Класс">
            <PickButton label={view.className || 'Выбрать класс'} onClick={() => setPicker('class')} />
          </StepCard>

          <StepCard n={3} title="Уровень">
            <input
              type="number"
              min={1}
              max={20}
              value={sheet.level}
              onChange={(e) => onChange({ level: Math.max(1, Math.min(20, +e.target.value)) })}
              className="w-20 rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm font-bold text-accent"
            />
            <span className="ml-2 text-xs text-ink-brown/60">бонус мастерства {view.proficiencyBonus >= 0 ? '+' : ''}{view.proficiencyBonus}</span>
          </StepCard>

          {cls?.subclasses && cls.subclasses.length > 0 && (
            <StepCard n={4} title="Подкласс">
              {sheet.level >= 3 ? (
                <PickButton label={view.subclassName || 'Выбрать подкласс'} onClick={() => setPicker('subclass')} />
              ) : (
                <p className="text-xs italic text-ink-brown/50">Доступен с 3 уровня.</p>
              )}
            </StepCard>
          )}

          <StepCard n={5} title="Предыстория">
            <PickButton label={view.backgroundName || 'Выбрать предысторию'} onClick={() => setPicker('background')} />
            {bg?.feat && <p className="mt-1 text-xs text-ink-brown/60">Черта: <b>{bg.feat}</b></p>}
          </StepCard>

          <StepCard n={6} title="Характеристики">
            <AbilityScoreStep sheet={sheet} onChange={onChange} bgTrio={bgTrio} />
          </StepCard>

          <StepCard n={7} title="Навыки">
            <SkillStep sheet={sheet} onChange={onChange} classSkillsText={cls?.skills} bgSkills={bgSkills} />
          </StepCard>

          <StepCard n={8} title="Хиты">
            <HpStep sheet={sheet} onChange={onChange} hitDie={cls?.hitDie} conMod={view.mods.con} />
          </StepCard>

          <StepCard n={9} title="Снаряжение, оружие и атаки">
            <p className="mb-1 text-[11px] italic text-ink-brown/60">Купленное оружие автоматически появляется в атаках листа (фехтовальное — по лучшей из Силы/Ловкости).</p>
            <InventoryStep sheet={sheet} onChange={onChange} classId={cls?.id} bgEquipment={bg?.equipment} />
          </StepCard>

          {view.featSlots > 0 && (
            <StepCard n={10} title="Черты">
              <ChoiceList
                options={FEAT_BUILDS.map((f) => ({ key: f.id, name: f.name, desc: f.desc }))}
                selected={sheet.chosenFeatIds ?? []}
                max={view.featSlots}
                onChange={(chosenFeatIds) => onChange({ chosenFeatIds })}
                searchable
              />
            </StepCard>
          )}

          {metamagicCount(sheet.classId, sheet.level) > 0 && (
            <StepCard n={11} title="Метамагия">
              <ChoiceList
                options={METAMAGIC.map((m) => ({ key: m.name, name: m.name, desc: m.desc }))}
                selected={sheet.metamagic ?? []}
                max={metamagicCount(sheet.classId, sheet.level)}
                onChange={(metamagic) => onChange({ metamagic })}
              />
            </StepCard>
          )}

          {maneuverCount(sheet.subclassName, sheet.level) > 0 && (
            <StepCard n={12} title="Боевые приёмы">
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
          title="Выбор расы"
          items={races}
          selectedId={sheet.raceId}
          renderDetail={raceDetail}
          onPick={(r) => {
            onChange({ raceId: r.id, raceText: r.name, subraceName: undefined, speed: r.speed })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === 'class' && (
        <PickerModal
          title="Выбор класса"
          items={CLASS_BUILDS}
          selectedId={sheet.classId}
          renderDetail={classDetail}
          onPick={(c) => {
            onChange({ classId: c.id, classText: c.name, subclassName: undefined, chosenClassSkills: [] })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === 'subclass' && (
        <PickerModal
          title="Выбор подкласса"
          items={subclassItems}
          selectedId={sheet.subclassName}
          renderDetail={subclassDetail}
          onPick={(s) => {
            onChange({ subclassName: s.name })
            setPicker(null)
          }}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === 'background' && (
        <PickerModal
          title="Выбор предыстории"
          items={BACKGROUND_BUILDS}
          selectedId={sheet.backgroundId}
          renderDetail={backgroundDetail}
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
function raceDetail(r: RaceBuild): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      <p className="italic text-ink-brown/70">{r.asi}</p>
      <p className="mt-1 text-xs text-ink-brown/60">Размер: {r.size} · Скорость: {r.speed} фт · Языки: {r.langs}</p>
      <ul className="mt-2 space-y-1">
        {r.traits.map((t) => (
          <li key={t.name}>
            <b className="text-accent">{t.name}.</b> {t.desc}
          </li>
        ))}
      </ul>
    </div>
  )
}

function classDetail(c: ClassBuild): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      <p className="text-xs text-ink-brown/70">Кость хитов 1{c.hitDie} · Спасброски: {c.saves}</p>
      <p className="mt-0.5 text-xs text-ink-brown/70">Навыки: {c.skills}</p>
      <ul className="mt-2 space-y-1">
        {c.features.map((f) => (
          <li key={`${f.level}-${f.name}`}>
            <b className="text-accent">{f.level ? `${f.level} ур. ` : ''}{f.name}.</b> {f.desc}
          </li>
        ))}
      </ul>
    </div>
  )
}

function subclassDetail(s: SubclassItem): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      {s.meta && <p className="italic text-ink-brown/60">{s.meta}</p>}
      <ul className="mt-1 space-y-1">
        {s.features.map((f) => (
          <li key={f.name}>
            <b className="text-accent">{f.level ? `${f.level} ур. ` : ''}{f.name}.</b> {f.desc}
          </li>
        ))}
      </ul>
    </div>
  )
}

function backgroundDetail(b: BackgroundBuild): JSX.Element {
  return (
    <div className="text-sm text-ink-brown">
      {b.abilities && <p className="text-xs text-ink-brown/70">Характеристики: {b.abilities}</p>}
      <p className="text-xs text-ink-brown/70">Навыки: {b.skills}</p>
      {b.tools && <p className="text-xs text-ink-brown/70">Инструменты: {b.tools}</p>}
      {b.feat && <p className="text-xs text-ink-brown/70">Черта: {b.feat}</p>}
      <p className="mt-1 text-xs text-ink-brown/70">Снаряжение: {b.equipment}</p>
      {b.lore && <p className="mt-2 italic text-ink-brown/80">{b.lore}</p>}
    </div>
  )
}
