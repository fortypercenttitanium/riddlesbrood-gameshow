import React from 'react';
import styled from 'styled-components';

const ControlButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 100px;
  width: 100%;

  button {
    padding: 24px;
    font-size: 40px;
    cursor: pointer;
    &:hover {
      border-color: white;
    }
  }

  button:first-of-type {
    margin-left: 250px;
    background: #feb8c5;
  }
  button:last-of-type {
    margin-right: 250px;
    background: #bafebf;
  }
`;

function PonziControlButtons({
  onClickCorrect: handleClickCorrect,
  onClickPass: handleClickPass,
}) {
  return (
    <ControlButtonsContainer>
      <button onClick={handleClickPass}>Pass</button>
      <button onClick={handleClickCorrect}>Correct</button>
    </ControlButtonsContainer>
  );
}

export default PonziControlButtons;
