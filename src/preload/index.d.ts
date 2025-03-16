import '@electron-toolkit/preload'

declare global {
  interface Window {
    mesin: {
      tampilkanDialogBukaProyek: () => void
      tampilkanDialogSimpanProyek: () => Promise<string>
      simpanProyek: (lokasiBerkas: string, data: unknown) => void
    }
  }
}
