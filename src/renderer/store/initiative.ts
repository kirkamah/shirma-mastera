import { create } from 'zustand'

export type CombatantType = 'player' | 'enemy' | 'npc'

export interface TempEffect {
  id: string
  name: string
  rounds: number
}

export interface Combatant {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
  notes: string
  type: CombatantType
  concentration: boolean
  conditions: string[]
  effects: TempEffect[]
}

interface InitiativeState {
  combatants: Combatant[]
  round: number
  turnIndex: number
  active: boolean
  startCombat: () => void
  endCombat: () => void
  addCombatant: (c: Omit<Combatant, 'id' | 'concentration' | 'conditions' | 'effects'>) => void
  removeCombatant: (id: string) => void
  updateCombatant: (id: string, patch: Partial<Combatant>) => void
  move: (id: string, dir: -1 | 1) => void
  nextTurn: () => void
  addEffect: (id: string, name: string, rounds: number) => void
  removeEffect: (combatantId: string, effectId: string) => void
}

function sortByInit(list: Combatant[]): Combatant[] {
  return [...list].sort((a, b) => b.initiative - a.initiative)
}

export const useInitiative = create<InitiativeState>((set) => ({
  combatants: [],
  round: 1,
  turnIndex: 0,
  active: false,
  startCombat: () => set({ round: 1, turnIndex: 0, active: true }),
  endCombat: () => set({ combatants: [], round: 1, turnIndex: 0, active: false }),
  addCombatant: (c) =>
    set((s) => ({
      combatants: sortByInit([
        ...s.combatants,
        { ...c, id: Math.random().toString(36).slice(2), concentration: false, conditions: [], effects: [] }
      ])
    })),
  removeCombatant: (id) => set((s) => ({ combatants: s.combatants.filter((c) => c.id !== id) })),
  updateCombatant: (id, patch) =>
    set((s) => {
      const next = s.combatants.map((c) => (c.id === id ? { ...c, ...patch } : c))
      return { combatants: 'initiative' in patch ? sortByInit(next) : next }
    }),
  move: (id, dir) =>
    set((s) => {
      const idx = s.combatants.findIndex((c) => c.id === id)
      const target = idx + dir
      if (idx < 0 || target < 0 || target >= s.combatants.length) return s
      const next = [...s.combatants]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return { combatants: next }
    }),
  nextTurn: () =>
    set((s) => {
      if (s.combatants.length === 0) return s
      const nextIndex = s.turnIndex + 1
      if (nextIndex >= s.combatants.length) {
        // New round — tick down temporary effects and drop expired ones.
        const combatants = s.combatants.map((c) => ({
          ...c,
          effects: c.effects.map((e) => ({ ...e, rounds: e.rounds - 1 })).filter((e) => e.rounds > 0)
        }))
        return { turnIndex: 0, round: s.round + 1, combatants }
      }
      return { turnIndex: nextIndex }
    }),
  addEffect: (id, name, rounds) =>
    set((s) => ({
      combatants: s.combatants.map((c) =>
        c.id === id
          ? { ...c, effects: [...c.effects, { id: Math.random().toString(36).slice(2), name, rounds }] }
          : c
      )
    })),
  removeEffect: (combatantId, effectId) =>
    set((s) => ({
      combatants: s.combatants.map((c) =>
        c.id === combatantId ? { ...c, effects: c.effects.filter((e) => e.id !== effectId) } : c
      )
    }))
}))
