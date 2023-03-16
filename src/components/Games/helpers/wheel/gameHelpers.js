import playSound from '../shared/audioHelpers';
import { wheelBuzzer, wheelDing } from './imports';
import puzzleChosenSound from '../../../../assets/sound_fx/wheel/wheel_puzzle_chosen.mp3';
import solveSound from '../../../../assets/sound_fx/wheel/wheel_reveal.mp3';

const renderPuzzle = (state) => {
  const { puzzle } = state.gameController.currentQuestion;
  // the four rows to be rendered on the game board
  let rows;
  // split answer into array of words
  const puzzleSplit = puzzle.split(' ');

  const tempArr = [...puzzleSplit];

  let rowsNeeded = 1;

  // check if 1 or 2 rows suffice

  let newRows = [[], [], [], []];
  let currentRow = 1;
  for (let i = 0; i < tempArr.length; i++) {
    const spaceNeeded = newRows[currentRow].length ? 1 : 0;
    if (newRows[currentRow].length + tempArr[i].length + spaceNeeded <= 14) {
      // add a space if a word is here already
      newRows[currentRow].length && newRows[currentRow].push(' ');
      newRows[currentRow] = [...newRows[currentRow], ...tempArr[i].split('')];
    } else {
      currentRow++;
      rowsNeeded++;
      i--;
      if (rowsNeeded > 2) break;
    }
  }

  // handle 3-4 row puzzle
  if (rowsNeeded > 2) {
    rowsNeeded = 1;
    let newRows = [[], [], [], []];
    const numSlots = [12, 14, 14, 12];
    let currentRow = 0;
    for (let i = 0; i < tempArr.length; i++) {
      const spaceNeeded = newRows[currentRow].length ? 1 : 0;
      if (
        newRows[currentRow].length + tempArr[i].length + spaceNeeded <=
        numSlots[currentRow]
      ) {
        newRows[currentRow].length && newRows[currentRow].push(' ');
        newRows[currentRow] = [...newRows[currentRow], ...tempArr[i].split('')];
      } else {
        currentRow++;
        rowsNeeded++;
        i--;
        if (currentRow > 3) throw new Error('Puzzle length too long');
      }
    }

    rows = newRows;
  } else {
    rows = newRows;
  }

  // fill in outside spaces so rows render centered on the board
  const rowsRender = rows.map((row) => {
    while (row.length < 14) {
      if (row.length % 2 === 0) {
        row.unshift(' ');
        row.push(' ');
      } else {
        row.push(' ');
      }
    }
    return row;
  });

  // add space to shape the gameboard properly
  rowsRender[0][13] = null;
  rowsRender[0][0] = null;
  rowsRender[3][13] = null;
  rowsRender[3][0] = null;
  return rowsRender;
};

const setCategorySolved = (categoryIndex, { state, dispatch, actions }) => {
  const board = state.gameController.board;
  board[categoryIndex].solved = true;
  dispatch({ type: actions.SET_BOARD, payload: board });
};

const changeGameDisplay = (displaySetting, { dispatch, actions }) => {
  dispatch({ type: actions.CHANGE_GAME_DISPLAY, payload: displaySetting });
};

const clickHandlerCategory = (
  puzzle,
  index,
  { setCurrentQuestion, dispatch, actions, state, sfxPlayer, musicPlayer },
) => {
  setCurrentQuestion({
    category: puzzle.category,
    puzzle: puzzle.puzzle,
    guessedLetters: [],
    solved: false,
  });
  setCategorySolved(index, { state, dispatch, actions });
  playSound(puzzleChosenSound, 'sfx', {
    sfxPlayer,
    musicPlayer,
  });
  dispatch({ type: actions.SET_ANSWER, payload: puzzle.puzzle });
  changeGameDisplay('board', { dispatch, actions });
};

const setQuestionCallback = (
  question,
  { dispatch, actions, sfxPlayer, musicPlayer },
) => {
  dispatch({ type: actions.SET_QUESTION, payload: question });
};

const checkLettersCallback = (letters, { state }) => {
  return state.gameController.currentQuestion.guessedLetters.some((curr) =>
    letters.includes(curr),
  );
};

const guessLetterCallback = (
  letters,
  { checkGuessedLetters, setCurrentQuestion, state },
) => {
  if (!checkGuessedLetters(letters)) {
    let question = state.gameController.currentQuestion;
    question.guessedLetters.push(...letters);
    setCurrentQuestion(question);
  }
};

const activateLetterCellsCallback = (
  letters,
  index = 0,
  {
    sfxPlayer,
    musicPlayer,
    activateLetterCells,
    windowInstance,
    dispatch,
    guessedLetters,
  },
) => {
  if (typeof letters === 'string') letters = [letters];
  const spans = Array.from(document.querySelectorAll('[data-cell')).filter(
    (span) => letters.includes(span.textContent),
  );
  if (spans.length === 0) {
    // only play sounds from one window
    if (windowInstance === 'controlPanel') {
      playSound(wheelBuzzer, 'sfx', {
        sfxPlayer,
        musicPlayer,
      });
    }
  } else {
    if (index > 0) {
      spans[index - 1].parentNode.classList.remove('active');
      spans[index - 1].classList.add('reveal');
    }
    if (index < spans.length) {
      // only play sounds from one window
      if (windowInstance === 'controlPanel') {
        playSound(wheelDing, 'sfx', {
          sfxPlayer,
          musicPlayer,
        });
      }
      spans[index].parentNode.classList.add('active');
    }
    setTimeout(() => {
      if (index < spans.length) {
        activateLetterCells(letters, index + 1);
      }
      if (index === spans.length - 1) {
        const timerTime = 5;
        // guessedLetters.length <= 3 ? 9 : guessedLetters.length <= 6 ? 7 : 5;
        dispatch({ type: 'SET_TIMER', payload: timerTime });
        dispatch({ type: 'RUN_TIMER' });
      }
    }, 2000);
  }
};

const keyPressCallback = (
  letters,
  { state, checkGuessedLetters, guessLetter, ipcRenderer, activateLetterCells },
) => {
  if (state.gameController.display === 'board') {
    const upperCaseLetters = letters.map((letter) => letter.toUpperCase());
    if (!checkGuessedLetters(upperCaseLetters)) {
      guessLetter(upperCaseLetters);
      ipcRenderer.send('WHEEL_GUESS_SEND', upperCaseLetters);
      activateLetterCells(upperCaseLetters);
    }
  }
};

const solvePuzzle = ({ state, dispatch, actions, sfxPlayer, musicPlayer }) => {
  const question = { ...state.gameController.currentQuestion };
  question.solved = true;
  playSound(solveSound, 'sfx', {
    sfxPlayer,
    musicPlayer,
  });
  dispatch({ type: actions.SET_QUESTION, payload: question });
};

const returnHandler = ({ setCurrentQuestion, dispatch, actions }) => {
  setCurrentQuestion({
    category: '',
    puzzle: '',
    guessedLetters: [],
    solved: false,
  });
  changeGameDisplay('select', { dispatch, actions });
};

export {
  renderPuzzle,
  setCategorySolved,
  clickHandlerCategory,
  setQuestionCallback,
  checkLettersCallback,
  guessLetterCallback,
  activateLetterCellsCallback,
  keyPressCallback,
  solvePuzzle,
  returnHandler,
};
