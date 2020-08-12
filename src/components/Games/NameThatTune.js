import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { nameThatTune as versions } from './versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../App';
import { StoreContext as StoreContextGB } from '../Gameboard';
import { actions } from '../../actions';

const TuneHomeScreen = styled.div`
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
	display: ${(props) => (props.show ? 'flex' : 'none')};
	height: 40%;
	width: 75%;
	flex-direction: column;
	margin: 2% auto;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 3rem;
`;

const H2 = styled.h2`
	font-size: 2rem;
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
	padding: 2rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const PlayerContainer = styled.div`
	display: flex;
	border: 1px solid gold;
	border-radius: 1px;
	height: 20%;
	width: 25%;
	margin: auto;
	padding: 2%;
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
	margin: 2% auto;
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

export default function FamilyFeud(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let localAudioPlayer = useRef();
	let localAudioPlayer2 = useRef();
	//  use if you need 2 players
	// const setLocalAudioPlayer = () => {
	// 	const player = localAudioPlayer.current.paused
	// 		? localAudioPlayer.current
	// 		: localAudioPlayer2.current.paused
	// 		? localAudioPlayer2.current
	// 		: localAudioPlayer.current;
	// 	return player;
	// };

	useEffect(() => {
		dispatch({
			type: actions.INIT_GAME,
			payload: {
				display: 'board',
				currentQuestion: versions[state.currentGame.version].content[0],
				currentAnswer: `${
					versions[state.currentGame.version].content[0].artist
				} - ${versions[state.currentGame.version].content[0].title}`,
				board: versions[state.currentGame.version].content,
				timer: {
					time: null,
					running: false,
					tickSound: '',
				},
				score: {
					type: 'players',
					scoreBoard: [0, 0, 0, 0],
				},
				answerRevealed: false,
			},
		});
	}, [dispatch, state.currentGame.version]);

	const { board, display, currentQuestion, score } = state.gameController;

	const getVolume = (type) => {
		return type === 'sfx'
			? (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
			: (state.audio.volume.master / 100) * (state.audio.volume.music / 100);
	};

	const playPauseHandler = () => {
		const player = localAudioPlayer.current;
		const currentQuestionCopy = currentQuestion;
		if (!currentQuestion.isPlaying && player.currentTime < 1) {
			currentQuestionCopy.isPlaying = true;
			dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
			player.src = `soundfx/namethattune/${currentQuestion.file}`;
			player.volume = getVolume('music');
			player.play().catch((err) => console.log(err));
		} else if (currentQuestion.isPlaying) {
			player.pause();
			currentQuestionCopy.isPlaying = false;
			dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
		} else {
			currentQuestionCopy.isPlaying = true;
			dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
			player.play();
		}
	};

	const rewindHandler = () => {
		const player = localAudioPlayer.current;
		const currentQuestionCopy = currentQuestion;
		currentQuestionCopy.isPlaying = false;
		dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
		player.load();
	};

	const toggleReveal = (setting = !state.gameController.answerRevealed) => {
		dispatch({ type: actions.SET_ANSWER_REVEALED, payload: true });
	};

	const nextSong = () => {
		toggleReveal(false);
	};

	if (display === '') {
		return <div />;
	}

	return (
		<TuneHomeScreen>
			<TitleContainer
				show={Boolean(
					state.gameController.answerRevealed || props.window === 'controlPanel'
				)}
			>
				<H1>{currentQuestion.title}</H1>
				<H2>{currentQuestion.artist}</H2>
			</TitleContainer>
			<PlayerContainer>
				<AudioImg
					onClick={rewindHandler}
					src='images/rewind-button.png'
					alt=''
				/>
				<AudioImg
					src={
						currentQuestion.isPlaying
							? 'images/pause-button.png'
							: 'images/play-button.png'
					}
					alt=''
					onClick={playPauseHandler}
				/>
			</PlayerContainer>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={toggleReveal}>
						<H3>
							{state.gameController.answerRevealed ? 'Unreveal' : 'Reveal'}
						</H3>
					</Button>
					<Button onClick={nextSong}>
						<H3>Next song</H3>
					</Button>
				</Controls>
			)}
			{props.window === 'gameboard' && (
				<ScoreBoardDiv>
					{score.scoreBoard.map((scoreNum, scoreIndex) => {
						return (
							<ScoreCardDiv key={scoreIndex} index={scoreIndex}>
								<ScoreH2>Player {scoreIndex + 1}</ScoreH2>
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
			<audio ref={localAudioPlayer} />
			<audio ref={localAudioPlayer2} />
		</TuneHomeScreen>
	);
}
