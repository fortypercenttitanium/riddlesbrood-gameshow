import { nameThatTune as versions } from '../../versions/gameVersions';

export default function initGame(state) {
	return {
		display: 'board',
		currentQuestion: versions[state.currentGame.version].content[0],
		currentAnswer: `${versions[state.currentGame.version].content[0].title} - ${
			versions[state.currentGame.version].content[0].artist
		}`,
		board: versions[state.currentGame.version].content,
		timer: {
			time: null,
			running: false,
			tickSound: '',
		},
		score: {
			type: 'players',
			scoreBoard: [0, 0, 0, 0],
		},
		answerRevealed: false,
		gameStarted: true,
	};
}
