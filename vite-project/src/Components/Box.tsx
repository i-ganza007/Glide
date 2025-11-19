import { DragControls } from "@react-three/drei"

interface SquareBox {
  position:Number[]
  scale:Number
  args:Number[]
  wireFrame:Boolean
  color:String
}
function Box({position=[0,0,0],scale=0.5,args=[0.3,0.9,0.3],wireFrame=false,color="red"}:SquareBox) {
  return (
    <DragControls>
      <mesh position={[...position]} scale={scale}> 
        <boxGeometry args={[...args]}/>
        <meshBasicMaterial color={color} wireframe={wireFrame}/>
      </mesh>
    </DragControls>

  )
}

export default Box
