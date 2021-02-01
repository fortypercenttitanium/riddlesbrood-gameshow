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
import initGame from '../helpers/shared/initGame';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

export default function CouplesConundrum(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);
	const { gameController } = state;
	const {
		board,
		display,
		currentQuestion,
		score,
		gameStarted,
	} = gameController;

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		if (!gameStarted) {
			const initState = initGame(state, 'couples', 'start');
			initState.currentQuestion = initState.board[0];
			dispatch({
				type: actions.INIT_GAME,
				payload: initState,
			});
		}
	}, [dispatch, state, gameStarted]);

	const nextQuestion = () => {
		const nextQuestionIndex = board.indexOf(currentQuestion) + 1;
		if (nextQuestionIndex <= board.length - 1) {
			dispatch({
				type: actions.SET_QUESTION,
				payload: board[nextQuestionIndex],
			});
		}
	};
	const previousQuestion = () => {
		const prevQuestionIndex = board.indexOf(currentQuestion) - 1;
		if (prevQuestionIndex >= 0) {
			dispatch({
				type: actions.SET_QUESTION,
				payload: board[prevQuestionIndex],
			});
		}
	};

	if (display === '') {
		return <div />;
	}

	return (
		<CouplesHomeScreen>
			<TitleContainer>
				<Title window={props.window}>{currentQuestion}</Title>
			</TitleContainer>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={previousQuestion}>
						<H3>Previous question</H3>
					</Button>
					<Button onClick={nextQuestion}>
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
	);
}
