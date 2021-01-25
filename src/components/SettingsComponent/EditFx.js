import React from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';

function EditFx(props) {
	const { setTimeline } = props;
	const returnClick = () => {
		returnToEditSelect(setTimeline);
	};
	return (
		<div>
			<h1>Edit FX</h1>
			<button onClick={returnClick}>Return to settings menu</button>
		</div>
	);
}

export default EditFx;
