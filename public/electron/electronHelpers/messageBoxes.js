const electron = require('electron');
const { dialog } = electron;

function showMessageBox(title = '', message) {
	const messageObj = {
		message,
		title,
	};
	dialog.showMessageBox(messageObj);
}

function showErrorBox(title = '', message) {
	let errorMessage = message;
	console.log(message);
	if (Array.isArray(errorMessage)) {
		errorMessage = errorMessage.join('\n');
	}
	dialog.showErrorBox(title, errorMessage);
}

module.exports = {
	showMessageBox,
	showErrorBox,
};
