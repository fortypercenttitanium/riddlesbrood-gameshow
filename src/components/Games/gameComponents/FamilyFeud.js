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
	DivAutoMargin,
	WrongModalImg,
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

export default function FamilyFeud({ window }) {
	let StoreContext;
	if (window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	useEffect(() => {
		async function initialize() {
			const initState = {
				...(await initGame(state, 'familyFeud', 'board')),
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
		if (!state.gameController.gameStarted) {
			initialize();
		}
	}, [dispatch, state]);

	const { board, display, wrongTracker, wrongModal } = state.gameController;

	if (display === '') {
		return <div />;
	}

	return (
		<FamilyFeudHomeScreen>
			{wrongModal.display && (
				<XModal window={window}>
					{wrongModal.array.map((x, wrongModalIndex) => {
						return x === true ? (
							<DivAutoMargin key={wrongModalIndex}>
								<WrongModalImg
									width={'controlPanel' ? '85%' : '100%'}
									src={
										wrongModal.team === 1
											? redWrongIcon
											: wrongModal.team === 2
											? blueWrongIcon
											: null
									}
									alt=''
								/>
							</DivAutoMargin>
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
												: window === 'controlPanel'
												? greyWrongIcon
												: null
										}
										window={window}
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
						<Span window={window}>{board.prompt}</Span>
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
												: window === 'controlPanel'
												? greyWrongIcon
												: null
										}
										window={window}
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
					{window === 'controlPanel' &&
						board.answers.map((word, wordIndex) => {
							return (
								<AnswerContainer
									key={wordIndex}
									window={window}
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
									<FlippableH3 window={window} revealed={word.revealed}>
										{word.answer.toUpperCase()}
									</FlippableH3>
								</AnswerContainer>
							);
						})}
					{window === 'gameboard' &&
						board.answers.map((word, wordIndex) => {
							return (
								<AnswerContainer
									key={wordIndex}
									window={window}
									side={word.revealed ? 'back' : 'front'}
								>
									{word.revealed ? (
										<FlippableH3 window={window} revealed={word.revealed}>
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
