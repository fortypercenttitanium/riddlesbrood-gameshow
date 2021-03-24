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

export default function ESP({ windowInstance }) {
	let StoreContext;
	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		async function initialize() {
			const initState = {
				...(await initGame(state, 'esp', 'board')),
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
		if (!state.gameController.gameStarted) {
			initialize();
		}
	}, [dispatch, state]);

	const { board, currentQuestion, score } = state.gameController;

	const handleClickNext = () => {
		nextPrompt({ board, currentQuestion, dispatch, actions });
	};

	const handleClickPrev = () => {
		previousPrompt({ board, currentQuestion, dispatch, actions });
	};

	return state.gameController.gameStarted ? (
		<ESPHomeScreen>
			<TitleContainer>
				<Title>{currentQuestion}</Title>
			</TitleContainer>
			{windowInstance === 'controlPanel' && (
				<Controls>
					<Button onClick={handleClickPrev}>
						<H3>Previous prompt</H3>
					</Button>
					<Button onClick={handleClickNext}>
						<H3>Next prompt</H3>
					</Button>
				</Controls>
			)}
			{windowInstance === 'gameboard' && (
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
	) : (
		<div />
	);
}
