import { jeopardy as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'board',
		currentQuestion: {
			value: null,
			type: 'text',
			question: '',
			answer: '',
			completed: false,
			dailyDouble: false,
		},
		board: versions[state.currentGame.version].content,
		currentAnswer: '',
		gameTimeline: 'board',
		timer: {
			time: null,
			running: false,
			tickSound: false,
		},
		score: {
			type: 'player',
			scoreBoard: [0, 0, 0, 0],
		},
		gameStarted: true,
	};
}
