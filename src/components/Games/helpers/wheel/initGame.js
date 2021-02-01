import { wheel as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'select',
		currentQuestion: {
			category: '',
			puzzle: ' ',
			guessedLetters: [],
			solved: false,
		},
		board: versions[state.currentGame.version].content,
		currentAnswer: '',
		timer: {
			time: null,
			running: false,
			tickSound: '',
		},
		score: {
			type: 'players',
			scoreBoard: [0, null, null, 0],
		},
		gameStarted: true,
	};
}
