import styled from 'styled-components';

const GameLogoDiv = styled.div`
	grid-area: 1 / 2 / 2 / 4;
	height: 99%;
	width: 99%;
	text-align: center;
	margin: 2px 2px;
`;

const LogoImg = styled.img`
	border-radius: 6px;
	height: 120px;
	max-width: 100%;
	margin: auto;
`;

export { GameLogoDiv, LogoImg };
