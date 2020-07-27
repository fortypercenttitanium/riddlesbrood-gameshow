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
		versions: [{ title: '', content: [] }],
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

export { Jeopardy } from './Jeopardy';
export { FamilyFeud } from './FamilyFeud';
export { Pyramid } from './Pyramid';
export { Wheel } from './Wheel';
