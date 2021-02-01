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
import buzzer from '../../../assets/sound_fx/buzzer.mp3';
import pyramidBell from '../../../assets/sound_fx/pyramidbell.mp3';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';

export default function ScoreCard(props) {
	const { dispatch } = useContext(StoreContext);
	const { playSound } = props;
	const handleChange = (direction, amount) => {
		if (direction === 'down') {
			amount = -amount;
			playSound(buzzer);
		} else {
			playSound(pyramidBell);
		}
		dispatch({
			type: 'CHANGE_SCORE',
			payload: { playerIndex: props.index, amount },
		});
	};

	const handleContext = () => {
		dispatch({ type: actions.TOGGLE_SCORE_TYPE });
	};

	return (
		<ScoreCardDiv index={props.index} altColor={props.alt}>
			<H2 onContextMenu={handleContext}>{props.name}</H2>
			<AddRemoveButton
				onClick={() => props.toggleCardActive(props.index)}
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
				<H1>{props.score}</H1>
				<ArrowImg
					src={downArrow}
					alt=''
					onClick={() => {
						handleChange('down', 1);
					}}
				/>
			</ScoreCardBody>
			<WinnerButton>
				<H3>WINNER</H3>
			</WinnerButton>
		</ScoreCardDiv>
	);
}
