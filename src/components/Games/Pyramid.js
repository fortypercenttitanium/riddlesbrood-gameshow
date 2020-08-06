import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { pyramid as versions } from './versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../App';
import { StoreContext as StoreContextGB } from '../Gameboard';
import { actions } from '../../actions';

const PyramidHomeScreen = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	background-color: ${(props) =>
		props.team === 0 ? '#999' : props.team === 1 ? '#FF9999' : '#9999FF'};
	flex-direction: column;
	text-align: center;
	position: relative;
`;

const Title = styled.h1`
	margin: 3% auto;
	padding: 1rem;
`;

const CategoryContainer = styled.div`
	display: grid;
	grid-template-areas:
		'cat1 cat2'
		'cat3 cat4';
	width: 30%;
	margin: auto;
`;

const CategoryCard = styled.div`
	grid-area: ${(props) => props.gridArea};
	padding: 1rem;
	margin: 1%;
	text-align: center;
	display: ${(props) => (props.done ? 'none' : 'flex')};
	border: 1px solid red;
	cursor: pointer;
	&:hover {
		background: pink;
	}
`;

const Span = styled.span`
	margin: 0 auto;
	font-size: 1rem;
`;

const Modal = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	color: #ddd;
	background-color: inherit;
	text-align: center;
	cursor: pointer;
	display: ${(props) => (props.display === 'board' ? 'none' : 'flex')};
	flex-direction: column;
`;

const Button = styled.div`
	color: #eee;
	background: ${(props) =>
		props.type === 'correct'
			? 'rgb(97, 165, 85)'
			: props.type === 'incorrect'
			? 'rgb(167, 68, 57)'
			: '#000'};
	padding: 1rem;
	margin: auto;
	font-weight: bold;
`;

const ModalDiv = styled.div`
	height: 15%;
	margin: 0;
	padding: 0;
	display: flex;
`;

const H1 = styled.h1`
	margin: 0 auto;
	font-size: 2rem;
`;

const H2 = styled.h2`
	margin: auto;
	padding: 1rem;
	font-size: 1.5rem;
`;

const TeamButton = styled.div`
	background-color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
	border: ${(props) => (props.team === 1 ? '3px solid red' : '3px solid blue')};
	color: white;
	padding: 1rem;
	margin: 0 auto;
	border-color: ${(props) => props.activeTeam === props.team && 'white'};
`;

