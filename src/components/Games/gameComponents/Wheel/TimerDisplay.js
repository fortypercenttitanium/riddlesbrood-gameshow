import React from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 126px;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;

  .timer-box {
    display: flex;
    margin: auto;
    background: white;
    padding: 4px 24px;
  }

  .timer-text {
    font-size: 3.9rem;
    padding: 0;
    margin: 0;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  }
`;

function renderTimerString(time) {
  if (!time) return '0:00';
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();
  const secondsFormatted = seconds.length > 1 ? seconds : `0${seconds}`;

  return `${minutes}:${secondsFormatted}`;
}

function TimerDisplay({ timer }) {
  return (
    <TimerContainer>
      <div className="timer-box">
        <h1 className="timer-text">{renderTimerString(timer?.time)}</h1>
      </div>
    </TimerContainer>
  );
}

export default TimerDisplay;
