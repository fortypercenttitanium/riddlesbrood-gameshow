const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const { showMessageBox, showErrorBox } = require('./messageBoxes');

module.exports = async function deleteGameVersion(game, versionName) {
	try {
		const filePath = path.join(
			app.getPath('userData'),
			'game_versions',
			game,
			versionName
		);

		fs.rmdir(filePath, { recursive: true }, (err) => {
			if (err) {
				showErrorBox('Error deleting version', err.toString());
				throw new Error(err);
			} else {
				showMessageBox('Success', 'Game version removed.');
			}
		});
		return true;
	} catch (err) {
		showErrorBox('Error', err);
	}
};
