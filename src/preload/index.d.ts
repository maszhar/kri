import '@electron-toolkit/preload'

declare global {
  interface Window {
    mesin: {
      bukaProyek: () => Promise<{ lokasi: string; data: unknown } | null>
      tampilkanDialogSimpanProyek: () => Promise<string>
      simpanProyek: (lokasiBerkas: string, data: unknown) => void
      hasilkanKode: (dataProyek: any) => void
      chatAi: (idPesan: string, koleksiObjekPesan: any[]) => void
    }
    web: {
      chatai: {
        laporkanKemajuan: (callback: (idPesan: string, pesan: string) => void) => void
        laporkanSelesai: (callback: (idPesan: string) => void) => void
        laporkanGalat: (callback: (idPesan: string, galat: string) => void) => void
      }
    }
  }
}
