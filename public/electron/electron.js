const electron = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const attachAutoUpdater = require('./electronHelpers/attachAutoUpdater');
const attachIPCListeners = require('./electronHelpers/attachIPCListeners');
const checkAssetFolders = require('./electronHelpers/checkAssetFolders');
const {
  mainWindowConfig,
  gameWindowConfig,
} = require('./electronHelpers/windowConfigs');
const projectorMode = require('./electronHelpers/projectorMode');
const { protocol, ipcMain, app, BrowserWindow } = electron;
const isDev = require('electron-is-dev');
const log = require('electron-log');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');

log.catchErrors();

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

let mainWindow;
let gameWindow;
let startScreenWindow;
let projectorDisplay;

function getWindow(win) {
  switch (win) {
    case 'main':
      return mainWindow;
    case 'game':
      return gameWindow;
    case 'start':
      return startScreenWindow;
    case 'projector':
      return projectorDisplay;
    default:
      break;
  }
}

function setWindow(win, setting) {
  switch (win) {
    case 'main':
      mainWindow = setting;
      break;
    case 'game':
      gameWindow = setting;
      break;
    case 'start':
      startScreenWindow = setting;
      break;
    case 'projector':
      projectorDisplay = setting;
      break;
    default:
      break;
  }
}

checkAssetFolders();

attachIPCListeners({ getWindow, setWindow, createGameWindows });

function createStartScreen() {
  const startScreenConfig = { ...mainWindowConfig };
  startScreenConfig.title = 'Riddlesbrood Gameshow App';
  startScreenWindow = new BrowserWindow(startScreenConfig);

  attachAutoUpdater({ startScreenWindow, autoUpdater });

  startScreenWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(app.getAppPath(), 'build', 'index.html')}`,
  );

  ipcMain.once('LAUNCH_GAME', (_, { debugging }) => {
    createGameWindows({ debugging });
    startScreenWindow.close();
    startScreenWindow = null;
  });
}

function createGameWindows({ debugging }) {
  gameWindowConfig.x = projectorDisplay ? projectorDisplay.bounds.x + 50 : 0;
  gameWindowConfig.y = projectorDisplay ? projectorDisplay.bounds.y + 50 : 0;
  gameWindowConfig.fullscreen = !!projectorDisplay;

  mainWindow = new BrowserWindow(mainWindowConfig);
  gameWindow = new BrowserWindow(gameWindowConfig);

  mainWindow.setMenuBarVisibility(false);
  mainWindow.focus();

  ipcMain.on('REQUEST_PROJECTOR_MODE', () => {
    projectorMode({ mainWindow, gameWindow, projectorDisplay });
  });

  ipcMain.on('DISPATCH', (e, state) => {
    if (gameWindow) {
      gameWindow.webContents.send('SYNC_STATE', state);
    }
  });

  ipcMain.on('WHEEL_GUESS_SEND', (e, key) => {
    gameWindow.webContents.send('WHEEL_GUESS_RECEIVE', key);
  });

  ipcMain.on('PLAY_VIDEO_SEND', (e, payload) => {
    gameWindow.webContents.send('PLAY_VIDEO_RECEIVE', payload);
    mainWindow.webContents.send('PLAY_VIDEO_RECEIVE', payload);
  });

  ipcMain.on('STOP_VIDEO_SEND', () => {
    gameWindow.webContents.send('STOP_VIDEO_RECEIVE');
    mainWindow.webContents.send('STOP_VIDEO_RECEIVE');
  });

  if (isDev) gameWindow.webContents.openDevTools();

  if (debugging) {
    gameWindow.webContents.openDevTools();
    mainWindow.webContents.openDevTools();
  }

  gameWindow.on('maximize', (e) => {
    gameWindow.setFullScreen(true);
  });

  mainWindow.on('closed', (e) => {
    mainWindow = null;
    gameWindow.close();
  });

  gameWindow.on('focus', () => {
    if (mainWindow) mainWindow.focus();
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/#/play'
      : `file://${path.join(app.getAppPath(), 'build', 'index.html')}`,
  );

  gameWindow.loadURL(
    isDev
      ? 'http://localhost:3000/#/gameboard'
      : `file://${path.join(app.getAppPath(), 'build', 'index.html')}`,
  );

  if (!isDev) {
    mainWindow.webContents.executeJavaScript("location.assign('#/play');");
    gameWindow.webContents.executeJavaScript("location.assign('#/gameboard');");
  }
}

// remove media key functionality from app
app.commandLine.appendSwitch(
  'disable-features',
  'HardwareMediaKeyHandling,MediaSessionService',
);

app.on('ready', () => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  protocol.registerFileProtocol('app', (req, cb) => {
    const url = req.url.substr(6);
    const userDataPath = app.getPath('userData');
    cb({ path: path.join(userDataPath, url) });
  });
  createStartScreen();
});

app.on('window-all-closed', () => {
  mainWindow = null;
  gameWindow = null;
  startScreenWindow = null;
  projectorDisplay = null;
  app.exit();
});
