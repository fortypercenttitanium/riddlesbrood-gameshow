import styled from 'styled-components';

const GamesMenuDiv = styled.div`
  display: flex;
  background-color: #eef98b;
  width: 130px;
  height: 110px;
  border-right: 5px solid black;
  border-bottom: 5px solid black;
  border-radius: 0 0 90% 0;
  text-align: center;
  cursor: pointer;
  grid-area: 1 / 1 / 2 / 2;
`;

const Title = styled.h1`
  position: relative;
  right: 10px;
  font-size: 1.8rem;
`;

export { GamesMenuDiv, Title };
