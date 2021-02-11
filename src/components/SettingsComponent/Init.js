import React, { useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function Init({ setTimeline, setTitle }) {
	useEffect(() => {
		setTitle('Edit Game Content');
	}, [setTitle]);

	const handleLaunchClick = () => {
		ipcRenderer.send('LAUNCH_GAME');
	};
	const handleEditClick = () => {
		setTimeline('edit-select');
	};
	return (
		<div>
			<button onClick={handleLaunchClick}>Start game</button>
			<button onClick={handleEditClick}>Edit content</button>
		</div>
	);
}

export default Init;
