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
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}
