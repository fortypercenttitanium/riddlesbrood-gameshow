import styled from 'styled-components';

const FxButtonsDiv = styled.div`
	grid-area: 7 / 1 / 11 / 4;
	height: 98%;
	width: 99%;
	display: grid;
	grid-gap: 5px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
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
	user-select: none;
`;

export { FxButton, FxButtonsDiv, Text };
