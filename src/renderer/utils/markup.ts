// Lightweight markup → HTML for plain formatting (bold / italic / underline /
// colour), matching the «Картотека» syntax. Used where we need formatted HTML
// rather than React nodes — the printable character sheet and any read view.
//   **жирный**  __подчёркнутый__  *курсив*  {красный:текст}
const COLORS: Record<string, string> = {
  красный: '#b91c1c',
  зелёный: '#15803d',
  синий: '#1d4ed8',
  золотой: '#a16207',
  фиолетовый: '#7e22ce',
  серый: '#6b7280'
}

export function markupToHtml(text: string | undefined): string {
  let s = String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // {colour:text}
  s = s.replace(/\{([^:{}]+):([\s\S]+?)\}/g, (_m, c: string, t: string) => {
    const col = COLORS[c.trim().toLowerCase()] || (/^#?[0-9a-f]{3,8}$/i.test(c.trim()) ? c.trim() : '')
    return col ? `<span style="color:${col}">${t}</span>` : t
  })
  // order matters: bold (**) before italic (*)
  s = s.replace(/\*\*([\s\S]+?)\*\*/g, '<b>$1</b>')
  s = s.replace(/__([\s\S]+?)__/g, '<u>$1</u>')
  s = s.replace(/\*([\s\S]+?)\*/g, '<i>$1</i>')
  return s
}

/** True if the text contains any markup tokens. */
export function hasMarkup(text: string | undefined): boolean {
  return !!text && /\*\*|__|\*|\{[^:{}]+:/.test(text)
}
