import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { GiPerspectiveDiceSixFacesRandom, GiVillage, GiPathDistance, GiDungeonGate } from 'react-icons/gi'
import type { IconType } from 'react-icons'
import PageFrame from '../components/PageFrame'
import { pick, randInt } from '../utils/toolkitRoll'
import { uid } from '../utils/monster'
import {
  SETTLEMENT_RULES, REGION_SPECS, ROUTE_NAMES, DUNGEON_NAMES, REGION_PROBLEMS, NAME_PREFIX, NAME_SUFFIX,
  type StartAt, type RegionItemKind
} from '../data/toolkit/settlements'
import { settlementTierLabel } from '../data/toolkit/labels'
import type { SettlementTierId } from '../data/toolkit/types'

const STARTS: StartAt[] = ['village', 'town', 'city']

interface RegionItem { id: string; kind: RegionItemKind; name: string; problem: string }

const KIND_ICON: Partial<Record<RegionItemKind, IconType>> = { route: GiPathDistance, dungeon: GiDungeonGate }

function genItem(kind: RegionItemKind): RegionItem {
  let name: string
  if (kind === 'route') name = pick(ROUTE_NAMES) ?? 'Тракт'
  else if (kind === 'dungeon') name = pick(DUNGEON_NAMES) ?? 'Подземелье'
  else name = (pick(NAME_PREFIX) ?? '') + (pick(NAME_SUFFIX) ?? '')
  return { id: uid('reg'), kind, name, problem: pick(REGION_PROBLEMS) ?? '' }
}

export default function Region(): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [view, setView] = useState<'gen' | 'ref'>('gen')
  const [start, setStart] = useState<StartAt>('town')
  const [items, setItems] = useState<RegionItem[] | null>(null)

  const generate = (): void => {
    const out: RegionItem[] = []
    for (const spec of REGION_SPECS[start]) {
      const n = randInt(spec.count[0], spec.count[1])
      for (let i = 0; i < n; i++) out.push(genItem(spec.kind))
    }
    setItems(out)
  }

  const kindLabel = (k: RegionItemKind): string =>
    k === 'route' ? t('lore.region.route') : k === 'dungeon' ? t('lore.region.dungeon') : settlementTierLabel(k as SettlementTierId, lang)

  const tab = (id: 'gen' | 'ref', label: string): JSX.Element => (
    <button onClick={() => setView(id)} className={`rounded-full px-3 py-1 text-xs font-semibold ${view === id ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/70 hover:border-accent/60'}`}>{label}</button>
  )

  return (
    <PageFrame
      title={t('nav.region')}
      subtitle={t('lore.region.subtitle')}
      actions={<div className="flex items-center gap-1">{tab('gen', t('lore.region.tabGen'))}{tab('ref', t('lore.region.tabRef'))}</div>}
    >
      {view === 'gen' ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-ink-brown/20 bg-parchment-dark/30 p-2.5 shadow-inner">
            <span className="text-sm text-ink-brown/70">{t('lore.region.startAt')}:</span>
            {STARTS.map((s) => (
              <button key={s} onClick={() => setStart(s)} className={`rounded-full px-3 py-1 text-xs font-semibold ${start === s ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>{settlementTierLabel(s, lang)}</button>
            ))}
            <button onClick={generate} className="ml-1 inline-flex items-center gap-1 rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80"><GiPerspectiveDiceSixFacesRandom /> {t('lore.region.generate')}</button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {!items && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-ink-brown/55">
                <GiVillage className="text-6xl text-accent/25" />
                <p className="max-w-md">{t('lore.region.empty')}</p>
              </div>
            )}
            {items && (
              <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))' }}>
                {items.map((it) => {
                  const Icon = KIND_ICON[it.kind] ?? GiVillage
                  return (
                    <div key={it.id} className="flex flex-col gap-1 rounded-lg border border-ink-brown/20 bg-parchment-dark/40 p-3">
                      <div className="flex items-center gap-2">
                        <Icon className="text-xl text-accent/70" />
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-brown/55">{kindLabel(it.kind)}</span>
                      </div>
                      <div className="font-serif text-[16px] font-bold text-accent">{it.name}</div>
                      <p className="text-[13px] leading-snug text-ink-brown/80"><span className="font-semibold text-accent/80">{t('lore.region.hook')}:</span> {it.problem}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-accent/10 text-left text-[11px] uppercase tracking-wide text-accent/80">
                <th className="border border-ink-brown/25 px-3 py-1.5">{t('lore.region.colTier')}</th>
                <th className="border border-ink-brown/25 px-3 py-1.5">{t('lore.region.colPerKingdom')}</th>
                <th className="border border-ink-brown/25 px-3 py-1.5">{t('lore.region.colPopulation')}</th>
                <th className="border border-ink-brown/25 px-3 py-1.5">{t('lore.region.colTraits')}</th>
              </tr>
            </thead>
            <tbody>
              {SETTLEMENT_RULES.tiers.map((tr) => (
                <tr key={tr.tier} className="align-top">
                  <td className="border border-ink-brown/25 px-3 py-1.5 font-serif font-semibold text-accent">{settlementTierLabel(tr.tier, lang)}</td>
                  <td className="whitespace-nowrap border border-ink-brown/25 px-3 py-1.5 text-ink-brown">{tr.perKingdom[0]}–{tr.perKingdom[1]}</td>
                  <td className="whitespace-nowrap border border-ink-brown/25 px-3 py-1.5 text-ink-brown">{tr.population[0].toLocaleString('ru')}–{tr.population[1].toLocaleString('ru')}</td>
                  <td className="border border-ink-brown/25 px-3 py-1.5 text-ink-brown/85">{tr.traits.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs italic text-ink-brown/55">{t('lore.region.refNote')}</p>
        </div>
      )}
    </PageFrame>
  )
}
