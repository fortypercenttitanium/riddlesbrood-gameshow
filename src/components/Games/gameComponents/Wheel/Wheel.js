import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import {
  WheelContainer,
  CategoryContainer,
  Board,
  BoardWrapper,
  LetterCell,
  Span,
  CategoryDisplay,
  ReturnButton,
  SolvePuzzle,
  CategoryDisplayText,
  GuessNextLetter,
  GuessNext2Letters,
} from '../gameComponentStyles/wheelStyles';
import {
  renderPuzzle,
  initGame,
  StoreContextCP,
  StoreContextGB,
  actions,
  ReactAudioPlayer,
  clickHandlerCategory,
  setQuestionCallback,
  checkLettersCallback,
  guessLetterCallback,
  activateLetterCellsCallback,
  keyPressCallback,
  solvePuzzle,
  returnHandler,
  ScoreOverlay,
  ScoreComponent,
  playSound,
} from '../../helpers/wheel/imports';
import tickSound from '../../../../assets/sound_fx/wheel/wheel_tick.mp3';
import buzzer from '../../../../assets/sound_fx/wheel/wheel_triple_buzz.mp3';

import bgMusic from '../../../../assets/sound_fx/bg_music/wheel.mp3';
import TimerDisplay from './TimerDisplay';

const { ipcRenderer } = window.require('electron');

