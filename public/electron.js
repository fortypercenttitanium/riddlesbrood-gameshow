const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain, dialog } = require('electron');

let mainWindow;
let gameWindow;
let projectorDisplay;
const electronScreen = electron.screen;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1620,
		height: 1080,
		title: 'Control Panel',
		webPreferences: {
			nodeIntegration: true,
		},
	});
	gameWindow = new BrowserWindow({
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
		},
		x: projectorDisplay ? projectorDisplay.bounds.x + 50 : 0,
		y: projectorDisplay ? projectorDisplay.bounds.y + 50 : 0,
		frame: false,
		fullscreen: Boolean(projectorDisplay),
		title: 'Gameboard',
		show: true,
	});

	gameWindow.on('maximize', (e) => {
		gameWindow.setFullScreen(true);
	});

	gameWindow.webContents.setAudioMuted(true);

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);
	mainWindow.on('closed', () => {
		gameWindow.close();
		mainWindow = null;
		gameWindow = null;
		app.quit();
	});

	ipcMain.on('REQUEST_PROJECTOR_MODE', (event, args) => {
		projectorDisplay = electronScreen.getAllDisplays().find((display) => {
			return display.bounds.x !== 0 || display.bounds.y !== 0;
		});
		if (projectorDisplay !== undefined) {
			gameWindow.setBounds({
				x: projectorDisplay.bounds.x + 50,
				y: projectorDisplay.bounds.y + 50,
			});
			gameWindow.maximize();
			if (!isDev) {
				dialog.showMessageBox({
					type: 'info',
					title: 'Success',
					message: 'Projector connection successful!',
				});
			}
		} else {
			dialog.showErrorBox(
				'Error',
				'Projector not found. Please plug in projector and try again.'
			);
		}
	});

	ipcMain.on('UPDATE_STATE', (event, state) => {
		gameWindow.webContents.send('SYNC_STATE', state);
	});

	ipcMain.on('WHEEL_GUESS_SEND', (e, key) => {
		gameWindow.webContents.send('WHEEL_GUESS_RECEIVE', key);
	});

	// Dev Tools
	ipcMain.on('TOGGLE_DEV_TOOLS', () => {
		mainWindow.webContents.toggleDevTools();
		gameWindow.webContents.toggleDevTools();
	});

	gameWindow.loadURL(
		isDev
			? 'http://localhost:3000/#/gameboard'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);

	gameWindow.webContents.executeJavaScript("location.assign('#/gameboard');");

	gameWindow.on('focus', () => {
		mainWindow.focus();
	});

	gameWindow.on('close', (e) => {
		if (mainWindow) {
			e.preventDefault();
		}
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
