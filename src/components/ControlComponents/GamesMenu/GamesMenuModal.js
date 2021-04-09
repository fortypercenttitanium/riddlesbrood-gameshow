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
import importAll from '../../Games/helpers/shared/importAll';
const { ipcRenderer } = window.require('electron');

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
		const { title, logo, scoreType, video } = game;
		const selectedGame = {
			title,
			logo,
			scoreType,
			video,
		};
		if (game.title === 'Card Sharks') {
			selectedGame.version = 0;
			dispatch({ type: 'CLOSE_GAMES_MENU' });
			ipcRenderer.send('PLAY_VIDEO_SEND', { file: selectedGame.video });
			setTimeout(() => {
				dispatch({ type: 'SET_GAME', payload: selectedGame });
			}, 1000);
		} else {
			dispatch({ type: 'RESET_GAME' });
			dispatch({ type: 'GO_TO_VERSION_SELECT', payload: selectedGame });
		}
	};

	const openGame = () => {
		const { title, scoreType, logo, video } = state.gamesMenu.selectedGame;
		const selectedGame = {
			title,
			scoreType,
			logo,
			version: localState.selectedVersion[title],
			video,
		};
		dispatch({ type: 'CLOSE_GAMES_MENU' });
		ipcRenderer.send('PLAY_VIDEO_SEND', { file: selectedGame.video });
		setTimeout(() => {
			dispatch({ type: 'SET_GAME', payload: selectedGame });
		}, 2000);
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
