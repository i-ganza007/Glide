import { Square, RectangleHorizontal, Underline } from "lucide-react"
import {useMeshStore} from "../meshStore/meshStore"
import Box from "../Components/Box"
import Rectangle from "./Rectangle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/Components/ui/toggle-group"

export function ControlPanel() {
    // const meshObjectStore = useMeshStore((state)=>state.meshObjectStore)
    const addMeshObject = useMeshStore(state=>state.addMeshObject)
    const handleCreateBox = () => {
        addMeshObject(<Box/>)
        return null
    }
    const handleCreateRectangle = () => {
        addMeshObject(<Rectangle/>)
        return null
    }
  return (
    <ToggleGroup type="multiple" variant="outline" className="bg-gray-400" size="lg">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Square className="h-9 w-9" onClick={()=>handleCreateBox()} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <RectangleHorizontal className="h-4 w-4" onClick={()=>handleCreateRectangle()} />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
