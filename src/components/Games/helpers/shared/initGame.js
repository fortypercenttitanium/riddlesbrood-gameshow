import {
	jeopardy,
	pyramid,
	wheel,
	familyFeud,
	nameThatTune,
	whatTheHellIsIt,
	newlywed,
	couples,
	esp,
} from '../../../../assets/game_versions/gameVersions';

export default function initGame(state, game) {
	const games = {
		jeopardy,
		pyramid,
		wheel,
		familyFeud,
		nameThatTune,
		whatTheHellIsIt,
		newlywed,
		couples,
		esp,
	};
	return {
		display: 'select',
		currentQuestion: {
			category: '',
			puzzle: ' ',
			guessedLetters: [],
			solved: false,
		},
		board: JSON.parse(games[game][state.currentGame.version]).content,
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
