import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: block;
  height: 12%;
  width: 85%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;

  .title {
    font-weight: bold;
    font-size: 5rem;
    display: ${(props) => (props.show === 'true' ? 'block' : 'none')};
    text-shadow: 2px 2px 2px #111;
  }
`;

function SquaresTitle({ show, title }) {
  return (
    <TitleContainer show={show}>
      <h1 className="title">{title}</h1>
    </TitleContainer>
  );
}

export default SquaresTitle;
