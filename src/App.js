import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import ControlScreen from './components/ControlScreen';
import GamesMenu from './components/GamesMenu/GamesMenu';
import ShowControls from './components/ShowControls';
import VolumeControls from './components/VolumeControls/VolumeControls';
import GameLogo from './components/GameLogo';
import FxButtons from './components/FxButtons';
import Scoreboard from './components/Scoreboard/Scoreboard';
import AnswerBlock from './components/AnswerBlock';
import GamesMenuModal from './components/GamesMenu/GamesMenuModal';

const { ipcRenderer } = window.require('electron');

const StyledApp = styled.div`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(10, 1fr);
`;

const ControlScreenContainer = styled.div`
	width: 1050px;
	height: 590px;
	grid-area: 1 / 4 / 7 / 11;
	margin: auto;
`;

export class App extends Component {
	state = {
		// where we are in the show
		timeline: 'app-open',
		gamesMenuOpen: false,
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
		audio: {
			volume: {
				master: 75,
				music: 75,
				sfx: 75,
			},
		},
		currentAnswer: '',
		fxButtons: [
			{
				name: 'ding',
				path: 'soundfx/ding.wav',
				type: 'audio',
			},
			{
				name: 'buzzer',
				path: 'soundfx/buzzer.mp3',
				type: 'audio',
			},
			{
				name: 'oh yeah',
				path: 'soundfx/ohyeah.wav',
				type: 'audio',
			},
			{
				name: 'tick tock',
				path: 'soundfx/ticktock.wav',
				type: 'audio',
			},
			{
				name: 'wood block',
				path: 'soundfx/woodblock.wav',
				type: 'audio',
			},
			{
				name: null,
				path: null,
				type: null,
			},
			{
				name: null,
				path: null,
				type: null,
			},
			{
				name: null,
				path: null,
				type: null,
			},
			{
				name: null,
				path: null,
				type: null,
			},
		],
	};

	componentDidMount() {
		localStorage.setItem('timeline', 'app-open');
		localStorage.setItem(
			'currentGame',
			JSON.stringify({
				title: '',
				logo: '',
				version: null,
				scoreType: '',
			})
		);
		window.addEventListener('storage', this.localStorageUpdated);
		this.projectorMode();
	}

	projectorMode = () => {
		ipcRenderer.send('REQUEST_PROJECTOR_MODE');
	};

	changeVolume = (type, level, prevState) => {
		this.setState({
			audio: {
				volume: {
					...prevState,
					[type]: level,
				},
			},
		});
	};

	setCurrentAnswer(answer) {
		this.setState({
			currentAnswer: answer,
		});
	}

	toggleGamesMenu = () => {
		this.setState({
			gamesMenuOpen: !this.state.gamesMenuOpen,
		});
	};

	setGame = (game) => {
		localStorage.setItem('currentGame', JSON.stringify(game));
		localStorage.setItem('timeline', 'in-game');
		this.localStorageUpdated();
	};

	localStorageUpdated = () => {
		this.setState({
			timeline: localStorage.getItem('timeline'),
			currentGame: JSON.parse(localStorage.getItem('currentGame')),
		});
	};

	render() {
		return (
			<StyledApp>
				<GamesMenu toggleGamesMenu={this.toggleGamesMenu} />
				<GamesMenuModal
					open={this.state.gamesMenuOpen}
					close={this.toggleGamesMenu}
					setGame={this.setGame}
				/>
				<GameLogo logo={this.state.currentGame.logo} />
				<VolumeControls
					volume={this.state.audio.volume}
					changeVolume={this.changeVolume}
				/>
				<ShowControls projectorMode={this.projectorMode} />
				<FxButtons
					buttons={this.state.fxButtons}
					volume={
						(this.state.audio.volume.master / 100) *
						(this.state.audio.volume.sfx / 100)
					}
				/>
				<ControlScreenContainer>
					<ControlScreen
						timeline={this.state.timeline}
						currentGame={this.state.currentGame}
					/>
				</ControlScreenContainer>
				<AnswerBlock answer={this.state.currentAnswer} />
				<Scoreboard currentGame={this.state.currentGame} />
			</StyledApp>
		);
	}
}

export default App;
