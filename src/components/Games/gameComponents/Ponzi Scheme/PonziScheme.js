import React, { useContext, useEffect, useRef } from 'react';
import {
  playSound,
  initGame,
  StoreContextCP,
  StoreContextGB,
  actions,
  ReactAudioPlayer,
  tickSound,
  buzzer,
  correctHandler,
  incorrectHandler,
  setActiveTeam,
  clickHandlerCategory,
} from '../../helpers/ponziScheme/imports';
import PonziContainer from './PonziContainer';
import PonziScoreComponent from './PonziScoreComponent';
import ScoreOverlay from '../ScoreOverlay';
import PonziAnswerBlock from './PonziAnswerBlock';
import PonziTimer from './PonziTimer';
import PonziCategories from './PonziCategories';
import PonziControlButtons from './PonziControlButtons';

export default function PonziScheme({ windowInstance }) {
  let StoreContext;
  if (windowInstance === 'controlPanel') {
    StoreContext = StoreContextCP;
  } else if (windowInstance === 'gameboard') {
    StoreContext = StoreContextGB;
  }

  const { state, dispatch } = useContext(StoreContext);
  const { gameController } = state;
  const { currentAnswer, timer, activeTeam } = gameController;

  let musicRef = useRef();
  let sfxRef = useRef();

  useEffect(() => {
    async function initialize() {
      let initState = {
        ...(await initGame(state, 'ponziScheme', 'board')),
        timer: {
          time: null,
          running: false,
          tickSound,
        },
        score: {
          type: 'team',
          scoreBoard: [0, 0, null, null],
        },
        activeTeam: 0,
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

  useEffect(() => {
    if (state.gameController.timer.time === 0) {
      playSound(buzzer, 'sfx', {
        sfxPlayer: sfxRef,
        musicPlayer: musicRef,
      });
      dispatch({ type: 'END_PONZI_ROUND' });
    }
  }, [state.gameController.timer.time, dispatch]);

  const handleClickCorrect = () => {
    if (state.gameController.currentQuestion) {
      correctHandler(state.gameController.activeTeam, {
        dispatch,
        actions,
        state,
        sfxPlayer: sfxRef,
        musicPlayer: musicRef,
      });
    }
  };

  const handleClickPass = () => {
    if (state.gameController.currentQuestion) {
      incorrectHandler({
        sfxPlayer: sfxRef,
        musicPlayer: musicRef,
        state,
        dispatch,
        actions,
      });
    }
  };

  const handleClickSetActive = (teamNumber) => {
    setActiveTeam(teamNumber, { dispatch, actions });
  };

  const handleClickCategory = (item) => {
    if (item.completed) return;
    clickHandlerCategory(item, { state, dispatch, actions });
  };

  return (
    state.gameController.gameStarted && (
      <PonziContainer activeTeam={activeTeam}>
        <ScoreOverlay
          ScoreComponent={PonziScoreComponent}
          score={state.gameController.score}
          position="corners"
          clickHandler={handleClickSetActive}
        />
        <PonziAnswerBlock
          answer={currentAnswer}
          windowInstance={windowInstance}
          wordsLeft={
            state.gameController.currentQuestion?.words.length -
            state.gameController.currentQuestion?.index
          }
        />
        <PonziTimer time={timer.time} display={timer.running} />
        <PonziCategories
          categories={gameController.board}
          activeCategory={gameController.currentQuestion}
          onClickCategory={handleClickCategory}
        />
        {windowInstance === 'controlPanel' && (
          <PonziControlButtons
            onClickCorrect={handleClickCorrect}
            onClickPass={handleClickPass}
          />
        )}
        {/* music player */}
        {state.gameController.bgMusic &&
          state.gameController.gameStarted &&
          windowInstance === 'controlPanel' && (
            <ReactAudioPlayer
              ref={musicRef}
              volume={
                (state.audio.volume.master / 100) *
                (state.audio.volume.music / 100)
              }
              src=""
              autoPlay
              loop
            />
          )}
        {/* sound effects player */}
        <ReactAudioPlayer
          ref={sfxRef}
          volume={
            (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
          }
        />
      </PonziContainer>
    )
  );
}
