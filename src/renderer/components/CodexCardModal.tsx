import { useState, type JSX } from 'react'
import type { CodexEntry, CodexImageAspect } from '@shared/types'
import Modal from './Modal'
import DiceText from './DiceText'
import { ASPECT_CSS, ASPECT_LABEL, DEFAULT_PORTRAIT_ASPECT, exportCardPng } from '../utils/codexCard'
import { fileToScaledDataUrl, pickImageFile } from '../utils/image'
import { alertDialog } from '../store/dialog'

interface Props {
  entry: CodexEntry
  /** Persist a change to the entry (parent saves to DB). */
  onChange: (patch: Partial<CodexEntry>) => void
  onClose: () => void
}

const CARD = {
  parchment: '#efe5cf',
  parchmentDark: '#e3d4b0',
  accent: '#7a1414',
  gold: '#b8893b',
  ink: '#2c2114'
}

/** A single eye toggle that marks a card element visible/hidden to players. */
function HideChip({
  label,
  hidden,
  onToggle
}: {
  label: string
  hidden: boolean
  onToggle: () => void
}): JSX.Element {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
        hidden
          ? 'border-red-600/50 bg-red-600/10 text-red-700'
          : 'border-ink-brown/30 text-ink-brown/80 hover:border-accent/60'
      }`}
      title={hidden ? 'Скрыто от игроков — нажмите, чтобы показать' : 'Видно игрокам — нажмите, чтобы скрыть'}
    >
      <span>{hidden ? '🙈' : '👁'}</span> {label}
    </button>
  )
}

export default function CodexCardModal({ entry, onChange, onClose }: Props): JSX.Element {
  const [busy, setBusy] = useState(false)

  const toggleField = (i: number): void =>
    onChange({ fields: entry.fields.map((f, j) => (j === i ? { ...f, hidden: !f.hidden } : f)) })

  const choosePortrait = async (): Promise<void> => {
    const file = await pickImageFile()
    if (!file) return
    try {
      const src = await fileToScaledDataUrl(file, { maxDim: 640, format: 'png' })
      onChange({ portrait: src })
    } catch (e) {
      await alertDialog((e as Error).message)
    }
  }

  const save = async (): Promise<void> => {
    setBusy(true)
    try {
      await exportCardPng(entry)
    } catch (e) {
      await alertDialog((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const name = entry.hideName ? '???' : entry.name || '???'
  const subtitle = !entry.hideSubtitle && entry.subtitle?.trim() ? entry.subtitle.trim() : ''
  const fields = entry.fields.filter((f) => f.value.trim() && !f.hidden)
  const description = !entry.hideDescription && entry.description.trim() ? entry.description.trim() : ''
  const hasBody = fields.length > 0 || !!description

  return (
    <Modal onClose={onClose} max="max-w-3xl">
      <div className="parchment-texture tome-border rounded-lg p-5 shadow-panel">
        <h2 className="font-serif text-xl font-bold text-accent">Карточка для игроков</h2>
        <p className="mt-0.5 text-xs text-ink-brown/60">
          Скрытые элементы (имя, мотив, секрет, предыстория…) не попадут в PNG. Переключайте 👁, чтобы решить,
          что показать.
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-[1fr,260px]">
          {/* ---- Live preview (mirrors the exported PNG) ---- */}
          <div className="flex justify-center">
            <div
              style={{
                width: 360,
                background: `radial-gradient(circle at 22% 14%, rgba(255,255,255,0.35), transparent 45%), linear-gradient(160deg, ${CARD.parchment}, ${CARD.parchmentDark})`,
                border: `2px solid ${CARD.gold}`,
                boxShadow: 'inset 0 0 0 1px rgba(122,20,20,0.25), inset 0 0 18px rgba(90,60,20,0.18)',
                borderRadius: 12,
                padding: '18px 20px 14px',
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: CARD.ink
              }}
            >
              {entry.portrait && (
                <div
                  style={{
                    width: '100%',
                    aspectRatio: ASPECT_CSS[entry.portraitAspect ?? DEFAULT_PORTRAIT_ASPECT],
                    overflow: 'hidden',
                    borderRadius: 8,
                    border: `2px solid ${CARD.gold}`,
                    marginBottom: 12,
                    background: CARD.parchmentDark
                  }}
                >
                  <img src={entry.portrait} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  lineHeight: 1.05,
                  color: CARD.accent,
                  textAlign: 'center'
                }}
              >
                {name}
              </div>
              {subtitle && (
                <div style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.72, marginTop: 3, fontSize: 13 }}>
                  {subtitle}
                </div>
              )}
              {hasBody && (
                <div
                  style={{
                    height: 1,
                    background: CARD.gold,
                    opacity: 0.6,
                    margin: '12px 0'
                  }}
                />
              )}
              {fields.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <tbody>
                    {fields.map((f, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            color: CARD.accent,
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            paddingRight: 10,
                            verticalAlign: 'top',
                            padding: '3px 10px 3px 0'
                          }}
                        >
                          {f.label}
                        </td>
                        <td style={{ lineHeight: 1.35, padding: '3px 0', verticalAlign: 'top' }}>
                          <DiceText text={f.value} label={entry.name} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {description && (
                <>
                  {fields.length > 0 && <div style={{ height: 1, background: CARD.gold, opacity: 0.45, margin: '10px 0' }} />}
                  <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    <DiceText text={description} label={entry.name} />
                  </div>
                </>
              )}
              <div
                style={{
                  marginTop: 12,
                  textAlign: 'center',
                  fontSize: 9,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: CARD.gold,
                  opacity: 0.8
                }}
              >
                Ширма Мастера
              </div>
            </div>
          </div>

          {/* ---- Controls ---- */}
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-xs font-semibold text-accent">Портрет</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={choosePortrait}
                  className="rounded border border-accent/40 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/10"
                >
                  {entry.portrait ? 'Заменить…' : 'Загрузить…'}
                </button>
                {entry.portrait && (
                  <button
                    onClick={() => onChange({ portrait: undefined })}
                    className="rounded border border-ink-brown/30 px-3 py-1 text-xs text-ink-brown/70 hover:border-red-600/60 hover:text-red-700"
                  >
                    Убрать
                  </button>
                )}
              </div>
              {entry.portrait && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {(['wide', 'square', 'tall'] as CodexImageAspect[]).map((a) => (
                    <button
                      key={a}
                      onClick={() => onChange({ portraitAspect: a })}
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        (entry.portraitAspect ?? DEFAULT_PORTRAIT_ASPECT) === a
                          ? 'bg-accent text-parchment'
                          : 'border border-ink-brown/30 text-ink-brown/70 hover:border-accent/60'
                      }`}
                    >
                      {ASPECT_LABEL[a]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold text-accent">Что показать игрокам</div>
              <div className="flex flex-wrap gap-1.5">
                <HideChip label="Имя" hidden={!!entry.hideName} onToggle={() => onChange({ hideName: !entry.hideName })} />
                {entry.subtitle?.trim() && (
                  <HideChip
                    label="Подзаголовок"
                    hidden={!!entry.hideSubtitle}
                    onToggle={() => onChange({ hideSubtitle: !entry.hideSubtitle })}
                  />
                )}
                {entry.fields.map((f, i) =>
                  f.value.trim() ? (
                    <HideChip key={i} label={f.label} hidden={!!f.hidden} onToggle={() => toggleField(i)} />
                  ) : null
                )}
                {entry.description.trim() && (
                  <HideChip
                    label="Описание"
                    hidden={!!entry.hideDescription}
                    onToggle={() => onChange({ hideDescription: !entry.hideDescription })}
                  />
                )}
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={save}
                disabled={busy}
                className="w-full rounded bg-accent px-3 py-2 text-sm font-semibold text-parchment hover:bg-accent/80 disabled:opacity-60"
              >
                {busy ? 'Сохранение…' : '⬇ Сохранить PNG'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
