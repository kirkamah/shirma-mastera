import { useEffect, useRef, useState, type JSX } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GiPaperClip } from 'react-icons/gi'
import StatBlock from '../components/StatBlock'
import FormatHelp from '../components/FormatHelp'
import TagInput from '../components/TagInput'
import { crToDisplay } from '@shared/open5e-mapper'
import type { NamedEntry, StatBlock as SB } from '@shared/types'
import { emptyEntry, emptyStatBlock, statBlockToHtml, uid } from '../utils/monster'
import { parseStatBlock } from '../utils/parseStatBlock'

type EntryKey = 'traits' | 'actions' | 'bonusActions' | 'reactions' | 'legendaryActions'
const ABILS: (keyof SB['abilities'])[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

function Text({
  label,
  value,
  onChange,
  type = 'text'
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
}): JSX.Element {
  return (
    <label className="flex flex-col gap-0.5 text-xs text-parchment/60">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-white/15 bg-ink px-2 py-1 text-sm text-parchment focus:border-accent focus:outline-none"
      />
    </label>
  )
}

export default function MonsterEditor(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { key } = useParams()
  const [m, setM] = useState<SB>(emptyStatBlock())
  const [savedFlash, setSavedFlash] = useState(false)
  const [saveMenuOpen, setSaveMenuOpen] = useState(false)
  const [pasteOpen, setPasteOpen] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const dragItem = useRef<{ list: EntryKey; index: number } | null>(null)

  const importFromText = (): void => {
    if (!pasteText.trim()) return
    const parsed = parseStatBlock(pasteText)
    setM({ ...parsed, key: m.key, imageUrl: m.imageUrl })
    setPasteOpen(false)
    setPasteText('')
  }

  const [habitatPool, setHabitatPool] = useState<string[]>([])

  useEffect(() => {
    const passed = (location.state as { monster?: SB } | null)?.monster
    if (passed) setM(passed)
    else if (key) window.api.db.getMonster(key).then((found) => found && setM(found))
  }, [key, location.state])

  // Collect existing habitats across saved monsters → tag autocomplete pool.
  useEffect(() => {
    window.api.db.listMonsters().then((list) => {
      const set = new Set<string>()
      for (const mon of list) for (const env of mon.environments ?? []) if (env) set.add(env)
      setHabitatPool([...set])
    })
  }, [])

  const set = (patch: Partial<SB>): void => setM((prev) => ({ ...prev, ...patch }))
  const setAbility = (a: keyof SB['abilities'], v: number): void =>
    setM((prev) => ({ ...prev, abilities: { ...prev.abilities, [a]: v } }))
  const setSave = (a: keyof SB['abilities'], v: string): void =>
    setM((prev) => {
      const next = { ...prev.savingThrows }
      if (v === '') delete next[a]
      else next[a] = parseInt(v, 10) || 0
      return { ...prev, savingThrows: next }
    })

  // Dynamic entry lists
  const addEntry = (list: EntryKey): void => set({ [list]: [...m[list], emptyEntry()] } as Partial<SB>)
  const updateEntry = (list: EntryKey, id: string, patch: Partial<NamedEntry>): void =>
    set({ [list]: m[list].map((e) => (e.id === id ? { ...e, ...patch } : e)) } as Partial<SB>)
  const removeEntry = (list: EntryKey, id: string): void =>
    set({ [list]: m[list].filter((e) => e.id !== id) } as Partial<SB>)
  const reorder = (list: EntryKey, from: number, to: number): void => {
    if (to < 0 || to >= m[list].length) return
    const arr = [...m[list]]
    ;[arr[from], arr[to]] = [arr[to], arr[from]]
    set({ [list]: arr } as Partial<SB>)
  }

  // Save either over the same entry (full overwrite — also overrides a built-in
  // monster of the same key in the bestiary) or as a renamed copy, leaving the
  // original untouched.
  const saveAs = async (mode: 'overwrite' | 'copy'): Promise<void> => {
    const isCopy = mode === 'copy'
    const key = isCopy ? uid('custom') : m.key
    const name = isCopy && !/\(копия\)/i.test(m.name) ? `${m.name} (копия)` : m.name
    const toSave: SB = { ...m, key, name, crDisplay: crToDisplay(m.challengeRating), source: 'custom' }
    await window.api.db.saveMonster(toSave)
    setM(toSave)
    setSaveMenuOpen(false)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
  }

  const exportJson = (): void => {
    const blob = new Blob([JSON.stringify(m, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${m.name}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const print = (): void => {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(statBlockToHtml(m))
    w.document.close()
    w.focus()
    w.print()
  }

  const exportPdf = (): void => {
    window.api.exportPdf(statBlockToHtml(m), m.name)
  }

  const entryEditor = (list: EntryKey, title: string): JSX.Element => (
    <div className="rounded border border-white/10 p-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-semibold text-accent">{title}</span>
        <button onClick={() => addEntry(list)} className="rounded bg-accent/70 px-2 text-xs text-white hover:bg-accent">
          + {t('editor.addItem')}
        </button>
      </div>
      <div className="space-y-2">
        {m[list].map((e, i) => (
          <div
            key={e.id}
            draggable
            onDragStart={() => (dragItem.current = { list, index: i })}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={() => {
              if (dragItem.current?.list === list) reorder(list, dragItem.current.index, i)
              dragItem.current = null
            }}
            className="rounded bg-ink/50 p-2"
          >
            <div className="flex items-center gap-1">
              <span className="cursor-grab text-parchment/40" title="Перетащить">
                ⠿
              </span>
              <input
                value={e.name}
                onChange={(ev) => updateEntry(list, e.id, { name: ev.target.value })}
                placeholder={t('editor.itemName')}
                className="min-w-0 flex-1 rounded border border-white/15 bg-ink px-2 py-1 text-sm text-parchment"
              />
              <button onClick={() => reorder(list, i, i - 1)} className="px-1 text-parchment/50 hover:text-parchment">▲</button>
              <button onClick={() => reorder(list, i, i + 1)} className="px-1 text-parchment/50 hover:text-parchment">▼</button>
              <button onClick={() => removeEntry(list, e.id)} className="px-1 text-accent hover:text-red-400">✕</button>
            </div>
            <textarea
              value={e.desc}
              onChange={(ev) => updateEntry(list, e.id, { desc: ev.target.value })}
              placeholder={t('editor.itemDesc')}
              rows={2}
              className="mt-1 w-full rounded border border-white/15 bg-ink px-2 py-1 text-sm text-parchment"
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="text-parchment/60 hover:text-parchment">← </button>
        <h1 className="font-serif text-2xl font-bold text-parchment">{t('editor.title')}</h1>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setPasteOpen(true)} className="inline-flex items-center gap-1.5 rounded border border-gold/50 px-3 py-1.5 text-sm font-semibold text-gold-soft hover:bg-gold/10">
            <GiPaperClip /> Вставить из текста
          </button>
          <div className="relative">
            <button onClick={() => setSaveMenuOpen((v) => !v)} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:bg-accent/80">
              {savedFlash ? '✓ Сохранено' : `${t('editor.save')} ▾`}
            </button>
            {saveMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSaveMenuOpen(false)} />
                <div className="absolute right-0 z-50 mt-1 w-64 overflow-hidden rounded-md border border-accent/40 bg-sidebar p-1 shadow-panel">
                  <button onClick={() => saveAs('overwrite')} className="block w-full rounded px-3 py-2 text-left hover:bg-accent/20">
                    <div className="text-sm font-semibold text-parchment">Перезаписать</div>
                    <div className="text-xs text-parchment/50">Полностью изменить эту запись (заменяет и встроенную в бестиарии)</div>
                  </button>
                  <button onClick={() => saveAs('copy')} className="block w-full rounded px-3 py-2 text-left hover:bg-accent/20">
                    <div className="text-sm font-semibold text-parchment">Сохранить как копию</div>
                    <div className="text-xs text-parchment/50">Создать новую запись «… (копия)», оригинал не трогать</div>
                  </button>
                </div>
              </>
            )}
          </div>
          <button onClick={exportJson} className="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/5">
            {t('editor.exportJson')}
          </button>
          <button onClick={print} className="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/5">
            {t('editor.print')}
          </button>
          <button onClick={exportPdf} className="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/5">
            PDF
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-4">
        {/* Form */}
        <div className="w-1/2 space-y-3 overflow-y-auto pr-2">
          <FormatHelp />
          <div className="grid grid-cols-2 gap-2">
            <Text label={t('common.name')} value={m.name} onChange={(v) => set({ name: v })} />
            <Text label={t('bestiary.alignment')} value={m.alignment} onChange={(v) => set({ alignment: v })} />
            <Text label={t('bestiary.size')} value={m.size} onChange={(v) => set({ size: v })} />
            <Text label={t('bestiary.type')} value={m.type} onChange={(v) => set({ type: v })} />
            <Text label={t('statblock.ac')} value={m.armorClass} type="number" onChange={(v) => set({ armorClass: +v })} />
            <Text label="КД (детали)" value={m.armorDetail ?? ''} onChange={(v) => set({ armorDetail: v })} />
            <Text label={t('statblock.hp')} value={m.hitPoints} type="number" onChange={(v) => set({ hitPoints: +v })} />
            <Text label="Кость хитов (3к6)" value={m.hitDice ?? ''} onChange={(v) => set({ hitDice: v })} />
            <Text label={`${t('bestiary.cr')} (число)`} value={m.challengeRating} type="number" onChange={(v) => set({ challengeRating: +v, crDisplay: crToDisplay(+v) })} />
            <Text label={t('statblock.proficiencyBonus')} value={m.proficiencyBonus ?? 2} type="number" onChange={(v) => set({ proficiencyBonus: +v })} />
          </div>

          <Text label="Портрет (URL картинки, необязательно)" value={m.imageUrl ?? ''} onChange={(v) => set({ imageUrl: v || undefined })} />

          <label className="flex flex-col gap-0.5 text-xs text-parchment/60">
            Описание / внешность (кратко — кто это и как выглядит)
            <textarea
              value={m.flavor ?? ''}
              onChange={(e) => set({ flavor: e.target.value || undefined })}
              rows={2}
              placeholder="Напр.: Громадный косматый гоблиноид; бесшумный убийца, бьющий из темноты."
              className="rounded border border-white/15 bg-ink px-2 py-1 text-sm text-parchment focus:border-accent focus:outline-none"
            />
          </label>

          {/* Speed */}
          <div>
            <div className="mb-1 text-xs text-parchment/60">{t('statblock.speed')} (фт.)</div>
            <div className="grid grid-cols-3 gap-2">
              {(['walk', 'fly', 'swim', 'climb', 'burrow'] as const).map((mode) => (
                <Text
                  key={mode}
                  label={mode}
                  type="number"
                  value={m.speed[mode] ?? 0}
                  onChange={(v) => set({ speed: { ...m.speed, [mode]: +v } })}
                />
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div>
            <div className="mb-1 text-xs text-parchment/60">Характеристики</div>
            <div className="grid grid-cols-6 gap-1">
              {ABILS.map((a) => (
                <Text key={a} label={t('abilities.' + a)} type="number" value={m.abilities[a]} onChange={(v) => setAbility(a, +v)} />
              ))}
            </div>
          </div>

          {/* Saving throws */}
          <div>
            <div className="mb-1 text-xs text-parchment/60">{t('statblock.savingThrows')} (пусто = нет)</div>
            <div className="grid grid-cols-6 gap-1">
              {ABILS.map((a) => (
                <Text
                  key={a}
                  label={t('abilities.' + a)}
                  type="number"
                  value={m.savingThrows[a] ?? ''}
                  onChange={(v) => setSave(a, v)}
                />
              ))}
            </div>
          </div>

          <Text label={t('statblock.damageResistances')} value={m.damageResistances ?? ''} onChange={(v) => set({ damageResistances: v })} />
          <Text label={t('statblock.damageImmunities')} value={m.damageImmunities ?? ''} onChange={(v) => set({ damageImmunities: v })} />
          <Text label={t('statblock.conditionImmunities')} value={m.conditionImmunities ?? ''} onChange={(v) => set({ conditionImmunities: v })} />
          <Text label={t('statblock.senses')} value={m.senses ?? ''} onChange={(v) => set({ senses: v })} />
          <Text label={t('statblock.languages')} value={m.languages ?? ''} onChange={(v) => set({ languages: v })} />
          <TagInput
            label={t('bestiary.habitat')}
            value={m.environments}
            onChange={(next) => set({ environments: next })}
            placeholder="Например: Лес"
            suggestions={habitatPool}
          />

          {entryEditor('traits', t('statblock.traits'))}
          {entryEditor('actions', t('statblock.actions'))}
          {entryEditor('bonusActions', t('statblock.bonusActions'))}
          {entryEditor('reactions', t('statblock.reactions'))}
          {entryEditor('legendaryActions', t('statblock.legendaryActions'))}
        </div>

        {/* Live preview with working Quick Roll */}
        <div className="w-1/2 overflow-y-auto">
          <div className="mb-2 text-xs uppercase tracking-wide text-parchment/40">{t('editor.preview')}</div>
          <StatBlock monster={m} />
        </div>
      </div>

      {pasteOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-6" onClick={() => setPasteOpen(false)}>
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border border-accent/40 bg-sidebar p-4 shadow-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold text-gold-soft">Вставить стат-блок из текста</h2>
              <button onClick={() => setPasteOpen(false)} className="text-parchment/50 hover:text-parchment">✕</button>
            </div>
            <p className="mb-2 text-xs text-parchment/50">
              Вставьте текст стат-блока (имя, размер/тип, КД, хиты, скорость, характеристики, иммунитеты, чувства, языки, опасность и разделы «Особенности / Действия / Бонусные действия / Реакции / Легендарные действия»). Поля распознаются автоматически — после распознавания их можно править.
            </p>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={16}
              placeholder={'Банши [Banshee]\nСредняя? Нежить, Хаотичная Злая\nКласс Защиты 12 Инициатива +2 (12)\nХиты 54 (12к8)\nСкорость 5 футов, Полёта 40 футов (парит)\n…'}
              className="min-h-0 flex-1 rounded border border-white/15 bg-ink p-2 font-mono text-xs text-parchment focus:border-accent focus:outline-none"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => setPasteOpen(false)} className="rounded border border-white/20 px-3 py-1.5 text-sm text-parchment/70 hover:bg-white/5">
                Отмена
              </button>
              <button onClick={importFromText} className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80">
                Распознать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
