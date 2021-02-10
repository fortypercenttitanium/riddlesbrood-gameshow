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
	tickSound,
	buzzer,
	correctHandler,
	incorrectHandler,
	changeGameDisplay,
	setActiveTeam,
	clickHandlerCategory,
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
		async function initialize() {
			let initState = {
				...(await initGame(state, 'pyramid', 'board')),
				timer: {
					time: null,
					running: false,
					tickSound,
				},
				score: {
					type: 'team',
					scoreBoard: [0, 0],
				},
				activeTeam: 0,
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

	useEffect(() => {
		if (state.gameController.timer.time === 0) {
			playSound(buzzer, 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
			dispatch({ type: actions.KILL_TIMER });
			dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'roundOver' });
		}
	}, [state.gameController.timer.time, dispatch]);

	const handleClickCorrect = () => {
		correctHandler(state.gameController.activeTeam, {
			dispatch,
			actions,
			state,
			sfxPlayer,
			musicPlayer,
		});
	};

	const handleClickIncorrect = () => {
		incorrectHandler({
			sfxPlayer,
			musicPlayer,
			state,
			dispatch,
			actions,
		});
	};

	const handleClickReturn = () => {
		changeGameDisplay('board', { dispatch, actions });
	};

	const handleClickSetActive = (teamNumber) => {
		setActiveTeam(teamNumber, { dispatch, actions });
	};

	const handleClickCategory = (item, index) => {
		clickHandlerCategory(item, index, { state, dispatch, actions });
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
								<Button onClick={handleClickCorrect} type='correct'>
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
								<Button onClick={handleClickIncorrect} type='incorrect'>
									<H2>Wrong/Pass</H2>
								</Button>
							)}
						</ModalContainer>
					) : (
						<ModalContainer>
							<Button onClick={handleClickReturn}>Return To Categories</Button>
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
						handleClickSetActive(1);
					}}
				>
					<H2>Team 1</H2>
				</TeamButton>
				<TeamButton
					team={2}
					activeTeam={state.gameController.activeTeam}
					onClick={() => {
						handleClickSetActive(2);
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
									handleClickCategory(item, index);
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
