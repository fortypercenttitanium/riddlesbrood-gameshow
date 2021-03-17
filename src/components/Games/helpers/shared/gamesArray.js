import getGameVersions from '../../../../assets/game_versions/gameVersions';
import importAll from './importAll';

const videos = importAll(
	require.context(
		'../../../../assets/videos/game_intro_videos',
		false,
		/\.mp4|\.mov$/
	)
);

export async function gamesArray() {
	const gameVersions = await getGameVersions({ filtered: true });
	return [
		{
			title: 'Jeopardy',
			logo: 'JeopardyLogo.png',
			versions: gameVersions.jeopardy,
			shortName: 'jeopardy',
			video: videos['UR IN Jeopardy.mp4'],
		},
		{
			title: 'Name That Tune',
			logo: 'NameThatTuneLogo.png',
			versions: gameVersions.nameThatTune,
			shortName: 'nameThatTune',
			video: videos['Same Old Tune.mp4'],
		},
		{
			title: 'Family Feud',
			logo: 'FamilyFeudLogo.png',
			versions: gameVersions.familyFeud,
			shortName: 'familyFeud',
			video: videos['Is Your Family Rude.mp4'],
		},
		{
			title: 'What The Hell Is It?',
			logo: 'WhatTheHellIsItLogo.png',
			versions: gameVersions.whatTheHellIsIt,
			shortName: 'whatTheHellIsIt',
			video: videos['Secret Squares.mp4'],
		},
		{
			title: 'Wheel Of Fortune',
			logo: 'WheelOfFortuneLogo.jpeg',
			versions: gameVersions.wheel,
			shortName: 'wheel',
			video: videos['Feel The Fortune.mp4'],
		},
		{
			title: '$25,000 Pyramid',
			logo: '25kPyramidLogo.png',
			versions: gameVersions.pyramid,
			shortName: 'pyramid',
			video: videos['Ponzi Scheme.mp4'],
		},
		{
			title: 'Couples Conundrum',
			logo: 'CouplesConundrumLogo.png',
			versions: gameVersions.couples,
			shortName: 'couples',
			video: videos['Couples Conundrum.mp4'],
		},
		{
			title: 'ESP',
			logo: 'ESPLogo.png',
			versions: gameVersions.esp,
			shortName: 'esp',
			video: videos['ESP.mp4'],
		},
		{
			title: 'Card Sharks',
			logo: 'CardSharksLogo.png',
			versions: [],
			shortName: 'cardSharks',
			video: videos['Crazy Eights.mp4'],
		},
	];
}

export { default as Jeopardy } from '../../gameComponents/Jeopardy';
export { default as FamilyFeud } from '../../gameComponents/FamilyFeud';
export { default as Pyramid } from '../../gameComponents/Pyramid';
export { default as Wheel } from '../../gameComponents/Wheel';
export { default as NameThatTune } from '../../gameComponents/NameThatTune';
export { default as WhatTheHellIsIt } from '../../gameComponents/WhatTheHellIsIt';
export { default as CouplesConundrum } from '../../gameComponents/CouplesConundrum';
export { default as ESP } from '../../gameComponents/ESP';
export { default as CardSharks } from '../../gameComponents/CardSharks';
