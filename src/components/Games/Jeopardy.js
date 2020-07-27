import React, { Component } from 'react';
import styled from 'styled-components';
import { jeopardy as versions } from './versions/gameVersions';
import VideoPlayer from '../VideoPlayer';

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

export class Jeopardy extends Component {
	state = {
		// set display to 'board', 'question', or 'answer'
		display: 'board',
		currentQuestion: {
			value: null,
			type: 'text',
			question: '',
			answer: '',
			completed: false,
			dailyDouble: false,
		},
		board: [],
	};

	componentDidMount() {
		localStorage.setItem(
			'board',
			JSON.stringify(versions[this.props.version].content)
		);
		localStorage.setItem(
			'currentQuestion',
			JSON.stringify(this.state.currentQuestion)
		);
		localStorage.setItem('display', 'board');
		this.props.setScoreType('player', 3);
		this.localStorageUpdated();
		window.addEventListener('storage', this.localStorageUpdated);
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.localStorageUpdated);
	}

	componentDidUpdate() {
		if (this.props.timer === 0) {
			this.props.killTimer();
			this.props.playSound('sfx', 'soundfx/jeopardytimeup.mp3');
			localStorage.setItem('display', 'answer');
		}
	}

	localStorageUpdated = () => {
		this.setState({
			display: localStorage.getItem('display'),
			currentQuestion: JSON.parse(localStorage.getItem('currentQuestion')),
			board: JSON.parse(localStorage.getItem('board')),
		});
	};

	clickHandlerBoard = (question, categoryIndex, questionIndex) => {
		if (!question.completed) {
			if (!question.dailyDouble) {
				this.props.setAnswer(question.answer);
				this.props.setTimer(3);
				this.props.runTimer();
			} else {
				this.props.playSound('sfx', 'soundfx/dailydoublesound.mp3');
			}
			const board = [...this.state.board];
			let completedQuestionCategory = board[categoryIndex];
			completedQuestionCategory.questions[questionIndex].completed = true;
			board[categoryIndex] = completedQuestionCategory;
			localStorage.setItem('currentQuestion', JSON.stringify(question));
			localStorage.setItem(
				'display',
				question.dailyDouble ? 'daily-double' : 'question'
			);
			localStorage.setItem('board', JSON.stringify(board));
			this.localStorageUpdated();
		}
	};

	clickHandlerModal = () => {
		if (this.state.display === 'daily-double') {
			this.props.setAnswer(this.state.currentQuestion.answer);
			this.props.setTimer(13);
			this.props.runTimer();
			localStorage.setItem('display', 'question');
			this.localStorageUpdated();
		} else if (this.state.display === 'question') {
			this.props.killTimer();
			localStorage.setItem('display', 'answer');
			this.localStorageUpdated();
		} else {
			localStorage.setItem('display', 'board');
			this.localStorageUpdated();
		}
	};

	render() {
		return (
			<JeopardyContainer>
				<Modal display={this.state.display} onClick={this.clickHandlerModal}>
					{this.state.display === 'daily-double' && (
						<div
							style={{
								height: '100%',
								width: '100%',
							}}
						>
							<img src='images/dailydouble.png' width='100%' alt='' />
						</div>
					)}
					<StyledSpan questionType={this.state.currentQuestion.type}>
						{this.state.display === 'question' &&
						this.state.currentQuestion.type === 'text'
							? this.state.currentQuestion.question
							: this.state.display === 'answer'
							? this.state.currentQuestion.answer
							: ''}
					</StyledSpan>
					{this.state.currentQuestion.type === 'video' &&
					this.state.display === 'question' ? (
						<VideoPlayer
							file={'/jeopardy/' + this.state.currentQuestion.question}
						/>
					) : null}
				</Modal>
				<Board>
					{this.state.board.map((block, index) => {
						return (
							<CellContainer key={`category${index}`}>
								<CatCell>
									<StyledSpan>{block.category}</StyledSpan>
								</CatCell>
								<QCell
									onClick={() => {
										this.clickHandlerBoard(block.questions[0], index, 0);
									}}
								>
									<StyledSpan
										style={{
											display: block.questions[0].completed ? 'none' : 'inline',
										}}
									>{`$${block.questions[0].value}`}</StyledSpan>
								</QCell>
								<QCell
									onClick={() => {
										this.clickHandlerBoard(block.questions[1], index, 1);
									}}
								>
									<StyledSpan
										style={{
											display: block.questions[1].completed ? 'none' : 'inline',
										}}
									>{`$${block.questions[1].value}`}</StyledSpan>
								</QCell>
								<QCell
									onClick={() => {
										this.clickHandlerBoard(block.questions[2], index, 2);
									}}
								>
									<StyledSpan
										style={{
											display: block.questions[2].completed ? 'none' : 'inline',
										}}
									>{`$${block.questions[2].value}`}</StyledSpan>
								</QCell>
								<QCell
									onClick={() => {
										this.clickHandlerBoard(block.questions[3], index, 3);
									}}
								>
									<StyledSpan
										style={{
											display: block.questions[3].completed ? 'none' : 'inline',
										}}
									>{`$${block.questions[3].value}`}</StyledSpan>
								</QCell>
								<QCell
									onClick={() => {
										this.clickHandlerBoard(block.questions[4], index, 4);
									}}
								>
									<StyledSpan
										style={{
											display: block.questions[4].completed ? 'none' : 'inline',
										}}
									>{`$${block.questions[4].value}`}</StyledSpan>
								</QCell>
							</CellContainer>
						);
					})}
				</Board>
			</JeopardyContainer>
		);
	}
}

export default Jeopardy;
