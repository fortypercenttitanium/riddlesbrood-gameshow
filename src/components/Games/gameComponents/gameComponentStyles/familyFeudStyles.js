import styled from 'styled-components';
import ffBackground from '../../../../assets/images/backgrounds/ffbackground.svg';

const FamilyFeudHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: #a7cfdf;
	background: linear-gradient(to bottom, #a7cfdf 0%, #23538a 100%);
	filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#a7cfdf', endColorstr='#23538a', GradientType=0);
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

const GameBoard = styled.div`
	position: relative;
	font-family: helvetica, sans-serif;
	color: white;
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
	border: 5px solid #003c7b;
	text-align: center;
	border-radius: 5%;
	width: 98%;
	height: 98%;
	margin: auto;
	background: url(${ffBackground}) #0c4779;
	background-repeat: repeat;
	background-position: center center;
	box-shadow: 0 1px 24px 1px rgba(0, 0, 0, 0.48);
`;

const TopContainer = styled.div`
	display: flex;
	width: 97%;
	height: 40%;
	top: 0;
	left: 0;
	right: 0;
	margin: 2% auto 0;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100% - 60px);
	width: 25%;
	margin: auto;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
	box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);
	border-radius: 5%;
	padding: 20px;
	border: 2px solid white;
	text-align: center;
`;

const PromptContainer = styled.div`
	display: flex;
	width: 40%;
	height: calc(100% - 80px);
	margin: auto;
	text-align: center;
	color: #003c7b;
	text-shadow: initial;
	text-align: center;
	border: 1px solid black;
	background: #deeeff;
	padding: 10px;
	box-shadow: inset 0 1px 24px 1px rgba(0, 0, 0, 0.48);
`;

const XContainer = styled.div`
	display: flex;
	height: 50%;
	width: 100%;
	margin: auto;
	cursor: pointer;
`;

const WrongImg = styled.img`
	height: 100%;
	margin: auto;
	border: 2px solid transparent;
	&:hover {
		border-color: red;
	}
`;

const H2 = styled.h2`
	margin: auto;
	padding: 0.2rem;
	font-size: 1.5rem;
`;

const FlippableH3 = styled.h3`
	margin: auto;
	font-size: ${(props) => (props.window === 'controlPanel' ? '2rem' : '3rem')};
	opacity: ${(props) => (props.revealed ? '1' : '0.4')};
	transform: ${(props) =>
		props.revealed ? 'rotateX(-180deg)' : 'rotateX(0deg)'};
`;

const Span = styled.span`
	margin: auto;
	padding: 3%;
	font-size: ${(props) =>
		props.window === 'controlPanel' ? '1.2rem' : '2.5rem'};
	line-height: ${(props) =>
		props.window === 'controlPanel' ? '2rem' : '3.6rem'};
	color: #003c7b;
`;

const AnswerGrid = styled.div`
	margin: auto;
	width: 90%;
	display: grid;
	grid-template-rows: ${(props) => props.rowTemplate};
	grid-template-columns: 1fr 1fr;
	grid-auto-flow: column;
`;

const AnswerContainer = styled.div`
	border: 2px solid #003c7b;
	height: ${(props) => (props.window === 'controlPanel' ? '3rem' : '4rem')};
	margin: 1%;
	display: flex;
	cursor: pointer;
	transform-style: preserve-3d;
	background: linear-gradient(
		to bottom,
		#cedbe9 0%,
		#aac5de 17%,
		#6199c7 50%,
		#3a84c3 51%,
		#419ad6 59%,
		#4bb8f0 71%,
		#3a8bc2 84%,
		#26558b 100%
	);
	transform: ${(props) =>
		props.side === 'front'
			? 'perspective(200px) rotateX(0deg)'
			: 'perspective(200px) rotateX(180deg)'};
	transition: 0.5s;
	&:hover {
		> h3 {
			opacity: 1;
		}
	}
`;

const NumberButton = styled.span`
	background: linear-gradient(
		to bottom,
		#7db9e8 0%,
		#207cca 49%,
		#2989d8 50%,
		#1e5799 100%
	);
	border: 2px solid #003c7b;
	border-radius: 50%;
	margin: auto;
	line-height: 35px;
	height: 35px;
	width: 45px;
	font-size: 2rem;
`;

const XModal = styled.div`
	display: flex;
	position: absolute;
	width: ${(props) => (props.display === 'controlPanel' ? '95%' : '75%')};
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;
	margin: auto;
	z-index: 2;
`;

const WrongModalImg = styled.img`
	width: ${(props) => props.width};
`;

const DivAutoMargin = styled.div`
	margin: auto;
`;

export {
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
};
