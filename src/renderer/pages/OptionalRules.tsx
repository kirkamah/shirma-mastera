import { useEffect, useMemo, useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import {
  GiTrashCan,
  GiScrollQuill,
  GiQuillInk,
  GiDiceTwentyFacesTwenty,
  GiSpellBook,
  GiCrossedSwords,
  GiCompass,
  GiCampCookingPot,
  GiRollingDices
} from 'react-icons/gi'
import PageFrame from '../components/PageFrame'
import DiceText from '../components/DiceText'
import FormatHelp from '../components/FormatHelp'
import CustomFormDialog, { type FormField, type FormValues } from '../components/CustomFormDialog'
import { useCustom } from '../hooks/useCustom'
import { useNav } from '../store/nav'
import { confirmDialog } from '../store/dialog'
import { uid } from '../utils/monster'
import {
  RULE_CATEGORIES,
  rulesFor,
  ruleCategoryLabel,
  type OptionalRule,
  type RuleBlock
} from '../data/optional-rules'

/** Stored shape of a homebrew rule entry. */
interface CustomRule {
  key: string
  name: string
  tag?: string
  desc: string
}

const CUSTOM_CATEGORY = 'Мои правила'

/** Icon shown on each category tab (keyed by the RU category label). */
const CATEGORY_ICONS: Record<string, IconType> = {
  'Основы и развитие': GiDiceTwentyFacesTwenty,
  'Бой и движение': GiCrossedSwords,
  'Магия': GiSpellBook,
  'Окружение и отдых': GiCompass,
  'Ремёсла и лагерь': GiCampCookingPot,
  'Азартные игры': GiRollingDices,
  [CUSTOM_CATEGORY]: GiQuillInk
}
const CATEGORY_TABS: string[] = [...RULE_CATEGORIES, CUSTOM_CATEGORY]

/** A table rendered as a page of a tome, with a clickable header that collapses
 *  the body — handy for very long tables. */
function TableBlock({ block, label }: { block: Extract<RuleBlock, { type: 'table' }>; label: string }): JSX.Element {
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)
  // Centre columns whose every cell is short (numbers, СЛ, выплаты); keep prose left-aligned.
  const aligns = block.head.map((_, ci) =>
    block.rows.every((r) => (r[ci]?.trim().length ?? 0) <= 8) ? 'text-center' : 'text-left'
  )
  return (
    <div className="overflow-hidden rounded-lg border border-ink-brown/30 bg-parchment-dark/20 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 bg-accent/15 px-3 py-1.5 text-left font-serif text-[12px] uppercase tracking-wide text-accent/80 transition-colors hover:bg-accent/25 ${
          open ? 'border-b border-ink-brown/20' : ''
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="text-[10px]">{open ? '▼' : '►'}</span>
          {block.caption ?? t('rules.tableFallback')}
        </span>
        <span className="text-[10px] font-normal normal-case tracking-normal text-ink-brown/50">
          {open ? t('rules.collapse') : `${block.rows.length} ${t('rules.rowsLabel')}`}
        </span>
      </button>
      {open && (
        <table className="w-full border-collapse text-[14px] leading-snug">
          <thead>
            <tr className="border-b-2 border-accent/30 bg-accent/10 font-serif text-[11px] uppercase tracking-wider text-accent/80">
              {block.head.map((h, i) => (
                <th key={i} className={`px-3 py-1.5 ${aligns[i]}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-ink-brown">
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-t border-ink-brown/10 even:bg-ink-brown/[0.04]">
                {row.map((cell, ci) => {
                  // A cell that is just a number, a number range or a signed modifier
                  // (СЛ "+2", "−5", die roll "2–12") is rendered plain — otherwise
                  // DiceText would turn "+2" into a clickable d20 roll.
                  const plain = /^[+−-]?\d+(\s*[–−-]\s*\d+)?$/.test(cell.trim())
                  return (
                    <td
                      key={ci}
                      className={`px-3 py-1.5 align-top ${aligns[ci]} ${ci === 0 ? 'font-semibold text-accent/90' : ''}`}
                    >
                      {plain ? cell : <DiceText text={cell} label={label} />}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

/** Renders one structured block of a built-in rule, styled like a page of a tome. */
function Block({ block, label, dropCap }: { block: RuleBlock; label: string; dropCap?: boolean }): JSX.Element {
  const { t } = useTranslation()
  switch (block.type) {
    case 'h':
      return (
        <h3 className="tome-heading mt-5 font-serif text-xl font-semibold uppercase tracking-wide">{block.text}</h3>
      )
    case 'p':
      return (
        <p className={`whitespace-pre-line text-[15px] leading-relaxed text-ink-brown ${dropCap ? 'drop-cap' : ''}`}>
          <DiceText text={block.text} label={label} />
        </p>
      )
    case 'list':
      return (
        <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-brown">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent/60" aria-hidden />
              <span>
                <DiceText text={it} label={label} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'note':
      return (
        <div className="rounded-md border border-gold/40 bg-gold/10 px-4 py-3 shadow-sm">
          <div className="mb-1 flex items-center gap-1.5 font-serif text-[11px] font-semibold uppercase tracking-widest text-accent/80">
            <GiQuillInk className="shrink-0" /> {t('rules.gmNote')}
          </div>
          <p className="text-[14px] italic leading-relaxed text-ink-brown/90">
            <DiceText text={block.text} label={label} />
          </p>
        </div>
      )
    case 'table':
      return <TableBlock block={block} label={label} />
  }
}

function RuleDetail({ rule }: { rule: OptionalRule }): JSX.Element {
  const { t } = useTranslation()
  // Only the very first paragraph gets the illuminated drop-cap.
  const firstParaIdx = rule.blocks.findIndex((b) => b.type === 'p')
  return (
    <article className="tome-page parchment-texture tome-border relative mx-auto max-w-3xl rounded-lg p-6 shadow-panel sm:p-8">
      <header className="text-center">
        {rule.homebrew && (
          <span className="mb-2 inline-block rounded-full border border-gold/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            {t('rules.homebrew')}
          </span>
        )}
        {rule.official && (
          <span className="mb-2 inline-block rounded-full border border-emerald-700/50 bg-emerald-700/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-800">
            {t('rules.official')}
          </span>
        )}
        <h2 className="font-serif text-4xl font-bold leading-tight text-accent">{rule.name}</h2>
        {rule.tag && <p className="mt-1 text-sm italic text-ink-brown/70">{rule.tag}</p>}
      </header>
      <hr className="fleuron" />
      <div className="space-y-3">
        {rule.blocks.map((b, i) => (
          <Block key={i} block={b} label={rule.name} dropCap={i === firstParaIdx} />
        ))}
      </div>
    </article>
  )
}

export default function OptionalRules(): JSX.Element {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { items: rules, save, remove } = useCustom<CustomRule>('rule')
  const [editing, setEditing] = useState<{ key: string | null; values: FormValues } | null>(null)
  const [cat, setCat] = useState<string>(RULE_CATEGORIES[0])
  const builtins = useMemo(() => rulesFor(lang), [lang])
  const [selectedId, setSelectedId] = useState<string>(builtins[0]?.id ?? '')
  const pending = useNav((s) => s.pending)
  const clearPending = useNav((s) => s.clear)

  const RULE_FIELDS: FormField[] = [
    { key: 'name', label: t('rules.fName'), placeholder: t('rules.fNamePh') },
    { key: 'tag', label: t('rules.fTag'), placeholder: t('rules.fTagPh') },
    { key: 'desc', label: t('rules.fDesc'), type: 'textarea' }
  ]

  // Selection from global search: jump to the rule's category tab, then select it.
  useEffect(() => {
    if (pending?.section !== 'rules') return
    const b = builtins.find((r) => r.id === pending.key)
    setCat(b ? b.category : CUSTOM_CATEGORY)
    setSelectedId(pending.key)
    clearPending()
  }, [pending, clearPending, builtins])

  const builtin = useMemo(() => builtins.find((r) => r.id === selectedId) ?? null, [builtins, selectedId])
  const customSelected = useMemo(() => rules.find((r) => r.key === selectedId) ?? null, [rules, selectedId])

  // Items shown in the sidebar for the active tab.
  const list = useMemo(
    () =>
      cat === CUSTOM_CATEGORY
        ? rules.map((r) => ({ id: r.key, name: r.name, tag: r.tag }))
        : builtins.filter((r) => r.category === cat).map((r) => ({ id: r.id, name: r.name, tag: r.tag })),
    [cat, rules, builtins]
  )

  const pickCat = (c: string): void => {
    setCat(c)
    const first = c === CUSTOM_CATEGORY ? rules[0]?.key : builtins.find((r) => r.category === c)?.id
    setSelectedId(first ?? '')
  }

  const handleAdd = (): void => setEditing({ key: null, values: { name: '', tag: '', desc: '' } })

  return (
    <PageFrame
      title={t('rules.title')}
      subtitle={t('rules.subtitle')}
      actions={
        <button
          onClick={handleAdd}
          className="rounded bg-accent px-3 py-1.5 text-sm font-semibold text-parchment hover:bg-accent/80"
        >
          {t('rules.addBtn')}
        </button>
      }
    >
      <div className="mb-2 flex flex-wrap gap-1">
        {CATEGORY_TABS.map((c) => {
          const Icon = CATEGORY_ICONS[c]
          return (
            <button
              key={c}
              onClick={() => pickCat(c)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
                cat === c ? 'bg-accent text-parchment' : 'border border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
              }`}
            >
              {Icon && <Icon className="text-base" />} {ruleCategoryLabel(c, lang)}
            </button>
          )
        })}
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        <div className="w-64 shrink-0 overflow-y-auto rounded-lg border border-ink-brown/20 bg-parchment-dark/30">
          <ul className="divide-y divide-ink-brown/10">
            {list.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full px-3 py-2 text-left font-serif transition-colors ${
                    selectedId === r.id ? 'bg-accent/20 text-accent' : 'text-ink-brown/90 hover:bg-black/5'
                  }`}
                >
                  {r.name}
                  {r.tag && <span className="mt-0.5 block text-[11px] italic text-ink-brown/60">{r.tag}</span>}
                </button>
              </li>
            ))}
          </ul>
          {cat === CUSTOM_CATEGORY && rules.length === 0 && (
            <p className="px-3 py-2 text-[11px] italic leading-snug text-ink-brown/40">
              {t('rules.customEmpty')}
            </p>
          )}
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto pr-1">
          {builtin ? (
            <RuleDetail rule={builtin} />
          ) : customSelected ? (
            <article className="tome-page parchment-texture tome-border relative mx-auto max-w-3xl rounded-lg p-6 shadow-panel sm:p-8">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-serif text-4xl font-bold leading-tight text-accent">{customSelected.name}</h2>
                  {customSelected.tag && <p className="mt-1 text-sm italic text-ink-brown/70">{customSelected.tag}</p>}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() =>
                      setEditing({
                        key: customSelected.key,
                        values: { name: customSelected.name, tag: customSelected.tag ?? '', desc: customSelected.desc }
                      })
                    }
                    title={t('common.edit')}
                    className="rounded border border-accent/50 px-2 py-1 text-xs text-accent hover:bg-accent/10"
                  >
                    ✎
                  </button>
                  <button
                    onClick={async () => {
                      if (await confirmDialog({ title: t('rules.deleteTitle'), message: t('rules.deleteConfirm', { name: customSelected.name }), danger: true, confirmText: t('rules.deleteBtn') })) {
                        remove(customSelected.key)
                        setSelectedId(rules.find((r) => r.key !== customSelected.key)?.key ?? '')
                      }
                    }}
                    title={t('rules.deleteTitle')}
                    className="rounded border border-accent/40 px-2 py-1 text-xs text-accent hover:bg-accent/10"
                  >
                    <GiTrashCan />
                  </button>
                </div>
              </div>
              <hr className="fleuron" />
              <p className="drop-cap whitespace-pre-line text-[15px] leading-relaxed text-ink-brown">
                <DiceText text={customSelected.desc} label={customSelected.name} />
              </p>
            </article>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-ink-brown/50">
              <GiScrollQuill className="text-6xl text-ink-brown/30" />
              <p className="max-w-md text-sm leading-relaxed">{t('rules.selectPrompt')}</p>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <CustomFormDialog
          title={editing.key === null ? t('rules.newRule') : t('rules.editRule')}
          fields={RULE_FIELDS}
          initial={editing.values}
          allowCopy={editing.key !== null}
          extraContent={<FormatHelp />}
          onSave={(v, mode) => {
            const editKey = editing.key
            const k = mode === 'copy' || editKey === null ? uid('crule') : editKey
            const name =
              mode === 'copy' && !/\(копия\)/i.test(String(v.name))
                ? `${v.name} (копия)`
                : String(v.name || 'Без названия')
            save({ key: k, name, tag: String(v.tag || ''), desc: String(v.desc || '') })
            setCat(CUSTOM_CATEGORY)
            setSelectedId(k)
            setEditing(null)
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </PageFrame>
  )
}
