import React from 'react';
import styled from 'styled-components';
import veilImage from '../../../../assets/images/game_images/squares/veil.png';

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  height: 70%;
  width: 70%;
  margin: auto;
  border: 5px solid #222;
  border-radius: 4px;

  .veil {
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #222;
    background-image: url(${veilImage});
    background-size: cover;
    z-index: 2;
  }

  .game-image {
    height: 100%;
    width: 100%;
  }

  .blocks {
    display: grid;
    grid-template: repeat(4, 1fr) / repeat(4, 1fr);
    gap: 10px;
    position: absolute;
    height: 99%;
    width: 99%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4px;
  }

  .block {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }

  .green {
    background-color: green;
    transition: none;
  }

  .transparent {
    background-color: transparent;
    transition: 0.2s;
  }
`;

function SquaresImageContainer({ showVeil, gameImage, blocks }) {
  return (
    <ImageContainer>
      {showVeil && <div className="veil" />}
      <img className="game-image" src={gameImage} alt="current question" />
      <div className="blocks">
        {blocks.map((block, blockIndex) =>
          block ? (
            <div className="block green" key={blockIndex} />
          ) : (
            <div className="block transparent" key={blockIndex} />
          ),
        )}
      </div>
    </ImageContainer>
  );
}

export default SquaresImageContainer;
