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
			video: {
				file: videos['jeopardy_intro.mp4'],
				callbackQueue: [{ file: videos['jeopardy_loop.mp4'], loop: true }],
			},
		},
		{
			title: 'Name That Tune',
			logo: 'NameThatTuneLogo.png',
			versions: gameVersions.nameThatTune,
			shortName: 'nameThatTune',
			video: { file: videos['tune_full.mp4'] },
		},
		{
			title: 'Family Feud',
			logo: 'FamilyFeudLogo.png',
			versions: gameVersions.familyFeud,
			shortName: 'familyFeud',
			video: {
				file: videos['family_intro.mp4'],
				callbackQueue: [{ file: videos['family_loop.mp4'], loop: true }],
			},
		},
		{
			title: 'What The Hell Is It?',
			logo: 'WhatTheHellIsItLogo.png',
			versions: gameVersions.whatTheHellIsIt,
			shortName: 'whatTheHellIsIt',
			video: { file: videos['squares_full.mp4'] },
		},
		{
			title: 'Wheel Of Fortune',
			logo: 'WheelOfFortuneLogo.jpeg',
			versions: gameVersions.wheel,
			shortName: 'wheel',
			video: {
				file: videos['wheel_intro.mp4'],
				callbackQueue: [{ file: videos['wheel_loop.mp4'], loop: true }],
			},
		},
		{
			title: '$25,000 Pyramid',
			logo: '25kPyramidLogo.png',
			versions: gameVersions.pyramid,
			shortName: 'pyramid',
			video: {
				file: videos['ponzi_intro.mp4'],
				callbackQueue: [{ file: videos['ponzi_loop.mp4'], loop: true }],
			},
		},
		{
			title: 'Couples Conundrum',
			logo: 'CouplesConundrumLogo.png',
			versions: gameVersions.couples,
			shortName: 'couples',
			video: {
				file: videos['couples_intro.mp4'],
				callbackQueue: [{ file: videos['couples_loop.mp4'], loop: true }],
			},
		},
		{
			title: 'ESP',
			logo: 'ESPLogo.png',
			versions: gameVersions.esp,
			shortName: 'esp',
			video: { file: videos['esp_full.mp4'] },
		},
		{
			title: 'Card Sharks',
			logo: 'CardSharksLogo.png',
			versions: [],
			shortName: 'cardSharks',
			video: {
				file: videos['crazy_eights_intro.mp4'],
				callbackQueue: [{ file: videos['crazy_eights_loop.mp4'], loop: true }],
			},
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
