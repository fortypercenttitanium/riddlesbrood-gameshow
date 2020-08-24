import React, { useContext } from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import { StoreContext } from '../../App';

const ScoreBoardDiv = styled.div`
	display: flex;
	grid-area: 8 / 4 / 11 / 11;
	width: 1050px;
	height: 95%;
	margin: auto;
`;

export default function ScoreBoard(props) {
	const { state } = useContext(StoreContext);
	const { score } = state.gameController;

	return (
		<ScoreBoardDiv>
			<button onClick={() => props.playSound('media/soundfx/beep.mp3')}>
				Click
			</button>
			{score.scoreBoard.map((number, index) => {
				return (
					<ScoreCard
						name={`${score.type === 'team' ? 'Team' : 'Player'} ${index + 1}`}
						key={index}
						index={index}
						score={number}
						playSound={props.playSound}
					/>
				);
			})}
		</ScoreBoardDiv>
	);
}
