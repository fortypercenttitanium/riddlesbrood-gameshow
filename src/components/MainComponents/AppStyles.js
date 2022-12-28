import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: 120px 150px repeat(8, minmax(0, 1fr));
  background: rgb(212, 212, 212);
  background: linear-gradient(
    90deg,
    rgba(212, 212, 212, 1) 0%,
    rgba(177, 180, 194, 1) 8%,
    rgba(171, 175, 186, 1) 83%,
    rgba(199, 199, 199, 1) 100%
  );
`;

const ControlScreenContainer = styled.div`
  width: 900px;
  height: 506px;
  grid-area: 1 / 4 / 7 / 11;
  margin: auto;
`;

export { StyledApp, ControlScreenContainer };
