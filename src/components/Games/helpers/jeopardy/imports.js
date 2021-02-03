import questionOpenSound from '../../../../assets/sound_fx/open.wav';
import timeUpSound from '../../../../assets/sound_fx/jeopardytimeup.mp3';
import dailyDoubleSound from '../../../../assets/sound_fx/dailydoublesound.mp3';
import dailyDoubleImage from '../../../../assets/images/game_images/jeopardy/dailydouble.png';
import initGame from '../shared/initGame';
import playSound from '../shared/audioHelpers';
import importAll from '../shared/importAll';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../../Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import { modalClick, openQuestion } from './gameHelpers';

export {
	questionOpenSound,
	timeUpSound,
	dailyDoubleSound,
	dailyDoubleImage,
	initGame,
	playSound,
	StoreContextCP,
	StoreContextGB,
	actions,
	importAll,
	ReactAudioPlayer,
	modalClick,
	openQuestion,
};
