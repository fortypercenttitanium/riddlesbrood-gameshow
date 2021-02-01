import { familyFeud as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'board',
		currentQuestion: {
			category: '',
			words: [],
			index: 0,
		},
		currentAnswer: '',
		board: versions[state.currentGame.version].content,
		timer: {
			time: null,
			running: false,
			tickSound: '',
		},
		score: {
			type: 'team',
			scoreBoard: [0, 0],
		},
		wrongTracker: {
			team1: [false, false, false],
			team2: [false, false, false],
		},
		wrongModal: {
			display: false,
			team: '',
			array: [],
		},
		gameStarted: true,
	};
}
