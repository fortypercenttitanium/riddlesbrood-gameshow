import initGame from '../shared/initGame';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../MainComponents/Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import {
	nextQuestion,
	previousQuestion,
	toggleDisplay,
	changeRound,
} from './gameHelpers';
import bgMusic from '../../../../assets/sound_fx/bg_music/couples.mp3';
import round1Video from '../../../../assets/videos/couples/round_1.mp4';
import round2Video from '../../../../assets/videos/couples/round_2.mp4';

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
	round1Video,
	round2Video,
	changeRound,
};
