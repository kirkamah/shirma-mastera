import { useMemo, useState, type JSX } from 'react'
import { uid } from '../../utils/monster'
import { EQUIPMENT, MASTERY_RU } from '../../data/equipment-ru'
import { CLASS_START_EQUIPMENT, costToGp } from '../../data/class-equipment'
import { masteryCount, type CharacterSheet, type InvItem } from '../../data/character-sheet'

// Everything carriable (not food/lodging/services) is buyable.
const SHOP = EQUIPMENT.filter((e) => e.category !== 'food' && e.category !== 'life')

export default function InventoryStep({
  sheet,
  onChange,
  classId,
  bgEquipment
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  classId?: string
  bgEquipment?: string
}): JSX.Element {
  const [q, setQ] = useState('')
  const start = classId ? CLASS_START_EQUIPMENT[classId] : undefined
  const coins = sheet.coins ?? {}
  const gp = coins.gp ?? 0
  const items = sheet.items ?? []
  const round2 = (n: number): number => Math.round(n * 100) / 100

  const addPlainItem = (name: string): void => {
    const idx = items.findIndex((i) => i.name === name && !i.weapon)
    const next = idx >= 0 ? items.map((i, j) => (j === idx ? { ...i, qty: i.qty + 1 } : i)) : [...items, { id: uid('it'), name, qty: 1 }]
    onChange({ items: next })
  }

  const takeItems = (): void => {
    onChange({ equipChoice: 'items' })
    if (start) addPlainItem(start.items)
  }
  const takeGold = (): void => {
    if (!start) return
    onChange({ equipChoice: 'gold', coins: { ...coins, gp: (coins.gp ?? 0) + start.gold } })
  }

  const buy = (e: (typeof SHOP)[number]): void => {
    const price = costToGp(e.cost)
    if (price > gp + 1e-9) return
    const isWeapon = e.category === 'weapon-simple' || e.category === 'weapon-martial'
    const isArmor = e.category === 'armor'
    let armorBase: number | undefined
    if (isArmor) {
      const m = e.props.match(/(?:КД|\+)\s*(\d+)/)
      armorBase = m ? +m[1] : e.tier === 'shield' ? 2 : 10
    }
    const idx = items.findIndex((i) => i.name === e.name)
    let next: InvItem[]
    if (idx >= 0) next = items.map((i, j) => (j === idx ? { ...i, qty: i.qty + 1 } : i))
    else
      next = [
        ...items,
        { id: uid('it'), name: e.name, qty: 1, cost: e.cost, weapon: isWeapon || undefined, rawProps: isWeapon ? e.props : undefined, ranged: isWeapon ? !!e.ranged : undefined, masteryKey: isWeapon ? e.mastery : undefined, armorTier: isArmor ? e.tier : undefined, armorBase: isArmor ? armorBase : undefined }
      ]
    onChange({ items: next, coins: { ...coins, gp: round2(gp - price) } })
  }

  const removeOne = (item: InvItem): void => {
    const refund = item.cost ? costToGp(item.cost) : 0
    const next = item.qty > 1 ? items.map((i) => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i)) : items.filter((i) => i.id !== item.id)
    onChange({ items: next, coins: { ...coins, gp: round2(gp + refund) } })
  }

  // weapon mastery
  const mCount = masteryCount(classId, sheet.level)
  const masteryWeapons = items.filter((i) => i.weapon && i.masteryKey)
  const masteryOnCount = masteryWeapons.filter((i) => i.masteryOn).length
  const toggleMastery = (item: InvItem): void => {
    if (!item.masteryOn && masteryOnCount >= mCount) return
    onChange({ items: items.map((i) => (i.id === item.id ? { ...i, masteryOn: !i.masteryOn } : i)) })
  }

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return SHOP.filter((e) => !s || e.name.toLowerCase().includes(s))
  }, [q])

  return (
    <div className="space-y-2 text-sm">
      {bgEquipment && (
        <div className="rounded border border-ink-brown/20 bg-parchment/40 p-2">
          <div className="text-xs font-semibold text-accent">Снаряжение предыстории</div>
          <p className="text-[12px] text-ink-brown/80">{bgEquipment}</p>
          <button onClick={() => addPlainItem(bgEquipment)} className="mt-1 text-[11px] text-accent hover:underline">+ добавить в инвентарь</button>
        </div>
      )}

      {start ? (
        <div className="rounded border border-ink-brown/20 bg-parchment/40 p-2">
          <div className="mb-1 text-xs font-semibold text-accent">Снаряжение класса — выберите одно:</div>
          <div className="flex flex-wrap gap-1">
            <button onClick={takeItems} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sheet.equipChoice === 'items' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>Взять вещи</button>
            <button onClick={takeGold} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sheet.equipChoice === 'gold' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>Взять золото ({start.gold} зм)</button>
          </div>
          {sheet.equipChoice === 'items' && <p className="mt-1 text-[12px] text-ink-brown/80">{start.items}</p>}
          {sheet.equipChoice === 'gold' && (
            <div className="mt-2">
              <p className="text-[12px] text-ink-brown/80">Кошелёк: <b className="text-accent">{gp} зм</b>. Купленное оружие сразу появляется в атаках листа.</p>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск снаряжения…" className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm focus:border-accent focus:outline-none" />
              <div className="mt-1 max-h-64 overflow-y-auto rounded border border-ink-brown/15">
                {list.map((e) => {
                  const price = costToGp(e.cost)
                  const afford = price <= gp + 1e-9
                  return (
                    <button key={e.id} onClick={() => buy(e)} disabled={!afford} className={`flex w-full items-center justify-between gap-2 border-b border-ink-brown/10 px-2 py-1 text-left text-[13px] ${afford ? 'hover:bg-accent/10' : 'opacity-40'}`}>
                      <span className="font-semibold text-ink-brown">{e.name}</span>
                      <span className="text-[11px] text-accent">{e.cost}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs italic text-ink-brown/50">Выберите класс, чтобы получить стартовое снаряжение или золото.</p>
      )}

      {/* Inventory — remove-only (no free editing); removing refunds the cost. */}
      <div>
        <div className="text-xs font-semibold text-ink-brown/70">Инвентарь {gp ? <span className="font-normal text-ink-brown/50">· кошелёк {gp} зм</span> : null}</div>
        {items.length === 0 ? (
          <p className="text-[12px] italic text-ink-brown/50">Пусто — добавьте вещи предыстории/класса или купите снаряжение.</p>
        ) : (
          <ul className="mt-1 divide-y divide-ink-brown/10 rounded border border-ink-brown/15">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-2 px-2 py-1 text-[13px]">
                {i.qty > 1 && <span className="rounded bg-ink-brown/10 px-1 text-[11px] font-semibold text-ink-brown/70">[{i.qty}]</span>}
                <span className="min-w-0 flex-1 truncate text-ink-brown" title={i.name}>{i.name}{i.weapon && <span className="ml-1 text-[10px] text-accent">⚔</span>}</span>
                {i.cost && <span className="text-[10px] text-ink-brown/40">{i.cost}</span>}
                <button onClick={() => removeOne(i)} title="Удалить предмет (вернуть деньги)" className="rounded border border-ink-brown/30 px-1.5 text-xs text-ink-brown/60 hover:border-red-600/60 hover:text-red-700">✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Weapon mastery (PH24) */}
      {mCount > 0 && (
        <div className="rounded border border-accent/30 bg-accent/5 p-2">
          <div className="text-xs font-semibold text-accent">Мастерство оружия — выбрано {masteryOnCount}/{mCount}</div>
          {masteryWeapons.length === 0 ? (
            <p className="text-[12px] italic text-ink-brown/60">Купите/добавьте оружие, чтобы назначить ему свойство мастерства.</p>
          ) : (
            <ul className="mt-1 space-y-1">
              {masteryWeapons.map((w) => {
                const m = MASTERY_RU[w.masteryKey!]
                const disabled = !w.masteryOn && masteryOnCount >= mCount
                return (
                  <li key={w.id} className="text-[12px]">
                    <label className={`flex items-center gap-1.5 ${disabled ? 'opacity-40' : ''}`}>
                      <input type="checkbox" checked={!!w.masteryOn} disabled={disabled} onChange={() => toggleMastery(w)} className="accent-accent" />
                      <b className="text-ink-brown">{w.name}</b>
                      <span className="text-accent">— {m.name}</span>
                    </label>
                    {w.masteryOn && <p className="ml-5 text-[11px] leading-snug text-ink-brown/70">{m.desc}</p>}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
