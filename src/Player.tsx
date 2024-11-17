import { useFrame } from '@react-three/fiber'
import { useInputStore } from './InputStore'
import { useBox } from '@react-three/cannon'
import { Mesh, Vector3 } from 'three'
import { useEffect } from 'react'
import { usePlayerStore } from './PlayerStore'
import { tripletToVector } from './util'

const playerSpeed = 10
const playerJump = 10

export const Player = () => {
  const [playerRef, api] = useBox<Mesh>(() => ({
    mass: 1,
    position: [0, 6, 0],
    args: [2, 2, 2],
    fixedRotation: true,
  }))

  useEffect(() => {
    return api.position.subscribe((position) => usePlayerStore.getState().setPosition(position))
  }, [api])

  useEffect(() => {
    return api.velocity.subscribe((position) => usePlayerStore.getState().setVelocity(position))
  }, [api])

  useFrame((state) => {
    const inputs = useInputStore.getState()
    const player = usePlayerStore.getState()
    const direction = [0, 0, 0]
    if (inputs.isHeld('a')) {
      direction[0] -= 1
    }
    if (inputs.isHeld('d')) {
      direction[0] += 1
    }
    if (inputs.isHeld('w')) {
      direction[2] -= 1
    }
    if (inputs.isHeld('s')) {
      direction[2] += 1
    }

    const velocity = new Vector3(...direction).normalize().multiplyScalar(playerSpeed)

    // api.applyLocalForce(force.toArray(), [0, 0, 0])
    const velocityArray = velocity.toArray()
    velocityArray[1] = player.velocity[1]
    api.velocity.set(...velocityArray)

    if (inputs.isTriggered(' ')) {
      api.applyLocalImpulse([0, playerJump, 0], [0, 0, 0])
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
