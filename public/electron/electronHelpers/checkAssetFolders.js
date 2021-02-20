const { app } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = function checkAssetFolders() {
	if (!fs.readdirSync(app.getPath('userData')).includes('fx_buttons')) {
		fs.mkdirSync(path.join(app.getPath('userData'), 'fx_buttons'));
	}
	if (!fs.readdirSync(app.getPath('userData')).includes('game_versions')) {
		fs.mkdirSync(path.join(app.getPath('userData'), 'game_versions'));
	}
};
