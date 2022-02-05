import React, { useContext, useEffect, useRef } from 'react';
import {
  TuneHomeScreen,
  TitleContainer,
  Title,
  H3,
  PlayerContainer,
  AudioImg,
  Controls,
  Button,
} from '../gameComponentStyles/tuneStyles';
import {
  initGame,
  StoreContextGB,
  StoreContextCP,
  actions,
  ReactAudioPlayer,
  playPauseHandler,
  rewindHandler,
  toggleReveal,
  nextSong,
  prevSong,
  importAll,
  playButton,
  pauseButton,
  rewindButton,
  ScoreOverlay,
  ScoreComponent,
  shuffleArray,
} from '../../helpers/tune/imports';

const songs = importAll(
  require.context(
    '../../../../assets/sound_fx/name_that_tune',
    true,
    /\.mp3$|.wav$/,
  ),
);

export default function SameOldTune({ windowInstance }) {
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
      let initState = { ...(await initGame(state, 'sameOldTune', 'board')) };

      // shuffle the board
      initState.board = shuffleArray(initState.board);

      initState = {
        ...initState,
        currentQuestion: initState.board[0],
        currentAnswer: initState.board[0].name,
      };

      dispatch({
        type: actions.INIT_GAME,
        payload: initState,
      });
      dispatch({
        type: actions.CHANGE_VOLUME,
        payload: { type: 'music', level: 50 },
      });
    }
    if (!state.gameController.gameStarted) {
      initialize();
    }
  }, [dispatch, state]);

  const { board, currentQuestion, score } = state.gameController;

  const handleClickRewind = () => {
    rewindHandler({ musicPlayer, currentQuestion, dispatch, actions });
  };

  const handleClickPlayPause = () => {
    playPauseHandler({
      musicPlayer,
      currentQuestion,
      dispatch,
      actions,
      songs,
    });
  };

  const handleClickNext = () => {
    nextSong({
      musicPlayer,
      board,
      currentQuestion,
      dispatch,
      actions,
    });
  };

  const handleClickPrev = () => {
    prevSong({
      musicPlayer,
      board,
      currentQuestion,
      dispatch,
      actions,
    });
  };

  return state.gameController.gameStarted ? (
    <TuneHomeScreen>
      <TitleContainer>
        <Title show={Boolean(state.gameController.answerRevealed)}>
          {currentQuestion.name}
        </Title>
      </TitleContainer>
      <PlayerContainer>
        <AudioImg onClick={handleClickRewind} src={rewindButton} alt="" />
        <AudioImg
          src={currentQuestion.isPlaying ? pauseButton : playButton}
          alt=""
          onClick={handleClickPlayPause}
        />
      </PlayerContainer>
      {windowInstance === 'controlPanel' && (
        <Controls>
          <Button onClick={handleClickPrev}>
            <H3>Prev song</H3>
          </Button>
          <Button
            onClick={() =>
              toggleReveal(!state.gameController.answerRevealed, {
                dispatch,
                actions,
              })
            }
          >
            <H3>{state.gameController.answerRevealed ? 'Hide' : 'Reveal'}</H3>
          </Button>
          <Button onClick={handleClickNext}>
            <H3>Next song</H3>
          </Button>
        </Controls>
      )}
      <ReactAudioPlayer
        ref={musicPlayer}
        volume={
          (state.audio.volume.master / 100) * (state.audio.volume.music / 100)
        }
      />
      <ReactAudioPlayer
        ref={sfxPlayer}
        volume={
          (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
        }
      />
      <ScoreOverlay
        position="top"
        score={score}
        ScoreComponent={ScoreComponent}
      />
    </TuneHomeScreen>
  ) : (
    <div />
  );
}
