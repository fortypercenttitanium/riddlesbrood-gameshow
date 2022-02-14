import React from 'react';
import styled from 'styled-components';
import playerOne from '../../../../assets/images/game_images/esp/player1.png';
import playerTwo from '../../../../assets/images/game_images/esp/player2.png';
import playerThree from '../../../../assets/images/game_images/esp/player3.png';
import playerFour from '../../../../assets/images/game_images/esp/player4.png';

const backgroundImages = {
  1: playerOne,
  2: playerTwo,
  3: playerThree,
  4: playerFour,
};

const padding = ['6px 0 0 6px', '10px 9px 0 0', '28px 0 0 2px', '8px 0 0 0'];

const ScoreComponentContainer = styled.div`
  display: flex;
  text-align: center;
  position: absolute;
  background: ${(props) => `center / contain no-repeat url(${props.bg})`};
  height: 400px;
  width: 300px;
  top: ${(props) => props.position.top};
  bottom: ${(props) => props.position.bottom};
  left: ${(props) => props.position.left};
  right: ${(props) => props.position.right};

  .sub-container {
    display: flex;
    margin: auto;
  }

  h1 {
    margin: 0;
    -webkit-text-stroke: 4px black;
    -webkit-text-fill-color: #fff600;
    font-size: 190px;
    padding: ${(props) => props.padding};
  }
`;

function ESPScoreComponent({ player, numTeams, score, type, position }) {
  const playerNumber =
    type === 'team' && numTeams === 2 && player > 1 ? 4 : player;

  return (
    <ScoreComponentContainer
      position={position}
      bg={backgroundImages[playerNumber]}
      padding={padding[player - 1]}
    >
      <div className="sub-container">
        <h1>{score}</h1>
      </div>
    </ScoreComponentContainer>
  );
}

export default ESPScoreComponent;
