import {
	renderPuzzle,
	setCategorySolved,
	clickHandlerCategory,
	setQuestionCallback,
	checkLettersCallback,
	guessLetterCallback,
	activateLetterCellsCallback,
	keyPressCallback,
	solvePuzzle,
	returnHandler,
} from './gameHelpers';
import initGame from '../shared/initGame';
import playSound from '../shared/audioHelpers';
import ScoreOverlay from '../../gameComponents/ScoreOverlay';
import ScoreComponent from './ScoreComponent';
import { StoreContext as StoreContextCP } from '../../../../store/context';
import { StoreContext as StoreContextGB } from '../../../MainComponents/Gameboard';
import { actions } from '../../../../store/actions';
import ReactAudioPlayer from 'react-audio-player';
import wheelBuzzer from '../../../../assets/sound_fx/wheel/wheelbuzzer.mp3';
import wheelDing from '../../../../assets/sound_fx/wheel/wheelding.mp3';

export {
	renderPuzzle,
	initGame,
	playSound,
	StoreContextCP,
	StoreContextGB,
	actions,
	ReactAudioPlayer,
	setCategorySolved,
	clickHandlerCategory,
	setQuestionCallback,
	checkLettersCallback,
	guessLetterCallback,
	activateLetterCellsCallback,
	keyPressCallback,
	solvePuzzle,
	returnHandler,
	wheelBuzzer,
	wheelDing,
	ScoreOverlay,
	ScoreComponent,
};
