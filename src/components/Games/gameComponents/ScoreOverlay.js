import React from 'react';
import styled from 'styled-components';

const ScoreOverlayContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;

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

function ScoreOverlay({ ScoreComponent, position, score }) {
  const renderLinearScores = (scorePosition) => (
    <ScoreOverlayContainer className="f pa">
      <div className={`f ${scorePosition}`}>
        {score.scoreBoard.map((scoreNumber, index) => {
          return (
            Number.isInteger(scoreNumber) && (
              <ScoreComponent
                key={index}
                player={index + 1}
                score={scoreNumber}
                type={score.type}
              />
            )
          );
        })}
      </div>
    </ScoreOverlayContainer>
  );

  return position === 'corners' ? (
    <ScoreOverlayContainer className="f pa">
      {score.scoreBoard.map((scoreNumber, index) => {
        return (
          Number.isInteger(scoreNumber) && (
            <div key={index} className={`a${index} pa f`}>
              <ScoreComponent
                player={index + 1}
                score={scoreNumber}
                type={score.type}
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
