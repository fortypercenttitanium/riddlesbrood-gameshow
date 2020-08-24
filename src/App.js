import React, { useReducer, useEffect, createContext, useRef } from 'react';
import './App.css';
import styled from 'styled-components';
import ControlScreen from './components/ControlComponents/ControlScreen';
import GamesMenu from './components/ControlComponents/GamesMenu/GamesMenu';
import ShowControls from './components/ControlComponents/ShowControls';
import VolumeControls from './components/ControlComponents/VolumeControls/VolumeControls';
import GameLogo from './components/ControlComponents/GameLogo';
import FxButtons from './components/ControlComponents/FxButtons';
import Scoreboard from './components/ControlComponents/Scoreboard/Scoreboard';
import AnswerBlock from './components/ControlComponents/AnswerBlock';
import GamesMenuModal from './components/ControlComponents/GamesMenu/GamesMenuModal';
import { initialState, reducer } from './store';
import { actions } from './actions';
import { useInterval } from './customHooks/useInterval';
import * as versions from './components/Games/versions/gameVersions';
import ReactAudioPlayer from 'react-audio-player';

const { ipcRenderer } = window.require('electron');

const StyledApp = styled.div`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-template-rows: repeat(10, 1fr);
	background: rgb(212, 212, 212);
	background: linear-gradient(
		90deg,
		rgba(212, 212, 212, 1) 0%,
		rgba(177, 180, 194, 1) 8%,
		rgba(171, 175, 186, 1) 83%,
		rgba(199, 199, 199, 1) 100%
	);
`;

const ControlScreenContainer = styled.div`
	width: 912px;
	height: 513px;
	grid-area: 1 / 4 / 7 / 11;
	margin: auto;
`;

export const StoreContext = createContext();

export function App(props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		projectorMode();
	}, []);

	useEffect(() => {
		ipcRenderer.on('FX_BUTTON_RECEIVE', (e, fxFile) => {
			const { index, name, file, type } = fxFile;
			const button = {
				name,
				file,
				type,
			};
			const newButtons = state.fxButtons;
			newButtons[index] = button;
			dispatch({ type: actions.CHANGE_FX_BUTTONS, payload: newButtons });
		});
		return () => {
			ipcRenderer.removeAllListeners('FX_BUTTON_RECEIVE');
		};
	}, [dispatch, state.fxButtons]);

	// update state with Gameboard through IPC
	useEffect(() => {
		ipcRenderer.send('UPDATE_STATE', state);
	});

	useInterval(
		() => {
			dispatch({ type: actions.TICK_TIMER });
			if (state.gameController.timer.tickSound) {
				playSound(state.gameController.timer.tickSound);
			}
		},
		state.gameController.timer.running ? 1000 : null
	);

	let musicPlayer = useRef();
	let sfxPlayer = useRef();

	const toggleDevTools = () => {
		ipcRenderer.send('TOGGLE_DEV_TOOLS');
	};

	const projectorMode = () => {
		ipcRenderer.send('REQUEST_PROJECTOR_MODE');
	};

	const changeFX = (index) => {
		ipcRenderer.send('FX_BUTTON_SELECT', index);
	};

	const playSound = (file, type = 'sfx') => {
		console.log(true);
		const player =
			type === 'sfx'
				? sfxPlayer.current.audioEl.current
				: musicPlayer.current.audioEl.current;
		player.src = file;
		player.play().catch((err) => {
			console.log(err);
		});
	};

	// const stopSound = () => {
	// 	const player = musicPlayer.current.audioEl.current.paused
	// 		? sfxPlayer.current.audioEl.current
	// 		: musicPlayer.current.audioEl.current;
	// 	player.pause();
	// 	player.load();
	// };

	const store = {
		state,
		dispatch,
	};

	//	dev to work on game
	// useEffect(() => {
	// 	dispatch({
	// 		type: 'SET_GAME',
	// 		payload: {
	// 			title: 'Newlywed Game',
	// 			logo: 'NewlywedLogo.jpg',
	// 			version: 0,
	// 		},
	// 	});
	// }, []);

	return (
		<StyledApp>
			<StoreContext.Provider value={store}>
				<GamesMenu
					open={() => {
						store.dispatch({ type: 'OPEN_GAMES_MENU' });
					}}
				/>
				{state.gamesMenu.open && <GamesMenuModal />}
				<GameLogo logo={state.currentGame.logo} />
				<VolumeControls />
				<ShowControls projectorMode={projectorMode} />
				<FxButtons toggleDevTools={toggleDevTools} changeFX={changeFX} />
				<ControlScreenContainer>
					<ControlScreen window='controlPanel' />
				</ControlScreenContainer>
				<AnswerBlock />
				<Scoreboard playSound={playSound} />
				<ReactAudioPlayer
					ref={musicPlayer}
					volume={
						(state.audio.volume.master / 100) * (state.audio.volume.music / 100)
					}
				/>
				<ReactAudioPlayer
					ref={sfxPlayer}
					volume={
						(state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
					}
				/>
			</StoreContext.Provider>
		</StyledApp>
	);
}

export default App;
