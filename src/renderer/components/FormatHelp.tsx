import { type JSX } from 'react'

const RULES: { syntax: string; result: string }[] = [
  { syntax: '**текст**', result: 'жирный шрифт' },
  { syntax: '*текст*', result: 'курсив' },
  { syntax: '{красный:текст}', result: 'цвет текста — красный, синий, зелёный, золотой, оранжевый, фиолетовый, жёлтый, серый (или {#aa2222:текст})' },
  { syntax: '2к6+3 · 2d6+3', result: 'бросок кубиков — клик по нему бросает' },
  { syntax: '+5 · −2', result: 'бонус к d20 — клик бросает; Alt = с преимуществом, Shift = с помехой' },
  { syntax: 'СЛ 15', result: 'Сложность спасброска — подсвечивается' },
  { syntax: '«Огненный шар»', result: 'ссылка на заклинание — откроется его описание' },
  { syntax: 'отравлен, ослеплён…', result: 'названия состояний подсвечиваются сами' }
]

/** Collapsible cheat-sheet for the text markup understood by stat-block descriptions. */
export default function FormatHelp({ tone = 'dark' }: { tone?: 'dark' | 'light' }): JSX.Element {
  const border = tone === 'light' ? 'border-ink-brown/25' : 'border-white/15'
  return (
    <details className={`rounded border ${border} px-2.5 py-1.5 text-xs`}>
      <summary className="cursor-pointer select-none font-semibold opacity-80 hover:opacity-100">
        Как форматировать текст в описаниях
      </summary>
      <table className="mt-2 w-full border-separate border-spacing-y-1">
        <tbody>
          {RULES.map((r) => (
            <tr key={r.syntax}>
              <td className="whitespace-nowrap pr-3 align-top font-mono opacity-90">{r.syntax}</td>
              <td className="align-top opacity-70">{r.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1.5 opacity-50">Можно сочетать: например **{'{красный:10}'} урона огнём** или {'«Огненный шар»'} (СЛ 15).</p>
    </details>
  )
}
