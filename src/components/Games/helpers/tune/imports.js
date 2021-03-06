import initGame from '../shared/initGame';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../MainComponents/Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import {
	playPauseHandler,
	rewindHandler,
	toggleReveal,
	nextSong,
} from './gameHelpers';
import importAll from '../shared/importAll';
import playButton from '../../../../assets/images/game_images/shared/play-button.png';
import pauseButton from '../../../../assets/images/game_images/shared/pause-button.png';
import rewindButton from '../../../../assets/images/game_images/shared/rewind-button.png';

export {
	initGame,
	StoreContextGB,
	StoreContextCP,
	actions,
	ReactAudioPlayer,
	playPauseHandler,
	rewindHandler,
	toggleReveal,
	nextSong,
	importAll,
	playButton,
	pauseButton,
	rewindButton,
};
