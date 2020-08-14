import React from 'react';
import styled from 'styled-components';

const LogoScreenDiv = styled.div`
	width: 100%;
	height: 100%;
	background: black;
	display: flex;
`;

export default function LogoScreen() {
	return (
		<LogoScreenDiv>
			<img src='media/images/RB Logo.jpg' alt='' style={{ margin: 'auto' }} />
		</LogoScreenDiv>
	);
}
