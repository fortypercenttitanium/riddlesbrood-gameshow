import React, { useContext } from 'react';
import {
	AnswerBlockDiv,
	Timer,
	TimerDiv,
	AnswerText,
} from './AnswerBlockStyles';
import { StoreContext } from '../../../store/context';

export default function AnswerBlock() {
	const { state } = useContext(StoreContext);
	const { time } = state.gameController.timer;
	const answer = state.gameController.currentAnswer;
	return (
		<AnswerBlockDiv>
			<TimerDiv display={time !== null ? 'block' : 'none'}>
				<h3>Timer:</h3>
				<Timer>{time}</Timer>
			</TimerDiv>
			<AnswerText length={answer.length}>{answer}</AnswerText>
		</AnswerBlockDiv>
	);
}
