/* */
import { degToRad } from 'three/src/math/MathUtils.js'
import './App.css'
import { Game } from './Game'
import { Canvas } from '@react-three/fiber'
import { useInputHandler } from './InputHandler'

// TODO:
// - Add Zustand
// - Add keyboard handling logic
//   - Create some kind of store that has methods for onPress and onHold
//   - https://docs.unity3d.com/ScriptReference/Input.html <-- copy this kind of api

function App() {
  useInputHandler()

  return (
    <div style={{ width: 800, height: 800, border: '1px solid black', borderRadius: '0.5rem' }}>
      <Canvas
        camera={{
          position: [0, 20, 10],
          rotation: [degToRad(-75), 0, 0],
        }}
      >
        <Game />
      </Canvas>
    </div>
  )
}

export default App
