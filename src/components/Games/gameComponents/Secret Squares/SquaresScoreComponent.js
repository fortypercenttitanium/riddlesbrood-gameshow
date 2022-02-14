import React from 'react';
import styled from 'styled-components';
import playerOneBG from '../../../../assets/images/game_images/squares/player-1-score.png';
import playerTwoBG from '../../../../assets/images/game_images/squares/player-2-score.png';
import playerThreeBG from '../../../../assets/images/game_images/squares/player-3-score.png';
import playerFourBG from '../../../../assets/images/game_images/squares/player-4-score.png';

const backgrounds = {
  1: playerOneBG,
  2: playerTwoBG,
  3: playerThreeBG,
  4: playerFourBG,
};

const ScoreComponentContainer = styled.div`
  background: center / contain no-repeat url(${(props) => props.bg});
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 240px;
  height: 240px;
  margin: 20px;

  .score-container {
    margin-top: 4px;
    margin-right: 3px;
  }

  h1 {
    color: black;
    font-size: 60px;
    text-shadow: 2px 2px 2px #dfdfdf;
  }
`;

function SquaresScoreComponent({ player, score }) {
  return (
    <ScoreComponentContainer bg={backgrounds[player]}>
      <div className="score-container">
        <h1>{score}</h1>
      </div>
    </ScoreComponentContainer>
  );
}

export default SquaresScoreComponent;
