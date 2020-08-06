import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../App';

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

export default function ScoreCard(props) {
	const { dispatch } = useContext(StoreContext);
	const handleChange = (direction, amount) => {
		if (direction === 'down') {
			amount = -amount;
		}
		dispatch({
			type: 'CHANGE_SCORE',
			payload: { playerIndex: props.index, amount },
		});
	};
	return (
		<ScoreCardDiv>
			<h2>{props.name}</h2>
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
					onClick={() => {
						handleChange('up', 1);
					}}
				/>
				<h1 style={{ margin: 'auto' }}>{props.score}</h1>
				<img
					src='images/downarrow.png'
					alt=''
					style={{ margin: 'auto', cursor: 'pointer' }}
					onClick={() => {
						handleChange('down', 1);
					}}
				/>
			</div>
			<WinnerButton>WINNER</WinnerButton>
		</ScoreCardDiv>
	);
}
