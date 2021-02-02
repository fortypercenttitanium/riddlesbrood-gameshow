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
import {
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	nextPrompt,
	previousPrompt,
} from '../helpers/esp/imports';

export default function ESP({ window }) {
	let StoreContext;
	if (window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		if (!state.gameController.gameStarted) {
			const initState = {
				...initGame(state, 'esp', 'board'),
				score: {
					type: 'team',
					scoreBoard: [0, 0],
				},
			};
			initState.currentQuestion = initState.board[0];
			dispatch({
				type: actions.INIT_GAME,
				payload: initState,
			});
		}
	}, [dispatch, state]);

	const { board, display, currentQuestion, score } = state.gameController;

	const handleClickNext = () => {
		nextPrompt({ board, currentQuestion, dispatch, actions });
	};

	const handleClickPrev = () => {
		previousPrompt({ board, currentQuestion, dispatch, actions });
	};

	if (display === '') {
		return <div />;
	}

	return (
		<ESPHomeScreen>
			<TitleContainer>
				<Title window={window}>{currentQuestion}</Title>
			</TitleContainer>
			{window === 'controlPanel' && (
				<Controls>
					<Button onClick={handleClickPrev}>
						<H3>Previous prompt</H3>
					</Button>
					<Button onClick={handleClickNext}>
						<H3>Next prompt</H3>
					</Button>
				</Controls>
			)}
			{window === 'gameboard' && (
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
