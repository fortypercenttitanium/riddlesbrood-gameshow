import React from 'react';
import NameThatTune from '../GameVersionForms/NameThatTune';
import Couples from '../GameVersionForms/Couples';
import ESP from '../GameVersionForms/ESP';
import FamilyFeud from '../GameVersionForms/FamilyFeud';
import Jeopardy from '../GameVersionForms/Jeopardy';
import Pyramid from '../GameVersionForms/Pyramid';
import WhatIsIt from '../GameVersionForms/WhatIsIt';
import Wheel from '../GameVersionForms/Wheel';

export default function renderVersionForm(
  game,
  { formData, handleSubmitAdd, assets, setAssets, form },
) {
  switch (game) {
    case 'couples': {
      return (
        <Couples
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
        />
      );
    }
    case 'esp': {
      return (
        <ESP
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
        />
      );
    }
    case 'familyRude': {
      return (
        <FamilyFeud
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
        />
      );
    }
    case 'jeopardy': {
      return (
        <Jeopardy
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
          assets={assets}
          form={form}
        />
      );
    }
    case 'sameOldTune': {
      return (
        <NameThatTune
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
          assets={assets}
        />
      );
    }
    case 'ponziScheme': {
      return (
        <Pyramid
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
        />
      );
    }
    case 'secretSquares': {
      return (
        <WhatIsIt
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
          assets={assets}
        />
      );
    }
    case 'wheel': {
      return (
        <Wheel
          formData={formData}
          handleSubmitAdd={handleSubmitAdd}
          setAssets={setAssets}
        />
      );
    }
    default: {
      return <h2>Error</h2>;
    }
  }
}
