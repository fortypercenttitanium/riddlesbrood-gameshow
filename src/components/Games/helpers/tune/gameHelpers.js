const playPauseHandler = ({
	musicPlayer,
	currentQuestion,
	dispatch,
	actions,
	songs,
}) => {
	const player = musicPlayer.current.audioEl.current;
	const currentQuestionCopy = { ...currentQuestion };
	if (!currentQuestion.isPlaying && player.currentTime < 1) {
		currentQuestionCopy.isPlaying = true;
		dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
		player.src =
			currentQuestion.file.slice(0, 6) === 'app://'
				? currentQuestion.file
				: songs[currentQuestion.file];
		console.log(currentQuestion.file);
		player.play().catch((err) => console.log(err));
	} else if (currentQuestion.isPlaying) {
		player.pause();
		currentQuestionCopy.isPlaying = false;
		dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
	} else {
		currentQuestionCopy.isPlaying = true;
		dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
		player.play();
	}
};

const rewindHandler = ({ musicPlayer, currentQuestion, dispatch, actions }) => {
	const player = musicPlayer.current.audioEl.current;
	const currentQuestionCopy = { ...currentQuestion };
	currentQuestionCopy.isPlaying = false;
	dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
	player.load();
};

const toggleReveal = (answerRevealed, { dispatch, actions }) => {
	dispatch({ type: actions.SET_ANSWER_REVEALED, payload: answerRevealed });
};

const nextSong = ({
	musicPlayer,
	board,
	currentQuestion,
	dispatch,
	actions,
}) => {
	const player = musicPlayer.current.audioEl.current;
	const nextQuestionIndex =
		board.findIndex((song) => song.title === currentQuestion.title) + 1;
	if (nextQuestionIndex <= board.length - 1) {
		player.load();
		toggleReveal(false, { dispatch, actions });
		dispatch({
			type: actions.SET_QUESTION,
			payload: board[nextQuestionIndex],
		});
		dispatch({
			type: actions.SET_ANSWER,
			payload: `${board[nextQuestionIndex].title} - ${board[nextQuestionIndex].artist}`,
		});
	}
};

export { playPauseHandler, rewindHandler, toggleReveal, nextSong };
