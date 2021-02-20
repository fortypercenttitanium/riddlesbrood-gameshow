const isDev = require('electron-is-dev');
const mainWindowConfig = require('./mainWindowConfig');
const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

module.exports = function createGameWindows({ getWindow, setWindow }) {
	const iconPath = nativeImage.createFromPath(
		path.join(__dirname, '..', 'icons', 'icon.png')
	);

	const projectorDisplay = getWindow('projector');

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

	const mainWindow = new BrowserWindow(mainWindowConfig);
	const gameWindow = new BrowserWindow(gameWindowConfig);

	mainWindow.setMenuBarVisibility(false);
	gameWindow.webContents.setAudioMuted(true);
	gameWindow.webContents.openDevTools();

	gameWindow.on('maximize', (e) => {
		gameWindow.setFullScreen(true);
	});

	mainWindow.on('closed', () => {
		setWindow('main', null);
		gameWindow.close();
		setWindow('game', null);
		app.quit();
	});

	gameWindow.on('focus', () => {
		mainWindow.focus();
	});

	gameWindow.on('close', (e) => {
		if (getWindow('main')) {
			e.preventDefault();
		}
	});

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000/#/play'
			: `file://${path.join(app.getAppPath(), 'build', 'index.html')}`
	);

	gameWindow.loadURL(
		isDev
			? 'http://localhost:3000/#/gameboard'
			: `file://${path.join(app.getAppPath(), 'build', 'index.html')}`
	);

	if (!isDev) {
		mainWindow.webContents.executeJavaScript("location.assign('#/play');");
		gameWindow.webContents.executeJavaScript("location.assign('#/gameboard');");
	}

	setWindow('main', mainWindow);
	setWindow('game', gameWindow);
};
