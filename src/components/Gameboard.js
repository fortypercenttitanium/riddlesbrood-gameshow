import React, { useEffect, createContext, useState } from 'react';
import ControlScreen from './ControlScreen';
import { initialState } from '../store';
const { ipcRenderer } = window.require('electron');

export const StoreContext = createContext();

export default function Gameboard() {
	const [state, setState] = useState(initialState);
	const store = { state, dispatch, playSound, stopSound };

	// dummy functions
	function dispatch() {
		return;
	}
	function playSound() {
		return;
	}
	function stopSound() {
		return;
	}

	useEffect(() => {
		ipcRenderer.on('SYNC_STATE', (e, state) => {
			setState(state);
		});
	}, []);

	useEffect(() => {
		window.addEventListener('click', clickHandler);
	}, []);

	const clickHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<StoreContext.Provider value={store}>
			<div
				style={{
					height: '100vh',
					width: '100vw',
					margin: '0',
					padding: '0',
					overflow: 'hidden',
					pointerEvents: 'none',
				}}
			>
				<ControlScreen window='gameboard' />
			</div>
		</StoreContext.Provider>
	);
}
