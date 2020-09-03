import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { esp as versions } from '../versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../../App';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../actions';
import ReactAudioPlayer from 'react-audio-player';
const { ipcRenderer } = window.require('electron');

const ESPHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: rgb(25, 32, 97);
	background: radial-gradient(
		circle,
		rgba(25, 32, 97, 1) 0%,
		rgba(24, 33, 108, 1) 31%,
		rgba(13, 16, 89, 1) 56%,
		rgba(0, 7, 71, 1) 100%
	);
	color: #ddd;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

const TitleContainer = styled.div`
	display: block;
	height: 10%;
	width: 85%;
	margin: auto;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 3rem;
`;

const Title = styled(H1)`
	display: block;
	font-size: ${(props) => props.window === 'controlPanel' && '2.4rem'};
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
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
	margin: auto;
	height: 130px;
`;

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
		if (props.window === 'controlPanel') {
			ipcRenderer.send('SCORE_TYPE_QUERY');
			ipcRenderer.on('SCORE_TYPE_RESPONSE', (e, res) => {
				let scoreSet;
				if (res.response === 0) {
					scoreSet = {
						scoreBoard: [0, 0],
						type: 'team',
					};
				} else if (res.response === 1) {
					scoreSet = {
						scoreBoard: [0, 0, 0, 0],
						type: 'player',
					};
				} else {
					throw new Error((err) => console.error(err));
				}
				dispatch({ type: actions.SET_SCORE, payload: scoreSet });
			});
			return () => ipcRenderer.removeAllListeners('SCORE_TYPE_RESPONSE');
		}
	}, [props.window, dispatch]);

	useEffect(() => {
		dispatch({
			type: actions.INIT_GAME,
			payload: {
				display: 'board',
				currentQuestion: versions[state.currentGame.version].content[0],
				currentAnswer: '',
				board: versions[state.currentGame.version].content,
				timer: {
					time: null,
					running: false,
					tickSound: '',
				},
				score: {
					type: 'team',
					scoreBoard: [0, 0],
				},
			},
		});
	}, [dispatch, state.currentGame.version]);

	const { board, display, currentQuestion, score } = state.gameController;

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

	// const stopSound = () => {
	// 	sfxPlayer.current.audioEl.current.pause();
	// 	musicPlayer.current.audioEl.current.pause();
	// 	sfxPlayer.current.audioEl.current.load();
	// 	musicPlayer.current.audioEl.current.load();
	// };

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
