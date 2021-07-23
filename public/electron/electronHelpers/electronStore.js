const Store = require('electron-store');

const defaultButtons = [
	{
		name: 'ding',
		file: 'ding.wav',
		type: 'audio',
	},
	{
		name: 'buzzer',
		file: 'buzzer.mp3',
		type: 'audio',
	},
	{
		name: 'ohyeah',
		file: 'ohyeah.wav',
		type: 'audio',
	},
	{
		name: 'ticktock',
		file: 'ticktock.wav',
		type: 'audio',
	},
	{
		name: 'woodblock',
		file: 'woodblock.wav',
		type: 'audio',
	},
	{
		name: 'samplevfx',
		file: 'samplevfx.mp4',
		type: 'video',
	},
	{
		name: 'excellent',
		file: 'excellent.mp4',
		type: 'video',
	},
];

const store = new Store({
	defaults: {
		fx_buttons: defaultButtons,
		custom_preshow_message: '',
	},
});

module.exports = store;
