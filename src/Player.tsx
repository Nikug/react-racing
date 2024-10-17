import { useFrame } from '@react-three/fiber'
import { useInputStore } from './InputStore'
import { Mesh } from 'three'
import { useRef } from 'react'

const playerSpeed = 5

export const Player = () => {
  const playerRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    const inputs = useInputStore.getState().inputs
    if (inputs.a) {
      playerRef.current.position.x -= delta * playerSpeed
    }
    if (inputs.d) {
      playerRef.current.position.x += delta * playerSpeed
    }
    if (inputs.w) {
      playerRef.current.position.z -= delta * playerSpeed
    }
    if (inputs.s) {
      playerRef.current.position.z += delta * playerSpeed
    }

    state.camera.lookAt(playerRef.current.position)
  })

  return (
    <mesh ref={playerRef} position={[0, 2, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'#ff55ff'} />
    </mesh>
  )
}
