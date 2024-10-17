import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
