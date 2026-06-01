import { EQUIPMENT, type EquipItem } from '../data/equipment-ru'
import type { InvItem } from '../data/character-sheet'
import { uid } from './monster'

// Only weapons and armour need structured tagging (so they turn into attacks /
// contribute to AC). Everything else stays as a plain inventory line.
const TAGGABLE = EQUIPMENT.filter(
  (e) => e.category === 'weapon-simple' || e.category === 'weapon-martial' || e.category === 'armor'
)

const STOP = new Set(['и', 'с', 'со', 'от', 'для', 'к', 'на'])

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^а-я0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Crude Russian stemmer — strips common inflectional endings. */
function stem(w: string): string {
  if (w.length <= 4) return w
  return w.replace(/(ого|его|ыми|ями|ами|ыми|ах|ях|ов|ев|ый|ий|ой|ая|яя|ое|ее|ые|ие|ам|ям|ом|ем|у|ю|а|я|ы|и|е|о|ь|й)$/, '')
}

function wordMatch(a: string, b: string): boolean {
  const sa = stem(a)
  const sb = stem(b)
  if (sa.length < 3 || sb.length < 3) return sa === sb
  return sa.startsWith(sb) || sb.startsWith(sa)
}

/** Find the most specific weapon/armour matching a single piece of text. */
function bestMatch(piece: string): EquipItem | null {
  const words = norm(piece)
    .split(' ')
    .filter((w) => w && !/^\d+$/.test(w) && !STOP.has(w))
  if (!words.length) return null
  let best: EquipItem | null = null
  let bestScore = 0
  for (const e of TAGGABLE) {
    const ew = norm(e.name).split(' ').filter(Boolean)
    const ok = ew.every((x) => words.some((y) => wordMatch(x, y)))
    if (ok) {
      const score = ew.length * 100 + e.name.length
      if (score > bestScore) {
        bestScore = score
        best = e
      }
    }
  }
  return best
}

function armorBaseFrom(e: EquipItem): number {
  const m = e.props.match(/(?:КД|\+)\s*(\d+)/)
  return m ? +m[1] : e.tier === 'shield' ? 2 : 10
}

/** Build an inventory item from a matched weapon/armour, free of charge. */
function toInvItem(e: EquipItem, qty: number, grant: 'class' | 'bg'): InvItem {
  const isWeapon = e.category === 'weapon-simple' || e.category === 'weapon-martial'
  const isArmor = e.category === 'armor'
  return {
    id: uid('it'),
    name: e.name,
    qty,
    grant,
    weapon: isWeapon || undefined,
    rawProps: isWeapon ? e.props : undefined,
    ranged: isWeapon ? !!e.ranged : undefined,
    masteryKey: isWeapon ? e.mastery : undefined,
    armorTier: isArmor ? e.tier : undefined,
    armorBase: isArmor ? armorBaseFrom(e) : undefined
  }
}

/**
 * Split a starting-kit string ("Кольчуга, щит, воинское оружие, 8 копий, …")
 * into structured inventory items. Recognised weapons/armour are tagged so they
 * become attacks / contribute to AC; anything else is kept as a plain line.
 */
export function parseGrantItems(bundle: string, grant: 'class' | 'bg'): InvItem[] {
  if (!bundle.trim()) return []
  // Split on commas and the conjunctions «и» / «с <число>» that join sub-items.
  const pieces = bundle
    .split(/\s*,\s*|\s+и\s+|\s+с\s+(?=\d)/i)
    .map((p) => p.trim())
    .filter(Boolean)

  const out: InvItem[] = []
  for (const piece of pieces) {
    const qtyMatch = piece.match(/^(\d+)\s+/)
    const qty = qtyMatch ? +qtyMatch[1] : 1
    const match = bestMatch(piece)
    if (match) out.push(toInvItem(match, qty, grant))
    else out.push({ id: uid('it'), name: piece, qty, grant })
  }
  return out
}
