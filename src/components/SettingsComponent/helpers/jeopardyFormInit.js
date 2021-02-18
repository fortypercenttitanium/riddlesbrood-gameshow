const initialJeopardyContent = [];

for (let i = 0; i < 5; i++) {
	initialJeopardyContent.push({
		category: '',
		questions: [
			{
				value: 100,
				type: 'text',
				question: '',
				answer: '',
				completed: false,
				dailyDouble: false,
			},
			{
				value: 200,
				type: 'text',
				question: '',
				answer: '',
				completed: false,
				dailyDouble: false,
			},
			{
				value: 300,
				type: 'text',
				question: '',
				answer: '',
				completed: false,
				dailyDouble: false,
			},
			{
				value: 400,
				type: 'text',
				question: '',
				answer: '',
				completed: false,
				dailyDouble: false,
			},
			{
				value: 500,
				type: 'text',
				question: '',
				answer: '',
				completed: false,
				dailyDouble: false,
			},
		],
	});
}

export default initialJeopardyContent;
