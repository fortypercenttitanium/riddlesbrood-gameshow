import React from 'react';
import styled from 'styled-components';

const ComponentWrapper = styled.div`
	display: flex;
	flex: 1;
	padding: ${(props) =>
		props.windowInstance === 'controlPanel' ? '10px' : '16px'};
	justify-content: space-around;
	border-radius: 4px;
	text-shadow: 2px 2px 2px black;
	margin: auto 12px 3px;
	font-weight: bold;
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

	.score-text {
		font-size: ${(props) =>
			props.windowInstance === 'controlPanel' ? '1.4rem' : '1.8rem'};
	}
`;

function ScoreComponent({ player, type, score, windowInstance }) {
	const capitalizedType = type[0].toUpperCase() + type.slice(1);
	return (
		<ComponentWrapper windowInstance={windowInstance} index={player - 1}>
			<span className='score-text'>
				{capitalizedType} {player}:
			</span>
			<span className='score-text'>{score}</span>
		</ComponentWrapper>
	);
}

export default ScoreComponent;
