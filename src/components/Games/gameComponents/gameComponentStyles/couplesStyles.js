import styled from 'styled-components';

export const CouplesHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: rgb(97, 25, 30);
	background: radial-gradient(
		circle,
		rgba(97, 25, 30, 1) 0%,
		rgba(108, 24, 24, 1) 31%,
		rgba(89, 13, 19, 1) 56%,
		rgba(71, 0, 0, 1) 100%
	);
	color: #ddd;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

export const TitleContainer = styled.div`
	display: block;
	height: 10%;
	width: 85%;
	margin: auto;
`;

export const H1 = styled.h1`
	font-weight: bold;
	font-size: 3rem;
`;

export const Title = styled(H1)`
	display: block;
	font-size: ${(props) => props.windowInstance === 'controlPanel' && '2.4rem'};
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
`;

export const ScoreContainer = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	height: 180px;
	transform: rotate(-45deg);
	z-index: 1;
`;

export const ScoreH1 = styled(H1)`
	margin: auto;
	color: #111;
	text-shadow: 3px 1px 2px rgba(0, 0, 0, 0.4);
`;

export const ScoreH2 = styled(ScoreH1)`
	margin: 5px auto;
	font-size: 2rem;
`;

export const H3 = styled(H1)`
	font-size: 1.6rem;
	color: #ddd;
	margin: auto;
	padding: 2rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

export const Controls = styled.div`
	display: flex;
	border-radius: 5px;
	margin: auto;
	width: 75%;
`;

export const Button = styled.div`
	display: flex;
	width: 200px;
	margin: auto;
	border: 1px solid black;
	background: rgb(72, 95, 145);
	background: linear-gradient(
		149deg,
		rgba(72, 95, 145, 1) 0%,
		rgba(68, 90, 136, 1) 31%,
		rgba(57, 75, 115, 1) 56%,
		rgba(46, 61, 92, 1) 100%
	);
	text-align: center;
	cursor: pointer;
	border-radius: 10px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

export const ScoreBoardDiv = styled.div`
	display: flex;
	width: 80%;
	margin: auto;
	height: 35%;
	justify-content: center;
`;

export const ScoreCardDiv = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 0;
	position: relative;
	background: ${(props) =>
		props.index === 0
			? 'rgb(255,140,140)'
			: props.index === 1
			? 'rgb(255,254,140)'
			: props.index === 2
			? 'rgb(140,255,157)'
			: props.index === 3
			? 'rgb(140,146,255)'
			: null};
	text-align: center;
	margin: auto;
	height: 180px;
	width: 180px;
	transform: rotate(45deg);
	&:before,
	&:after {
		position: absolute;
		width: 180px;
		height: 180px;
		content: '';
		border-radius: 50%;
		background-color: ${(props) =>
			props.index === 0
				? 'rgb(255,140,140)'
				: props.index === 1
				? 'rgb(255,254,140)'
				: props.index === 2
				? 'rgb(140,255,157)'
				: props.index === 3
				? 'rgb(140,146,255)'
				: null};
	}
	&:before {
		bottom: 0px;
		left: -90px;
	}
	&:after {
		top: -90px;
		right: 0px;
	}
`;
