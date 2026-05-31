import { useCallback, useEffect, useMemo, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GiCrossedSwords } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import SearchPanel from '../components/SearchPanel'
import MonsterGrid from '../components/MonsterGrid'
import StatBlock from '../components/StatBlock'
import Modal from '../components/Modal'
import { applyFilters, collectOptions, DEFAULT_FILTERS, type Filters } from '../utils/filters'
import { RU_BESTIARY } from '../data/bestiary-ru'
import { useNav } from '../store/nav'
import { useInitiative } from '../store/initiative'
import { useUi } from '../store/ui'
import { useSettings } from '../store/settings'
import { rollD20 } from '../utils/roll'
import type { StatBlock as SB } from '@shared/types'

export default function Bestiary(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [selected, setSelected] = useState<SB | null>(null)
  const [saved, setSaved] = useState(false)
  const [picked, setPicked] = useState<Record<string, SB>>({})
  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)
  const addCombatant = useInitiative((s) => s.addCombatant)
  const setNotebookTab = useUi((s) => s.setNotebookTab)
  const showRoles = useSettings((s) => s.roleBadges)

  // When the user turns role badges off, also drop any active role-based
  // filter so hidden chips don't silently keep filtering the grid.
  useEffect(() => {
    if (!showRoles && (filters.roles.length || filters.bossOnly)) {
      setFilters((f) => ({ ...f, roles: [], bossOnly: false }))
    }
  }, [showRoles, filters.roles.length, filters.bossOnly])

  // User edits to built-in creatures are stored in the DB under the same key;
  // overlay them so an overwritten built-in shows its edited form here.
  const [overrides, setOverrides] = useState<Record<string, SB>>({})
  useEffect(() => {
    window.api.db.listMonsters().then((list) => {
      const map: Record<string, SB> = {}
      for (const mon of list) map[mon.key] = mon
      setOverrides(map)
    })
  }, [])
  const ruBestiary = useMemo(() => RU_BESTIARY.map((mon) => overrides[mon.key] ?? mon), [overrides])

  const pickedKeys = useMemo(() => new Set(Object.keys(picked)), [picked])
  const pickedCount = Object.keys(picked).length

  const togglePick = useCallback((m: SB): void => {
    setPicked((p) => {
      const next = { ...p }
      if (next[m.key]) delete next[m.key]
      else next[m.key] = m
      return next
    })
  }, [])

  const addPickedToCombat = (): void => {
    const list = Object.values(picked)
    if (!list.length) return
    for (const m of list) {
      const dexMod = Math.floor((m.abilities.dex - 10) / 2)
      const initiative = rollD20(dexMod).total
      addCombatant({ name: m.name, initiative, hp: m.hitPoints, maxHp: m.hitPoints, ac: m.armorClass, notes: '', type: 'enemy' })
    }
    setPicked({})
    setNotebookTab('initiative')
  }

  useEffect(() => {
    if (pending?.section !== 'bestiary') return
    const found = ruBestiary.find((m) => m.key === pending.key)
    if (found) setSelected(found)
    clearPending()
  }, [pending, clearPending, ruBestiary])

  const options = useMemo(() => collectOptions(ruBestiary), [ruBestiary])
  const filtered = useMemo(() => applyFilters(ruBestiary, filters), [ruBestiary, filters])

  const saveToMine = async (m: SB): Promise<void> => {
    await window.api.db.saveMonster({ ...m, key: `custom-${m.key}-${Date.now()}` })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <PageFrame title={t('bestiary.title')} subtitle={`${ruBestiary.length} существ · оффлайн`}>
      <SearchPanel filters={filters} onChange={setFilters} habitatOptions={options.habitats} alignmentOptions={options.alignments} />

      <div className="mt-2 flex items-center gap-3 text-xs text-ink-brown/60">
        <span>{filtered.length}</span>
        {pickedCount === 0 && <span className="italic">ПКМ по существу — выбрать несколько для боя</span>}
      </div>

      {pickedCount > 0 && (
        <div className="mt-1 flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm">
          <span className="font-semibold text-accent">Выбрано существ: {pickedCount}</span>
          <button
            onClick={addPickedToCombat}
            className="inline-flex items-center gap-1.5 rounded border border-accent bg-accent px-3 py-1 text-xs font-bold text-parchment hover:bg-accent/80"
          >
            <GiCrossedSwords /> Всех в инициативу
          </button>
          <button
            onClick={() => setPicked({})}
            className="rounded border border-ink-brown/30 px-3 py-1 text-xs text-ink-brown/80 hover:bg-black/5"
          >
            Снять выделение
          </button>
        </div>
      )}

      <div className="mt-1 min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-sm text-ink-brown/50">{t('common.empty')}</div>
        ) : (
          <MonsterGrid monsters={filtered} selectedKey={selected?.key} onSelect={setSelected} pickedKeys={pickedKeys} onPick={togglePick} />
        )}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <StatBlock
            monster={selected}
            header={
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => navigate('/editor', { state: { monster: selected } })}
                  className="rounded border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20"
                >
                  {t('bestiary.editMonster')}
                </button>
                <button onClick={() => saveToMine(selected)} className="rounded border border-ink-brown/30 px-3 py-1 text-xs text-ink-brown/80 hover:bg-black/5">
                  {saved ? '✓' : t('bestiary.saveToMy')}
                </button>
              </div>
            }
          />
        </Modal>
      )}
    </PageFrame>
  )
}
