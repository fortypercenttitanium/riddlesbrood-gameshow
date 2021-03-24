import styled from 'styled-components';

export const WheelContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: lightgrey;
	position: relative;
`;

export const Board = styled.div`
	margin: 10% auto 0;
	height: 50%;
	width: 80%;
	display: grid;
	grid-template: repeat(4, 1fr) / repeat(14, 1fr);
	grid-gap: 2px;
`;

export const Title = styled.h1`
	display: ${(props) => (props.display === 'select' ? 'inline' : 'none')};
	margin: 3rem auto;
	padding: 1rem;
	font-size: 4rem;
`;

export const CategoryContainer = styled.div`
	display: ${(props) => (props.display === 'select' ? 'flex' : 'none')};
	flex-direction: column;
	height: 50%;
	width: 30%;
	margin: auto;
`;

export const CategoryCard = styled.div`
	display: ${(props) => (props.done ? 'none' : 'flex')};
	margin: auto;
	text-align: center;
	color: white;
	padding: 2rem;
	border: 1px solid black;
	background: rgb(72, 95, 145);
	background: linear-gradient(
		149deg,
		rgba(72, 95, 145, 1) 0%,
		rgba(68, 90, 136, 1) 31%,
		rgba(57, 75, 115, 1) 56%,
		rgba(46, 61, 92, 1) 100%
	);
	text-align: center;
	cursor: pointer;
	border-radius: 10px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

export const LetterCell = styled.div`
	background: white;
	display: flex;
	&.active {
		background: blue;
	}
`;

export const UnusedCell = styled.div`
	background: darkgreen;
`;

export const Span = styled.span`
	margin: auto;
	display: none;
	&.reveal {
		display: inline;
	}
	font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif,
		monospace;
	font-size: 3rem;
`;

export const LetterSpan = styled.span`
	margin: 0 10px;
`;

export const ReturnButton = styled.div`
	padding: 1.4rem;
	position: absolute;
	bottom: 40px;
	left: 0;
	right: 0;
	width: 30%;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	text-align: center;
	margin: auto;
	background: lightblue;
	cursor: pointer;
	&:hover {
		background: white;
	}
	display: ${(props) =>
		props.display === 'board' && props.screen === 'controlPanel'
			? 'flex'
			: 'none'};
`;

export const H2 = styled.h2`
	margin: auto;
	font-size: 1.5rem;
	font-weight: bold;
`;

export const SolvePuzzle = styled.div`
	display: ${(props) =>
		props.display === 'board' && props.screen === 'controlPanel'
			? 'flex'
			: 'none'};
	position: absolute;
	top: 15px;
	padding: 1.2rem;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	left: 0;
	right: 0;
	width: 25%;
	margin: auto;
	background: lightblue;
	cursor: pointer;
	&:hover {
		background: white;
	}
`;

export const GuessedLettersDisplay = styled.div`
	display: flex;
	margin: 0 5%;
	font-size: 1.5rem;
	font-weight: bold;
`;

export const CategoryDisplay = styled.div`
	margin: 2rem auto;
	padding: 1rem 0;
	width: 100%;
	background: linear-gradient(90deg, #444, darkblue, #444);
	color: white;
	display: ${(props) => (props.display === 'board' ? 'flex' : 'none')};
`;

export const CategoryH3 = styled.h3`
	margin: auto;
	font-size: 3rem;
`;
