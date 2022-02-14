import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  border-radius: 5px;
  margin: auto auto 0;
  width: 100%;
  z-index: 5;
  justify-content: center;

  button {
    display: flex;
    margin: 0 24px 12px;
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

  h1 {
    font-size: 3rem;
    color: #ddd;
    margin: auto;
    padding: 4rem;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
`;

function ESPControls({ handleClickPrev, handleClickNext }) {
  return (
    <ControlsContainer>
      <button onClick={handleClickPrev}>
        <h1>Prev</h1>
      </button>
      <button onClick={handleClickNext}>
        <h1>Next</h1>
      </button>
    </ControlsContainer>
  );
}

export default ESPControls;
