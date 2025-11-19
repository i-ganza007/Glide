import { Square, RectangleHorizontal, SquareDashed } from "lucide-react"
import {useMeshStore} from "../meshStore/meshStore"
import Box from "../Components/Box"
import Rectangle from "./Rectangle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/Components/ui/toggle-group"

export function ControlPanel() {
    const [rect_x , rect_y,rect_z]:Number[] = [Math.random()*2,Math.random(),Math.random()]
    const [box_x , box_y,box_z]:Number[] = [Math.random()*2,Math.random(),Math.random()]
    // const meshObjectStore = useMeshStore((state)=>state.meshObjectStore)
    const addMeshObject = useMeshStore(state=>state.addMeshObject)
    const changeActiveWires = useMeshStore(state=>state.changeActiveWires)
    const handleCreateBox = () => {
        addMeshObject({type:"box",pos:[box_x,box_y,box_z]})
        console.log(useMeshStore?.getState().meshObjectStore)
        return null
    }
    const handleCreateRectangle = () => {
        addMeshObject({type:"rectangle",pos:[rect_x,rect_y,rect_z]})
        console.log(useMeshStore.getState().meshObjectStore)
        return null
    }
    const handleActiveWires = () => {
        changeActiveWires()
        return null
    }
  return (
    <ToggleGroup type="multiple" variant="outline" className="bg-gray-400" size="lg">
      <ToggleGroupItem value="bold" onClick={()=>handleCreateBox()} aria-label="Toggle bold">
        <Square className="h-9 w-9" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={()=>handleCreateRectangle()}>
        <RectangleHorizontal className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={()=>handleActiveWires()}>
        <SquareDashed className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
