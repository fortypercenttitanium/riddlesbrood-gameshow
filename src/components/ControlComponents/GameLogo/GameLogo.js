import React from 'react';
import { GameLogoDiv, LogoImg } from './GameLogoStyles';
import importAll from '../../Games/helpers/shared/importAll';

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
