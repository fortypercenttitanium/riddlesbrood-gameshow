import React, { useContext, useEffect, useRef } from 'react';
import {
	CouplesHomeScreen,
	TitleContainer,
	Title,
	ScoreH1,
	H3,
	Controls,
	Button,
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
	toggleDisplay,
	bgMusic,
} from '../helpers/couples/imports';

export default function CouplesConundrum({ windowInstance }) {
	let StoreContext;
	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);
	const { gameController } = state;
	const { board, currentQuestion, score, gameStarted, display } =
		gameController;

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		async function initialize() {
			const initState = {
				...(await initGame(state, 'couples', 'scores')),
				score: {
					type: 'team',
					scoreBoard: [0, 0, 0, 0],
				},
				bgMusic: true,
			};
			initState.currentQuestion = initState.board[0];
			initState.currentAnswer = initState.board[0];
			dispatch({
				type: actions.INIT_GAME,
				payload: initState,
			});
		}
		if (!gameStarted) {
			initialize();
		}
	}, [dispatch, state, gameStarted]);

	useEffect(() => {
		if (
			gameStarted &&
			state.gameController.currentAnswer !==
				state.gameController.currentQuestion
		) {
			dispatch({
				type: actions.SET_ANSWER,
				payload: state.gameController.currentQuestion,
			});
		}
	}, [
		gameStarted,
		state.gameController.currentQuestion,
		state.gameController.currentAnswer,
		dispatch,
	]);

	const handleClickPrev = () => {
		previousQuestion({ board, currentQuestion, dispatch, actions });
	};

	const handleClickNext = () => {
		nextQuestion({ board, currentQuestion, dispatch, actions });
	};

	const handleClickDisplayToggle = () => {
		toggleDisplay({ display: state.gameController.display, dispatch, actions });
	};

	function parseHeartClassNames(scoreBoard) {
		const numberOfTeams = scoreBoard.filter((score) => score !== null).length;
		let classNames = [];
		for (let i = 0; i < scoreBoard.length; i++) {
			classNames.push(`index-${i}`);
		}
		if (
			numberOfTeams === 3 &&
			scoreBoard[3] !== null &&
			scoreBoard[0] !== null
		) {
			classNames[1] += ' alt-location';
			classNames[2] += ' alt-location';
		}
		if (numberOfTeams === 2) {
			classNames = [];
			scoreBoard.forEach((score) => {
				if (score !== null) {
					classNames.push(
						classNames.filter((className) => className).length
							? 'index-0'
							: 'index-3'
					);
				} else {
					classNames.push('');
				}
			});
		}
		return classNames;
	}

	return state.gameController.gameStarted ? (
		<CouplesHomeScreen display={display}>
			<div className='sparkle-overlay' />
			{display === 'question' ? (
				<TitleContainer>
					<Title>{currentQuestion}</Title>
				</TitleContainer>
			) : (
				score.scoreBoard.map((scoreNum, scoreIndex) => {
					if (scoreNum !== null) {
						return (
							<ScoreCardDiv
								key={scoreIndex}
								className={parseHeartClassNames(score.scoreBoard)[scoreIndex]}
							>
								<ScoreH1>{scoreNum}</ScoreH1>
							</ScoreCardDiv>
						);
					} else return null;
				})
			)}
			{windowInstance === 'controlPanel' && (
				<Controls>
					<Button onClick={handleClickPrev}>
						<H3>Previous question</H3>
					</Button>
					<Button onClick={handleClickDisplayToggle}>
						<H3>Show {display === 'scores' ? 'question' : 'scores'}</H3>
					</Button>
					<Button onClick={handleClickNext}>
						<H3>Next question</H3>
					</Button>
				</Controls>
			)}
			<ReactAudioPlayer
				ref={sfxPlayer}
				volume={
					(state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
				}
			/>
			{state.gameController.bgMusic && state.gameController.gameStarted && (
				<ReactAudioPlayer
					volume={
						(state.audio.volume.master / 100) * (state.audio.volume.music / 100)
					}
					ref={musicPlayer}
					src={bgMusic}
					autoPlay
					loop
				/>
			)}
		</CouplesHomeScreen>
	) : (
		<div />
	);
}
