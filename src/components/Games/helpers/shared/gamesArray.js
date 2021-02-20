import getGameVersions from '../../../../assets/game_versions/gameVersions';

export async function gamesArray() {
	const gameVersions = await getGameVersions({ filtered: true });
	return [
		{
			title: 'Jeopardy',
			logo: 'JeopardyLogo.png',
			versions: gameVersions.jeopardy,
			shortName: 'jeopardy',
		},
		{
			title: 'Name That Tune',
			logo: 'NameThatTuneLogo.png',
			versions: gameVersions.nameThatTune,
			shortName: 'nameThatTune',
		},
		{
			title: 'Family Feud',
			logo: 'FamilyFeudLogo.png',
			versions: gameVersions.familyFeud,
			shortName: 'familyFeud',
		},
		{
			title: 'What The Hell Is It?',
			logo: 'WhatTheHellIsItLogo.png',
			versions: gameVersions.whatTheHellIsIt,
			shortName: 'whatTheHellIsIt',
		},
		{
			title: 'Wheel Of Fortune',
			logo: 'WheelOfFortuneLogo.jpeg',
			versions: gameVersions.wheel,
			shortName: 'wheel',
		},
		{
			title: '$25,000 Pyramid',
			logo: '25kPyramidLogo.png',
			versions: gameVersions.pyramid,
			shortName: 'pyramid',
		},
		{
			title: 'Couples Conundrum',
			logo: 'CouplesConundrumLogo.png',
			versions: gameVersions.couples,
			shortName: 'couples',
		},
		{
			title: 'ESP',
			logo: 'ESPLogo.png',
			versions: gameVersions.esp,
			shortName: 'esp',
		},
		{
			title: 'Card Sharks',
			logo: 'CardSharksLogo.png',
			versions: [],
			shortName: 'cardSharks',
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
