import { DragControls } from "@react-three/drei"
import { useMeshStore } from "../meshStore/meshStore"
import { useRef, useEffect } from "react"
import { Mesh } from "three"
import { useControls } from "leva"
import { calculateDistance, determineJointType, getTubeDimensions } from "../utils/jointDetection"

interface MeshObject {
  uid: string;
  type: string;
  pos: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  visible: boolean;
  color: string;
  tubeParams: {
    width: number;
    height: number;
    length: number;
    thickness: number;
  };
  joints: string[];
}

interface SquareBox {
  mesh: MeshObject;
  args?: [number, number, number];
  wireFrame: boolean;
}

function Box({mesh, args=[0.3,0.9,0.3], wireFrame=false}: SquareBox) {
  const updateMeshPosition = useMeshStore(state => state.updateMeshPosition);
  const updateMeshRotation = useMeshStore(state => state.updateMeshRotation);
  const updateMeshScale = useMeshStore(state => state.updateMeshScale);
  const updateMeshColor = useMeshStore(state => state.updateMeshColor);
  const updateMeshVisibility = useMeshStore(state => state.updateMeshVisibility);
  const addJointPreview = useMeshStore(state => state.addJointPreview);
  const clearJointPreviews = useMeshStore(state => state.clearJointPreviews);
  const allMeshes = useMeshStore(state => state.meshObjectStore);
  const meshRef = useRef<Mesh>(null);

  const boxControls = useControls(`Box ${mesh.uid.slice(0, 8)}`, {
    position: {
      value: { x: mesh.pos[0], y: mesh.pos[1], z: mesh.pos[2] },
      step: 0.1
    },
    rotation: {
      value: { 
        x: (mesh.rotation[0] * 180) / Math.PI, 
        y: (mesh.rotation[1] * 180) / Math.PI, 
        z: (mesh.rotation[2] * 180) / Math.PI 
      },
      step: 1,
      min: -360,
      max: 360
    },
    // Scale controls
    scale: {
      value: { x: mesh.scale[0], y: mesh.scale[1], z: mesh.scale[2] },
      min: 0.1,
      max: 3,
      step: 0.1
    },
    size: {
      value: { width: args[0], height: args[1], depth: args[2] },
      min: 0.1,
      max: 5,
      step: 0.1
    },
    color: { value: mesh.color },
    visible: { value: mesh.visible }
  });

  useEffect(() => {
    updateMeshPosition(mesh.uid, [boxControls.position.x, boxControls.position.y, boxControls.position.z]);
  }, [boxControls.position, mesh.uid, updateMeshPosition]);

  useEffect(() => {
    const radianRotation: [number, number, number] = [
      (boxControls.rotation.x * Math.PI) / 180,
      (boxControls.rotation.y * Math.PI) / 180,
      (boxControls.rotation.z * Math.PI) / 180
    ];
    updateMeshRotation(mesh.uid, radianRotation);
  }, [boxControls.rotation, mesh.uid, updateMeshRotation]);

  useEffect(() => {
    updateMeshScale(mesh.uid, [boxControls.scale.x, boxControls.scale.y, boxControls.scale.z]);
  }, [boxControls.scale, mesh.uid, updateMeshScale]);

  useEffect(() => {
    updateMeshColor(mesh.uid, boxControls.color);
  }, [boxControls.color, mesh.uid, updateMeshColor]);

  useEffect(() => {
    updateMeshVisibility(mesh.uid, boxControls.visible);
  }, [boxControls.visible, mesh.uid, updateMeshVisibility]);

  useEffect(() => {
    const otherMeshes = allMeshes.filter(m => m.uid !== mesh.uid);
    const proximityThreshold = 2;
    
    clearJointPreviews();
    
    otherMeshes.forEach(otherMesh => {
      const distance = calculateDistance(mesh, otherMesh);
      if (distance < proximityThreshold) {
        const jointPos: [number, number, number] = [
          (mesh.pos[0] + otherMesh.pos[0]) / 2,
          (mesh.pos[1] + otherMesh.pos[1]) / 2,
          (mesh.pos[2] + otherMesh.pos[2]) / 2
        ];
        
        const angleDiff = Math.abs(
          ((mesh.rotation[1] - otherMesh.rotation[1]) * 180) / Math.PI
        );
        
        const jointType = determineJointType(mesh, otherMesh);
        const mesh1Params = getTubeDimensions(mesh, args);
        const mesh2Params = getTubeDimensions(otherMesh, args);
        
        addJointPreview(mesh.uid, otherMesh.uid, jointPos, angleDiff, jointType, mesh1Params, mesh2Params);
      }
    });
  }, [mesh.pos, mesh.rotation, allMeshes, mesh.uid, addJointPreview, clearJointPreviews, args]);
  
  const handleDragEnd = () => {
    if (meshRef.current) {
      const position: [number, number, number] = [
        meshRef.current.position.x,
        meshRef.current.position.y,
        meshRef.current.position.z
      ];
      updateMeshPosition(mesh.uid, position);
    }
  };

  return (
    <DragControls onDragEnd={handleDragEnd}>
      <mesh 
        ref={meshRef} 
        position={[boxControls.position.x, boxControls.position.y, boxControls.position.z]}
        rotation={[
          (boxControls.rotation.x * Math.PI) / 180,
          (boxControls.rotation.y * Math.PI) / 180,
          (boxControls.rotation.z * Math.PI) / 180
        ]}
        scale={[boxControls.scale.x, boxControls.scale.y, boxControls.scale.z]}
        visible={boxControls.visible}
      > 
        <boxGeometry args={[boxControls.size.width, boxControls.size.height, boxControls.size.depth]}/>
        <meshStandardMaterial color={boxControls.color} wireframe={wireFrame}/>
      </mesh>
    </DragControls>
  )
}

export default Box
