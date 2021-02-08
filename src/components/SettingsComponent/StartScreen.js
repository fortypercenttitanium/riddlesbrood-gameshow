import React, { useState } from 'react';
import Init from './Init';
import EditSelect from './EditSelect';
import EditFx from './EditFx';
import EditGameVersions from './EditGameVersions';
import Cloud from './Cloud';
import FirebaseProvider from './FirebaseProvider/FirebaseContext';
import { StartScreenContainer } from './styles/StartScreenStyles';

function StartScreen() {
	const [timeline, setTimeline] = useState('init');

	const render = (timeline) => {
		return timeline === 'init' ? (
			<Init setTimeline={setTimeline} />
		) : timeline === 'edit-select' ? (
			<EditSelect setTimeline={setTimeline} />
		) : timeline === 'edit-fx' ? (
			<EditFx setTimeline={setTimeline} />
		) : timeline === 'edit-game-versions' ? (
			<EditGameVersions setTimeline={setTimeline} />
		) : timeline === 'cloud' ? (
			<Cloud setTimeline={setTimeline} />
		) : null;
	};

	return (
		<FirebaseProvider>
			<StartScreenContainer>{render(timeline)}</StartScreenContainer>
		</FirebaseProvider>
	);
}

export default StartScreen;
