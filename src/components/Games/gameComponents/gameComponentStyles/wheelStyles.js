import styled from 'styled-components';
import wheelBackground from '../../../../assets/images/game_images/wheel/wheel_background.png';

export const WheelContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(30, 30, 30);
  position: relative;
  background-image: url(${wheelBackground});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const BoardWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto 8px 18px auto;
  height: 100%;
  width: 100%;
  display: flex;
`;

export const Board = styled.div`
  margin: auto;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(14, 1fr);
  gap: 1px;
  padding: 8px 12px;
`;

export const Title = styled.h1`
  display: ${(props) => (props.display === 'select' ? 'inline' : 'none')};
  margin: 3rem auto;
  padding: 1rem;
  font-size: 4rem;
`;

export const CategoryContainer = styled.div`
  display: ${(props) => (props.display === 'select' ? 'flex' : 'none')};
  flex-direction: column;
  margin: 220px auto;
  gap: 48px;
  justify-content: space-between;
  align-items: center;

  select {
    height: 120px;
    padding-left: 24px;
    font-size: 3.5rem;
  }

  button {
    padding: 24px;
    font-size: 3rem;
  }
`;

export const CategoryCard = styled.button`
  display: flex;
  margin: auto;
  text-align: center;
  color: ${(props) => (props.done ? 'grey' : 'white')};
  padding: 2rem;
  border: 1px solid black;
  background: rgb(72, 95, 145);
  background: linear-gradient(
    149deg,
    rgba(72, 95, 145, 1) 0%,
    rgba(68, 90, 136, 1) 31%,
    rgba(57, 75, 115, 1) 56%,
    rgba(46, 61, 92, 1) 100%
  );
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
  &:active {
    transform: scale(0.95);
  }
  &:hover {
    border-color: white;
  }
`;

export const LetterCell = styled.div`
  background: ${(props) =>
    props.letter === ' '
      ? 'linear-gradient(120deg, rgba(58,179,136,1) 0%, rgba(46,150,113,1) 50%, rgba(38,136,102,1) 100%);'
      : '#ddd'};
  display: flex;
  height: 128px;
  width: 84px;
  border: 12px solid rgb(30, 30, 30);
  outline: 2px solid rgba(136, 182, 166, 1);
  &.active {
    background: blue;
  }
  &.blank {
    border: 12px solid transparent;
    outline: 2px solid transparent;
    background: transparent;
  }
`;

export const Span = styled.span`
  margin: auto;
  display: none;
  &.reveal {
    display: inline;
  }
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif,
    monospace;
  font-size: 5rem;
`;

export const LetterSpan = styled.span`
  margin: 0 10px;
`;

export const ReturnButton = styled.button`
  padding: 1rem;
  position: absolute;
  bottom: 76px;
  left: 40%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: auto;
  background: lightblue;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: white;
  }
  display: ${(props) =>
    props.display === 'board' && props.screen === 'controlPanel'
      ? 'flex'
      : 'none'};

  .select-new {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const H2 = styled.h2`
  margin: auto;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const SolvePuzzle = styled.button`
  display: ${(props) =>
    props.display === 'board' && props.screen === 'controlPanel'
      ? 'flex'
      : 'none'};
  position: absolute;
  bottom: 12px;
  left: 100px;
  padding: 14px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  margin: auto;
  background: lightblue;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: white;
  }
  .solve {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const GuessNextLetter = styled.button`
  display: ${(props) =>
    props.display === 'board' && props.screen === 'controlPanel'
      ? 'flex'
      : 'none'};
  position: absolute;
  bottom: 12px;
  right: 100px;
  padding: 4px 14px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  margin: auto;
  background: #5ae85d;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: white;
  }
  .guess {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const GuessNext2Letters = styled(GuessNextLetter)`
  bottom: 136px;
  background: #f56245;
`;

export const GuessedLettersDisplay = styled.div`
  display: flex;
  margin: auto;
  font-size: 3.2rem;
  font-weight: bold;
  text-shadow: 4px 4px 4px black;
`;

export const CategoryDisplay = styled.div`
  margin: auto auto 10px;
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 12px 0 8px;
  background: linear-gradient(
    90deg,
    rgba(133, 133, 133, 0) 0%,
    rgba(133, 133, 133, 0.5046393557422969) 8%,
    rgba(163, 163, 163, 0.5494572829131652) 50%,
    rgba(130, 130, 130, 0.5354516806722689) 92%,
    rgba(130, 130, 130, 0) 100%
  );
  color: white;
  display: ${(props) => (props.display === 'board' ? 'flex' : 'none')};
  border-top: 3px solid white;
  border-bottom: 3px solid white;
`;

export const CategoryH3 = styled.h3`
  margin: auto;
  font-size: 2rem;
`;

export const CategoryDisplayText = styled.h1`
  font-size: 5rem;
  color: #eee;
  margin: auto;
  text-shadow: 4px 4px 4px black;
`;
