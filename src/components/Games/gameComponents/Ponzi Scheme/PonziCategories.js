import React from 'react';
import styled from 'styled-components';
import PonziCategory from './PonziCategory';

const PonziCategoryContainer = styled.div`
  margin: 30px auto;
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function PonziCategories({ categories, activeCategory, onClickCategory }) {
  return (
    <PonziCategoryContainer>
      {categories.map((category, index) => (
        <PonziCategory
          key={category.category}
          status={
            activeCategory === category
              ? 'active'
              : category.completed
              ? 'finished'
              : 'ready'
          }
          categoryName={category.category}
          onClick={() => onClickCategory(category, index)}
        />
      ))}
    </PonziCategoryContainer>
  );
}

export default PonziCategories;
