// Self-contained black-on-white 4-page A4 character sheet (HTML string) for
// printing/PDF, using the SAME class names + CSS as the on-screen
// InteractiveSheet (sheet-style.ts) so print matches the screen 1:1.
import { ABILITIES, ABILITY_RU, ABILITY_ABBR, formatMod } from '../data/character-rules'
import { deriveSheet, type CharacterSheet, type SpellLine } from '../data/character-sheet'
import { SHEET_CSS, SHEET_PRINT_CSS } from '../data/sheet-style'
import { markupToHtml } from './markup'

function esc(s: string | number | undefined): string {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
const panel = (label: string, inner: string, cls = ''): string =>
  `<div class="cs-panel ${cls}">${inner}<span class="cs-pl">${esc(label)}</span></div>`
const fld = (label: string, value: string): string =>
  `<div class="cs-fld"><span style="font-size:12px">${esc(value) || '&nbsp;'}</span><span class="cs-pl">${esc(label)}</span></div>`
const mini = (label: string, value: string): string =>
  `<div class="cs-mini"><div class="v">${esc(value) || '&nbsp;'}</div><span class="cs-pl">${esc(label)}</span></div>`
const profLine = (on: boolean, mod: string, name: string, sub?: string): string =>
  `<div class="cs-line"><span class="cs-bub${on ? ' on' : ''}"></span><span class="cs-mod">${esc(mod)}</span><span class="nm">${esc(name)}</span>${sub ? `<span class="sub">${esc(sub)}</span>` : ''}</div>`
const deathBubs = (n: number): string => [1, 2, 3].map((i) => `<span class="cs-bub${n >= i ? ' on' : ''}"></span>`).join('')
const corner = (c: string): string =>
  `<span class="cs-corner ${c}"><svg viewBox="0 0 30 30"><path d="M3 27 C3 13 13 3 27 3" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M3 21 C3 11 11 3 21 3" fill="none" stroke="currentColor" stroke-width="0.6"/><circle cx="6.5" cy="6.5" r="1.8" fill="currentColor"/></svg></span>`
const CORNERS = ['tl', 'tr', 'bl', 'br'].map(corner).join('')
const CIRC: Record<string, string> = { v: 'В', s: 'С', m: 'М', r: 'Р', c: 'К' }
const printLines = (lines: SpellLine[] | undefined, count: number): string => {
  const arr = lines ?? []
  return Array.from({ length: Math.max(count, arr.length) }, (_, i) => {
    const ln = (arr[i] ?? {}) as Record<string, unknown>
    return `<div class="cs-spline"><span style="flex:1;border-bottom:1px solid #aaa;min-height:11px">${esc(ln.name as string)}</span><span class="circles">${['v', 's', 'm', 'r', 'c'].map((k) => `<span class="cs-cir${ln[k] ? ' on' : ''}">${CIRC[k]}</span>`).join('')}</span></div>`
  }).join('')
}

export function characterSheetToHtml(sheet: CharacterSheet): string {
  const v = deriveSheet(sheet)
  const coins = sheet.coins ?? {}
  const sc = sheet.spellcasting ?? {}
  const spAb = sc.ability ?? v.primaryAbility
  const spMod = spAb ? v.mods[spAb] : 0
  const dc = sc.saveDC ?? (spAb ? 8 + v.proficiencyBonus + spMod : undefined)
  const atk = sc.attackBonus ?? (spAb ? v.proficiencyBonus + spMod : undefined)

  const abilities = ABILITIES.map((k) => `<div class="cs-ab"><div class="nm">${ABILITY_RU[k]}</div><div class="md">${formatMod(v.mods[k])}</div><div class="sc">${v.finalAbilities[k]}</div></div>`).join('')
  const saves = v.saves.map((s) => profLine(s.proficient, formatMod(s.bonus), ABILITY_RU[s.ability])).join('')
  const skills = v.skills.map((s) => profLine(s.proficient, formatMod(s.bonus), s.skill, ABILITY_ABBR[s.ability])).join('')

  const attackRows = [
    ...v.attacks.map((a) => `<tr><td>${esc(a.name)}${a.mastery ? ` <span style="color:#777;font-size:8px">· ${esc(a.mastery)}</span>` : ''}</td><td class="c">${formatMod(a.bonus)}</td><td>${esc(a.damage)}</td></tr>`),
    ...Array.from({ length: Math.max(0, 6 - v.attacks.length) }, () => '<tr><td>&nbsp;</td><td></td><td></td></tr>')
  ].join('')
  const attacks = `<table class="cs-atk"><thead><tr><th style="text-align:left">Название</th><th>Бонус</th><th style="text-align:left">Урон / тип</th></tr></thead><tbody>${attackRows}</tbody></table>`

  const coinRow = `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;margin-bottom:3px">${(['cp', 'sp', 'ep', 'gp', 'pp'] as const).map((k, i) => `<div style="border:1px solid #999;border-radius:3px;text-align:center;font-size:8px"><div style="color:#777">${['ПМ', 'СМ', 'ЭМ', 'ЗМ', 'ПЛ'][i]}</div><b>${coins[k] ?? ''}</b></div>`).join('')}</div>`

  const featBlock = (list: typeof v.featuresPage1): string => list.map((f) => `<p style="font-size:10px;margin:1px 0"><b>${esc(f.name)}${f.level ? ` (${f.level} ур.)` : ''}.</b> ${esc(f.desc)}</p>`).join('')
  const remainingFeats = Math.max(0, v.featSlots - (sheet.chosenFeatIds?.length ?? 0))
  const featSlotLine = remainingFeats ? `<p style="font-size:10px"><i>Можно ещё выбрать черт: ${remainingFeats}.</i></p>` : ''
  const features1 = `${featSlotLine}${featBlock(v.featuresPage1)}${v.masteries.map((m) => `<p style="font-size:10px;margin:1px 0"><b>Мастерство «${esc(m.name)}» (${esc(m.weapon)}).</b> ${esc(m.desc)}</p>`).join('')}${sheet.manualFeatures ? `<p style="font-size:10px;margin:2px 0;white-space:pre-line">${markupToHtml(sheet.manualFeatures)}</p>` : ''}${v.featuresPage2.length ? `<p style="font-size:9px;font-style:italic;color:#888">…ещё ${v.featuresPage2.length} на стр. 2.</p>` : ''}`
  const features2 = featBlock(v.featuresPage2)

  const shield = `<div class="cs-shield"><svg viewBox="0 0 74 84"><path d="M4 7 H70 V50 Q70 76 37 82 Q4 76 4 50 Z" fill="none" stroke="#000" stroke-width="1.5"/></svg><div class="v">${sheet.armorClass ?? v.derivedAC}</div><span class="cs-pl">Класс доспеха</span></div>`

  const colStyle = 'display:flex;flex-direction:column;gap:6px'
  const grow = (label: string, inner: string): string => `<div class="cs-panel cs-grow" style="flex:1">${inner}<div class="cs-growbody"></div><span class="cs-pl">${esc(label)}</span></div>`
  const growArea = (label: string, value: string | undefined): string => `<div class="cs-panel cs-grow" style="flex:1"><div class="areabody cs-growbody">${markupToHtml(value)}</div><span class="cs-pl">${esc(label)}</span></div>`

  const spellLevels = Array.from({ length: 9 }, (_, i) => {
    const cur = (sc.levels ?? [])[i] ?? {}
    const head = `<div style="display:flex;font-size:8px;text-transform:uppercase;color:#777;margin-bottom:2px"><b style="font-size:9px">${i + 1} ур.</b><span style="margin-left:auto">яч. ${cur.total ?? '__'} · исп. ${cur.used ?? '__'}</span></div>`
    return `<div class="cs-panel" style="display:flex;flex-direction:column">${head}<div class="cs-fill" style="flex:1">${printLines(cur.lines, 14)}</div><span class="cs-pl">${i + 1} уровень</span></div>`
  }).join('')

  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>${esc(sheet.name || 'Лист персонажа')}</title>
<style>${SHEET_CSS}${SHEET_PRINT_CSS}</style></head><body class="csheet">

<div class="cs-page" style="display:flex;flex-direction:column">${CORNERS}
  <div style="display:grid;grid-template-columns:210px 1fr;gap:6px">
    <div class="cs-logo" style="align-self:center">DUNGEONS &amp; DRAGONS<small>лист персонажа</small></div>
    ${fld('Имя персонажа', sheet.name)}
  </div>
  <div style="display:grid;grid-template-columns:1.5fr .55fr 1.2fr 1.35fr 1.2fr 1.15fr .8fr;gap:6px;margin-top:6px">
    ${fld('Класс', v.className)}${fld('Ур.', String(sheet.level))}${fld('Раса', v.raceName)}${fld('Предыстория', v.backgroundName)}${fld('Мировоззрение', sheet.alignment ?? '')}${fld('Имя игрока', sheet.playerName ?? '')}${fld('Опыт', sheet.experience ?? '')}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px;flex:1">
    <div style="${colStyle}">
      <div style="display:grid;grid-template-columns:60px 1fr;gap:6px">
        <div>${abilities}</div>
        <div style="${colStyle}">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${mini('Вдохнов.', sheet.inspiration ? '✓' : '')}${mini('Бонус маст.', formatMod(v.proficiencyBonus))}</div>
          ${panel('Спасброски', saves)}
          ${panel('Навыки', skills)}
          ${mini('Пассивная Внимательность', String(v.passivePerception))}
        </div>
      </div>
      <div class="cs-panel cs-grow" style="flex:1">${v.proficienciesText ? `<div class="areabody" style="font-size:9.5px;white-space:pre-line;margin-bottom:2px">${esc(v.proficienciesText)}</div>` : ''}<div class="areabody cs-growbody">${markupToHtml(sheet.otherProficiencies)}</div><span class="cs-pl">Прочие владения и языки</span></div>
    </div>
    <div style="${colStyle}">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;align-items:end">${shield}${mini('Инициатива', formatMod(v.initiative))}${mini('Скорость', `${v.speed} фт`)}</div>
      ${panel('Хиты', `<div style="text-align:right;font-size:8px;color:#777">макс ${sheet.maxHp || '__'}</div><div style="text-align:center;font-size:18px;font-weight:bold;min-height:20px">${sheet.currentHp ?? ''}</div>`)}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
        ${panel('Врем. хиты', `<div style="text-align:center;font-size:14px;font-weight:bold;min-height:16px">${sheet.tempHp ?? ''}</div>`)}
        ${mini('Кость хитов', v.hitDie ? `${sheet.level}${v.hitDie}` : '—')}
        ${panel('Спасбр. смерти', `<div class="cs-death"><span style="width:14px;color:#555">✓</span><span class="bubs">${deathBubs(sheet.deathSuccesses ?? 0)}</span></div><div class="cs-death"><span style="width:14px;color:#555">✗</span><span class="bubs">${deathBubs(sheet.deathFailures ?? 0)}</span></div>`)}
      </div>
      ${panel('Мои атаки', attacks)}
      <div class="cs-panel cs-grow" style="flex:1">${coinRow}<div class="areabody cs-growbody">${markupToHtml(v.equipmentText)}</div><span class="cs-pl">Снаряжение</span></div>
    </div>
    <div style="${colStyle}">
      ${growArea('Черты характера', sheet.personality)}
      ${growArea('Идеалы', sheet.ideals)}
      ${growArea('Привязанности', sheet.bonds)}
      ${growArea('Изъяны', sheet.flaws)}
      ${grow('Умения и черты', `<div style="font-size:10px">${features1}</div>`)}
    </div>
  </div>
</div>

<div class="cs-page" style="display:flex;flex-direction:column">${CORNERS}
  <div style="display:grid;grid-template-columns:200px 1fr;gap:6px">
    ${fld('Имя персонажа', sheet.name)}
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
      ${fld('Возраст', sheet.age ?? '')}${fld('Рост', sheet.height ?? '')}${fld('Вес', sheet.weight ?? '')}${fld('Глаза', sheet.eyes ?? '')}${fld('Кожа', sheet.skin ?? '')}${fld('Волосы', sheet.hair ?? '')}
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px;margin-top:8px;flex:1">
    ${growArea('Внешность', sheet.appearance)}
    ${growArea('Сокровища', sheet.treasure)}
    ${growArea('Предыстория персонажа', sheet.backstory)}
    <div style="${colStyle}"><div class="cs-panel cs-grow" style="flex:1"><div style="font-size:10px">${features2}</div><div class="areabody cs-growbody">${markupToHtml(sheet.additionalFeatures)}</div><span class="cs-pl">Дополнительные умения и черты</span></div>${growArea('Союзники и организации', sheet.allies)}</div>
  </div>
</div>

<div class="cs-page" style="display:flex;flex-direction:column">${CORNERS}
  ${growArea('Заметки', sheet.notes)}
</div>

<div class="cs-page" style="display:flex;flex-direction:column">${CORNERS}
  <div style="display:grid;grid-template-columns:1fr 140px 110px 110px;gap:6px">
    ${fld('Класс заклинателя', sc.className ?? v.className)}${fld('Базовая характеристика', spAb ? ABILITY_RU[spAb] : '')}${mini('СЛ спасброска', dc != null ? String(dc) : '')}${mini('Бонус атаки', atk != null ? formatMod(atk) : '')}
  </div>
  ${v.grantedSpells.length ? `<p style="font-size:10px;margin-top:3px"><b>Заклинания от класса/расы:</b> ${esc(v.grantedSpells.join(', '))}.</p>` : ''}
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:repeat(4,1fr);gap:8px;margin-top:8px;flex:1">
    <div class="cs-panel" style="display:flex;flex-direction:column"><div class="cs-fill" style="flex:1">${v.grantedCantrips.map((c) => `<div class="cs-spline"><span style="flex:1;font-style:italic">${esc(c)}</span></div>`).join('')}${printLines(sc.cantrips, Math.max(4, 12 - v.grantedCantrips.length))}</div><span class="cs-pl">Заговоры (0 ур.)</span></div>
    <div class="cs-panel" style="display:flex;flex-direction:column;grid-column:2 / 4"><div class="areabody" style="flex:1">${markupToHtml(sheet.magicItems)}</div><span class="cs-pl">Мои артефакты и магические предметы</span></div>
    ${spellLevels}
  </div>
</div>

</body></html>`
}

/** Download the sheet as a PDF via the main-process exportPdf handler. */
export function downloadSheetPdf(sheet: CharacterSheet): Promise<unknown> {
  return window.api.exportPdf(characterSheetToHtml(sheet), sheet.name || 'character')
}

/** Open the sheet in a new window and trigger the print dialog. */
export function printSheet(sheet: CharacterSheet): void {
  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(characterSheetToHtml(sheet))
  w.document.close()
  w.focus()
  w.print()
}
