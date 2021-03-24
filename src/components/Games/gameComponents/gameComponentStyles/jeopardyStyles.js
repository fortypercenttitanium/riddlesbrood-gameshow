import styled from 'styled-components';
import jeopardyBackground from '../../../../assets/images/game_images/jeopardy/jeopardy-background.svg';

const JeopardyContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	background: #222;
	position: relative;
`;

const Board = styled.div`
	margin: 6.5% auto;
	position: relative;
	background: black;
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
	z-index: 20;
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
	font-size: ${(props) =>
		props.windowInstance === 'gameboard' ? '2rem' : '1rem'};
	font-family: impact;
	color: #eee;
	background: linear-gradient(to top left, #000088, #0000ff);
	border: 3px solid #000;
	& > span {
		text-shadow: 2px 2px 2px black;
	}
`;

const QCell = styled(CatCell)`
	color: #ffd87d;
	font-size: ${(props) =>
		props.windowInstance === 'gameboard' ? '2.5rem' : '2.5rem'};
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		color: #fffbaf;
	}
`;

const StyledSpan = styled.span`
	margin: auto;
	text-shadow: 4px 4px 4px black;
	display: ${(props) => props.display};
`;

const DailyDiv = styled.div`
	height: 100%;
	width: 100%;
`;

const DailyImg = styled.img`
	width: 100%;
`;

const DecorContainer = styled.div`
	position: absolute;
	pointer-events: none;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	background: url(${jeopardyBackground}) center/cover;
`;

export {
	JeopardyContainer,
	Board,
	Modal,
	CellContainer,
	CatCell,
	QCell,
	StyledSpan,
	DailyDiv,
	DailyImg,
	DecorContainer,
};
