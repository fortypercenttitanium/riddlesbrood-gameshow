const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const { showMessageBox, showErrorBox } = require('./messageBoxes');

module.exports = async function storeGameVersion(game, data, assets) {
	try {
		const filePath = path.join(app.getPath('userData'), 'game_versions', game);

		// check if file path exists, if not, make it
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath);
		}

		const versionPath = path.join(filePath, data.title);

		if (!fs.existsSync(versionPath)) {
			fs.mkdirSync(versionPath);
			fs.writeFile(
				path.join(versionPath, 'data.json'),
				JSON.stringify(data),
				(err) => {
					if (err) {
						throw new Error(err);
					}
				}
			);
			showMessageBox('Success', 'New game version saved.');
			return true;
		} else {
			throw new Error('Version name already exists. Please rename the file.');
		}
	} catch (err) {
		showErrorBox('Error', err);
	}
};
