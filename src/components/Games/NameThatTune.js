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
	display: flex;
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

const PlayerContainer = styled.div`
	display: flex;
	border: 1px solid gold;
	border-radius: 1px;
	height: 20%;
	width: 25%;
	margin: 2% auto;
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
	border: 1px solid white;
	border-radius: 5px;
	margin: 2% auto;
	height: 10%;
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
			},
		});
	}, [dispatch, state.currentGame.version]);

	const { board, display, currentQuestion } = state.gameController;

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

	if (display === '') {
		return <div />;
	}

	return (
		<TuneHomeScreen>
			<TitleContainer>
				<H1>Sample Song Name</H1>
				<H2>Sample Artist</H2>
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
			{props.display === 'controlPanel' && (
				<Controls>
					<button>Test button</button>
					<button>Test button</button>
					<button>Test button</button>
				</Controls>
			)}
			<audio ref={localAudioPlayer} />
			<audio ref={localAudioPlayer2} />
		</TuneHomeScreen>
	);
}
