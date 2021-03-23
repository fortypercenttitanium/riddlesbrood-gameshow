import React, { useContext } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import LogoScreen from '../LogoScreen/LogoScreen';
import { ControlScreenContainer } from './ControlScreenStyles';
import * as Games from '../../Games/helpers/shared/gamesArray';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';

export default function ControlScreen({ window }) {
	let StoreContext;

	if (window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (window === 'gameboard') {
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
		Jeopardy: <Jeopardy window={window} />,
		'Family Feud': <FamilyFeud window={window} />,
		'$25,000 Pyramid': <Pyramid window={window} />,
		'Wheel Of Fortune': <Wheel window={window} />,
		'Name That Tune': <NameThatTune window={window} />,
		'What The Hell Is It?': <WhatTheHellIsIt window={window} />,
		'Couples Conundrum': <CouplesConundrum window={window} />,
		ESP: <ESP window={window} />,
		'Card Sharks': <CardSharks />,
	};

	return (
		<ControlScreenContainer>
			{timeline === 'app-open' ? <LogoScreen /> : null}
			{timeline === 'in-game' ? components[currentGame.title] : null}
			<VideoPlayer window={window} />
		</ControlScreenContainer>
	);
}
