import React, { useContext } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import LogoScreen from '../LogoScreen/LogoScreen';
import CustomMessageScreen from '../CustomMessageScreen/CustomMessageScreen';
import { ControlScreenContainer } from './ControlScreenStyles';
import * as Games from '../../Games/helpers/shared/gamesArray';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';

const {
  Jeopardy,
  PonziScheme,
  FamilyRude,
  Wheel,
  SameOldTune,
  SecretSquares,
  CouplesConundrum,
  ESP,
  CardSharks,
} = Games;

const getComponent = (game, windowInstance) => {
  switch (game) {
    case 'Jeopardy':
      return <Jeopardy windowInstance={windowInstance} />;
    case 'Is Your Family Rude?':
      return <FamilyRude windowInstance={windowInstance} />;
    case '$25,000 Ponzi Scheme':
      return <PonziScheme windowInstance={windowInstance} />;
    case 'Feel The Fortune':
      return <Wheel windowInstance={windowInstance} />;
    case 'Same Old Tune':
      return <SameOldTune windowInstance={windowInstance} />;
    case 'Secret Squares':
      return <SecretSquares windowInstance={windowInstance} />;
    case 'Couples Conundrum':
      return <CouplesConundrum windowInstance={windowInstance} />;
    case 'ESP':
      return <ESP windowInstance={windowInstance} />;
    case 'Card Sharks':
      return <CardSharks windowInstance={windowInstance} />;
    default:
      return null;
  }
};

const TimelineController = ({
  timeline,
  gameTitle,
  customPreshowMessage,
  windowInstance,
}) => {
  switch (timeline) {
    case 'app-open':
      return <LogoScreen />;
    case 'custom-message-preshow':
      return <CustomMessageScreen message={customPreshowMessage} />;
    case 'in-game':
      return getComponent(gameTitle, windowInstance);
    default:
      return null;
  }
};

export default function ControlScreen({ windowInstance }) {
  let StoreContext;

  if (windowInstance === 'controlPanel') {
    StoreContext = StoreContextCP;
  } else if (windowInstance === 'gameboard') {
    StoreContext = StoreContextGB;
  }

  const { state } = useContext(StoreContext);
  const { currentGame, timeline, customPreshowMessage } = state;

  return (
    <ControlScreenContainer
      className={windowInstance === 'controlPanel' && 'preview-screen'}
    >
      <TimelineController
        timeline={timeline}
        gameTitle={currentGame.title}
        customPreshowMessage={customPreshowMessage}
        windowInstance={windowInstance}
      />
      <VideoPlayer windowInstance={windowInstance} />
    </ControlScreenContainer>
  );
}
