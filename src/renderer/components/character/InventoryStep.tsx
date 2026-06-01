import { useMemo, useState, type JSX } from 'react'
import { GiCrossedSwords, GiOpenFolder, GiFullFolder } from 'react-icons/gi'
import { uid } from '../../utils/monster'
import { EQUIPMENT, MASTERY_RU, type EquipItem } from '../../data/equipment-ru'
import { CLASS_START_EQUIPMENT, costToCp } from '../../data/class-equipment'
import { parseGrantItems } from '../../utils/parseGrant'
import { CLASS_BUILDS } from '../../data/character-build'
import { CLASS_PROGRESSION } from '../../data/class-progression'
import { masteryCount, type CharacterSheet, type InvItem } from '../../data/character-sheet'

// Everything carriable (not food/lodging/services) is buyable.
const SHOP = EQUIPMENT.filter((e) => e.category !== 'food' && e.category !== 'life')

/** Parse a class's armor/weapon proficiency strings into structured flags so the
 *  shop can warn when the class can't actually use a category. Errs toward NOT
 *  warning (treats any «воинское» mention as martial-capable) to avoid noise. */
function classProficiency(classId?: string): {
  light: boolean; medium: boolean; heavy: boolean; shield: boolean; simple: boolean; martial: boolean; known: boolean
} {
  const c = classId ? CLASS_BUILDS.find((b) => b.id === classId) : undefined
  const a = (c?.armor ?? '').toLowerCase()
  const w = (c?.weapons ?? '').toLowerCase()
  const noArmor = /без доспех/.test(a)
  const allArmor = /все доспех|любые доспех/.test(a)
  const heavy = !noArmor && (allArmor || /тяж/.test(a))
  const medium = !noArmor && (allArmor || /сред/.test(a) || heavy)
  const light = !noArmor && (allArmor || /лёгк|легк/.test(a) || medium)
  const shield = /щит/.test(a)
  const allW = /все\b|любое оруж|всё оруж/.test(w)
  const martial = allW || /воинск|военн/.test(w)
  const simple = allW || /прост/.test(w) || martial
  return { light, medium, heavy, shield, simple, martial, known: !!c }
}

interface Folder {
  id: string
  label: string
  test: (e: EquipItem) => boolean
  allowed: boolean
  deny?: string
}

/** Official PH'24 wording for the «no armour proficiency» warning. */
const ARMOR_DENY =
  'Владение доспехами. Кто угодно может напялить доспех или пристегнуть щит к руке. Но только тот, кто знает, как носить доспех, может носить его эффективно. Ваш класс даёт владение некоторыми видами доспехов. Если вы носите доспех, которым не владеете, вы совершаете с помехой все проверки характеристик, спасброски и броски атаки, использующие Силу или Ловкость, и вы не можете накладывать заклинания.'

/** Pull a trailing gold amount ("…, 15 зм" / "…мантия и 8 зм") off an item
 *  bundle, returning the cleaned item text and the bundled gold separately. */
function splitTrailingGold(text: string): { items: string; gold: number } {
  let items = text.trim().replace(/[.,]\s*$/, '')
  let gold = 0
  const m = items.match(/[,и]\s*(\d+)\s*зм\.?$/i)
  if (m) {
    gold = +m[1]
    items = items.slice(0, m.index).trim().replace(/[.,]\s*$/, '')
  }
  return { items, gold }
}

/** Background equipment is stored as one string: "<вещи> и N зм — ИЛИ M зм.".
 *  Split it into the item bundle, the gold bundled WITH the items, and the
 *  alternative flat gold — so the UI can offer the same items/gold toggle the
 *  class equipment has. */
