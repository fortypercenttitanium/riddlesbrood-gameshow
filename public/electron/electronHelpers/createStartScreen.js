const mainWindowConfig = require('./mainWindowConfig');
const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow, app } = require('electron');

module.exports = function createStartScreen({ setWindow, autoUpdater }) {
	function sendStatusToWindow(win, text) {
		autoUpdater.logger.info(text);
		win.webContents.send('message', text);
	}
	const startScreenConfig = { ...mainWindowConfig };
	startScreenConfig.title = 'Riddlesbrood Gameshow App';
	const startScreenWindow = new BrowserWindow(startScreenConfig);
	startScreenWindow.webContents.openDevTools();
	autoUpdater.on('checking-for-update', () => {
		sendStatusToWindow(startScreenWindow, 'Checking for update...');
	});
	autoUpdater.on('update-available', (info) => {
		sendStatusToWindow(startScreenWindow, 'Update available.');
	});
	autoUpdater.on('update-not-available', (info) => {
		sendStatusToWindow(startScreenWindow, 'Update not available.');
	});
	autoUpdater.on('error', (err) => {
		sendStatusToWindow(startScreenWindow, 'Error in auto-updater. ' + err);
	});
	autoUpdater.on('download-progress', (progressObj) => {
		let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
		log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
		log_message =
			log_message +
			' (' +
			progressObj.transferred +
			'/' +
			progressObj.total +
			')';
		sendStatusToWindow(startScreenWindow, log_message);
	});
	autoUpdater.on('update-downloaded', (info) => {
		sendStatusToWindow(startScreenWindow, 'Update downloaded');
	});
	startScreenWindow.loadURL(
		isDev
			? 'http://localhost:3000/'
			: `file://${path.join(app.getAppPath(), 'build', 'index.html')}`
	);
	setWindow('start', startScreenWindow);
	startScreenWindow.on('closed', () => {
		setWindow('start', null);
	});
};
