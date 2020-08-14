import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Gameboard from './Gameboard';

const Router = () => (
	<HashRouter>
		<Switch>
			<Route exact path='/' component={App} />
			<Route exact path='/gameboard' component={Gameboard} />
		</Switch>
	</HashRouter>
);

export default Router;
