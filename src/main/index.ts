import { app, shell, BrowserWindow, ipcMain, dialog, FileFilter } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ProyekLama } from '../umum/entitas/ProyekLama'
import { ProyekPb } from '../umum/proto/kri'
import { writeFile, readFile } from 'fs/promises'
import { PenghasilKode } from './penghasil-kode/PenghasilKode'
import { KontrolChatAi } from './chat-ai/KontrolChatAi'
import * as dotenv from 'dotenv'

dotenv.config()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 1024,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  const kriFileFilter: FileFilter = {
    name: 'Proyek Kri',
    extensions: ['kri']
  }

  const kontrolChatAi = new KontrolChatAi(
    (idPesan: string, potonganPesan: string): void => {
      mainWindow.webContents.send('laporkanKemajuanChatAi', idPesan, potonganPesan)
    },
    (idPesan: string) => mainWindow.webContents.send('laporkanSelesaiChatAi', idPesan),
    (idPesan: string, galat: string) =>
      mainWindow.webContents.send('laporkanGalatChatAi', idPesan, galat)
  )

  ipcMain.handle('bukaProyek', async (): Promise<{ lokasi: string; data: unknown } | null> => {
    const hasilBukaBerkas = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [kriFileFilter]
    })
    if (hasilBukaBerkas.canceled) {
      return null
    }

    const buffer = await readFile(hasilBukaBerkas.filePaths[0])
    const binaryProyekKri = new Uint8Array(buffer)

    if (binaryProyekKri.length < 1) {
      // TODO: throw error
      return null
    }

    if (binaryProyekKri[0] !== 1) {
      // TODO: throw error
      return null
    }

    const binaryProyek = new Uint8Array(binaryProyekKri.length - 1)
    for (let i = 0; i < binaryProyek.length; i++) {
      binaryProyek[i] = binaryProyekKri[i + 1]
    }

    const protoProyek = ProyekPb.fromBinary(binaryProyek)
    const proyek = ProyekLama.dariProto(protoProyek)
    return {
      lokasi: hasilBukaBerkas.filePaths[0],
      data: proyek.bungkusData()
    }
  })

  ipcMain.handle('tampilkanDialogSimpanProyek', async (): Promise<string | null> => {
    const hasil = await dialog.showSaveDialog({
      properties: ['showOverwriteConfirmation'],
      filters: [kriFileFilter],
      defaultPath: 'Proyek Baru.kri'
    })
    return !hasil.canceled ? hasil.filePath : null
  })

  ipcMain.handle('simpanProyek', async (_, lokasiBerkas, data): Promise<void> => {
    const proyek = ProyekLama.bongkarBungkusanData(data)
    const protoProyek = proyek.keProto()
    const binaryProyek = ProyekPb.toBinary(protoProyek)

    const binaryProyekKri = new Uint8Array(binaryProyek.length + 1)
    binaryProyekKri[0] = 1
    for (let i = 0; i < binaryProyek.length; i++) {
      binaryProyekKri[i + 1] = binaryProyek[i]
    }

    await writeFile(lokasiBerkas, binaryProyekKri)
  })

  ipcMain.on('chatAi', (_, idPesan: string, koleksiPesan: any[]) => {
    kontrolChatAi.chat(idPesan, koleksiPesan)
  })

  const penghasilKode = new PenghasilKode()

  ipcMain.on('hasilkanKode', async (_, dataProyek): Promise<void> => {
    const hasilPilihFolderHasilKode = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (hasilPilihFolderHasilKode.canceled) {
      return
    }
    const proyek = ProyekLama.bongkarBungkusanData(dataProyek)
    penghasilKode.hasilkanKodeTypescript({
      proyek: proyek,
      folderHasilKode: hasilPilihFolderHasilKode.filePaths[0]
    })
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
