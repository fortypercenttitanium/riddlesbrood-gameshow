import styled from 'styled-components';

const TuneHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: #222;
	color: gold;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
`;

const TitleContainer = styled.div`
	display: block;
	height: 30%;
	width: 85%;
	margin: 1% auto auto;
`;

const H1 = styled.h1`
	font-weight: bold;
	font-size: 3rem;
`;

const Title = styled(H1)`
	display: ${(props) => (props.show ? 'block' : 'none')};
	font-size: ${(props) => props.window === 'controlPanel' && '2.4rem'};
`;

const H2 = styled.h2`
	font-size: 2rem;
`;

const Artist = styled(H2)`
	display: ${(props) => (props.show ? 'block' : 'none')};
`;

const ScoreH1 = styled(H1)`
	margin: auto;
	color: #ddd;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const ScoreH2 = styled(ScoreH1)`
	font-size: 2rem;
`;

const H3 = styled(H1)`
	font-size: 1.6rem;
	color: #ddd;
	margin: auto;
	padding: 2rem;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const PlayerContainer = styled.div`
	display: flex;
	border: 1px solid gold;
	border-radius: 1px;
	height: 20%;
	width: 25%;
	margin: auto;
	padding: 2%;
`;

const AudioImg = styled.img`
	height: 50px;
	width: 50px;
	cursor: pointer;
	margin: auto;
	border: 1px solid #edd607;
	border-radius: 15px;
	padding: 20px;
	&:hover {
		background-color: #444;
	}
`;

const Controls = styled.div`
	display: flex;
	border-radius: 5px;
	margin: auto;
	width: 75%;
`;

const Button = styled.div`
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

const ScoreBoardDiv = styled.div`
	display: flex;
	width: 80%;
	margin: auto;
	justify-content: center;
`;

const ScoreCardDiv = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 240px;
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
	background: ${(props) =>
		props.index === 0
			? 'linear-gradient(149deg, rgba(255, 140, 140, 0.7959558823529411) 0%,rgba(255, 94, 94, 0.804359243697479) 31%,	rgba(255, 63, 63, 0.8015581232492998) 56%, rgba(242, 30, 30, 0.804359243697479) 100%)'
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
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	margin: 0 60px;
	height: 130px;
`;

export {
	TuneHomeScreen,
	TitleContainer,
	H1,
	Title,
	H2,
	Artist,
	ScoreH1,
	ScoreH2,
	H3,
	PlayerContainer,
	AudioImg,
	Controls,
	Button,
	ScoreBoardDiv,
	ScoreCardDiv,
};
