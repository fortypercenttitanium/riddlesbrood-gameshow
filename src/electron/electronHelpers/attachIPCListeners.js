const createGameWindows = require('./createGameWindows');
const storeAppData = require('./storeAppData');
const { dialog, ipcMain } = require('electron');
const { showErrorBox, showMessageBox } = require('./messageBoxes');
const projectorMode = require('./projectorMode');

module.exports = function attachIPCListeners({ getWindow, setWindow }) {
	ipcMain.once('LAUNCH_GAME', () => {
		createGameWindows({ getWindow, setWindow });
		getWindow('start').close();
	});
	ipcMain.on('STORE_APP_DATA', (e, type, filename, data) => {
		storeAppData(type, filename, data);
	});
	ipcMain.on('MESSAGE_BOX', (e, payload) => {
		showMessageBox(payload.title, payload.message);
	});
	ipcMain.on('ERROR_BOX', (e, payload) => {
		showErrorBox(payload.title, payload.message);
	});
	ipcMain.on('NEW_FX_BUTTON', async (e, { payload }) => {
		try {
			const file = await dialog.showOpenDialog({
				title: 'Select file for new FX button',
				filters: [
					{ name: 'Media (mp3, wav, mp4)', extensions: ['mp3', 'mp4', 'wav'] },
				],
			});
			if (!file.canceled) {
				await storeAppData('fx_button', payload.name, file);
				showMessageBox('Success', 'FX button added!');
			}
		} catch (err) {
			showErrorBox('Error', err);
		}
	});

	ipcMain.on('TOGGLE_DEV_TOOLS', () => {
		const startScreenWindow = getWindow('start');
		const mainWindow = getWindow('main');
		const gameWindow = getWindow('game');

		if (startScreenWindow) {
			startScreenWindow.webContents.toggleDevTools();
		} else {
			mainWindow.webContents.toggleDevTools();
			gameWindow.webContents.toggleDevTools();
		}
	});

	ipcMain.on('REQUEST_PROJECTOR_MODE', () => {
		projectorMode({ getWindow, setWindow });
	});

	ipcMain.on('UPDATE_STATE', (e, state) => {
		getWindow('game').webContents.send('SYNC_STATE', state);
	});

	ipcMain.on('WHEEL_GUESS_SEND', (e, key) => {
		getWindow('game').webContents.send('WHEEL_GUESS_RECEIVE', key);
	});
};
