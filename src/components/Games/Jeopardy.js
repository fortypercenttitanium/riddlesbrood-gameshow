import React, { Component } from 'react';
import styled from 'styled-components';

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
	background: blue;
	color: white;
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
	border: 1px solid white;
	cursor: pointer;
`;

const QCell = styled(CatCell)`
	&:hover {
		background: white;
		transition: 0.5s;
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
		},
		board: [
			{
				category: 'Category One',
				questions: [
					{
						value: 100,
						type: 'text',
						question: 'Test Question 1',
						answer: 'Test Answer 1',
						completed: false,
					},
					{
						value: 200,
						type: 'text',
						question: 'Test Question 2',
						answer: 'Test Answer 2',
						completed: false,
					},
					{
						value: 300,
						type: 'text',
						question: 'Test Question 3',
						answer: 'Test Answer 3',
						completed: false,
					},
					{
						value: 400,
						type: 'text',
						question: 'Test Question 4',
						answer: 'Test Answer 4',
						completed: false,
					},
					{
						value: 500,
						type: 'text',
						question: 'Test Question 5',
						answer: 'Test Answer 5',
						completed: false,
					},
				],
			},
			{
				category: 'Category Two',
				questions: [
					{
						value: 100,
						type: 'text',
						question: 'Test Question 1',
						answer: 'Test Answer 1',
						completed: false,
					},
					{
						value: 200,
						type: 'text',
						question: 'Test Question 2',
						answer: 'Test Answer 2',
						completed: false,
					},
					{
						value: 300,
						type: 'text',
						question: 'Test Question 3',
						answer: 'Test Answer 3',
						completed: false,
					},
					{
						value: 400,
						type: 'text',
						question: 'Test Question 4',
						answer: 'Test Answer 4',
						completed: false,
					},
					{
						value: 500,
						type: 'text',
						question: 'Test Question 5',
						answer: 'Test Answer 5',
						completed: false,
					},
				],
			},
			{
				category: 'Category Three',
				questions: [
					{
						value: 100,
						type: 'text',
						question: 'Test Question 1',
						answer: 'Test Answer 1',
						completed: false,
					},
					{
						value: 200,
						type: 'text',
						question: 'Test Question 2',
						answer: 'Test Answer 2',
						completed: false,
					},
					{
						value: 300,
						type: 'text',
						question: 'Test Question 3',
						answer: 'Test Answer 3',
						completed: false,
					},
					{
						value: 400,
						type: 'text',
						question: 'Test Question 4',
						answer: 'Test Answer 4',
						completed: false,
					},
					{
						value: 500,
						type: 'text',
						question: 'Test Question 5',
						answer: 'Test Answer 5',
						completed: false,
					},
				],
			},
			{
				category: 'Category Four',
				questions: [
					{
						value: 100,
						type: 'text',
						question: 'Test Question 1',
						answer: 'Test Answer 1',
						completed: false,
					},
					{
						value: 200,
						type: 'text',
						question: 'Test Question 2',
						answer: 'Test Answer 2',
						completed: false,
					},
					{
						value: 300,
						type: 'text',
						question: 'Test Question 3',
						answer: 'Test Answer 3',
						completed: false,
					},
					{
						value: 400,
						type: 'text',
						question: 'Test Question 4',
						answer: 'Test Answer 4',
						completed: false,
					},
					{
						value: 500,
						type: 'text',
						question: 'Test Question 5',
						answer: 'Test Answer 5',
						completed: false,
					},
				],
			},
			{
				category: 'Category Five',
				questions: [
					{
						value: 100,
						type: 'text',
						question: 'Test Question 1',
						answer: 'Test Answer 1',
						completed: false,
					},
					{
						value: 200,
						type: 'text',
						question: 'Test Question 2',
						answer: 'Test Answer 2',
						completed: false,
					},
					{
						value: 300,
						type: 'text',
						question: 'Test Question 3',
						answer: 'Test Answer 3',
						completed: false,
					},
					{
						value: 400,
						type: 'text',
						question: 'Test Question 4',
						answer: 'Test Answer 4',
						completed: false,
					},
					{
						value: 500,
						type: 'text',
						question: 'Test Question 5',
						answer: 'Test Answer 5',
						completed: false,
					},
				],
			},
		],
	};

	clickHandlerBoard = (question, categoryIndex, questionIndex) => {
		if (!question.completed) {
			const board = [...this.state.board];
			let completedQuestionCategory = board[categoryIndex];
			completedQuestionCategory.questions[questionIndex].completed = true;
			board[categoryIndex] = completedQuestionCategory;
			this.setState({
				currentQuestion: question,
				display: 'question',
				board: board,
			});
		}
	};

	clickHandlerModal = () => {
		if (this.state.display === 'question') {
			this.setState({
				display: 'answer',
			});
		} else {
			this.setState({ display: 'board' });
		}
	};

	render() {
		return (
			<JeopardyContainer>
				<Modal display={this.state.display} onClick={this.clickHandlerModal}>
					<StyledSpan>
						{this.state.display === 'question'
							? this.state.currentQuestion.question
							: this.state.display === 'answer'
							? this.state.currentQuestion.answer
							: ''}
					</StyledSpan>
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
