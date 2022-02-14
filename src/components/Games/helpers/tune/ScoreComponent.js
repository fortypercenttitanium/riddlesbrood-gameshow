import React from 'react';
import styled from 'styled-components';
import player1 from '../../../../assets/images/game_images/tune/player-1.png';
import player2 from '../../../../assets/images/game_images/tune/player-2.png';
import player3 from '../../../../assets/images/game_images/tune/player-3.png';
import player4 from '../../../../assets/images/game_images/tune/player-4.png';

const PlayerScoreDiv = styled.div`
  display: flex;
  background: ${(props) => `url(${props.image})`};
  background-size: 98%;
  background-position: ${(props) => props.position};
  background-repeat: no-repeat;
  height: 400px;
  width: 400px;
  margin: auto;

  h1 {
    font-size: 6rem;
    color: gold;
    margin: auto;
  }
`;

const playerScoreComponent = {
  1: player1,
  2: player2,
  3: player3,
  4: player4,
};

function ScoreComponent({ player, score }) {
  return (
    <PlayerScoreDiv
      image={playerScoreComponent[player]}
      position={
        player === 1
          ? '160% center'
          : player === 4
          ? '-60% center'
          : 'center center'
      }
    >
      <h1>{score}</h1>
    </PlayerScoreDiv>
  );
}

export default ScoreComponent;
