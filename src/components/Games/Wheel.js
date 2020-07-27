import React, { Component } from 'react';
import styled from 'styled-components';
import { wheel as versions } from './versions/gameVersions';

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
	display: ${(props) => (props.display === 'board' ? 'grid' : 'none')};
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
	padding: 1rem;
	margin: auto;
	text-align: center;
	display: ${(props) => (props.done ? 'none' : 'flex')};
	border: 1px solid red;
	cursor: pointer;
	&:hover {
		background: pink;
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

const ReturnButton = styled.div`
	padding: 1.4rem;
	position: absolute;
	bottom: 20px;
	left: 0;
	right: 0;
	width: 30%;
	text-align: center;
	margin: auto;
	background: lightblue;
	cursor: pointer;
	&:hover {
		background: white;
	}
	display: ${(props) =>
		props.display === 'board' &&
		props.complete &&
		props.screen === 'controlPanel'
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
	top: 20px;
	padding: 1.5rem;
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

const CategoryDisplay = styled.div`
	margin: 2rem auto;
	padding: 1rem 0;
	width: 100%;
	background: linear-gradient(90deg, #444, darkblue, #444);
	color: white;
	display: ${(props) => (props.display === 'board' ? 'flex' : 'none')};
`;

export class Wheel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'select',
			currentQuestion: {
				category: '',
				puzzle: '',
				guessedLetters: [],
				complete: false,
			},
			board: versions[this.props.version].content,
		};
		localStorage.setItem(
			'board',
			JSON.stringify(versions[this.props.version].content)
		);
		localStorage.setItem(
			'currentQuestion',
			JSON.stringify(this.state.currentQuestion)
		);
		localStorage.setItem('display', 'select');
		this.props.setScoreType('player', 3);
	}

	componentDidMount() {
		window.addEventListener('storage', this.localStorageUpdated);
		window.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.localStorageUpdated);
		window.removeEventListener('keypress', this.handleKeyPress);
	}

	localStorageUpdated = () => {
		if (
			this.state.currentQuestion.guessedLetters[
				this.state.currentQuestion.guessedLetters.length - 1
			] !==
				JSON.parse(localStorage.getItem('currentQuestion')).guessedLetters[
					JSON.parse(localStorage.getItem('currentQuestion')).guessedLetters
						.length - 1
				] &&
			!this.checkIfPuzzleComplete()
		) {
			this.activateLetterCells(
				JSON.parse(localStorage.getItem('currentQuestion')).guessedLetters[
					JSON.parse(localStorage.getItem('currentQuestion')).guessedLetters
						.length - 1
				],
				0
			);
		}
		this.setState({
			display: localStorage.getItem('display'),
			currentQuestion: JSON.parse(localStorage.getItem('currentQuestion')),
			board: JSON.parse(localStorage.getItem('board')),
		});
		this.checkIfPuzzleComplete() && this.solvePuzzle();
	};

	setCategoryCompleted = (categoryIndex) => {
		const board = this.state.board;
		board[categoryIndex].completed = true;
		localStorage.setItem('board', JSON.stringify(board));
	};

	setDisplay = (displaySetting) => {
		localStorage.setItem('display', displaySetting);
	};

	setCurrentQuestion = (question) => {
		localStorage.setItem('currentQuestion', JSON.stringify(question));
	};

	clickHandlerCategory = (puzzle, index) => {
		this.setCategoryCompleted(index);
		this.setDisplay('board');
		this.setCurrentQuestion({
			category: puzzle.category,
			puzzle: puzzle.puzzle,
			guessedLetters: [],
			complete: false,
		});
		this.props.setAnswer(puzzle.puzzle);
		this.localStorageUpdated();
	};

	guessLetter = (letter) => {
		const upperLetter = letter.toUpperCase();
		if (!this.state.currentQuestion.guessedLetters.includes(upperLetter)) {
			let question = this.state.currentQuestion;
			question.guessedLetters.push(upperLetter);
			this.setCurrentQuestion(question);
			this.localStorageUpdated();
			this.activateLetterCells(
				JSON.parse(localStorage.getItem('currentQuestion')).guessedLetters[
					JSON.parse(localStorage.getItem('currentQuestion')).guessedLetters
						.length - 1
				],
				0
			);
		}
	};

	activateLetterCells = (letter, index) => {
		const spans = Array.from(document.querySelectorAll('span')).filter(
			(span) => {
				return span.textContent === letter;
			}
		);
		if (spans.length === 0) {
			this.props.playSound('sfx', 'soundfx/wheelbuzzer.mp3');
		} else {
			if (index > 0) {
				spans[index - 1].parentNode.classList.remove('active');
				spans[index - 1].classList.add('reveal');
			}
			if (index < spans.length) {
				this.props.playSound('sfx', 'soundfx/wheelding.mp3');
				spans[index].parentNode.classList.add('active');
			}
			setTimeout(() => {
				if (index < spans.length) {
					this.activateLetterCells(letter, index + 1);
				}
			}, 2000);
		}
	};

	checkGuessedLetters = (letter) => {
		return this.state.currentQuestion.guessedLetters.includes(letter);
	};

	handleKeyPress = (e) => {
		if (this.state.display === 'board') {
			if (
				(e.charCode >= 65 && e.charCode <= 90) ||
				(e.charCode >= 97 && e.charCode <= 122)
			) {
				this.guessLetter(e.key);
			}
		}
	};

	checkIfPuzzleComplete = () => {
		return (
			this.state.currentQuestion.puzzle
				.split('')
				.filter((char) => char !== ' ')
				.every((letter) =>
					this.state.currentQuestion.guessedLetters.includes(letter)
				) || this.state.currentQuestion.complete
		);
	};

	solvePuzzle = () => {
		if (!this.state.currentQuestion.complete) {
			this.solveHandler();
		}
		document.querySelectorAll('span').forEach((span) => {
			span.classList.add('reveal');
		});
	};

	solveHandler = () => {
		const solvedQuestion = this.state.currentQuestion;
		solvedQuestion.complete = true;
		localStorage.setItem('currentQuestion', JSON.stringify(solvedQuestion));
		this.localStorageUpdated();
	};

	returnHandler = () => {
		localStorage.setItem(
			'currentQuestion',
			JSON.stringify({
				category: '',
				puzzle: '',
				guessedLetters: [],
				complete: false,
			})
		);
		localStorage.setItem('display', 'select');
		this.localStorageUpdated();
	};

	render() {
		let puzzle = this.state.currentQuestion.puzzle;
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

		return (
			<WheelContainer>
				<Title display={this.state.display}>Please select puzzle:</Title>
				<CategoryContainer display={this.state.display}>
					{this.state.board.map((item, index) => {
						return (
							<CategoryCard
								done={item.completed}
								key={index}
								onClick={() => {
									this.clickHandlerCategory(item, index);
								}}
							>
								{item.category}
							</CategoryCard>
						);
					})}
				</CategoryContainer>
				<Board display={this.state.display}>
					{rowsRender.map((row) => {
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
				<CategoryDisplay display={this.state.display}>
					<H2>{this.state.currentQuestion.category}</H2>
				</CategoryDisplay>
				<ReturnButton
					complete={this.state.currentQuestion.complete}
					screen={this.props.window}
					display={this.state.display}
					onClick={this.returnHandler}
				>
					<H2>Select New Puzzle</H2>
				</ReturnButton>
				<SolvePuzzle
					display={this.state.display}
					screen={this.props.window}
					onClick={this.solveHandler}
				>
					<H2>Solve puzzle</H2>
				</SolvePuzzle>
			</WheelContainer>
		);
	}
}

export default Wheel;
