import React from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';
const { ipcRenderer } = window.require('electron');

function EditFx({ setTimeline }) {
	const returnClick = () => {
		returnToEditSelect(setTimeline);
	};
	function test() {
		const obj = {
			title: 'Version 1',
			rating: 'r',
			content: [
				'What did he wear on the first date?',
				"Who's the better kisser?",
				'What is their star sign?',
				"What's their weirded quirk?",
				"Who said 'I love you' first?",
			],
		};
		ipcRenderer.send('STORE_APP_DATA', 'game_version', 'test', obj);
	}
	return (
		<div>
			<h1>Edit FX</h1>
			<button onClick={test}>TEST</button>
			<button onClick={returnClick}>Return to settings menu</button>
		</div>
	);
}

export default EditFx;
