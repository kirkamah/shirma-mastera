import { app, BrowserWindow, clipboard, dialog, ipcMain, net } from 'electron'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import type { CodexEntry, Edition, SearchParams, StatBlock } from '../shared/types'
import {
  deleteCodex,
  deleteCustom,
  deleteMonster,
  getKv,
  getMonster,
  listCodex,
  listCustom,
  listMonsters,
  saveCodex,
  saveCustom,
  saveMonster,
  setKv
} from './db/database'
import { getConditions, getCreature, isOnline, searchCreatures, searchSpells } from './api/open5e'

interface BackupFile {
  app: string
  version: number
  exportedAt: string
  monsters: StatBlock[]
  notes: string
}

export function registerIpc(): void {
  // Open5e
  ipcMain.handle('open5e:search', (_e, params: SearchParams) => searchCreatures(params))
  ipcMain.handle('open5e:creature', (_e, key: string) => getCreature(key))
  ipcMain.handle('open5e:conditions', (_e, edition: Edition) => getConditions(edition))
  ipcMain.handle('open5e:spells', (_e, params: { search?: string; edition?: Edition; limit?: number }) =>
    searchSpells(params)
  )

  // Database / custom monsters
  ipcMain.handle('db:listMonsters', () => listMonsters())
  ipcMain.handle('db:getMonster', (_e, key: string) => getMonster(key))
  ipcMain.handle('db:saveMonster', (_e, monster: StatBlock) => saveMonster(monster))
  ipcMain.handle('db:deleteMonster', (_e, key: string) => deleteMonster(key))

  // Notes
  ipcMain.handle('db:getNotes', () => getKv('notes'))
  ipcMain.handle('db:saveNotes', (_e, content: string) => setKv('notes', content))

  // Generic key/value store (monster folders, misc UI state)
  ipcMain.handle('db:getKv', (_e, key: string) => getKv(key))
  ipcMain.handle('db:setKv', (_e, key: string, value: string) => setKv(key, value))

  // Codex
  ipcMain.handle('db:listCodex', () => listCodex())
  ipcMain.handle('db:saveCodex', (_e, entry: CodexEntry) => saveCodex(entry))
  ipcMain.handle('db:deleteCodex', (_e, key: string) => deleteCodex(key))

  // Generic custom content (spells / equipment / hazards)
  ipcMain.handle('db:listCustom', (_e, kind: string) => listCustom(kind))
  ipcMain.handle('db:saveCustom', (_e, kind: string, entry: { key: string; name: string }) => saveCustom(kind, entry))
  ipcMain.handle('db:deleteCustom', (_e, key: string) => deleteCustom(key))

  // ---- Spellcheck context menu actions (themed menu lives in the renderer) ----
  ipcMain.on('spell:replace', (e, word: string) => e.sender.replaceMisspelling(word))
  ipcMain.on('spell:addWord', (e, word: string) =>
    e.sender.session.addWordToSpellCheckerDictionary(word)
  )
  ipcMain.on('spell:edit', (e, action: 'cut' | 'copy' | 'paste' | 'selectAll') => {
    const wc = e.sender
    if (action === 'cut') wc.cut()
    else if (action === 'copy') wc.copy()
    else if (action === 'paste') wc.paste()
    else if (action === 'selectAll') wc.selectAll()
  })

  // Online status
  ipcMain.handle('app:onlineStatus', () => net.isOnline() && isOnline())

  // ---- Backup / export / import ----
  ipcMain.handle('app:exportData', async () => {
    const data: BackupFile = {
      app: 'shirma-mastera',
      version: 1,
      exportedAt: new Date().toISOString(),
      monsters: listMonsters(),
      notes: getKv('notes')
    }
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Сохранить резервную копию',
      defaultPath: join(app.getPath('documents'), `shirma-mastera-backup.json`),
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })
    if (canceled || !filePath) return { ok: false }
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return { ok: true, path: filePath }
  })

  // Imports a backup file OR a raw array of monsters (homebrew). Returns counts.
  ipcMain.handle('app:importData', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'Импорт монстров / резервной копии',
      properties: ['openFile'],
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })
    if (canceled || !filePaths[0]) return { ok: false }
    try {
      const text = await readFile(filePaths[0], 'utf-8')
      const parsed = JSON.parse(text)
      const monsters: StatBlock[] = Array.isArray(parsed) ? parsed : (parsed.monsters ?? [])
      let count = 0
      for (const m of monsters) {
        if (m && m.name) {
          saveMonster({ ...m, source: 'custom', key: m.key || `imported-${Date.now()}-${count}` })
          count++
        }
      }
      if (!Array.isArray(parsed) && typeof parsed.notes === 'string' && parsed.notes) {
        // Only restore notes if the user has none yet, to avoid clobbering.
        if (!getKv('notes')) setKv('notes', parsed.notes)
      }
      return { ok: true, monsters: count }
    } catch (e) {
      return { ok: false, error: (e as Error).message }
    }
  })

  // Read a bitmap image from the OS clipboard (screenshots, "copy image" from a
  // browser, file managers) as a PNG data URI, or null if there's no image.
  ipcMain.handle('app:readClipboardImage', () => {
    const img = clipboard.readImage()
    if (img.isEmpty()) return null
    return img.toDataURL()
  })

  // Render arbitrary HTML to a PDF file.
  ipcMain.handle('app:exportPdf', async (_e, html: string, suggestedName: string) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Экспорт в PDF',
      defaultPath: join(app.getPath('documents'), `${suggestedName || 'statblock'}.pdf`),
      filters: [{ name: 'PDF', extensions: ['pdf'] }]
    })
    if (canceled || !filePath) return { ok: false }
    const win = new BrowserWindow({ show: false, webPreferences: { sandbox: true } })
    try {
      await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html))
      const pdf = await win.webContents.printToPDF({ printBackground: true, pageSize: 'A4' })
      await writeFile(filePath, pdf)
      return { ok: true, path: filePath }
    } catch (e) {
      return { ok: false, error: (e as Error).message }
    } finally {
      win.destroy()
    }
  })

  // Render card HTML (fixed CSS width) to a crisp PNG. The offscreen window is
  // sized to the rendered content height so the whole card is captured.
  ipcMain.handle('app:savePng', async (_e, html: string, width: number, suggestedName: string) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Сохранить карточку (PNG)',
      defaultPath: join(app.getPath('documents'), `${suggestedName || 'card'}.png`),
      filters: [{ name: 'PNG', extensions: ['png'] }]
    })
    if (canceled || !filePath) return { ok: false }
    // Render at 2× (CSS zoom) so the exported PNG is sharp on any display.
    const SCALE = 2
    const w = Math.max(200, Math.round(width || 640)) * SCALE
    const win = new BrowserWindow({
      show: false,
      // Positioned far off-screen: shown (so the page is composited and
      // capturePage is reliable) but never visible to the user.
      x: -20000,
      y: -20000,
      width: w,
      height: 800,
      useContentSize: true,
      // Transparent + frameless so the rounded-corner card exports onto a
      // transparent PNG background instead of a white rectangle.
      transparent: true,
      frame: false,
      backgroundColor: '#00000000',
      webPreferences: { sandbox: true }
    })
    try {
      await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html))
      // Measure the card at its natural (1×) height, then zoom to 2× and size the
      // window so capturePage covers the whole card with no clipping.
      const baseHeight = (await win.webContents.executeJavaScript(
        'Math.ceil((document.querySelector(".card") || document.body).getBoundingClientRect().height)'
      )) as number
      await win.webContents.executeJavaScript(`document.body.style.zoom='${SCALE}'`)
      win.setContentSize(w, Math.max(200, Math.ceil(baseHeight * SCALE)))
      win.showInactive()
      // Let layout/paint settle after the resize before capturing.
      await new Promise((r) => setTimeout(r, 150))
      const image = await win.webContents.capturePage()
      await writeFile(filePath, image.toPNG())
      return { ok: true, path: filePath }
    } catch (e) {
      return { ok: false, error: (e as Error).message }
    } finally {
      win.destroy()
    }
  })
}
