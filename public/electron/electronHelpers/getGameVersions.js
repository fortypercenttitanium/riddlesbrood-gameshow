const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
const { app } = require('electron');

module.exports = function getGameVersions(type) {
	const coreVersions = {};
	const customVersions = {};

	// the pathing to the assets depends on if they are baked-in or custom added.
	// this is so custom games don't get overwritten with new version releases of the app.
	const coreVersionsPath = isDev
		? path.join(app.getAppPath(), 'src', 'assets', 'game_versions')
		: path.join(process.resourcesPath, 'game_versions');
	const customVersionsPath = path.join(
		app.getPath('userData'),
		'game_versions'
	);

	// if the path for the custom assets doesn't exist yet, make it, or else an error will be thrown
	if (!fs.existsSync(customVersionsPath)) {
		fs.mkdirSync(path.join(app.getPath('userData'), 'game_versions'));
	}

	// read the path and get all the games with versions available
	// not hard-coding the game names allows for new games to be added later
	const coreFileNames = fs
		.readdirSync(coreVersionsPath)
		.filter((name) => name !== 'gameVersions.js');
	const customFileNames = fs.readdirSync(customVersionsPath);
	// custom file names should match the shortName of games

	// core versions are all stored in one json file per game
	coreFileNames.forEach((file) => {
		coreVersions[file.split('Versions')[0]] = JSON.parse(
			fs.readFileSync(path.join(coreVersionsPath, file))
		);
	});

	// custom versions are separate json files stored in their own folders with assets if needed
	customFileNames.forEach((file) => {
		customVersions[file] = [];
		const versionNames = fs.existsSync(path.join(customVersionsPath, file))
			? fs.readdirSync(path.join(customVersionsPath, file))
			: [];
		versionNames.forEach((version) => {
			const versionData = JSON.parse(
				fs.readFileSync(
					path.join(customVersionsPath, file, version, 'data.json')
				)
			);
			customVersions[file].push(versionData);
		});
	});

	// consolidate versions
	const consolidatedVersions = {};

	Object.keys(coreVersions).forEach((key) => {
		consolidatedVersions[key] = [...coreVersions[key]];
	});
	Object.keys(customVersions).forEach((key) => {
		customVersions[key].forEach((version) =>
			consolidatedVersions[key].push(version)
		);
	});

	return type === 'core'
		? coreVersions
		: type === 'custom'
		? customVersions
		: type === 'all'
		? consolidatedVersions
		: new Error('type must be "core", "custom", or "all"');
};
