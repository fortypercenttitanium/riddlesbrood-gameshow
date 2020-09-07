import React, { useContext, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { wheel as versions } from '../versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../../App';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../actions';
import ReactAudioPlayer from 'react-audio-player';

const { ipcRenderer } = window.require('electron');

const WheelContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: lightgrey;
	position: relative;
`;

const Board = styled.div`
	margin: 10% auto 0;
	height: 50%;
	width: 80%;
	display: grid;
	grid-template: repeat(4, 1fr) / repeat(14, 1fr);
	grid-gap: 2px;
`;

const Title = styled.h1`
	display: ${(props) => (props.display === 'select' ? 'inline' : 'none')};
	margin: 3rem auto;
	padding: 1rem;
`;

const CategoryContainer = styled.div`
	display: ${(props) => (props.display === 'select' ? 'flex' : 'none')};
	flex-direction: column;
	height: 50%;
	width: 30%;
	margin: auto;
`;

const CategoryCard = styled.div`
	display: ${(props) => (props.done ? 'none' : 'flex')};
	width: 200px;
	margin: auto;
	text-align: center;
	color: white;
	padding: 1rem;
	border: 1px solid black;
	background: rgb(72, 95, 145);
	background: linear-gradient(
		149deg,
		rgba(72, 95, 145, 1) 0%,
		rgba(68, 90, 136, 1) 31%,
		rgba(57, 75, 115, 1) 56%,
		rgba(46, 61, 92, 1) 100%
	);
	text-align: center;
	cursor: pointer;
	border-radius: 10px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

const LetterCell = styled.div`
	background: white;
	display: flex;
	&.active {
		background: blue;
	}
`;

const UnusedCell = styled.div`
	background: darkgreen;
`;

const Span = styled.span`
	margin: auto;
	display: none;
	&.reveal {
		display: inline;
	}
	font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif,
		monospace;
	font-size: 3rem;
`;

const LetterSpan = styled.span`
	margin: 0 10px;
`;

const ReturnButton = styled.div`
	padding: 1.4rem;
	position: absolute;
	bottom: 40px;
	left: 0;
	right: 0;
	width: 30%;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	text-align: center;
	margin: auto;
	background: lightblue;
	cursor: pointer;
	&:hover {
		background: white;
	}
	display: ${(props) =>
		props.display === 'board' && props.screen === 'controlPanel'
			? 'flex'
			: 'none'};
`;

const H2 = styled.h2`
	margin: auto;
	font-size: 1.5rem;
	font-weight: bold;
`;

const SolvePuzzle = styled.div`
	display: ${(props) =>
		props.display === 'board' && props.screen === 'controlPanel'
			? 'flex'
			: 'none'};
	position: absolute;
	top: 15px;
	padding: 1.2rem;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	left: 0;
	right: 0;
	width: 25%;
	margin: auto;
	background: lightblue;
	cursor: pointer;
	&:hover {
		background: white;
	}
`;

const GuessedLettersDisplay = styled.div`
	display: flex;
	margin: 0 5%;
	font-size: 1.5rem;
	font-weight: bold;
`;

const CategoryDisplay = styled.div`
	margin: 2rem auto;
	padding: 1rem 0;
	width: 100%;
	background: linear-gradient(90deg, #444, darkblue, #444);
	color: white;
	display: ${(props) => (props.display === 'board' ? 'flex' : 'none')};
`;

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
		//linter disabled because using dependencies causes multiple IPC events to fire
		//eslint-disable-next-line
	}, []);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		dispatch({
			type: actions.INIT_GAME,
			payload: {
				display: 'select',
				currentQuestion: {
					category: '',
					puzzle: ' ',
					guessedLetters: [],
					solved: false,
				},
				board: versions[state.currentGame.version].content,
				currentAnswer: '',
				timer: {
					time: null,
					running: false,
					tickSound: '',
				},
				score: {
					type: 'players',
					scoreBoard: [0, null, null, 0],
				},
			},
		});
	}, [dispatch, state.currentGame.version]);

	const playSound = (file, type = 'sfx') => {
		const player =
			type === 'sfx'
				? sfxPlayer.current.audioEl.current
				: musicPlayer.current.audioEl.current;
		player.src = file;
		player.play().catch((err) => {
			console.log(err);
		});
	};

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
			playSound('media/soundfx/wheelbuzzer.mp3');
		} else {
			if (index > 0) {
				spans[index - 1].parentNode.classList.remove('active');
				spans[index - 1].classList.add('reveal');
			}
			if (index < spans.length) {
				playSound('media/soundfx/wheelding.mp3');
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

	const renderPuzzle = () => {
		let puzzle = state.gameController.currentQuestion.puzzle;
		// the four rows to be rendered on the game board
		let rows = [[], [], [], []];
		// split answer into array of words
		let tempArr = puzzle.split(' ');
		// add spaces after words except the last one
		tempArr = tempArr.map((word) => {
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
		return rowsRender;
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
					{renderPuzzle().map((row) => {
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
