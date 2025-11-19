import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import Rectangle from "./Components/Rectangle"
import Box from "./Components/Box"
import { ControlPanel } from "./Components/ControlPanel"

function App() {
  return (
    <Canvas className="bg-black w-full h-screen">
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 3]} />

      <Box />
      <Rectangle />

      <OrbitControls />

      {/* Floating UI inside the scene */}
      <Html fullscreen>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ControlPanel />
        </div>
      </Html>
    </Canvas>
  )
}

export default App
