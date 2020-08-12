import * as gameVersions from './versions/gameVersions';

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
		logo: '',
		versions: [{ title: '', content: [] }],
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
		versions: [{ title: '', content: [] }],
	},
	{
		title: 'Couples Conundrum',
		logo: '',
		versions: [{ title: '', content: [] }],
	},
	{
		title: 'ESP',
		logo: '',
		versions: [{ title: '', content: [] }],
	},
	{
		title: 'Card Sharks',
		logo: 'CardSharksLogo.png',
		versions: [{ title: '', content: [] }],
	},
];

export { default as Jeopardy } from './Jeopardy';
export { default as FamilyFeud } from './FamilyFeud';
export { default as Pyramid } from './Pyramid';
export { default as Wheel } from './Wheel';
export { default as NameThatTune } from './NameThatTune';
