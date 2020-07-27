import React, { Component } from 'react';
import styled from 'styled-components';
import { pyramid as versions } from './versions/gameVersions';
import ReactAudioPlayer from 'react-audio-player';

const PyramidHomeScreen = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	background-color: ${(props) =>
		props.team === 0 ? '#999' : props.team === 1 ? '#FF9999' : '#9999FF'};
	flex-direction: column;
	text-align: center;
	position: relative;
`;

const Title = styled.h1`
	margin: 3% auto;
	padding: 1rem;
`;

const CategoryContainer = styled.div`
	display: grid;
	grid-template-areas:
		'cat1 cat2'
		'cat3 cat4';
	width: 30%;
	margin: auto;
`;

const CategoryCard = styled.div`
	grid-area: ${(props) => props.gridArea};
	padding: 1rem;
	margin: 1%;
	text-align: center;
	display: ${(props) => (props.done ? 'none' : 'flex')};
	border: 1px solid red;
	cursor: pointer;
	&:hover {
		background: pink;
	}
`;

const Span = styled.span`
	margin: 0 auto;
	font-size: 1rem;
`;

const Modal = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	color: #ddd;
	background-color: inherit;
	text-align: center;
	cursor: pointer;
	display: ${(props) => (props.display === 'board' ? 'none' : 'flex')};
	flex-direction: column;
`;

const Button = styled.div`
	color: #eee;
	background: ${(props) =>
		props.type === 'correct'
			? 'rgb(97, 165, 85)'
			: props.type === 'incorrect'
			? 'rgb(167, 68, 57)'
			: '#000'};
	padding: 1rem;
	margin: auto;
	font-weight: bold;
`;

const ModalDiv = styled.div`
	height: 15%;
	margin: 0;
	padding: 0;
	display: flex;
`;

const H1 = styled.h1`
	margin: 0 auto;
	font-size: 2rem;
`;

const H2 = styled.h2`
	margin: auto;
	padding: 1rem;
	font-size: 1.5rem;
`;

const TeamButton = styled.div`
	background-color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
	border: ${(props) => (props.team === 1 ? '3px solid red' : '3px solid blue')};
	color: white;
	padding: 1rem;
	margin: 0 auto;
	border-color: ${(props) => props.activeTeam === props.team && 'white'};
`;

