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
	});

	autoUpdater.once('checking-for-update', () => {
		sendStatusToWindow(startScreenWindow, 'Checking for update...');
	});

	autoUpdater.once('update-available', async () => {
		startScreenWindow.webContents.send('DISABLE_BUTTONS');
		sendStatusToWindow(startScreenWindow, 'Update available!');
		const shouldNotDownload = await dialog.showMessageBox({
			message: 'A new version is available.',
			detail:
				'Would you like to download and install now? The app will restart',
			buttons: ['Download and Install', 'Later'],
			cancelId: 1,
		});

		if (!shouldNotDownload.response) {
			autoUpdater.downloadUpdate();
		} else {
			startScreenWindow.webContents.send('ENABLE_BUTTONS');
			autoUpdater.removeAllListeners('update-not-available');
			autoUpdater.removeAllListeners('error');
			autoUpdater.removeAllListeners('download-progress');
			autoUpdater.removeAllListeners('update-downloaded');
		}
	});

	autoUpdater.once('update-not-available', () => {
		sendStatusToWindow(startScreenWindow, 'Latest version');
		startScreenWindow.webContents.send('ENABLE_BUTTONS');
		autoUpdater.removeAllListeners('update-available');
		autoUpdater.removeAllListeners('error');
		autoUpdater.removeAllListeners('download-progress');
		autoUpdater.removeAllListeners('update-downloaded');
	});

	autoUpdater.once('error', (err) => {
		sendStatusToWindow(
			startScreenWindow,
			'Skipping auto-update - no internet connection.'
		);
		autoUpdater.logger.info(`Auto-updater error: ${err}`);
		startScreenWindow.webContents.send('ENABLE_BUTTONS');
	});

	autoUpdater.on('download-progress', (progressObj) => {
		const log_message = `Download speed: ${Math.round(
			progressObj.bytesPerSecond / 1000
		)} KB/sec`;
		sendStatusToWindow(startScreenWindow, log_message);
		startScreenWindow.webContents.send(
			'UPDATE_DOWNLOAD_PROGRESS',
			Math.floor(progressObj.percent)
		);
	});

	autoUpdater.once('update-downloaded', async () => {
		sendStatusToWindow(
			startScreenWindow,
			'Update downloaded. Restarting app and installing...'
		);
		setTimeout(() => autoUpdater.quitAndInstall(), 2000);
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
