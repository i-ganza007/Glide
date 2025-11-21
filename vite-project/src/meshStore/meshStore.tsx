    //@ts-nocheck
import { create } from "zustand";


export const useMeshStore = create((set)=>({
    meshObjectStore : [],
    activeWires:false,
    addMeshObject:  (mesh)=>set((state)=>({meshObjectStore:[mesh,...state.meshObjectStore]})),
    changeActiveWires : ()=>set(state=>({activeWires:!state.activeWires})),
    changeVisibleStatus: (id,newInfo) => set(state=>({}))
}))