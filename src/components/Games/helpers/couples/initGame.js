import { couples as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'board',
		currentQuestion: versions[state.currentGame.version].content[0],
		currentAnswer: '',
		board: versions[state.currentGame.version].content,
		timer: {
			time: null,
			running: false,
			tickSound: '',
		},
		score: {
			type: 'team',
			scoreBoard: [0, 0, 0, 0],
		},
		gameStarted: true,
	};
}
