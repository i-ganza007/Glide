interface SquareBox {
  position:Number[]
  scale:Number
  args:Number[]
  wireFrame:Boolean
  color:String
}
function Box({position=[0,0,0],scale=0.5,args=[0.3,0.9,0.3],wireFrame=false,color="red"}:SquareBox) {
  return (
    <mesh position={[...position]} scale={scale}> 
      <boxGeometry args={[...args]}/>
      <meshBasicMaterial color={color} wireframe={wireFrame}/>
    </mesh>
  )
}

export default Box
