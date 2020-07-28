import React, { Component } from 'react';
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
	z-index: 2;
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
	z-index: 3;
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

export class GamesMenuModal extends Component {
	state = {
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
	};

	componentDidUpdate() {
		console.log(gamesArray);
	}

	handleOutsideClick = () => {
		this.props.close();
	};
	handleModalClick = (e) => {
		e.stopPropagation();
	};
	handleGameClick = (game) => {
		this.props.goToVersionSelect(game);
	};

	openGame = () => {
		const { title, scoreType, logo } = this.props.selectedGame;
		const selectedGame = {
			title,
			scoreType,
			logo,
			version: this.state.selectedVersion[title],
		};
		this.props.setGame(selectedGame);
		this.props.close();
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.openGame();
	};

	optionHandler = (e, gameTitle, versionIndex, rating) => {
		document.querySelector('.versionSelectForm').reset();
		e.target.selected = true;
		this.setState({
			selectedVersion: {
				[gameTitle]: versionIndex,
			},
			selectedRating: rating,
		});
	};

	render() {
		return (
			<ModalContainer onClick={this.handleOutsideClick}>
				<GamesMenuModalDiv onClick={this.handleModalClick}>
					{this.props.timeline === 'gamesMenu' &&
						gamesArray.map((game, index) => {
							return (
								<GameButton
									key={index}
									onClick={(e) => {
										this.handleGameClick(game);
									}}
								>
									<GameLogo src={`images/${game.logo}`} />
								</GameButton>
							);
						})}
					{this.props.timeline === 'versionSelect' && (
						<VersionSelectContainer>
							<form
								className='versionSelectForm'
								onSubmit={this.submitHandler}
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
											(game) => game.title === this.props.selectedGame.title
										)
										.versions.map((version) => {
											return version.rating;
										})
										.map((rating, ratingIndex) => {
											return (
												<VersionSelectDiv key={ratingIndex}>
													<h1>{rating.toUpperCase()}</h1>
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
																	game.title === this.props.selectedGame.title
															)
															.versions.map((gameVer, gameVerIndex) => {
																return (
																	gameVer.rating === rating && (
																		<option
																			key={gameVerIndex}
																			style={{ fontSize: '1rem' }}
																			onClick={(e) => {
																				this.optionHandler(
																					e,
																					this.props.selectedGame.title,
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
									disabled={!this.state.selectedRating}
								>
									Start selected{' '}
									<strong>{this.state.selectedRating.toUpperCase()}</strong>{' '}
									rated game
								</button>
							</form>
						</VersionSelectContainer>
					)}
				</GamesMenuModalDiv>
			</ModalContainer>
		);
	}
}

export default GamesMenuModal;
