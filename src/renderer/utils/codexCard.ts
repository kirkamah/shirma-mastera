// Builds a self-contained, parchment-styled HTML card for a codex entry and
// exports it to PNG via the main-process offscreen renderer. The card is what a
// GM shows players, so anything flagged hidden (name / subtitle / a field like
// «Секрет» / description) is left off the rendered card.
import type { CodexEntry, CodexImageAspect } from '@shared/types'
import { markupToHtml } from './markup'

/** Fixed CSS width of the card; the PNG is rendered at 2× for sharpness. */
export const CARD_WIDTH = 640

/** CSS aspect-ratio per choice, shared by the card export and the live preview. */
export const ASPECT_CSS: Record<CodexImageAspect, string> = {
  wide: '16 / 9',
  square: '1 / 1',
  tall: '3 / 4'
}
export const ASPECT_LABEL: Record<CodexImageAspect, string> = {
  wide: 'Широкий',
  square: '1к1',
  tall: 'Вертикальный'
}
export const DEFAULT_PORTRAIT_ASPECT: CodexImageAspect = 'square'

const C = {
  parchment: '#efe5cf',
  parchmentDark: '#e3d4b0',
  accent: '#7a1414',
  gold: '#b8893b',
  ink: '#2c2114'
}

function esc(s: string | undefined): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Visible fields = a value present and not flagged hidden. */
function visibleFields(entry: CodexEntry): { label: string; value: string }[] {
  return entry.fields.filter((f) => f.value.trim() && !f.hidden).map((f) => ({ label: f.label, value: f.value }))
}

export function codexCardToHtml(entry: CodexEntry): string {
  const name = entry.hideName ? '???' : entry.name || '???'
  const subtitle = !entry.hideSubtitle && entry.subtitle?.trim() ? entry.subtitle.trim() : ''
  const fields = visibleFields(entry)
  const description =
    !entry.hideDescription && entry.description.trim() ? entry.description.trim() : ''

  const portraitAspect = ASPECT_CSS[entry.portraitAspect ?? DEFAULT_PORTRAIT_ASPECT]
  const portrait = entry.portrait
    ? `<div class="portrait" style="aspect-ratio:${portraitAspect}"><img src="${entry.portrait}" alt=""/></div>`
    : ''

  const fieldsHtml = fields.length
    ? `<table class="fields">${fields
        .map(
          (f) =>
            `<tr><td class="fl">${esc(f.label)}</td><td class="fv">${markupToHtml(f.value)}</td></tr>`
        )
        .join('')}</table>`
    : ''

  const descHtml = description
    ? `<div class="rule"></div><div class="desc">${markupToHtml(description)}</div>`
    : ''

  const subtitleHtml = subtitle ? `<div class="subtitle">${esc(subtitle)}</div>` : ''

  return `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{background:transparent}
  body{font-family:Georgia,'Times New Roman',serif;color:${C.ink}}
  .card{
    width:${CARD_WIDTH}px;
    background:
      radial-gradient(circle at 22% 14%, rgba(255,255,255,0.35), transparent 45%),
      linear-gradient(160deg, ${C.parchment}, ${C.parchmentDark});
    border:3px solid ${C.gold};
    box-shadow:inset 0 0 0 1px rgba(122,20,20,0.25), inset 0 0 22px rgba(90,60,20,0.18);
    border-radius:14px;
    padding:22px 26px 18px;
  }
  .portrait{
    width:100%;overflow:hidden;border-radius:10px;
    border:2px solid ${C.gold};margin-bottom:16px;background:${C.parchmentDark};
    box-shadow:inset 0 0 18px rgba(60,40,15,0.35);
  }
  .portrait img{width:100%;height:100%;object-fit:cover;display:block}
  .name{
    font-size:34px;font-weight:bold;line-height:1.05;color:${C.accent};
    text-align:center;letter-spacing:.3px;
  }
  .subtitle{text-align:center;font-style:italic;color:${C.ink};opacity:.72;margin-top:4px;font-size:16px}
  .rule{
    height:14px;margin:14px 0;
    background:
      linear-gradient(${C.gold},${C.gold}) center/100% 2px no-repeat;
    position:relative;
  }
  .rule:after{
    content:"\\2756";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    color:${C.gold};background:${C.parchment};padding:0 10px;font-size:15px;line-height:1;
  }
  .fields{width:100%;border-collapse:collapse;font-size:16.5px}
  .fields td{padding:4px 0;vertical-align:top}
  .fields .fl{color:${C.accent};font-weight:bold;white-space:nowrap;padding-right:14px;width:1px}
  .fields .fv{color:${C.ink};line-height:1.35}
  .desc{font-size:16px;line-height:1.5;white-space:pre-line;color:${C.ink}}
  .brand{
    margin-top:16px;text-align:center;font-size:11px;letter-spacing:1.5px;
    text-transform:uppercase;color:${C.gold};opacity:.8;
  }
</style></head>
<body>
  <div class="card">
    ${portrait}
    <div class="name">${esc(name)}</div>
    ${subtitleHtml}
    ${fields.length || description ? '<div class="rule"></div>' : ''}
    ${fieldsHtml}
    ${descHtml}
    <div class="brand">Ширма Мастера</div>
  </div>
</body></html>`
}

/** Render the player card to a PNG file (opens a save dialog). */
export function exportCardPng(entry: CodexEntry): Promise<unknown> {
  const safeName = (entry.hideName ? 'npc' : entry.name || 'card')
    .replace(/[\\/:*?"<>|]+/g, '_')
    .slice(0, 60)
  return window.api.savePng(codexCardToHtml(entry), CARD_WIDTH, safeName)
}
