import {
  questionOpenSound,
  dailyDoubleSound,
  playSound,
  actions,
} from './imports';
import jeopardyReveal from '../../../../assets/sound_fx/jeopardy/jeopardy_reveal.mp3';
const { ipcRenderer } = window.require('electron');

const changeGameDisplay = (display, { dispatch, actions }) => {
  dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
};

const openQuestion = (
  question,
  categoryIndex,
  questionIndex,
  { state, dispatch, actions, sfxPlayer, musicPlayer, duckVolume },
) => {
  if (!question.completed) {
    duckVolume();
    const board = [...state.gameController.board];
    board[categoryIndex].questions[questionIndex].completed = true;
    dispatch({ type: actions.SET_QUESTION, payload: question });
    dispatch({ type: actions.SET_ANSWER, payload: question.answer });
    dispatch({ type: actions.SET_BOARD, payload: board });
    changeGameDisplay(question.dailyDouble ? 'daily-double' : 'question', {
      dispatch,
      actions,
    });
    if (question.dailyDouble) {
      playSound(dailyDoubleSound, 'sfx', {
        sfxPlayer,
        musicPlayer,
      });
    } else if (question.type === 'video') {
      ipcRenderer.send('PLAY_VIDEO_SEND', {
        file: question.question,
        isJeopardyQuestion: true,
      });
    } else {
      dispatch({ type: actions.SET_TIMER, payload: 15 });
      dispatch({ type: actions.RUN_TIMER });
      playSound(questionOpenSound, 'sfx', { sfxPlayer, musicPlayer });
    }
  }
};

const modalClick = ({
  state,
  dispatch,
  sfxPlayer,
  musicPlayer,
  restoreVolume,
}) => {
  if (state.gameController.display === 'daily-double') {
    if (state.gameController.currentQuestion.type === 'video') {
      dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'question' });
      ipcRenderer.send('PLAY_VIDEO_SEND', {
        file: state.gameController.currentQuestion.question,
        isJeopardyQuestion: true,
      });
    } else {
      changeGameDisplay('question', { dispatch, actions });
      playSound(questionOpenSound, 'sfx', { sfxPlayer, musicPlayer });
      dispatch({ type: actions.SET_TIMER, payload: 15 });
      dispatch({ type: actions.RUN_TIMER });
    }
  } else if (state.gameController.display === 'question') {
    dispatch({ type: actions.KILL_TIMER });
    playSound(jeopardyReveal, 'sfx', { sfxPlayer, musicPlayer });
    changeGameDisplay('answer', { dispatch, actions });
  } else {
    restoreVolume();
    changeGameDisplay('board', { dispatch, actions });
  }
};

export { modalClick, openQuestion };
