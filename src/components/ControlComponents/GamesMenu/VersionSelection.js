import React from 'react';
import {
  VersionSelectDiv,
  VersionSelect,
  VersionH1,
  VersionOption,
} from './GamesMenuModalStyles';

function VersionSelection({ rating, gamesList, optionHandler, title }) {
  return (
    <VersionSelectDiv>
      <VersionH1>
        {rating !== 'kids' && 'Rated'} {rating.toUpperCase()}
      </VersionH1>
      <VersionSelect size="10">
        {gamesList
          .find((game) => game.title === title)
          .versions.map((gameVer, index) => {
            return (
              gameVer.rating === rating && (
                <VersionOption
                  key={index}
                  onClick={(e) => {
                    optionHandler(e, title, index, rating);
                  }}
                >
                  {gameVer.title}
                </VersionOption>
              )
            );
          })}
      </VersionSelect>
    </VersionSelectDiv>
  );
}

export default VersionSelection;
