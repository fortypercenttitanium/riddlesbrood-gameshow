const path = require('path');
const readDirectory = require('./readDirectory');
const { app } = require('electron');

function getAllFxFiles(type = 'all') {
	const appFiles = readDirectory(
		path.join(app.getAppPath(), 'src', 'assets', 'fx_buttons')
	);
	const customFiles = readDirectory(
		path.join(app.getPath('userData'), 'fx_buttons')
	);
	return type === 'all' ? [...appFiles, ...customFiles] : [...customFiles];
}

function findFxFile(fileName) {
	const customFiles = getAllFxFiles('custom');
	return (
		customFiles.includes(fileName) &&
		path.join(app.getPath('userData'), 'fx_buttons', fileName)
	);
}

module.exports = { getAllFxFiles, findFxFile };
