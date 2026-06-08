// Drive the built Electron app through a scripted feature tour and record it,
// full-screen. Each scene occupies (audioMs + PAD); we log the real start
// offset of every scene so the mux step can place its narration exactly.
import { _electron as electron } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PAD = 1200
const LEAD = 700

const scenes = JSON.parse(readFileSync(join(__dirname, 'scenes-meta.json'), 'utf8'))
const videoDir = join(ROOT, 'video', 'tour')
mkdirSync(videoDir, { recursive: true })
const electronPath = require('electron')
const mainEntry = join(ROOT, 'out', 'main', 'index.js')

// ---- detect the primary display size (DIP) for a matching full-screen capture ----
let W = 2560, H = 1080
{
  const p0 = join(tmpdir(), `shirma-size-${process.pid}`)
  mkdirSync(p0, { recursive: true })
  const probe = await electron.launch({ executablePath: electronPath, args: [mainEntry, `--user-data-dir=${p0}`], cwd: ROOT })
  try {
    const s = await probe.evaluate(({ screen }) => screen.getPrimaryDisplay().size)
    if (s?.width && s?.height) { W = s.width; H = s.height }
  } catch {}
  await probe.close()
  try { rmSync(p0, { recursive: true, force: true }) } catch {}
}
console.log(`capture size ${W}x${H}`)

const profile = join(tmpdir(), `shirma-tour-${process.pid}`)
mkdirSync(profile, { recursive: true })
const app = await electron.launch({
  executablePath: electronPath,
  args: [mainEntry, `--user-data-dir=${profile}`],
  cwd: ROOT,
  recordVideo: { dir: videoDir, size: { width: W, height: H } }
})

const page = await app.firstWindow()
await page.waitForLoadState('domcontentloaded')
await app.evaluate(({ BrowserWindow }) => {
  const win = BrowserWindow.getAllWindows()[0]
  win.setFullScreen(true)
})
await page.waitForTimeout(1600)

