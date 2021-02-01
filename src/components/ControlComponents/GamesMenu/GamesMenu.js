import React from 'react';
import { GamesMenuDiv, Title } from './GamesMenuStyles';

export default function GamesMenu({ open }) {
	return (
		<GamesMenuDiv
			onClick={() => {
				open();
			}}
		>
			<Title>Games Menu</Title>
		</GamesMenuDiv>
	);
}
