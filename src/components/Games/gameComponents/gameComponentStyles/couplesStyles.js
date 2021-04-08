import styled from 'styled-components';
import background from '../../../../assets/images/game_images/couples/couples-conundrum-background.png';
import sparkleOverlay from '../../../../assets/images/game_images/couples/sparkle-overlay.png';
import redHeart from '../../../../assets/images/game_images/couples/red-heart.png';
import blueHeart from '../../../../assets/images/game_images/couples/blue-heart.png';
import greenHeart from '../../../../assets/images/game_images/couples/green-heart.png';
import yellowHeart from '../../../../assets/images/game_images/couples/yellow-heart.png';
import scoreFont from '../../../../assets/fonts/Dobkin/Dobkin.ttf';

export const CouplesHomeScreen = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background: ${(props) =>
		props.display === 'scores'
			? `center/cover no-repeat url(${background})`
			: 'radial-gradient(circle, rgba(139,139,139,1) 34%, rgba(32,32,32,1) 100%)'};
	color: #ddd;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	.sparkle-overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: center/cover no-repeat url(${sparkleOverlay});
		z-index: 5;
		pointer-events: none;
	}
`;

export const TitleContainer = styled.div`
	display: block;
	margin: 300px auto;
`;

export const H1 = styled.h1`
	font-weight: bold;
	font-size: 4rem;
`;

export const Title = styled(H1)`
	display: block;
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
`;

export const ScoreH1 = styled(H1)`
	margin: 124px auto;
	font-size: 12rem;
	font-weight: normal;
	text-shadow: 4px 4px 10px rgba(0, 0, 0, 1), -4px -4px 10px rgba(0, 0, 0, 1),
		4px -4px 10px rgba(0, 0, 0, 1), -4px 4px 10px rgba(0, 0, 0, 1);
`;

export const H3 = styled(H1)`
	font-size: 2.5rem;
	color: #ddd;
	margin: auto;
	padding: 3rem;
	text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
`;

export const Controls = styled.div`
	display: flex;
	border-radius: 5px;
	margin: auto 0 0;
	justify-content: center;
	z-index: 10;
`;

export const Button = styled.div`
	display: flex;
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
	position: absolute;
	text-align: center;
	margin: auto;
	pointer-events: none;
	@font-face {
		font-family: 'Dobkin';
		src: url(${scoreFont});
	}
	font-family: Dobkin;
	color: #fff000;
	height: 480px;
	width: 480px;
	&.index-0 {
		background: no-repeat url(${redHeart});
		top: 134px;
		left: 192px;
	}
	&.index-1 {
		background: no-repeat url(${yellowHeart});
		bottom: 6px;
		left: 400px;
	}
	&.index-2 {
		background: no-repeat url(${greenHeart});
		bottom: 6px;
		right: 430px;
	}
	&.index-3 {
		background: no-repeat url(${blueHeart});
		top: 130px;
		right: 186px;
	}
`;
