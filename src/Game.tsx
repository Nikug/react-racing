import { Mesh } from 'three'
import { useRef } from 'react'
import { Player } from './Player'

export const Game = () => {
  const meshRef = useRef<Mesh>(null!)

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 10, 0]} />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[20, 2, 20]} />
        <meshStandardMaterial color={'#5555ff'} />
      </mesh>
      <Player />
    </>
  )
}
