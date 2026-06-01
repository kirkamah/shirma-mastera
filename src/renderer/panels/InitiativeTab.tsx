import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiBrain, GiDiceTwentyFacesTwenty, GiFastForwardButton } from 'react-icons/gi'
import { useInitiative, type CombatantType } from '../store/initiative'
import { useDiceRoller } from '../hooks/useDiceRoller'
import { confirmDialog } from '../store/dialog'
import { CONDITION_NAMES } from '../data/conditions-fallback'

const TYPE_COLORS: Record<CombatantType, string> = {
  player: 'border-l-emerald-500',
  enemy: 'border-l-accent',
  npc: 'border-l-amber-400'
}

function EffectAdder({ onAdd }: { onAdd: (name: string, rounds: number) => void }): JSX.Element {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [rounds, setRounds] = useState(3)
  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="rounded bg-black/40 px-1.5 text-xs text-parchment/70 hover:bg-black/60">
        + эффект
      </button>
    )
  const submit = (): void => {
    if (name.trim()) onAdd(name.trim(), Math.max(1, rounds))
    setName('')
    setRounds(3)
    setOpen(false)
  }
  return (
    <span className="flex items-center gap-0.5">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="эффект"
        className="w-20 rounded bg-black/40 px-1 text-xs text-parchment"
      />
      <input
        type="number"
        min={1}
        value={rounds}
        onChange={(e) => setRounds(+e.target.value)}
        className="w-9 rounded bg-black/40 px-1 text-center text-xs text-parchment"
        title="раундов"
      />
      <button onClick={submit} className="rounded bg-amber-600/70 px-1.5 text-xs text-white">
        ✓
      </button>
    </span>
  )
}

