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
  changeGameDisplay,
  setActiveTeam,
  clickHandlerCategory,
} from '../../helpers/ponziScheme/imports';
import PonziContainer from './PonziContainer';
import PonziScoreComponent from './PonziScoreComponent';
import ScoreOverlay from '../ScoreOverlay';
import PonziAnswerBlock from './PonziAnswerBlock';
import PonziTimer from './PonziTimer';
import PonziCategories from './PonziCategories';

export default function PonziScheme({ windowInstance }) {
  let StoreContext;
  if (windowInstance === 'controlPanel') {
    StoreContext = StoreContextCP;
  } else if (windowInstance === 'gameboard') {
    StoreContext = StoreContextGB;
  }

  const { state, dispatch } = useContext(StoreContext);
  const { gameController } = state;
  const { currentAnswer, timer } = gameController;

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
      dispatch({ type: actions.KILL_TIMER });
      dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: 'roundOver' });
    }
  }, [state.gameController.timer.time, dispatch]);

  const handleClickCorrect = () => {
    correctHandler(state.gameController.activeTeam, {
      dispatch,
      actions,
      state,
      sfxPlayer: sfxRef,
      musicPlayer: musicRef,
    });
  };

  const handleClickIncorrect = () => {
    incorrectHandler({
      sfxPlayer: sfxRef,
      musicPlayer: musicRef,
      state,
      dispatch,
      actions,
    });
  };

  const handleClickReturn = () => {
    changeGameDisplay('board', { dispatch, actions });
  };

  const handleClickSetActive = (teamNumber) => {
    setActiveTeam(teamNumber, { dispatch, actions });
  };

  const handleClickCategory = (item, index) => {
    clickHandlerCategory(item, index, { state, dispatch, actions });
  };

  return (
    state.gameController.gameStarted && (
      <PonziContainer>
        <ScoreOverlay
          ScoreComponent={PonziScoreComponent}
          score={state.gameController.score}
          position="corners"
        />
        <PonziAnswerBlock answer={currentAnswer} />
        <PonziTimer time={timer.time} display={timer.running} />
        <PonziCategories
          categories={gameController.board}
          activeCategory={gameController.currentQuestion}
          onClickCategory={handleClickCategory}
        />
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
      // <PyramidHomeScreen team={state.gameController.activeTeam}>
      //   <Modal display={state.gameController.display}>
      //     <ModalDiv>
      //       <H1>{state.gameController.currentQuestion.category}</H1>
      //     </ModalDiv>
      //     <ModalContainer>
      //       <ScoreContainer team={1}>
      //         <H2>Team 1 Score</H2>
      //         <H2>{state.gameController.score.scoreBoard[0]}</H2>
      //       </ScoreContainer>
      //       <VerticalStack>
      //         <ModalDiv>
      //           <H2>Timer:</H2>
      //           <H2>
      //             {state.gameController.display === 'question'
      //               ? state.gameController.timer.time
      //               : 'Round over'}
      //           </H2>
      //         </ModalDiv>
      //         <ModalDiv>
      //           <H2>POINTS SCORED: {state.gameController.correctCounter}</H2>
      //         </ModalDiv>
      //       </VerticalStack>
      //       <ScoreContainer team={2}>
      //         <H2>Team 2 Score</H2>
      //         <H2>{state.gameController.score.scoreBoard[1]}</H2>
      //       </ScoreContainer>
      //     </ModalContainer>

      //     <ModalContainer>
      //       {state.gameController.display === 'question' ? (
      //         <ModalContainer>
      //           {windowInstance === 'controlPanel' && (
      //             <Button onClick={handleClickCorrect} type="correct">
      //               <H2>Correct</H2>
      //             </Button>
      //           )}
      //           <H2>
      //             {
      //               state.gameController.currentQuestion.words[
      //                 state.gameController.currentQuestion.index
      //               ]
      //             }
      //           </H2>
      //           {windowInstance === 'controlPanel' && (
      //             <Button onClick={handleClickIncorrect} type="incorrect">
      //               <H2>Wrong/Pass</H2>
      //             </Button>
      //           )}
      //         </ModalContainer>
      //       ) : (
      //         <ModalContainer>
      //           <Button onClick={handleClickReturn}>Return To Categories</Button>
      //         </ModalContainer>
      //       )}
      //     </ModalContainer>
      //   </Modal>
      //   <Title>TURN:</Title>
      //   <TurnContainer>
      //     <ScoreContainer team={1}>
      //       <H2>Team 1 Score</H2>
      //       <H2>{state.gameController.score.scoreBoard[0]}</H2>
      //     </ScoreContainer>
      //     <TeamButton
      //       team={1}
      //       activeTeam={state.gameController.activeTeam}
      //       onClick={() => {
      //         handleClickSetActive(1);
      //       }}
      //     >
      //       <H2>Team 1</H2>
      //     </TeamButton>
      //     <TeamButton
      //       team={2}
      //       activeTeam={state.gameController.activeTeam}
      //       onClick={() => {
      //         handleClickSetActive(2);
      //       }}
      //     >
      //       <H2>Team 2</H2>
      //     </TeamButton>
      //     <ScoreContainer team={2}>
      //       <H2>Team 2 Score</H2>
      //       <H2>{state.gameController.score.scoreBoard[1]}</H2>
      //     </ScoreContainer>
      //   </TurnContainer>

      //   <Title>Categories</Title>
      //   <Container>
      //     <CategoryContainer>
      //       {state.gameController.board.map((item, index) => {
      //         return (
      //           <CategoryCard
      //             key={index}
      //             gridArea={`cat${index + 1}`}
      //             done={item.completed}
      //             onClick={() => {
      //               handleClickCategory(item, index);
      //             }}
      //           >
      //             <Span>{item.category}</Span>
      //           </CategoryCard>
      //         );
      //       })}
      //     </CategoryContainer>
      //   </Container>

      //   {/* If game gets backgrund music, fix this */}

      // </PyramidHomeScreen>
    )
  );
}