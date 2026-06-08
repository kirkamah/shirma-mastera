// Quick smoke test: launch the built app, visit each «Лор и мир» route, assert it
// renders (no ErrorBoundary) and exercise one primary action per page.
import { _electron as electron } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'
import { mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const electronPath = require('electron')
const mainEntry = join(ROOT, 'out', 'main', 'index.js')
const profile = join(tmpdir(), `shirma-smoke-${process.pid}`)
mkdirSync(profile, { recursive: true })

const app = await electron.launch({ executablePath: electronPath, args: [mainEntry, `--user-data-dir=${profile}`], cwd: ROOT })
const page = await app.firstWindow()
await page.waitForLoadState('domcontentloaded')
await page.waitForTimeout(1200)

const wait = (ms) => page.waitForTimeout(ms)
const goto = async (hash) => { await page.evaluate((h) => { location.hash = h }, hash); await wait(700) }
const bodyText = () => page.evaluate(() => document.body.innerText)

let failures = 0
async function check(hash, expectTitle) {
  await goto(hash)
  const txt = await bodyText()
  const broke = txt.includes('Что-то пошло не так')
  const titled = txt.includes(expectTitle)
  const ok = !broke && titled
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${hash}  (title:${titled} boundary:${broke})`)
  return ok
}

// Each page renders
await check('#/races', 'Расы')
await check('#/curses', 'Проклятия')
await check('#/mutations', 'Мутации')
await check('#/npc-generator', 'Генератор NPC')
await check('#/rooms', 'Комнаты')
await check('#/region', 'Регион')

// Exercise primary actions, then re-check the page didn't blow up.
async function clickText(t) {
  const loc = page.locator(`button:has-text("${t}")`).first()
  if (await loc.count()) { await loc.click({ force: true }).catch(() => {}); await wait(600) }
}

await goto('#/curses');       await clickText('Случайное'); await page.mouse.click(40, 300).catch(()=>{}); await clickText('Собрать')
console.log('curses after actions broke:', (await bodyText()).includes('Что-то пошло не так'))
await page.mouse.click(40, 300).catch(()=>{})

await goto('#/npc-generator'); await clickText('Сгенерировать')
console.log('npc after generate broke:', (await bodyText()).includes('Что-то пошло не так'))

await goto('#/mutations');     await clickText('Случайная')
console.log('mutations after random broke:', (await bodyText()).includes('Что-то пошло не так'))
await page.mouse.click(40, 300).catch(()=>{})

await goto('#/region');        await clickText('Сгенерировать регион'); await wait(400); await clickText('Справочник')
console.log('region after generate broke:', (await bodyText()).includes('Что-то пошло не так'))

await goto('#/rooms');         await clickText('Случайная')
console.log('rooms after random broke:', (await bodyText()).includes('Что-то пошло не так'))

await app.close()
try { rmSync(profile, { recursive: true, force: true }) } catch {}
console.log(failures === 0 ? '\nALL ROUTES OK' : `\n${failures} ROUTE(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
