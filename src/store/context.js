import React, { createContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';
const { ipcRenderer } = window.require('electron');

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		ipcRenderer.send('DISPATCH', state);
	}, [state]);
	// useEffect(() => {
	// 	ipcRenderer.on('SYNC_STATE', (e, newState) => {
	// 		dispatch({ type: 'SET_STATE', payload: newState });
	// 	});
	// 	return () => ipcRenderer.removeAllListeners('SYNC_STATE');
	// }, []);
	// function updateState(action) {
	// 	if (action.hasOwnProperty('type')) {

	// 		ipcRenderer.send('DISPATCH', newState);
	// 	} else {
	// 		throw new Error(
	// 			'Dispatch must be called with an action type, received: ' +
	// 				action.toString()
	// 		);
	// 	}
	// }
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}
