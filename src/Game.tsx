import { Player } from './Player'
import { useControls } from 'leva'
import { useBox } from '@react-three/cannon'
import { Mesh } from 'three'
import { InputUpdater } from './InputUpdater'

export const Game = () => {
  const [meshRef] = useBox<Mesh>(() => ({ type: 'Static', position: [0, 0, 0], args: [20, 2, 20] }))

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
      <mesh ref={meshRef} receiveShadow>
        <boxGeometry args={[20, 2, 20]} />
        <meshStandardMaterial color="#5555ff" />
      </mesh>
      <Player />
      <InputUpdater />
    </>
  )
}
