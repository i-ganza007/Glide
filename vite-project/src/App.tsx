import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html, Select } from "@react-three/drei"
import Rectangle from "./Components/Rectangle"
import Box from "./Components/Box"
import { ControlPanel } from "./Components/ControlPanel"
import { useMeshStore } from "./meshStore/meshStore"
function App() {
  const meshStore = useMeshStore(state=>state.meshObjectStore)
  const activeWires = useMeshStore(state=>state.activeWires)
  const meshArr = meshStore.map((x,idx)=>{
    if(x.type == "box"){
      return <Box key={idx} position={x.pos} wireFrame={activeWires}/>
    }
    return <Rectangle key={idx} position={x.pos} wireFrame={activeWires}/>
  })
  return (
    <Canvas className="bg-black w-full h-screen">
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 3]} />

      {/* <Box />
      <Rectangle /> */}
      <Select box>{meshArr}</Select>
      <OrbitControls makeDefault />

      {/* Floating UI inside the scene */}
      <Html fullscreen>
        <div className="absolute bottom-10 left-1/2">
          <ControlPanel />
        </div>
      </Html>
    </Canvas>
  )
}

export default App
