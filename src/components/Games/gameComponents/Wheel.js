import React, { useContext, useEffect, useRef, useCallback } from 'react';
import {
	WheelContainer,
	CategoryContainer,
	CategoryCard,
	Board,
	BoardWrapper,
	LetterCell,
	Span,
	CategoryDisplay,
	H2,
	GuessedLettersDisplay,
	LetterSpan,
	ReturnButton,
	SolvePuzzle,
	CategoryH3,
	CategoryDisplayText,
} from './gameComponentStyles/wheelStyles';
import {
	renderPuzzle,
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	clickHandlerCategory,
	setQuestionCallback,
	checkLettersCallback,
	guessLetterCallback,
	activateLetterCellsCallback,
	keyPressCallback,
	solvePuzzle,
	returnHandler,
} from '../helpers/wheel/imports';

const { ipcRenderer } = window.require('electron');

export default function Wheel({ windowInstance }) {
	let StoreContext;
	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	useEffect(() => {
		if (windowInstance === 'gameboard') {
			ipcRenderer.on('WHEEL_GUESS_RECEIVE', function (e, key) {
				activateLetterCells(key.toUpperCase());
			});
		}
		return () => ipcRenderer.removeAllListeners('WHEEL_GUESS_RECEIVE');
		// linter disabled because using dependencies causes multiple IPC events to fire
		// eslint-disable-next-line
	}, []);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		async function initialize() {
			let initState = {
				...(await initGame(state, 'wheel', 'select')),
				score: {
					type: 'players',
					scoreBoard: [0, 0, 0, 0],
				},
			};
			dispatch({
				type: actions.INIT_GAME,
				payload: initState,
			});
		}
		if (!state.gameController.gameStarted) {
			initialize();
		}
	}, [dispatch, state]);

	const setCurrentQuestion = useCallback(
		(question) => {
			setQuestionCallback(question, { dispatch, actions });
		},
		[dispatch]
	);

	const activateLetterCells = useCallback(
		(letter, index = 0) => {
			activateLetterCellsCallback(letter, index, {
				sfxPlayer,
				musicPlayer,
				activateLetterCells,
				windowInstance,
			});
		},
		[windowInstance]
	);

	const checkGuessedLetters = useCallback(
		(letter) => checkLettersCallback(letter, { state }),
		[state]
	);

	const guessLetter = useCallback(
		(letter) => {
			guessLetterCallback(letter, {
				checkGuessedLetters,
				setCurrentQuestion,
				state,
			});
		},
		[checkGuessedLetters, setCurrentQuestion, state]
	);

	const handleKeyPress = useCallback(
		(e) => {
			keyPressCallback(e, {
				state,
				checkGuessedLetters,
				guessLetter,
				ipcRenderer,
				activateLetterCells,
			});
		},
		[guessLetter, checkGuessedLetters, activateLetterCells, state]
	);

	const handleClickCategory = (item, index) => {
		clickHandlerCategory(item, index, {
			setCurrentQuestion,
			dispatch,
			actions,
			state,
		});
	};

	const handleClickReturn = () => {
		returnHandler({ setCurrentQuestion, dispatch, actions });
	};

	const handleClickSolve = () => {
		solvePuzzle({ state, dispatch, actions });
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	useEffect(() => {
		if (state.gameController.currentQuestion.solved) {
			document.querySelectorAll('span').forEach((span) => {
				span.classList.add('reveal');
			});
		}
	});

	return state.gameController.gameStarted ? (
		<WheelContainer>
			{windowInstance === 'controlPanel' && (
				<CategoryContainer display={state.gameController.display}>
					{state.gameController.board.map((item, index) => {
						return (
							<CategoryCard
								done={item.solved}
								key={index}
								onClick={() => {
									handleClickCategory(item, index);
								}}
							>
								<CategoryH3>{item.puzzle}</CategoryH3>
							</CategoryCard>
						);
					})}
				</CategoryContainer>
			)}
			{(state.gameController.display === 'board' ||
				windowInstance === 'gameboard') && (
				<BoardWrapper>
					<Board>
						{renderPuzzle(state).map((row) => {
							return row.map((letter, index) => (
								<LetterCell
									className={!letter ? 'blank' : ''}
									letter={letter}
									key={index}
								>
									<Span data-cell>{letter}</Span>
								</LetterCell>
							));
						})}
					</Board>
				</BoardWrapper>
			)}
			<CategoryDisplay display={state.gameController.display}>
				<CategoryDisplayText>
					{state.gameController.currentQuestion.category.toUpperCase()}
					<GuessedLettersDisplay>
						Guessed Letters:
						<LetterSpan>
							{state.gameController.currentQuestion.guessedLetters.join(', ')}
						</LetterSpan>
					</GuessedLettersDisplay>
				</CategoryDisplayText>
			</CategoryDisplay>
			{state.gameController.currentQuestion.solved &&
				windowInstance === 'controlPanel' && (
					<ReturnButton
						screen={windowInstance}
						display={state.gameController.display}
						onClick={handleClickReturn}
					>
						<H2>Select New Puzzle</H2>
					</ReturnButton>
				)}
			<SolvePuzzle
				display={state.gameController.display}
				screen={windowInstance}
				onClick={handleClickSolve}
			>
				<H2>Solve puzzle</H2>
			</SolvePuzzle>
			<ReactAudioPlayer
				ref={musicPlayer}
				volume={
					(state.audio.volume.master / 100) * (state.audio.volume.music / 100)
				}
			/>
			<ReactAudioPlayer
				ref={sfxPlayer}
				volume={
					(state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
				}
			/>
		</WheelContainer>
	) : (
		<div />
	);
}
