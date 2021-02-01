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
} from './gameComponentStyles/whatIsItStyles';
import initGame from '../helpers/whatIsIt/initGame';
import { stopAllSounds } from '../helpers/shared/audioHelpers';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

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
		if (!state.gameController.gameStarted) {
			dispatch({
				type: actions.INIT_GAME,
				payload: initGame(state),
			});
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

	const playPauseHandler = () => {
		const player = sfxPlayer.current.audioEl.current;
		if (!timer.running && blocks.every((block) => block)) {
			player.src = 'media/soundfx/ticktock.wav';
			player.play().catch((err) => console.log(err));
			dispatch({ type: actions.RUN_TIMER });
		} else if (timer.running) {
			player.pause();
			dispatch({ type: actions.PAUSE_TIMER });
		} else if (timer.time > 0) {
			dispatch({ type: actions.RUN_TIMER });
			player.play();
		}
	};

	const toggleTitleReveal = (
		setting = !state.gameController.answerRevealed
	) => {
		dispatch({ type: actions.SET_ANSWER_REVEALED, payload: setting });
		setting && clearBlocks();
		setting && dispatch({ type: actions.KILL_TIMER });
		stopAllSounds({ sfxPlayer, musicPlayer });
	};

	const nextPicture = () => {
		const nextQuestionIndex = board.indexOf(currentQuestion) + 1;
		if (nextQuestionIndex <= board.length - 1) {
			resetBlocks();
			dispatch({ type: actions.SET_TIMER, payload: 24 });
			toggleTitleReveal(false);
			dispatch({
				type: actions.SET_QUESTION,
				payload: board[nextQuestionIndex],
			});
			dispatch({
				type: actions.SET_ANSWER,
				payload: board[nextQuestionIndex].title,
			});
		}
	};

	const resetBlocks = () => {
		let arr = [];
		for (let i = 0; i < 16; i++) {
			arr.push(true);
		}
		dispatch({ type: actions.SET_BLOCKS, payload: arr });
	};
	const clearBlocks = () => {
		let arr = [];
		for (let i = 0; i < 16; i++) {
			arr.push(false);
		}
		dispatch({ type: actions.SET_BLOCKS, payload: arr });
	};

	const revealHandler = useCallback(
		(level) => {
			// order in which the blocks will be removed
			const removalOrder = [
				[7, 14],
				[11, 12],
				[0, 2],
				[3, 8],
				[13, 15],
				[1, 4],
				[5, 10],
				[6, 9],
			];
			// find the index of the level we are at
			const removal = removalOrder[level - 1];
			const newBlocks = blocks;
			removal.forEach((num) => (newBlocks[num] = false));
			dispatch({ type: actions.SET_BLOCKS, payload: newBlocks });
		},
		[blocks, dispatch]
	);

	useEffect(() => {
		if (timer.running) {
			switch (timer.time) {
				case 21:
					revealHandler(1);
					break;
				case 18:
					revealHandler(2);
					break;
				case 15:
					revealHandler(3);
					break;
				case 12:
					revealHandler(4);
					break;
				case 9:
					revealHandler(5);
					break;
				case 6:
					revealHandler(6);
					break;
				case 3:
					revealHandler(7);
					break;
				case 0:
					revealHandler(8);
					dispatch({ type: actions.KILL_TIMER });
					stopAllSounds({ sfxPlayer, musicPlayer });
					break;
				default:
					break;
			}
		}
	}, [timer, dispatch, revealHandler]);

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
							<VeilImg src='media/images/whatthehellisit/veil.png' />
						</Veil>
					)}
				<GameImg src={`media/images/whatthehellisit/${currentQuestion.file}`} />
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
					<Button onClick={() => toggleTitleReveal()}>
						<H3>
							{state.gameController.answerRevealed ? 'Unreveal' : 'Reveal'}
						</H3>
					</Button>
					<AudioImg
						src={
							timer.running
								? 'media/images/pause-button.png'
								: 'media/images/play-button.png'
						}
						alt=''
						onClick={playPauseHandler}
					/>
					<Button onClick={nextPicture}>
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
