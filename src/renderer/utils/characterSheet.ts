// Self-contained black-on-white 4-page A4 character sheet (HTML string) for
// printing/PDF, using the SAME class names + CSS as the on-screen
// InteractiveSheet (sheet-style.ts) so print matches the screen 1:1.
import { ABILITIES, ABILITY_RU, ABILITY_ABBR, formatMod } from '../data/character-rules'
import { deriveSheet, type CharacterSheet, type SheetView, type SpellLine } from '../data/character-sheet'
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

/** Where each feature block ends up: page-1 box, page-2 box, then any number of
 *  continuation pages. */
export interface FeatureLayout {
  box1: string[]
  box2: string[]
  extra: string[][]
}

/** Each feature/mastery/manual line as its own HTML block, so they can be
 *  distributed across boxes/pages without ever being clipped. */
function featureBlocks(v: SheetView, sheet: CharacterSheet): string[] {
  const out: string[] = []
  const remainingFeats = Math.max(0, v.featSlots - (sheet.chosenFeatIds?.length ?? 0))
  if (remainingFeats) out.push(`<p style="font-size:10px;margin:1px 0"><i>Можно ещё выбрать черт: ${remainingFeats}.</i></p>`)
  for (const f of v.features) out.push(`<p style="font-size:10px;margin:1px 0"><b>${esc(f.name)}${f.level ? ` (${f.level} ур.)` : ''}.</b> ${esc(f.desc)}</p>`)
  for (const m of v.masteries) out.push(`<p style="font-size:10px;margin:1px 0"><b>Мастерство «${esc(m.name)}» (${esc(m.weapon)}).</b> ${esc(m.desc)}</p>`)
  if (sheet.manualFeatures) out.push(`<p style="font-size:10px;margin:2px 0;white-space:pre-line">${markupToHtml(sheet.manualFeatures)}</p>`)
  return out
}

/** Fallback split by character budget when there's no DOM to measure with. */
function fallbackLayout(blocks: string[]): FeatureLayout {
  const box1: string[] = []
  const box2: string[] = []
  let budget = 1100
  let i = 0
  for (; i < blocks.length && budget > 0; i++) {
    box1.push(blocks[i])
    budget -= blocks[i].length
  }
  for (; i < blocks.length; i++) box2.push(blocks[i])
  return { box1, box2, extra: [] }
}

/** Measure how many feature blocks fit in each box (page-1 «Умения и черты»,
 *  page-2 «Дополнительные умения», then full-page continuations) by laying the
 *  real print HTML out in a hidden iframe and reading actual pixel heights. */
function layoutFeatures(sheet: CharacterSheet, v: SheetView, blocks: string[]): FeatureLayout {
  if (!blocks.length) return { box1: [], box2: [], extra: [] }
  if (typeof document === 'undefined') return fallbackLayout(blocks)

  // Empty boxes + one empty continuation page → reveals the fair-share height of
  // each box at the real print width.
  const measureHtml = characterSheetToHtml(sheet, { box1: [], box2: [], extra: [[]] }, true)
  const ifr = document.createElement('iframe')
  ifr.setAttribute('aria-hidden', 'true')
  // ≈ A4 printable width (210mm − 2×9mm margin = 192mm ≈ 726px @96dpi).
  ifr.style.cssText = 'position:absolute;left:-99999px;top:0;width:726px;height:1200px;border:0;visibility:hidden;'
  document.body.appendChild(ifr)
  try {
    const doc = ifr.contentDocument
    if (!doc) return fallbackLayout(blocks)
    doc.open()
    doc.write(measureHtml)
    doc.close()

    const fillH = (id: string): number => {
      const el = doc.getElementById(id)?.querySelector('.cs-growbody') as HTMLElement | null
      return el?.clientHeight ?? 0
    }
    const innerW = (id: string, dflt: number): number => {
      const el = doc.getElementById(id)
      return (el?.clientWidth ?? dflt) - 16
    }
    const cap1 = fillH('csFeat1') || 300
    const cap2 = fillH('csFeat2') || 360
    const capE = fillH('csFeatE') || 950
    const w1 = innerW('csFeat1', 230)
    const w2 = innerW('csFeat2', 320)
    const wE = innerW('csFeatE', 700)

    const meas = doc.createElement('div')
    meas.className = 'csheet'
    meas.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden'
    doc.body.appendChild(meas)
    const blockH = (html: string, width: number): number => {
      meas.style.width = `${width}px`
      meas.innerHTML = html
      return meas.offsetHeight
    }

    const SAFE = 0.95
    let i = 0
    const fillBox = (cap: number, width: number, arr: string[]): void => {
      let used = 0
      while (i < blocks.length) {
        const h = blockH(blocks[i], width)
        if (arr.length && used + h > cap * SAFE) break
        arr.push(blocks[i])
        used += h
        i++
      }
    }

    const box1: string[] = []
    const box2: string[] = []
    const extra: string[][] = []
    fillBox(cap1, w1, box1)
    fillBox(cap2, w2, box2)
    while (i < blocks.length) {
      const page: string[] = []
      const before = i
      fillBox(capE, wE, page)
      if (i === before) {
        page.push(blocks[i])
        i++
      }
      extra.push(page)
    }
    return { box1, box2, extra }
  } catch {
    return fallbackLayout(blocks)
  } finally {
    document.body.removeChild(ifr)
  }
}

