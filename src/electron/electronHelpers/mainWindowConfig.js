const path = require('path');

const iconPath = path.join(
	__dirname,
	'..',
	'..',
	'assets',
	'images',
	'icons',
	'icon.png'
);

module.exports = {
	width: 1353,
	height: 902,
	title: 'Riddlesbrood Gameshow - Control Panel',
	webPreferences: {
		nodeIntegration: true,
	},
	icon: iconPath,
};
