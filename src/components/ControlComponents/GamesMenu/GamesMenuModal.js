import React, { useContext, useState, useEffect } from 'react';
import {
	ModalContainer,
	GamesMenuModalDiv,
	GameButton,
	GameLogo,
	VersionSelectContainer,
	StartButton,
	FlexDiv,
	Form,
} from './GamesMenuModalStyles';
import { StoreContext } from '../../../store/context';
import { gamesArray } from '../../Games/helpers/shared/gamesArray';
import VersionSelection from './VersionSelection';

function importAll(r) {
	const logos = {};
	r.keys().forEach((item) => {
		logos[item.replace('./', '')] = r(item);
	});
	return logos;
}

const logos = importAll(
	require.context('../../../assets/images/logos', false, /\.png$|.jpg$|.jpeg$/)
);

export default function GamesMenuModal() {
	const { state, dispatch } = useContext(StoreContext);
	const [localState, setLocalState] = useState({
		selectedVersion: {
			Jeopardy: null,
			'Name That Tune': null,
			'Family Feud': null,
			'What The Hell Is It?': null,
			'Wheel Of Fortune': null,
			'$25,000 Pyramid': null,
			'Couples Conundrum': null,
			ESP: null,
			'Card Sharks': null,
		},
		selectedRating: '',
	});

	const [gamesList, setGamesList] = useState([]);

	useEffect(() => {
		async function getGames() {
			const games = await gamesArray();
			console.log('games: ', games);
			setGamesList(games);
		}
		getGames();
	}, []);

	const handleOutsideClick = () => {
		dispatch({ type: 'CLOSE_GAMES_MENU' });
	};
	const handleModalClick = (e) => {
		e.stopPropagation();
	};
	const handleGameClick = (game) => {
		const { title, logo, scoreType } = game;
		const selectedGame = {
			title,
			logo,
			scoreType,
		};
		if (game.title === 'Card Sharks') {
			selectedGame.version = 0;
			dispatch({ type: 'SET_GAME', payload: selectedGame });
			dispatch({ type: 'CLOSE_GAMES_MENU' });
		} else {
			dispatch({ type: 'RESET_GAME' });
			dispatch({ type: 'GO_TO_VERSION_SELECT', payload: selectedGame });
		}
	};

	const openGame = () => {
		const { title, scoreType, logo } = state.gamesMenu.selectedGame;
		const selectedGame = {
			title,
			scoreType,
			logo,
			version: localState.selectedVersion[title],
		};
		dispatch({ type: 'CLOSE_GAMES_MENU' });
		dispatch({ type: 'SET_GAME', payload: selectedGame });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		openGame();
	};

	const optionHandler = (e, gameTitle, versionIndex, rating) => {
		document.querySelector('.versionSelectForm').reset();
		e.target.selected = true;
		setLocalState({
			selectedVersion: {
				[gameTitle]: versionIndex,
			},
			selectedRating: rating,
		});
	};

	return (
		<ModalContainer onClick={handleOutsideClick}>
			<GamesMenuModalDiv onClick={handleModalClick}>
				{state.gamesMenu.timeline === 'gamesMenu' &&
					gamesList.length > 0 &&
					gamesList.map((game, index) => {
						return (
							<GameButton
								key={index}
								onClick={() => {
									handleGameClick(game);
								}}
							>
								<GameLogo src={logos[game.logo]} />
							</GameButton>
						);
					})}
				{state.gamesMenu.timeline === 'versionSelect' && (
					<VersionSelectContainer>
						<Form className='versionSelectForm' onSubmit={submitHandler}>
							<FlexDiv>
								{gamesList
									.find(
										(game) => game.title === state.gamesMenu.selectedGame.title
									)
									.versions.map((version) => {
										return version.rating;
									})
									.reduce((unique, item) => {
										return unique.includes(item) ? unique : [...unique, item];
									}, [])
									.map((rating, ratingIndex) => {
										return (
											<VersionSelection
												key={ratingIndex}
												rating={rating}
												gamesList={gamesList}
												optionHandler={optionHandler}
												title={state.gamesMenu.selectedGame.title}
											/>
										);
									})}
							</FlexDiv>

							<StartButton disabled={!localState.selectedRating}>
								Start selected{' '}
								<strong>{localState.selectedRating.toUpperCase()}</strong> rated
								game
							</StartButton>
						</Form>
					</VersionSelectContainer>
				)}
			</GamesMenuModalDiv>
		</ModalContainer>
	);
}
