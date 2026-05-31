import { contextBridge, ipcRenderer, webFrame } from 'electron'
import type {
  BridgeApi,
  ConditionsResult,
  Edition,
  SearchParams,
  SearchResult,
  SpellContextPayload,
  SpellEditAction,
  StatBlock
} from '../shared/types'

const api: BridgeApi = {
  db: {
    listMonsters: () => ipcRenderer.invoke('db:listMonsters'),
    getMonster: (key: string) => ipcRenderer.invoke('db:getMonster', key),
    saveMonster: (monster: StatBlock) => ipcRenderer.invoke('db:saveMonster', monster),
    deleteMonster: (key: string) => ipcRenderer.invoke('db:deleteMonster', key),
    getNotes: () => ipcRenderer.invoke('db:getNotes'),
    saveNotes: (content: string) => ipcRenderer.invoke('db:saveNotes', content),
    listCodex: () => ipcRenderer.invoke('db:listCodex'),
    saveCodex: (entry) => ipcRenderer.invoke('db:saveCodex', entry),
    deleteCodex: (key: string) => ipcRenderer.invoke('db:deleteCodex', key),
    listCustom: (kind: string) => ipcRenderer.invoke('db:listCustom', kind),
    saveCustom: (kind: string, entry: { key: string; name: string }) => ipcRenderer.invoke('db:saveCustom', kind, entry),
    deleteCustom: (key: string) => ipcRenderer.invoke('db:deleteCustom', key)
  },
  open5e: {
    searchCreatures: (params: SearchParams): Promise<SearchResult> =>
      ipcRenderer.invoke('open5e:search', params),
    getCreature: (key: string) => ipcRenderer.invoke('open5e:creature', key),
    getConditions: (edition: Edition): Promise<ConditionsResult> =>
      ipcRenderer.invoke('open5e:conditions', edition),
    searchSpells: (params: { search?: string; edition?: Edition; limit?: number }) =>
      ipcRenderer.invoke('open5e:spells', params)
  },
  spell: {
    onContext: (cb: (payload: SpellContextPayload) => void) => {
      const listener = (_e: unknown, payload: SpellContextPayload): void => cb(payload)
      ipcRenderer.on('spell:context', listener)
      return () => ipcRenderer.removeListener('spell:context', listener)
    },
    replace: (word: string) => ipcRenderer.send('spell:replace', word),
    addWord: (word: string) => ipcRenderer.send('spell:addWord', word),
    edit: (action: SpellEditAction) => ipcRenderer.send('spell:edit', action)
  },
  onlineStatus: () => ipcRenderer.invoke('app:onlineStatus'),
  exportData: () => ipcRenderer.invoke('app:exportData'),
  importData: () => ipcRenderer.invoke('app:importData'),
  exportPdf: (html: string, suggestedName: string) => ipcRenderer.invoke('app:exportPdf', html, suggestedName),
  setZoom: (factor: number) => webFrame.setZoomFactor(factor),
  getZoom: () => webFrame.getZoomFactor()
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
} else {
  // @ts-ignore fallback for non-isolated contexts
  window.api = api
}
