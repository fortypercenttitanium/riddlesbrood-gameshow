const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain, dialog } = require('electron');
const iconPath = path.join(__dirname, 'media', 'images', 'icon.png');

let mainWindow;
let gameWindow;
let projectorDisplay;
const electronScreen = electron.screen;

function createWindow() {
	// let factor = electronScreen.getPrimaryDisplay().scaleFactor;
	mainWindow = new BrowserWindow({
		width: 1353,
		height: 902,
		title: 'Riddlesbrood Gameshow - Control Panel',
		webPreferences: {
			nodeIntegration: true,
		},
		icon: iconPath,
	});

	mainWindow.setMenuBarVisibility(false);

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
		icon: iconPath,
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
			if (true) {
				dialog.showMessageBox(mainWindow, {
					type: 'info',
					title: 'Success',
					message: 'Projector connection successful!',
				});
			}
		} else {
			dialog.showMessageBox(mainWindow, {
				type: 'error',
				title: 'Projector error',
				message: 'Projector not found.',
				detail: 'Please plug in projector and try again.',
			});
		}
	});

	ipcMain.on('UPDATE_STATE', (event, state) => {
		gameWindow.webContents.send('SYNC_STATE', state);
	});

	ipcMain.on('WHEEL_GUESS_SEND', (e, key) => {
		gameWindow.webContents.send('WHEEL_GUESS_RECEIVE', key);
	});

	ipcMain.on('SCORE_TYPE_QUERY', () => {
		electron.dialog
			.showMessageBox(mainWindow, {
				type: 'question',
				buttons: ['Teams', 'Individuals'],
				defaultId: 1,
				title: 'Select score mode',
				message: 'Please select a scoring mode:',
			})
			.then((res) => mainWindow.webContents.send('SCORE_TYPE_RESPONSE', res));
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

// app.on('activate', () => {
// 	if (mainWindow === null) {
// 		createWindow();
// 	}
// });
