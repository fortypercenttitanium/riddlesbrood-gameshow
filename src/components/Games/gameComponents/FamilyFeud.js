import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { familyFeud as versions } from '../versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

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
	border-radius: 5%;
	width: 98%;
	height: 98%;
	margin: auto;
	background: url('media/images/backgrounds/ffbackground.svg') #0c4779;
	background-repeat: repeat;
	background-position: center center;
	box-shadow: 0 1px 24px 1px rgba(0, 0, 0, 0.48);
`;

const TopContainer = styled.div`
	display: flex;
	width: 97%;
	height: 40%;
	top: 0;
	left: 0;
	right: 0;
	margin: 2% auto 0;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100% - 60px);
	width: 25%;
	margin: auto;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
	box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);
	border-radius: 5%;
	padding: 20px;
	border: 2px solid white;
	text-align: center;
`;

const PromptContainer = styled.div`
	display: flex;
	width: 40%;
	height: calc(100% - 80px);
	margin: auto;
	text-align: center;
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
	height: 50%;
	width: 100%;
	margin: auto;
	cursor: pointer;
`;

const WrongImg = styled.img`
	height: 100%;
	margin: auto;
	border: 2px solid transparent;
	&:hover {
		border-color: red;
	}
`;

const H2 = styled.h2`
	margin: auto;
	padding: 0.2rem;
	font-size: 1.5rem;
`;

const FlippableH3 = styled.h3`
	margin: auto;
	font-size: ${(props) => (props.window === 'controlPanel' ? '2rem' : '3rem')};
	opacity: ${(props) => (props.revealed ? '1' : '0.4')};
	transform: ${(props) =>
		props.revealed ? 'rotateX(-180deg)' : 'rotateX(0deg)'};
`;

const Span = styled.span`
	margin: auto;
	padding: 3%;
	font-size: ${(props) =>
		props.window === 'controlPanel' ? '1.2rem' : '2.5rem'};
	line-height: ${(props) =>
		props.window === 'controlPanel' ? '2rem' : '3.6rem'};
	color: #003c7b;
`;

const AnswerGrid = styled.div`
	margin: auto;
	width: 90%;
	display: grid;
	grid-template-rows: ${(props) => props.rowTemplate};
	grid-template-columns: 1fr 1fr;
	grid-auto-flow: column;
`;

const AnswerContainer = styled.div`
	border: 2px solid #003c7b;
	height: ${(props) => (props.window === 'controlPanel' ? '3rem' : '4rem')};
	margin: 1%;
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
		> h3 {
			opacity: 1;
		}
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

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

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
					team1: [false, false, false],
					team2: [false, false, false],
				},
				wrongModal: {
					display: false,
					team: '',
					array: [],
				},
			},
		});
	}, [dispatch, state.currentGame.version]);

	const { board, display, wrongTracker, wrongModal } = state.gameController;

	const revealAnswer = (answerIndex) => {
		const board = state.gameController.board;
		board.answers[answerIndex].revealed = true;
		dispatch({ type: actions.SET_BOARD, payload: board });
	};

	const playSound = (file, type = 'sfx') => {
		const player =
			type === 'sfx'
				? sfxPlayer.current.audioEl.current
				: musicPlayer.current.audioEl.current;
		player.src = file;
		player.play().catch((err) => {
			console.log(err);
		});
	};

	const correctHandler = (answerIndex) => {
		if (!board.answers[answerIndex].revealed) {
			playSound('media/soundfx/ffding.mp3');
			revealAnswer(answerIndex);
		}
	};

	const incorrectHandler = (team, isWrong, index) => {
		const tracker = JSON.parse(JSON.stringify(wrongTracker));
		tracker[`team${team}`][index] = !isWrong;
		if (!isWrong) {
			playSound('media/soundfx/ffbuzzer.wav');
			dispatch({
				type: actions.SET_FAMILY_FEUD_XS,
				payload: { display: true, team: team, array: tracker[`team${team}`] },
			});
			setTimeout(() => {
				dispatch({
					type: actions.SET_FAMILY_FEUD_XS,
					payload: { display: false, team: '', array: [] },
				});
				dispatch({ type: actions.SET_WRONG_TRACKER, payload: tracker });
			}, 1500);
		} else {
			dispatch({ type: actions.SET_WRONG_TRACKER, payload: tracker });
		}
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
						return x === true ? (
							<div key={wrongModalIndex} style={{ margin: 'auto' }}>
								<img
									style={{
										width: props.window === 'controlPanel' ? '85%' : '100%',
									}}
									src={
										wrongModal.team === 1
											? 'media/images/ff-wrong-red.png'
											: wrongModal.team === 2
											? 'media/images/ff-wrong-blue.png'
											: null
									}
									alt=''
								/>
							</div>
						) : null;
					})}
				</XModal>
			)}
			<GameBoard>
				<TopContainer>
					<ScoreContainer team={1}>
						<H2>Team 1</H2>
						<XContainer>
							{wrongTracker.team1.map((isWrong, index) => {
								return (
									<WrongImg
										key={index}
										src={
											isWrong
												? 'media/images/ff-wrong-red.png'
												: props.window === 'controlPanel'
												? 'media/images/ff-wrong-grey.png'
												: null
										}
										window={props.window}
										onClick={() => {
											incorrectHandler(1, isWrong, index);
										}}
									/>
								);
							})}
						</XContainer>
					</ScoreContainer>
					<PromptContainer>
						<Span window={props.window}>{board.prompt}</Span>
					</PromptContainer>
					<ScoreContainer team={2}>
						<H2>Team 2</H2>
						<XContainer>
							{wrongTracker.team2.map((isWrong, index) => {
								return (
									<WrongImg
										key={index}
										src={
											isWrong
												? 'media/images/ff-wrong-blue.png'
												: props.window === 'controlPanel'
												? 'media/images/ff-wrong-grey.png'
												: null
										}
										window={props.window}
										onClick={() => {
											incorrectHandler(2, isWrong, index);
										}}
									/>
								);
							})}
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
									window={props.window}
									onClick={() => {
										correctHandler(wordIndex);
									}}
									side={word.revealed ? 'back' : 'front'}
								>
									<FlippableH3 window={props.window} revealed={word.revealed}>
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
									window={props.window}
									side={word.revealed ? 'back' : 'front'}
								>
									{word.revealed ? (
										<FlippableH3 window={props.window} revealed={word.revealed}>
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
		</FamilyFeudHomeScreen>
	);
}
