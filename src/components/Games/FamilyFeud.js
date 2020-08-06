import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { familyfeud as versions } from './versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../App';
import { StoreContext as StoreContextGB } from '../Gameboard';
import { actions } from '../../actions';

const FamilyFeudHomeScreen = styled.div`
	display: flex;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: auto auto 0;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
`;

const H2 = styled.h2`
	margin: auto;
	padding: 1rem;
	font-size: 1.5rem;
`;

const Span = styled.span`
	margin: 0 auto;
	font-size: 1rem;
`;

const TopContainer = styled.div`
	display: flex;
	width: 100%;
`;

const PromptContainer = styled.div`
	display: flex;
	flex: 2;
	text-align: center;
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
			},
		});
	}, [dispatch, state.currentGame.version]);

	useEffect(() => {
		console.log(state.gameController);
	});

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
		revealAnswer(answerIndex);
	};

	const incorrectHandler = () => {};

	// const stopSoundLocal = () => {
	// 	const player = localAudioPlayer.current.paused
	// 		? localAudioPlayer2.current
	// 		: localAudioPlayer.current;
	// 	player.pause();
	// 	player.load();
	// };

	return (
		<FamilyFeudHomeScreen>
			<TopContainer>
				<ScoreContainer team={1}>
					<H2>Team 1 Score</H2>
					<H2>{state.gameController.score.scoreBoard[0]}</H2>
				</ScoreContainer>
				<PromptContainer>
					<Span>{state.gameController.board.prompt}</Span>
				</PromptContainer>
				<ScoreContainer team={2}>
					<H2>Team 2 Score</H2>
					<H2>{state.gameController.score.scoreBoard[1]}</H2>
				</ScoreContainer>
			</TopContainer>

			<audio ref={localAudioPlayer} />
			<audio ref={localAudioPlayer2} />
		</FamilyFeudHomeScreen>
	);
}
