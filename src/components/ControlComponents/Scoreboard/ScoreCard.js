import React, { useContext } from 'react';
import {
	ScoreCardDiv,
	WinnerButton,
	ArrowImg,
	H1,
	H2,
	H3,
	AddRemoveButton,
	ScoreCardBody,
} from './ScoreCardStyles';
import minus from '../../../assets/images/icons/minus.svg';
import upArrow from '../../../assets/images/icons/uparrow.png';
import downArrow from '../../../assets/images/icons/downarrow.png';
import wrong from '../../../assets/sound_fx/wrong.mp3';
import correct from '../../../assets/sound_fx/correct.mp3';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';

export default function ScoreCard({
	playSound,
	index,
	alt,
	name,
	toggleCardActive,
	score,
	active,
	playVideo,
}) {
	const { dispatch } = useContext(StoreContext);
	const handleChange = (direction, amount) => {
		if (direction === 'down') {
			amount = -amount;
			playSound(wrong);
		} else {
			playSound(correct);
		}
		dispatch({
			type: 'CHANGE_SCORE',
			payload: { playerIndex: index, amount },
		});
	};

	const handleContext = () => {
		dispatch({ type: actions.TOGGLE_SCORE_TYPE });
	};

	const handleWinnerClick = () => {
		playVideo();
	};

	return (
		<ScoreCardDiv index={index} altColor={alt}>
			<H2 onContextMenu={handleContext}>{name}</H2>
			<AddRemoveButton
				onClick={() => toggleCardActive(index)}
				src={minus}
				alt=''
			/>
			<ScoreCardBody>
				<ArrowImg
					src={upArrow}
					alt=''
					onClick={() => {
						handleChange('up', 1);
					}}
				/>
				<H1>{score}</H1>
				<ArrowImg
					src={downArrow}
					alt=''
					onClick={() => {
						handleChange('down', 1);
					}}
				/>
			</ScoreCardBody>
			<WinnerButton disabled={!active} onClick={handleWinnerClick}>
				<H3>WINNER</H3>
			</WinnerButton>
		</ScoreCardDiv>
	);
}
