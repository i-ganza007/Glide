import { useRef } from "react"
// import { useFrame } from "@react-three/fiber"
interface RectangleBox {
  position:Number[]
  scale:Number
  args:Number[]
  wireFrame:Boolean
  color:String
}
function Rectangle({position=[2,1,1],scale=0.5,args=[0.86,0.89,4],wireFrame=false,color="orange"}:RectangleBox) {
    const refer = useRef(null)
    // useFrame((state,delta)=>{
    //     if(refer.current){
    //     //@ts-ignore
    //     // refer.current.rotation.y += delta
    //     // refer.current.rotation.x += delta
    //     }

    // })
  return (
    <mesh position={[...position]} ref={refer} scale={scale}>
        <boxGeometry args={[...args]}/>
        <meshStandardMaterial color={color} wireframe={wireFrame} />
    </mesh>
  )
}

export default Rectangle
