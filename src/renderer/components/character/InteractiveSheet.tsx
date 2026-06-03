import { useEffect, useRef, useState, type CSSProperties, type JSX, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { uid } from '../../utils/monster'
import { ABILITIES, ABILITY_RU, ABILITY_ABBR, SKILL_DESC, formatMod, type AbilityKey } from '../../data/character-rules'
import { deriveSheet, type CharacterSheet, type SpellLine } from '../../data/character-sheet'
import { SHEET_CSS } from '../../data/sheet-style'
import { markupToHtml } from '../../utils/markup'

/** Faithful 4-page B&W reproduction of the official 2014 D&D sheet (portrait). */
export default function InteractiveSheet({
  sheet,
  onChange,
  readOnly
}: {
  sheet: CharacterSheet
  onChange: (patch: Partial<CharacterSheet>) => void
  readOnly?: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const v = deriveSheet(sheet)
  const set = (patch: Partial<CharacterSheet>): void => {
    if (!readOnly) onChange(patch)
  }
  const coins = sheet.coins ?? {}
  const itemLines = (sheet.items ?? []).map((i) => `${i.qty > 1 ? `[${i.qty}] ` : ''}${i.name}`).join('\n')
  const sc = sheet.spellcasting ?? {}
  const spAb = sc.ability ?? v.primaryAbility
  const spMod = spAb ? v.mods[spAb] : 0
  const autoDC = spAb ? 8 + v.proficiencyBonus + spMod : undefined
  const autoAtk = spAb ? v.proficiencyBonus + spMod : undefined
  const manualAttacks = sheet.manualAttacks ?? []

  // Full toggle: `on` is the current proficient state. Turning off adds to
  // removed (overriding class/background grants); turning on adds to extras.
  const toggleSkill = (skill: string, on: boolean): void => {
    const extra = new Set(sheet.extraSkills ?? [])
    const removed = new Set(sheet.removedSkills ?? [])
    if (on) { extra.delete(skill); removed.add(skill) } else { removed.delete(skill); extra.add(skill) }
    set({ extraSkills: [...extra], removedSkills: [...removed] })
  }
  const toggleSave = (ab: AbilityKey, on: boolean): void => {
    const extra = new Set(sheet.extraSaves ?? [])
    const removed = new Set(sheet.removedSaves ?? [])
    if (on) { extra.delete(ab); removed.add(ab) } else { removed.delete(ab); extra.add(ab) }
    set({ extraSaves: [...extra], removedSaves: [...removed] })
  }
  const setLevelLine = (lvlIdx: number, lineIdx: number, patch: Partial<SpellLine>): void => {
    const levels = (sc.levels ?? []).map((x) => ({ ...x }))
    while (levels.length <= lvlIdx) levels.push({})
    const lines = [...(levels[lvlIdx].lines ?? [])]
    while (lines.length <= lineIdx) lines.push({})
    lines[lineIdx] = { ...lines[lineIdx], ...patch }
    levels[lvlIdx] = { ...levels[lvlIdx], lines }
    set({ spellcasting: { ...sc, levels } })
  }
  const setLevelSlot = (lvlIdx: number, patch: { total?: number; used?: number }): void => {
    const levels = (sc.levels ?? []).map((x) => ({ ...x }))
    while (levels.length <= lvlIdx) levels.push({})
    levels[lvlIdx] = { ...levels[lvlIdx], ...patch }
    set({ spellcasting: { ...sc, levels } })
  }

  return (
    <div className="csheet">
      <style dangerouslySetInnerHTML={{ __html: SHEET_CSS }} />

      {/* ============ PAGE 1 ============ */}
      <div className="cs-page" style={{ display: 'flex', flexDirection: 'column' }}>
        <Corners />
        <div className="cs-pgnum"><span>{t('cc.isheet.page1Header')}</span><span>{t('cc.isheet.page1of4')}</span></div>
        {/* header: name + one 7-box row */}
        <div className="grid grid-cols-[210px,1fr] gap-1.5">
          <div className="cs-logo self-center">DUNGEONS &amp; DRAGONS<small>{t('cc.isheet.logoSub')}</small></div>
          <Fld label={t('cc.isheet.characterName')}><input value={sheet.name} onChange={(e) => set({ name: e.target.value })} style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }} /></Fld>
        </div>
        <div className="mt-1.5 grid gap-1.5" style={{ gridTemplateColumns: '1.5fr .55fr 1.2fr 1.35fr 1.2fr 1.15fr .8fr' }}>
          <Fld label={t('cc.isheet.class')}><input value={sheet.classText ?? v.className} onChange={(e) => set({ classText: e.target.value })} /></Fld>
          <Fld label={t('cc.isheet.lvlAbbr')}><input type="number" min={1} max={20} value={sheet.level} onChange={(e) => set({ level: clamp(+e.target.value, 1, 20) })} style={{ textAlign: 'center' }} /></Fld>
          <Fld label={t('cc.isheet.race')}><input value={sheet.raceText ?? v.raceName} onChange={(e) => set({ raceText: e.target.value })} /></Fld>
          <Fld label={t('cc.isheet.background')}><input value={sheet.backgroundText ?? v.backgroundName} onChange={(e) => set({ backgroundText: e.target.value })} /></Fld>
          <Fld label={t('cc.isheet.alignment')}><input value={sheet.alignment ?? ''} onChange={(e) => set({ alignment: e.target.value })} /></Fld>
          <Fld label={t('cc.isheet.playerName')}><input value={sheet.playerName ?? ''} onChange={(e) => set({ playerName: e.target.value })} /></Fld>
          <Fld label={t('cc.isheet.experience')}><input value={sheet.experience ?? ''} onChange={(e) => set({ experience: e.target.value })} /></Fld>
        </div>

        <div className="mt-2 grid flex-1 grid-cols-[1fr,1fr,1fr] gap-2">
          {/* col 1 */}
          <div className="flex flex-col gap-1.5">
            <div className="grid grid-cols-[64px,1fr] gap-1.5">
              <div>{ABILITIES.map((k) => {
                const bonus = sheet.backgroundIncreases[k] ?? 0
                return (
                  <div key={k} className="cs-ab">
                    <div className="nm">{ABILITY_RU[k]}</div>
                    <div className="md">{formatMod(v.mods[k])}</div>
                    <div className="sc"><input type="number" value={v.finalAbilities[k]} onChange={(e) => set({ baseAbilities: { ...sheet.baseAbilities, [k]: clamp(+e.target.value - bonus, 1, 30) } })} /></div>
                  </div>
                )
              })}</div>
              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <label className="cs-mini" style={{ cursor: 'pointer' }}><div className="v"><input type="checkbox" checked={!!sheet.inspiration} onChange={(e) => set({ inspiration: e.target.checked })} style={{ width: 'auto' }} /></div><span className="cs-pl">{t('cc.isheet.inspiration')}</span></label>
                  <Mini label={t('cc.isheet.proficiencyBonus')}><span>{formatMod(v.proficiencyBonus)}</span></Mini>
                </div>
                <Panel label={t('cc.isheet.savingThrows')}>{v.saves.map((s) => <ProfLine key={s.ability} on={s.proficient} onToggle={() => toggleSave(s.ability, s.proficient)} mod={s.bonus} name={ABILITY_RU[s.ability]} />)}</Panel>
                <Panel label={t('cc.isheet.skills')}>{v.skills.map((s) => <ProfLine key={s.skill} on={s.proficient} onToggle={() => toggleSkill(s.skill, s.proficient)} mod={s.bonus} name={s.expert ? `${s.skill} ✦` : s.skill} sub={ABILITY_ABBR[s.ability]} title={SKILL_DESC[s.skill].play} />)}</Panel>
                <Mini label={t('cc.isheet.passivePerception')}><span>{v.passivePerception}</span></Mini>
              </div>
            </div>
            <Panel label={t('cc.isheet.otherProficienciesLanguages')} className="cs-grow flex-1">
              {v.proficienciesText && <div className="areabox" style={{ whiteSpace: 'pre-line', marginBottom: 2, fontSize: 9.5 }}>{v.proficienciesText}</div>}
              <MarkupField className="areabox cs-growbody" value={sheet.otherProficiencies ?? ''} onChange={(t) => set({ otherProficiencies: t })} placeholder={t('cc.isheet.otherProficienciesPlaceholder')} readOnly={readOnly} />
            </Panel>
          </div>

          {/* col 2 */}
          <div className="flex flex-col gap-1.5">
            <div className="grid grid-cols-3 items-stretch gap-1.5">
              <div className="cs-shield"><svg viewBox="0 0 74 84"><path d="M4 7 H70 V50 Q70 76 37 82 Q4 76 4 50 Z" fill="none" stroke="#000" strokeWidth="1.5" /></svg><div className="v"><input type="number" value={sheet.armorClass ?? v.derivedAC} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => set({ armorClass: e.target.value === '' ? undefined : +e.target.value })} title={sheet.armorClass != null ? t('cc.isheet.acManualTitle', { n: v.derivedAC }) : t('cc.isheet.acAutoTitle', { n: v.derivedAC })} /></div>{!readOnly && sheet.armorClass != null && sheet.armorClass !== v.derivedAC && <button onClick={() => set({ armorClass: undefined })} title={t('cc.isheet.acResetTitle', { n: v.derivedAC })} style={{ position: 'absolute', top: 2, right: 2, fontSize: 10, color: '#7a1414' }}>↺</button>}<span className="cs-pl">{t('cc.isheet.armorClass')}</span></div>
              <div className="cs-mini" style={{ minHeight: 84, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div className="v" style={{ fontSize: 22 }}>{formatMod(v.initiative)}</div><span className="cs-pl">{t('cc.isheet.initiative')}</span></div>
              <div className="cs-mini" style={{ minHeight: 84, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div className="v" style={{ fontSize: 22 }}><input type="number" value={sheet.speed ?? v.speed} onChange={(e) => set({ speed: e.target.value === '' ? undefined : +e.target.value })} style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }} /></div><span className="cs-pl">{t('cc.isheet.speed')}</span></div>
            </div>
            <Panel label={t('cc.isheet.hp')}><div className="flex items-center justify-end gap-1 text-[8px] text-black/50">{t('cc.isheet.max')} <input type="number" value={sheet.maxHp || ''} onChange={(e) => set({ maxHp: +e.target.value || 0 })} style={{ width: 36, fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid #000' }} /></div><input type="number" value={sheet.currentHp ?? ''} onChange={(e) => set({ currentHp: e.target.value === '' ? undefined : +e.target.value })} style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }} /></Panel>
            <div className="grid grid-cols-3 gap-1.5">
              <Panel label={t('cc.isheet.tempHp')}><input type="number" value={sheet.tempHp ?? ''} onChange={(e) => set({ tempHp: e.target.value === '' ? undefined : +e.target.value })} style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }} /></Panel>
              {v.hitDie ? <Mini label={t('cc.isheet.hitDice')}><span>{sheet.level}{v.hitDie}</span></Mini> : <div className="cs-mini"><div className="v"><input value={sheet.manualHitDice ?? ''} onChange={(e) => set({ manualHitDice: e.target.value })} style={{ textAlign: 'center', fontSize: 13 }} placeholder="5к10" /></div><span className="cs-pl">{t('cc.isheet.hitDice')}</span></div>}
              <Panel label={t('cc.isheet.deathSaves')}><Death label="✓" count={sheet.deathSuccesses ?? 0} onSet={(n) => set({ deathSuccesses: n })} /><Death label="✗" count={sheet.deathFailures ?? 0} onSet={(n) => set({ deathFailures: n })} /></Panel>
            </div>
            <Panel label={t('cc.isheet.myAttacks')}>
              <table className="cs-atk"><thead><tr><th style={{ textAlign: 'left' }}>{t('cc.isheet.attackName')}</th><th>{t('cc.isheet.attackBonus')}</th><th style={{ textAlign: 'left' }}>{t('cc.isheet.attackDamageType')}</th></tr></thead>
                <tbody>
                  {v.attacks.map((a, i) => <tr key={i}><td>{a.name}{a.mastery && <span className="sub"> · {a.mastery}</span>}</td><td className="c">{formatMod(a.bonus)}</td><td>{a.damage}</td></tr>)}
                  {manualAttacks.map((a) => (
                    <tr key={a.id}>
                      <td><input value={a.name} onChange={(e) => set({ manualAttacks: manualAttacks.map((x) => (x.id === a.id ? { ...x, name: e.target.value } : x)) })} /></td>
                      <td className="c"><input type="number" value={a.bonus ?? ''} onChange={(e) => set({ manualAttacks: manualAttacks.map((x) => (x.id === a.id ? { ...x, bonus: e.target.value === '' ? undefined : +e.target.value } : x)) })} style={{ width: 32, textAlign: 'center' }} /></td>
                      <td><input value={a.damage ?? ''} onChange={(e) => set({ manualAttacks: manualAttacks.map((x) => (x.id === a.id ? { ...x, damage: e.target.value } : x)) })} /> {!readOnly && <button onClick={() => set({ manualAttacks: manualAttacks.filter((x) => x.id !== a.id) })} style={{ color: '#a00' }}>✕</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!readOnly && <button onClick={() => set({ manualAttacks: [...manualAttacks, { id: uid('atk'), name: '' }] })} className="mt-0.5 text-[10px] hover:underline" style={{ color: '#7a5b16' }}>{t('cc.isheet.addAttack')}</button>}
            </Panel>
            <Panel label={t('cc.isheet.equipment')} className="cs-grow flex-1">
              <div className="mb-1 grid grid-cols-5 gap-1">
                {(['cp', 'sp', 'ep', 'gp', 'pp'] as const).map((key) => {
                  const lbl = t(`cc.isheet.coin_${key}`)
                  return <label key={key} className="flex flex-col items-center text-[7px] uppercase text-black/50">{lbl}<input type="number" value={coins[key] ?? ''} onChange={(e) => set({ coins: { ...coins, [key]: e.target.value === '' ? undefined : +e.target.value } })} className="w-full rounded border border-black/30 text-center text-[10px]" /></label>
                })}
              </div>
              {itemLines && <div className="areabox" style={{ whiteSpace: 'pre-line', marginBottom: 2 }}>{itemLines}</div>}
              <MarkupField className="areabox cs-growbody" value={sheet.inventory ?? ''} onChange={(t) => set({ inventory: t })} placeholder={t('cc.isheet.inventoryPlaceholder')} readOnly={readOnly} />
            </Panel>
          </div>

          {/* col 3 */}
          <div className="flex flex-col gap-1.5">
            <Panel label={t('cc.isheet.personality')}><MarkupField className="areabox" rows={2} value={sheet.personality ?? ''} onChange={(t) => set({ personality: t })} readOnly={readOnly} /></Panel>
            <Panel label={t('cc.isheet.ideals')}><MarkupField className="areabox" rows={2} value={sheet.ideals ?? ''} onChange={(t) => set({ ideals: t })} readOnly={readOnly} /></Panel>
            <Panel label={t('cc.isheet.bonds')}><MarkupField className="areabox" rows={2} value={sheet.bonds ?? ''} onChange={(t) => set({ bonds: t })} readOnly={readOnly} /></Panel>
            <Panel label={t('cc.isheet.flaws')}><MarkupField className="areabox" rows={2} value={sheet.flaws ?? ''} onChange={(t) => set({ flaws: t })} readOnly={readOnly} /></Panel>
            <Panel label={t('cc.isheet.featuresTraits')} className="cs-grow flex-1">
              <div className="cs-growbody overflow-auto">
                {Math.max(0, v.featSlots - (sheet.chosenFeatIds?.length ?? 0)) > 0 && <p className="mb-1 text-[10px]"><i>{t('cc.isheet.featsRemaining', { n: Math.max(0, v.featSlots - (sheet.chosenFeatIds?.length ?? 0)) })}</i></p>}
                <div className="space-y-1 text-[10px] leading-snug">{v.featuresPage1.map((f, i) => <p key={i}><b>{f.name}{f.level ? ` (${t('cc.isheet.levelSuffix', { n: f.level })})` : ''}.</b> {f.desc}</p>)}</div>
                {v.featuresPage2.length > 0 && <p className="mt-1 text-[9px] italic text-black/40">{t('cc.isheet.moreOnPage2', { n: v.featuresPage2.length })}</p>}
                <MarkupField className="areabox mt-1" rows={3} value={sheet.manualFeatures ?? ''} onChange={(t) => set({ manualFeatures: t })} placeholder={t('cc.isheet.manualFeaturesPlaceholder')} readOnly={readOnly} />
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* ============ PAGE 2 ============ */}
      <div className="cs-page" style={{ display: 'flex', flexDirection: 'column' }}>
        <Corners />
        <div className="cs-pgnum"><span>{t('cc.isheet.page2Header')}</span><span>{t('cc.isheet.page2of4')}</span></div>
        <div className="grid grid-cols-[200px,1fr] gap-1.5">
          <Fld label={t('cc.isheet.characterName')}><input value={sheet.name} onChange={(e) => set({ name: e.target.value })} /></Fld>
          <div className="grid grid-cols-3 gap-1.5">
            <Fld label={t('cc.isheet.age')}><input value={sheet.age ?? ''} onChange={(e) => set({ age: e.target.value })} /></Fld>
            <Fld label={t('cc.isheet.height')}><input value={sheet.height ?? ''} onChange={(e) => set({ height: e.target.value })} /></Fld>
            <Fld label={t('cc.isheet.weight')}><input value={sheet.weight ?? ''} onChange={(e) => set({ weight: e.target.value })} /></Fld>
            <Fld label={t('cc.isheet.eyes')}><input value={sheet.eyes ?? ''} onChange={(e) => set({ eyes: e.target.value })} /></Fld>
            <Fld label={t('cc.isheet.skin')}><input value={sheet.skin ?? ''} onChange={(e) => set({ skin: e.target.value })} /></Fld>
            <Fld label={t('cc.isheet.hair')}><input value={sheet.hair ?? ''} onChange={(e) => set({ hair: e.target.value })} /></Fld>
          </div>
        </div>
        <div className="mt-2 grid flex-1 grid-cols-2 grid-rows-2 gap-2">
          <Panel label={t('cc.isheet.appearance')} className="cs-grow"><MarkupField className="areabox cs-growbody" value={sheet.appearance ?? ''} onChange={(t) => set({ appearance: t })} readOnly={readOnly} /></Panel>
          <Panel label={t('cc.isheet.treasure')} className="cs-grow"><MarkupField className="areabox cs-growbody" value={sheet.treasure ?? ''} onChange={(t) => set({ treasure: t })} readOnly={readOnly} /></Panel>
          <Panel label={t('cc.isheet.backstory')} className="cs-grow"><MarkupField className="areabox cs-growbody" value={sheet.backstory ?? ''} onChange={(t) => set({ backstory: t })} readOnly={readOnly} /></Panel>
          <div className="flex flex-col gap-2">
            <Panel label={t('cc.isheet.additionalFeatures')} className="cs-grow flex-1">
              {v.featuresPage2.length > 0 && <div className="mb-1 space-y-1 text-[10px] leading-snug">{v.featuresPage2.map((f, i) => <p key={i}><b>{f.name}{f.level ? ` (${t('cc.isheet.levelSuffix', { n: f.level })})` : ''}.</b> {f.desc}</p>)}</div>}
              <MarkupField className="areabox cs-growbody" value={sheet.additionalFeatures ?? ''} onChange={(t) => set({ additionalFeatures: t })} placeholder={t('cc.isheet.additionalFeaturesPlaceholder')} readOnly={readOnly} />
            </Panel>
            <Panel label={t('cc.isheet.alliesOrganizations')} className="cs-grow flex-1"><MarkupField className="areabox cs-growbody" value={sheet.allies ?? ''} onChange={(t) => set({ allies: t })} readOnly={readOnly} /></Panel>
          </div>
        </div>
      </div>

      {/* ============ PAGE 3 ============ */}
      <div className="cs-page" style={{ display: 'flex', flexDirection: 'column' }}>
        <Corners />
        <div className="cs-pgnum"><span>{t('cc.isheet.notes')}</span><span>{t('cc.isheet.page3of4')}</span></div>
        <Panel label={t('cc.isheet.notes')} className="cs-grow flex-1"><MarkupField className="areabox cs-growbody" value={sheet.notes ?? ''} onChange={(t) => set({ notes: t })} placeholder={t('cc.isheet.notesPlaceholder')} readOnly={readOnly} /></Panel>
      </div>

      {/* ============ PAGE 4 ============ */}
      <div className="cs-page" style={{ display: 'flex', flexDirection: 'column' }}>
        <Corners />
        <div className="cs-pgnum"><span>{t('cc.isheet.spells')}</span><span>{t('cc.isheet.page4of4')}</span></div>
        <div className="grid grid-cols-[1fr,140px,110px,110px] gap-1.5">
          <Fld label={t('cc.isheet.spellcastingClass')}><input value={sc.className ?? v.className} onChange={(e) => set({ spellcasting: { ...sc, className: e.target.value } })} /></Fld>
          <Fld label={t('cc.isheet.spellcastingAbility')}><select value={spAb ?? ''} onChange={(e) => set({ spellcasting: { ...sc, ability: (e.target.value || undefined) as AbilityKey } })}><option value="">—</option>{ABILITIES.map((k) => <option key={k} value={k}>{ABILITY_RU[k]}</option>)}</select></Fld>
          <MiniNum label={t('cc.isheet.spellSaveDC')} value={sc.saveDC ?? autoDC} onChange={(n) => set({ spellcasting: { ...sc, saveDC: n } })} />
          <MiniNum label={t('cc.isheet.spellAttackBonus')} value={sc.attackBonus ?? autoAtk} onChange={(n) => set({ spellcasting: { ...sc, attackBonus: n } })} />
        </div>
        {v.grantedSpells.length > 0 && <p className="mt-1 text-[10px] text-black/70"><b>{t('cc.isheet.grantedSpellsLabel')}</b> {v.grantedSpells.join(', ')}.</p>}
        <div className="mt-2 grid flex-1 grid-cols-3 gap-2" style={{ gridTemplateRows: 'repeat(4, 1fr)' }}>
          <div className="cs-panel flex flex-col">
            <div className="cs-fill">
              {v.grantedCantrips.map((c, i) => <div key={`gc${i}`} className="cs-spline"><span style={{ flex: 1, fontStyle: 'italic' }}>{c}</span></div>)}
              <SpellLines lines={sc.cantrips ?? []} count={Math.max(4, 12 - v.grantedCantrips.length)} onLine={(i, p) => set({ spellcasting: { ...sc, cantrips: padLines(sc.cantrips, i, p) } })} />
            </div>
            <span className="cs-pl">{t('cc.isheet.cantrips')}</span>
          </div>
          <div className="cs-panel flex flex-col" style={{ gridColumn: '2 / 4' }}>
            <MarkupField className="areabox" style={{ flex: 1 }} value={sheet.magicItems ?? ''} onChange={(t) => set({ magicItems: t })} placeholder={t('cc.isheet.magicItemsPlaceholder')} readOnly={readOnly} />
            <span className="cs-pl">{t('cc.isheet.magicItems')}</span>
          </div>
          {Array.from({ length: 9 }, (_, i) => {
            const lvl = i + 1
            const cur = (sc.levels ?? [])[i] ?? {}
            return (
              <div key={lvl} className="cs-panel flex flex-col">
                <div className="mb-0.5 flex items-center gap-1 text-[8px] uppercase text-black/50">
                  <b className="text-[9px]">{t('cc.isheet.levelSuffix', { n: lvl })}</b>
                  <span className="ml-auto flex items-center gap-0.5">{t('cc.isheet.slotsAbbr')}<input type="number" value={cur.total ?? ''} onChange={(e) => setLevelSlot(i, { total: e.target.value === '' ? undefined : +e.target.value })} style={{ width: 20, borderBottom: '1px solid #000', textAlign: 'center' }} /></span>
                  <span className="flex items-center gap-0.5">{t('cc.isheet.usedAbbr')}<input type="number" value={cur.used ?? ''} onChange={(e) => setLevelSlot(i, { used: e.target.value === '' ? undefined : +e.target.value })} style={{ width: 20, borderBottom: '1px solid #000', textAlign: 'center' }} /></span>
                </div>
                <div className="cs-fill" style={{ flex: 1 }}><SpellLines lines={cur.lines ?? []} count={14} onLine={(li, p) => setLevelLine(i, li, p)} /></div>
                <span className="cs-pl">{t('cc.isheet.levelLabel', { n: lvl })}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---- helpers ----
function clamp(n: number, lo: number, hi: number): number {
  return Number.isNaN(n) ? lo : Math.max(lo, Math.min(hi, n))
}
function padLines(lines: SpellLine[] | undefined, i: number, patch: Partial<SpellLine>): SpellLine[] {
  const next = [...(lines ?? [])]
  while (next.length <= i) next.push({})
  next[i] = { ...next[i], ...patch }
  return next
}
function Corners(): JSX.Element {
  return (
    <>
      {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
        <span key={c} className={`cs-corner ${c}`}>
          <svg viewBox="0 0 30 30"><path d="M3 27 C3 13 13 3 27 3" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M3 21 C3 11 11 3 21 3" fill="none" stroke="currentColor" strokeWidth="0.6" /><circle cx="6.5" cy="6.5" r="1.8" fill="currentColor" /></svg>
        </span>
      ))}
    </>
  )
}
function SpellLines({ lines, count, onLine }: { lines: SpellLine[]; count: number; onLine: (i: number, patch: Partial<SpellLine>) => void }): JSX.Element {
  const { t } = useTranslation()
  return (
    <>
      {Array.from({ length: Math.max(count, lines.length) }, (_, i) => {
        const ln = lines[i] ?? {}
        return (
          <div key={i} className="cs-spline">
            <input value={ln.name ?? ''} onChange={(e) => onLine(i, { name: e.target.value })} />
            <span className="circles">{(['v', 's', 'm', 'r', 'c'] as const).map((kk) => <button key={kk} type="button" className={`cs-cir ${ln[kk] ? 'on' : ''}`} title={t(`cc.isheet.circleTitle_${kk}`)} onClick={() => onLine(i, { [kk]: !ln[kk] })}>{t(`cc.isheet.circleLabel_${kk}`)}</button>)}</span>
          </div>
        )
      })}
    </>
  )
}

function Panel({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }): JSX.Element {
  return <div className={`cs-panel ${className}`}>{children}<span className="cs-pl">{label}</span></div>
}
/** Free-text field with **жирный** / *курсив* / __подчёркнутый__ markup: shows
 *  formatted text, switches to a textarea on click. Markup renders in print too. */
function MarkupField({ value, onChange, placeholder, className = '', rows, readOnly, style }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; rows?: number; readOnly?: boolean; style?: CSSProperties }): JSX.Element {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  // `rows`-sized fields (traits, ideals…) stay at that many lines and grow to fit
  // the text as you type; fill fields (no rows) keep filling their panel.
  const grow = rows != null
  const minHeight = rows ? rows * 14 : undefined
  const autosize = (el: HTMLTextAreaElement): void => {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }
  useEffect(() => {
    if (editing && grow && ref.current) autosize(ref.current)
  }, [editing, grow])
  if (editing && !readOnly) {
    return (
      <textarea
        ref={ref}
        autoFocus
        className={className}
        style={{ minHeight, ...(grow ? { overflow: 'hidden', resize: 'none' } : {}), ...style }}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          if (grow) autosize(e.target)
        }}
        onBlur={() => setEditing(false)}
        placeholder={placeholder}
      />
    )
  }
  const html = markupToHtml(value)
  return (
    <div className={`${className} cursor-text`} style={{ whiteSpace: 'pre-line', minHeight, ...style }} onClick={() => !readOnly && setEditing(true)}>
      {html ? <span dangerouslySetInnerHTML={{ __html: html }} /> : <span style={{ color: '#bbb' }}>{readOnly ? '' : placeholder ?? ''}</span>}
    </div>
  )
}
function Fld({ label, children }: { label: string; children: ReactNode }): JSX.Element {
  return <div className="cs-fld">{children}<span className="cs-pl">{label}</span></div>
}
function Mini({ label, children }: { label: string; children: ReactNode }): JSX.Element {
  return <div className="cs-mini"><div className="v">{children}</div><span className="cs-pl">{label}</span></div>
}
function MiniNum({ label, value, onChange }: { label: string; value: number | undefined; onChange: (n: number | undefined) => void }): JSX.Element {
  return <div className="cs-mini"><div className="v"><input type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? undefined : +e.target.value)} /></div><span className="cs-pl">{label}</span></div>
}
function ProfLine({ on, onToggle, mod, name, sub, title }: { on: boolean; onToggle: () => void; mod: number; name: string; sub?: string; title?: string }): JSX.Element {
  return <div className="cs-line" title={title}><span className={`cs-bub ${on ? 'on' : ''}`} onClick={onToggle} /><span className="cs-mod">{formatMod(mod)}</span><span className="nm">{name}</span>{sub && <span className="sub">{sub}</span>}</div>
}
function Death({ label, count, onSet }: { label: string; count: number; onSet: (n: number) => void }): JSX.Element {
  return <div className="cs-death"><span style={{ width: 14, color: '#555' }}>{label}</span><span className="bubs">{[1, 2, 3].map((i) => <span key={i} className={`cs-bub ${count >= i ? 'on' : ''}`} onClick={() => onSet(count >= i ? i - 1 : i)} />)}</span></div>
}
