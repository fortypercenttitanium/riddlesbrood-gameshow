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
	autoUpdater.on('update-available', (info) => {
		sendStatusToWindow(startScreenWindow, 'Update available!');
	});
	autoUpdater.on('update-not-available', (info) => {
		sendStatusToWindow(startScreenWindow, 'Latest version already installed');
		startScreenWindow.webContents.send('ENABLE_BUTTONS');
	});
	autoUpdater.on('error', (err) => {
		sendStatusToWindow(startScreenWindow, 'Error in auto-updater. ' + err);
		startScreenWindow.webContents.send('ENABLE_BUTTONS');
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
	autoUpdater.on('update-downloaded', async () => {
		const restart = await dialog.showMessageBox({
			message:
				'New update has been downloaded and will be installed when the app restarts. Restart now?',
			buttons: ['Later', 'Restart'],
		});
		if (restart) {
			app.relaunch();
			app.exit();
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
