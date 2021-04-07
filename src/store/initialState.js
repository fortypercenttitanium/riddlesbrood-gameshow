export const initialState = {
	gamesMenu: {
		open: false,
		timeline: '',
		selectedGame: {},
	},
	audio: {
		volume: {
			master: 50,
			music: 50,
			sfx: 50,
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
			type: 'player',
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
