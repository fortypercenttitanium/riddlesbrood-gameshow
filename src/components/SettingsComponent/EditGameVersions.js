import React from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';

function EditGameVersions(props) {
	const { setTimeline } = props;
	const returnClick = () => {
		returnToEditSelect(setTimeline);
	};
	return (
		<div>
			<h1>Edit Game Versions</h1>
			<button onClick={returnClick}>Return to settings menu</button>
		</div>
	);
}

export default EditGameVersions;
