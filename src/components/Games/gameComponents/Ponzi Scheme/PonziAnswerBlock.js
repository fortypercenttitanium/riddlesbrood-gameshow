import React from 'react';
import styled from 'styled-components';

const AnswerBlockContainer = styled.div`
  height: 260px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  h1 {
    color: black;
    font-size: ${({ answerLength }) =>
      answerLength < 15 ? '112px' : answerLength < 20 ? '72px' : '48px'};
  }

  h2 {
    position: absolute;
    top: 160px;
    font-size: 40px;
  }
`;

function PonziAnswerBlock({ answer, windowInstance, wordsLeft }) {
  return (
    <AnswerBlockContainer answerLength={answer.length}>
      {answer && windowInstance === 'controlPanel' && (
        <h2>
          {wordsLeft} Word{wordsLeft > 1 && 's'} Remaining
        </h2>
      )}
      <h1>{answer}</h1>
    </AnswerBlockContainer>
  );
}

export default PonziAnswerBlock;
