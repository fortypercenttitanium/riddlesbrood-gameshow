import React, { createContext, useState } from 'react';
import { config } from '../helpers/firebaseConfig';
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/analytics';

const FirebaseContext = createContext(null);

export default function FirebaseContextProvider({ children }) {
	if (!app.apps.length) {
		app.initializeApp(config);
	}

	return (
		<FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
	);
}

export { FirebaseContext };
