const mainWindowConfig = require('./mainWindowConfig');
const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow } = require('electron');

module.exports = function createStartScreen({ setWindow }) {
	const startScreenConfig = { ...mainWindowConfig };
	startScreenConfig.title = 'Riddlesbrood Gameshow App';
	const startScreenWindow = new BrowserWindow(startScreenConfig);
	startScreenWindow.webContents.openDevTools();
	startScreenWindow.loadURL(
		isDev
			? 'http://localhost:3000/'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);
	setWindow('start', startScreenWindow);
	startScreenWindow.on('closed', () => {
		setWindow('start', null);
	});
};