function parseBgEquipment(text?: string): { items: string; gold: number; altGold: number } | null {
  if (!text) return null
  const altMatch = text.match(/ИЛИ\s*(\d+)\s*зм/i)
  const altGold = altMatch ? +altMatch[1] : 50
  const { items, gold } = splitTrailingGold(text.split(/—\s*ИЛИ|ИЛИ/i)[0])
  return { items, gold, altGold }
}

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
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const [shopOpen, setShopOpen] = useState(false)
  const start = classId ? CLASS_START_EQUIPMENT[classId] : undefined
  // The class kit text bundles a little gold (e.g. "…, 15 зм"); split it out so
  // taking the items also drops that gold into the wallet.
  const startGear = start ? splitTrailingGold(start.items) : null
  const coins = sheet.coins ?? {}
  const gp = coins.gp ?? 0
  const sp = coins.sp ?? 0
  const cp = coins.cp ?? 0
  const items = sheet.items ?? []

  // Money is tracked per denomination — gold / silver / copper are kept as whole
  // coins and never collapsed into a fractional gold balance. Spend/refund work
  // on a copper pool (1 зм = 10 см = 100 мм); ep/pp are left untouched.
  const poolCp = gp * 100 + sp * 10 + cp
  const fromCp = (total: number): { cp: number; sp: number; gp: number } => ({
    gp: Math.floor(total / 100),
    sp: Math.floor((total % 100) / 10),
    cp: total % 10
  })
  const coinStr = `${gp} зм${sp ? ` ${sp} см` : ''}${cp ? ` ${cp} мм` : ''}`

  const prof = useMemo(() => classProficiency(classId), [classId])

  // Spellcasting focus reminder: caster classes need a focus or component pouch.
  const isCaster = !!(classId && CLASS_PROGRESSION[classId]?.caster)
  const hasFocus = items.some((i) => /фокусировк|священный символ|святой символ|друидическ|мешоч.{0,15}компонент|компонент/i.test(i.name))

  // Class starting gear is EITHER the item bundle OR the gold — never both.
  // Switching choices reverses the previous grant. Granted weapons/armour are
  // parsed into individual, tagged inventory lines (→ attacks / AC), and the
  // gold bundled with the kit drops into the wallet.
  const takeItems = (): void => {
    if (!start || !startGear || sheet.equipChoice === 'items') return
    const base = sheet.equipChoice === 'gold' ? Math.max(0, gp - start.gold) : gp
    const kept = items.filter((i) => i.grant !== 'class')
    const next = [...kept, ...parseGrantItems(startGear.items, 'class')]
    onChange({ equipChoice: 'items', items: next, coins: { ...coins, gp: base + startGear.gold } })
  }
  const takeGold = (): void => {
    if (!start || sheet.equipChoice === 'gold') return
    const base = sheet.equipChoice === 'items' ? Math.max(0, gp - (startGear?.gold ?? 0)) : gp
    const kept = items.filter((i) => i.grant !== 'class')
    onChange({ equipChoice: 'gold', items: kept, coins: { ...coins, gp: base + start.gold } })
  }

  // Background starting gear — same items/gold toggle as the class.
  const bg = parseBgEquipment(bgEquipment)
  const takeBgItems = (): void => {
    if (!bg || sheet.bgEquipChoice === 'items') return
    const base = sheet.bgEquipChoice === 'gold' ? Math.max(0, gp - bg.altGold) : gp
    const kept = items.filter((i) => i.grant !== 'bg')
    const next = bg.items ? [...kept, ...parseGrantItems(bg.items, 'bg')] : kept
    onChange({ bgEquipChoice: 'items', items: next, coins: { ...coins, gp: base + bg.gold } })
  }
  const takeBgGold = (): void => {
    if (!bg || sheet.bgEquipChoice === 'gold') return
    const base = sheet.bgEquipChoice === 'items' ? Math.max(0, gp - bg.gold) : gp
    const kept = items.filter((i) => i.grant !== 'bg')
    onChange({ bgEquipChoice: 'gold', items: kept, coins: { ...coins, gp: base + bg.altGold } })
  }

  const buy = (e: EquipItem): void => {
    const priceCp = costToCp(e.cost)
    if (priceCp > poolCp) return
    const isWeapon = e.category === 'weapon-simple' || e.category === 'weapon-martial'
    const isArmor = e.category === 'armor'
    let armorBase: number | undefined
    if (isArmor) {
      const m = e.props.match(/(?:КД|\+)\s*(\d+)/)
      armorBase = m ? +m[1] : e.tier === 'shield' ? 2 : 10
    }
    const idx = items.findIndex((i) => i.name === e.name && !i.grant)
    let next: InvItem[]
    if (idx >= 0) next = items.map((i, j) => (j === idx ? { ...i, qty: i.qty + 1 } : i))
    else
      next = [
        ...items,
        { id: uid('it'), name: e.name, qty: 1, cost: e.cost, weapon: isWeapon || undefined, rawProps: isWeapon ? e.props : undefined, ranged: isWeapon ? !!e.ranged : undefined, masteryKey: isWeapon ? e.mastery : undefined, armorTier: isArmor ? e.tier : undefined, armorBase: isArmor ? armorBase : undefined }
      ]
    onChange({ items: next, coins: { ...coins, ...fromCp(poolCp - priceCp) } })
  }

  const removeOne = (item: InvItem): void => {
    const refundCp = item.cost ? costToCp(item.cost) : 0
    const next = item.qty > 1 ? items.map((i) => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i)) : items.filter((i) => i.id !== item.id)
    onChange({ items: next, coins: { ...coins, ...fromCp(poolCp + refundCp) } })
  }

  // weapon mastery
  const mCount = masteryCount(classId, sheet.level)
  const masteryWeapons = items.filter((i) => i.weapon && i.masteryKey)
  const masteryOnCount = masteryWeapons.filter((i) => i.masteryOn).length
  const toggleMastery = (item: InvItem): void => {
    if (!item.masteryOn && masteryOnCount >= mCount) return
    onChange({ items: items.map((i) => (i.id === item.id ? { ...i, masteryOn: !i.masteryOn } : i)) })
  }

  // Folders for the shop (shown when the search box is empty).
  const folders: Folder[] = [
    { id: 'wsimple', label: 'Простое оружие', test: (e) => e.category === 'weapon-simple', allowed: prof.simple, deny: 'Класс не владеет простым оружием — атаки им идут без бонуса владения.' },
    { id: 'wmartial', label: 'Воинское оружие', test: (e) => e.category === 'weapon-martial', allowed: prof.martial, deny: 'Класс не владеет воинским оружием — атаки им идут без бонуса владения и без свойства мастерства.' },
    { id: 'light', label: 'Лёгкие доспехи', test: (e) => e.category === 'armor' && e.tier === 'light', allowed: prof.light, deny: ARMOR_DENY },
    { id: 'medium', label: 'Средние доспехи', test: (e) => e.category === 'armor' && e.tier === 'medium', allowed: prof.medium, deny: ARMOR_DENY },
    { id: 'heavy', label: 'Тяжёлые доспехи', test: (e) => e.category === 'armor' && e.tier === 'heavy', allowed: prof.heavy, deny: ARMOR_DENY },
    { id: 'shield', label: 'Щиты', test: (e) => e.category === 'armor' && e.tier === 'shield', allowed: prof.shield, deny: ARMOR_DENY },
    { id: 'gear', label: 'Снаряжение', test: (e) => e.category === 'gear', allowed: true },
    { id: 'tools', label: 'Инструменты', test: (e) => e.category === 'tools', allowed: true },
    { id: 'potions', label: 'Зелья и эликсиры', test: (e) => e.category === 'potions', allowed: true },
    { id: 'packs', label: 'Наборы снаряжения', test: (e) => e.category === 'packs', allowed: true },
    { id: 'mounts', label: 'Транспорт и животные', test: (e) => e.category === 'mounts', allowed: true }
  ]

  const searchList = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? SHOP.filter((e) => e.name.toLowerCase().includes(s)) : []
  }, [q])

  const ItemBtn = (e: EquipItem): JSX.Element => {
    const afford = costToCp(e.cost) <= poolCp
    return (
      <button key={e.id} onClick={() => buy(e)} disabled={!afford} className={`flex w-full items-center justify-between gap-2 border-b border-ink-brown/10 px-2 py-1 text-left text-[13px] ${afford ? 'hover:bg-accent/10' : 'opacity-40'}`}>
        <span className="font-semibold text-ink-brown">{e.name}</span>
        <span className="text-[11px] text-accent">{e.cost}</span>
      </button>
    )
  }

  return (
    <div className="space-y-2 text-sm">
      {bg && (
        <div className="rounded border border-ink-brown/20 bg-parchment/40 p-2">
          <div className="mb-1 text-xs font-semibold text-accent">Снаряжение предыстории — выберите одно:</div>
          <div className="flex flex-wrap gap-1">
            <button onClick={takeBgItems} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sheet.bgEquipChoice === 'items' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>Взять вещи{bg.gold ? ` (+${bg.gold} зм)` : ''}</button>
            <button onClick={takeBgGold} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sheet.bgEquipChoice === 'gold' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>Взять золото ({bg.altGold} зм)</button>
          </div>
          {sheet.bgEquipChoice === 'items' && <p className="mt-1 text-[12px] text-ink-brown/80">{bg.items}{bg.gold ? ` + ${bg.gold} зм` : ''}</p>}
        </div>
      )}

      {start ? (
        <div className="rounded border border-ink-brown/20 bg-parchment/40 p-2">
          <div className="mb-1 text-xs font-semibold text-accent">Снаряжение класса — выберите одно:</div>
          <div className="flex flex-wrap gap-1">
            <button onClick={takeItems} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sheet.equipChoice === 'items' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>Взять вещи{startGear?.gold ? ` (+${startGear.gold} зм)` : ''}</button>
            <button onClick={takeGold} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sheet.equipChoice === 'gold' ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'}`}>Взять золото ({start.gold} зм)</button>
          </div>
          {sheet.equipChoice === 'items' && <p className="mt-1 text-[12px] text-ink-brown/80">{startGear?.items}{startGear?.gold ? ` + ${startGear.gold} зм в кошелёк` : ''}</p>}
        </div>
      ) : (
        <p className="text-xs italic text-ink-brown/50">Выберите класс, чтобы получить стартовое снаряжение или золото.</p>
      )}

      {/* Shop — always available. Take your granted items AND spend whatever gold
          you have left; buying is no longer an either/or alternative. The
          category folders stay hidden until «Снаряжение» is opened. */}
      <div className="rounded border border-ink-brown/20 bg-parchment/40 p-2">
        <button onClick={() => setShopOpen((o) => !o)} className="flex w-full items-center gap-2 text-left">
          {shopOpen ? <GiOpenFolder className="text-accent" /> : <GiFullFolder className="text-accent" />}
          <span className="text-xs font-semibold text-accent">Снаряжение</span>
          <span className="ml-auto text-[12px] text-ink-brown/80">Кошелёк: <b className="text-accent">{coinStr}</b></span>
          <span className="text-ink-brown/40">{shopOpen ? '▾' : '▸'}</span>
        </button>

        {shopOpen && (
          <div className="mt-2">
            <p className="text-[12px] text-ink-brown/70">Выберите папку снаряжения. Купленное оружие сразу появляется в атаках листа.</p>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск снаряжения по всем папкам…" className="mt-1 w-full rounded border border-ink-brown/30 bg-parchment/60 px-2 py-1 text-sm focus:border-accent focus:outline-none" />

            {q.trim() ? (
              <div className="mt-1 max-h-64 overflow-y-auto rounded border border-ink-brown/15">
                {searchList.length === 0 ? <p className="px-2 py-2 text-[12px] italic text-ink-brown/50">Ничего не найдено.</p> : searchList.map(ItemBtn)}
              </div>
            ) : (
              <div className="mt-1 space-y-1">
                {folders.map((f) => {
                  const list = SHOP.filter(f.test)
                  if (list.length === 0) return null
                  const open = openFolder === f.id
                  const restricted = prof.known && !f.allowed
                  return (
                    <div key={f.id} className="rounded border border-ink-brown/15">
                      <button onClick={() => setOpenFolder(open ? null : f.id)} className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-[13px] hover:bg-accent/5">
                        {open ? <GiOpenFolder className="text-accent" /> : <GiFullFolder className="text-accent" />}
                        <span className="font-semibold text-ink-brown">{f.label}</span>
                        {restricted && <span className="text-[10px] text-amber-700" title="Класс не владеет этой категорией">⚠</span>}
                        <span className="ml-auto text-[11px] text-ink-brown/40">{list.length}</span>
                      </button>
                      {open && (
                        <div className="border-t border-ink-brown/10">
                          {restricted && (
                            <p className="bg-amber-100/60 px-2 py-1 text-[11px] leading-snug text-amber-800">⚠ {f.deny}</p>
                          )}
                          <div className="max-h-56 overflow-y-auto">{list.map(ItemBtn)}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spellcasting focus reminder */}
      {isCaster && !hasFocus && (
        <div className="rounded border border-amber-500/50 bg-amber-100/50 p-2 text-[12px] leading-snug text-amber-800">
          ⚠ Заклинательному классу нужна <b>магическая фокусировка</b> или <b>мешочек с компонентами</b>, чтобы накладывать заклинания с материальными компонентами. Загляните в папку «Снаряжение» и купите подходящую фокусировку (посох, кристалл, жезл, святой символ, друидическую фокусировку) либо мешочек с компонентами.
        </div>
      )}

      {/* Inventory — remove-only (no free editing); removing refunds the cost. */}
      <div>
        <div className="text-xs font-semibold text-ink-brown/70">Инвентарь {poolCp ? <span className="font-normal text-ink-brown/50">· кошелёк {coinStr}</span> : null}</div>
        {items.length === 0 ? (
          <p className="text-[12px] italic text-ink-brown/50">Пусто — добавьте вещи предыстории/класса или купите снаряжение.</p>
        ) : (
          <ul className="mt-1 divide-y divide-ink-brown/10 rounded border border-ink-brown/15">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-2 px-2 py-1 text-[13px]">
                {i.qty > 1 && <span className="rounded bg-ink-brown/10 px-1 text-[11px] font-semibold text-ink-brown/70">[{i.qty}]</span>}
                <span className="min-w-0 flex-1 truncate text-ink-brown" title={i.name}>
                  {i.name}
                  {i.weapon && <GiCrossedSwords className="ml-1 inline-block text-accent" title="Оружие — добавлено в «Мои атаки»" />}
                  {i.armorTier === 'shield' && <span className="ml-1 text-[11px] text-accent">(+{i.armorBase ?? 2} к КД)</span>}
                  {i.armorTier && i.armorTier !== 'shield' && <span className="ml-1 text-[11px] text-accent">(КД {i.armorBase ?? 10}{i.armorTier === 'heavy' ? '' : ' + Лов'})</span>}
                </span>
                {i.cost && <span className="text-[10px] text-ink-brown/40">{i.cost}</span>}
                {i.grant ? (
                  <span title="Получено от класса/предыстории — убирается переключением «Взять золото»" className="px-1 text-[11px] text-ink-brown/40">🔒</span>
                ) : (
                  <button onClick={() => removeOne(i)} title="Удалить предмет (вернуть деньги)" className="rounded border border-ink-brown/30 px-1.5 text-xs text-ink-brown/60 hover:border-red-600/60 hover:text-red-700">✕</button>
                )}
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
            <p className="mt-1 text-[12px] italic text-ink-brown/60">Получите оружие от класса/предыстории или купите его, чтобы назначить ему свойство мастерства.</p>
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
