const { app, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

module.exports = async function storeAppData(type, name, data) {
	try {
		let newData;
		const types = ['fx_button', 'game_version'];
		const filePath = path.join(app.getPath('userData'), `${type}s`);

		// format data for each type
		if (type === 'game_version') {
			newData = JSON.stringify(data);
		} else {
			newData = data;
		}

		if (!types.includes(type)) {
			throw new Error(
				"Invalid type. Type must be passed as 'fx_button' or 'game_version'"
			);
		}

		if (!fs.existsSync(path.join(filePath, name))) {
			if (!fs.existsSync(filePath)) {
				fs.mkdir(filePath, () => {});
			}
			fs.writeFile(path.join(filePath, name), newData, (err) => {
				if (err) {
					throw new Error(err);
				}
			});
			return true;
		} else {
			throw new Error('File name already exists. Please rename the file.');
		}
	} catch (err) {
		dialog.showErrorBox('Error', err);
	}
};
