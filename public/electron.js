const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const mainWindowConfig = require('./electronHelpers/mainWindowConfig');
const projectorMode = require('./electronHelpers/projectorMode');

const iconPath = path.join(__dirname, 'media', 'images', 'icon.png');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let gameWindow;
let projectorDisplay;

function createWindow() {
	const gameWindowConfig = {
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
		},
		x: projectorDisplay ? projectorDisplay.bounds.x + 50 : 0,
		y: projectorDisplay ? projectorDisplay.bounds.y + 50 : 0,
		frame: false,
		fullscreen: !!projectorDisplay,
		title: 'Gameboard',
		show: true,
		icon: iconPath,
	};

	mainWindow = new BrowserWindow(mainWindowConfig);
	gameWindow = new BrowserWindow(gameWindowConfig);

	mainWindow.setMenuBarVisibility(false);
	gameWindow.webContents.setAudioMuted(true);

	gameWindow.on('maximize', (e) => {
		gameWindow.setFullScreen(true);
	});

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);

	gameWindow.loadURL(
		isDev
			? 'http://localhost:3000/#/gameboard'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);

	mainWindow.on('closed', () => {
		gameWindow.close();
		mainWindow = null;
		gameWindow = null;
		app.quit();
	});

	ipcMain.on('REQUEST_PROJECTOR_MODE', () => {
		projectorMode({
			projectorDisplay,
			mainWindow,
			gameWindow,
			isDev,
		});
	});

	ipcMain.on('UPDATE_STATE', (e, state) => {
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

	gameWindow.webContents.executeJavaScript("location.assign('#/gameboard');");

	gameWindow.on('focus', () => {
		mainWindow.focus();
	});

	gameWindow.on('close', (e) => {
		if (mainWindow) {
			e.preventDefault();
		}
	});

	ipcMain.on('FX_BUTTON_SELECT', (e, index) => {
		electron.dialog
			.showOpenDialog(mainWindow, {
				title: 'Select FX file',
				properties: ['openFile'],
				defaultPath: path.join(__dirname, '/fx_buttons'),
				filters: [
					{
						name: 'Supported Audio/Video',
						extensions: ['mp4', 'mp3', 'wav'],
					},
				],
			})
			.then((res) => {
				const file = res.filePaths[0];
				if (res.cancelled) {
					return;
				} else if (path.basename(path.dirname(file)) !== 'fx_buttons') {
					electron.dialog.showErrorBox(
						'Wrong directory',
						'Please select a file within the "fx_buttons" directory.'
					);
					return;
				} else {
					const fileType = path.parse(file).ext === 'mp4' ? 'video' : 'audio';
					const fileName = path.parse(file).name;
					const fileNameAndExt = path.parse(file).base;
					mainWindow.webContents.send('FX_BUTTON_RECEIVE', {
						index,
						name: fileName,
						file: fileNameAndExt,
						type: fileType,
					});
				}
			})
			.catch((rej) => console.log(rej));
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
