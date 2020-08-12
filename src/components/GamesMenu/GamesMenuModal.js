import React, { useState } from 'react';
import styled from 'styled-components';
import { gamesArray } from '../Games/gamesArray';

const ModalContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 6;
`;

const GamesMenuModalDiv = styled.div`
	position: absolute;
	display: flex;
	flex-wrap: wrap;
	width: 70%;
	max-height: 85%;
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	text-align: center;
	background: #e2e0cb;
	border: 1px solid black;
	z-index: 5;
`;

const GameButton = styled.div`
	width: 25%;
	height: 120px;
	padding: 1rem;
	border: 1px solid white;
	margin: 1rem auto;
	text-align: center;
	cursor: pointer;
	user-select: none;
	&:hover {
		background-color: white;
		transition: 0.8s;
	}
`;

const GameLogo = styled.img`
	height: 100%;
	width: 100%;
`;

const VersionSelectContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
`;

const VersionSelectDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	flex: 1;
	margin: auto;
`;

export default function GamesMenuModal(props) {
	const { state, dispatch } = props.store;
	const [localState, setLocalState] = useState({
		selectedVersion: {
			Jeopardy: null,
			'Name That Tune': null,
			'Family Feud': null,
			'What The Hell Is It?': null,
			'Wheel Of Fortune': null,
			'$25,000 Pyramid': null,
			'Newlywed Game': null,
			'Couples Conundrum': null,
			ESP: null,
			'Card Sharks': null,
		},
		selectedRating: '',
	});

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
		dispatch({ type: 'GO_TO_VERSION_SELECT', payload: selectedGame });
	};

	const openGame = () => {
		const { title, scoreType, logo } = state.gamesMenu.selectedGame;
		const selectedGame = {
			title,
			scoreType,
			logo,
			version: localState.selectedVersion[title],
		};
		dispatch({ type: 'RESET_GAME' });
		dispatch({ type: 'SET_GAME', payload: selectedGame });
		dispatch({ type: 'CLOSE_GAMES_MENU' });
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
					gamesArray.map((game, index) => {
						return (
							<GameButton
								key={index}
								onClick={() => {
									handleGameClick(game);
								}}
							>
								<GameLogo src={`images/${game.logo}`} />
							</GameButton>
						);
					})}
				{state.gamesMenu.timeline === 'versionSelect' && (
					<VersionSelectContainer>
						<form
							className='versionSelectForm'
							onSubmit={submitHandler}
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								margin: 'auto',
							}}
						>
							<div
								style={{
									display: 'flex',
								}}
							>
								{gamesArray
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
											<VersionSelectDiv key={ratingIndex}>
												<h1>
													{rating !== 'kids' && 'Rated'} {rating.toUpperCase()}
												</h1>
												<select
													size='10'
													style={{
														margin: '1rem auto',
														width: '100%',
													}}
												>
													{gamesArray
														.find(
															(game) =>
																game.title ===
																state.gamesMenu.selectedGame.title
														)
														.versions.map((gameVer, gameVerIndex) => {
															return (
																gameVer.rating === rating && (
																	<option
																		key={gameVerIndex}
																		style={{ fontSize: '1rem' }}
																		onClick={(e) => {
																			optionHandler(
																				e,
																				state.gamesMenu.selectedGame.title,
																				gameVerIndex,
																				rating
																			);
																		}}
																	>
																		{gameVer.title}
																	</option>
																)
															);
														})}
												</select>
											</VersionSelectDiv>
										);
									})}
							</div>

							<button
								style={{
									padding: '1rem',
									fontSize: '1rem',
									fontWeight: 'bold',
									margin: '1rem auto',
								}}
								disabled={!localState.selectedRating}
							>
								Start selected{' '}
								<strong>{localState.selectedRating.toUpperCase()}</strong> rated
								game
							</button>
						</form>
					</VersionSelectContainer>
				)}
			</GamesMenuModalDiv>
		</ModalContainer>
	);
}
