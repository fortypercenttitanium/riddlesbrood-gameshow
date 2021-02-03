import playSound from '../shared/audioHelpers';
import initGame from '../shared/initGame';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../../Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import tickSound from '../../../../assets/sound_fx/shared/beep.mp3';
import buzzer from '../../../../assets/sound_fx/shared/buzzer.mp3';
import ohYeah from '../../../../assets/fx_buttons/ohyeah.wav';
import pyramidBell from '../../../../assets/sound_fx/pyramid/pyramidbell.mp3';
import {
	setCategoryCompleted,
	changeGameDisplay,
	setActiveTeam,
	setCurrentQuestion,
	setCorrectCounter,
	incrementStreak,
	resetStreak,
	addBonusTime,
	clickHandlerCategory,
	checkIfRoundOver,
	nextQuestion,
	correctHandler,
	incorrectHandler,
} from './gameHelpers';

export {
	playSound,
	initGame,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	tickSound,
	buzzer,
	ohYeah,
	pyramidBell,
	setCategoryCompleted,
	changeGameDisplay,
	setActiveTeam,
	setCurrentQuestion,
	setCorrectCounter,
	incrementStreak,
	resetStreak,
	addBonusTime,
	clickHandlerCategory,
	checkIfRoundOver,
	nextQuestion,
	correctHandler,
	incorrectHandler,
};
