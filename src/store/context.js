import React, { createContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';
const { ipcRenderer } = window.require('electron');

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		ipcRenderer.on('SYNC_STATE', (e, action) => {
			dispatch(action);
		});
		return () => ipcRenderer.removeAllListeners('SYNC_STATE');
	}, []);
	function updateState(action) {
		if (action.hasOwnProperty('type')) {
			ipcRenderer.send('DISPATCH', action);
		} else {
			throw new Error(
				'Dispatch must be called with an action type, received: ' +
					action.toString()
			);
		}
	}
	return (
		<StoreContext.Provider value={{ state, dispatch: updateState }}>
			{children}
		</StoreContext.Provider>
	);
}
