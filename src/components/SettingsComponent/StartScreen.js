import React, { useState } from 'react';
import Init from './Init';
import EditSelect from './EditSelect';
import EditFx from './EditFx';
import EditSplash from './EditSplash';
import EditGameVersions from './EditGameVersions';
import Cloud from './Cloud';
import FirebaseProvider from './FirebaseProvider/FirebaseContext';
const { ipcRenderer } = window.require('electron');

function StartScreen() {
	const [timeline, setTimeline] = useState('init');

	const render = (timeline) => {
		return timeline === 'init' ? (
			<Init setTimeline={setTimeline} />
		) : timeline === 'edit-select' ? (
			<EditSelect setTimeline={setTimeline} />
		) : timeline === 'edit-fx' ? (
			<EditFx setTimeline={setTimeline} />
		) : timeline === 'edit-splash' ? (
			<EditSplash setTimeline={setTimeline} />
		) : timeline === 'edit-game-versions' ? (
			<EditGameVersions setTimeline={setTimeline} />
		) : timeline === 'cloud' ? (
			<Cloud setTimeline={setTimeline} />
		) : null;
	};

	const devTools = () => {
		ipcRenderer.send('TOGGLE_DEV_TOOLS');
	};

	return (
		<FirebaseProvider>
			{render(timeline)}
			<button onClick={devTools}>Dev tools</button>
		</FirebaseProvider>
	);
}

export default StartScreen;
