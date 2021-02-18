import React, { useContext, useEffect, useRef } from 'react';
import {
	CouplesHomeScreen,
	TitleContainer,
	Title,
	ScoreContainer,
	ScoreH1,
	ScoreH2,
	H3,
	Controls,
	Button,
	ScoreBoardDiv,
	ScoreCardDiv,
} from './gameComponentStyles/couplesStyles';
import {
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	nextQuestion,
	previousQuestion,
} from '../helpers/couples/imports';

export default function CouplesConundrum(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);
	const { gameController } = state;
	const { board, currentQuestion, score, gameStarted } = gameController;

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		async function initialize() {
			const initState = {
				...(await initGame(state, 'couples', 'board')),
				score: {
					type: 'team',
					scoreBoard: [0, 0, 0, 0],
				},
			};
			initState.currentQuestion = initState.board[0];
			dispatch({
				type: actions.INIT_GAME,
				payload: initState,
			});
		}
		if (!gameStarted) {
			initialize();
		}
	}, [dispatch, state, gameStarted]);

	const handleClickPrev = () => {
		previousQuestion({ board, currentQuestion, dispatch, actions });
	};

	const handleClickNext = () => {
		nextQuestion({ board, currentQuestion, dispatch, actions });
	};

	return state.gameController.gameStarted ? (
		<CouplesHomeScreen>
			<TitleContainer>
				<Title window={props.window}>{currentQuestion}</Title>
			</TitleContainer>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={handleClickPrev}>
						<H3>Previous question</H3>
					</Button>
					<Button onClick={handleClickNext}>
						<H3>Next question</H3>
					</Button>
				</Controls>
			)}
			{props.window === 'gameboard' && (
				<ScoreBoardDiv>
					{score.scoreBoard.map((scoreNum, scoreIndex) => {
						if (scoreNum !== null) {
							return (
								<ScoreCardDiv key={scoreIndex} index={scoreIndex}>
									<ScoreContainer>
										<ScoreH2>Team {scoreIndex + 1}</ScoreH2>
										<ScoreH1>{scoreNum}</ScoreH1>
									</ScoreContainer>
								</ScoreCardDiv>
							);
						} else return null;
					})}
				</ScoreBoardDiv>
			)}
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
		</CouplesHomeScreen>
	) : (
		<div />
	);
}
