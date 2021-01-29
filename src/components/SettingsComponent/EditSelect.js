import React from 'react';
import { returnToInit } from './helpers/timelines';

function EditSelect({ setTimeline }) {
	const handleFx = () => {
		setTimeline('edit-fx');
	};
	const handleVersions = () => {
		setTimeline('edit-game-versions');
	};
	const handleReturnHome = () => {
		returnToInit(setTimeline);
	};
	return (
		<div>
			<h1>What would you like to edit?</h1>
			<button onClick={handleFx}>Add/remove FX</button>
			<button onClick={handleVersions}>Game versions</button>
			<button onClick={handleReturnHome}>Return to home screen</button>
		</div>
	);
}

export default EditSelect;
