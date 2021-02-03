import React, { useEffect, useRef, useContext } from 'react';
import { StyledApp, ControlScreenContainer } from './AppStyles';
import { StoreContext } from '../../store/context';
import ControlScreen from '../ControlComponents/ControlScreen/ControlScreen';
import GamesMenu from '../ControlComponents/GamesMenu/GamesMenu';
import ShowControls from '../ControlComponents/ShowControls/ShowControls';
import VolumeControls from '../ControlComponents/VolumeControls/VolumeControls';
import GameLogo from '../ControlComponents/GameLogo/GameLogo';
import FxButtons from '../ControlComponents/FxButtons/FxButtons';
import Scoreboard from '../ControlComponents/Scoreboard/Scoreboard';
import AnswerBlock from '../ControlComponents/AnswerBlock/AnswerBlock';
import GamesMenuModal from '../ControlComponents/GamesMenu/GamesMenuModal';
import { actions } from '../../store/actions';
import { useInterval } from '../../customHooks/useInterval';
import ReactAudioPlayer from 'react-audio-player';

const { ipcRenderer } = window.require('electron');

export function App() {
	const { state, dispatch } = useContext(StoreContext);

	useEffect(() => {
		projectorMode();
	}, []);

	useEffect(() => {
		console.log(state);
	}, [state]);

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
			<GamesMenu
				open={() => {
					dispatch({ type: 'OPEN_GAMES_MENU' });
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
		</StyledApp>
	);
}

export default App;
