const mainWindowConfig = require('./mainWindowConfig');
const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow, app, dialog } = require('electron');

module.exports = function createStartScreen({ setWindow, autoUpdater }) {
	function sendStatusToWindow(win, text) {
		autoUpdater.logger.info(text);
		win.webContents.send('message', text);
	}
	const startScreenConfig = { ...mainWindowConfig };
	startScreenConfig.title = 'Riddlesbrood Gameshow App';
	const startScreenWindow = new BrowserWindow(startScreenConfig);
	startScreenWindow.once('ready-to-show', () => {
		autoUpdater.checkForUpdatesAndNotify();
		startScreenWindow.webContents.send('DISABLE_BUTTONS');
	});
	autoUpdater.on('checking-for-update', () => {
		sendStatusToWindow(startScreenWindow, 'Checking for update...');
	});
	autoUpdater.once('update-available', (info) => {
		sendStatusToWindow(startScreenWindow, 'Update available!');
	});
	autoUpdater.once('update-not-available', (info) => {
		sendStatusToWindow(startScreenWindow, 'Latest version');
		startScreenWindow.webContents.send('ENABLE_BUTTONS');
	});
	autoUpdater.once('error', (err) => {
		sendStatusToWindow(startScreenWindow, 'Error in auto-updater. ' + err);
		startScreenWindow.webContents.send('ENABLE_BUTTONS');
	});
	autoUpdater.once('download-progress', (progressObj) => {
		let log_message = `Download speed: ${
			Math.round(progressObj.bytesPerSecond) / 1000
		} KB/sec`;
		log_message =
			log_message + ' - Downloaded ' + Math.floor(progressObj.percent) + '%';
		sendStatusToWindow(startScreenWindow, log_message);
	});
	autoUpdater.once('update-downloaded', async () => {
		const restart = await dialog.showMessageBox({
			message: 'New version is ready to be installed.',
			detail: 'Install now? The app will restart',
			buttons: ['Install', 'Later'],
			cancelId: 1,
		});
		if (restart) {
			autoUpdater.quitAndInstall();
		} else {
			startScreenWindow.send('ENABLE_BUTTONS');
		}
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
