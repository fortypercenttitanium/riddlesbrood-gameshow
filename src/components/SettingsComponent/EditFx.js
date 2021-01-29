import React, { useState } from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';
const { ipcRenderer } = window.require('electron');

function EditFx({ setTimeline }) {
	const [name, setName] = useState('');
	const handleChangeName = (e) => {
		setName(e.target.value);
	};
	const returnClick = () => {
		returnToEditSelect(setTimeline);
	};
	function test() {
		ipcRenderer.send('NEW_FX_BUTTON', { payload: { name } });
	}
	return (
		<div>
			<h1>Edit FX</h1>
			<input type='text' value={name} onChange={handleChangeName} />
			<button onClick={test}>TEST ADD</button>
			<button onClick={returnClick}>Return to settings menu</button>
		</div>
	);
}

export default EditFx;
