import { round1Video, round2Video } from './imports';
const { ipcRenderer } = window.require('electron');

const nextQuestion = ({ board, currentQuestion, dispatch, actions, round }) => {
	const nextQuestionIndex =
		board[round].indexOf(currentQuestion) + 1 < board[round].length
			? board[round].indexOf(currentQuestion) + 1
			: 0;

	dispatch({
		type: actions.SET_QUESTION,
		payload: board[round][nextQuestionIndex],
	});
};

const previousQuestion = ({
	board,
	currentQuestion,
	dispatch,
	actions,
	round,
}) => {
	const prevQuestionIndex = board[round].indexOf(currentQuestion) - 1;
	if (prevQuestionIndex >= 0) {
		dispatch({
			type: actions.SET_QUESTION,
			payload: board[round][prevQuestionIndex],
		});
	}
};

const changeRound = ({ newRound, dispatch }) => {
	ipcRenderer.send('PLAY_VIDEO_SEND', {
		file: newRound === 0 ? round1Video : round2Video,
	});
	dispatch({
		type: 'SET_GAME_ROUND',
		payload: newRound,
	});
};

const toggleDisplay = ({ display, dispatch, actions }) => {
	const newDisplay = display === 'scores' ? 'question' : 'scores';
	dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: newDisplay });
};

export { nextQuestion, previousQuestion, toggleDisplay, changeRound };
