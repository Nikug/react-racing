import { Triplet } from '@react-three/cannon'
import { create } from 'zustand'

interface PlayerStore {
  velocity: Triplet
  position: Triplet
  setVelocity: (vel: Triplet) => void
  setPosition: (pos: Triplet) => void
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  velocity: [0, 0, 0],
  position: [0, 0, 0],
  setVelocity: (vel) => set({ velocity: vel }),
  setPosition: (vel) => set({ position: vel }),
}))
