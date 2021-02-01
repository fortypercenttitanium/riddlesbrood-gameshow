import styled from 'styled-components';
import background from '../../../assets/images/backgrounds/answerblock.png';

const AnswerBlockDiv = styled.div`
	grid-area: 7 / 4 / 8 / 11;
	height: 100%;
	width: 912px;
	background: url(${background});
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

export { AnswerBlockDiv, Timer, TimerDiv, AnswerText };
