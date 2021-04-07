import playSound from '../shared/audioHelpers';
import { wheelBuzzer, wheelDing } from './imports';

const renderPuzzle = (state) => {
	const { puzzle } = state.gameController.currentQuestion;
	// the four rows to be rendered on the game board
	const rows = [[], [], [], []];
	// split answer into array of words
	const puzzleSplit = puzzle.split(' ');
	// add spaces after words except the last one
	const tempArr = puzzleSplit.map((word) => {
		return `${word} `;
	});
	// one row answer
	if (puzzle.length <= 12) {
		for (let word of tempArr) {
			rows[1] = [...rows[1], ...word.split('')];
		}
	} else if (puzzle.length <= 26) {
		// two row answer
		for (let word of tempArr) {
			// fill in rows starting at top
			if (rows[2].length === 0 && word.length + rows[1].length <= 14) {
				rows[1] = [...rows[1], ...word.split('')];
			} else {
				rows[2] = [...rows[2], ...word.split('')];
			}
		}
	} else if (puzzle.length <= 38) {
		// three row answer
		for (let word of tempArr) {
			// fill in rows starting at top
			if (rows[1].length === 0 && word.length + rows[0].length <= 12) {
				rows[0] = [...rows[0], ...word.split('')];
			} else if (rows[2].length === 0 && word.length + rows[1].length <= 14) {
				rows[1] = [...rows[1], ...word.split('')];
			} else {
				rows[2] = [...rows[2], ...word.split('')];
			}
		}
	} else if (puzzle.length <= 52) {
		// four row answer
		for (let word of tempArr) {
			// fill in rows starting at top
			if (rows[1].length === 0 && word.length + rows[0].length <= 12) {
				rows[0] = [...rows[0], ...word.split('')];
			} else if (rows[2].length === 0 && word.length + rows[1].length <= 14) {
				rows[1] = [...rows[1], ...word.split('')];
			} else if (rows[3].length === 0 && word.length + rows[2].length <= 14) {
				rows[2] = [...rows[2], ...word.split('')];
			} else {
				rows[3] = [...rows[3], ...word.split('')];
			}
		}
	} else {
		throw new Error('Puzzle length too long');
	}
	// fill in outside spaces so rows render centered on the board
	const rowsRender = rows.map((row) => {
		// remove whitespace after last words on line
		if (row.length > 0) {
			row.pop();
		}
		while (row.length < 14) {
			if (row.length % 2 === 0) {
				row.unshift(' ');
				row.push(' ');
			} else {
				row.push(' ');
			}
		}
		return row;
	});
	// add space to shape the gameboard properly
	rowsRender[0][13] = null;
	rowsRender[0][0] = null;
	rowsRender[3][13] = null;
	rowsRender[3][0] = null;
	return rowsRender;
};

const setCategorySolved = (categoryIndex, { state, dispatch, actions }) => {
	const board = state.gameController.board;
	board[categoryIndex].solved = true;
	dispatch({ type: actions.SET_BOARD, payload: board });
};

const changeGameDisplay = (displaySetting, { dispatch, actions }) => {
	dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: displaySetting });
};

const clickHandlerCategory = (
	puzzle,
	index,
	{ setCurrentQuestion, dispatch, actions, state }
) => {
	setCurrentQuestion({
		category: puzzle.category,
		puzzle: puzzle.puzzle,
		guessedLetters: [],
		solved: false,
	});
	setCategorySolved(index, { state, dispatch, actions });
	dispatch({ type: actions.SET_ANSWER, payload: puzzle.puzzle });
	changeGameDisplay('board', { dispatch, actions });
};

const setQuestionCallback = (question, { dispatch, actions }) => {
	dispatch({ type: actions.SET_QUESTION, payload: question });
};

const checkLettersCallback = (letter, { state }) => {
	return state.gameController.currentQuestion.guessedLetters.includes(letter);
};

const guessLetterCallback = (
	letter,
	{ checkGuessedLetters, setCurrentQuestion, state }
) => {
	if (!checkGuessedLetters(letter)) {
		let question = state.gameController.currentQuestion;
		question.guessedLetters.push(letter);
		setCurrentQuestion(question);
	}
};

const activateLetterCellsCallback = (
	letter,
	index = 0,
	{ sfxPlayer, musicPlayer, activateLetterCells, windowInstance }
) => {
	const spans = Array.from(document.querySelectorAll('[data-cell')).filter(
		(span) => {
			return span.textContent === letter;
		}
	);
	if (spans.length === 0) {
		// only play sounds from one window
		if (windowInstance === 'controlPanel') {
			playSound(wheelBuzzer, 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
		}
	} else {
		if (index > 0) {
			spans[index - 1].parentNode.classList.remove('active');
			spans[index - 1].classList.add('reveal');
		}
		if (index < spans.length) {
			// only play sounds from one window
			if (windowInstance === 'controlPanel') {
				playSound(wheelDing, 'sfx', {
					sfxPlayer,
					musicPlayer,
				});
			}
			spans[index].parentNode.classList.add('active');
		}
		setTimeout(() => {
			if (index < spans.length) {
				activateLetterCells(letter, index + 1);
			}
		}, 2000);
	}
};

const keyPressCallback = (
	e,
	{ state, checkGuessedLetters, guessLetter, ipcRenderer, activateLetterCells }
) => {
	if (state.gameController.display === 'board') {
		if (
			e.keyCode >= 65 &&
			e.keyCode <= 90 &&
			!checkGuessedLetters(e.key.toUpperCase())
		) {
			guessLetter(e.key.toUpperCase());
			ipcRenderer.send('WHEEL_GUESS_SEND', e.key);
			activateLetterCells(e.key.toUpperCase());
		}
	}
};

const solvePuzzle = ({ state, dispatch, actions }) => {
	const question = state.gameController.currentQuestion;
	question.solved = true;
	dispatch({ type: actions.SET_QUESTION, payload: question });
};

const returnHandler = ({ setCurrentQuestion, dispatch, actions }) => {
	setCurrentQuestion({
		category: '',
		puzzle: '',
		guessedLetters: [],
		solved: false,
	});
	changeGameDisplay('select', { dispatch, actions });
};

export {
	renderPuzzle,
	setCategorySolved,
	clickHandlerCategory,
	setQuestionCallback,
	checkLettersCallback,
	guessLetterCallback,
	activateLetterCellsCallback,
	keyPressCallback,
	solvePuzzle,
	returnHandler,
};
