import type { NamedEntry, StatBlock } from '@shared/types'

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function emptyEntry(): NamedEntry {
  return { id: uid('e'), name: '', desc: '' }
}

export function emptyStatBlock(): StatBlock {
  return {
    key: uid('custom'),
    name: 'Новый монстр',
    size: 'Средний',
    type: 'Гуманоид',
    alignment: 'нейтральный',
    armorClass: 12,
    hitPoints: 10,
    hitDice: '3к6',
    speed: { walk: 30 },
    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    savingThrows: {},
    skills: {},
    challengeRating: 1,
    crDisplay: '1',
    proficiencyBonus: 2,
    traits: [],
    actions: [],
    bonusActions: [],
    reactions: [],
    legendaryActions: [],
    environments: [],
    source: 'custom'
  }
}

/** Build a printable, self-contained HTML stat block. */
export function statBlockToHtml(m: StatBlock): string {
  const esc = (s: string): string => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string)
  const abil = (['str', 'dex', 'con', 'int', 'wis', 'cha'] as const)
    .map((a) => {
      const v = m.abilities[a]
      const mod = Math.floor((v - 10) / 2)
      return `<td>${a.toUpperCase()}<br>${v} (${mod >= 0 ? '+' : ''}${mod})</td>`
    })
    .join('')
  const list = (title: string, entries: NamedEntry[]): string =>
    entries.length
      ? `<h3>${title}</h3>` +
        entries.map((e) => `<p><b><i>${esc(e.name)}.</i></b> ${esc(e.desc)}</p>`).join('')
      : ''
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(m.name)}</title>
<style>
body{font-family:Georgia,serif;background:#f5f0e8;color:#2b2118;max-width:700px;margin:24px auto;padding:24px;border:2px solid #8b0000;border-radius:8px}
h1{color:#8b0000;margin:0}
h3{color:#8b0000;border-bottom:2px solid #8b0000;padding-bottom:2px}
hr{border:none;height:3px;background:#8b0000;margin:8px 0}
table{width:100%;text-align:center;font-weight:bold}
.line b{color:#8b0000}
</style></head><body>
<h1>${esc(m.name)}</h1>
<p><i>${esc(m.size)}, ${esc(m.type)}, ${esc(m.alignment)}</i></p><hr>
<p class="line"><b>КД</b> ${m.armorClass} &nbsp; <b>Хиты</b> ${m.hitPoints} (${esc(m.hitDice ?? '')}) &nbsp; <b>Скорость</b> ${Object.entries(
    m.speed
  )
    .map(([k, v]) => `${k} ${v}`)
    .join(', ')}</p><hr>
<table><tr>${abil}</tr></table><hr>
<p class="line"><b>Опасность</b> ${m.crDisplay}</p>
${list('Особые черты', m.traits)}
${list('Действия', m.actions)}
${list('Бонусные действия', m.bonusActions)}
${list('Реакции', m.reactions)}
${list('Легендарные действия', m.legendaryActions)}
</body></html>`
}
