import React from 'react';
import { returnToInit } from './helpers/timelines';

function EditSelect(props) {
	const { setTimeline } = props;
	const handleFx = () => {
		setTimeline('edit-fx');
	};
	const handleSplash = () => {
		setTimeline('edit-splash');
	};
	const handleVersions = () => {
		setTimeline('edit-game-versions');
	};
	const handleCloud = () => {
		setTimeline('cloud');
	};
	const handleReturnHome = () => {
		returnToInit(setTimeline);
	};
	return (
		<div>
			<h1>What would you like to edit?</h1>
			<button onClick={handleFx}>Add/remove FX</button>
			<button onClick={handleSplash}>Splash screens</button>
			<button onClick={handleVersions}>Game versions</button>
			<button onClick={handleCloud}>Import/export to cloud</button>
			<button onClick={handleReturnHome}>Return to home screen</button>
		</div>
	);
}

export default EditSelect;
