import initGame from '../shared/initGame';
import { stopAllSounds } from '../shared/audioHelpers';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../../Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import {
	playPauseHandler,
	clearBlocks,
	toggleTitleReveal,
	resetBlocks,
	nextPicture,
	revealHandleCallback,
} from './gameHelpers';
import veilImage from '../../../../assets/images/game_images/what_is_it/veil.png';
import importAll from '../shared/importAll';
import playButton from '../../../../assets/images/game_images/shared/play-button.png';
import pauseButton from '../../../../assets/images/game_images/shared/pause-button.png';

export {
	initGame,
	stopAllSounds,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	playPauseHandler,
	clearBlocks,
	toggleTitleReveal,
	resetBlocks,
	nextPicture,
	revealHandleCallback,
	veilImage,
	importAll,
	playButton,
	pauseButton,
};
