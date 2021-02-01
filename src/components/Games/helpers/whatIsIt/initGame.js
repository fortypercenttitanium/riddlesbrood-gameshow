import { whatTheHellIsIt as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'board',
		currentQuestion: versions[state.currentGame.version].content[0],
		currentAnswer: versions[state.currentGame.version].content[0].title,
		board: versions[state.currentGame.version].content,
		timer: {
			time: 24,
			running: false,
			tickSound: '',
		},
		score: {
			type: 'player',
			scoreBoard: [0, 0, 0, 0],
		},
		answerRevealed: false,
		blocks: [
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
		],
		gameStarted: true,
	};
}
