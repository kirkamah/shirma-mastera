import { useEffect, useMemo, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GiTrashCan } from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import SearchPanel from '../components/SearchPanel'
import MonsterFolders from '../components/MonsterFolders'
import StatBlock from '../components/StatBlock'
import Modal from '../components/Modal'
import { applyFilters, collectOptions, DEFAULT_FILTERS, type Filters } from '../utils/filters'
import { emptyStatBlock } from '../utils/monster'
import { confirmDialog } from '../store/dialog'
import { IS_TRIAL, TRIAL_LIMIT, showTrialLimitDialog } from '../trial'
import type { StatBlock as SB } from '@shared/types'

export default function MyMonsters(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [monsters, setMonsters] = useState<SB[]>([])
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [selected, setSelected] = useState<SB | null>(null)

  const load = (): void => {
    window.api.db.listMonsters().then((list) => {
      setMonsters(list)
      setSelected((prev) => (prev ? list.find((m) => m.key === prev.key) ?? null : null))
    })
  }
  useEffect(load, [])

  const options = useMemo(() => collectOptions(monsters), [monsters])
  const filtered = useMemo(() => applyFilters(monsters, filters), [monsters, filters])

  const remove = async (m: SB): Promise<void> => {
    if (!(await confirmDialog({ title: t('common.delete'), message: t('myMonsters.deleteConfirm', { name: m.name }), danger: true, confirmText: t('common.delete') }))) return
    await window.api.db.deleteMonster(m.key)
    setSelected(null)
    load()
  }

  const btn = 'rounded px-3 py-1.5 text-sm font-semibold'

  return (
    <PageFrame
      title={t('myMonsters.title')}
      actions={
        <>
          <button
            onClick={() => {
              if (IS_TRIAL && monsters.length >= TRIAL_LIMIT) {
                void showTrialLimitDialog()
                return
              }
              navigate('/editor', { state: { monster: emptyStatBlock() } })
            }}
            className={`${btn} bg-accent text-parchment hover:bg-accent/80`}
          >
            + {t('myMonsters.create')}
          </button>
        </>
      }
    >
      <SearchPanel filters={filters} onChange={setFilters} habitatOptions={options.habitats} alignmentOptions={options.alignments} />

      <div className="mt-2 text-xs text-ink-brown/60">{filtered.length}</div>
      <div className="mt-1 min-h-0 flex-1 overflow-y-auto">
        {monsters.length === 0 ? (
          <div className="p-6 text-center text-sm text-ink-brown/50">{t('myMonsters.empty')}</div>
        ) : (
          <MonsterFolders monsters={filtered} selectedKey={selected?.key} onSelect={setSelected} sort={filters.sort} />
        )}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <StatBlock
            monster={selected}
            header={
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => navigate(`/editor/${encodeURIComponent(selected.key)}`)}
                  className="rounded border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20"
                >
                  ✎ {t('common.edit')}
                </button>
                <button onClick={() => remove(selected)} className="inline-flex items-center gap-1.5 rounded border border-ink-brown/30 px-3 py-1 text-xs text-accent hover:bg-accent/10">
                  <GiTrashCan /> {t('common.delete')}
                </button>
              </div>
            }
          />
        </Modal>
      )}
    </PageFrame>
  )
}
