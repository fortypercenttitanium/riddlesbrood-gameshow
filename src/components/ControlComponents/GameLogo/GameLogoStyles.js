import styled from 'styled-components';

const GameLogoDiv = styled.div`
  grid-area: 1 / 2 / 2 / 4;
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 2px 2px;
`;

const LogoImg = styled.img`
  border-radius: 6px;
  height: 99%;
  margin: auto;
`;

export { GameLogoDiv, LogoImg };
