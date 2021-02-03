import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './components/MainComponents/App';
import Gameboard from './components/MainComponents/Gameboard';
import StartScreen from './components/SettingsComponent/StartScreen';

const Router = () => (
	<HashRouter>
		<Switch>
			<Route exact path='/' component={StartScreen} />
			<Route exact path='/play' component={App} />
			<Route exact path='/gameboard' component={Gameboard} />
		</Switch>
	</HashRouter>
);

export default Router;
