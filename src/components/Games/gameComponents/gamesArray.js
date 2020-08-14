import * as gameVersions from '../versions/gameVersions';

export const gamesArray = [
	{
		title: 'Jeopardy',
		logo: 'JeopardyLogo.png',
		versions: gameVersions.jeopardy,
	},
	{
		title: 'Name That Tune',
		logo: 'NameThatTuneLogo.png',
		versions: gameVersions.nameThatTune,
	},
	{
		title: 'Family Feud',
		logo: 'FamilyFeudLogo.png',
		versions: gameVersions.familyFeud,
	},
	{
		title: 'What The Hell Is It?',
		logo: 'WhatTheHellIsItLogo.png',
		versions: gameVersions.whatTheHellIsIt,
	},
	{
		title: 'Wheel Of Fortune',
		logo: 'WheelOfFortuneLogo.jpeg',
		versions: gameVersions.wheel,
	},
	{
		title: '$25,000 Pyramid',
		logo: '25kPyramidLogo.png',
		versions: gameVersions.pyramid,
	},
	{
		title: 'Newlywed Game',
		logo: 'NewlywedLogo.jpg',
		versions: gameVersions.newlywed,
	},
	{
		title: 'Couples Conundrum',
		logo: 'CouplesConundrumLogo.png',
		versions: gameVersions.couples,
	},
	{
		title: 'ESP',
		logo: 'ESPLogo.png',
		versions: gameVersions.esp,
	},
	{
		title: 'Card Sharks',
		logo: 'CardSharksLogo.png',
		versions: [null],
	},
];

export { default as Jeopardy } from './Jeopardy';
export { default as FamilyFeud } from './FamilyFeud';
export { default as Pyramid } from './Pyramid';
export { default as Wheel } from './Wheel';
export { default as NameThatTune } from './NameThatTune';
export { default as WhatTheHellIsIt } from './WhatTheHellIsIt';
export { default as NewlywedGame } from './NewlywedGame';
export { default as CouplesConundrum } from './CouplesConundrum';
export { default as ESP } from './ESP';
export { default as CardSharks } from './CardSharks';
