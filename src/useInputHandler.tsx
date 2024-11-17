import { useCallback, useEffect } from 'react'
import { useInputStore } from './InputStore'

export const useInputHandler = () => {
  const setKey = useInputStore((state) => state.setKey)

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      setKey(event.key, false)
    },
    [setKey],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setKey(event.key, true)
    },
    [setKey],
  )

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyUp, handleKeyDown])
}
