import React from 'react';
import { GameLogoDiv, LogoImg } from './GameLogoStyles';

function importAll(r) {
	const logos = {};
	r.keys().forEach((item) => {
		logos[item.replace('./', '')] = r(item);
	});
	return logos;
}

const logos = importAll(
	require.context('../../../assets/images/logos', false, /\.png$|.jpg$|.jpeg$/)
);

export default function GameLogo({ logo }) {
	return (
		<GameLogoDiv>
			<LogoImg src={logo ? logos[logo] : logos['RB Logo.jpg']} alt='' />
		</GameLogoDiv>
	);
}
