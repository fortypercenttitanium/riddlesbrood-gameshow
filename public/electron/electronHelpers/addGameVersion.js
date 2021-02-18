const getGameVersions = require('./getGameVersions');
const { showErrorBox } = require('./messageBoxes');
const storeGameVersion = require('./storeGameVersion');

module.exports = async function addGameVersion(game, data, assets) {
	// check for existing names
	const versions = getGameVersions('all');
	const versionNameExists = versions[game].find(
		(version) => version.title === data.title
	);

	if (versionNameExists) {
		showErrorBox(
			'Version name exists',
			'A game version by this name already exists. Please choose a different version name.'
		);
		return false;
	} else {
		return storeGameVersion(game, data, assets);
	}
};
