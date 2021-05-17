import getGameVersions from '../../../../assets/game_versions/gameVersions';
import importAll from './importAll';

const videos = importAll(
	require.context(
		'../../../../assets/videos/game_intro_videos',
		true,
		/\.mp4|\.mov|\.mp3$/
	)
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
			title: 'Name That Tune',
			logo: 'Same Old Tune Logo.jpg',
			versions: gameVersions.nameThatTune,
			shortName: 'nameThatTune',
			video: { file: videos['tune_full.mp4'] },
		},
		{
			title: 'Family Feud',
			logo: 'Is Your Family Rude Logo.jpg',
			versions: gameVersions.familyFeud,
			shortName: 'familyFeud',
			video: {
				file: videos['family_intro.mp4'],
				callbackQueue: [{ file: videos['family_loop.mp4'], loop: true }],
				song: videos['songs/family_feud_intro_song.mp3'],
			},
		},
		{
			title: 'What The Hell Is It?',
			logo: 'Secret Squares Logo.jpg',
			versions: gameVersions.whatTheHellIsIt,
			shortName: 'whatTheHellIsIt',
			video: { file: videos['squares_full.mp4'] },
		},
		{
			title: 'Wheel Of Fortune',
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
			title: '$25,000 Pyramid',
			logo: 'Ponzi Scheme Logo.jpg',
			versions: gameVersions.pyramid,
			shortName: 'pyramid',
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

export { default as Jeopardy } from '../../gameComponents/Jeopardy';
export { default as FamilyFeud } from '../../gameComponents/FamilyFeud';
export { default as Pyramid } from '../../gameComponents/Pyramid';
export { default as Wheel } from '../../gameComponents/Wheel';
export { default as NameThatTune } from '../../gameComponents/NameThatTune';
export { default as WhatTheHellIsIt } from '../../gameComponents/WhatTheHellIsIt';
export { default as CouplesConundrum } from '../../gameComponents/CouplesConundrum';
export { default as ESP } from '../../gameComponents/ESP';
export { default as CardSharks } from '../../gameComponents/CardSharks';
