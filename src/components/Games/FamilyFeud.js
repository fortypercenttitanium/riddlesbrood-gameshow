import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { familyfeud as versions } from './versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../App';
import { StoreContext as StoreContextGB } from '../Gameboard';
import { actions } from '../../actions';

const FamilyFeudHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: #a7cfdf;
	background: linear-gradient(to bottom, #a7cfdf 0%, #23538a 100%);
	filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#a7cfdf', endColorstr='#23538a', GradientType=0);
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

const GameBoard = styled.div`
	position: relative;
	font-family: helvetica, sans-serif;
	color: white;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
	border: 5px solid #003c7b;
	text-align: center;
	border-radius: 50%;
	width: 90%;
	height: 90%;
	margin: 3%;
	background: url('images/backgrounds/ffbackground.svg') #0c4779;
	background-repeat: repeat;
	background-position: center center;
	box-shadow: 0 1px 24px 1px rgba(0, 0, 0, 0.48);
`;

const TopContainer = styled.div`
	display: flex;
	width: 100%;
	height: 40%;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100% - 40px);
	width: 25%;
	margin: auto;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
	box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);
	padding: 20px;
	border: 2px solid white;
	text-align: center;
`;

const PromptContainer = styled.div`
	display: flex;
	width: 50%;
	height: calc(100% - 40px);
	margin: auto;
	text-align: center;
	font-size: 30px;
	color: #003c7b;
	text-shadow: initial;
	text-align: center;
	border: 1px solid black;
	background: #deeeff;
	padding: 10px;
	box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);
`;

const XContainer = styled.div`
	display: flex;
	height: 40%;
	width: 100%;
	margin: auto;
	cursor: pointer;
	border: 2px solid transparent;
	&:hover {
		border-color: red;
	}
`;

const WrongImg = styled.img`
	height: 100%;
	margin: auto;
`;

const H2 = styled.h2`
	margin: auto;
	padding: 0.2rem;
	font-size: 1.5rem;
`;

const H1 = styled(H2)`
	font-size: 2rem;
	font-weight: bold;
`;
const FlippableH3 = styled.h3`
	margin: auto;
	opacity: ${(props) => (props.revealed ? '1' : '0.4')};
	transform: ${(props) =>
		props.revealed ? 'rotateX(-180deg)' : 'rotateX(0deg)'};
`;

const Span = styled.span`
	margin: auto;
	padding: 3%;
	font-size: ${(props) =>
		props.window === 'controlPanel' ? '1.5rem' : '2.5rem'};
	line-height: ${(props) =>
		props.window === 'controlPanel' ? '2.6rem' : '3.6rem'};
	color: #003c7b;
`;

const AnswerGrid = styled.div`
	margin: 5% auto;
	width: 90%;
	display: grid;
	grid-template-rows: ${(props) => props.rowTemplate};
	grid-template-columns: 1fr 1fr;
	grid-auto-flow: column;
`;

const AnswerContainer = styled.div`
	border: 2px solid #003c7b;
	height: ${(props) => (props.window === 'controlPanel' ? '2rem' : '3rem')};
	display: flex;
	cursor: pointer;
	transform-style: preserve-3d;
	background: linear-gradient(
		to bottom,
		#cedbe9 0%,
		#aac5de 17%,
		#6199c7 50%,
		#3a84c3 51%,
		#419ad6 59%,
		#4bb8f0 71%,
		#3a8bc2 84%,
		#26558b 100%
	);
	transform: ${(props) =>
		props.side === 'front'
			? 'perspective(200px) rotateX(0deg)'
			: 'perspective(200px) rotateX(180deg)'};
	transition: 0.5s;
	&:hover {
		background: rgba(130, 130, 130, 0.7);
	}
`;

const NumberButton = styled.span`
	background: linear-gradient(
		to bottom,
		#7db9e8 0%,
		#207cca 49%,
		#2989d8 50%,
		#1e5799 100%
	);
	border: 2px solid #003c7b;
	border-radius: 50%;
	margin: auto;
	line-height: 35px;
	height: 35px;
	width: 45px;
	font-size: 2rem;
`;

const XModal = styled.div`
	display: flex;
	position: absolute;
	width: ${(props) => (props.display === 'controlPanel' ? '95%' : '75%')};
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;
	margin: auto;
	z-index: 2;
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

	const setLocalAudioPlayer = () => {
		const player = localAudioPlayer.current.paused
			? localAudioPlayer.current
			: localAudioPlayer2.current.paused
			? localAudioPlayer2.current
			: localAudioPlayer.current;
		return player;
	};

	useEffect(() => {
		dispatch({
			type: actions.INIT_GAME,
			payload: {
				display: 'board',
				currentQuestion: {
					category: '',
					words: [],
					index: 0,
				},
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
				wrongTracker: {
					team1: 0,
					team2: 0,
				},
				wrongModal: {
					display: false,
					array: [],
				},
			},
		});
	}, [dispatch, state.currentGame.version]);

	const {
		board,
		score,
		display,
		wrongTracker,
		wrongModal,
	} = state.gameController;

	const revealAnswer = (answerIndex) => {
		const board = state.gameController.board;
		board.answers[answerIndex].revealed = true;
		dispatch({ type: actions.SET_BOARD, payload: board });
	};

	// const changeGameDisplay = (display) => {
	// 	dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
	// };

	const getVolume = (type) => {
		return type === 'sfx'
			? (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
			: (state.audio.volume.master / 100) * (state.audio.volume.music / 100);
	};

	const playSoundLocal = (type, file) => {
		const player = setLocalAudioPlayer();
		player.src = file;
		player.volume = getVolume(type);
		player.play().catch((err) => console.log(err));
	};

	const correctHandler = (answerIndex) => {
		if (!board.answers[answerIndex].revealed) {
			playSoundLocal('sfx', 'soundfx/ffding.mp3');
			revealAnswer(answerIndex);
		}
	};

	const incorrectHandler = (team) => {
		playSoundLocal('sfx', 'soundfx/ffbuzzer.wav');
		const tracker = state.gameController.wrongTracker;
		const arr = [];
		for (let n = 1; n <= tracker[team] + 1; n++) {
			arr.push(true);
		}
		dispatch({
			type: actions.SET_FAMILY_FEUD_XS,
			payload: { display: true, array: arr },
		});
		console.log(wrongTracker);
		setTimeout(() => {
			dispatch({
				type: actions.SET_FAMILY_FEUD_XS,
				payload: { display: false, array: [] },
			});
			tracker[team] = tracker[team] + 1;
			dispatch({ type: actions.SET_WRONG_TRACKER, payload: tracker });
		}, 1500);
	};

	// const stopSoundLocal = () => {
	// 	const player = localAudioPlayer.current.paused
	// 		? localAudioPlayer2.current
	// 		: localAudioPlayer.current;
	// 	player.pause();
	// 	player.load();
	// };

	if (display === '') {
		return <div />;
	}

	return (
		<FamilyFeudHomeScreen>
			{wrongModal.display && (
				<XModal window={props.window}>
					{wrongModal.array.map((x, wrongModalIndex) => {
						return (
							<div key={wrongModalIndex} style={{ margin: 'auto' }}>
								<img
									style={{
										width: props.window === 'controlPanel' ? '85%' : '100%',
									}}
									src='images/ffWrongActive.png'
									alt=''
								/>
							</div>
						);
					})}
				</XModal>
			)}
			<GameBoard>
				<TopContainer>
					<ScoreContainer team={1}>
						<H2>Team 1 Score</H2>
						<H1>{score.scoreBoard[0]}</H1>
						<XContainer
							onClick={() => {
								incorrectHandler('team1');
							}}
						>
							<WrongImg
								src={
									wrongTracker.team1 > 0
										? 'images/ffwrongActive.png'
										: 'images/ffwrongInactive.png'
								}
								window={props.window}
							/>
							<WrongImg
								src={
									wrongTracker.team1 > 1
										? 'images/ffwrongActive.png'
										: 'images/ffwrongInactive.png'
								}
								window={props.window}
							/>
							<WrongImg
								src={
									wrongTracker.team1 > 2
										? 'images/ffwrongActive.png'
										: 'images/ffwrongInactive.png'
								}
								window={props.window}
							/>
						</XContainer>
					</ScoreContainer>
					<PromptContainer>
						<Span window={props.window}>{board.prompt}</Span>
					</PromptContainer>
					<ScoreContainer team={2}>
						<H2>Team 2 Score</H2>
						<H1>{score.scoreBoard[1]}</H1>
						<XContainer
							onClick={() => {
								incorrectHandler('team2');
							}}
						>
							<WrongImg
								src={
									wrongTracker.team2 > 0
										? 'images/ffwrongActive.png'
										: 'images/ffwrongInactive.png'
								}
								window={props.window}
							/>
							<WrongImg
								src={
									wrongTracker.team2 > 1
										? 'images/ffwrongActive.png'
										: 'images/ffwrongInactive.png'
								}
								window={props.window}
							/>
							<WrongImg
								src={
									wrongTracker.team2 > 2
										? 'images/ffwrongActive.png'
										: 'images/ffwrongInactive.png'
								}
								window={props.window}
							/>
						</XContainer>
					</ScoreContainer>{' '}
				</TopContainer>
				<AnswerGrid
					rowTemplate={`repeat(${Math.round(board.answers.length / 2)}, 1fr)`}
				>
					{props.window === 'controlPanel' &&
						board.answers.map((word, wordIndex) => {
							return (
								<AnswerContainer
									key={wordIndex}
									onClick={() => {
										correctHandler(wordIndex);
									}}
									side={word.revealed ? 'back' : 'front'}
								>
									<FlippableH3 revealed={word.revealed}>
										{word.answer.toUpperCase()}
									</FlippableH3>
								</AnswerContainer>
							);
						})}
					{props.window === 'gameboard' &&
						board.answers.map((word, wordIndex) => {
							return (
								<AnswerContainer
									key={wordIndex}
									side={word.revealed ? 'back' : 'front'}
								>
									{word.revealed ? (
										<FlippableH3 revealed={word.revealed}>
											{word.answer.toUpperCase()}
										</FlippableH3>
									) : (
										<NumberButton>{wordIndex + 1}</NumberButton>
									)}
								</AnswerContainer>
							);
						})}
				</AnswerGrid>
			</GameBoard>

			<audio ref={localAudioPlayer} />
			<audio ref={localAudioPlayer2} />
		</FamilyFeudHomeScreen>
	);
}
