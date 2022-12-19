import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import {
  initGame,
  StoreContextCP,
  StoreContextGB,
  actions,
  ReactAudioPlayer,
  playPauseHandler,
  toggleTitleReveal,
  nextPicture,
  revealHandleCallback,
  importAll,
} from '../../helpers/squares/imports';
import ScoreOverlay from '../ScoreOverlay';
import SquaresContainer from './SquaresContainer';
import SquaresTitle from './SquaresTitle';
import SquaresControls from './SquaresControls';
import SquaresScoreComponent from './SquaresScoreComponent';
import SquaresImageContainer from './SquaresImageContainer';
import bgMusic from '../../../../assets/sound_fx/bg_music/secret_squares.mp3';
import SquaresCategory from './SquaresCategory';

const pictures = importAll(
  require.context(
    `../../../../assets/images/game_images/squares/game`,
    false,
    /\.jpg$|\.jpeg$|\.png$/,
  ),
);

export default function SecretSquares({ windowInstance }) {
  let StoreContext;
  if (windowInstance === 'controlPanel') {
    StoreContext = StoreContextCP;
  } else if (windowInstance === 'gameboard') {
    StoreContext = StoreContextGB;
  }

  const { state, dispatch } = useContext(StoreContext);
  let musicPlayer = useRef();
  let sfxPlayer = useRef();

  useEffect(() => {
    async function initialize() {
      let initState = { ...(await initGame(state, 'secretSquares')) };
      initState = {
        ...initState,
        currentQuestion: initState.board[0],
        currentAnswer: initState.board[0].title,
        bgMusic: true,
        timer: {
          time: 21,
          running: false,
        },
        score: {
          type: 'player',
          scoreBoard: [0, 0, 0, 0],
        },
        answerRevealed: false,
        blocks: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      };
      dispatch({
        type: actions.INIT_GAME,
        payload: initState,
      });
    }
    if (!state.gameController.gameStarted) {
      initialize();
    }
  }, [dispatch, state]);

  const { board, currentQuestion, score, timer, blocks } = state.gameController;

  const [timerDidUpdate, setTimerDidUpdate] = useState(false);

  const revealHandler = useCallback(revealHandleCallback, [blocks, dispatch]);

  const handleClickReveal = () => {
    toggleTitleReveal(!state.gameController.answerRevealed, {
      dispatch,
      actions,
      sfxPlayer,
      musicPlayer,
    });
  };

  const handleClickPlayPause = () => {
    playPauseHandler({ timer, blocks, dispatch, actions });
  };

  const handleClickNext = () => {
    nextPicture({
      board,
      currentQuestion,
      dispatch,
      actions,
      sfxPlayer,
      musicPlayer,
    });
  };

  useEffect(() => {
    setTimerDidUpdate(true);
  }, [timer]);

  useEffect(() => {
    if (timer.running && timerDidUpdate) {
      setTimerDidUpdate(false);
      switch (timer.time) {
        case 20:
          revealHandler(1, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 18:
          revealHandler(2, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 15:
          revealHandler(3, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 12:
          revealHandler(4, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 9:
          revealHandler(5, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 6:
          revealHandler(6, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 3:
          revealHandler(7, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          break;
        case 0:
          revealHandler(8, {
            blocks,
            dispatch,
            actions,
            sfxPlayer,
            musicPlayer,
          });
          dispatch({ type: actions.KILL_TIMER });
          break;
        default:
          break;
      }
    }
  }, [timer, dispatch, revealHandler, blocks, timerDidUpdate]);

  return state.gameController.gameStarted ? (
    <SquaresContainer>
      <SquaresTitle
        show={(
          state.gameController.answerRevealed ||
          windowInstance === 'controlPanel'
        ).toString()}
        title={currentQuestion.title}
      />
      <SquaresImageContainer
        showVeil={
          timer.time < 21 &&
          !timer.running &&
          !state.gameController.answerRevealed &&
          !blocks.every((block) => !block)
        }
        gameImage={
          currentQuestion.file.slice(0, 6) === 'app://'
            ? currentQuestion.file
            : pictures[currentQuestion.file]
        }
        blocks={blocks}
      />
      {windowInstance === 'controlPanel' ? (
        <SquaresControls
          answerRevealed={state.gameController.answerRevealed}
          handleClickReveal={handleClickReveal}
          timer={timer}
          handleClickPlayPause={handleClickPlayPause}
          handleClickNext={handleClickNext}
        />
      ) : (
        <SquaresCategory category={state.gameController.category.title} />
      )}
      <ReactAudioPlayer
        ref={sfxPlayer}
        volume={
          (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
        }
      />
      {/* If game gets backgrund music, fix this */}
      {state.gameController.bgMusic &&
        state.gameController.gameStarted &&
        windowInstance === 'controlPanel' && (
          <ReactAudioPlayer
            ref={musicPlayer}
            volume={
              (state.audio.volume.master / 100) *
              (state.audio.volume.music / 100)
            }
            src={bgMusic}
            autoPlay
            loop
          />
        )}
      <ScoreOverlay
        position="corners"
        score={score}
        ScoreComponent={SquaresScoreComponent}
      />
    </SquaresContainer>
  ) : (
    <div />
  );
}
