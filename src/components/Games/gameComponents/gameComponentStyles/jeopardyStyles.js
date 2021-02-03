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
	display: ${(props) => props.display};
`;

const DailyDiv = styled.div`
	height: 100%;
	width: 100%;
`;

const DailyImg = styled.img`
	width: 100%;
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
};
