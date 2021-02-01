import React, { useContext } from 'react';
import VideoPlayer from './VideoPlayer';
import LogoScreen from './LogoScreen';
import * as Games from '../Games/gameComponents/gamesArray';
import { StoreContext as StoreContextCP } from '../../store/context';
import { StoreContext as StoreContextGB } from '../../Gameboard';

export default function ControlScreen({ window }) {
	let StoreContext;
	if (window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (window === 'gameboard') {
		StoreContext = StoreContextGB;
	}
	const { state } = useContext(StoreContext);

	const { currentGame, timeline, VFX } = state;

	const {
		Jeopardy,
		FamilyFeud,
		Pyramid,
		Wheel,
		NameThatTune,
		WhatTheHellIsIt,
		NewlywedGame,
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
		'Newlywed Game': <NewlywedGame window={window} />,
		'Couples Conundrum': <CouplesConundrum window={window} />,
		ESP: <ESP window={window} />,
		'Card Sharks': <CardSharks />,
	};

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				textAlign: 'center',
				border: '1px solid black',
				position: 'relative',
			}}
		>
			{timeline === 'app-open' ? <LogoScreen /> : null}
			{timeline === 'in-game' ? components[currentGame.title] : null}
			{VFX.playing && <VideoPlayer window={window} />}
		</div>
	);
}
