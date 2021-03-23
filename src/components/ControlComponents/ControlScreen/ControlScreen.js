import React, { useContext } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import LogoScreen from '../LogoScreen/LogoScreen';
import { ControlScreenContainer } from './ControlScreenStyles';
import * as Games from '../../Games/helpers/shared/gamesArray';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';

export default function ControlScreen({ windowInstance }) {
	let StoreContext;

	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const { state } = useContext(StoreContext);
	const { currentGame, timeline } = state;

	const {
		Jeopardy,
		FamilyFeud,
		Pyramid,
		Wheel,
		NameThatTune,
		WhatTheHellIsIt,
		CouplesConundrum,
		ESP,
		CardSharks,
	} = Games;

	const components = {
		Jeopardy: <Jeopardy windowInstance={windowInstance} />,
		'Family Feud': <FamilyFeud windowInstance={windowInstance} />,
		'$25,000 Pyramid': <Pyramid windowInstance={windowInstance} />,
		'Wheel Of Fortune': <Wheel windowInstance={windowInstance} />,
		'Name That Tune': <NameThatTune windowInstance={windowInstance} />,
		'What The Hell Is It?': <WhatTheHellIsIt windowInstance={windowInstance} />,
		'Couples Conundrum': <CouplesConundrum windowInstance={windowInstance} />,
		ESP: <ESP windowInstance={windowInstance} />,
		'Card Sharks': <CardSharks />,
	};

	return (
		<ControlScreenContainer>
			{timeline === 'app-open' ? <LogoScreen /> : null}
			{timeline === 'in-game' ? components[currentGame.title] : null}
			<VideoPlayer windowInstance={windowInstance} />
		</ControlScreenContainer>
	);
}
