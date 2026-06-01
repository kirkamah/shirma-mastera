import { app, shell, BrowserWindow, Menu } from 'electron'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'
import { getKv, initDatabase, setKv } from './db/database'
import { registerIpc } from './ipc'

interface Bounds {
  x?: number
  y?: number
  width: number
  height: number
}

function loadBounds(): Bounds {
  try {
    const raw = getKv('windowBounds')
    if (raw) return JSON.parse(raw) as Bounds
  } catch {
    /* ignore */
  }
  return { width: 1440, height: 900 }
}

// Chromium качает hunspell-словари по сети при первом запуске, что часто не
// срабатывает (firewall/антивирус) — тогда русский текст проверяется по
// английскому словарю: подсветка везде и без вариантов исправления. Чтобы это
// работало офлайн и на чужих машинах, мы кладём готовые .bdic в ресурсы сборки
// и копируем их в профиль сессии до инициализации спеллчекера.
function seedDictionaries(): void {
  try {
    const srcDir = app.isPackaged
      ? join(process.resourcesPath, 'dictionaries')
      : join(app.getAppPath(), 'resources', 'dictionaries')
    if (!existsSync(srcDir)) return
    const destDir = join(app.getPath('userData'), 'Dictionaries')
    mkdirSync(destDir, { recursive: true })
    for (const file of readdirSync(srcDir)) {
      if (!file.endsWith('.bdic')) continue
      const dest = join(destDir, file)
      if (!existsSync(dest)) copyFileSync(join(srcDir, file), dest)
    }
  } catch {
    /* не критично — Chromium попробует скачать словарь сам */
  }
}

// Проверка орфографии (русский + английский). Контекстное меню «как T9»
// (варианты замены + «Добавить в словарь») рисуется в самом приложении в его
// стиле — нативное меню Electron нельзя стилизовать, поэтому мы лишь
// пересылаем данные о слове в renderer по IPC. Пользовательский словарь
// Chromium сохраняется в профиле сессии между запусками.
function setupSpellcheck(window: BrowserWindow): void {
  const ses = window.webContents.session
  try {
    const available = ses.availableSpellCheckerLanguages
    const want = ['ru', 'en-US'].filter((l) => available.includes(l))
    if (want.length) ses.setSpellCheckerLanguages(want)
  } catch {
    /* спеллчекер недоступен на этой платформе — игнорируем */
  }

  window.webContents.on('context-menu', (_event, params) => {
    window.webContents.send('spell:context', {
      x: params.x,
      y: params.y,
      misspelledWord: params.misspelledWord,
      suggestions: params.dictionarySuggestions,
      isEditable: params.isEditable,
      selectionText: params.selectionText,
      canCut: params.editFlags.canCut,
      canCopy: params.editFlags.canCopy,
      canPaste: params.editFlags.canPaste
    })
  })
}

function createWindow(): void {
  const bounds = loadBounds()
  const mainWindow = new BrowserWindow({
    ...bounds,
    minWidth: 1024,
    minHeight: 680,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#15100a',
    title: 'Ширма Мастера',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1c130b',
      symbolColor: '#d9b878',
      height: 48
    },
    icon: join(__dirname, '../../build/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: true
    }
  })

  setupSpellcheck(mainWindow)

  mainWindow.on('ready-to-show', () => {
    // Открывать в полный экран (максимизировать окно), как просил пользователь.
    // Сохранение/восстановление bounds остаётся для случая, когда окно
    // развёрнуто из максимизации вручную.
    mainWindow.maximize()
    mainWindow.show()
  })

  const saveBounds = (): void => {
    if (!mainWindow.isMaximized()) setKv('windowBounds', JSON.stringify(mainWindow.getBounds()))
  }
  mainWindow.on('close', saveBounds)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  initDatabase()
  registerIpc()
  seedDictionaries()

  // Минимальное приложенческое меню: даёт стандартные акселераторы
  // Ctrl+C/Ctrl+V/Ctrl+X/Ctrl+A для копирования выделенного текста.
  // Окно открывается с autoHideMenuBar, так что визуально меню не видно.
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: 'Правка',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectAll' }
        ]
      }
    ])
  )

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
