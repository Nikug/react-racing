import { create } from 'zustand'

interface PlayerStore {
  grounded: boolean
}

export const usePlayerStore = create<PlayerStore>()(() => ({
  grounded: false,
}))
