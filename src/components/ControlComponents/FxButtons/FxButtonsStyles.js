import styled from 'styled-components';

const FxButtonsDiv = styled.div`
	grid-area: 7 / 1 / 11 / 4;
	height: 98%;
	width: 99%;
	display: grid;
	grid-gap: 5px;
	grid-template-columns: repeat(3, 134px);
	grid-template-rows: repeat(3, 102px);
	margin: 2px 2px;
`;

const FxButton = styled.div`
	display: flex;
	text-align: center;
	border: 1px solid black;
	cursor: pointer;
	user-select: none;
	border-radius: 3px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	background: rgb(149, 160, 219);
	background: radial-gradient(
		circle,
		rgba(149, 160, 219, 1) 0%,
		rgba(137, 145, 186, 1) 31%,
		rgba(116, 132, 176, 1) 56%,
		rgba(84, 90, 128, 1) 100%
	);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

const Text = styled.h3`
	margin: auto;
	width: 100%;
	user-select: none;
	overflow-wrap: break-word;
	color: ${(props) => (props.color ? props.color : 'black')};
`;

const BigText = styled.h1`
	font-size: ${(props) => (props.size ? props.size : '3rem')};
	margin: auto;
	user-select: none;
	color: ${(props) => (props.color ? props.color : 'black')};
`;

const FxSelectModal = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	background: rgba(111, 111, 111, 0.5);
	backdrop-filter: blur(2px);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
`;

const FxSelectContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 80%;
	height: 90%;
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	text-align: center;
	background: rgb(111, 111, 111);
	background: radial-gradient(
		circle,
		rgba(111, 111, 111, 1) 0%,
		rgba(91, 91, 91, 1) 31%,
		rgba(74, 74, 74, 1) 56%,
		rgba(68, 68, 68, 1) 100%
	);
	border: 1px solid black;
	z-index: 5;
`;

const FxSelect = styled.select`
	width: 50%;
	margin: 0 auto 2rem;
	border: 1px solid black;
`;

const SelectButton = styled.button`
	margin: 0 auto auto;
	padding: 1rem;
	font-size: 1.5rem;
	font-weight: bold;
	cursor: pointer;
`;

export {
	FxButton,
	FxButtonsDiv,
	Text,
	BigText,
	FxSelect,
	FxSelectContainer,
	FxSelectModal,
	SelectButton,
};
