import React, { Component } from 'react';
import styled from 'styled-components';

const ScoreCardDiv = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	text-align: center;
	border: 1px solid black;
	margin: 5px 30px;
`;

const WinnerButton = styled.div`
	padding: 2rem;
	border-top: 1px solid black;
	text-align: center;
	cursor: pointer;
`;

export class ScoreCard extends Component {
	render() {
		return (
			<ScoreCardDiv>
				<h2>{this.props.name}</h2>
				<div
					style={{
						display: 'flex',
						margin: 'auto 0',
					}}
				>
					<img
						src='images/uparrow.png'
						alt=''
						style={{ margin: 'auto', cursor: 'pointer' }}
					/>
					<h1 style={{ margin: 'auto' }}>{this.props.score}</h1>
					<img
						src='images/downarrow.png'
						alt=''
						style={{ margin: 'auto', cursor: 'pointer' }}
					/>
				</div>
				<WinnerButton>WINNER</WinnerButton>
			</ScoreCardDiv>
		);
	}
}

export default ScoreCard;
