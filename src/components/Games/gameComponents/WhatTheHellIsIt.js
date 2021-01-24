import React, { useContext, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { whatTheHellIsIt as versions } from '../versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

const WhatHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: #222;
	color: gold;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

const TitleContainer = styled.div`
	display: block;
	height: 12%;
	width: 85%;
	margin: auto;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 3rem;
`;

const Title = styled(H1)`
	display: ${(props) => (props.show ? 'block' : 'none')};
	font-size: ${(props) => props.window === 'controlPanel' && '2.4rem'};
`;

const PictureDiv = styled.div`
	display: flex;
	position: relative;
	height: 60%;
	width: 60%;
	margin: auto;
`;

const GameImg = styled.img`
	height: 100%;
	width: 100%;
`;

const BlocksDiv = styled.div`
	display: grid;
	grid-template: repeat(4, 1fr) / repeat(4, 1fr);
	grid-gap: 4px;
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const Block = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 10px;
	background-color: ${(props) => (props.revealed ? 'transparent' : 'green')};
	transition: ${(props) => (props.revealed ? '3s ease-in' : 'none')};
`;

const Veil = styled.div`
	position: absolute;
	display: flex;
	height: 100%;
	width: 100%;
	background: #222;
	z-index: 2;
`;

const VeilImg = styled.img`
	position: relative;
	width: 100%;
`;

const ScoreH1 = styled(H1)`
	margin: auto;
	color: #ddd;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const ScoreH2 = styled(ScoreH1)`
	font-size: 2rem;
`;

const H3 = styled(H1)`
	font-size: 1.6rem;
	color: #ddd;
	margin: auto;
	padding: 1rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const AudioImg = styled.img`
	height: 50px;
	width: 50px;
	cursor: pointer;
	margin: auto;
	border: 1px solid #edd607;
	border-radius: 15px;
	padding: 20px;
	&:hover {
		background-color: #444;
	}
`;

const Controls = styled.div`
	display: flex;
	border-radius: 5px;
	margin: auto;
	width: 75%;
`;

const Button = styled.div`
	display: flex;
	width: 200px;
	margin: auto;
	border: 1px solid black;
	background: rgb(72, 95, 145);
	background: linear-gradient(
		149deg,
		rgba(72, 95, 145, 1) 0%,
		rgba(68, 90, 136, 1) 31%,
		rgba(57, 75, 115, 1) 56%,
		rgba(46, 61, 92, 1) 100%
	);
	text-align: center;
	cursor: pointer;
	border-radius: 10px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

const ScoreBoardDiv = styled.div`
	display: flex;
	width: 80%;
	margin: auto;
`;

const ScoreCardDiv = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 240px;
	background: ${(props) =>
		props.index === 0
			? 'rgb(255,140,140)'
			: props.index === 1
			? 'rgb(255,254,140)'
			: props.index === 2
			? 'rgb(140,255,157)'
			: props.index === 3
			? 'rgb(140,146,255)'
			: null};
	background: ${(props) =>
		props.index === 0
			? 'linear-gradient(149deg, rgba(255, 140, 140, 0.7959558823529411) 0%,rgba(255, 94, 94, 0.804359243697479) 31%,	rgba(255, 63, 63, 0.8015581232492998) 56%, rgba(242, 30, 30, 0.804359243697479) 100%)'
			: props.index === 1
			? 'linear-gradient(149deg, rgba(255,254,140,0.7959558823529411) 0%, rgba(255,253,94,0.804359243697479) 31%, rgba(255,250,63,0.8015581232492998) 56%, rgba(242,236,30,0.804359243697479) 100%)'
			: props.index === 2
			? 'linear-gradient(149deg, rgba(140,255,157,0.7959558823529411) 0%, rgba(94,255,104,0.804359243697479) 31%, rgba(63,255,88,0.8015581232492998) 56%, rgba(30,242,51,0.804359243697479) 100%)'
			: props.index === 3
			? 'linear-gradient(149deg, rgba(140,146,255,0.7959558823529411) 0%, rgba(94,100,255,0.804359243697479) 31%, rgba(63,67,255,0.8015581232492998) 56%, rgba(40,30,242,0.804359243697479) 100%)'
			: null};

	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	margin: 0 30px;
	height: 130px;
`;

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
		dispatch({
			type: actions.INIT_GAME,
			payload: {
				display: 'board',
				currentQuestion: versions[state.currentGame.version].content[0],
				currentAnswer: versions[state.currentGame.version].content[0].title,
				board: versions[state.currentGame.version].content,
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
			},
		});
	}, [dispatch, state.currentGame.version]);

	const {
		board,
		display,
		currentQuestion,
		score,
		timer,
		blocks,
	} = state.gameController;

	// const playSound = (file, type = 'sfx') => {
	// 	const player =
	// 		type === 'sfx'
	// 			? sfxPlayer.current.audioEl.current
	// 			: musicPlayer.current.audioEl.current;
	// 	player.src = file;
	// 	player.play().catch((err) => {
	// 		console.log(err);
	// 	});
	// };

	const stopSound = () => {
		sfxPlayer.current.audioEl.current.pause();
		musicPlayer.current.audioEl.current.pause();
		sfxPlayer.current.audioEl.current.load();
		musicPlayer.current.audioEl.current.load();
	};

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
		stopSound();
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
					stopSound();
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
