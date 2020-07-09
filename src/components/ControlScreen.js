import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import LogoScreen from './LogoScreen';
import * as Games from './Games/gamesArray';

const { Jeopardy, FamilyFeud, gamesArray } = Games;

export class ControlScreen extends Component {
	render() {
		const { currentGame, timeline } = this.props;
		const GameComponent = currentGame.title;
		const components = {
			Jeopardy: <Jeopardy />,
			'Family Feud': <FamilyFeud />,
		};

		return (
			<div
				style={{
					height: '100%',
					width: '100%',
					textAlign: 'center',
					border: '1px solid black',
				}}
			>
				{timeline === 'app-open' ? <LogoScreen /> : null}
				{timeline === 'in-game' ? components[GameComponent] : null}
			</div>
		);
	}
}

export default ControlScreen;
