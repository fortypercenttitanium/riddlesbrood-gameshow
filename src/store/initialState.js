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
	fxButtons: [],
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
