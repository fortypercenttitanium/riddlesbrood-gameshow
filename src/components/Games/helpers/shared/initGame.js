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

export default function initGame(state, game, initialDisplay = 'init') {
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
	const initState = {
		display: initialDisplay,
		currentQuestion: {
			category: '',
			puzzle: ' ',
			guessedLetters: [],
			solved: false,
		},
		board: games[game][state.currentGame.version].content,
		currentAnswer: '',
		timer: {
			time: null,
			running: false,
			tickSound: '',
		},
		score: {
			type: 'players',
			scoreBoard: [0, 0, 0, 0],
		},
		gameStarted: true,
	};

	return JSON.parse(JSON.stringify(initState));
}
