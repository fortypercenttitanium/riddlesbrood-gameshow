import React, { useContext, useEffect, useRef } from 'react';
import {
	TuneHomeScreen,
	TitleContainer,
	Title,
	Artist,
	ScoreH1,
	ScoreH2,
	H3,
	PlayerContainer,
	AudioImg,
	Controls,
	Button,
	ScoreBoardDiv,
	ScoreCardDiv,
} from './gameComponentStyles/tuneStyles';
import {
	initGame,
	StoreContextGB,
	StoreContextCP,
	actions,
	ReactAudioPlayer,
} from '../helpers/tune/imports';

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
		if (!state.gameController.gameStarted) {
			dispatch({
				type: actions.INIT_GAME,
				payload: initGame(state, 'nameThatTune'),
			});
		}
	}, [dispatch, state]);

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
