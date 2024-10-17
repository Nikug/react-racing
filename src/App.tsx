import { degToRad } from 'three/src/math/MathUtils.js'
import './App.css'
import { Game } from './Game'
import { Canvas } from '@react-three/fiber'
import { useInputHandler } from './useInputHandler'
import { useWindowSize } from './useWindowSize'

function App() {
  useInputHandler()
  const size = useWindowSize()

  return (
    <div
      style={{
        width: size[0],
        height: size[1],
      }}
    >
      <Canvas
        camera={{
          position: [0, 20, 15],
          rotation: [degToRad(-75), 0, 0],
        }}
      >
        <Game />
      </Canvas>
    </div>
  )
}

export default App
