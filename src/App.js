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
import ReactAudioPlayer from 'react-audio-player';

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
		gamesMenu: {
			open: false,
			timeline: '',
			selectedGame: '',
		},
		score: {
			type: '',
			scoreBoard: [0, 0, 0, 0],
		},
		currentGame: {
			title: '',
			logo: '',
			// select game version
			version: null,
			winner: false,
		},
		audio: {
			volume: {
				master: 75,
				music: 75,
				sfx: 75,
			},
		},
		VFX: {
			playing: false,
			file: '',
		},
		currentAnswer: '',
		timer: '',
		fxButtons: [
			{
				name: 'ding',
				file: 'ding.wav',
				type: 'audio',
			},
			{
				name: 'buzzer',
				file: 'buzzer.mp3',
				type: 'audio',
			},
			{
				name: 'oh yeah',
				file: 'ohyeah.wav',
				type: 'audio',
			},
			{
				name: 'tick tock',
				file: 'ticktock.wav',
				type: 'audio',
			},
			{
				name: 'wood block',
				file: 'woodblock.wav',
				type: 'audio',
			},
			{
				name: 'sample video',
				file: 'samplevfx.mp4',
				type: 'video',
			},
			{
				name: 'excellent',
				file: 'excellent.mov',
				type: 'video',
			},
			{
				name: null,
				file: null,
				type: null,
			},
			{
				name: null,
				file: null,
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
			})
		);
		localStorage.setItem('score', JSON.stringify(this.state.score));
		localStorage.setItem('VFX', JSON.stringify({ playing: false, file: '' }));
		localStorage.setItem('timer', null);
		window.addEventListener('storage', this.localStorageUpdated);
		this.projectorMode();
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

	setScoreType = (playerOrTeam, number) => {
		// create array with length of number of players/teams, set score to 0
		const scoreBoardArr = [];
		for (let i = 0; i < number; i++) {
			scoreBoardArr[i] = 0;
		}
		const scoreObject = {
			type: playerOrTeam,
			scoreBoard: scoreBoardArr,
		};
		localStorage.setItem('score', JSON.stringify(scoreObject));
		this.localStorageUpdated();
	};

	changeScore = (playerIndex, amount) => {
		const score = this.state.score;
		score.scoreBoard[playerIndex] = score.scoreBoard[playerIndex] + amount;
		localStorage.setItem('score', JSON.stringify(score));
		this.localStorageUpdated();
	};

	setCurrentAnswer = (answer) => {
		this.setState({
			currentAnswer: answer,
		});
	};

	setTimer = (time) => {
		localStorage.setItem('timer', JSON.stringify(time));
		this.localStorageUpdated();
	};

	runTimer = () => {
		const timer = setInterval(() => {
			if (this.state.timer !== '') {
				this.setTimer(this.state.timer - 1);
				if (this.state.timer <= 0) {
					this.killTimer();
					clearInterval(timer);
				}
			} else {
				clearInterval(timer);
			}
		}, 1000);
	};

	killTimer = () => {
		this.setTimer('');
	};

	playSound = (type, file) => {
		const player = this.refs.rap.audioEl.current.paused
			? this.refs.rap.audioEl.current
			: this.refs.rap2.audioEl.current;
		player.src = file;
		type === 'sfx'
			? (player.volume =
					(this.state.audio.volume.master / 100) *
					(this.state.audio.volume.sfx / 100))
			: (player.volume =
					(this.state.audio.volume.master / 100) *
					(this.state.audio.volume.music / 100));
		player.play();
	};

	stopSound = () => {
		this.refs.rap.audioEl.current.pause();
		this.refs.rap.audioEl.current.load();
	};

	pauseOrResumeSound = () => {
		this.refs.rap.audioEl.current.paused
			? this.refs.rap.audioEl.current.play()
			: this.refs.rap.audioEl.current.pause();
	};

	playVideo = (file) => {
		const playingState = {
			playing: true,
			file: file,
		};
		localStorage.setItem('VFX', JSON.stringify(playingState));
		this.localStorageUpdated();
	};

	endVideo = () => {
		const endPlayingState = {
			playing: false,
			file: '',
		};
		localStorage.setItem('VFX', JSON.stringify(endPlayingState));
		this.localStorageUpdated();
	};

	toggleGamesMenu = () => {
		this.setState((prevState) => {
			return {
				gamesMenu: {
					open: !prevState.gamesMenu.open,
					timeline: 'gamesMenu',
				},
			};
		});
	};

	goToVersionSelect = (game) => {
		this.setState({
			gamesMenu: {
				open: true,
				timeline: 'versionSelect',
				selectedGame: game,
			},
		});
	};

	setGame = (game) => {
		localStorage.setItem('currentGame', '{}');
		localStorage.setItem('timeline', '');
		this.localStorageUpdated();
		localStorage.setItem('currentGame', JSON.stringify(game));
		localStorage.setItem('timeline', 'in-game');
		this.localStorageUpdated();
	};

	render() {
		return (
			<StyledApp>
				<GamesMenu toggleGamesMenu={this.toggleGamesMenu} />
				<GamesMenuModal
					open={this.state.gamesMenu.open}
					close={this.toggleGamesMenu}
					selectedGame={this.state.gamesMenu.selectedGame}
					timeline={this.state.gamesMenu.timeline}
					setGame={this.setGame}
					goToVersionSelect={this.goToVersionSelect}
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
					playVideo={this.playVideo}
				/>
				<ControlScreenContainer>
					<ControlScreen
						window='controlPanel'
						timeline={this.state.timeline}
						currentGame={this.state.currentGame}
						setAnswer={this.setCurrentAnswer}
						VFX={this.state.VFX}
						endVideo={this.endVideo}
						sfxVolume={
							(this.state.audio.volume.master / 100) *
							(this.state.audio.volume.sfx / 100)
						}
						setScoreType={this.setScoreType}
						changeScore={this.changeScore}
						score={this.state.score}
						timer={this.state.timer}
						setTimer={this.setTimer}
						runTimer={this.runTimer}
						killTimer={this.killTimer}
						playSound={this.playSound}
						stopSound={this.stopSound}
						pauseOrResumeSound={this.pauseOrResumeSound}
					/>
				</ControlScreenContainer>
				<AnswerBlock
					answer={this.state.currentAnswer}
					timer={this.state.timer}
				/>
				<Scoreboard
					score={this.state.score}
					scoreType={this.state.scoreType}
					changeScore={this.changeScore}
				/>
				<ReactAudioPlayer ref={'rap'} />
				<ReactAudioPlayer ref={'rap2'} />
			</StyledApp>
		);
	}
}

export default App;
