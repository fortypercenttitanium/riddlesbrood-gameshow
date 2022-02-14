import React from 'react';
import styled from 'styled-components';
import { playButton, pauseButton } from '../../helpers/squares/imports';

const Controls = styled.div`
  display: flex;
  border-radius: 5px;
  margin: auto 200px;
  justify-content: center;
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;

  button {
    display: flex;
    padding: 24px;
    margin: auto;
    border: 1px solid black;
    background: rgb(72, 95, 145);
    background: linear-gradient(
      149deg,
      rgba(72, 95, 145, 1) 0%,
      rgba(68, 90, 136, 1) 31%,
      rgba(57, 75, 115, 1) 56%,
      rgba(46, 61, 92, 1) 100%
    );
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
    &:active {
      transform: scale(0.95);
    }
    &:hover {
      border-color: white;
    }
  }

  h3 {
    font-size: 3rem;
    color: #ddd;
    margin: auto;
    padding: 1rem;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }

  img {
    height: 100px;
    width: 100px;
    cursor: pointer;
    margin: auto;
    border: 5px solid #edd607;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 2px 2px 2px #222;
    &:hover {
      background-color: #444;
    }
  }
`;

function SquaresControls({
  answerRevealed,
  handleClickReveal,
  timer,
  handleClickPlayPause,
  handleClickNext,
}) {
  return (
    <Controls>
      <button onClick={handleClickReveal}>
        <h3>{answerRevealed ? 'Unreveal' : 'Reveal'}</h3>
      </button>
      <img
        src={timer.running ? pauseButton : playButton}
        alt=""
        onClick={handleClickPlayPause}
      />
      <button onClick={handleClickNext}>
        <h3>Next picture</h3>
      </button>
    </Controls>
  );
}

export default SquaresControls;
