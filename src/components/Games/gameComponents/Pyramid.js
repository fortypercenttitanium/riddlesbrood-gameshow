import React, { useContext, useEffect, useRef } from 'react';
import {
	PyramidHomeScreen,
	Title,
	TurnContainer,
	Container,
	ModalContainer,
	VerticalStack,
	ScoreContainer,
	CategoryContainer,
	CategoryCard,
	Span,
	Modal,
	Button,
	ModalDiv,
	H1,
	H2,
	TeamButton,
} from './gameComponentStyles/pyramidStyles';
import {
	playSound,
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
} from '../helpers/pyramid/imports';

export default function Pyramid(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		if (!state.gameController.gameStarted) {
			dispatch({
				type: actions.INIT_GAME,
				payload: initGame(state, 'pyramid'),
			});
		}
	}, [dispatch, state]);

	useEffect(() => {
		if (state.gameController.timer.time === 0) {
			playSound('media/soundfx/buzzer.mp3', 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
			dispatch({ type: actions.KILL_TIMER });
			dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'roundOver' });
		}
	}, [state.gameController.timer.time, dispatch]);

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
		playSound('media/soundfx/ohyeah.wav', 'sfx', {
			sfxPlayer,
			musicPlayer,
		});
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
			playSound('media/soundfx/pyramidbell.mp3', 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
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
		playSound('media/soundfx/buzzer.mp3', 'sfx', {
			sfxPlayer,
			musicPlayer,
		});
		resetStreak();
	};

	return (
		<PyramidHomeScreen team={state.gameController.activeTeam}>
			<Modal display={state.gameController.display}>
				<ModalDiv>
					<H1>{state.gameController.currentQuestion.category}</H1>
				</ModalDiv>
				<ModalContainer>
					<ScoreContainer team={1}>
						<H2>Team 1 Score</H2>
						<H2>{state.gameController.score.scoreBoard[0]}</H2>
					</ScoreContainer>
					<VerticalStack>
						<ModalDiv>
							<H2>Timer:</H2>
							<H2>
								{state.gameController.display === 'question'
									? state.gameController.timer.time
									: 'Round over'}
							</H2>
						</ModalDiv>
						<ModalDiv>
							<H2>POINTS SCORED: {state.gameController.correctCounter}</H2>
						</ModalDiv>
					</VerticalStack>
					<ScoreContainer team={2}>
						<H2>Team 2 Score</H2>
						<H2>{state.gameController.score.scoreBoard[1]}</H2>
					</ScoreContainer>
				</ModalContainer>

				<ModalContainer>
					{state.gameController.display === 'question' ? (
						<ModalContainer>
							{props.window === 'controlPanel' && (
								<Button
									onClick={() => {
										correctHandler(state.gameController.activeTeam);
									}}
									type='correct'
								>
									<H2>Correct</H2>
								</Button>
							)}
							<H2>
								{
									state.gameController.currentQuestion.words[
										state.gameController.currentQuestion.index
									]
								}
							</H2>
							{props.window === 'controlPanel' && (
								<Button onClick={incorrectHandler} type='incorrect'>
									<H2>Wrong/Pass</H2>
								</Button>
							)}
						</ModalContainer>
					) : (
						<ModalContainer>
							<Button
								onClick={() => {
									changeGameDisplay('board');
								}}
							>
								Return To Categories
							</Button>
						</ModalContainer>
					)}
				</ModalContainer>
			</Modal>
			<Title>TURN:</Title>
			<TurnContainer>
				<ScoreContainer team={1}>
					<H2>Team 1 Score</H2>
					<H2>{state.gameController.score.scoreBoard[0]}</H2>
				</ScoreContainer>
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
				<ScoreContainer team={2}>
					<H2>Team 2 Score</H2>
					<H2>{state.gameController.score.scoreBoard[1]}</H2>
				</ScoreContainer>
			</TurnContainer>

			<Title>Categories</Title>
			<Container>
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
			</Container>
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
		</PyramidHomeScreen>
	);
}
