const path = require('path');
const readDirectory = require('./readDirectory');
const { app } = require('electron');

function getAllFxFiles(type = 'all') {
	const appFiles = readDirectory(
		path.join(app.getAppPath(), 'src', 'assets', 'fx_buttons')
	).map((file) =>
		file.split('.').pop() === 'mp4'
			? {
					name: file.split('.')[0],
					ext: file.split('.').pop(),
					type: 'video',
					file: file,
			  }
			: {
					name: file.split('.')[0],
					ext: file.split('.').pop(),
					type: 'audio',
					file: file,
			  }
	);
	const customFiles = readDirectory(
		path.join(app.getPath('userData'), 'fx_buttons')
	).map((file) =>
		file.split('.').pop() === 'mp4'
			? {
					name: file.split('.')[0],
					ext: file.split('.').pop(),
					type: 'video',
					file: `app://fx_buttons/${file}`,
			  }
			: {
					name: file.split('.')[0],
					ext: file.split('.').pop(),
					type: 'audio',
					file: `app://fx_buttons/${file}`,
			  }
	);
	return type === 'all' ? [...appFiles, ...customFiles] : [...customFiles];
}

function findFxFile(fileName) {
	const customFiles = getAllFxFiles('custom');
	return (
		customFiles.some((file) => `${file.name}.${file.ext}` === fileName) &&
		path.join(app.getPath('userData'), 'fx_buttons', fileName)
	);
}

module.exports = { getAllFxFiles, findFxFile };
