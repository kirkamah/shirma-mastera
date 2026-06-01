import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../Modal'
import type { RaceBuild, ClassBuild, BackgroundBuild, BuildTrait } from '../../data/character-build'
import {
  CUSTOM_SOURCE,
  CUSTOM_RACE_KIND,
  CUSTOM_CLASS_KIND,
  CUSTOM_BACKGROUND_KIND,
  newCustomBuildId
} from '../../data/custom-builds'
import { useCustomBuilds } from '../../store/customBuilds'

export type BuildKind = 'race' | 'class' | 'background'

const KIND_DB: Record<BuildKind, string> = {
  race: CUSTOM_RACE_KIND,
  class: CUSTOM_CLASS_KIND,
  background: CUSTOM_BACKGROUND_KIND
}

const KIND_LABEL_KEY: Record<BuildKind, string> = {
  race: 'build.edKindRace',
  class: 'build.edKindClass',
  background: 'build.edKindBackground'
}

const inputCls =
  'w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-ink-brown focus:border-accent focus:outline-none'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }): JSX.Element {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-brown/60">{label}</span>
      {hint && <span className="ml-2 text-[11px] italic text-ink-brown/45">{hint}</span>}
      <div className="mt-1">{children}</div>
    </label>
  )
}

function Text({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }): JSX.Element {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
}

