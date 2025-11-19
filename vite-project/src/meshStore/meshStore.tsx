import { create } from "zustand";


export const useMeshStore = create((set)=>({
    meshObjectStore : [],
    //@ts-ignore
    addMeshObject:  (mesh)=>set((state)=>({meshObjectStore:[mesh,...state.meshObjectStore]})),
}))