const TurnContainer = styled.div`
	display: flex;
	width: 50%;
	margin: 0 auto;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto auto 0;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

export default function Pyramid(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch, playSound } = useContext(StoreContext);

	let localAudioPlayer = useRef();
	let localAudioPlayer2 = useRef();

	const setLocalAudioPlayer = () => {
		const player = localAudioPlayer.current.paused
			? localAudioPlayer.current
			: localAudioPlayer2.current.paused
			? localAudioPlayer2.current
			: localAudioPlayer.current;
		return player;
	};

	useEffect(() => {
		dispatch({
			type: actions.INIT_GAME,
			payload: {
				display: 'board',
				currentQuestion: {
					category: '',
					words: [],
					index: 0,
				},
				currentAnswer: '',
				streak: 0,
				activeTeam: 0,
				board: versions[state.currentGame.version].content,
				correctCounter: 0,
				timer: {
					time: null,
					running: false,
					tickSound: 'soundfx/beep.mp3',
				},
				score: {
					type: 'team',
					scoreBoard: [0, 0],
				},
			},
		});
	}, [dispatch, state.currentGame.version]);

	useEffect(() => {
		if (state.gameController.timer.time === 0) {
			playSound('sfx', 'soundfx/buzzer.mp3');
			dispatch({ type: actions.KILL_TIMER });
			dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'roundOver' });
		}
	}, [state.gameController.timer.time, playSound, dispatch]);

	const setCategoryCompleted = (categoryIndex) => {
		const board = state.gameController.board;
		board[categoryIndex].completed = true;
		dispatch({ type: actions.SET_BOARD, payload: board });
	};

	const changeGameDisplay = (display) => {
		dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
	};

	const setActiveTeam = (team) => {
		dispatch({ type: actions.SET_ACTIVE_TEAM, payload: team });
	};

	const setCurrentQuestion = (question) => {
		dispatch({ type: actions.SET_QUESTION, payload: question });
	};

	const setCorrectCounter = (count = 0) => {
		dispatch({ type: actions.SET_CORRECT_COUNTER, payload: count });
	};

	const incrementStreak = () => {
		dispatch({ type: actions.INCREMENT_STREAK });
	};

	const resetStreak = () => {
		dispatch({ type: actions.RESET_STREAK });
	};

	const addBonusTime = (seconds) => {
		dispatch({
			type: actions.SET_TIMER,
			payload: state.gameController.timer.time + seconds,
		});
		dispatch({ type: actions.RUN_TIMER });
		playSoundLocal('sfx', 'soundfx/ohyeah.wav');
	};

	const getVolume = (type) => {
		return type === 'sfx'
			? (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
			: (state.audio.volume.master / 100) * (state.audio.volume.music / 100);
	};

	const playSoundLocal = (type, file) => {
		const player = setLocalAudioPlayer();
		player.src = file;
		player.volume = getVolume(type);
		player.play().catch((err) => console.log(err));
	};

	const clickHandlerCategory = (question, index) => {
		if (state.gameController.activeTeam !== 0) {
			setCategoryCompleted(index);
			changeGameDisplay('question');
			setCurrentQuestion({
				category: question.category,
				words: question.words,
				index: 0,
			});
			setCorrectCounter();
			resetStreak();
			dispatch({ type: actions.SET_TIMER, payload: 20 });
			dispatch({ type: actions.RUN_TIMER });
		} else {
			alert('Please select active team');
		}
	};

	const checkIfRoundOver = () => {
		if (
			state.gameController.currentQuestion.index ===
			state.gameController.currentQuestion.words.length - 1
		) {
			changeGameDisplay('roundOver');
			setCurrentQuestion({
				category: '',
				words: [],
				index: 0,
			});
			dispatch({ type: actions.KILL_TIMER });
			return true;
		} else return false;
	};

	const nextQuestion = () => {
		if (!checkIfRoundOver()) {
			setCurrentQuestion({
				category: state.gameController.currentQuestion.category,
				words: state.gameController.currentQuestion.words,
				index: state.gameController.currentQuestion.index + 1,
			});
		}
	};

	const correctHandler = (team) => {
		if (state.gameController.streak === 9) {
			addBonusTime(5);
		} else if (state.gameController.streak === 14) {
			addBonusTime(10);
		} else {
			playSoundLocal('sfx', 'soundfx/pyramidbell.mp3');
		}
		setCorrectCounter(state.gameController.correctCounter + 1);
		nextQuestion();
		dispatch({
			type: actions.CHANGE_SCORE,
			payload: { playerIndex: team - 1, amount: 1 },
		});
		incrementStreak();
	};

	const incorrectHandler = () => {
		nextQuestion();
		playSoundLocal('sfx', 'soundfx/buzzer.mp3');
		resetStreak();
	};

	// const stopSoundLocal = () => {
	// 	const player = localAudioPlayer.current.paused
	// 		? localAudioPlayer2.current
	// 		: localAudioPlayer.current;
	// 	player.pause();
	// 	player.load();
	// };

	return (
		<PyramidHomeScreen team={state.gameController.activeTeam}>
			<Modal display={state.gameController.display}>
				<ModalDiv>
					<H1>{state.gameController.currentQuestion.category}</H1>
				</ModalDiv>
				<ModalDiv>
					<H2>
						{state.gameController.display === 'question'
							? state.gameController.timer.time
							: 'Round over'}
					</H2>
				</ModalDiv>
				<ModalDiv>
					<H2>{state.gameController.correctCounter}</H2>
				</ModalDiv>
				<ModalDiv>
					{state.gameController.display === 'question' ? (
						<H2>
							{
								state.gameController.currentQuestion.words[
									state.gameController.currentQuestion.index
								]
							}
						</H2>
					) : (
						<Button
							onClick={() => {
								changeGameDisplay('board');
							}}
						>
							Return To Categories
						</Button>
					)}
				</ModalDiv>
				<ModalDiv
					style={{
						display: state.gameController.display === 'roundOver' && 'none',
					}}
				>
					<Button
						onClick={() => {
							correctHandler(state.gameController.activeTeam);
						}}
						type='correct'
					>
						<H2>Correct</H2>
					</Button>
					<Button onClick={incorrectHandler} type='incorrect'>
						<H2>Wrong/Pass</H2>
					</Button>
				</ModalDiv>
				<Container>
					<ScoreContainer team={1}>
						<H2>Team 1 Score</H2>
						<H2>{state.gameController.score.scoreBoard[0]}</H2>
					</ScoreContainer>
					<ScoreContainer team={2}>
						<H2>Team 2 Score</H2>
						<H2>{state.gameController.score.scoreBoard[1]}</H2>
					</ScoreContainer>
				</Container>
			</Modal>
			<Title>TURN:</Title>
			<TurnContainer>
				<TeamButton
					team={1}
					activeTeam={state.gameController.activeTeam}
					onClick={() => {
						setActiveTeam(1);
					}}
				>
					<H2>Team 1</H2>
				</TeamButton>
				<TeamButton
					team={2}
					activeTeam={state.gameController.activeTeam}
					onClick={() => {
						setActiveTeam(2);
					}}
				>
					<H2>Team 2</H2>
				</TeamButton>
			</TurnContainer>

			<Title>Categories</Title>
			<Container>
				<ScoreContainer team={1}>
					<H2>Team 1 Score</H2>
					<H2>{state.gameController.score.scoreBoard[0]}</H2>
				</ScoreContainer>
				<CategoryContainer>
					{state.gameController.board.map((item, index) => {
						return (
							<CategoryCard
								key={index}
								gridArea={`cat${index + 1}`}
								done={item.completed}
								onClick={() => {
									clickHandlerCategory(item, index);
								}}
							>
								<Span>{item.category}</Span>
							</CategoryCard>
						);
					})}
				</CategoryContainer>
				<ScoreContainer team={2}>
					<H2>Team 2 Score</H2>
					<H2>{state.gameController.score.scoreBoard[1]}</H2>
				</ScoreContainer>
			</Container>
			<audio ref={localAudioPlayer} />
			<audio ref={localAudioPlayer2} />
		</PyramidHomeScreen>
	);
}
