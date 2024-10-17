import { create } from 'zustand'

interface InputStore {
  inputs: Record<string, boolean>
  setKey: (key: string, pressed: boolean) => void
}

export const useInputStore = create<InputStore>()((set) => ({
  inputs: {},
  setKey: (key, pressed) => set((state) => ({ inputs: { ...state.inputs, [key]: pressed } })),
}))
