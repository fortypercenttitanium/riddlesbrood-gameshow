import React, { useContext, useEffect, useRef } from 'react';
import ESPScoreComponent from './ESPScoreComponent';
import {
  initGame,
  StoreContextCP,
  StoreContextGB,
  actions,
  ReactAudioPlayer,
  nextPrompt,
  previousPrompt,
} from '../../helpers/esp/imports';
import ESPTitle from './ESPTitle';
import ESPContainer from './ESPContainer';
import ScoreOverlay from '../ScoreOverlay';
import ESPControls from './ESPControls';

const scorePositions = [
  { top: '', bottom: '200px', left: '50px', right: '' },
  { top: '', bottom: '0', left: '340px', right: '' },
  { top: '', bottom: '0', left: '', right: '340px' },
  { top: '', bottom: '200px', left: '', right: '50px' },
];

const altScorePositions = scorePositions.filter(
  (pos, index) => index !== 1 && index !== 2,
);

export default function ESP({ windowInstance }) {
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
      const initState = {
        ...(await initGame(state, 'esp', 'board')),
        score: {
          type: 'team',
          scoreBoard: [0, 0, 0, 0],
        },
      };
      initState.currentQuestion = initState.board[0];
      dispatch({
        type: actions.INIT_GAME,
        payload: initState,
      });
    }
    if (!state.gameController.gameStarted) {
      initialize();
    }
  }, [dispatch, state]);

  const { board, currentQuestion, score } = state.gameController;
  const numTeams = score.scoreBoard.filter((score) =>
    Number.isInteger(score),
  ).length;

  const handleClickNext = () => {
    nextPrompt({ board, currentQuestion, dispatch, actions });
  };

  const handleClickPrev = () => {
    previousPrompt({ board, currentQuestion, dispatch, actions });
  };

  return state.gameController.gameStarted ? (
    <ESPContainer>
      <ESPTitle title={currentQuestion} />
      {windowInstance === 'controlPanel' && (
        <ESPControls
          handleClickPrev={handleClickPrev}
          handleClickNext={handleClickNext}
        />
      )}
      <ScoreOverlay
        ScoreComponent={ESPScoreComponent}
        position={
          score.type === 'team' && numTeams === 2
            ? altScorePositions
            : scorePositions
        }
        score={score}
      />

      <ReactAudioPlayer
        ref={sfxPlayer}
        volume={
          (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
        }
      />
      {state.gameController.bgMusic &&
        state.gameController.gameStarted &&
        windowInstance === 'controlPanel' && (
          <ReactAudioPlayer
            ref={musicPlayer}
            volume={
              (state.audio.volume.master / 100) *
              (state.audio.volume.music / 100)
            }
            src=""
            autoPlay
            loop
          />
        )}
    </ESPContainer>
  ) : (
    <div />
  );
}
