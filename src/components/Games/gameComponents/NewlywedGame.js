import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { newlywed as versions } from '../versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../../App';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../actions';
import ReactAudioPlayer from 'react-audio-player';

const NewlywedHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: rgb(97, 25, 30);
	background: radial-gradient(
		circle,
		rgba(97, 25, 30, 1) 0%,
		rgba(108, 24, 24, 1) 31%,
		rgba(89, 13, 19, 1) 56%,
		rgba(71, 0, 0, 1) 100%
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

const H2 = styled.h2`
	font-size: 2rem;
`;

const ScoreContainer = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	height: 180px;
	transform: rotate(-45deg);
	z-index: 1;
`;

const ScoreH1 = styled(H1)`
	margin: auto;
	color: #222;
	text-shadow: 3px 1px 2px rgba(0, 0, 0, 0.4);
`;

const ScoreH2 = styled(ScoreH1)`
	margin: 5px auto;
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
	height: 35%;
`;

const ScoreCardDiv = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 0;
	position: relative;
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
	text-align: center;
	margin: auto;
	height: 180px;
	width: 180px;
	transform: rotate(45deg);
	&:before,
	&:after {
		position: absolute;
		width: 180px;
		height: 180px;
		content: '';
		border-radius: 50%;
		background-color: ${(props) =>
			props.index === 0
				? 'rgb(255,140,140)'
				: props.index === 1
				? 'rgb(255,254,140)'
				: props.index === 2
				? 'rgb(140,255,157)'
				: props.index === 3
				? 'rgb(140,146,255)'
				: null};
	}
	&:before {
		bottom: 0px;
		left: -90px;
	}
	&:after {
		top: -90px;
		right: 0px;
	}
`;

export default function NewlywedGame(props) {
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
				currentAnswer: '',
				board: versions[state.currentGame.version].content,
				timer: {
					time: null,
					running: false,
					tickSound: '',
				},
				score: {
					type: 'team',
					scoreBoard: [0, 0, 0, 0],
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

	const nextQuestion = () => {
		const nextQuestionIndex = board.indexOf(currentQuestion) + 1;
		if (nextQuestionIndex <= board.length - 1) {
			dispatch({
				type: actions.SET_QUESTION,
				payload: board[nextQuestionIndex],
			});
		}
	};
	const previousQuestion = () => {
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
		<NewlywedHomeScreen>
			<TitleContainer>
				<Title window={props.window}>{currentQuestion}</Title>
			</TitleContainer>
			{props.window === 'controlPanel' && (
				<Controls>
					<Button onClick={previousQuestion}>
						<H3>Previous question</H3>
					</Button>
					<Button onClick={nextQuestion}>
						<H3>Next question</H3>
					</Button>
				</Controls>
			)}
			{props.window === 'gameboard' && (
				<ScoreBoardDiv>
					{score.scoreBoard.map((scoreNum, scoreIndex) => {
						return (
							<ScoreCardDiv key={scoreIndex} index={scoreIndex}>
								<ScoreContainer>
									<ScoreH2>Team {scoreIndex + 1}</ScoreH2>
									<ScoreH1>{scoreNum}</ScoreH1>
								</ScoreContainer>
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
		</NewlywedHomeScreen>
	);
}
