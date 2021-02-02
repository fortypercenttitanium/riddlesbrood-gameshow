import React, { useContext, useEffect, useRef, useCallback } from 'react';
import {
	WheelContainer,
	Title,
	CategoryContainer,
	CategoryCard,
	Board,
	UnusedCell,
	LetterCell,
	Span,
	CategoryDisplay,
	H2,
	GuessedLettersDisplay,
	LetterSpan,
	ReturnButton,
	SolvePuzzle,
} from './gameComponentStyles/wheelStyles';
import {
	renderPuzzle,
	initGame,
	playSound,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
} from '../helpers/wheel/imports';

const { ipcRenderer } = window.require('electron');

export default function Wheel(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	useEffect(() => {
		if (props.window === 'gameboard') {
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
		if (!state.gameController.gameStarted) {
			dispatch({
				type: actions.INIT_GAME,
				payload: initGame(state, 'wheel'),
			});
		}
	}, [dispatch, state]);

	const setCategorySolved = (categoryIndex) => {
		const board = state.gameController.board;
		board[categoryIndex].solved = true;
		dispatch({ type: actions.SET_BOARD, payload: board });
	};

	const changeGameDisplay = (displaySetting) => {
		dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: displaySetting });
	};

	const setCurrentQuestion = useCallback(
		(question) => {
			dispatch({ type: actions.SET_QUESTION, payload: question });
		},
		[dispatch]
	);

	const clickHandlerCategory = (puzzle, index) => {
		setCurrentQuestion({
			category: puzzle.category,
			puzzle: puzzle.puzzle,
			guessedLetters: [],
			solved: false,
		});
		setCategorySolved(index);
		dispatch({ type: actions.SET_ANSWER, payload: puzzle.puzzle });
		changeGameDisplay('board');
	};

	const activateLetterCells = useCallback((letter, index = 0) => {
		const spans = Array.from(document.querySelectorAll('span')).filter(
			(span) => {
				return span.textContent === letter;
			}
		);
		if (spans.length === 0) {
			playSound('media/soundfx/wheelbuzzer.mp3', 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
		} else {
			if (index > 0) {
				spans[index - 1].parentNode.classList.remove('active');
				spans[index - 1].classList.add('reveal');
			}
			if (index < spans.length) {
				playSound('media/soundfx/wheelding.mp3', 'sfx', {
					sfxPlayer,
					musicPlayer,
				});
				spans[index].parentNode.classList.add('active');
			}
			setTimeout(() => {
				if (index < spans.length) {
					activateLetterCells(letter, index + 1);
				}
			}, 2000);
		}
	}, []);

	const checkGuessedLetters = useCallback(
		(letter) => {
			return state.gameController.currentQuestion.guessedLetters.includes(
				letter
			);
		},
		[state.gameController.currentQuestion.guessedLetters]
	);

	const guessLetter = useCallback(
		(letter) => {
			if (!checkGuessedLetters(letter)) {
				let question = state.gameController.currentQuestion;
				question.guessedLetters.push(letter);
				setCurrentQuestion(question);
			}
		},
		[
			checkGuessedLetters,
			state.gameController.currentQuestion,
			setCurrentQuestion,
		]
	);

	const handleKeyPress = useCallback(
		(e) => {
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
		},
		[
			state.gameController.display,
			guessLetter,
			checkGuessedLetters,
			activateLetterCells,
		]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	const solvePuzzle = () => {
		const question = state.gameController.currentQuestion;
		question.solved = true;
		dispatch({ type: actions.SET_QUESTION, payload: question });
	};

	useEffect(() => {
		if (state.gameController.currentQuestion.solved) {
			document.querySelectorAll('span').forEach((span) => {
				span.classList.add('reveal');
			});
		}
	});

	const returnHandler = () => {
		setCurrentQuestion({
			category: '',
			puzzle: '',
			guessedLetters: [],
			solved: false,
		});
		changeGameDisplay('select');
	};

	if (!state.gameController.currentQuestion.puzzle) {
		return <div />;
	}

	return (
		<WheelContainer>
			<Title display={state.gameController.display}>
				Please select puzzle:
			</Title>
			{props.window === 'controlPanel' && (
				<CategoryContainer display={state.gameController.display}>
					{state.gameController.board.map((item, index) => {
						return (
							<CategoryCard
								done={item.solved}
								key={index}
								onClick={() => {
									clickHandlerCategory(item, index);
								}}
							>
								<h3 style={{ margin: 'auto' }}>{item.puzzle}</h3>
							</CategoryCard>
						);
					})}
				</CategoryContainer>
			)}
			{(state.gameController.display === 'board' ||
				props.window === 'gameboard') && (
				<Board>
					{renderPuzzle(state).map((row) => {
						return row.map((letter, index) => {
							if (letter === ' ') {
								return <UnusedCell key={index} />;
							} else {
								return (
									<LetterCell key={index}>
										<Span>{letter}</Span>
									</LetterCell>
								);
							}
						});
					})}
				</Board>
			)}
			<CategoryDisplay display={state.gameController.display}>
				<H2>{state.gameController.currentQuestion.category}</H2>
			</CategoryDisplay>
			{state.gameController.display === 'board' && (
				<GuessedLettersDisplay>
					Guessed Letters:
					<LetterSpan>
						{state.gameController.currentQuestion.guessedLetters.join(', ')}
					</LetterSpan>
				</GuessedLettersDisplay>
			)}
			{state.gameController.currentQuestion.solved &&
				props.window === 'controlPanel' && (
					<ReturnButton
						screen={props.window}
						display={state.gameController.display}
						onClick={returnHandler}
					>
						<H2>Select New Puzzle</H2>
					</ReturnButton>
				)}
			<SolvePuzzle
				display={state.gameController.display}
				screen={props.window}
				onClick={solvePuzzle}
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
	);
}
