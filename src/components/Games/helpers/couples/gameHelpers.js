const nextQuestion = ({ board, currentQuestion, dispatch, actions }) => {
	const nextQuestionIndex = board.indexOf(currentQuestion) + 1;
	if (nextQuestionIndex <= board.length - 1) {
		dispatch({
			type: actions.SET_QUESTION,
			payload: board[nextQuestionIndex],
		});
	}
};

const previousQuestion = ({ board, currentQuestion, dispatch, actions }) => {
	const prevQuestionIndex = board.indexOf(currentQuestion) - 1;
	if (prevQuestionIndex >= 0) {
		dispatch({
			type: actions.SET_QUESTION,
			payload: board[prevQuestionIndex],
		});
	}
};

const toggleDisplay = ({ display, dispatch, actions }) => {
	const newDisplay = display === 'scores' ? 'question' : 'scores';
	dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: newDisplay });
};

export { nextQuestion, previousQuestion, toggleDisplay };
