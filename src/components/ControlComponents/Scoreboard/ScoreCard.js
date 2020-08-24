import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../../../App';

const ScoreCardDiv = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	flex-basis: 200px;
	background: ${(props) =>
		props.index === 0
			? 'rgb(255,140,140)'
			: props.index === 1 && props.altColor
			? 'rgb(140,146,255)'
			: props.index === 1
			? 'rgb(255,254,140)'
			: props.index === 2
			? 'rgb(140,255,157)'
			: props.index === 3
			? 'rgb(140,146,255)'
			: null};
	background: ${(props) =>
		props.index === 0
			? 'linear-gradient(149deg, rgba(255, 140, 140, 0.7959558823529411) 0%,rgba(255, 94, 94, 0.804359243697479) 31%,	rgba(255, 63, 63, 0.8015581232492998) 56%, rgba(242, 30, 30, 0.804359243697479) 100%)'
			: props.index === 1 && props.altColor
			? 'linear-gradient(149deg, rgba(140,146,255,0.7959558823529411) 0%, rgba(94,100,255,0.804359243697479) 31%, rgba(63,67,255,0.8015581232492998) 56%, rgba(40,30,242,0.804359243697479) 100%)'
			: props.index === 1
			? 'linear-gradient(149deg, rgba(255,254,140,0.7959558823529411) 0%, rgba(255,253,94,0.804359243697479) 31%, rgba(255,250,63,0.8015581232492998) 56%, rgba(242,236,30,0.804359243697479) 100%)'
			: props.index === 2
			? 'linear-gradient(149deg, rgba(140,255,157,0.7959558823529411) 0%, rgba(94,255,104,0.804359243697479) 31%, rgba(63,255,88,0.8015581232492998) 56%, rgba(30,242,51,0.804359243697479) 100%)'
			: props.index === 3
			? 'linear-gradient(149deg, rgba(140,146,255,0.7959558823529411) 0%, rgba(94,100,255,0.804359243697479) 31%, rgba(63,67,255,0.8015581232492998) 56%, rgba(40,30,242,0.804359243697479) 100%)'
			: null};

	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 3px 3px 3px grey;
	margin: 5px 20px;
`;
const WinnerButton = styled.div`
	padding: 1.5rem;
	border-top: 1px solid black;
	text-align: center;
	cursor: pointer;
	&:hover h1 {
		transform: scale(1.2);
	}
	&:active h1 {
		transform: scale(0.95);
	}
`;

const ArrowImg = styled.img`
	margin: auto 15px;
	cursor: pointer;
	&:hover {
		transform: scale(1.15);
	}
	&:active {
		transform: scale(0.95);
	}
`;

const H1 = styled.h1`
	margin: auto;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
	font-size: 40px;
`;

const H2 = styled(H1)`
	font-size: 30px;
	margin-top: 35px;
`;

const H3 = styled(H1)`
	font-size: 20px;
	font-weight: bold;
`;

const AddRemoveButton = styled.img`
	position: absolute;
	top: 10px;
	right: 0;
	left: 0;
	margin: auto;
	height: 20px;
`;

export default function ScoreCard(props) {
	const { dispatch } = useContext(StoreContext);
	const { playSound } = props;
	const handleChange = (direction, amount) => {
		if (direction === 'down') {
			amount = -amount;
			playSound('media/soundfx/buzzer.mp3');
		} else {
			playSound('media/soundfx/pyramidbell.mp3');
		}
		dispatch({
			type: 'CHANGE_SCORE',
			payload: { playerIndex: props.index, amount },
		});
	};

	return (
		<ScoreCardDiv index={props.index} altColor={props.alt}>
			<H2>{props.name}</H2>
			<AddRemoveButton
				onClick={() => props.toggleCardActive(props.index)}
				src='media/images/icons/minus.svg'
				alt=''
			/>
			<div
				style={{
					display: 'flex',
					marginBottom: '20px',
				}}
			>
				<ArrowImg
					src='media/images/uparrow.png'
					alt=''
					onClick={() => {
						handleChange('up', 1);
					}}
				/>
				<H1>{props.score}</H1>
				<ArrowImg
					src='media/images/downarrow.png'
					alt=''
					onClick={() => {
						handleChange('down', 1);
					}}
				/>
			</div>
			<WinnerButton>
				<H3>WINNER</H3>
			</WinnerButton>
		</ScoreCardDiv>
	);
}
