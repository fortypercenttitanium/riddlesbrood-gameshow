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
import {
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	correctHandler,
	incorrectHandler,
} from '../helpers/familyFeud/imports';
import blueWrongIcon from '../../../assets/images/game_images/family_feud/ff-wrong-blue.png';
import redWrongIcon from '../../../assets/images/game_images/family_feud/ff-wrong-red.png';
import greyWrongIcon from '../../../assets/images/game_images/family_feud/ff-wrong-grey.png';

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
			const initState = {
				...initGame(state, 'familyFeud', 'board'),
				score: { type: 'team', scoreBoard: [0, 0] },
				wrongTracker: {
					team1: [false, false, false],
					team2: [false, false, false],
				},
				wrongModal: {
					display: false,
					team: '',
					array: [],
				},
			};
			dispatch({
				type: actions.INIT_GAME,
				payload: initState,
			});
		}
	}, [dispatch, state]);

	const { board, display, wrongTracker, wrongModal } = state.gameController;

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
											? redWrongIcon
											: wrongModal.team === 2
											? blueWrongIcon
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
												? redWrongIcon
												: props.window === 'controlPanel'
												? greyWrongIcon
												: null
										}
										window={props.window}
										onClick={() => {
											incorrectHandler(1, isWrong, index, {
												wrongTracker,
												sfxPlayer,
												musicPlayer,
												dispatch,
												actions,
											});
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
												? blueWrongIcon
												: props.window === 'controlPanel'
												? greyWrongIcon
												: null
										}
										window={props.window}
										onClick={() => {
											incorrectHandler(2, isWrong, index, {
												wrongTracker,
												sfxPlayer,
												musicPlayer,
												dispatch,
												actions,
											});
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
										correctHandler(wordIndex, {
											board,
											sfxPlayer,
											musicPlayer,
											state,
											dispatch,
											actions,
										});
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
