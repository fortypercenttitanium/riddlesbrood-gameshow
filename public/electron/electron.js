const electron = require('electron');
const path = require('path');
const createStartScreen = require('./electronHelpers/createStartScreen');
const attachIPCListeners = require('./electronHelpers/attachIPCListeners');
const checkAssetFolders = require('./electronHelpers/checkAssetFolders');
const { protocol, app } = electron;

let mainWindow;
let gameWindow;
let startScreenWindow;
let projectorDisplay;

function getWindow(win) {
	switch (win) {
		case 'main':
			return mainWindow;
		case 'game':
			return gameWindow;
		case 'start':
			return startScreenWindow;
		case 'projector':
			return projectorDisplay;
		default:
			break;
	}
}

function setWindow(win, setting) {
	switch (win) {
		case 'main':
			mainWindow = setting;
			break;
		case 'game':
			gameWindow = setting;
			break;
		case 'start':
			startScreenWindow = setting;
			break;
		case 'projector':
			projectorDisplay = setting;
			break;
		default:
			break;
	}
}

checkAssetFolders();

attachIPCListeners({ getWindow, setWindow });

app.on('ready', () => {
	protocol.registerFileProtocol('app', (req, cb) => {
		const url = req.url.substr(6);
		const userDataPath = app.getPath('userData');
		cb({ path: path.join(userDataPath, url) });
	});
	createStartScreen({ setWindow });
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