function TraitsEditor({
  traits,
  onChange,
  withLevel
}: {
  traits: BuildTrait[]
  onChange: (t: BuildTrait[]) => void
  withLevel?: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const set = (i: number, patch: Partial<BuildTrait>): void => onChange(traits.map((tr, j) => (j === i ? { ...tr, ...patch } : tr)))
  return (
    <div className="space-y-2">
      {traits.map((tr, i) => (
        <div key={i} className="rounded border border-ink-brown/20 bg-parchment/40 p-2">
          <div className="flex gap-2">
            {withLevel && (
              <input
                type="number"
                min={1}
                max={20}
                value={tr.level ?? 1}
                onChange={(e) => set(i, { level: Number(e.target.value) })}
                className="w-16 rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-ink-brown focus:border-accent focus:outline-none"
                title={t('build.edLevel')}
              />
            )}
            <input value={tr.name} onChange={(e) => set(i, { name: e.target.value })} placeholder={t('build.edTraitName')} className={inputCls} />
            <button
              onClick={() => onChange(traits.filter((_, j) => j !== i))}
              className="shrink-0 rounded border border-red-700/40 px-2 text-sm text-red-800 hover:bg-red-700/10"
              title={t('common.delete')}
            >
              ✕
            </button>
          </div>
          <textarea
            value={tr.desc}
            onChange={(e) => set(i, { desc: e.target.value })}
            placeholder={t('build.edTraitDesc')}
            rows={2}
            className={`${inputCls} mt-1`}
          />
        </div>
      ))}
      <button
        onClick={() => onChange([...traits, withLevel ? { level: 1, name: '', desc: '' } : { name: '', desc: '' }])}
        className="rounded border border-ink-brown/30 px-3 py-1 text-sm text-ink-brown/80 hover:border-accent hover:text-accent"
      >
        {t('build.edAddTrait')}
      </button>
    </div>
  )
}

type AnyBuild = RaceBuild | ClassBuild | BackgroundBuild

export default function CustomBuildEditor({
  kind,
  initial,
  onClose,
  onSaved
}: {
  kind: BuildKind
  initial: AnyBuild | null
  onClose: () => void
  onSaved: (id: string) => void
}): JSX.Element {
  const { t } = useTranslation()
  const reload = useCustomBuilds((s) => s.reload)
  const kindLabel = t(KIND_LABEL_KEY[kind])

  const [form, setForm] = useState<Record<string, unknown>>(() => {
    if (initial) return { ...(initial as unknown as Record<string, unknown>) }
    if (kind === 'race') return { name: '', asi: '', size: '', speed: 30, langs: '', traits: [] }
    if (kind === 'class')
      return { name: '', hitDie: 'к8', primary: '', saves: '', armor: '', weapons: '', tools: '', skills: '', features: [] }
    return { name: '', abilities: '', feat: '', skills: '', tools: '', langs: '', equipment: '', lore: '' }
  })

  const f = (k: string): string => String(form[k] ?? '')
  const upd = (patch: Record<string, unknown>): void => setForm((prev) => ({ ...prev, ...patch }))

  const save = async (): Promise<void> => {
    const id = (initial?.id as string) || newCustomBuildId()
    const name = f('name').trim() || '—'
    let entry: AnyBuild
    if (kind === 'race') {
      entry = { id, name, asi: f('asi'), size: f('size'), speed: Number(form.speed) || 30, langs: f('langs'), traits: (form.traits as BuildTrait[]) ?? [], source: CUSTOM_SOURCE } as RaceBuild
    } else if (kind === 'class') {
      entry = { id, name, hitDie: f('hitDie') || 'к8', primary: f('primary'), saves: f('saves'), armor: f('armor'), weapons: f('weapons'), tools: f('tools') || undefined, skills: f('skills'), features: (form.features as BuildTrait[]) ?? [], source: CUSTOM_SOURCE } as ClassBuild
    } else {
      entry = { id, name, abilities: f('abilities'), feat: f('feat') || undefined, skills: f('skills'), tools: f('tools') || undefined, langs: f('langs') || undefined, equipment: f('equipment'), lore: f('lore') || undefined, source: CUSTOM_SOURCE } as BackgroundBuild
    }
    const record = { ...entry, key: id } as unknown as { key: string; name: string }
    await window.api.db.saveCustom(KIND_DB[kind], record)
    await reload()
    onSaved(id)
  }

  return (
    <Modal onClose={onClose} max="max-w-2xl">
      <div className="parchment-texture tome-border rounded-lg p-5">
        <h2 className="mb-1 font-serif text-2xl font-bold text-accent">
          {initial ? t('build.edTitleEdit', { kind: kindLabel }) : t('build.edTitleNew', { kind: kindLabel })}
        </h2>
        <p className="mb-3 text-xs italic text-ink-brown/60">{t('build.edHint')}</p>

        <div className="space-y-3">
          <Field label={t('build.edName')}>
            <Text value={f('name')} onChange={(v) => upd({ name: v })} placeholder={t('build.edNamePh', { kind: kindLabel })} />
          </Field>

          {kind === 'race' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t('build.edSize')}><Text value={f('size')} onChange={(v) => upd({ size: v })} /></Field>
                <Field label={t('build.edSpeed')}>
                  <input type="number" value={Number(form.speed) || 0} onChange={(e) => upd({ speed: Number(e.target.value) })} className={inputCls} />
                </Field>
              </div>
              <Field label={t('build.edAsi')} hint={t('build.edAsiHint')}><Text value={f('asi')} onChange={(v) => upd({ asi: v })} /></Field>
              <Field label={t('build.edLangs')}><Text value={f('langs')} onChange={(v) => upd({ langs: v })} /></Field>
              <Field label={t('build.edRaceTraits')}><TraitsEditor traits={(form.traits as BuildTrait[]) ?? []} onChange={(tr) => upd({ traits: tr })} /></Field>
            </>
          )}

          {kind === 'class' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t('build.edHitDie')}>
                  <select value={f('hitDie')} onChange={(e) => upd({ hitDie: e.target.value })} className={inputCls}>
                    <option value="к6">к6</option>
                    <option value="к8">к8</option>
                    <option value="к10">к10</option>
                    <option value="к12">к12</option>
                  </select>
                </Field>
                <Field label={t('build.edPrimary')}><Text value={f('primary')} onChange={(v) => upd({ primary: v })} /></Field>
              </div>
              <Field label={t('build.edSaves')} hint={t('build.edSavesHint')}><Text value={f('saves')} onChange={(v) => upd({ saves: v })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t('build.edArmor')}><Text value={f('armor')} onChange={(v) => upd({ armor: v })} /></Field>
                <Field label={t('build.edWeapons')}><Text value={f('weapons')} onChange={(v) => upd({ weapons: v })} /></Field>
              </div>
              <Field label={t('build.edTools')}><Text value={f('tools')} onChange={(v) => upd({ tools: v })} /></Field>
              <Field label={t('build.edSkills')} hint={t('build.edSkillsClassHint')}><Text value={f('skills')} onChange={(v) => upd({ skills: v })} /></Field>
              <Field label={t('build.edClassFeatures')}>
                <TraitsEditor traits={(form.features as BuildTrait[]) ?? []} onChange={(tr) => upd({ features: tr })} withLevel />
              </Field>
            </>
          )}

          {kind === 'background' && (
            <>
              <Field label={t('build.edAbilities')} hint={t('build.edAbilitiesHint')}><Text value={f('abilities')} onChange={(v) => upd({ abilities: v })} /></Field>
              <Field label={t('build.edFeat')} hint={t('build.edFeatHint')}><Text value={f('feat')} onChange={(v) => upd({ feat: v })} /></Field>
              <Field label={t('build.edSkills')} hint={t('build.edSkillsBgHint')}><Text value={f('skills')} onChange={(v) => upd({ skills: v })} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t('build.edTools')}><Text value={f('tools')} onChange={(v) => upd({ tools: v })} /></Field>
                <Field label={t('build.edLangs')}><Text value={f('langs')} onChange={(v) => upd({ langs: v })} /></Field>
              </div>
              <Field label={t('build.edEquipment')}><Text value={f('equipment')} onChange={(v) => upd({ equipment: v })} /></Field>
              <Field label={t('build.edLore')}>
                <textarea value={f('lore')} onChange={(e) => upd({ lore: e.target.value })} rows={3} className={inputCls} />
              </Field>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border border-ink-brown/30 px-3 py-1.5 text-sm text-ink-brown/80 hover:bg-black/5">
            {t('common.cancel')}
          </button>
          <button onClick={save} className="rounded border-2 border-gold/60 bg-gold/20 px-4 py-1.5 font-serif text-sm font-bold text-accent hover:bg-gold/30">
            {t('common.save')}
          </button>
        </div>
      </div>
    </Modal>
  )
}
