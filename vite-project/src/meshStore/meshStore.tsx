import { create } from "zustand";

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

interface JointPreview {
  from: string;
  to: string;
  position: [number, number, number];
  angle: number;
  jointType: 'T' | 'L' | 'Cross' | 'Corner';
  mesh1Params: [number, number, number];
  mesh2Params: [number, number, number];
}

interface MeshStore {
  meshObjectStore: MeshObject[];
  activeWires: boolean;
  selectedMesh: string | null;
  jointPreviews: JointPreview[];
  addMeshObject: (mesh: MeshObject) => void;
  changeActiveWires: () => void;
  changeVisibleStatus: (id: string, newInfo: any) => void;
  updateMeshPosition: (uid: string, newPosition: [number, number, number]) => void;
  updateMeshRotation: (uid: string, newRotation: [number, number, number]) => void;
  updateMeshScale: (uid: string, newScale: [number, number, number]) => void;
  updateMeshColor: (uid: string, newColor: string) => void;
  updateMeshVisibility: (uid: string, visible: boolean) => void;
  updateTubeParams: (uid: string, params: Partial<MeshObject['tubeParams']>) => void;
  setSelectedMesh: (uid: string | null) => void;
  addJointPreview: (from: string, to: string, position: [number, number, number], angle: number, jointType: 'T' | 'L' | 'Cross' | 'Corner', mesh1Params: [number, number, number], mesh2Params: [number, number, number]) => void;
  clearJointPreviews: () => void;
  createJoint: (fromUid: string, toUid: string) => void;
}

export const useMeshStore = create<MeshStore>((set) => ({
    meshObjectStore : [],
    activeWires:false,
    selectedMesh: null,
    jointPreviews: [],
    addMeshObject:  (mesh) => set((state) => ({meshObjectStore:[mesh,...state.meshObjectStore]})),
    changeActiveWires : () => set(state => ({activeWires:!state.activeWires})),
    changeVisibleStatus: (id,newInfo) => set(state => ({})),
    updateMeshPosition: (uid, newPosition) => set(state => ({
        meshObjectStore: state.meshObjectStore.map(mesh => mesh.uid === uid ? { ...mesh, pos: newPosition } : mesh)
    })),
    updateMeshRotation: (uid, newRotation) => set(state => ({
        meshObjectStore: state.meshObjectStore.map(mesh => mesh.uid === uid ? { ...mesh, rotation: newRotation } : mesh)
    })),
    updateMeshScale: (uid, newScale) => set(state => ({
meshObjectStore: state.meshObjectStore.map(mesh => mesh.uid === uid ? { ...mesh, scale: newScale } : mesh)
    })),
    updateMeshColor: (uid, newColor) => set(state => ({
        meshObjectStore: state.meshObjectStore.map(mesh => mesh.uid === uid ? { ...mesh, color: newColor } : mesh)
    })),
    updateMeshVisibility: (uid, visible) => set(state => ({
        meshObjectStore: state.meshObjectStore.map(mesh => mesh.uid === uid ? { ...mesh, visible } : mesh)
    })),
    updateTubeParams: (uid, params) => set(state => ({
        meshObjectStore: state.meshObjectStore.map(mesh => mesh.uid === uid ? { ...mesh, tubeParams: { ...mesh.tubeParams, ...params } } : mesh)
    })),
    setSelectedMesh: (uid) => set(() => ({ selectedMesh: uid })),
    addJointPreview: (from, to, position, angle, jointType, mesh1Params, mesh2Params) => set(state => ({
        jointPreviews: [...state.jointPreviews.filter(jp => !(jp.from === from && jp.to === to)), { from, to, position, angle, jointType, mesh1Params, mesh2Params }]
    })),
    clearJointPreviews: () => set(() => ({ jointPreviews: [] })),
    createJoint: (fromUid, toUid) => set(state => ({
        meshObjectStore: state.meshObjectStore.map(mesh => {
            if (mesh.uid === fromUid) {
                return { ...mesh, joints: [...mesh.joints, toUid] };
            }
            if (mesh.uid === toUid) {
                return { ...mesh, joints: [...mesh.joints, fromUid] };
            }
            return mesh;
        })
    }))
}))