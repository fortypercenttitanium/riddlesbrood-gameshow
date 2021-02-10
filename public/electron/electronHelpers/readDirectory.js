const fs = require('fs');

module.exports = function readDirectory(dirPath, extensions) {
	const files = fs.readdirSync(dirPath);
	return files;
};
