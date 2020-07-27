import React, { Component } from 'react';
import ControlScreen from './ControlScreen';

export class Gameboard extends Component {
	state = {
		timeline: 'app-open',
		VFX: {
			playing: false,
			file: '',
		},
		currentGame: {
			title: '',
			logo: '',
			// select game version
			version: null,
			winner: false,
		},
		timer: '',
		score: {
			type: '',
			scoreBoard: [0, 0, 0, 0],
		},
	};

	componentDidMount() {
		window.addEventListener('storage', this.localStorageUpdated);
	}

	localStorageUpdated = () => {
		this.setState({
			timeline: localStorage.getItem('timeline'),
			currentGame: JSON.parse(localStorage.getItem('currentGame')),
			VFX: JSON.parse(localStorage.getItem('VFX')),
			timer: JSON.parse(localStorage.getItem('timer')),
			score: JSON.parse(localStorage.getItem('score')),
		});
	};

	// dummy functions so clicking the screen won't throw an error
	setCurrentAnswer = (question) => {
		return;
	};

	endVideo = () => {
		return;
	};
	changeScore = () => {
		return;
	};
	setScoreType = () => {
		return;
	};

	setTimer = () => {
		return;
	};

	runTimer = () => {
		return;
	};

	killTimer = () => {
		return;
	};

	playSound = () => {
		return;
	};

	stopSound = () => {
		return;
	};

	pauseOrResumeSound = () => {
		return;
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
					window='gameboard'
					timeline={this.state.timeline}
					currentGame={this.state.currentGame}
					setAnswer={this.setCurrentAnswer}
					score={this.state.score}
					setScoreType={this.setScoreType}
					changeScore={this.changeScore}
					VFX={this.state.VFX}
					endVideo={this.endVideo}
					timer={this.state.timer}
					setTimer={this.setTimer}
					runTimer={this.runTimer}
					killTimer={this.killTimer}
					playSound={this.playSound}
					stopSound={this.stopSound}
					pauseOrResumeSound={this.pauseOrResumeSound}
				/>
			</div>
		);
	}
}

export default Gameboard;
