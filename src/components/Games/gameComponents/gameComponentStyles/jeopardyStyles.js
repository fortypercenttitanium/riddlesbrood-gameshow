import styled from 'styled-components';
import jeopardyBackground from '../../../../assets/images/game_images/jeopardy/jeopardy-background.svg';

const JeopardyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: #222;
  position: relative;
  pointer-events: ${(props) => (props.disableTouch ? 'none' : 'auto')};
`;

const Board = styled.div`
  margin: 7.5% auto;
  position: relative;
  background: black;
  height: 80%;
  width: 80%;
  display: grid;
  grid-auto-flow: column;
  grid-template: 100% / repeat(5, 1fr);
  grid-gap: 2px;
  border: 1px solid black;
`;

const Modal = styled.div`
  z-index: 20;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: impact;
  color: #ddd;
  background: linear-gradient(to top left, #000088, #0000ff);
  font-size: 5rem;
  text-align: center;
  cursor: pointer;
  display: ${(props) => (props.display === 'board' ? 'none' : 'flex')};

  .question-text {
    margin: auto;
    text-shadow: 3px 3px 3px black;
    font-size: 6rem;
    line-height: 10rem;
    font-weight: 400;
    padding: 200px;
  }

  .question-image {
    margin: auto;
  }
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CatCell = styled.div`
  text-align: center;
  display: flex;
  flex: 1;
  font-size: 2.5rem;
  font-family: impact;
  color: #eee;
  background: linear-gradient(to top left, #000088, #0000ff);
  border: 3px solid #000;
  & > span {
    text-shadow: 2px 2px 2px black;
  }
`;

const QCell = styled(CatCell)`
  color: #ffd87d;
  font-size: 4rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #fffbaf;
  }
`;

const StyledSpan = styled.span`
  margin: auto;
  text-shadow: 4px 4px 4px black;
  display: ${(props) => props.display};
`;

const DailyImg = styled.img`
  width: 1920px;
`;

const DecorContainer = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: url(${jeopardyBackground}) center/cover;
`;

export {
  JeopardyContainer,
  Board,
  Modal,
  CellContainer,
  CatCell,
  QCell,
  StyledSpan,
  DailyImg,
  DecorContainer,
};
