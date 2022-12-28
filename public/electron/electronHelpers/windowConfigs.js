const path = require('path');
const { nativeImage } = require('electron');
const iconPath = nativeImage.createFromPath(
  path.join(__dirname, '..', 'icons', 'icon.png'),
);

const mainWindowConfig = {
  width: 1340,
  height: 880,
  title: 'Riddlesbrood Gameshow - Control Panel',
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
  icon: iconPath,
};

const gameWindowConfig = {
  width: 1200,
  height: 900,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
  frame: false,
  title: 'Gameboard',
  show: true,
  icon: iconPath,
};

module.exports = { mainWindowConfig, gameWindowConfig };
