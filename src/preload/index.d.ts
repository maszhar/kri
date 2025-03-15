import '@electron-toolkit/preload'

declare global {
  interface Window {
    mesin: {
      tampilkanDialogBukaProyek: () => void
    }
  }
}
