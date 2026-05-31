import { app, shell, BrowserWindow, Menu } from 'electron'
import { join } from 'path'
import { getKv, initDatabase, setKv } from './db/database'
import { registerIpc } from './ipc'
import { searchCreatures } from './api/open5e'

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
      nodeIntegration: false
    }
  })

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

  // Silent background cache warm-up.
  searchCreatures({ limit: 50, ordering: 'name', edition: '5e-2024' }).catch(() => {})

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
