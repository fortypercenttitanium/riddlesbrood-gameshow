import { playSound } from './imports';

const revealAnswer = (answerIndex, { state, dispatch, actions }) => {
	const board = state.gameController.board;
	board.answers[answerIndex].revealed = true;
	dispatch({ type: actions.SET_BOARD, payload: board });
};

const correctHandler = (
	answerIndex,
	{ board, sfxPlayer, musicPlayer, state, dispatch, actions }
) => {
	if (!board.answers[answerIndex].revealed) {
		playSound('media/soundfx/ffding.mp3', 'sfx', {
			sfxPlayer,
			musicPlayer,
		});
		revealAnswer(answerIndex, { state, dispatch, actions });
	}
};

const incorrectHandler = (
	team,
	isWrong,
	index,
	{ wrongTracker, sfxPlayer, musicPlayer, dispatch, actions }
) => {
	const tracker = JSON.parse(JSON.stringify(wrongTracker));
	tracker[`team${team}`][index] = !isWrong;
	if (!isWrong) {
		playSound('media/soundfx/ffbuzzer.wav', 'sfx', {
			sfxPlayer,
			musicPlayer,
		});
		dispatch({
			type: actions.SET_FAMILY_FEUD_XS,
			payload: { display: true, team: team, array: tracker[`team${team}`] },
		});
		setTimeout(() => {
			dispatch({
				type: actions.SET_FAMILY_FEUD_XS,
				payload: { display: false, team: '', array: [] },
			});
			dispatch({ type: actions.SET_WRONG_TRACKER, payload: tracker });
		}, 1500);
	} else {
		dispatch({ type: actions.SET_WRONG_TRACKER, payload: tracker });
	}
};

export { correctHandler, incorrectHandler, revealAnswer };
