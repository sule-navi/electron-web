/*
 * @Author: Sule
 * @Date: 2020-12-10 16:18:14
 * @LastEditors: Sule
 * @LastEditTime: 2020-12-10 17:39:19
 * @Description: 
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
const path = require('path')

function createWindow() {
  Menu.setApplicationMenu(null)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1520,
    height: 1810,
    minWidth: 1300,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  globalShortcut.register('Control+L', () => {  // creates a global shortcut
    mainWindow.webContents.openDevTools();
  })
  globalShortcut.register('Control+R', () => {  // creates a global shortcut
    mainWindow.reload();
  })
  mainWindow.on('resize', () => {
    mainWindow.reload();
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
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
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
