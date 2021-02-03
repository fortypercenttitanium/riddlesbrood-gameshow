import React, { useEffect, createContext, useState } from 'react';
import ControlScreen from '../ControlComponents/ControlScreen/ControlScreen';
import { GameboardContainer } from './GameboardStyles';
import { initialState } from '../../store/initialState';
const { ipcRenderer } = window.require('electron');

export const StoreContext = createContext();

export default function Gameboard() {
	const [state, setState] = useState(initialState);
	const store = { state, dispatch };

	// dummy functions
	function dispatch() {
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
			<GameboardContainer>
				<ControlScreen window='gameboard' />
			</GameboardContainer>
		</StoreContext.Provider>
	);
}
