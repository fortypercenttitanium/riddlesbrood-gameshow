import styled from 'styled-components';

const ModalContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	background: rgba(111, 111, 111, 0.5);
	backdrop-filter: blur(2px);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
`;

const GamesMenuModalDiv = styled.div`
	position: absolute;
	display: flex;
	flex-wrap: wrap;
	width: 80%;
	height: 90%;
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	text-align: center;
	background: rgb(111, 111, 111);
	background: radial-gradient(
		circle,
		rgba(111, 111, 111, 1) 0%,
		rgba(91, 91, 91, 1) 31%,
		rgba(74, 74, 74, 1) 56%,
		rgba(68, 68, 68, 1) 100%
	);
	border: 1px solid black;
	z-index: 5;
`;

const GameButton = styled.div`
	width: 25%;
	height: 120px;
	padding: 1rem;
	border: 1px solid white;
	margin: 1rem auto;
	text-align: center;
	cursor: pointer;
	user-select: none;
	transition: 0.3s;
	&:hover {
		background-color: white;
	}
`;

const GameLogo = styled.img`
	height: 100%;
	width: 100%;
`;

const VersionSelectContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
`;

const VersionSelectDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	flex: 1;
	margin: auto;
`;

const StartButton = styled.button`
	padding: 1.5rem;
	font-size: 1.4rem;
	font-weight: bold;
	margin: 1rem auto;
	cursor: pointer;
	box-shadow: 2px 2px 2px black;
	border: 1px solid black;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: auto;
`;

const FlexDiv = styled.div`
	display: flex;
`;

const VersionH1 = styled.h1`
	color: #ddd;
	text-shadow: 2px 2px 2px black;
`;

const VersionSelect = styled.select`
	margin: 1rem auto;
	width: 100%;
`;

const VersionOption = styled.option`
	font-size: 1.5rem;
`;

export {
	ModalContainer,
	GamesMenuModalDiv,
	GameButton,
	GameLogo,
	VersionSelectContainer,
	VersionSelectDiv,
	StartButton,
	FlexDiv,
	Form,
	VersionH1,
	VersionSelect,
	VersionOption,
};
