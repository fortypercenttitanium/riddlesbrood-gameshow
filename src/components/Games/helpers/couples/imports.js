import initGame from '../shared/initGame';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../MainComponents/Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import { nextQuestion, previousQuestion, toggleDisplay } from './gameHelpers';
import bgMusic from '../../../../assets/sound_fx/bg_music/couples.mp3';

export {
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	nextQuestion,
	previousQuestion,
	toggleDisplay,
	bgMusic,
};