export default function Wheel({ windowInstance }) {
  let StoreContext;
  if (windowInstance === 'controlPanel') {
    StoreContext = StoreContextCP;
  } else if (windowInstance === 'gameboard') {
    StoreContext = StoreContextGB;
  }

  const [selected, setSelected] = useState(0);
  const [letterSelectionDisabled, setLetterSelectionDisabled] = useState(false);

  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    if (windowInstance === 'gameboard') {
      ipcRenderer.on('WHEEL_GUESS_RECEIVE', function (e, letters) {
        activateLetterCells(letters.map((letter) => letter.toUpperCase()));
      });
    }
    return () => ipcRenderer.removeAllListeners('WHEEL_GUESS_RECEIVE');
    // linter disabled because using dependencies causes multiple IPC events to fire
    // eslint-disable-next-line
  }, []);

  let musicPlayer = useRef();
  let sfxPlayer = useRef();

  useEffect(() => {
    async function initialize() {
      let initState = {
        ...(await initGame(state, 'wheel', 'select')),
        score: {
          type: 'player',
          scoreBoard: [0, 0, 0, 0],
        },
        currentQuestion: {
          category: '',
          puzzle: ' ',
          guessedLetters: [],
          solved: false,
        },
        bgMusic: true,
        timer: {
          time: null,
          running: false,
          tickSound,
        },
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
    if (
      state.gameController.timer.running &&
      state.gameController.timer.time <= 0
    ) {
      if (windowInstance === 'controlPanel') {
        playSound(buzzer, 'sfx', {
          sfxPlayer,
          musicPlayer,
        });
      }
      dispatch({ type: 'KILL_TIMER' });
      setLetterSelectionDisabled(false);
    }
  }, [state.gameController.timer, dispatch, windowInstance]);

  const setCurrentQuestion = useCallback(
    (question) => {
      setQuestionCallback(question, {
        dispatch,
        actions,
      });
    },
    [dispatch],
  );

  const activateLetterCells = useCallback(
    (letters, index = 0) => {
      activateLetterCellsCallback(letters, index, {
        sfxPlayer,
        musicPlayer,
        activateLetterCells,
        windowInstance,
        dispatch,
        guessedLetters: state.gameController.currentQuestion.guessedLetters,
      });
    },
    [
      dispatch,
      state.gameController.currentQuestion.guessedLetters,
      windowInstance,
    ],
  );

  const checkGuessedLetters = useCallback(
    (letters) => checkLettersCallback(letters, { state }),
    [state],
  );

  const guessLetter = useCallback(
    (letters) => {
      guessLetterCallback(letters, {
        checkGuessedLetters,
        setCurrentQuestion,
        state,
      });
    },
    [checkGuessedLetters, setCurrentQuestion, state],
  );

  const handleGuessLetter = useCallback(
    (numberOfLetters = 1) => {
      if (
        state.gameController.timer.running ||
        state.gameController.currentQuestion.solved ||
        letterSelectionDisabled
      )
        return;

      setLetterSelectionDisabled(true);

      const lettersNotChosen = state.gameController.currentQuestion.puzzle
        .split('')
        .filter(
          (letter) =>
            letter !== ' ' &&
            !state.gameController.currentQuestion.guessedLetters.includes(
              letter,
            ),
        );

      if (lettersNotChosen.length === 0) return;
      const uniqueLetters = [...new Set(lettersNotChosen)];
      for (let i = uniqueLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueLetters[i], uniqueLetters[j]] = [
          uniqueLetters[j],
          uniqueLetters[i],
        ];
      }
      const vowels = ['A', 'E', 'I', 'O', 'U'];
      const vowelsArray = uniqueLetters.filter((letter) =>
        vowels.includes(letter),
      );
      const consonantsArray = uniqueLetters.filter(
        (letter) => !vowels.includes(letter),
      );
      const shuffledLetters = [...consonantsArray, ...vowelsArray];
      const randomLetters = shuffledLetters.slice(0, numberOfLetters);

      keyPressCallback(randomLetters, {
        state,
        checkGuessedLetters,
        guessLetter,
        ipcRenderer,
        activateLetterCells,
      });
    },
    [
      state,
      letterSelectionDisabled,
      checkGuessedLetters,
      guessLetter,
      activateLetterCells,
    ],
  );

  const handleClickCategory = () => {
    clickHandlerCategory(state.gameController.board[selected], selected, {
      setCurrentQuestion,
      dispatch,
      actions,
      state,
      sfxPlayer,
      musicPlayer,
    });

    setSelected(
      state.gameController.board.findIndex((game) => !game.solved) || 0,
    );
  };

  const handleClickReturn = () => {
    returnHandler({ setCurrentQuestion, dispatch, actions });
  };

  const handleClickSolve = () => {
    dispatch({ type: 'KILL_TIMER' });
    setLetterSelectionDisabled(false);
    solvePuzzle({ state, dispatch, actions, sfxPlayer, musicPlayer });
  };

  useEffect(() => {
    if (state.gameController.currentQuestion.solved) {
      document.querySelectorAll('span').forEach((span) => {
        span.classList.add('reveal');
      });
    } else {
      document.querySelectorAll('span').forEach((span) => {
        span.classList.remove('reveal');
      });
    }
  }, [state.gameController.currentQuestion.solved]);

  return state.gameController.gameStarted ? (
    <WheelContainer>
      <ScoreOverlay
        ScoreComponent={ScoreComponent}
        position={'top'}
        score={state.gameController.score}
      />
      {windowInstance === 'controlPanel' && (
        <CategoryContainer display={state.gameController.display}>
          <select
            className="category-select"
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
          >
            {state.gameController.board.map((item, index) => {
              return (
                <option disabled={item.solved} key={index} value={index}>
                  {item.puzzle}
                </option>
              );
            })}
          </select>
          <button onClick={handleClickCategory}>Select puzzle</button>
        </CategoryContainer>
      )}
      {(state.gameController.display === 'board' ||
        windowInstance === 'gameboard') && (
        <BoardWrapper>
          <Board>
            {renderPuzzle(state).map((row) => {
              return row.map((letter, index) => (
                <LetterCell
                  className={!letter ? 'blank' : ''}
                  letter={letter}
                  key={index}
                >
                  <Span data-cell>{letter}</Span>
                </LetterCell>
              ));
            })}
          </Board>
        </BoardWrapper>
      )}
      <TimerDisplay timer={state.gameController.timer} />
      <CategoryDisplay display={state.gameController.display}>
        <CategoryDisplayText>
          {state.gameController.currentQuestion.category.toUpperCase()}
        </CategoryDisplayText>
      </CategoryDisplay>
      {state.gameController.currentQuestion.solved &&
        windowInstance === 'controlPanel' && (
          <ReturnButton
            screen={windowInstance}
            display={state.gameController.display}
            onClick={handleClickReturn}
          >
            <p className="select-new">Select New Puzzle</p>
          </ReturnButton>
        )}
      <SolvePuzzle
        display={state.gameController.display}
        screen={windowInstance}
        onClick={handleClickSolve}
      >
        <p className="solve">Solve puzzle</p>
      </SolvePuzzle>
      <GuessNext2Letters
        screen={windowInstance}
        display={state.gameController.display}
        onClick={() => handleGuessLetter(2)}
      >
        <p className="guess">Guess 2 Letters</p>
      </GuessNext2Letters>
      <GuessNextLetter
        screen={windowInstance}
        display={state.gameController.display}
        onClick={() => handleGuessLetter(1)}
      >
        <p className="guess">Guess 1 Letter</p>
      </GuessNextLetter>
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
    </WheelContainer>
  ) : (
    <div />
  );
}
