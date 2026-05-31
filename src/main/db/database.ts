import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'
import type { CodexEntry, StatBlock } from '../../shared/types'

let db: Database.Database

export function initDatabase(): void {
  const file = join(app.getPath('userData'), 'shirma-mastera.db')
  db = new Database(file)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS api_cache (
      key TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      fetched_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS custom_monsters (
      key TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS kv (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS codex (
      key TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      name TEXT NOT NULL,
      kind TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS custom_content (
      key TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      name TEXT NOT NULL,
      data_json TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `)
}

// ---- Generic custom content (spells, equipment, hazards, …) ----
export function listCustom(kind: string): unknown[] {
  const rows = db
    .prepare('SELECT data_json FROM custom_content WHERE kind = ? ORDER BY name COLLATE NOCASE')
    .all(kind) as { data_json: string }[]
  return rows.map((r) => JSON.parse(r.data_json))
}

export function saveCustom(kind: string, entry: { key: string; name: string }): void {
  const now = Date.now()
  const json = JSON.stringify(entry)
  db.prepare(
    `INSERT INTO custom_content (key, kind, name, data_json, updated_at)
     VALUES (@key, @kind, @name, @json, @now)
     ON CONFLICT(key) DO UPDATE SET name = @name, data_json = @json, updated_at = @now`
  ).run({ key: entry.key, kind, name: entry.name, json, now })
}

export function deleteCustom(key: string): void {
  db.prepare('DELETE FROM custom_content WHERE key = ?').run(key)
}

// ---- Codex (NPCs & locations) ----
export function listCodex(): CodexEntry[] {
  const rows = db
    .prepare('SELECT data_json FROM codex ORDER BY name COLLATE NOCASE')
    .all() as { data_json: string }[]
  return rows.map((r) => JSON.parse(r.data_json) as CodexEntry)
}

export function saveCodex(entry: CodexEntry): CodexEntry {
  const now = Date.now()
  const json = JSON.stringify(entry)
  db.prepare(
    `INSERT INTO codex (key, data_json, name, kind, updated_at)
     VALUES (@key, @json, @name, @kind, @now)
     ON CONFLICT(key) DO UPDATE SET data_json = @json, name = @name, kind = @kind, updated_at = @now`
  ).run({ key: entry.key, json, name: entry.name, kind: entry.kind, now })
  return entry
}

export function deleteCodex(key: string): void {
  db.prepare('DELETE FROM codex WHERE key = ?').run(key)
}

// ---- API response cache ----
export interface CacheRow {
  payload: string
  fetched_at: number
}

export function getCache(key: string): CacheRow | null {
  const row = db.prepare('SELECT payload, fetched_at FROM api_cache WHERE key = ?').get(key) as
    | CacheRow
    | undefined
  return row ?? null
}

export function setCache(key: string, payload: string): void {
  db.prepare(
    'INSERT INTO api_cache (key, payload, fetched_at) VALUES (?, ?, ?) ' +
      'ON CONFLICT(key) DO UPDATE SET payload = excluded.payload, fetched_at = excluded.fetched_at'
  ).run(key, payload, Date.now())
}

// ---- Custom monsters ----
export function listMonsters(): StatBlock[] {
  const rows = db
    .prepare('SELECT data_json FROM custom_monsters ORDER BY name COLLATE NOCASE')
    .all() as { data_json: string }[]
  return rows.map((r) => JSON.parse(r.data_json) as StatBlock)
}

export function getMonster(key: string): StatBlock | null {
  const row = db.prepare('SELECT data_json FROM custom_monsters WHERE key = ?').get(key) as
    | { data_json: string }
    | undefined
  return row ? (JSON.parse(row.data_json) as StatBlock) : null
}

export function saveMonster(monster: StatBlock): StatBlock {
  const stored: StatBlock = { ...monster, source: 'custom' }
  const now = Date.now()
  const json = JSON.stringify(stored)
  db.prepare(
    `INSERT INTO custom_monsters (key, data_json, name, created_at, updated_at)
     VALUES (@key, @json, @name, @now, @now)
     ON CONFLICT(key) DO UPDATE SET data_json = @json, name = @name, updated_at = @now`
  ).run({ key: stored.key, json, name: stored.name, now })
  return stored
}

export function deleteMonster(key: string): void {
  db.prepare('DELETE FROM custom_monsters WHERE key = ?').run(key)
}

// ---- Key/value (notes) ----
export function getKv(key: string): string {
  const row = db.prepare('SELECT value FROM kv WHERE key = ?').get(key) as
    | { value: string }
    | undefined
  return row?.value ?? ''
}

export function setKv(key: string, value: string): void {
  db.prepare(
    'INSERT INTO kv (key, value, updated_at) VALUES (?, ?, ?) ' +
      'ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
  ).run(key, value, Date.now())
}
