import playSound from '../shared/audioHelpers';
import { pyramidBell, ponziPassBuzz } from './imports';
import tickSound from '../../../../assets/sound_fx/shared/Time countdown.mp3';
import bonus1 from '../../../../assets/videos/ponzi/bonus1.mp4';
import bonus2 from '../../../../assets/videos/ponzi/bonus2.mp4';
const { ipcRenderer } = window.require('electron');

const playVideo = (file) => {
  ipcRenderer.send('PLAY_VIDEO_SEND', {
    file,
  });
};

const changeGameDisplay = (display, { dispatch, actions }) => {
  dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: display });
};

const setActiveTeam = (team, { dispatch, actions }) => {
  dispatch({ type: actions.SET_ACTIVE_TEAM, payload: team });
};

const setCurrentQuestion = (question, { dispatch, actions }) => {
  dispatch({ type: 'SET_ANSWER', payload: question.words[question.index] });
  dispatch({ type: actions.SET_QUESTION, payload: question });
};

const incrementStreak = ({ dispatch, actions }) => {
  dispatch({ type: actions.INCREMENT_STREAK });
};

const resetStreak = ({ dispatch, actions }) => {
  dispatch({ type: actions.RESET_STREAK });
};

const addBonusTime = (seconds, { dispatch, actions, state }) => {
  dispatch({ type: 'PAUSE_TIMER' });
  if (seconds !== 5 && seconds !== 10)
    throw new Error(
      'Please select 5 or 10 seconds to add, or add another bonus video!',
    );
  const video = seconds === 5 ? bonus1 : bonus2;
  playVideo(video);

  setTimeout(() => {
    dispatch({
      type: actions.SET_TIMER,
      payload: state.gameController.timer.time + seconds,
    });

    dispatch({ type: actions.RUN_TIMER });
  }, 5000);
};

const clickHandlerCategory = (question, { state, dispatch }) => {
  if (state.gameController.currentQuestion) return;
  // set the round length in seconds
  const ROUND_LENGTH = 90;
  if (state.gameController.activeTeam !== 0) {
    const currentQuestion = {
      category: question.category,
      words: question.words,
      index: 0,
    };

    dispatch({
      type: 'START_PONZI_ROUND',
      payload: { roundLength: ROUND_LENGTH, currentQuestion, tickSound },
    });
  } else {
    alert('Please select the active team by clicking their score box.');
  }
};

const endRound = ({ dispatch }) => {
  // playVideo(endRoundVideo);
  dispatch({ type: 'END_PONZI_ROUND' });
};

const checkIfRoundOver = ({ state, dispatch }) => {
  if (
    state.gameController.currentQuestion.index ===
    state.gameController.currentQuestion.words.length - 1
  ) {
    endRound({ dispatch });
    return true;
  } else return false;
};

const nextQuestion = ({ state, dispatch, actions }) => {
  if (!checkIfRoundOver({ state, dispatch, actions })) {
    setCurrentQuestion(
      {
        category: state.gameController.currentQuestion.category,
        words: state.gameController.currentQuestion.words,
        index: state.gameController.currentQuestion.index + 1,
      },
      { dispatch, actions },
    );
  }
};

const correctHandler = (
  team,
  { dispatch, actions, state, sfxPlayer, musicPlayer },
) => {
  const { streak } = state.gameController;
  const newStreak = streak + 1;
  const STREAK_FIRST_BONUS = 7;
  const STREAK_BONUS_INTERVAL = 5;
  const BONUS_TIME_VALUE = 5;

  if (newStreak >= STREAK_FIRST_BONUS) {
    if ((newStreak - STREAK_FIRST_BONUS) % STREAK_BONUS_INTERVAL === 0) {
      const bonusTimeMultiplier = newStreak - STREAK_FIRST_BONUS === 0 ? 1 : 2;
      const bonusTime = BONUS_TIME_VALUE * bonusTimeMultiplier;

      addBonusTime(bonusTime, {
        dispatch,
        actions,
        state,
        sfxPlayer,
        musicPlayer,
      });
    } else {
      playSound(pyramidBell, 'sfx', {
        sfxPlayer,
        musicPlayer,
      });
    }
  } else {
    playSound(pyramidBell, 'sfx', {
      sfxPlayer,
      musicPlayer,
    });
  }

  incrementStreak({ dispatch, actions });
  nextQuestion({ state, dispatch, actions });
  dispatch({
    type: actions.CHANGE_SCORE,
    payload: { playerIndex: team - 1, amount: 1 },
  });
};

const incorrectHandler = ({
  state,
  dispatch,
  actions,
  sfxPlayer,
  musicPlayer,
}) => {
  playSound(ponziPassBuzz, 'sfx', {
    sfxPlayer,
    musicPlayer,
  });
  setCurrentQuestion(
    {
      category: state.gameController.currentQuestion.category,
      words: [
        ...state.gameController.currentQuestion.words,
        state.gameController.currentQuestion.words[
          state.gameController.currentQuestion.index
        ],
      ],
      index: state.gameController.currentQuestion.index + 1,
    },
    { dispatch, actions },
  );
  resetStreak({ dispatch, actions });
};

export {
  changeGameDisplay,
  setActiveTeam,
  setCurrentQuestion,
  incrementStreak,
  resetStreak,
  addBonusTime,
  clickHandlerCategory,
  checkIfRoundOver,
  nextQuestion,
  correctHandler,
  incorrectHandler,
};
