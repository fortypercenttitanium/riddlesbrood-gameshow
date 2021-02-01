import React, { useContext, useEffect, useRef } from 'react';
import {
	ESPHomeScreen,
	TitleContainer,
	Title,
	ScoreH1,
	ScoreH2,
	H3,
	Controls,
	Button,
	ScoreBoardDiv,
	ScoreCardDiv,
} from './gameComponentStyles/espStyles';
import initGame from '../helpers/esp/initGame';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

export default function ESP(props) {
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
				payload: initGame(state),
			});
		}
	}, [dispatch, state]);

	const { board, display, currentQuestion, score } = state.gameController;

	const nextPrompt = () => {
		const nextQuestionIndex = board.indexOf(currentQuestion) + 1;
		if (nextQuestionIndex <= board.length - 1) {
			dispatch({
				type: actions.SET_QUESTION,
				payload: board[nextQuestionIndex],
			});
		}
	};
	const previousPrompt = () => {
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
		<ESPHomeScreen>
			<TitleContainer>
				<Title window={props.window}>{currentQuestion}</Title>
			</TitleContainer>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={previousPrompt}>
						<H3>Previous prompt</H3>
					</Button>
					<Button onClick={nextPrompt}>
						<H3>Next prompt</H3>
					</Button>
				</Controls>
			)}
			{props.window === 'gameboard' && (
				<ScoreBoardDiv>
					{score.scoreBoard.map((scoreNum, scoreIndex) => {
						if (scoreNum !== null) {
							return (
								<ScoreCardDiv key={scoreIndex} index={scoreIndex}>
									<ScoreH2>
										{score.type === 'player' ? 'Player' : 'Team'}{' '}
										{scoreIndex + 1}
									</ScoreH2>
									<div
										style={{
											display: 'flex',
											margin: 'auto 0',
										}}
									>
										<ScoreH1>{scoreNum}</ScoreH1>
									</div>
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
		</ESPHomeScreen>
	);
}
