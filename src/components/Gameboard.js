import React, { Component } from 'react';
import ControlScreen from './ControlScreen';

export class Gameboard extends Component {
	state = {
		timeline: 'app-open',
		currentGame: {
			title: '',
			logo: '',
			// select game version
			version: null,
			// players or team
			scoreType: '',
			score: {
				player1: 0,
				player2: 0,
				player3: 0,
				player4: 0,
			},
			winner: false,
		},
	};

	componentDidMount() {
		window.addEventListener('storage', this.localStorageUpdated);
	}

	localStorageUpdated = () => {
		this.setState({
			timeline: localStorage.getItem('timeline'),
			currentGame: JSON.parse(localStorage.getItem('currentGame')),
		});
	};

	render() {
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					margin: '0',
					padding: '0',
					overflow: 'hidden',
				}}
			>
				<ControlScreen
					timeline={this.state.timeline}
					currentGame={this.state.currentGame}
				/>
			</div>
		);
	}
}

export default Gameboard;
