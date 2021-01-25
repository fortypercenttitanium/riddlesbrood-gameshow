import React from 'react';
const { ipcRenderer } = window.require('electron');

function Init(props) {
	const { setTimeline } = props;
	const handleLaunchClick = () => {
		ipcRenderer.send('LAUNCH_GAME');
	};
	const handleEditClick = () => {
		setTimeline('edit-select');
	};
	return (
		<div>
			<h1>Start Screen</h1>
			<button onClick={handleLaunchClick}>Start game</button>
			<button onClick={handleEditClick}>Edit content</button>
		</div>
	);
}

export default Init;
