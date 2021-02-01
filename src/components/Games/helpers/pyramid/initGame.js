import { pyramid as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'board',
		currentQuestion: {
			category: '',
			words: [],
			index: 0,
		},
		currentAnswer: '',
		streak: 0,
		activeTeam: 0,
		board: versions[state.currentGame.version].content,
		correctCounter: 0,
		timer: {
			time: null,
			running: false,
			tickSound: 'media/soundfx/beep.mp3',
		},
		score: {
			type: 'team',
			scoreBoard: [0, 0],
		},
		gameStarted: true,
	};
}
