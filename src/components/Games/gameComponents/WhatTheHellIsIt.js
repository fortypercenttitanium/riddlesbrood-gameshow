import React, { useContext, useEffect, useRef, useCallback } from 'react';
import {
	WhatHomeScreen,
	TitleContainer,
	Title,
	PictureDiv,
	GameImg,
	BlocksDiv,
	Block,
	Veil,
	VeilImg,
	ScoreH1,
	ScoreH2,
	H3,
	AudioImg,
	Controls,
	Button,
	ScoreBoardDiv,
	ScoreCardDiv,
	ScoreBody,
} from './gameComponentStyles/whatIsItStyles';
import {
	initGame,
	stopAllSounds,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	playPauseHandler,
	toggleTitleReveal,
	nextPicture,
	revealHandleCallback,
	veilImage,
	importAll,
	playButton,
	pauseButton,
} from '../helpers/whatIsIt/imports';

const pictures = importAll(
	require.context(
		'../../../assets/images/game_images/what_is_it',
		false,
		/\.jpg$|\.jpeg$|\.png$/
	)
);

export default function WhatTheHellIsIt(props) {
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
			let initState = { ...(await initGame(state, 'whatTheHellIsIt')) };
			initState = {
				...initState,
				currentQuestion: initState.board[0],
				currentAnswer: initState.board[0].title,
				timer: {
					time: 24,
					running: false,
					tickSound: '',
				},
				score: {
					type: 'player',
					scoreBoard: [0, 0, 0, 0],
				},
				answerRevealed: false,
				blocks: [
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
				],
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

	const {
		board,
		display,
		currentQuestion,
		score,
		timer,
		blocks,
	} = state.gameController;

	const revealHandler = useCallback(revealHandleCallback, [blocks, dispatch]);

	const handleClickReveal = () => {
		toggleTitleReveal(!state.gameController.answerRevealed, {
			dispatch,
			actions,
			sfxPlayer,
			musicPlayer,
		});
	};

	const handleClickPlayPause = () => {
		playPauseHandler({ sfxPlayer, timer, blocks, dispatch, actions });
	};

	const handleClickNext = () => {
		nextPicture({
			board,
			currentQuestion,
			dispatch,
			actions,
			sfxPlayer,
			musicPlayer,
		});
	};

	useEffect(() => {
		if (timer.running) {
			switch (timer.time) {
				case 21:
					revealHandler(1, { blocks, dispatch, actions });
					break;
				case 18:
					revealHandler(2, { blocks, dispatch, actions });
					break;
				case 15:
					revealHandler(3, { blocks, dispatch, actions });
					break;
				case 12:
					revealHandler(4, { blocks, dispatch, actions });
					break;
				case 9:
					revealHandler(5, { blocks, dispatch, actions });
					break;
				case 6:
					revealHandler(6, { blocks, dispatch, actions });
					break;
				case 3:
					revealHandler(7, { blocks, dispatch, actions });
					break;
				case 0:
					revealHandler(8, { blocks, dispatch, actions });
					dispatch({ type: actions.KILL_TIMER });
					stopAllSounds({ sfxPlayer, musicPlayer });
					break;
				default:
					break;
			}
		}
	}, [timer, dispatch, revealHandler, blocks]);

	if (display === '') {
		return <div />;
	}

	return (
		<WhatHomeScreen>
			<TitleContainer>
				<Title
					show={Boolean(
						state.gameController.answerRevealed ||
							props.window === 'controlPanel'
					)}
					window={props.window}
				>
					{currentQuestion.title}
				</Title>
			</TitleContainer>
			<PictureDiv>
				{timer.time < 24 &&
					!timer.running &&
					!state.gameController.answerRevealed && (
						<Veil>
							<VeilImg src={veilImage} />
						</Veil>
					)}
				<GameImg
					src={
						currentQuestion.file.slice(6) === 'app://'
							? currentQuestion.file
							: pictures[currentQuestion.file]
					}
				/>
				<BlocksDiv>
					{blocks.map((block, blockIndex) =>
						block ? (
							<Block key={blockIndex} revealed={false} />
						) : (
							<Block key={blockIndex} revealed={true} />
						)
					)}
				</BlocksDiv>
			</PictureDiv>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={handleClickReveal}>
						<H3>
							{state.gameController.answerRevealed ? 'Unreveal' : 'Reveal'}
						</H3>
					</Button>
					<AudioImg
						src={timer.running ? pauseButton : playButton}
						alt=''
						onClick={handleClickPlayPause}
					/>
					<Button onClick={handleClickNext}>
						<H3>Next picture</H3>
					</Button>
				</Controls>
			)}
			{props.window === 'gameboard' && (
				<ScoreBoardDiv>
					{score.scoreBoard.map((scoreNum, scoreIndex) => {
						return (
							<ScoreCardDiv key={scoreIndex} index={scoreIndex}>
								<ScoreH2>
									{score.type === 'player' ? 'Player' : 'Team'} {scoreIndex + 1}
								</ScoreH2>
								<ScoreBody>
									<ScoreH1>{scoreNum}</ScoreH1>
								</ScoreBody>
							</ScoreCardDiv>
						);
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
		</WhatHomeScreen>
	);
}
