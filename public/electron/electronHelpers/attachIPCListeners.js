const createGameWindows = require('./createGameWindows');
const storeAppData = require('./storeAppData');
const fs = require('fs');
const util = require('util');
const path = require('path');
const isDev = require('electron-is-dev');
const { dialog, ipcMain, app } = require('electron');
const { showErrorBox, showMessageBox } = require('./messageBoxes');
const { getAllFxFiles, findFxFile } = require('./fxFiles');
const projectorMode = require('./projectorMode');

const readFilePromise = util.promisify(fs.readFile);

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
	ipcMain.handle('NEW_FX_BUTTON', async (e, { name, filePath, ext }) => {
		try {
			const existingFileNames = getAllFxFiles().map((file) => {
				return file.name;
			});
			if (existingFileNames.includes(name)) {
				showErrorBox(
					'Error',
					'FX button name already exists. Please choose a different name.'
				);
				return false;
			}
			const newFileName = `${name}.${ext}`;
			const fileData = await readFilePromise(filePath);
			const result = await storeAppData('fx_button', newFileName, fileData);
			if (result) {
				showMessageBox('Success', 'FX button added!');
				return true;
			} else {
				return false;
			}
		} catch (err) {
			showErrorBox('Error', err);
			return false;
		}
	});

	ipcMain.handle('GET_FX_BUTTON_FILES', (e, type) => {
		return getAllFxFiles(type);
	});

	ipcMain.handle('DELETE_FX_BUTTON', async (e, fileName) => {
		try {
			const verification = await dialog.showMessageBox({
				type: 'warning',
				message: `Are you sure you want to delete the "${
					fileName.split('.')[0]
				}" fx button?`,
				buttons: ['Delete', 'Cancel'],
			});
			if (verification.response === 0) {
				const filePath = findFxFile(fileName);
				if (fs.existsSync(filePath)) {
					fs.unlink(filePath, (err) => {
						if (err) {
							throw new Error(err);
						} else {
							showMessageBox(
								'File deleted',
								`${fileName.split('.')[0]} successfully deleted`
							);
						}
					});
					return true;
				} else {
					throw new Error(`Unable to resolve path ${filePath}`);
				}
			} else return false;
		} catch (err) {
			throw new Error(err);
		}
	});

	ipcMain.handle('GET_GAME_VERSIONS', (e, type) => {
		const coreVersions = {};
		const customVersions = {};

		const coreVersionsPath = isDev
			? path.join(app.getAppPath(), 'src', 'assets', 'game_versions')
			: path.join(process.resourcesPath, 'game_versions');
		const customVersionsPath = path.join(
			app.getPath('userData'),
			'game_versions'
		);

		if (!fs.existsSync(customVersionsPath)) {
			fs.mkdirSync(path.join(app.getPath('userData'), 'game_versions'));
		}

		const coreFileNames = fs
			.readdirSync(coreVersionsPath)
			.filter((name) => name !== 'gameVersions.js');
		const customFileNames = fs.readdirSync(customVersionsPath);
		// custom file names should match the shortName of games

		coreFileNames.forEach((file) => {
			coreVersions[file.split('Versions')[0]] = JSON.parse(
				fs.readFileSync(path.join(coreVersionsPath, file))
			);
		});
		customFileNames.forEach((file) => {
			customVersions[file] = [];
			const versionNames = fs.existsSync(path.join(customVersionsPath, file))
				? fs.readdirSync(path.join(customVersionsPath, file))
				: [];
			versionNames.forEach((version) => {
				const versionData = JSON.parse(
					fs.readFileSync(
						path.join(customVersionsPath, file, version, 'data.json')
					)
				);
				customVersions[file].push(versionData);
			});
		});
		return type === 'core'
			? coreVersions
			: type === 'custom'
			? customVersions
			: type === 'all'
			? { coreVersions, customVersions }
			: new Error('type must be "core", "custom", or "all"');
	});

	ipcMain.handle('GET_APP_DATA_PATH', () => {
		return app.getPath('userData');
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
