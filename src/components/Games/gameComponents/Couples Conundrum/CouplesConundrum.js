import React, { useContext, useEffect, useRef } from 'react';
import {
  CouplesHomeScreen,
  TitleContainer,
  Title,
  ScoreH1,
  H3,
  Controls,
  Button,
  ScoreCardDiv,
  ControlPanelOverlay,
} from '../gameComponentStyles/couplesStyles';
import {
  initGame,
  StoreContextCP,
  StoreContextGB,
  actions,
  ReactAudioPlayer,
  nextQuestion,
  previousQuestion,
  toggleDisplay,
  bgMusic,
  changeRound,
} from '../../helpers/couples/imports';

export default function CouplesConundrum({ windowInstance }) {
  let StoreContext;
  if (windowInstance === 'controlPanel') {
    StoreContext = StoreContextCP;
  } else if (windowInstance === 'gameboard') {
    StoreContext = StoreContextGB;
  }

  const { state, dispatch } = useContext(StoreContext);
  const { gameController } = state;
  const {
    board,
    currentQuestion,
    currentAnswer,
    score,
    gameStarted,
    display,
    round,
  } = gameController;

  let musicPlayer = useRef();
  let sfxPlayer = useRef();

  useEffect(() => {
    async function initialize() {
      const initState = {
        ...(await initGame(state, 'couples', 'scores')),
        score: {
          type: 'team',
          scoreBoard: [0, 0, 0, 0],
        },
        round: 0,
        bgMusic: true,
      };
      initState.currentQuestion = initState.board[0][0];
      initState.currentAnswer = initState.board[0][0];
      dispatch({
        type: actions.INIT_GAME,
        payload: initState,
      });
    }
    if (!gameStarted) {
      initialize();
    }
  }, [dispatch, state, gameStarted]);

  useEffect(() => {
    if (gameStarted && currentAnswer !== currentQuestion) {
      dispatch({
        type: actions.SET_ANSWER,
        payload: currentQuestion,
      });
    }
  }, [gameStarted, currentQuestion, currentAnswer, dispatch, board, round]);

  const handleClickPrev = () => {
    previousQuestion({ board, currentQuestion, dispatch, actions, round });
  };

  const handleClickNext = () => {
    nextQuestion({ board, currentQuestion, dispatch, actions, round });
  };

  const handleClickDisplayToggle = () => {
    toggleDisplay({ display, dispatch, actions });
  };

  const handleClickRoundButton = (e) => {
    const newRound = Number(e.currentTarget.dataset.round);
    changeRound({ newRound, dispatch });
  };

  function parseHeartClassNames(scoreBoard) {
    const numberOfTeams = scoreBoard.filter((score) => score !== null).length;
    let classNames = [];
    for (let i = 0; i < scoreBoard.length; i++) {
      classNames.push(`index-${i}`);
    }
    if (
      numberOfTeams === 3 &&
      scoreBoard[3] !== null &&
      scoreBoard[0] !== null
    ) {
      classNames[1] += ' alt-location';
      classNames[2] += ' alt-location';
    }
    if (numberOfTeams === 2) {
      classNames = [];
      scoreBoard.forEach((score) => {
        if (score !== null) {
          classNames.push(
            classNames.filter((className) => className).length
              ? 'index-0'
              : 'index-3',
          );
        } else {
          classNames.push('');
        }
      });
    }
    return classNames;
  }

  const getBackground = () => {
    if (display !== 'scores') {
      return board[round].indexOf(currentQuestion) < board[round].length / 2
        ? 'radial-gradient(circle, rgba(213,150,150,1) 34%, rgba(255,198,206,1) 100%)'
        : 'radial-gradient(circle, rgba(61,73,233,1) 34%, rgba(114,136,255,1) 100%)';
    }
    return null;
  };

  const getQuestionNumber = ({ board, round, currentQuestion }) =>
    board[round].indexOf(currentQuestion) + 1 <= board[round].length / 2
      ? board[round].indexOf(currentQuestion) + 1
      : board[round].indexOf(currentQuestion) + 1 - board[round].length / 2;

  return state.gameController.gameStarted ? (
    <CouplesHomeScreen background={getBackground()}>
      <div className="sparkle-overlay" />
      {display === 'question' ? (
        <TitleContainer>
          <Title style={{ marginBottom: '0' }}>
            Question #{getQuestionNumber({ board, round, currentQuestion })}
          </Title>
          <Title style={{ marginTop: '0' }}>{currentQuestion}</Title>
        </TitleContainer>
      ) : (
        score.scoreBoard.map((scoreNum, scoreIndex) => {
          if (scoreNum !== null) {
            return (
              <ScoreCardDiv
                key={scoreIndex}
                className={parseHeartClassNames(score.scoreBoard)[scoreIndex]}
              >
                <ScoreH1>{scoreNum}</ScoreH1>
              </ScoreCardDiv>
            );
          } else return null;
        })
      )}
      {windowInstance === 'controlPanel' && (
        <ControlPanelOverlay>
          <h1 className="round-title">Round {round + 1}</h1>
          <Button
            onClick={handleClickRoundButton}
            className="left-button"
            data-round="0"
          >
            <H3>Round 1</H3>
          </Button>
          <Button
            onClick={handleClickRoundButton}
            className="right-button"
            data-round="1"
          >
            <H3>Round 2</H3>
          </Button>
          <Controls>
            <Button onClick={handleClickPrev}>
              <H3>Previous question</H3>
            </Button>
            <Button onClick={handleClickDisplayToggle}>
              <H3>Show {display === 'scores' ? 'question' : 'scores'}</H3>
            </Button>
            <Button onClick={handleClickNext}>
              <H3>
                {board[round].indexOf(currentQuestion) ===
                board[round].length - 1
                  ? 'Back to first'
                  : 'Next'}{' '}
                question
              </H3>
            </Button>
          </Controls>
        </ControlPanelOverlay>
      )}
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
            volume={
              (state.audio.volume.master / 100) *
              (state.audio.volume.music / 100)
            }
            ref={musicPlayer}
            src={bgMusic}
            autoPlay
            loop
          />
        )}
    </CouplesHomeScreen>
  ) : (
    <div />
  );
}
