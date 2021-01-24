import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../store/context';

const AnswerBlockDiv = styled.div`
	grid-area: 7 / 4 / 8 / 11;
	height: 100%;
	width: 912px;
	background: url(media/images/answerblock.png);
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
	font-size: ${(props) => (props.length >= 18 ? '1.7rem' : '4rem')};
`;

export default function AnswerBlock() {
	const { state } = useContext(StoreContext);
	const { time } = state.gameController.timer;
	let answer = state.gameController.currentAnswer;
	return (
		<AnswerBlockDiv>
			<TimerDiv>
				<h3>Timer:</h3>
				<Timer>{time}</Timer>
			</TimerDiv>
			<AnswerText length={answer.length}>{answer}</AnswerText>
		</AnswerBlockDiv>
	);
}
