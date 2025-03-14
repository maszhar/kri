import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const mesin = {
  tampilkanDialogBukaProyek: (): void => ipcRenderer.send('tampilkanDialogBukaProyek')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('mesin', mesin)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.mesin = mesin
}
