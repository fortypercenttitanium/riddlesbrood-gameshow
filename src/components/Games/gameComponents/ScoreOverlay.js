import React from 'react';
import styled from 'styled-components';

const ScoreOverlayContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  height: 100%;
  position: absolute;
  display: flex;
  pointer-events: none;

  .pa {
    position: absolute;
  }

  .f {
    display: flex;
  }

  .a0 {
    top: 0;
    left: 0;
  }
  .a1 {
    top: 0;
    right: 0;
  }

  .a2 {
    bottom: 0;
    left: 0;
  }

  .a3 {
    bottom: 0;
    right: 0;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
  }

  .top {
    position: absolute;
    top: 16px;
    left: 0;
    right: 0;
    justify-content: center;
  }
`;

function ScoreOverlay({ ScoreComponent, position, score, clickHandler }) {
  let newScoreboard = [...score.scoreBoard];
  if (
    score.type === 'team' &&
    newScoreboard.filter((score) => Number.isInteger(score)).length === 2
  ) {
    newScoreboard = newScoreboard.filter((score) => Number.isInteger(score));
  }

  const renderLinearScores = (scorePosition) => (
    <ScoreOverlayContainer>
      <div className={`f ${scorePosition}`}>
        {newScoreboard.map((scoreNumber, index) => {
          return (
            Number.isInteger(scoreNumber) && (
              <ScoreComponent
                key={index}
                player={index + 1}
                numTeams={newScoreboard.length}
                score={scoreNumber}
                type={score.type}
                clickHandler={clickHandler}
              />
            )
          );
        })}
      </div>
    </ScoreOverlayContainer>
  );

  if (Array.isArray(position)) {
    return (
      <ScoreOverlayContainer>
        {newScoreboard.map((scoreNumber, index) => {
          return (
            Number.isInteger(scoreNumber) && (
              <ScoreComponent
                position={position[index]}
                player={index + 1}
                score={scoreNumber}
                type={score.type}
                clickHandler={clickHandler}
                numTeams={newScoreboard.length}
                key={index}
              />
            )
          );
        })}
      </ScoreOverlayContainer>
    );
  }

  return position === 'corners' ? (
    <ScoreOverlayContainer>
      {newScoreboard.map((scoreNumber, index) => {
        return (
          Number.isInteger(scoreNumber) && (
            <div key={index} className={`a${index} pa f`}>
              <ScoreComponent
                player={index + 1}
                score={scoreNumber}
                type={score.type}
                clickHandler={clickHandler}
                numTeams={newScoreboard.length}
              />
            </div>
          )
        );
      })}
    </ScoreOverlayContainer>
  ) : (
    renderLinearScores(position)
  );
}

export default ScoreOverlay;
