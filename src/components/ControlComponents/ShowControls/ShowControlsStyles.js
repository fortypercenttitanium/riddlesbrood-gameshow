import styled from 'styled-components';

const ShowControlsDiv = styled.div`
	grid-area: 4 / 1 / 7 / 4;
	grid-gap: 5px;
	display: grid;
	height: 98%;
	width: 99%;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	margin: 2px 2px;
`;

const Button = styled.div`
	display: flex;
	border: 1px solid black;
	grid-area: ${(props) => props.area};
	background: rgb(254, 147, 147);
	background: radial-gradient(
		circle,
		rgba(254, 147, 147, 1) 0%,
		rgba(237, 127, 127, 1) 31%,
		rgba(219, 113, 113, 1) 56%,
		rgba(200, 96, 96, 1) 100%
	);
	text-align: center;
	cursor: pointer;
	border-radius: 3px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

const Label = styled.h2`
	margin: auto;
	font-size: 22px;
	user-select: none;
`;

const ProjectorImage = styled.img`
	height: 80px;
	margin: auto;
	user-select: none;
`;

export { ShowControlsDiv, Button, Label, ProjectorImage };
