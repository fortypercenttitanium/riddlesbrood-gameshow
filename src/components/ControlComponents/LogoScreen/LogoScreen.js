import React from 'react';
import { LogoScreenDiv, LogoScreenImg } from './LogoScreenStyles';
import RBLogo from '../../../assets/images/logos/RB Logo.jpg';

export default function LogoScreen() {
	return (
		<LogoScreenDiv>
			<LogoScreenImg src={RBLogo} alt='' />
		</LogoScreenDiv>
	);
}
