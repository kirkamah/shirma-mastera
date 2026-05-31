import { app, BrowserWindow, dialog, ipcMain, net } from 'electron'
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

  // Codex
  ipcMain.handle('db:listCodex', () => listCodex())
  ipcMain.handle('db:saveCodex', (_e, entry: CodexEntry) => saveCodex(entry))
  ipcMain.handle('db:deleteCodex', (_e, key: string) => deleteCodex(key))

  // Generic custom content (spells / equipment / hazards)
  ipcMain.handle('db:listCustom', (_e, kind: string) => listCustom(kind))
  ipcMain.handle('db:saveCustom', (_e, kind: string, entry: { key: string; name: string }) => saveCustom(kind, entry))
  ipcMain.handle('db:deleteCustom', (_e, key: string) => deleteCustom(key))

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
}
