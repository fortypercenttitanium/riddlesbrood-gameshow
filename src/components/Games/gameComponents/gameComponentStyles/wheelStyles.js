import styled from 'styled-components';

export const WheelContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: rgb(30, 30, 30);
	position: relative;
`;

export const BoardWrapper = styled.div`
	margin: auto;
	height: 660px;
	width: 1620px;
	padding: 20px;
	display: flex;
	border: 24px solid transparent;
	border-image: linear-gradient(
		90deg,
		rgba(140, 254, 255, 1) 0%,
		rgba(0, 18, 255, 1) 100%
	);
	border-image-slice: 1;
`;

export const Board = styled.div`
	margin: auto;
	display: grid;
	grid-template: repeat(4, 1fr) / repeat(14, 1fr);
	gap: 1px;
	padding: 8px 12px;
	border-width: 32px;
	border-style: solid;
	border-image: linear-gradient(
		90deg,
		rgba(0, 18, 255, 1) 0%,
		rgba(140, 254, 255, 1) 100%
	);
	border-image-slice: 1;
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

export const CategoryCard = styled.button`
	display: flex;
	margin: auto;
	text-align: center;
	color: ${(props) => (props.done ? 'grey' : 'white')};
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
	background: ${(props) =>
		props.letter === ' '
			? 'linear-gradient(120deg, rgba(58,179,136,1) 0%, rgba(46,150,113,1) 50%, rgba(38,136,102,1) 100%);'
			: '#ddd'};
	display: flex;
	height: 120px;
	width: 84px;
	border: 12px solid rgb(30, 30, 30);
	outline: 2px solid rgba(136, 182, 166, 1);
	&.active {
		background: blue;
	}
	&.blank {
		border: 12px solid transparent;
		outline: 2px solid transparent;
		background: transparent;
	}
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
	margin: auto;
	font-size: 2.5rem;
	font-weight: bold;
`;

export const CategoryDisplay = styled.div`
	margin: auto;
	display: flex;
	width: 90%;
	background: linear-gradient(
		90deg,
		rgba(133, 133, 133, 0) 0%,
		rgba(133, 133, 133, 0.5046393557422969) 8%,
		rgba(163, 163, 163, 0.5494572829131652) 50%,
		rgba(130, 130, 130, 0.5354516806722689) 92%,
		rgba(130, 130, 130, 0) 100%
	);
	color: white;
	display: ${(props) => (props.display === 'board' ? 'flex' : 'none')};
	border-top: 3px solid white;
	border-bottom: 3px solid white;
`;

export const CategoryH3 = styled.h3`
	margin: auto;
	font-size: 3rem;
`;

export const CategoryDisplayText = styled.h1`
	font-size: 6rem;
	color: #eee;
	margin: auto;
	padding: 16px;
	text-shadow: 4px 4px 4px black;
`;
