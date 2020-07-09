import React, { Component } from 'react';
import styled from 'styled-components';

const ShowControlsDiv = styled.div`
	grid-area: 4 / 1 / 7 / 4;
	display: grid;
	height: 98%;
	width: 98%;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	margin: auto;
`;

const Button = styled.div`
	display: flex;
	border: 1px solid black;
	background: #e49090;
	text-align: center;
	cursor: pointer;
	&:active {
		transform: scale(0.95);
	}
`;

const Label = styled.h2`
	margin: auto;
	font-size: 20px;
	user-select: none;
`;

export class ShowControls extends Component {
	render() {
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
						src='/images/projector.png'
						alt=''
						onClick={this.props.projectorMode}
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
}

export default ShowControls;
