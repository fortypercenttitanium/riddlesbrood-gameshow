import React, { useContext } from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import InactiveScoreCard from './InactiveScoreCard';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../actions';

const ScoreBoardDiv = styled.div`
	display: flex;
	grid-area: 8 / 4 / 11 / 11;
	width: 912px;
	height: 95%;
	margin: auto;
`;

export default function ScoreBoard(props) {
	const { state, dispatch } = useContext(StoreContext);
	const { score } = state.gameController;

	const toggleCardActive = (index) => {
		let newScore = score;
		newScore.scoreBoard[index] === null
			? (newScore.scoreBoard[index] = 0)
			: (newScore.scoreBoard[index] = null);
		dispatch({
			type: actions.SET_SCORE,
			payload: newScore,
		});
	};

	return (
		<ScoreBoardDiv>
			{score.scoreBoard.map((number, index) => {
				if (number !== null) {
					return (
						<ScoreCard
							name={`${score.type === 'team' ? 'Team' : 'Player'} ${index + 1}`}
							key={index}
							index={index}
							score={number}
							playSound={props.playSound}
							toggleCardActive={toggleCardActive}
							alt={
								score.type === 'team' &&
								score.scoreBoard.filter((number) => typeof number === 'number')
									.length === 2
							}
						/>
					);
				} else {
					return (
						<InactiveScoreCard
							name={`${score.type === 'team' ? 'Team' : 'Player'} ${index + 1}`}
							key={index}
							toggleCardActive={toggleCardActive}
							index={index}
						/>
					);
				}
			})}
		</ScoreBoardDiv>
	);
}
