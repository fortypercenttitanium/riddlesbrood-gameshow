const { app, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

module.exports = async function storeFxButton(name, data) {
	try {
		const filePath = path.join(app.getPath('userData'), 'fx_buttons');

		if (!fs.existsSync(path.join(filePath, name))) {
			if (!fs.existsSync(filePath)) {
				fs.mkdir(filePath, () => {});
			}

			fs.writeFile(path.join(filePath, name), data, (err) => {
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
