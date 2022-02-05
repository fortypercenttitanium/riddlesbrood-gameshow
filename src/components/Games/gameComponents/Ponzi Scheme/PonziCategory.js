import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PonziCategoryBlock = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0;
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    background: #333;
  }

  h1 {
    font-size: 60px;
    transform: scale(1.3, 1);
    padding: 12px;
    margin: 0;
  }
`;

function PonziCategory({ categoryName, status, onClick: handleClick }) {
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    switch (status) {
      case 'active':
        return setColor('red');
      case 'finished':
        return setColor('grey');
      default:
        return setColor('yellow');
    }
  }, [status]);

  return (
    <PonziCategoryBlock color={color} onClick={handleClick}>
      <h1>{categoryName}</h1>
    </PonziCategoryBlock>
  );
}

export default PonziCategory;
