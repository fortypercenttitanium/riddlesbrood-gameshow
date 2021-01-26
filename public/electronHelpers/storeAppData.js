const { app, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

module.exports = async function storeAppData(type, filename, data) {
	const types = ['fx_button', 'splash_screen', 'game_version'];

	if (!types.includes(type)) {
		throw new Error(
			"Invalid type. Type must be passed as 'fx_button', 'splash_screen', or 'game_version'"
		);
	} else {
		const filePath = path.join(app.getPath('userData'), `${type}s`);
		if (!fs.existsSync(path.join(filePath, `${filename}.json`))) {
			try {
				if (!fs.existsSync(filePath)) {
					await fs.mkdir(filePath, () => {});
				}
				fs.writeFile(
					path.join(filePath, `${filename}.json`),
					JSON.stringify(data),
					(err) => {
						if (err) {
							throw new Error(err);
						} else {
							dialog.showMessageBox({ message: 'File save successful' });
						}
					}
				);
			} catch (err) {
				dialog.showErrorBox('Error', err);
			}
		} else {
			dialog.showErrorBox(
				'Bad file name',
				'File name already exists. Please rename the file.'
			);
		}
	}
};
