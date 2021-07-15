// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const { default: installExtension } = require('electron-devtools-installer');
const path = require('path');

const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:8080/` :
  path.join(__dirname, 'dist/index.html');

let optionsWindow;
let newItemWindow;
let mainWindow;

const globalWebPreferences = {
  preload : path.join(__dirname, 'preload.js')
};

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width       : 800,
    height      : 600,
    frame       : false,
    transparent : true,

    // backgroundColor   : '#ffffff',
    tabbingIdentifier : 'GW2 Goals',
    webPreferences    : {
      ...globalWebPreferences
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(winURL);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

ipcMain.on('openNew', createNewItemWindow);
ipcMain.on('closeNew', closeNewItemWindow);
function createNewItemWindow() {
  if (newItemWindow) {
    return console.warn('New item window already open');
  }
  newItemWindow = new BrowserWindow({
    height         : 250,
    width          : 300,
    useContentSize : true,
    parent         : mainWindow,
    modal          : false,
    webPreferences : {
      ...globalWebPreferences
    }
  });
  newItemWindow.loadURL(`${winURL}new`);
  newItemWindow.on('closed', () => {
    newItemWindow = null;
  });
}
function closeNewItemWindow() {
  if (!newItemWindow) return console.warn('Tried to close the new item window when it didn\'t exist');
  newItemWindow.close();
}

ipcMain.on('openOptions', createOptionsWindow);
ipcMain.on('closeOptions', closeOptionsWindow);
function createOptionsWindow() {
  if (optionsWindow) {
    return console.warn('Options already open');
  }
  optionsWindow = new BrowserWindow({
    height         : 245,
    width          : 595,
    useContentSize : true,
    frame          : false,
    parent         : mainWindow,
    transparent    : true,
    resizable      : false,
    modal          : false,
    webPreferences : {
      ...globalWebPreferences
    }
  });
  optionsWindow.loadURL(`${winURL}options`);
  optionsWindow.on('closed', () => {
    optionsWindow = null;
  });
}
function closeOptionsWindow() {
  if (!optionsWindow) return console.warn('Tried to close the options window when it didn\'t exist');
  optionsWindow.close();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // installExtension('ljjemllljcmogpfapbkkighbhhppjdbg');
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const setupOptions = async() => {
  const OptionInferface = require('./electron-utils/OptionInterface');
  await OptionInferface.setupData();
  ipcMain.on(`options:get`, (event) => {
    event.reply('options:get', OptionInferface.options);
  });
  ipcMain.on('options:set', async (event, newData) => {
    try {
      await OptionInferface.updateOptions(newData);
      mainWindow.webContents.send('options:get', OptionInferface.options);
      event.reply('options:get', OptionInferface.options);
    }
    catch (error) {
      console.error('main.js@:', error.message);
      event.reply('options:failed', error);
    }
  });
};

setupOptions();
