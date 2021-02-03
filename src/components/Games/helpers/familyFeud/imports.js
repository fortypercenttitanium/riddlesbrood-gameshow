import playSound from '../shared/audioHelpers';
import initGame from '../shared/initGame';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../MainComponents/Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import { correctHandler, incorrectHandler, revealAnswer } from './gameHelpers';

export {
	playSound,
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	correctHandler,
	incorrectHandler,
	revealAnswer,
};
