import React, { useReducer, useEffect, createContext, useRef } from 'react';
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
import { initialState, reducer } from './store';
import { actions } from './actions';
import { useInterval } from './customHooks/useInterval';

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

export const StoreContext = createContext();

export function App(props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		projectorMode();
	}, []);

	// update state with Gameboard through IPC
	useEffect(() => {
		ipcRenderer.send('UPDATE_STATE', state);
	});

	useInterval(
		() => {
			dispatch({ type: actions.TICK_TIMER });
			if (state.gameController.timer.tickSound) {
				playSound('sfx', state.gameController.timer.tickSound);
			}
		},
		state.gameController.timer.running ? 1000 : null
	);

	let audioPlayer = useRef();
	let audioPlayer2 = useRef();

	const setAudioPlayer = () => {
		const player = audioPlayer.current.paused
			? audioPlayer.current
			: audioPlayer2.current.paused
			? audioPlayer2.current
			: audioPlayer.current;
		return player;
	};

	const projectorMode = () => {
		ipcRenderer.send('REQUEST_PROJECTOR_MODE');
	};

	const getVolume = (type) => {
		return type === 'sfx'
			? (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
			: (state.audio.volume.master / 100) * (state.audio.volume.music / 100);
	};

	const playSound = (type, file) => {
		const player = setAudioPlayer();
		player.src = file;
		player.volume = getVolume(type);
		player.play().catch((err) => {
			console.log(err);
		});
	};

	const stopSound = () => {
		const player = audioPlayer.current.paused
			? audioPlayer2.current
			: audioPlayer.current;
		player.pause();
		player.load();
	};

	const store = {
		state,
		dispatch,
		playSound,
		stopSound,
	};

	return (
		<StyledApp>
			<StoreContext.Provider value={store}>
				<GamesMenu
					open={() => {
						store.dispatch({ type: 'OPEN_GAMES_MENU' });
					}}
				/>
				{state.gamesMenu.open && <GamesMenuModal store={store} />}
				<GameLogo logo={state.currentGame.logo} />
				<VolumeControls />
				<ShowControls projectorMode={projectorMode} />
				<FxButtons />
				<ControlScreenContainer>
					<ControlScreen window='controlPanel' />
				</ControlScreenContainer>
				<AnswerBlock />
				<Scoreboard />
				<audio ref={audioPlayer} />
				<audio ref={audioPlayer2} />
			</StoreContext.Provider>
		</StyledApp>
	);
}

export default App;
