import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { returnToEditSelect, returnToInit } from './helpers/timelines';
import { nanoid } from 'nanoid';
import { jeopardyVersions } from '../Games/versions/jeopardyVersions';
import { FirebaseContext } from './FirebaseProvider/FirebaseContext';

const Button = styled.button`
	padding: 1rem;
`;

function Cloud({ setTimeline }) {
	const [cloudConnection, setCloudConnection] = useState(false);
	const [errors, setErrors] = useState([]);
	const firebase = useContext(FirebaseContext);
	window.firebase = firebase;
	const database = firebase.database();
	const storage = firebase.storage();

	useEffect(() => {
		const connectedRef = database.ref('.info/connected');
		connectedRef.on('value', function (snap) {
			console.log(snap.val());
			if (snap.val()) {
				setCloudConnection(true);
			} else {
				setCloudConnection(false);
			}
		});
	}, [database]);

	const exportGameVersion = (gameName, data) => {
		if (database) {
			data.id = nanoid();
			const ref = database.ref(`gameVersions/${gameName}/${data.id}`);
			ref.set(data);
		} else {
			setErrors([{ msg: 'Database not connected' }]);
		}
	};

	const testGV = () => {
		const data = jeopardyVersions[2];
		exportGameVersion('jeopardy', data);
	};

	const returnClick = () => {
		returnToEditSelect(setTimeline);
	};
	return (
		<div>
			<h1>Import/export from cloud</h1>
			<div>
				<h2>Connection status: </h2>
				<p>{cloudConnection ? 'connected' : 'not connected'}</p>
			</div>
			{errors.length && (
				<div>
					<h2>Error: </h2>
					<ul>
						{errors.map((err) => {
							return <li> {err.msg} </li>;
						})}
					</ul>
				</div>
			)}
			<div>
				<h2>Game versions</h2>
				<Button disabled={!cloudConnection}>Import</Button>
				<Button onClick={testGV} disabled={!cloudConnection}>
					Export
				</Button>
			</div>
			<div>
				<h2>FX</h2>
				<Button disabled={!cloudConnection}>Import</Button>
				<Button disabled={!cloudConnection}>Export</Button>
			</div>
			<div>
				<h2>Splash Screens</h2>
				<Button disabled={!cloudConnection}>Import</Button>
				<Button disabled={!cloudConnection}>Export</Button>
			</div>
			<div>
				<button onClick={returnClick}>Return to settings menu</button>
			</div>
		</div>
	);
}

export default Cloud;
