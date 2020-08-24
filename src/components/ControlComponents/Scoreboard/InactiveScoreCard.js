import React from 'react';
import styled from 'styled-components';

const InactiveScoreCard = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	flex-basis: 200px;
	text-align: center;
	border: 1px solid black;
	border-radius: 10px;
	box-shadow: 3px 3px 3px grey;
	margin: 5px 20px;
	background: rgb(156, 156, 156);
	background: linear-gradient(
		149deg,
		rgba(156, 156, 156, 1) 0%,
		rgba(117, 117, 117, 1) 31%,
		rgba(111, 111, 111, 1) 56%,
		rgba(105, 104, 104, 1) 100%
	);
	opacity: 0.7;
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
	return (
		<InactiveScoreCard>
			<H2>{props.name}</H2>
			<AddRemoveButton
				onClick={() => props.toggleCardActive(props.index)}
				src='media/images/icons/plus.svg'
				alt=''
			/>
			<div
				style={{
					display: 'flex',
					marginBottom: '20px',
				}}
			>
				<ArrowImg src='media/images/uparrow.png' alt='' />
				<H1>0</H1>
				<ArrowImg src='media/images/downarrow.png' alt='' />
			</div>
			<WinnerButton>
				<H3>WINNER</H3>
			</WinnerButton>
		</InactiveScoreCard>
	);
}
