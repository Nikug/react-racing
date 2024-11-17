import { useFrame } from '@react-three/fiber'
import { useInputStore } from './InputStore'
import { useBox } from '@react-three/cannon'
import { Mesh } from 'three'
import { useEffect } from 'react'
import { usePlayerStore } from './PlayerStore'
import { tripletToVector } from './util'

const playerSpeed = 500

export const Player = () => {
  const [playerRef, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [0, 6, 0],
    args: [2, 2, 2],
    angularFactor: [0, 1, 0],
  }))

  useEffect(() => {
    return api.position.subscribe((position) => usePlayerStore.getState().setPosition(position))
  }, [api])

  useEffect(() => {
    return api.velocity.subscribe((position) => usePlayerStore.getState().setVelocity(position))
  }, [api])

  useFrame((state, delta) => {
    const inputs = useInputStore.getState().inputs
    const player = usePlayerStore.getState()
    if (inputs.a) {
      api.velocity.set(delta * -playerSpeed, player.velocity[1], player.velocity[2])
    }
    if (inputs.d) {
      api.velocity.set(delta * playerSpeed, player.velocity[1], player.velocity[2])
    }
    if (inputs.w) {
      api.velocity.set(player.velocity[0], player.velocity[1], delta * -playerSpeed)
    }
    if (inputs.s) {
      api.velocity.set(player.velocity[0], player.velocity[1], delta * playerSpeed)
    }

    state.camera.lookAt(tripletToVector(player.position))
  })

  return (
    <mesh ref={playerRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'#ff55ff'} />
    </mesh>
  )
}
