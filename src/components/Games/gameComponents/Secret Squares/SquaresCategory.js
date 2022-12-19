import React from 'react';
import styled from 'styled-components';

const SquaresCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .category-name {
    font-size: 5rem;
    text-shadow: 4px 4px 4px black;
  }
`;

function SquaresCategory({ category }) {
  return (
    <SquaresCategoryContainer>
      <h1 className="category-name">{category}</h1>
    </SquaresCategoryContainer>
  );
}

export default SquaresCategory;
