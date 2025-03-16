import '@electron-toolkit/preload'

declare global {
  interface Window {
    mesin: {
      bukaProyek: () => Promise<{ lokasi: string; data: unknown } | null>
      tampilkanDialogSimpanProyek: () => Promise<string>
      simpanProyek: (lokasiBerkas: string, data: unknown) => void
    }
  }
}
