import getGameVersions from '../../../../assets/game_versions/gameVersions';
import importAll from './importAll';

const videos = importAll(
  require.context(
    '../../../../assets/videos/game_intro_videos',
    true,
    /\.mp4|\.m4v|\.mov|\.mp3$/,
  ),
);

export async function gamesArray() {
  const gameVersions = await getGameVersions({ filtered: true });
  return [
    {
      title: 'Jeopardy',
      logo: 'UR In Jeopardy Logo.jpg',
      versions: gameVersions.jeopardy,
      shortName: 'jeopardy',
      video: {
        file: videos['jeopardy_intro.mp4'],
        callbackQueue: [{ file: videos['jeopardy_loop.mp4'], loop: true }],
        song: videos['songs/jeopardy_intro_song.mp3'],
      },
    },
    {
      title: 'Same Old Tune',
      logo: 'Same Old Tune Logo.jpg',
      versions: gameVersions.sameOldTune,
      shortName: 'sameOldTune',
      video: { file: videos['tune_full.mp4'] },
    },
    {
      title: 'Is Your Family Rude?',
      logo: 'Is Your Family Rude Logo.jpg',
      versions: gameVersions.familyRude,
      shortName: 'familyRude',
      video: {
        file: videos['family_intro.mp4'],
        callbackQueue: [{ file: videos['family_loop.mp4'], loop: true }],
        song: videos['songs/family_feud_intro_song.mp3'],
      },
    },
    {
      title: 'Secret Squares',
      logo: 'Secret Squares Logo.jpg',
      versions: gameVersions.secretSquares,
      shortName: 'secretSquares',
      video: { file: videos['squares_full.mp4'] },
    },
    {
      title: 'Feel The Fortune',
      logo: 'Feel the Fortune Logo.jpg',
      versions: gameVersions.wheel,
      shortName: 'wheel',
      video: {
        file: videos['wheel_intro.mp4'],
        callbackQueue: [{ file: videos['wheel_loop.mp4'], loop: true }],
        song: videos['songs/wheel_intro_song.mp3'],
      },
    },
    {
      title: '$25,000 Ponzi Scheme',
      logo: 'Ponzi Scheme Logo.jpg',
      versions: gameVersions.ponziScheme,
      shortName: 'ponziScheme',
      video: {
        file: videos['ponzi_intro.mp4'],
        callbackQueue: [{ file: videos['ponzi_loop.mp4'], loop: true }],
        song: videos['songs/pyramid_intro_song.mp3'],
      },
    },
    {
      title: 'Couples Conundrum',
      logo: 'Couples Conundrum Logo.jpg',
      versions: gameVersions.couples,
      shortName: 'couples',
      video: {
        file: videos['couples_intro.mp4'],
        callbackQueue: [{ file: videos['couples_loop.mp4'], loop: true }],
        song: videos['songs/couples_intro_song.mp3'],
      },
    },
    {
      title: 'ESP',
      logo: 'ESP Logo.jpg',
      versions: gameVersions.esp,
      shortName: 'esp',
      video: { file: videos['esp_full.mp4'] },
    },
    {
      title: 'Card Sharks',
      logo: 'Crazy Eights Logo.jpg',
      versions: [],
      shortName: 'cardSharks',
      video: {
        file: videos['crazy_eights_intro.mp4'],
        callbackQueue: [{ file: videos['crazy_eights_loop.mp4'], loop: true }],
        song: videos['songs/crazy_eights_intro_song.mp3'],
      },
    },
  ];
}

export { default as Jeopardy } from '../../gameComponents/Jeopardy/Jeopardy';
export { default as FamilyRude } from '../../gameComponents/Family Rude/FamilyRude';
export { default as PonziScheme } from '../../gameComponents/Ponzi Scheme/PonziScheme';
export { default as Wheel } from '../../gameComponents/Wheel/Wheel';
export { default as SameOldTune } from '../../gameComponents/Same Old Tune/SameOldTune';
export { default as SecretSquares } from '../../gameComponents/Secret Squares/SecretSquares';
export { default as CouplesConundrum } from '../../gameComponents/Couples Conundrum/CouplesConundrum';
export { default as ESP } from '../../gameComponents/ESP/ESP';
export { default as CardSharks } from '../../gameComponents/Card Sharks/CardSharks';
