import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { jeopardy as versions } from './versions/gameVersions';
import { StoreContext as StoreContextCP } from '../../App';
import { StoreContext as StoreContextGB } from '../Gameboard';
import { actions } from '../../actions';

const JeopardyContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	background: lightgrey;
	position: relative;
`;

const Board = styled.div`
	margin: auto;
	height: 80%;
	width: 80%;
	display: grid;
	grid-auto-flow: column;
	grid-template: 100% / repeat(5, 1fr);
	grid-gap: 2px;
	border: 1px solid black;
`;

const Modal = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	font-family: impact;
	color: #ddd;
	background: linear-gradient(to top left, #000088, #0000ff);
	font-size: 5rem;
	text-align: center;
	cursor: pointer;
	display: ${(props) => (props.display === 'board' ? 'none' : 'flex')};
`;

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const CatCell = styled.div`
	text-align: center;
	display: flex;
	flex: 1;
	cursor: pointer;
	font-size: 2rem;
	font-family: impact;
	color: #eee;
	background: linear-gradient(to top left, #000088, #0000ff);
	border: 3px solid #000;
`;

const QCell = styled(CatCell)`
	color: #ccc;
	&:hover {
		color: #fff;
	}
`;

const StyledSpan = styled.span`
	margin: auto;
`;

export default function Jeopardy(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state, dispatch, playSound } = useContext(StoreContext);

	const initGame = {
		display: 'board',
		currentQuestion: {
			value: null,
			type: 'text',
			question: '',
			answer: '',
			completed: false,
			dailyDouble: false,
		},
		board: versions[state.currentGame.version].content,
		currentAnswer: '',
		gameTimeline: 'board',
		timer: {
			time: null,
			running: false,
			tickSound: false,
		},
		score: {
			type: 'player',
			scoreBoard: [0, 0, 0],
		},
	};

	useEffect(() => {
		dispatch({ type: actions.INIT_GAME, payload: initGame });
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (state.gameController.timer.time === 0) {
			playSound('sfx', 'soundfx/jeopardytimeup.mp3');
			dispatch({ type: actions.KILL_TIMER });
			dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'answer' });
		}
	}, [state.gameController.timer.time, playSound, dispatch]);

	const changeGameDisplay = (display) => {
		dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
	};

	const clickHandlerBoard = (question, categoryIndex, questionIndex) => {
		if (!question.completed) {
			if (!question.dailyDouble) {
				dispatch({ type: actions.SET_ANSWER, payload: question.answer });
				dispatch({ type: actions.SET_TIMER, payload: 13 });
				dispatch({ type: actions.RUN_TIMER });
			} else {
				playSound('sfx', 'soundfx/dailydoublesound.mp3');
			}
			const board = [...state.gameController.board];
			board[categoryIndex].questions[questionIndex].completed = true;
			dispatch({ type: actions.SET_QUESTION, payload: question });
			dispatch({ type: actions.SET_BOARD, payload: board });
			changeGameDisplay(question.dailyDouble ? 'daily-double' : 'question');
			if (question.type === 'video' && !question.dailyDouble) {
				dispatch({
					type: actions.PLAY_VIDEO,
					payload: `/jeopardy/${question.question}`,
				});
			}
		}
	};

	const clickHandlerModal = () => {
		if (state.gameController.display === 'daily-double') {
			dispatch({
				type: actions.SET_ANSWER,
				payload: state.gameController.currentQuestion.answer,
			});
			dispatch({ type: actions.SET_TIMER, payload: 13 });
			dispatch({ type: actions.RUN_TIMER });
			changeGameDisplay('question');
			if (state.gameController.currentQuestion.type === 'video') {
				dispatch({
					type: actions.PLAY_VIDEO,
					payload: `/jeopardy/${state.gameController.currentQuestion.question}`,
				});
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
						<img src='images/dailydouble.png' width='100%' alt='' />
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
		</JeopardyContainer>
	);
}
