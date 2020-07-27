import React, { Component } from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';

const ScoreBoardDiv = styled.div`
	display: flex;
	grid-area: 8 / 4 / 11 / 11;
	width: 1050px;
	height: 95%;
	margin: auto;
`;

export class ScoreBoard extends Component {
	render() {
		const { score, changeScore } = this.props;
		return (
			<ScoreBoardDiv>
				{score.scoreBoard.map((number, index) => {
					return (
						<ScoreCard
							name={`${score.type === 'team' ? 'Team' : 'Player'} ${index + 1}`}
							key={index}
							index={index}
							score={number}
							changeScore={changeScore}
						/>
					);
				})}
			</ScoreBoardDiv>
		);
	}
}

export default ScoreBoard;
