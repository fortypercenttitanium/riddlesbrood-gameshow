import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ponziBackgroundNeutral from '../../../../assets/images/game_images/ponziScheme/ponzi-background-neutral.png';
import ponziBackgroundRed from '../../../../assets/images/game_images/ponziScheme/ponzi-background-red.png';
import ponziBackgroundBlue from '../../../../assets/images/game_images/ponziScheme/ponzi-background-blue.png';

const Container = styled.div`
  background-image: ${(props) => `url(${props.background})`};
  position: absolute;
  inset: 0;
`;

function PonziContainer({ children, activeTeam }) {
  const [backgroundImages, setBackgroundImages] = useState([]);

  // Pre-load image backgrounds
  useEffect(() => {
    const backgrounds = [
      ponziBackgroundNeutral,
      ponziBackgroundRed,
      ponziBackgroundBlue,
    ];

    const newImages = [];

    backgrounds.forEach((background) => {
      const img = new Image();
      img.src = background;
      newImages.push(img);
    });

    setBackgroundImages(newImages);
  }, []);

  return (
    <Container
      background={backgroundImages.length && backgroundImages[activeTeam].src}
    >
      {children}
    </Container>
  );
}

export default PonziContainer;
