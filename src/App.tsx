import { degToRad } from 'three/src/math/MathUtils.js'
import './App.css'
import { Game } from './Game'
import { Canvas } from '@react-three/fiber'
import { useInputHandler } from './useInputHandler'
import { useWindowSize } from './useWindowSize'
import { Debug, Physics } from '@react-three/cannon'
import { Leva } from 'leva'

export const debug = true

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
        shadows
        camera={{
          position: [0, 20, 15],
          rotation: [degToRad(-75), 0, 0],
        }}
      >
        <Physics>
          {debug ? (
            <Debug color="black">
              <Game />
            </Debug>
          ) : (
            <Game />
          )}
        </Physics>
      </Canvas>
      <Leva hidden={!debug} />
    </div>
  )
}

export default App
