import React, { useEffect, createContext, useReducer } from 'react';
import ControlScreen from '../ControlComponents/ControlScreen/ControlScreen';
import { GameboardContainer } from './GameboardStyles';
import { initialState } from '../../store/initialState';
import { reducer } from '../../store/reducer';
const { ipcRenderer } = window.require('electron');

export const StoreContext = createContext();

export default function Gameboard() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		ipcRenderer.on('SYNC_STATE', (e, newState) => {
			dispatch({ type: 'SET_STATE', payload: newState });
		});
		return () => ipcRenderer.removeAllListeners('SYNC_STATE');
	}, []);

	useEffect(() => {
		window.addEventListener('click', clickHandler);
	}, []);

	const clickHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<StoreContext.Provider value={{ state, dispatch: () => {} }}>
			<GameboardContainer>
				<ControlScreen windowInstance='gameboard' />
			</GameboardContainer>
		</StoreContext.Provider>
	);
}
