import React from 'react';
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
	font-size: 20px;
	user-select: none;
`;

export default function ShowControls(props) {
	return (
		<ShowControlsDiv>
			<Button
				style={{
					gridArea: '1 / 1 / 2 / 2',
				}}
			>
				<Label>Preshow</Label>
			</Button>
			<Button
				style={{
					gridArea: '2 / 1 / 3 / 2',
				}}
			>
				<Label>5 mins</Label>
			</Button>
			<Button
				style={{
					gridArea: '1 / 2 / 2 / 3',
				}}
			>
				<Label>START SHOW</Label>
			</Button>
			<Button
				style={{
					gridArea: '2 / 2 / 3 / 3',
				}}
			>
				<Label>END SHOW</Label>
			</Button>
			<Button
				style={{
					gridArea: '1 / 3 / 2 / 4',
				}}
			>
				<Label>INTERMISSION</Label>
			</Button>
			<Button
				style={{
					gridArea: '2 / 3 / 3 / 4',
				}}
			>
				<img
					src='media/images/projector.png'
					alt=''
					onClick={props.projectorMode}
					style={{
						height: '80px',
						margin: 'auto',
						userSelect: 'none',
					}}
				/>
			</Button>
		</ShowControlsDiv>
	);
}
