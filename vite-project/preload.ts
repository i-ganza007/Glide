import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => process.versions.electron,
  getPlatform: () => process.platform,
});