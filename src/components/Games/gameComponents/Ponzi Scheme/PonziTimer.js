import React from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #111;
  background: #eee;
  height: 120px;
  width: 260px;
  margin: 120px auto 0;

  h1 {
    font-family: 'Digital Dream', Helvetica, sans-serif;
    font-size: 66px;
  }
`;

function renderTimerString(time) {
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();
  const secondsFormatted = seconds.length > 1 ? seconds : `0${seconds}`;

  return `${minutes}:${secondsFormatted}`;
}

function PonziTimer({ time, display }) {
  return (
    <TimerContainer>
      {display && <h1>{renderTimerString(time)}</h1>}
    </TimerContainer>
  );
}

export default PonziTimer;
