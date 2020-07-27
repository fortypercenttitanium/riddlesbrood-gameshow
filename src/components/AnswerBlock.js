import React, { Component } from 'react';
import styled from 'styled-components';

const AnswerBlockDiv = styled.div`
	grid-area: 7 / 4 / 8 / 11;
	height: 100%;
	width: 1050px;
	background: url(images/answerblock.png);
	background-size: contain;
	margin: auto;
	color: white;
	display: flex;
	position: relative;
`;

const TimerDiv = styled.div`
	position: absolute;
	left: 10px;
	display: block;
	text-align: center;
	line-height: 0.8;
`;
const Timer = styled.h2`
	font-size: 1.3rem;
	margin: 0;
`;

const AnswerText = styled.h1`
	margin: auto;
	font-size: ${(props) => (props.length >= 20 ? '2rem' : '4rem')};
`;

export class AnswerBlock extends Component {
	render() {
		return (
			<AnswerBlockDiv>
				<TimerDiv>
					<h3>Timer:</h3>
					<Timer>{this.props.timer}</Timer>
				</TimerDiv>
				<AnswerText length={this.props.answer.length}>
					{this.props.answer}
				</AnswerText>
			</AnswerBlockDiv>
		);
	}
}

export default AnswerBlock;
