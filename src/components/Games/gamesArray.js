import * as gameVersions from './versions/gameVersions';

export const gamesArray = [
	{
		title: 'Jeopardy',
		logo: 'JeopardyLogo.png',
		versions: gameVersions.jeopardy,
		scoreType: 'players',
	},
	{
		title: 'Name That Tune',
		logo: 'NameThatTuneLogo.png',
		versions: [{ title: '', content: [] }],
		scoreType: '',
	},
	{
		title: 'Family Feud',
		logo: 'FamilyFeudLogo.png',
		versions: gameVersions.familyfeud,
		scoreType: '',
	},
	{
		title: 'What The Hell Is It?',
		logo: '',
		versions: [{ title: '', content: [] }],
		scoreType: '',
	},
	{
		title: 'Wheel Of Fortune',
		logo: 'WheelOfFortuneLogo.jpeg',
		versions: gameVersions.wheel,
		scoreType: 'players',
	},
	{
		title: '$25,000 Pyramid',
		logo: '25kPyramidLogo.png',
		versions: gameVersions.pyramid,
		scoreType: 'teams',
	},
	{
		title: 'Newlywed Game',
		logo: 'NewlywedLogo.jpg',
		versions: [{ title: '', content: [] }],
		scoreType: '',
	},
	{
		title: 'Couples Conundrum',
		logo: '',
		versions: [{ title: '', content: [] }],
		scoreType: '',
	},
	{
		title: 'ESP',
		logo: '',
		versions: [{ title: '', content: [] }],
		scoreType: '',
	},
	{
		title: 'Card Sharks',
		logo: 'CardSharksLogo.png',
		versions: [{ title: '', content: [] }],
		scoreType: '',
	},
];

export { default as Jeopardy } from './Jeopardy';
export { default as FamilyFeud } from './FamilyFeud';
export { default as Pyramid } from './Pyramid';
export { default as Wheel } from './Wheel';
