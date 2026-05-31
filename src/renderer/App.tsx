import { Suspense, lazy, useCallback, useEffect, useRef, type JSX, type PointerEvent as ReactPointerEvent } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import ErrorBoundary from './components/ErrorBoundary'
import Notebook from './panels/Notebook'
import SpellPopup from './components/SpellPopup'
import ConditionPopup from './components/ConditionPopup'
import FeatPopup from './components/FeatPopup'
import GlossaryPopup from './components/GlossaryPopup'
import SpellContextMenu from './components/SpellContextMenu'
// Pages are code-split — each becomes its own JS chunk loaded on demand.
// Bestiary still loads near-instantly because it's the landing route, but the
// heavy data files behind CharacterBuild / MonsterEditor / Spells no longer
// bloat the initial bundle.
const Bestiary = lazy(() => import('./pages/Bestiary'))
const Conditions = lazy(() => import('./pages/Conditions'))
const Races = lazy(() => import('./pages/Races'))
const MyMonsters = lazy(() => import('./pages/MyMonsters'))
const MonsterEditor = lazy(() => import('./pages/MonsterEditor'))
const Equipment = lazy(() => import('./pages/Equipment'))
const Hazards = lazy(() => import('./pages/Hazards'))
const OptionalRules = lazy(() => import('./pages/OptionalRules'))
const Spells = lazy(() => import('./pages/Spells'))
const Codex = lazy(() => import('./pages/Codex'))
const CharacterBuild = lazy(() => import('./pages/CharacterBuild'))
import { GiResize, GiHorizontalFlip } from 'react-icons/gi'
import { useSettings } from './store/settings'
import { useUi, type SplitRoute } from './store/ui'

/** Shared Suspense fallback for lazy-loaded routes — just a soft fade to avoid
 *  a layout jolt on chunk swap. */
function RouteFallback(): JSX.Element {
  return <div className="flex h-full items-center justify-center text-sm italic text-parchment/40">…</div>
}

const PANE_OPTIONS: { value: SplitRoute; label: string }[] = [
  { value: '/bestiary', label: 'Бестиарий' },
  { value: '/conditions', label: 'Состояния' },
  { value: '/spells', label: 'Заклинания' },
  { value: '/races', label: 'Расы' },
  { value: '/equipment', label: 'Снаряжение' },
  { value: '/hazards', label: 'Опасности' },
  { value: '/codex', label: 'Картотека' },
  { value: '/rules', label: 'Правила' },
  { value: '/character', label: 'Игрок' },
  { value: '/my-monsters', label: 'Мои монстры' }
]

function paneFor(route: SplitRoute): JSX.Element {
  const inner = (() => {
    switch (route) {
      case '/bestiary':
        return <Bestiary />
      case '/conditions':
        return <Conditions />
      case '/spells':
        return <Spells />
      case '/races':
        return <Races />
      case '/equipment':
        return <Equipment />
      case '/hazards':
        return <Hazards />
      case '/codex':
        return <Codex />
      case '/rules':
        return <OptionalRules />
      case '/character':
        return <CharacterBuild />
      case '/my-monsters':
        return <MyMonsters />
    }
  })()
  return <Suspense fallback={<RouteFallback />}>{inner}</Suspense>
}

