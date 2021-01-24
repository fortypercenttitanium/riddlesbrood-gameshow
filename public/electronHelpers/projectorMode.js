const electron = require('electron');
const { screen, dialog } = electron;

module.exports = function setProjectorMode({
	projectorDisplay,
	mainWindow,
	gameWindow,
	isDev,
}) {
	projectorDisplay = screen.getAllDisplays().find((display) => {
		return display.bounds.x !== 0 || display.bounds.y !== 0;
	});
	if (projectorDisplay !== undefined) {
		gameWindow.setBounds({
			x: projectorDisplay.bounds.x + 50,
			y: projectorDisplay.bounds.y + 50,
		});
		gameWindow.maximize();
		if (!isDev) {
			dialog.showMessageBox(mainWindow, {
				type: 'info',
				title: 'Success',
				message: 'Projector connection successful!',
			});
		}
	} else {
		dialog.showMessageBox(mainWindow, {
			type: 'error',
			title: 'Projector error',
			message: 'Projector not found.',
			detail: 'Please plug in projector and try again.',
		});
	}
};
