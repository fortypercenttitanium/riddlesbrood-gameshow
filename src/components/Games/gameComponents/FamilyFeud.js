import React, { useContext, useEffect, useRef } from 'react';
import {
	FamilyFeudHomeScreen,
	GameBoard,
	TopContainer,
	ScoreContainer,
	PromptContainer,
	XContainer,
	WrongImg,
	H2,
	FlippableH3,
	Span,
	AnswerGrid,
	AnswerContainer,
	NumberButton,
	XModal,
} from './gameComponentStyles/familyFeudStyles';
import playSound from '../helpers/shared/audioHelpers';
import initGame from '../helpers/shared/initGame';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

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
		if (!state.gameController.gameStarted) {
			dispatch({
				type: actions.INIT_GAME,
				payload: initGame(state),
			});
		}
	}, [dispatch, state]);

	const { board, display, wrongTracker, wrongModal } = state.gameController;

	const revealAnswer = (answerIndex) => {
		const board = state.gameController.board;
		board.answers[answerIndex].revealed = true;
		dispatch({ type: actions.SET_BOARD, payload: board });
	};

	const correctHandler = (answerIndex) => {
		if (!board.answers[answerIndex].revealed) {
			playSound('media/soundfx/ffding.mp3', 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
			revealAnswer(answerIndex);
		}
	};

	const incorrectHandler = (team, isWrong, index) => {
		const tracker = JSON.parse(JSON.stringify(wrongTracker));
		tracker[`team${team}`][index] = !isWrong;
		if (!isWrong) {
			playSound('media/soundfx/ffbuzzer.wav', 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
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
