import styled from 'styled-components';

const TuneHomeScreen = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background: #222;
  color: gold;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 100;
`;

const TitleContainer = styled.div`
  display: block;
  position: relative;
  top: 100px;
  margin: auto;
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 5rem;
`;

const Title = styled(H1)`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const H2 = styled.h2`
  font-size: 3.5rem;
`;

const H3 = styled(H1)`
  font-size: 3rem;
  color: #ddd;
  margin: auto;
  padding: 3rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const PlayerContainer = styled.div`
  display: flex;
  border-radius: 1px;
  margin: 0 auto 60px;
  position: relative;
  bottom: 180px;
`;

const AudioImg = styled.img`
  height: 150px;
  width: 150px;
  cursor: pointer;
  margin: auto 80px;
  border: 1px solid #edd607;
  border-radius: 15px;
  padding: 20px;
  &:hover {
    background-color: #444;
  }
  &:active {
    transform: scale(0.97);
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  border-radius: 5px;
  margin: auto;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  margin: auto;
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

export {
  TuneHomeScreen,
  TitleContainer,
  H1,
  Title,
  H2,
  H3,
  PlayerContainer,
  AudioImg,
  Controls,
  Button,
};
