import React from 'react';
import {
	WinnerButton,
	ArrowImg,
	H1,
	H2,
	H3,
	AddRemoveButton,
	InactiveScoreCard,
} from './ScoreCardStyles';
import plus from '../../../assets/images/icons/plus.svg';
import upArrow from '../../../assets/images/icons/uparrow.png';
import downArrow from '../../../assets/images/icons/downarrow.png';

export default function ScoreCard(props) {
	return (
		<InactiveScoreCard>
			<H2>{props.name}</H2>
			<AddRemoveButton
				onClick={() => props.toggleCardActive(props.index)}
				src={plus}
				alt=''
			/>
			<div
				style={{
					display: 'flex',
					marginBottom: '20px',
				}}
			>
				<ArrowImg src={upArrow} alt='' />
				<H1>0</H1>
				<ArrowImg src={downArrow} alt='' />
			</div>
			<WinnerButton>
				<H3>WINNER</H3>
			</WinnerButton>
		</InactiveScoreCard>
	);
}
