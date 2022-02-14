import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background: rgb(146, 145, 146);
  background: radial-gradient(
    circle,
    rgba(146, 145, 146, 1) 0%,
    rgba(59, 59, 59, 1) 66%,
    rgba(6, 5, 6, 1) 100%
  );
  color: gold;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

function SquaresContainer({ children }) {
  return <Container>{children}</Container>;
}

export default SquaresContainer;