export default function InitiativeTab(): JSX.Element {
  const { t } = useTranslation()
  const { rollBonus } = useDiceRoller()
  const {
    combatants,
    round,
    turnIndex,
    active,
    startCombat,
    endCombat,
    addCombatant,
    removeCombatant,
    updateCombatant,
    move,
    nextTurn,
    addEffect,
    removeEffect
  } = useInitiative()

  const [form, setForm] = useState({ name: '', initiative: 10, hp: 10, ac: 10, notes: '', type: 'enemy' as CombatantType })

  const submit = (): void => {
    if (!form.name.trim()) return
    addCombatant({ ...form, maxHp: form.hp })
    setForm({ name: '', initiative: 10, hp: 10, ac: 10, notes: '', type: form.type })
  }

  return (
    <div className="space-y-3 p-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="rounded bg-accent/30 px-2 py-0.5 font-semibold text-parchment">
          {t('notebook.round')} {round}
        </span>
        <div className="flex gap-1">
          <button onClick={startCombat} className="rounded border border-emerald-500/50 px-2 py-1 text-xs hover:bg-emerald-500/20">
            {t('notebook.startCombat')}
          </button>
          <button
            onClick={async () => {
              if (active && (await confirmDialog({ message: t('notebook.endCombatConfirm'), danger: true }))) endCombat()
            }}
            className="rounded border border-accent/50 px-2 py-1 text-xs hover:bg-accent/20"
          >
            {t('notebook.endCombat')}
          </button>
        </div>
      </div>

      <button
        onClick={nextTurn}
        disabled={combatants.length === 0}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded bg-accent py-1.5 font-semibold text-white disabled:opacity-40"
      >
        <GiFastForwardButton /> {t('notebook.nextTurn')}
      </button>

      {/* Combatant list */}
      <ul className="space-y-2">
        {combatants.map((c, i) => (
          <li
            key={c.id}
            className={`rounded border-l-4 bg-ink/60 p-2 ${TYPE_COLORS[c.type]} ${
              active && i === turnIndex ? 'ring-2 ring-amber-300' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="flex items-center gap-1 font-semibold text-parchment">
                <span className="rounded bg-black/40 px-1.5 text-xs">{c.initiative}</span>
                {c.name}
                {c.concentration && <GiBrain title={t('notebook.concentration')} className="text-amber-400" />}
              </span>
              <span className="flex items-center gap-1">
                <button onClick={() => move(c.id, -1)} className="px-1 text-parchment/50 hover:text-parchment">▲</button>
                <button onClick={() => move(c.id, 1)} className="px-1 text-parchment/50 hover:text-parchment">▼</button>
                <button onClick={() => removeCombatant(c.id)} className="px-1 text-accent hover:text-red-400">✕</button>
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="text-parchment/60">{t('notebook.ac')} {c.ac}</span>
              <span className="flex items-center gap-1">
                <button onClick={() => updateCombatant(c.id, { hp: c.hp - 1 })} className="rounded bg-black/40 px-1.5">−</button>
                <input
                  type="number"
                  value={c.hp}
                  onChange={(e) => updateCombatant(c.id, { hp: +e.target.value })}
                  className="w-12 rounded bg-black/40 px-1 text-center text-parchment"
                />
                <span className="text-parchment/40">/ {c.maxHp}</span>
                <button onClick={() => updateCombatant(c.id, { hp: c.hp + 1 })} className="rounded bg-black/40 px-1.5">+</button>
              </span>
              <button
                onClick={() => updateCombatant(c.id, { concentration: !c.concentration })}
                className={`rounded px-1.5 ${c.concentration ? 'bg-amber-500/40' : 'bg-black/30'}`}
                title={t('notebook.concentration')}
              >
                <GiBrain />
              </button>
            </div>

            {/* Conditions */}
            <div className="mt-1 flex flex-wrap items-center gap-1">
              {c.conditions.map((cond) => (
                <span key={cond} className="flex items-center gap-0.5 rounded-full bg-accent/30 px-1.5 text-xs text-parchment">
                  {cond}
                  <button
                    onClick={() => updateCombatant(c.id, { conditions: c.conditions.filter((x) => x !== cond) })}
                    className="text-parchment/60 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value && !c.conditions.includes(e.target.value))
                    updateCombatant(c.id, { conditions: [...c.conditions, e.target.value] })
                }}
                className="rounded bg-black/40 px-1 text-xs text-parchment/70"
              >
                <option value="">+ {t('notebook.conditions')}</option>
                {CONDITION_NAMES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Temporary effects with round countdown */}
            <div className="mt-1 flex flex-wrap items-center gap-1">
              {c.effects.map((eff) => (
                <span key={eff.id} className="flex items-center gap-0.5 rounded-full bg-amber-500/25 px-1.5 text-xs text-amber-200">
                  {eff.name} <span className="font-bold">{eff.rounds}р</span>
                  <button onClick={() => removeEffect(c.id, eff.id)} className="text-amber-200/70 hover:text-white">
                    ×
                  </button>
                </span>
              ))}
              <EffectAdder onAdd={(name, rounds) => addEffect(c.id, name, rounds)} />
            </div>
          </li>
        ))}
      </ul>

      {/* Add combatant form */}
      <div className="space-y-2 rounded border border-white/10 bg-ink/40 p-2">
        <div className="font-semibold text-parchment/80">{t('notebook.addCombatant')}</div>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t('common.name')}
          className="w-full rounded bg-black/40 px-2 py-1 text-parchment"
        />
        <div className="grid grid-cols-3 gap-1">
          <label className="flex flex-col text-xs text-parchment/50">
            {t('notebook.initiativeShort')}
            <div className="flex">
              <input
                type="number"
                value={form.initiative}
                onChange={(e) => setForm({ ...form, initiative: +e.target.value })}
                className="w-full rounded-l bg-black/40 px-1 py-0.5 text-parchment"
              />
              <button
                onClick={() => setForm({ ...form, initiative: rollBonus(0, t('notebook.initiative')).total })}
                className="rounded-r bg-accent/60 px-1 text-xs"
                title="1к20"
              >
                <GiDiceTwentyFacesTwenty />
              </button>
            </div>
          </label>
          <label className="flex flex-col text-xs text-parchment/50">
            {t('notebook.hp')}
            <input
              type="number"
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: +e.target.value })}
              className="rounded bg-black/40 px-1 py-0.5 text-parchment"
            />
          </label>
          <label className="flex flex-col text-xs text-parchment/50">
            {t('notebook.ac')}
            <input
              type="number"
              value={form.ac}
              onChange={(e) => setForm({ ...form, ac: +e.target.value })}
              className="rounded bg-black/40 px-1 py-0.5 text-parchment"
            />
          </label>
        </div>
        <input
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder={t('notebook.notesField')}
          className="w-full rounded bg-black/40 px-2 py-1 text-xs text-parchment"
        />
        <div className="flex gap-1">
          {(['player', 'enemy', 'npc'] as CombatantType[]).map((tp) => (
            <button
              key={tp}
              onClick={() => setForm({ ...form, type: tp })}
              className={`flex-1 rounded px-1 py-1 text-xs ${
                form.type === tp ? 'bg-accent text-white' : 'bg-black/30 text-parchment/60'
              }`}
            >
              {t('notebook.type' + tp.charAt(0).toUpperCase() + tp.slice(1))}
            </button>
          ))}
        </div>
        <button onClick={submit} className="w-full rounded bg-accent/80 py-1 font-semibold text-white hover:bg-accent">
          + {t('common.add')}
        </button>
      </div>
    </div>
  )
}
