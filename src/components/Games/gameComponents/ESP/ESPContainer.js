import React from 'react';
import styled from 'styled-components';
import espSpiral from '../../../../assets/images/game_images/esp/esp-spiral.gif';
import espFace from '../../../../assets/images/game_images/esp/background-face.png';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-image: url(${espSpiral});
  background-size: cover;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  .esp-face {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 950px;
      margin: auto auto 20px;
    }
  }
`;

function ESPContainer({ children }) {
  return (
    <Container>
      <div className="esp-face">
        <img src={espFace} alt="face" />
      </div>

      {children}
    </Container>
  );
}

export default ESPContainer;
