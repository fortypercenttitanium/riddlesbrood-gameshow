export const initialState = {
	gamesMenu: {
		open: false,
		timeline: '',
		selectedGame: {},
	},
	audio: {
		volume: {
			master: 75,
			music: 75,
			sfx: 75,
		},
	},
	fxButtons: [
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
			name: 'oh yeah',
			file: 'ohyeah.wav',
			type: 'audio',
		},
		{
			name: 'tick tock',
			file: 'ticktock.wav',
			type: 'audio',
		},
		{
			name: 'wood block',
			file: 'woodblock.wav',
			type: 'audio',
		},
		{
			name: 'sample video',
			file: 'samplevfx.mp4',
			type: 'video',
		},
		{
			name: 'excellent',
			file: 'excellent.mov',
			type: 'video',
		},
		{
			name: null,
			file: null,
			type: null,
		},
	],
	timeline: 'app-open',
	currentGame: {
		title: '',
		logo: '',
		version: null,
		winner: false,
	},
	gameController: {
		currentQuestion: {},
		currentAnswer: '',
		gameTimeline: '',
		timer: {
			time: null,
			running: false,
			tickSound: false,
		},
		score: {
			type: '',
			scoreBoard: [0, 0, 0, 0],
		},
		display: '',
		board: [],
		gameStarted: false,
	},
	VFX: {
		playing: false,
		file: '',
	},
};
