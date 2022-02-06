import getAllVersions from '../../../../assets/game_versions/gameVersions';

export default async function initGame(state, game, initialDisplay = 'init') {
  const games = await getAllVersions();
  const initState = {
    display: initialDisplay,
    currentQuestion: null,
    board: games[game][state.currentGame.version].content,
    currentAnswer: '',
    timer: {
      time: null,
      running: false,
      tickSound: '',
    },
    score: {
      type: 'player',
      scoreBoard: [0, 0, 0, 0],
    },
    gameStarted: true,
  };

  return JSON.parse(JSON.stringify(initState));
}
