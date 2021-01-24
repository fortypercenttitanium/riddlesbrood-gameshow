
import { initialState } from './initialState';

export const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_FX_BUTTONS':
			return {
				...state,
				fxButtons: action.payload,
			};
		case 'CHANGE_VOLUME':
			return {
				...state,
				audio: {
					volume: {
						...state.audio.volume,
						[action.payload.type]: action.payload.level,
					},
				},
			};
		case 'CHANGE_SCORE':
			const score = state.gameController.score;
			score.scoreBoard[action.payload.playerIndex] =
				score.scoreBoard[action.payload.playerIndex] + action.payload.amount;
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
					score: action.payload,
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
					currentQuestion: action.payload,
				},
			};
		case 'SET_ANSWER':
			return {
				...state,
				gameController: {
					...state.gameController,
					currentAnswer: action.payload,
				},
			};
		case 'SET_TIMER':
			return {
				...state,
				gameController: {
					...state.gameController,
					timer: {
						...state.gameController.timer,
						time: action.payload,
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
		case 'PLAY_VIDEO':
			return {
				...state,
				VFX: {
					playing: true,
					file: action.payload,
				},
			};
		case 'END_VIDEO':
			return {
				...state,
				VFX: {
					playing: false,
					file: '',
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
				selectedGame: action.payload,
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
				currentGame: action.payload,
			};
		case 'INIT_GAME':
			return {
				...state,
				gameController: action.payload,
			};
		case 'CHANGE_GAME_DISPLAY':
			return {
				...state,
				gameController: {
					...state.gameController,
					display: action.payload,
				},
			};
		case 'SET_BOARD':
			return {
				...state,
				gameController: {
					...state.gameController,
					board: action.payload,
				},
			};
		case 'SET_ACTIVE_TEAM':
			return {
				...state,
				gameController: {
					...state.gameController,
					activeTeam: action.payload,
				},
			};
		case 'SET_CORRECT_COUNTER':
			return {
				...state,
				gameController: {
					...state.gameController,
					correctCounter: action.payload,
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
					wrongTracker: action.payload,
				},
			};
		case 'SET_FAMILY_FEUD_XS':
			return {
				...state,
				gameController: {
					...state.gameController,
					wrongModal: action.payload,
				},
			};
		case 'SET_ANSWER_REVEALED':
			return {
				...state,
				gameController: {
					...state.gameController,
					answerRevealed: action.payload,
				},
			};
		case 'SET_BLOCKS':
			return {
				...state,
				gameController: {
					...state.gameController,
					blocks: action.payload,
				},
			};
		default:
			return state;
	}
};
