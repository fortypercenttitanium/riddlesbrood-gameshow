import React from 'react';
import styled from 'styled-components';

const CardSharksHomeScreen = styled.div`
	width: 100%;
	height: 100%;
	background-image: url('media/images/card-sharks-bg.jpg');
	background-size: contain;
	display: flex;
`;

export default function LogoScreen() {
	return <CardSharksHomeScreen />;
}
