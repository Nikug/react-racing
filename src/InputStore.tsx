import { create } from 'zustand'

interface Keypress {
  key: string
  active: boolean
  justActivated: boolean
}

interface InputStore {
  inputs: Record<string, Keypress>
  isHeld: (key: string) => boolean
  isTriggered: (key: string) => boolean
  setKey: (key: string, pressed: boolean) => void
  onFrameEnd: () => void
}

export const useInputStore = create<InputStore>()((set, get) => ({
  inputs: {},
  setKey: (key, pressed) =>
    set((state) => {
      const justPressed = pressed && !state.inputs[key]
      return {
        inputs: { ...state.inputs, [key]: { key, active: pressed, justActivated: justPressed } },
      }
    }),
  isHeld: (key) => get().inputs[key]?.active,
  isTriggered: (key) => {
    const state = get().inputs[key]
    return state?.active && state?.justActivated
  },
  onFrameEnd: () =>
    set((state) => {
      const inputs: InputStore['inputs'] = {}
      Object.values(state.inputs).forEach((key) => {
        if (key.active) {
          inputs[key.key] = { key: key.key, justActivated: false, active: true }
        }
      })

      return { inputs }
    }),
}))
