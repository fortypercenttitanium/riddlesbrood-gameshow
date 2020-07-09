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
		return (
			<ScoreBoardDiv>
				<ScoreCard name='Player One' score={0} />
				<ScoreCard name='Player Two' score={0} />
				<ScoreCard name='Player Three' score={0} />
				<ScoreCard name='Player Four' score={0} />
			</ScoreBoardDiv>
		);
	}
}

export default ScoreBoard;
