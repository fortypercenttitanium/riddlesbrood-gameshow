import React from 'react';
import styled from 'styled-components';
import espTitleBackground from '../../../../assets/images/game_images/esp/title-background.png';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 450px;
  width: 90%;
  margin: 0 auto;
  background-image: url(${espTitleBackground});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;

  h1 {
    display: block;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);
    color: black;
    font-size: ${(props) => (props.titleLength < 16 ? '100px' : '80px')};
  }
`;

function ESPTitle({ title }) {
  return (
    <TitleContainer titleLength={title.length}>
      <h1>{title}</h1>
    </TitleContainer>
  );
}

export default ESPTitle;
