import React, { useEffect, useState } from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';

function Cloud(props) {
	const { setTimeline } = props;
	const [cloudConnection, setCloudConnection] = useState(false);
	const [error, setErrors] = useState('');

	useEffect(() => {}, []);

	const returnClick = () => {
		returnToEditSelect(setTimeline);
	};
	return (
		<div>
			<h1>Import/export from cloud</h1>
			<button onClick={returnClick}>Return to settings menu</button>
		</div>
	);
}

export default Cloud;