/** Renders the second pane in split view + a small toolbar to pick its content. */
function SplitPane(): JSX.Element {
  const { splitRoute, setSplitRoute, setSplitOpen } = useUi()
  return (
    <div className="flex h-full min-w-0 flex-col border-l-2 border-gold/30 bg-ink/40">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-sidebar px-2 py-1">
        <select
          value={splitRoute}
          onChange={(e) => setSplitRoute(e.target.value as SplitRoute)}
          className="rounded border border-white/15 bg-ink px-2 py-0.5 text-xs text-parchment focus:border-accent focus:outline-none"
        >
          {PANE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="flex-1" />
        <button
          onClick={() => setSplitOpen(false)}
          title="Закрыть вторую половину"
          className="rounded border border-white/15 px-2 py-0.5 text-xs text-parchment/70 hover:bg-white/10"
        >
          <GiResize />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ErrorBoundary name="SplitPane">{paneFor(splitRoute)}</ErrorBoundary>
      </div>
    </div>
  )
}

/** Floating toggle that opens split view when it's closed. */
function SplitToggle(): JSX.Element | null {
  const { pathname } = useLocation()
  const splitOpen = useUi((s) => s.splitOpen)
  const setSplitOpen = useUi((s) => s.setSplitOpen)
  // Hide the toggle on the editor route — it expects the full width.
  if (splitOpen || pathname.startsWith('/editor')) return null
  return (
    <button
      onClick={() => setSplitOpen(true)}
      title="Разделить экран на две вкладки"
      className="absolute right-3 top-2 z-30 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-sidebar/70 px-2.5 py-1 text-xs text-gold-soft shadow-panel hover:bg-accent/30"
    >
      <GiHorizontalFlip /> Разделить
    </button>
  )
}

export default function App(): JSX.Element {
  const { i18n } = useTranslation()
  const language = useSettings((s) => s.language)
  const fontScale = useSettings((s) => s.fontScale)
  const texture = useSettings((s) => s.texture)
  const palette = useSettings((s) => s.palette)
  const setOnline = useUi((s) => s.setOnline)
  const toggleNotebook = useUi((s) => s.toggleNotebook)
  const splitOpen = useUi((s) => s.splitOpen)
  const splitRatio = useUi((s) => s.splitRatio)
  const setSplitRatio = useUi((s) => s.setSplitRatio)
  const notebookOpen = useUi((s) => s.notebookOpen)
  const notebookWidth = useUi((s) => s.notebookWidth)
  const areaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  // Apply visual settings.
  useEffect(() => {
    // Scale the WHOLE app (UI + content) with a REAL browser zoom (Ctrl+= style)
    // via webFrame. This scales fixed-px content (e.g. bestiary stat blocks with
    // text-[11px]) too, and — unlike CSS `zoom` — correctly recomputes the
    // viewport so 100vh/h-screen layout and page scrolling keep working.
    // Clear any stale CSS zoom that an older build may have left on <html>.
    document.documentElement.style.removeProperty('zoom')
    window.api?.setZoom?.(fontScale)
  }, [fontScale])
  useEffect(() => {
    document.documentElement.classList.toggle('no-texture', !texture)
  }, [texture])
  useEffect(() => {
    document.documentElement.dataset.palette = palette
  }, [palette])

  // Hotkey: Ctrl/Cmd+B toggles the notebook.
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleNotebook()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleNotebook])

  // Poll connectivity for the offline badge.
  useEffect(() => {
    let stop = false
    const check = async (): Promise<void> => {
      try {
        const ok = await window.api.onlineStatus()
        if (!stop) setOnline(ok)
      } catch {
        if (!stop) setOnline(false)
      }
    }
    check()
    const id = setInterval(check, 15000)
    return () => {
      stop = true
      clearInterval(id)
    }
  }, [setOnline])

  // Drag the divider between the two split panes.
  const startSplitResize = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault()
      const area = areaRef.current
      if (!area) return
      const rect = area.getBoundingClientRect()
      const move = (ev: PointerEvent): void => {
        setSplitRatio(((ev.clientX - rect.left) / rect.width) * 100)
      }
      const up = (): void => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    },
    [setSplitRatio]
  )

  return (
    <HashRouter>
      <div className="flex h-screen flex-col bg-ink text-parchment">
        <TopBar />
        <div className="relative flex min-h-0 flex-1">
          <Sidebar />
          <div ref={areaRef} className="relative flex min-w-0 flex-1">
            <main
              style={{ width: splitOpen ? `${splitRatio}%` : '100%' }}
              className="relative h-full min-w-0 overflow-hidden"
            >
              <SplitToggle />
              <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/bestiary" replace />} />
                <Route
                  path="/bestiary"
                  element={
                    <ErrorBoundary name="Bestiary">
                      <Bestiary />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/conditions"
                  element={
                    <ErrorBoundary name="Conditions">
                      <Conditions />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/races"
                  element={
                    <ErrorBoundary name="Races">
                      <Races />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/my-monsters"
                  element={
                    <ErrorBoundary name="MyMonsters">
                      <MyMonsters />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/equipment"
                  element={
                    <ErrorBoundary name="Equipment">
                      <Equipment />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/hazards"
                  element={
                    <ErrorBoundary name="Hazards">
                      <Hazards />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/rules"
                  element={
                    <ErrorBoundary name="OptionalRules">
                      <OptionalRules />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/spells"
                  element={
                    <ErrorBoundary name="Spells">
                      <Spells />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/codex"
                  element={
                    <ErrorBoundary name="Codex">
                      <Codex />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/character"
                  element={
                    <ErrorBoundary name="CharacterBuild">
                      <CharacterBuild />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/editor"
                  element={
                    <ErrorBoundary name="Editor">
                      <MonsterEditor />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/editor/:key"
                  element={
                    <ErrorBoundary name="Editor">
                      <MonsterEditor />
                    </ErrorBoundary>
                  }
                />
              </Routes>
              </Suspense>
            </main>

            {splitOpen && (
              <>
                <div
                  role="separator"
                  aria-orientation="vertical"
                  onPointerDown={startSplitResize}
                  onDoubleClick={() => setSplitRatio(50)}
                  title="Потяните, чтобы изменить разделение · двойной клик — 50/50"
                  className="group relative z-10 -mx-1 w-2 shrink-0 cursor-col-resize"
                >
                  <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-gold/40 transition-colors group-hover:bg-gold/90" />
                </div>
                <div style={{ width: `${100 - splitRatio}%` }} className="h-full min-w-0">
                  <SplitPane />
                </div>
              </>
            )}
          </div>
          {/* Reserved lane: matches the Notebook width when open so its panel
              doesn't overlap the main content; collapses to the 40px tab when closed. */}
          <div
            className="shrink-0 transition-[width] duration-200 ease-out"
            style={{ width: notebookOpen ? notebookWidth : 40 }}
          />
          <Notebook />
        </div>
      </div>
      <SpellPopup />
      <ConditionPopup />
      <FeatPopup />
      <GlossaryPopup />
      <SpellContextMenu />
    </HashRouter>
  )
}
