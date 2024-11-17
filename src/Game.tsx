import { Player } from './Player'
import { useControls } from 'leva'
import { InputUpdater } from './InputUpdater'
import { RigidBody } from '@react-three/rapier'

export const Game = () => {
  const directionalLightControl = useControls('Directional light', {
    intensity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    position: { x: -50, y: 100, z: 50 },
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={directionalLightControl.intensity}
        position={[
          directionalLightControl.position.x,
          directionalLightControl.position.y,
          directionalLightControl.position.z,
        ]}
        castShadow
      />
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow>
          <boxGeometry args={[20, 2, 20]} />
          <meshStandardMaterial color="#5555ff" />
        </mesh>
      </RigidBody>
      <Player />
      <InputUpdater />
    </>
  )
}
