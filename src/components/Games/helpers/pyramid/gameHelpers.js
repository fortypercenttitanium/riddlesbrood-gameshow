import playSound from '../shared/audioHelpers';
import { ohYeah, pyramidBell, buzzer } from './imports';

const setCategoryCompleted = (categoryIndex, { state, dispatch, actions }) => {
	const board = state.gameController.board;
	board[categoryIndex].completed = true;
	dispatch({ type: actions.SET_BOARD, payload: board });
};

const changeGameDisplay = (display, { dispatch, actions }) => {
	dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
};

const setActiveTeam = (team, { dispatch, actions }) => {
	dispatch({ type: actions.SET_ACTIVE_TEAM, payload: team });
};

const setCurrentQuestion = (question, { dispatch, actions }) => {
	dispatch({ type: actions.SET_QUESTION, payload: question });
};

const setCorrectCounter = (count = 0, { dispatch, actions }) => {
	dispatch({ type: actions.SET_CORRECT_COUNTER, payload: count });
};

const incrementStreak = ({ dispatch, actions }) => {
	dispatch({ type: actions.INCREMENT_STREAK });
};

const resetStreak = ({ dispatch, actions }) => {
	dispatch({ type: actions.RESET_STREAK });
};

const addBonusTime = (
	seconds,
	{ dispatch, actions, state, sfxPlayer, musicPlayer }
) => {
	dispatch({
		type: actions.SET_TIMER,
		payload: state.gameController.timer.time + seconds,
	});
	dispatch({ type: actions.RUN_TIMER });
	playSound(ohYeah, 'sfx', {
		sfxPlayer,
		musicPlayer,
	});
};

const clickHandlerCategory = (
	question,
	index,
	{ state, dispatch, actions }
) => {
	if (state.gameController.activeTeam !== 0) {
		setCategoryCompleted(index, { state, dispatch, actions });
		changeGameDisplay('question', { dispatch, actions });
		setCurrentQuestion(
			{
				category: question.category,
				words: question.words,
				index: 0,
			},
			{ dispatch, actions }
		);
		setCorrectCounter(0, { dispatch, actions });
		resetStreak({ dispatch, actions });
		dispatch({ type: actions.SET_TIMER, payload: 20 });
		dispatch({ type: actions.RUN_TIMER });
	} else {
		alert('Please select active team');
	}
};

const checkIfRoundOver = ({ state, dispatch, actions }) => {
	if (
		state.gameController.currentQuestion.index ===
		state.gameController.currentQuestion.words.length - 1
	) {
		changeGameDisplay('roundOver', { dispatch, actions });
		setCurrentQuestion(
			{
				category: '',
				words: [],
				index: 0,
			},
			{ dispatch, actions }
		);
		dispatch({ type: actions.KILL_TIMER });
		return true;
	} else return false;
};

const nextQuestion = ({ state, dispatch, actions }) => {
	if (!checkIfRoundOver({ state, dispatch, actions })) {
		setCurrentQuestion(
			{
				category: state.gameController.currentQuestion.category,
				words: state.gameController.currentQuestion.words,
				index: state.gameController.currentQuestion.index + 1,
			},
			{ dispatch, actions }
		);
	}
};

const correctHandler = (
	team,
	{ dispatch, actions, state, sfxPlayer, musicPlayer }
) => {
	if (state.gameController.streak === 9) {
		addBonusTime(5, { dispatch, actions, state, sfxPlayer, musicPlayer });
	} else if (state.gameController.streak === 14) {
		addBonusTime(10, { dispatch, actions, state, sfxPlayer, musicPlayer });
	} else {
		playSound(pyramidBell, 'sfx', {
			sfxPlayer,
			musicPlayer,
		});
	}
	setCorrectCounter(state.gameController.correctCounter + 1, {
		dispatch,
		actions,
	});
	nextQuestion({ state, dispatch, actions });
	dispatch({
		type: actions.CHANGE_SCORE,
		payload: { playerIndex: team - 1, amount: 1 },
	});
	incrementStreak({ dispatch, actions });
};

const incorrectHandler = ({
	sfxPlayer,
	musicPlayer,
	state,
	dispatch,
	actions,
}) => {
	nextQuestion({ state, dispatch, actions });
	playSound(buzzer, 'sfx', {
		sfxPlayer,
		musicPlayer,
	});
	resetStreak({ dispatch, actions });
};

export {
	setCategoryCompleted,
	changeGameDisplay,
	setActiveTeam,
	setCurrentQuestion,
	setCorrectCounter,
	incrementStreak,
	resetStreak,
	addBonusTime,
	clickHandlerCategory,
	checkIfRoundOver,
	nextQuestion,
	correctHandler,
	incorrectHandler,
};