export function characterSheetToHtml(sheet: CharacterSheet, layout?: FeatureLayout, measuring = false): string {
  const v = deriveSheet(sheet)
  const coins = sheet.coins ?? {}
  const sc = sheet.spellcasting ?? {}
  const spAb = sc.ability ?? v.primaryAbility
  const spMod = spAb ? v.mods[spAb] : 0
  const dc = sc.saveDC ?? (spAb ? 8 + v.proficiencyBonus + spMod : undefined)
  const atk = sc.attackBonus ?? (spAb ? v.proficiencyBonus + spMod : undefined)

  const blocks = featureBlocks(v, sheet)
  const lay = layout ?? layoutFeatures(sheet, v, blocks)

  const abilities = ABILITIES.map((k) => `<div class="cs-ab"><div class="nm">${ABILITY_RU[k]}</div><div class="md">${formatMod(v.mods[k])}</div><div class="sc">${v.finalAbilities[k]}</div></div>`).join('')
  const saves = v.saves.map((s) => profLine(s.proficient, formatMod(s.bonus), ABILITY_RU[s.ability])).join('')
  const skills = v.skills.map((s) => profLine(s.proficient, formatMod(s.bonus), s.expert ? `${s.skill} ✦` : s.skill, ABILITY_ABBR[s.ability])).join('')

  const attackRows = [
    ...v.attacks.map((a) => `<tr><td>${esc(a.name)}${a.mastery ? ` <span style="color:#777;font-size:8px">· ${esc(a.mastery)}</span>` : ''}</td><td class="c">${formatMod(a.bonus)}</td><td>${esc(a.damage)}</td></tr>`),
    ...Array.from({ length: Math.max(0, 6 - v.attacks.length) }, () => '<tr><td>&nbsp;</td><td></td><td></td></tr>')
  ].join('')
  const attacks = `<table class="cs-atk"><thead><tr><th style="text-align:left">Название</th><th>Бонус</th><th style="text-align:left">Урон / тип</th></tr></thead><tbody>${attackRows}</tbody></table>`

  const coinRow = `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;margin-bottom:3px">${(['cp', 'sp', 'ep', 'gp', 'pp'] as const).map((k, i) => `<div style="border:1px solid #999;border-radius:3px;text-align:center;font-size:8px"><div style="color:#777">${['ПМ', 'СМ', 'ЭМ', 'ЗМ', 'ПЛ'][i]}</div><b>${coins[k] ?? ''}</b></div>`).join('')}</div>`

  // Page-1 «Умения и черты» box: id'd so the measurer can read its fair height.
  const featPanel1 = `<div id="csFeat1" class="cs-panel cs-grow" style="flex:1"><div style="font-size:10px">${lay.box1.join('')}</div><div class="cs-growbody"></div><span class="cs-pl">Умения и черты</span></div>`
  // Page-2 «Дополнительные умения» box (overflow from page 1) above the free-text.
  const addFeatures = measuring ? '' : markupToHtml(sheet.additionalFeatures)
  const featPanel2 = `<div id="csFeat2" class="cs-panel cs-grow" style="flex:1"><div style="font-size:10px">${lay.box2.join('')}</div><div class="areabody cs-growbody">${addFeatures}</div><span class="cs-pl">Дополнительные умения и черты</span></div>`
  // Continuation pages for anything that still doesn't fit.
  const extraPages = lay.extra
    .map(
      (page, idx) => `
<div class="cs-page" style="display:flex;flex-direction:column">${CORNERS}
  <div ${idx === 0 ? 'id="csFeatE"' : ''} class="cs-panel cs-grow" style="flex:1"><div style="font-size:10px">${page.join('')}</div><div class="cs-growbody"></div><span class="cs-pl">Дополнительные умения и черты (продолжение)</span></div>
</div>`
    )
    .join('')

  const shield = `<div class="cs-shield"><svg viewBox="0 0 74 84"><path d="M4 7 H70 V50 Q70 76 37 82 Q4 76 4 50 Z" fill="none" stroke="#000" stroke-width="1.5"/></svg><div class="v">${sheet.armorClass ?? v.derivedAC}</div><span class="cs-pl">Класс доспеха</span></div>`

  const colStyle = 'display:flex;flex-direction:column;gap:6px'
  const growArea = (label: string, value: string | undefined): string => `<div class="cs-panel cs-grow" style="flex:1"><div class="areabody cs-growbody">${markupToHtml(value)}</div><span class="cs-pl">${esc(label)}</span></div>`
  // Compact trait box: a steady 2 lines tall, growing only with its content
  // (not flex-filling the column like the big writing areas).
  const traitBox = (label: string, value: string | undefined): string => `<div class="cs-panel"><div class="areabody" style="min-height:26px;white-space:pre-line;font-size:10px">${markupToHtml(value)}</div><span class="cs-pl">${esc(label)}</span></div>`

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
      ${traitBox('Черты характера', sheet.personality)}
      ${traitBox('Идеалы', sheet.ideals)}
      ${traitBox('Привязанности', sheet.bonds)}
      ${traitBox('Изъяны', sheet.flaws)}
      ${featPanel1}
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
    <div style="${colStyle}">${featPanel2}${growArea('Союзники и организации', sheet.allies)}</div>
  </div>
</div>
${extraPages}
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