// ---- inject synthetic cursor + caption (OS cursor isn't captured) ----
await page.evaluate(({ w, h }) => {
  const cur = document.createElement('div')
  cur.id = '__cur'
  Object.assign(cur.style, {
    position: 'fixed', left: w / 2 + 'px', top: h / 2 + 'px', width: '26px', height: '26px',
    border: '2px solid #f4d27a', borderRadius: '50%', background: 'rgba(244,210,122,0.25)',
    boxShadow: '0 0 0 2px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.5)',
    transform: 'translate(-50%,-50%)', transition: 'left .45s cubic-bezier(.22,.61,.36,1), top .45s cubic-bezier(.22,.61,.36,1)',
    zIndex: 2147483647, pointerEvents: 'none'
  })
  const dot = document.createElement('div')
  Object.assign(dot.style, { position: 'absolute', left: '50%', top: '50%', width: '5px', height: '5px', borderRadius: '50%', background: '#f4d27a', transform: 'translate(-50%,-50%)' })
  cur.appendChild(dot)
  document.body.appendChild(cur)

  const cap = document.createElement('div')
  cap.id = '__cap'
  Object.assign(cap.style, {
    position: 'fixed', left: '50%', bottom: '34px', transform: 'translateX(-50%)',
    padding: '9px 26px', borderRadius: '999px', border: '1px solid rgba(217,184,120,0.55)',
    background: 'rgba(20,16,10,0.82)', color: '#f0e4cf', font: '600 26px/1 Georgia, serif',
    letterSpacing: '.3px', zIndex: 2147483646, pointerEvents: 'none', opacity: '0',
    transition: 'opacity .4s ease', boxShadow: '0 4px 18px rgba(0,0,0,0.5)'
  })
  document.body.appendChild(cap)

  window.__demo = {
    move(x, y) { cur.style.left = x + 'px'; cur.style.top = y + 'px' },
    ripple(x, y) {
      const r = document.createElement('div')
      Object.assign(r.style, { position: 'fixed', left: x + 'px', top: y + 'px', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #f4d27a', transform: 'translate(-50%,-50%) scale(1)', opacity: '0.9', zIndex: 2147483646, pointerEvents: 'none', transition: 'transform .5s ease-out, opacity .5s ease-out' })
      document.body.appendChild(r)
      requestAnimationFrame(() => { r.style.transform = 'translate(-50%,-50%) scale(5)'; r.style.opacity = '0' })
      setTimeout(() => r.remove(), 600)
    },
    caption(text) { cap.textContent = text; cap.style.opacity = '1' }
  }
}, { w: W, h: H })

const wait = (ms) => page.waitForTimeout(ms)
async function moveCursor(x, y) { await page.evaluate(({ x, y }) => window.__demo.move(x, y), { x, y }); await wait(470) }
async function caption(text) { await page.evaluate((t) => window.__demo.caption(t), text) }

async function clickLoc(loc) {
  const box = await loc.boundingBox({ timeout: 1500 }).catch(() => null)
  if (!box) return false
  const cx = box.x + box.width / 2
  const cy = box.y + Math.min(box.height / 2, 24)
  await moveCursor(cx, cy)
  await page.evaluate(({ x, y }) => window.__demo.ripple(x, y), { x: cx, y: cy })
  await loc.click({ timeout: 1500, force: true }).catch(() => {})
  return true
}
const clickSel = (sel) => clickLoc(page.locator(sel).first())

async function typeLoc(loc, text) {
  const box = await loc.boundingBox({ timeout: 1500 }).catch(() => null)
  if (!box) return false
  await moveCursor(box.x + Math.min(box.width / 2, 120), box.y + box.height / 2)
  await loc.click({ timeout: 1500, force: true }).catch(() => {})
  await page.keyboard.press('Control+A').catch(() => {})
  await page.keyboard.press('Delete').catch(() => {})
  await loc.pressSequentially(text, { delay: 42 }).catch(() => {})
  return true
}
const typeSel = (sel, text) => typeLoc(page.locator(sel).first(), text)

async function scrollContent(dy, x = Math.round(W * 0.55), y = Math.round(H * 0.5)) {
  await page.mouse.move(x, y)
  await page.mouse.wheel(0, dy)
}
async function closeModal() {
  await page.mouse.move(40, Math.round(H / 2))
  await page.mouse.click(40, Math.round(H / 2)).catch(() => {})
  await wait(250)
}

// ---- navigation ----
// Hub order: 0 Бестиарий, 1 Заклинания, 2 Снаряжение, 3 Справочник, 4 Персонаж,
// 5 Лор и мир, 6 Кампания. Races + toolkit live under hub 5; codex/tables under 6.
const NAV = {
  '#/bestiary': { hub: 0 },
  '#/my-monsters': { hub: 0, tab: '#/my-monsters' },
  '#/editor': { hub: 0, tab: '#/editor' },
  '#/spells': { hub: 1 },
  '#/equipment': { hub: 2 },
  '#/rules': { hub: 3 },
  '#/conditions': { hub: 3, tab: '#/conditions' },
  '#/hazards': { hub: 3, tab: '#/hazards' },
  '#/character': { hub: 4 },
  '#/races': { hub: 5, tab: '#/races' },
  '#/curses': { hub: 5, tab: '#/curses' },
  '#/mutations': { hub: 5, tab: '#/mutations' },
  '#/codex': { hub: 6 },
  '#/random-tables': { hub: 6, tab: '#/random-tables' }
}
async function navTo(route) {
  const cur = await page.evaluate(() => location.hash).catch(() => '')
  if (cur === route) return // already here — keep continuity for same-route scenes
  const n = NAV[route]
  if (n) {
    await clickLoc(page.locator('nav button').nth(n.hub))
    await wait(450)
    if (n.tab) { await clickSel(`a[href="${n.tab}"]`); await wait(450) }
  }
  const now = await page.evaluate(() => location.hash).catch(() => '')
  if (now !== route) await page.evaluate((r) => { location.hash = r }, route)
  await wait(350)
}

// ---- per-scene demo actions (all best-effort) ----
const fpanel = () => page.locator('div.space-y-3.border-t').first()
async function filterAspect(header, chipSelector) {
  await clickLoc(fpanel().locator(`button:has-text("${header}")`)) // expand
  await wait(700)
  if (chipSelector) {
    await clickLoc(fpanel().locator(chipSelector).first())
    await wait(1200)
    await clickLoc(fpanel().locator(chipSelector).first()) // toggle back off
    await wait(400)
  } else {
    await wait(900)
  }
  await clickLoc(fpanel().locator(`button:has-text("${header}")`)) // collapse
  await wait(300)
}

async function demo(id) {
  switch (id) {
    case 'intro':
      for (let i = 0; i < 7; i++) {
        const b = page.locator('nav button').nth(i)
        const box = await b.boundingBox().catch(() => null)
        if (box) await moveCursor(box.x + box.width / 2, box.y + box.height / 2)
        await wait(620)
      }
      // glance at the notebook tab on the right edge
      await moveCursor(W - 30, Math.round(H / 2))
      await wait(900)
      break

    case 'notebook':
      await wait(700)
      await page.keyboard.press('Control+B'); await wait(1300)         // open notebook
      await clickSel('button:has-text("Броски")'); await wait(900)
      await clickSel('button:has-text("d20")'); await wait(1500)
      await clickLoc(page.locator('button:has-text("d8")').first()); await wait(1400)
      await clickSel('button:has-text("Инициатива")'); await wait(1700)
      await clickSel('button:has-text("Заметки")'); await wait(1600)
      await page.keyboard.press('Control+B'); await wait(800)          // close
      break

    case 'bestiary-overview':
      await wait(1800)
      await scrollContent(420); await wait(1600)
      await scrollContent(420); await wait(1600)
      await scrollContent(-900); await wait(600)
      break

    case 'bestiary-filter':
      await wait(900)
      await clickSel('button:has-text("Фильтры")')
      await wait(1000)
      await filterAspect('Уровень опасности', null)
      await filterAspect('Размер', 'button:has-text("Огромный")')
      await filterAspect('Вид существа', 'button.rounded-full:has-text("Гуманоид"), button.rounded-full:has-text("Дракон"), button.rounded-full:has-text("Зверь")')
      await filterAspect('Среда обитания', null)
      await filterAspect('Способ перемещения', 'button:has-text("Полёт")')
      await clickSel('button:has-text("Фильтры")') // close panel
      break

    case 'bestiary-aboleth':
      await wait(700)
      await typeSel('input[placeholder="Поиск"]', 'Аболет')
      await wait(1600)
      await clickSel('button[class*="h-28"]')
      await wait(2400)
      await scrollContent(520); await wait(2000)
      await scrollContent(520); await wait(1800)
      await clickSel('button.decoration-dotted')          // roll a die
      await wait(2000)
      await clickLoc(page.locator('button.decoration-dotted').nth(4))
      await wait(2000)
      await closeModal()
      // clear the search so later state is clean
      await typeSel('input[placeholder="Поиск"]', '')
      break

    case 'editor': {
      await wait(900)
      const T = (i) => page.locator('main input[type="text"]').nth(i)
      const Nn = (i) => page.locator('main input[type="number"]').nth(i)
      // text fields: 0 name,1 alignment,2 size,3 type,4 armorDetail,5 hitDice,
      //              6 imageUrl,7 dmgResist,8 dmgImmun,9 condImmun,10 senses,11 languages
      await typeLoc(T(0), 'Русалка'); await wait(300)
      await typeLoc(T(1), 'нейтральная'); await wait(200)
      await typeLoc(T(2), 'Средняя'); await typeLoc(T(3), 'Фея')
      await typeLoc(T(4), 'природный доспех'); await typeLoc(T(5), '7к8 + 14')
      // number fields: 0 AC,1 HP,2 CR,3 profBonus, 4..8 speed(walk/fly/swim/climb/burrow), 9..14 abilities
      await typeLoc(Nn(0), '13'); await typeLoc(Nn(1), '45'); await typeLoc(Nn(2), '1')
      await scrollContent(260); await wait(500)
      await typeLoc(Nn(4), '10'); await typeLoc(Nn(6), '40')      // walk + swim
      const ab = ['11', '15', '14', '12', '16', '18']
      for (let i = 0; i < 6; i++) await typeLoc(Nn(9 + i), ab[i])
      await scrollContent(340); await wait(500)
      await typeLoc(T(7), 'психический')                          // resistances
      await typeLoc(T(10), 'тёмное зрение 18 м, пассивная Внимательность 13')
      await typeLoc(T(11), 'Водный, Общий')
      await scrollContent(360); await wait(500)
      // add a trait / action / bonus action / reaction (buttons 0..3)
      const addEntry = async (n, name, desc) => {
        await clickLoc(page.locator('button:has-text("Добавить")').nth(n)); await wait(450)
        await typeLoc(page.locator('main input[type="text"]').last(), name); await wait(300)
        await typeLoc(page.locator('main textarea').last(), desc); await wait(500)
      }
      await addEntry(0, 'Амфибия', 'Русалка дышит и водой, и воздухом.')
      await scrollContent(220)
      await addEntry(1, 'Чарующая песня', 'Существа в пределах 18 м проходят спасбросок Мудрости (Сл 12) или очарованы на 1 минуту.')
      await scrollContent(240)
      await addEntry(2, 'Всплеск', 'Русалка перемещается на 9 м под водой, не вызывая атак по возможности.')
      await scrollContent(260)
      await addEntry(3, 'Ускользающая волна', 'В ответ на попадание русалка вдвое снижает урон, пока находится в воде.')
      await scrollContent(-1600); await wait(600)
      await clickSel('button:has-text("Сохранить")'); await wait(700)
      await clickSel('button:has-text("Перезаписать")'); await wait(900)
      break
    }

    case 'my-monsters':
      await wait(1400)
      await clickSel('button:has-text("Папка")'); await wait(900)
      await clickSel('button:has-text("Папка")'); await wait(900)
      await clickSel('button:has-text("Папка")'); await wait(1200)
      break

    case 'spells':
      await wait(1100)
      await clickSel('[style*="auto-fill"] button')   // open a spell popup
      await wait(2800)
      await closeModal(); await wait(600)
      await clickSel('button:has-text("+ Заклинание")')
      await wait(1000)
      await typeLoc(page.locator('div.max-w-lg input').first(), 'Сотворение вина'); await wait(500)
      await typeLoc(page.locator('div.max-w-lg input[type="number"]').first(), '2')
      await page.locator('div.max-w-lg select').first().selectOption({ label: 'Вызов' }).catch(() => {})
      await wait(400)
      await typeSel('input[placeholder="1 действие"]', '1 действие')
      await typeSel('input[placeholder="60 футов"]', '5 футов')
      await typeSel('input[placeholder="В, С, М"]', 'В, С, М')
      await typeSel('input[placeholder="Мгновенная"]', '1 час')
      await typeLoc(page.locator('div.max-w-lg textarea').first(), 'Вы создаёте в свободном пространстве бутыль доброго вина. Если её не выпить в течение часа, вино скисает и исчезает.')
      await wait(1600)
      await clickSel('div.max-w-lg button:has-text("Сохранить")')
      await wait(900)
      break

    case 'equipment':
      await wait(900)
      await clickSel('button:has-text("Доспехи")')
      await wait(1200)
      await clickSel('button:has-text("Стёганый доспех")')
      await wait(3200)
      await clickSel('button:has-text("Латы")')
      await wait(3200)
      await clickSel('button:has-text("+ Предмет")')
      await wait(900)
      await typeLoc(page.locator('div.max-w-lg input').first(), 'Кожаная куртка с металлическим переплётом'); await wait(500)
      await page.locator('div.max-w-lg select').first().selectOption({ label: 'Доспехи' }).catch(() => {})
      await wait(400)
      await page.locator('div.max-w-lg select').nth(1).selectOption({ label: 'Средние доспехи' }).catch(() => {})
      await typeSel('input[placeholder="10 зм"]', '25 зм')
      await typeSel('input[placeholder="1 кг"]', '6 кг')
      await typeLoc(page.locator('div.max-w-lg textarea').first(), 'КД 12 + модификатор Ловкости (макс. +2). Металлические вставки дают сопротивление дробящему урону.')
      await wait(1600)
      await clickSel('div.max-w-lg button:has-text("Сохранить")')
      await wait(900)
      break

    case 'rules-overview':
      await wait(1300)
      await clickSel('button:has-text("Бой")')
      await wait(1200)
      await clickSel('li button')
      await wait(1600)
      await scrollContent(380); await wait(1200)
      break

    case 'rules-custom':
      await wait(900)
      await clickSel('button:has-text("+ Правило")')
      await wait(900)
      await typeLoc(page.locator('div.max-w-lg input').first(), 'Накопление Героического вдохновения до трёх')
      await wait(1500)
      await clickSel('div.max-w-lg button:has-text("Сохранить")')
      await wait(900)
      break

    case 'conditions':
      await wait(1300)
      await clickSel('li button')
      await wait(1800)
      await clickLoc(page.locator('li button').nth(3))
      await wait(1800)
      break

    case 'hazards':
      await wait(1100)
      await clickSel('button:has-text("Ловушки")')
      await wait(1100)
      await clickSel('li button')
      await wait(2200)
      await scrollContent(280); await wait(900)
      await clickSel('button:has-text("Яды")')
      await wait(1100)
      await clickSel('li button')
      await wait(1800)
      await clickSel('button:has-text("Болезни")')
      await wait(1100)
      await clickSel('li button')
      await wait(1600)
      break

    // NOTE: when a build kind supports custom entries, the FIRST .w-52 button is
    // the "+ Создать своё" button (opens a modal). Click nth(1) to hit a real item.
    case 'character-races':
      await page.keyboard.press('Escape').catch(() => {})
      await wait(900)
      await clickSel('button:has-text("Расы")')
      await wait(1100)
      await clickLoc(page.locator('.w-52 button').nth(1))
      await wait(1600)
      await scrollContent(300)
      break

    case 'character-classes':
      await wait(900)
      await clickSel('button:has-text("Классы")')
      await wait(1100)
      await clickSel('.w-52 button:has-text("Волшебник")')
      await wait(1600)
      await scrollContent(480); await wait(900); await scrollContent(360)
      break

    case 'character-feats':
      await wait(900)
      await clickSel('button:has-text("Черты")')
      await wait(1100)
      await clickLoc(page.locator('.w-52 button').nth(1))
      await wait(1500)
      await scrollContent(280)
      break

    case 'character-backgrounds':
      await wait(900)
      await clickSel('button:has-text("Предыстории")')
      await wait(1100)
      await clickLoc(page.locator('.w-52 button').nth(1))
      await wait(1600)
      break

    case 'character-constructor':
      await wait(900)
      await clickSel('button:has-text("Создание персонажа")')
      await wait(2000)
      await scrollContent(200); await wait(1200)
      break

    case 'races-lore':
      await wait(1200)
      await clickSel('button:has-text("Эльф")')
      await wait(1900)
      await scrollContent(460); await wait(1000)
      break

    case 'lore-curses':
      await wait(1000)
      await clickSel('[style*="minmax"] button')   // open a curse card
      await wait(2800)
      await closeModal(); await wait(500)
      await clickSel('button:has-text("Собрать")') // compose mode
      await wait(2600)
      await clickSel('button:has-text("Перебросить")')
      await wait(2200)
      await closeModal(); await wait(400)
      break

    case 'lore-mutations':
      await wait(1000)
      await clickSel('button:has-text("Случайная")')   // random mutation → modal
      await wait(2600)
      await clickSel('button:has-text("Прикрепить")')  // attach to body map
      await wait(1800)
      break

    case 'codex-npc':
      await wait(1100)
      await clickSel('button:has-text("Создать")')
      await wait(900)
      await typeSel('input[placeholder="Имя / название"]', 'Старый Зорин')
      await wait(700)
      await typeSel('input[placeholder*="Подзаголовок"]', 'Человек · Трактирщик')
      await wait(700)
      { const rows = page.locator('div.flex.items-center.gap-2').filter({ has: page.locator('input.w-32') })
        const vals = ['Человек', 'Трактирщик', 'Таверна «Пьяный дракон»', 'Защитить дочь', 'Бывший контрабандист']
        const nrows = await rows.count().catch(() => 0)
        for (let i = 0; i < Math.min(nrows, vals.length); i++) {
          await typeLoc(rows.nth(i).locator('input').nth(1), vals[i]); await wait(500)
        } }
      await typeSel('textarea[placeholder*="История"]', 'Седой хозяин таверны, знает все слухи города.')
      await wait(1200)
      await clickSel('button:has-text("Сохранить")')
      await wait(900)
      break

    case 'codex-location':
      await wait(800)
      await clickSel('button:has-text("Локации")')
      await wait(900)
      await clickSel('button:has-text("Создать")')
      await wait(900)
      await typeSel('input[placeholder="Имя / название"]', 'Таверна «Пьяный дракон»')
      await wait(600)
      await typeSel('input[placeholder*="Подзаголовок"]', 'Городок Тихоброд · постоялый двор')
      await wait(600)
      { const rows = page.locator('div.flex.items-center.gap-2').filter({ has: page.locator('input.w-32') })
        const vals = ['Постоялый двор', 'Под сотню гостей в ярмарку', 'Хозяин — Старый Зорин', 'Тёплый зал и тайная комната в подвале']
        const nrows = await rows.count().catch(() => 0)
        for (let i = 0; i < Math.min(nrows, vals.length); i++) {
          await typeLoc(rows.nth(i).locator('input').nth(1), vals[i]); await wait(450)
        } }
      await typeSel('textarea[placeholder*="История"]', 'Шумный трактир у тракта: эль рекой, песни до утра и слухи со всего края.')
      await wait(1300)
      await clickSel('button:has-text("Сохранить")')
      await wait(900)
      break

    case 'codex-artifact':
      await wait(900)
      await clickSel('button:has-text("блок")')   // + блок
      await wait(800)
      await typeSel('input[placeholder="Название блока"]', 'Артефакты')
      await page.keyboard.press('Enter').catch(() => {})
      await wait(1100)
      await clickSel('button:has-text("Артефакты")')
      await wait(800)
      await clickSel('button:has-text("Создать")')
      await wait(800)
      await typeSel('input[placeholder="Имя / название"]', 'Медальон Обратного Времени')
      await wait(700)
      await typeSel('input[placeholder*="Подзаголовок"]', 'Чудесный предмет · требует настройки')
      await wait(600)
      await typeSel('textarea[placeholder*="История"]', 'Серебряный медальон обращает старение вспять: владелец молодеет на год с каждым полнолунием — но кто-то платит за это годами своей жизни.')
      await wait(1500)
      await clickSel('button:has-text("Сохранить")')
      await wait(900)
      break

    case 'tables':
      await wait(1100)
      await clickLoc(page.locator('.w-56 button').nth(2))
      await wait(1000)
      await clickSel('button:has-text("Бросить")')
      await wait(2800)   // scrolls to + highlights result (new feature)
      await clickSel('button:has-text("Бросить")')
      await wait(2400)
      break

    case 'outro':
      await wait(800)
      await clickSel('input[placeholder*="Поиск"]')
      await typeSel('input[placeholder*="Поиск"]', 'дракон')
      await wait(2600)
      await page.keyboard.press('Escape').catch(() => {})
      break
  }
}

// ---- run the tour ----
const refWall = Date.now()
const timeline = []
for (const s of scenes) {
  await navTo(s.route)
  await wait(220)
  const startMs = Date.now() - refWall
  timeline.push({ id: s.id, startMs, audioMs: s.audioMs, wav: s.wav })
  await caption(s.title)
  const budget = s.audioMs + PAD
  const t0 = Date.now()
  await demo(s.id)
  const elapsed = Date.now() - t0
  const remaining = budget - elapsed
  if (remaining > 0) await wait(remaining)
  else console.warn(`! scene ${s.id} overran by ${-remaining}ms`)
  console.log(`scene ${s.id}: start=${startMs}ms budget=${budget}ms actions=${elapsed}ms`)
}
const totalActive = Date.now() - refWall

const video = page.video()
await app.close()
const rawPath = await video.path()
writeFileSync(join(__dirname, 'timeline.json'), JSON.stringify({ rawPath, refWall, totalActive, LEAD, W, H, timeline }, null, 2))
console.log('\nVIDEO:', rawPath)
console.log('totalActive:', totalActive, 'ms;  scenes:', timeline.length)
try { rmSync(profile, { recursive: true, force: true }) } catch {}
