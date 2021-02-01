import styled from 'styled-components';

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
	cursor: pointer;
`;

const ScoreCardBody = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

export {
	ScoreCardDiv,
	WinnerButton,
	ArrowImg,
	H1,
	H2,
	H3,
	AddRemoveButton,
	InactiveScoreCard,
	ScoreCardBody,
};
