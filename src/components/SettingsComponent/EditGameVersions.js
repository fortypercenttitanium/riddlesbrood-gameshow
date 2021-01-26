import React, { useState } from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';

function EditGameVersions({ setTimeline }) {
	const [selectedGame, setSelectedGame] = useState('');
	const [formData, setFormData] = useState({});
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
