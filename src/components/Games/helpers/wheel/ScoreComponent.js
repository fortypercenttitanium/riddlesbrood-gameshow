import React from 'react';
import styled from 'styled-components';
import redScoreWrapper from '../../../../assets/images/game_images/wheel/red_score_wrapper.png';
import yellowScoreWrapper from '../../../../assets/images/game_images/wheel/yellow_score_wrapper.png';
import greenScoreWrapper from '../../../../assets/images/game_images/wheel/green_score_wrapper.png';
import blueScoreWrapper from '../../../../assets/images/game_images/wheel/blue_score_wrapper.png';

const ComponentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 0 14px 0 0;
  height: 140px;
  -webkit-text-stroke: 4px black;
  -webkit-text-fill-color: #fff;
  margin: auto 12px 3px;
  font-weight: bold;
  background-image: ${({ player }) =>
    player === 1
      ? `url(${redScoreWrapper})`
      : player === 2
      ? `url(${yellowScoreWrapper})`
      : player === 3
      ? `url(${greenScoreWrapper})`
      : `url(${blueScoreWrapper})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .player-text {
    font-size: 4rem;
    padding: 20px;
    margin: auto 0;
    transform: perspective(220px) rotateY(-20deg);
  }
  .score-text {
    font-size: 6rem;
    padding: 0;
    margin: auto 0;
  }
`;

function ScoreComponent({ player, type, score, windowInstance }) {
  const capitalizedType = type[0].toUpperCase() + type.slice(1);
  return (
    <ComponentWrapper
      player={player}
      windowInstance={windowInstance}
      index={player - 1}
    >
      <p className="player-text">
        {capitalizedType} {player}:
      </p>
      <p className="score-text">{score}</p>
    </ComponentWrapper>
  );
}

export default ScoreComponent;
