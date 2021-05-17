import React from 'react';
import { LogoScreenDiv } from './LogoScreenStyles';
import logoLoop from '../../../assets/videos/show_control_videos/logo_loop.mp4';

export default function LogoScreen() {
	return (
		<LogoScreenDiv>
			<video autoPlay loop src={logoLoop}></video>
		</LogoScreenDiv>
	);
}
