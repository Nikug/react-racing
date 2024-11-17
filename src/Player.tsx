import { useFrame } from '@react-three/fiber'
import { useInputStore } from './InputStore'
import { Vector3 } from 'three'
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier'
import { useRef } from 'react'
import { usePlayerStore } from './PlayerStore'

const playerSpeed = 2
const playerSpeedMultiplier = 100
const playerJump = 50

export const Player = () => {
  const playerRef = useRef<RapierRigidBody>(null!)

  useFrame((state) => {
    if (!playerRef.current) return

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

    const force = new Vector3(...direction)
      .normalize()
      .multiplyScalar(playerSpeed * playerSpeedMultiplier)

    if (force.x === 0 && force.z === 0) {
      playerRef.current.resetForces(true)
    } else {
      playerRef.current.resetForces(true)
      playerRef.current.addForce(force, true)
    }

    if (inputs.isTriggered(' ') && player.grounded) {
      playerRef.current.applyImpulse(new Vector3(0, playerJump, 0), true)
      usePlayerStore.setState({ grounded: false })
    }

    const position = playerRef.current.translation()
    state.camera.lookAt(vec3(position))
  })

  return (
    <RigidBody
      ref={playerRef}
      colliders="cuboid"
      position={[0, 4, 0]}
      type="dynamic"
      mass={1}
      friction={0}
      lockRotations
      onCollisionEnter={(collision) => {
        const other = collision.other.collider.translation()
        const self = collision.target.collider.translation()
        if (other.y - self.y < 0) {
          usePlayerStore.setState({ grounded: true })
        }
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={'#ff55ff'} />
      </mesh>
    </RigidBody>
  )
}
