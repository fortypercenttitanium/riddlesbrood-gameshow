import React, { useContext, useEffect, useRef } from 'react';
import {
	JeopardyContainer,
	Modal,
	StyledSpan,
	Board,
	CellContainer,
	CatCell,
	QCell,
} from './gameComponentStyles/jeopardyStyles';
import initGame from '../helpers/jeopardy/initGame';
import playSound from '../helpers/shared/audioHelpers';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../../Gameboard';
import { actions } from '../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

export default function Jeopardy({ window }) {
	let StoreContext;
	if (window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch } = useContext(StoreContext);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	// initialize game
	useEffect(() => {
		if (!state.gameController.gameStarted)
			dispatch({ type: actions.INIT_GAME, payload: initGame(state) });
	}, [dispatch, state]);

	// time up
	useEffect(() => {
		if (state.gameController.timer.time === 0) {
			playSound('media/soundfx/jeopardytimeup.mp3', 'sfx', {
				sfxPlayer,
				musicPlayer,
			});
			dispatch({ type: actions.KILL_TIMER });
			dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'answer' });
		}
	}, [state.gameController.timer.time, dispatch]);

	// controller for game display windows, question, answer, board, daily double
	const changeGameDisplay = (display) => {
		dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
	};

	const clickHandlerBoard = (question, categoryIndex, questionIndex) => {
		if (!question.completed) {
			const board = [...state.gameController.board];
			board[categoryIndex].questions[questionIndex].completed = true;
			dispatch({ type: actions.SET_QUESTION, payload: question });
			dispatch({ type: actions.SET_ANSWER, payload: question.answer });
			dispatch({ type: actions.SET_BOARD, payload: board });
			changeGameDisplay(question.dailyDouble ? 'daily-double' : 'question');
			if (question.dailyDouble) {
				playSound('media/soundfx/dailydoublesound.mp3', 'sfx', {
					sfxPlayer,
					musicPlayer,
				});
			} else if (question.type === 'video') {
				dispatch({
					type: actions.PLAY_VIDEO,
					payload: question.question,
				});
			} else {
				dispatch({ type: actions.SET_TIMER, payload: 13 });
				dispatch({ type: actions.RUN_TIMER });
				playSound('media/soundfx/open.wav', 'sfx', { sfxPlayer, musicPlayer });
			}
		}
	};

	const clickHandlerModal = () => {
		if (state.gameController.display === 'daily-double') {
			changeGameDisplay('question');
			if (state.gameController.currentQuestion.type === 'video') {
				dispatch({
					type: actions.PLAY_VIDEO,
					payload: state.gameController.currentQuestion.question,
				});
			} else {
				playSound('media/soundfx/open.wav', 'sfx', { sfxPlayer, musicPlayer });
				dispatch({ type: actions.SET_TIMER, payload: 13 });
				dispatch({ type: actions.RUN_TIMER });
			}
		} else if (state.gameController.display === 'question') {
			dispatch({ type: actions.KILL_TIMER });
			changeGameDisplay('answer');
		} else {
			changeGameDisplay('board');
		}
	};

	return (
		<JeopardyContainer>
			<Modal display={state.gameController.display} onClick={clickHandlerModal}>
				{state.gameController.display === 'daily-double' && (
					<div
						style={{
							height: '100%',
							width: '100%',
						}}
					>
						<img src='media/images/dailydouble.png' width='100%' alt='' />
					</div>
				)}
				<StyledSpan questionType={state.gameController.currentQuestion.type}>
					{state.gameController.display === 'question' &&
					state.gameController.currentQuestion.type === 'text'
						? state.gameController.currentQuestion.question
						: state.gameController.display === 'answer'
						? state.gameController.currentQuestion.answer
						: ''}
				</StyledSpan>
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
											clickHandlerBoard(question, index, qIndex);
										}}
									>
										<StyledSpan
											style={{
												display: question.completed ? 'none' : 'inline',
											}}
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
	);
}
