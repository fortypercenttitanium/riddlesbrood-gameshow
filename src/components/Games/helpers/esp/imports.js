import initGame from '../shared/initGame';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../MainComponents/Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import { nextPrompt, previousPrompt } from './gameHelpers';

export {
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	nextPrompt,
	previousPrompt,
};
