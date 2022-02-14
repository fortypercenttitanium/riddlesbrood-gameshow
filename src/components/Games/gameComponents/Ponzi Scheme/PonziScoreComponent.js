import React from 'react';
import styled from 'styled-components';
import playerOneScoreContainer from '../../../../assets/images/game_images/ponziScheme/player-1-score-container.png';
import playerTwoScoreContainer from '../../../../assets/images/game_images/ponziScheme/player-2-score-container.png';

const ScoreContainer = styled.div`
  pointer-events: all;
  background: center / contain no-repeat
    url(${(props) => props.backgroundImage});
  height: 220px;
  width: 220px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 72px 48px;
  cursor: pointer;

  .score-number {
    padding-top: 30px;
    font-size: 96px;
    text-shadow: 3px 3px 3px black;
  }
`;

function PonziScoreComponent({ player, score, clickHandler }) {
  return (
    <ScoreContainer
      player={player}
      backgroundImage={
        player === 1 ? playerOneScoreContainer : playerTwoScoreContainer
      }
      onClick={() => clickHandler(player)}
    >
      <h1 className="score-number">{score}</h1>
    </ScoreContainer>
  );
}

export default PonziScoreComponent;
