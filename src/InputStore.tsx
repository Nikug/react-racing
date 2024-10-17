import { create } from 'zustand'

interface InputStore {
  inputs: Record<string, boolean>
  setKey: (key: string, pressed: boolean) => void
  get: () => Record<string, boolean>
}

export const useInputStore = create<InputStore>()((set, get) => ({
  inputs: {},
  setKey: (key, pressed) => set((state) => ({ inputs: { ...state.inputs, [key]: pressed } })),
  get: () => get().inputs,
}))
