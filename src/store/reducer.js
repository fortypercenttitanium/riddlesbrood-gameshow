import { initialState } from './initialState';

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'CHANGE_FX_BUTTONS':
      return {
        ...state,
        fxButtons: payload,
      };
    case 'CHANGE_VOLUME':
      return {
        ...state,
        audio: {
          volume: {
            ...state.audio.volume,
            [payload.type]: payload.level,
          },
        },
      };
    case 'CHANGE_SCORE':
      const score = state.gameController.score;
      score.scoreBoard[payload.playerIndex] =
        score.scoreBoard[payload.playerIndex] + payload.amount;
      return {
        ...state,
        gameController: {
          ...state.gameController,
          score: score,
        },
      };
    case 'SET_SCORE':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          score: payload,
        },
      };
    case 'TOGGLE_SCORE_TYPE':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          score: {
            ...state.gameController.score,
            type:
              state.gameController.score.type === 'team' ? 'player' : 'team',
          },
        },
      };
    case 'SET_QUESTION':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          currentQuestion: payload,
        },
      };
    case 'SET_ANSWER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          currentAnswer: payload,
        },
      };
    case 'SET_TIMER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          timer: {
            ...state.gameController.timer,
            time: payload,
            running: false,
          },
        },
      };
    case 'TICK_TIMER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          timer: {
            ...state.gameController.timer,
            time: state.gameController.timer.time - 1,
          },
        },
      };
    case 'RUN_TIMER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          timer: {
            ...state.gameController.timer,
            running: true,
          },
        },
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          timer: {
            ...state.gameController.timer,
            running: false,
          },
        },
      };
    case 'KILL_TIMER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          timer: {
            ...state.gameController.timer,
            time: null,
            running: false,
          },
        },
      };
    case 'OPEN_GAMES_MENU':
      const openMenu = {
        open: true,
        timeline: 'gamesMenu',
        selectedGame: {},
      };
      return {
        ...state,
        gamesMenu: openMenu,
      };
    case 'CLOSE_GAMES_MENU':
      const closeMenu = {
        ...state.gamesMenu,
        open: false,
        timeline: '',
      };
      return {
        ...state,
        gamesMenu: closeMenu,
      };
    case 'GO_TO_VERSION_SELECT':
      const newState = {
        open: true,
        timeline: 'versionSelect',
        selectedGame: payload,
      };
      return {
        ...state,
        gamesMenu: newState,
      };
    case 'RESET_GAME':
      return {
        ...state,
        timeline: 'app-open',
        currentGame: initialState.currentGame,
        gameController: initialState.gameController,
      };
    case 'SET_GAME':
      return {
        ...state,
        timeline: 'in-game',
        currentGame: payload,
      };
    case 'INIT_GAME':
      return {
        ...state,
        gameController: payload,
      };
    case 'CHANGE_GAME_DISPLAY':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          display: payload,
        },
      };
    case 'SET_BOARD':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          board: payload,
        },
      };
    case 'SET_ACTIVE_TEAM':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          activeTeam: payload,
        },
      };
    case 'INCREMENT_STREAK':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          streak: state.gameController.streak + 1,
        },
      };
    case 'RESET_STREAK':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          streak: 0,
        },
      };
    case 'SET_WRONG_TRACKER':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          wrongTracker: payload,
        },
      };
    case 'SET_FAMILY_FEUD_XS':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          wrongModal: payload,
        },
      };
    case 'SET_ANSWER_REVEALED':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          answerRevealed: payload,
        },
      };
    case 'SET_BLOCKS':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          blocks: payload,
        },
      };
    case 'SET_STATE':
      return {
        ...payload,
      };
    case 'SET_GAME_ROUND':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          round: payload,
          currentQuestion: state.gameController.board[payload][0],
          currentAnswer: state.gameController.board[payload][0],
        },
      };
    case 'SET_CUSTOM_PRESHOW_MESSAGE':
      return {
        ...state,
        customPreshowMessage: payload,
      };
    case 'SHOW_CUSTOM_MESSAGE':
      return {
        ...state,
        timeline: 'custom-message-preshow',
      };
    case 'START_PONZI_ROUND':
      return {
        ...state,
        gameController: {
          ...state.gameController,
          currentQuestion: payload.currentQuestion,
          streak: 0,
          timer: {
            time: payload.roundLength,
            running: true,
            tickSound: payload.tickSound,
          },
          currentAnswer: payload.currentQuestion.words[0],
        },
      };
    case 'END_PONZI_ROUND': {
      const endingCategory = state.gameController.board.findIndex(
        (category) =>
          category.category === state.gameController.currentQuestion.category,
      );
      const newBoard = [...state.gameController.board];
      newBoard[endingCategory] = {
        ...newBoard[endingCategory],
        completed: true,
      };

      return {
        ...state,
        gameController: {
          ...state.gameController,
          board: newBoard,
          currentQuestion: null,
          streak: 0,
          timer: {
            time: null,
            running: false,
          },
          currentAnswer: '',
          activeTeam: 0,
        },
      };
    }
    case 'SET_VIDEO_IS_PLAYING':
      return {
        ...state,
        videoIsPlaying: payload,
      };
    default:
      return state;
  }
};
