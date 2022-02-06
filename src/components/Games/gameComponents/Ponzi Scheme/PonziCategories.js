import React from 'react';
import styled from 'styled-components';
import PonziCategory from './PonziCategory';

const PonziCategoryContainer = styled.div`
  position: relative;
  margin: 30px auto;
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* z-index to pull the category box over top of the pass/correct button box */
  z-index: 2;
`;

function PonziCategories({ categories, activeCategory, onClickCategory }) {
  return (
    <PonziCategoryContainer>
      {categories.map((category) => (
        <PonziCategory
          key={category.category}
          status={
            category?.completed
              ? 'finished'
              : activeCategory?.category === category.category
              ? 'active'
              : 'ready'
          }
          categoryName={category.category}
          onClick={() => onClickCategory(category)}
        />
      ))}
    </PonziCategoryContainer>
  );
}

export default PonziCategories;
