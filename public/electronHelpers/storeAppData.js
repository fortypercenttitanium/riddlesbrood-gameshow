const { app, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports = async function storeAppData(type, filename, data) {
	let newData;
	const types = ['fx_button', 'game_version'];
	const filePath = path.join(app.getPath('userData'), `${type}s`);
	const extArray = data.filePaths[0].split('.');
	const ext = type === 'fx_button' ? extArray[extArray.length - 1] : 'json';
	const newFileName = `${filename}.${ext}`;

	// format data for each type
	if (type === 'game_version') {
		newData = JSON.stringify(data);
	} else {
		newData = await readFile(data.filePaths[0], (err) => {
			if (err) {
				throw new Error(err);
			}
		});
	}

	if (!types.includes(type)) {
		throw new Error(
			"Invalid type. Type must be passed as 'fx_button' or 'game_version'"
		);
	}

	if (!fs.existsSync(path.join(filePath, newFileName))) {
		try {
			if (!fs.existsSync(filePath)) {
				fs.mkdir(filePath, () => {});
			}
			fs.writeFile(path.join(filePath, newFileName), newData, (err) => {
				if (err) {
					throw new Error(err);
				} else {
					dialog.showMessageBox({ message: 'File save successful' });
				}
			});
		} catch (err) {
			dialog.showErrorBox('Error', err);
		}
	} else {
		dialog.showErrorBox(
			'Bad file name',
			'File name already exists. Please rename the file.'
		);
	}
};
