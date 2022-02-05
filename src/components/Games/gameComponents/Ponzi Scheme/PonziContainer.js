import React from 'react';
import styled from 'styled-components';
import ponziBackground from '../../../../assets/images/game_images/ponziScheme/ponzi-background.png';

const Container = styled.div`
  background-image: url(${ponziBackground});
  position: absolute;
  inset: 0;
`;

function PonziContainer({ children }) {
  return <Container>{children}</Container>;
}

export default PonziContainer;
