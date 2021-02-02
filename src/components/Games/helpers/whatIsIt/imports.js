import initGame from '../shared/initGame';
import { stopAllSounds } from '../shared/audioHelpers';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../../Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';

export {
	initGame,
	stopAllSounds,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
};
