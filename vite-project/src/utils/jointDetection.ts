import { Vector3, Box3 } from 'three';

export interface MeshObject {
  uid: string;
  type: string;
  pos: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  visible: boolean;
  color: string;
  tubeParams?: {
    width: number;
    height: number;
    length: number;
    thickness: number;
  };
  joints?: string[];
}

export interface Joint {
  id: string;
  mesh1Id: string;
  mesh2Id: string;
  position: [number, number, number];
  angle: number;
  distance: number;
  jointType: 'T' | 'L' | 'Cross' | 'Corner';
  mesh1Params: [number, number, number];
  mesh2Params: [number, number, number];
}

export type JointType = 'T' | 'L' | 'Cross' | 'Corner';

export function calculateDistance(mesh1: MeshObject, mesh2: MeshObject): number {
  const pos1 = new Vector3(...mesh1.pos);
  const pos2 = new Vector3(...mesh2.pos);
  return pos1.distanceTo(pos2);
}

export function areNearbyForJoint(mesh1: MeshObject, mesh2: MeshObject, threshold: number = 2): boolean {
  return calculateDistance(mesh1, mesh2) < threshold;
}


export function getMeshBoundingBox(mesh: MeshObject, args: [number, number, number]): Box3 {
  const [width, height, depth] = args;
  const [scaleX, scaleY, scaleZ] = mesh.scale;
  
  const scaledWidth = width * scaleX;
  const scaledHeight = height * scaleY;
  const scaledDepth = depth * scaleZ;
  
  const center = new Vector3(...mesh.pos);
  
  const box = new Box3();
  box.setFromCenterAndSize(center, new Vector3(scaledWidth, scaledHeight, scaledDepth));
  
  return box;
}


export function doBoxesIntersect(box1: Box3, box2: Box3): boolean {
  return box1.intersectsBox(box2);
}


export function findIntersectionPoint(mesh1: MeshObject, mesh2: MeshObject): Vector3 | null {
  const pos1 = new Vector3(...mesh1.pos);
  const pos2 = new Vector3(...mesh2.pos);
  
  const midpoint = pos1.clone().add(pos2).multiplyScalar(0.5);
  return midpoint;
}


export function calculateJointAngle(mesh1: MeshObject, mesh2: MeshObject): number {
  const rot1 = new Vector3(...mesh1.rotation);
  const rot2 = new Vector3(...mesh2.rotation);
  
  const angleDiff = Math.abs(rot1.y - rot2.y);
  return (angleDiff * 180) / Math.PI;
}


export function determineJointType(mesh1: MeshObject, mesh2: MeshObject): JointType {
  const angle = calculateJointAngle(mesh1, mesh2);
  
  const normalizedAngle = Math.abs(angle) % 180;
  
  if (normalizedAngle < 15 || normalizedAngle > 165) {
    return 'T'; 
  } else if (normalizedAngle >= 80 && normalizedAngle <= 100) {
    return 'L'; 
  } else if (normalizedAngle >= 40 && normalizedAngle <= 50) {
    return 'Corner'; 
  } else {
    return 'Cross'; 
  }
}


export function getTubeDimensions(mesh: MeshObject, defaultArgs: [number, number, number]): [number, number, number] {
  if (mesh.tubeParams) {
    return [mesh.tubeParams.width, mesh.tubeParams.height, mesh.tubeParams.length];
  }
  return defaultArgs;
}


export function calculateOptimalJointPosition(mesh1: MeshObject, mesh2: MeshObject): Vector3 {
  const pos1 = new Vector3(...mesh1.pos);
  const pos2 = new Vector3(...mesh2.pos);
  
  return pos1.clone().add(pos2).multiplyScalar(0.5);
}


export function findPotentialJoints(meshes: MeshObject[], proximityThreshold: number = 2, defaultArgs: [number, number, number] = [1, 1, 1]): Joint[] {
  const joints: Joint[] = [];
  
  for (let i = 0; i < meshes.length; i++) {
    for (let j = i + 1; j < meshes.length; j++) {
      const mesh1 = meshes[i];
      const mesh2 = meshes[j];
      
      if (areNearbyForJoint(mesh1, mesh2, proximityThreshold)) {
        const intersectionPoint = calculateOptimalJointPosition(mesh1, mesh2);
        const jointType = determineJointType(mesh1, mesh2);
        const mesh1Params = getTubeDimensions(mesh1, defaultArgs);
        const mesh2Params = getTubeDimensions(mesh2, defaultArgs);
        
        const joint: Joint = {
          id: `joint_${mesh1.uid.slice(0, 8)}_${mesh2.uid.slice(0, 8)}`,
          mesh1Id: mesh1.uid,
          mesh2Id: mesh2.uid,
          position: [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z],
          angle: calculateJointAngle(mesh1, mesh2),
          distance: calculateDistance(mesh1, mesh2),
          jointType,
          mesh1Params,
          mesh2Params
        };
        joints.push(joint);
      }
    }
  }
  
  return joints;
}