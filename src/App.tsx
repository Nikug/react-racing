import { degToRad } from 'three/src/math/MathUtils.js'
import './App.css'
import { Game } from './Game'
import { Canvas } from '@react-three/fiber'
import { useInputHandler } from './useInputHandler'
import { useWindowSize } from './useWindowSize'
import { Leva, useControls } from 'leva'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'

export const debug = true

function App() {
  useInputHandler()
  const size = useWindowSize()
  const physicsControl = useControls('Physics', { debug: true })

  return (
    <>
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
          <Suspense>
            <Physics
              debug={physicsControl.debug}
              interpolate
              timeStep="vary"
              updateLoop="independent"
            >
              <Game />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
      <Leva hidden={!debug} />
    </>
  )
}

export default App
