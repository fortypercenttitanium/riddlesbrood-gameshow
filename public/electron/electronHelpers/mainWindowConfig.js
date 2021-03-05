const path = require('path');
const { nativeImage } = require('electron');

const iconPath = nativeImage.createFromPath(
	path.join(__dirname, '..', 'icons', 'icon.png')
);

module.exports = {
	width: 1353,
	height: 902,
	title: 'Riddlesbrood Gameshow - Control Panel',
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false,
	},
	icon: iconPath,
};
