import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useRef } from 'react'

export const Game = () => {
  const meshRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.z += delta
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
    </>
  )
}
