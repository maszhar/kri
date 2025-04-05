import { contextBridge, IpcRenderer, ipcRenderer } from 'electron'

// Custom APIs for renderer
const mesin = {
  bukaProyek: (): Promise<{ lokasi: string; data: unknown } | null> =>
    ipcRenderer.invoke('bukaProyek'),
  tampilkanDialogSimpanProyek: (): Promise<string | null> =>
    ipcRenderer.invoke('tampilkanDialogSimpanProyek'),
  simpanProyek: (lokasiBerkas: string, data: unknown): Promise<void> =>
    ipcRenderer.invoke('simpanProyek', lokasiBerkas, data),
  hasilkanKode: (dataProyek: any): void => ipcRenderer.send('hasilkanKode', dataProyek),
  chatAi: (idPesan: string, koleksiObjekPesan: any[]): void =>
    ipcRenderer.send('chatAi', idPesan, koleksiObjekPesan)
}

const web = {
  chatai: {
    laporkanKemajuan: (callback: (idPesan: string, pesan: string) => void): IpcRenderer =>
      ipcRenderer.on('laporkanKemajuanChatAi', (_, idPesan: string, pesan: string) =>
        callback(idPesan, pesan)
      ),
    laporkanSelesai: (callback: (idPesan: string) => void): IpcRenderer =>
      ipcRenderer.on('laporkanSelesaiChatAi', (_, idPesan: string): void => callback(idPesan)),
    laporkanGalat: (callback: (idPesan: string, galat: string) => void): IpcRenderer =>
      ipcRenderer.on('laporkanGalatChatAi', (_, idPesan: string, galat: string) =>
        callback(idPesan, galat)
      )
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('mesin', mesin)
    contextBridge.exposeInMainWorld('web', web)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.mesin = mesin
  // @ts-ignore (define in dts)
  window.web = web
}
