import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { nameThatTune as versions } from '../versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../actions';
import ReactAudioPlayer from 'react-audio-player';

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
	display: block;
	height: 30%;
	width: 85%;
	margin: 1% auto auto;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 3rem;
`;

const Title = styled(H1)`
	display: ${(props) => (props.show ? 'block' : 'none')};
	font-size: ${(props) => props.window === 'controlPanel' && '2.4rem'};
`;

const H2 = styled.h2`
	font-size: 2rem;
`;

const Artist = styled(H2)`
	display: ${(props) => (props.show ? 'block' : 'none')};
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

export default function NameThatTune(props) {
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
				currentAnswer: `${
					versions[state.currentGame.version].content[0].title
				} - ${versions[state.currentGame.version].content[0].artist}`,
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

	const playPauseHandler = () => {
		const player = musicPlayer.current.audioEl.current;
		const currentQuestionCopy = currentQuestion;
		if (!currentQuestion.isPlaying && player.currentTime < 1) {
			currentQuestionCopy.isPlaying = true;
			dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
			player.src = `media/soundfx/namethattune/${currentQuestion.file}`;
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
		const player = musicPlayer.current.audioEl.current;
		const currentQuestionCopy = currentQuestion;
		currentQuestionCopy.isPlaying = false;
		dispatch({ type: actions.SET_QUESTION, payload: currentQuestionCopy });
		player.load();
	};

	const toggleReveal = (setting = !state.gameController.answerRevealed) => {
		dispatch({ type: actions.SET_ANSWER_REVEALED, payload: setting });
	};

	const nextSong = () => {
		const player = musicPlayer.current.audioEl.current;
		const nextQuestionIndex = board.indexOf(currentQuestion) + 1;
		if (nextQuestionIndex <= board.length - 1) {
			player.load();
			toggleReveal(false);
			dispatch({
				type: actions.SET_QUESTION,
				payload: board[nextQuestionIndex],
			});
			dispatch({
				type: actions.SET_ANSWER,
				payload: `${board[nextQuestionIndex].title} - ${board[nextQuestionIndex].artist}`,
			});
		}
	};

	if (display === '') {
		return <div />;
	}

	return (
		<TuneHomeScreen>
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
				<Artist
					show={Boolean(
						state.gameController.answerRevealed ||
							props.window === 'controlPanel'
					)}
				>
					{currentQuestion.artist}
				</Artist>
			</TitleContainer>
			<PlayerContainer>
				<AudioImg
					onClick={rewindHandler}
					src='media/images/rewind-button.png'
					alt=''
				/>
				<AudioImg
					src={
						currentQuestion.isPlaying
							? 'media/images/pause-button.png'
							: 'media/images/play-button.png'
					}
					alt=''
					onClick={playPauseHandler}
				/>
			</PlayerContainer>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={() => toggleReveal()}>
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
		</TuneHomeScreen>
	);
}
