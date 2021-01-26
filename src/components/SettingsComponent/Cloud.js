import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { returnToEditSelect, returnToInit } from './helpers/timelines';
import { nanoid } from 'nanoid';
import { jeopardyVersions } from '../Games/versions/jeopardyVersions';
import { FirebaseContext } from './FirebaseProvider/FirebaseContext';
const { ipcRenderer } = window.require('electron');

const Button = styled.button`
	padding: 1rem;
`;

function Cloud({ setTimeline }) {
	const [cloudConnection, setCloudConnection] = useState(false);
	const [errors, setErrors] = useState([]);
	const [file, setFile] = useState('');
	const [fileName, setFileName] = useState('');
	const [lockButtons, setLockButtons] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const firebase = useContext(FirebaseContext);
	window.firebase = firebase;
	const database = firebase.database();
	const storage = firebase.storage();

	useEffect(() => {
		const connectedRef = database.ref('.info/connected');
		connectedRef.on('value', function (snap) {
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

	const exportMedia = (type, nameWithExt, file) => {
		if (type !== 'splash_screen' && type !== 'fx_button') {
			throw new Error('Type must be splash_screen or fx_button.');
		}
		if (!nameWithExt.includes('.')) {
			throw new Error('Name must include file extension.');
		}
		if (!file instanceof File) {
			throw new Error('File must be of type File.');
		}
		setLockButtons(true);
		const ref = storage.ref().child(`${type}s/${nameWithExt}`);
		const task = ref.put(file);
		task.on(
			'state_changed',
			(snap) => {
				setUploadProgress(
					Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
				);
			},
			(err) => {
				console.log(err);
				ipcRenderer.send('ERROR_BOX', {
					title: err.name,
					message: err.customData,
				});
				setTimeout(() => {
					setLockButtons(false);
				}, 1000);
			},
			() => {
				ipcRenderer.send('MESSAGE_BOX', {
					title: 'Success',
					message: 'File successfully uploaded.',
				});
				setFileName('');
				setFile(undefined);
				setTimeout(() => {
					setLockButtons(false);
				}, 1000);
			}
		);
	};

	const fileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const fileNameChange = (e) => {
		setFileName(e.target.value);
	};

	const upload = (e) => {
		e.preventDefault();
		if (fileName) {
			const ext = file.name.split('.').pop();
			if (!['mp4', 'mp3', 'wav'].includes(ext)) {
				throw new Error('File must be of type mp4, mp3, wav');
			}
			exportMedia('fx_button', `${fileName}.${ext}`, file);
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
				<Button disabled={!cloudConnection || lockButtons}>Import</Button>
				<Button onClick={testGV} disabled={!cloudConnection || lockButtons}>
					Export
				</Button>
			</div>
			<div>
				<h2>FX</h2>
				<Button disabled={!cloudConnection || lockButtons}>Import</Button>
				<input type='file' onChange={fileChange} />
				<input type='text' onChange={fileNameChange} value={fileName} />
				<Button disabled={!cloudConnection || lockButtons} onClick={upload}>
					Export
				</Button>
				{lockButtons && <p>Uploading ({uploadProgress + '%'})</p>}
			</div>
			<div>
				<h2>Splash Screens</h2>
				<Button disabled={!cloudConnection || lockButtons}>Import</Button>
				<Button disabled={!cloudConnection || lockButtons}>Export</Button>
			</div>
			<div>
				<button onClick={returnClick}>Return to settings menu</button>
			</div>
		</div>
	);
}

export default Cloud;