const TurnContainer = styled.div`
	display: flex;
	width: 50%;
	margin: 0 auto;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto auto 0;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

export class Pyramid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'board',
			currentQuestion: {
				category: '',
				words: [],
				index: 0,
			},
			streakTracker: 0,
			activeTeam: 0,
			board: versions[this.props.version].content,
			correctCounter: 0,
		};
		localStorage.setItem(
			'board',
			JSON.stringify(versions[this.props.version].content)
		);
		localStorage.setItem(
			'currentQuestion',
			JSON.stringify(this.state.currentQuestion)
		);
		localStorage.setItem(
			'correctCounter',
			JSON.stringify(this.state.correctCounter)
		);
		localStorage.setItem('activeTeam', JSON.stringify(this.state.activeTeam));
		localStorage.setItem('display', 'board');
		this.props.setScoreType('team', 2);
	}

	componentDidMount() {
		window.addEventListener('storage', this.localStorageUpdated);
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.localStorageUpdated);
	}

	componentDidUpdate(prevProps) {
		if (this.props.timer === 0) {
			this.setDisplay('roundOver');
			this.props.killTimer();
			this.props.playSound('sfx', 'soundfx/jeopardytimeup.mp3');
		} else if (this.props.timer > 0 && prevProps.timer !== this.props.timer) {
			this.props.playSound('sfx', 'soundfx/beep.mp3');
		}
	}

	localStorageUpdated = () => {
		this.setState({
			display: localStorage.getItem('display'),
			currentQuestion: JSON.parse(localStorage.getItem('currentQuestion')),
			correctCounter: JSON.parse(localStorage.getItem('correctCounter')),
			board: JSON.parse(localStorage.getItem('board')),
			activeTeam: JSON.parse(localStorage.getItem('activeTeam')),
			streakTracker: JSON.parse(localStorage.getItem('streakTracker')),
		});
	};

	setCategoryCompleted = (categoryIndex) => {
		const board = this.state.board;
		board[categoryIndex].completed = true;
		localStorage.setItem('board', JSON.stringify(board));
	};

	setDisplay = (displaySetting) => {
		localStorage.setItem('display', displaySetting);
	};

	setActiveTeam = (team) => {
		localStorage.setItem('activeTeam', JSON.stringify(team));
		this.localStorageUpdated();
	};

	setCurrentQuestion = (question) => {
		localStorage.setItem('currentQuestion', JSON.stringify(question));
	};

	setCorrectCounter = (count = 0) => {
		localStorage.setItem('correctCounter', JSON.stringify(count));
	};

	incStreakTracker = () => {
		localStorage.setItem(
			'streakTracker',
			JSON.stringify(this.state.streakTracker + 1)
		);
	};

	resetStreakTracker = () => {
		localStorage.setItem('streakTracker', JSON.stringify(0));
	};

	checkStreak = () => {
		const streak = JSON.parse(localStorage.getItem('streakTracker'));
		if (streak === 10) {
			this.addBonusTime(5);
			this.playSoundLocal('soundfx/ohyeah.wav');
		} else if (streak === 15) {
			this.addBonusTime(10);
			this.playSoundLocal('soundfx/ohyeah.wav');
		}
	};

	addBonusTime = (seconds) => {
		const remTime = this.props.timer + seconds;
		this.props.setTimer(remTime);
	};

	clickHandlerCategory = (question, index) => {
		if (this.state.activeTeam !== 0) {
			this.setCategoryCompleted(index);
			this.setDisplay('question');
			this.setCurrentQuestion({
				category: question.category,
				words: question.words,
				index: 0,
			});
			this.setCorrectCounter();
			this.resetStreakTracker();
			this.props.setTimer(20);
			this.props.runTimer();
			this.localStorageUpdated();
		} else {
			alert('Please select active team');
		}
	};

	checkIfRoundOver = () => {
		if (
			this.state.currentQuestion.index ===
			this.state.currentQuestion.words.length - 1
		) {
			this.setDisplay('roundOver');
			this.setCurrentQuestion({
				category: '',
				words: [],
				index: 0,
			});
			this.props.killTimer();
			this.localStorageUpdated();
			return true;
		} else return false;
	};

	nextQuestion = () => {
		if (!this.checkIfRoundOver()) {
			this.setCurrentQuestion({
				category: this.state.currentQuestion.category,
				words: this.state.currentQuestion.words,
				index: this.state.currentQuestion.index + 1,
			});
		}
	};

	correctHandler = (team) => {
		this.setCorrectCounter(this.state.correctCounter + 1);
		this.nextQuestion();
		this.playSoundLocal('soundfx/pyramidbell.mp3');
		this.props.changeScore(team - 1, 1);
		this.incStreakTracker();
		this.checkStreak();
		this.localStorageUpdated();
	};

	incorrectHandler = () => {
		this.nextQuestion();
		this.playSoundLocal('soundfx/buzzer.mp3');
		this.resetStreakTracker();
		this.localStorageUpdated();
	};

	returnToCategories = () => {
		this.setDisplay('board');
		this.localStorageUpdated();
	};

	playSoundLocal = (file) => {
		const player = this.refs.rapLocal.audioEl.current;
		player.src = file;
		player.volume = this.props.sfxVolume;
		this.stopSoundLocal();
		player.play();
	};

	stopSoundLocal = () => {
		this.refs.rapLocal.audioEl.current.pause();
		this.refs.rapLocal.audioEl.current.load();
	};

	pauseOrResumeSoundLocal = () => {
		this.refs.rapLocal.audioEl.current.paused
			? this.refs.rapLocal.audioEl.current.play()
			: this.refs.rapLocal.audioEl.current.pause();
	};

	render() {
		return (
			<PyramidHomeScreen team={this.state.activeTeam}>
				<Modal display={this.state.display}>
					<ModalDiv>
						<H1>{this.state.currentQuestion.category}</H1>
					</ModalDiv>
					<ModalDiv>
						<H2>
							{this.state.display === 'question'
								? this.props.timer
								: 'Round over'}
						</H2>
					</ModalDiv>
					<ModalDiv>
						<H2>{this.state.correctCounter}</H2>
					</ModalDiv>
					<ModalDiv>
						{this.state.display === 'question' ? (
							<H2>
								{
									this.state.currentQuestion.words[
										this.state.currentQuestion.index
									]
								}
							</H2>
						) : (
							<Button onClick={this.returnToCategories}>
								Return To Categories
							</Button>
						)}
					</ModalDiv>
					<ModalDiv
						style={{
							display: this.state.display === 'roundOver' && 'none',
						}}
					>
						<Button
							onClick={() => {
								this.correctHandler(this.state.activeTeam);
							}}
							type='correct'
						>
							<H2>Correct</H2>
						</Button>
						<Button onClick={this.incorrectHandler} type='incorrect'>
							<H2>Wrong/Pass</H2>
						</Button>
					</ModalDiv>
					<Container>
						<ScoreContainer team={1}>
							<H2>Team 1 Score</H2>
							<H2>{this.props.score.scoreBoard[0]}</H2>
						</ScoreContainer>
						<ScoreContainer team={2}>
							<H2>Team 2 Score</H2>
							<H2>{this.props.score.scoreBoard[1]}</H2>
						</ScoreContainer>
					</Container>
				</Modal>
				<Title>TURN:</Title>
				<TurnContainer>
					<TeamButton
						team={1}
						activeTeam={this.state.activeTeam}
						onClick={() => {
							this.setActiveTeam(1);
						}}
					>
						<H2>Team 1</H2>
					</TeamButton>
					<TeamButton
						team={2}
						activeTeam={this.state.activeTeam}
						onClick={() => {
							this.setActiveTeam(2);
						}}
					>
						<H2>Team 2</H2>
					</TeamButton>
				</TurnContainer>

				<Title>Categories</Title>
				<Container>
					<ScoreContainer team={1}>
						<H2>Team 1 Score</H2>
						<H2>{this.props.score.scoreBoard[0]}</H2>
					</ScoreContainer>
					<CategoryContainer>
						{this.state.board.map((item, index) => {
							return (
								<CategoryCard
									key={index}
									gridArea={`cat${index + 1}`}
									done={item.completed}
									onClick={() => {
										this.clickHandlerCategory(item, index);
									}}
								>
									<Span>{item.category}</Span>
								</CategoryCard>
							);
						})}
					</CategoryContainer>
					<ScoreContainer team={2}>
						<H2>Team 2 Score</H2>
						<H2>{this.props.score.scoreBoard[1]}</H2>
					</ScoreContainer>
				</Container>
				<ReactAudioPlayer ref={'rapLocal'} />
			</PyramidHomeScreen>
		);
	}
}

export default Pyramid;
