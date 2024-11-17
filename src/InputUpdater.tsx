import { useFrame } from '@react-three/fiber'
import { useInputStore } from './InputStore'

export const InputUpdater = () => {
  useFrame(({ gl, scene, camera }) => {
    useInputStore.getState().onFrameEnd()
    gl.render(scene, camera)
  }, 1e3)

  return null
}
