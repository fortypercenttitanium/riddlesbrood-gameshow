import React, { useContext, useEffect, useRef } from 'react';
import {
	JeopardyContainer,
	Modal,
	StyledSpan,
	Board,
	CellContainer,
	CatCell,
	QCell,
	DailyDiv,
	DailyImg,
	DecorContainer,
} from './gameComponentStyles/jeopardyStyles';
import {
	timeUpSound,
	dailyDoubleImage,
	initGame,
	playSound,
	StoreContextCP,
	StoreContextGB,
	actions,
	importAll,
	ReactAudioPlayer,
	modalClick,
	openQuestion,
	ScoreOverlay,
	ScoreComponent,
} from '../helpers/jeopardy/imports';

const videos = importAll(
	require.context('../../../assets/videos/jeopardy', false, /\.mp4$/)
);

export default function Jeopardy({ windowInstance }) {
	let StoreContext;
	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	// initialize game
	useEffect(() => {
		async function initialize() {
			const newBoard = await initGame(state, 'jeopardy', 'board');
			newBoard.board.forEach((category) => {
				category.questions = category.questions.map((question) => {
					if (question.type !== 'video') {
						return question;
					} else {
						const filePath =
							question.question.slice(0, 6) === 'app://' ||
							Object.values(videos).includes(question.question)
								? question.question
								: videos[question.question];
						question.question = filePath;
						return question;
					}
				});
			});
			dispatch({ type: actions.INIT_GAME, payload: newBoard });
		}
		if (!state.gameController.gameStarted) {
			initialize();
		}
	}, [dispatch, state]);

	// time up
	useEffect(() => {
		if (state.gameController.timer.time === 0) {
			playSound(timeUpSound, 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
			dispatch({ type: actions.KILL_TIMER });
			dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'answer' });
		}
	}, [state.gameController.timer.time, dispatch]);

	const handleClickBoard = (question, categoryIndex, questionIndex) => {
		openQuestion(question, categoryIndex, questionIndex, {
			state,
			dispatch,
			actions,
			sfxPlayer,
			musicPlayer,
		});
	};

	const handleClickModal = () => {
		modalClick({ state, dispatch, sfxPlayer, musicPlayer });
	};

	return state.gameController.gameStarted ? (
		<JeopardyContainer>
			<ScoreOverlay
				ScoreComponent={ScoreComponent}
				position={'top'}
				score={state.gameController.score}
			/>
			<DecorContainer />
			<Modal display={state.gameController.display} onClick={handleClickModal}>
				{state.gameController.display === 'daily-double' && (
					<DailyDiv>
						<DailyImg src={dailyDoubleImage} alt='' />
					</DailyDiv>
				)}
				<h2 className='question-text'>
					{state.gameController.display === 'question' &&
					state.gameController.currentQuestion.type === 'text'
						? state.gameController.currentQuestion.question
						: state.gameController.display === 'answer'
						? state.gameController.currentQuestion.answer
						: ''}
				</h2>
			</Modal>
			<Board>
				{state.gameController.board.map((block, index) => {
					return (
						<CellContainer key={`category${index}`}>
							<CatCell>
								<StyledSpan>{block.category}</StyledSpan>
							</CatCell>
							{block.questions.map((question, qIndex) => {
								return (
									<QCell
										key={qIndex}
										onClick={() => {
											handleClickBoard(question, index, qIndex);
										}}
									>
										<StyledSpan
											display={question.completed ? 'none' : 'inline'}
										>{`$${question.value}`}</StyledSpan>
									</QCell>
								);
							})}
						</CellContainer>
					);
				})}
			</Board>
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
		</JeopardyContainer>
	) : (
		<div />
	);
}
