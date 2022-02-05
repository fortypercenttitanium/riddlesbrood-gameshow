import React from 'react';
import styled from 'styled-components';

const AnswerBlockContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: ${({ answerLength }) => (answerLength < 15 ? '186px' : '240px')};
  h1 {
    color: black;
    font-size: ${({ answerLength }) => (answerLength < 15 ? '112px' : '72px')};
  }
`;

function PonziAnswerBlock({ answer }) {
  return (
    <AnswerBlockContainer answerLength={answer.length}>
      <h1>{answer}</h1>
    </AnswerBlockContainer>
  );
}

export default PonziAnswerBlock;
