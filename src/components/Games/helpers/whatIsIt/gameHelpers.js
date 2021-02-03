import tickTock from '../../../../assets/sound_fx/ticktock.wav';
import { stopAllSounds } from '../shared/audioHelpers';

const playPauseHandler = ({ sfxPlayer, timer, blocks, dispatch, actions }) => {
	const player = sfxPlayer.current.audioEl.current;
	if (!timer.running && blocks.every((block) => block)) {
		player.src = tickTock;
		player.play().catch((err) => console.log(err));
		dispatch({ type: actions.RUN_TIMER });
	} else if (timer.running) {
		player.pause();
		dispatch({ type: actions.PAUSE_TIMER });
	} else if (timer.time > 0) {
		dispatch({ type: actions.RUN_TIMER });
		player.play();
	}
};

const clearBlocks = ({ dispatch, actions }) => {
	let arr = [];
	for (let i = 0; i < 16; i++) {
		arr.push(false);
	}
	dispatch({ type: actions.SET_BLOCKS, payload: arr });
};

const toggleTitleReveal = (
	setting,
	{ dispatch, actions, sfxPlayer, musicPlayer }
) => {
	dispatch({ type: actions.SET_ANSWER_REVEALED, payload: setting });
	setting && clearBlocks({ dispatch, actions });
	setting && dispatch({ type: actions.KILL_TIMER });
	stopAllSounds({ sfxPlayer, musicPlayer });
};

const resetBlocks = ({ dispatch, actions }) => {
	let arr = [];
	for (let i = 0; i < 16; i++) {
		arr.push(true);
	}
	dispatch({ type: actions.SET_BLOCKS, payload: arr });
};

const nextPicture = ({
	board,
	currentQuestion,
	dispatch,
	actions,
	sfxPlayer,
	musicPlayer,
}) => {
	const nextQuestionIndex =
		board.findIndex((question) => currentQuestion.title === question.title) + 1;
	if (nextQuestionIndex <= board.length - 1) {
		resetBlocks({ dispatch, actions });
		dispatch({ type: actions.SET_TIMER, payload: 24 });
		toggleTitleReveal(false, { dispatch, actions, sfxPlayer, musicPlayer });
		dispatch({
			type: actions.SET_QUESTION,
			payload: board[nextQuestionIndex],
		});
		dispatch({
			type: actions.SET_ANSWER,
			payload: board[nextQuestionIndex].title,
		});
	}
};

const revealHandleCallback = (level, { blocks, dispatch, actions }) => {
	// order in which the blocks will be removed
	const removalOrder = [
		[7, 14],
		[11, 12],
		[0, 2],
		[3, 8],
		[13, 15],
		[1, 4],
		[5, 10],
		[6, 9],
	];
	// find the index of the level we are at
	const removal = removalOrder[level - 1];
	const newBlocks = [...blocks];
	removal.forEach((num) => (newBlocks[num] = false));
	dispatch({ type: actions.SET_BLOCKS, payload: newBlocks });
};

export {
	playPauseHandler,
	clearBlocks,
	toggleTitleReveal,
	resetBlocks,
	nextPicture,
	revealHandleCallback,
};
