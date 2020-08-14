import React, { useContext } from 'react';
import VideoPlayer from './VideoPlayer';
import LogoScreen from './LogoScreen';
import * as Games from '../Games/gameComponents/gamesArray';
import { StoreContext as StoreContextCP } from '../../App';
import { StoreContext as StoreContextGB } from '../../Gameboard';

export default function ControlScreen(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}
	const { state, dispatch } = useContext(StoreContext);

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
		Jeopardy: <Jeopardy window={props.window} />,
		'Family Feud': <FamilyFeud window={props.window} />,
		'$25,000 Pyramid': <Pyramid window={props.window} />,
		'Wheel Of Fortune': <Wheel window={props.window} />,
		'Name That Tune': <NameThatTune window={props.window} />,
		'What The Hell Is It?': <WhatTheHellIsIt window={props.window} />,
		'Newlywed Game': <NewlywedGame window={props.window} />,
		'Couples Conundrum': <CouplesConundrum window={props.window} />,
		ESP: <ESP window={props.window} />,
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
			{VFX.playing && (
				<VideoPlayer
					window={props.window}
					file={VFX.file}
					onEnded={() => {
						dispatch({ type: 'END_VIDEO' });
					}}
				/>
			)}
		</div>
	);
}
