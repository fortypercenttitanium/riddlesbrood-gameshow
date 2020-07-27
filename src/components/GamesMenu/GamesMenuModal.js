import React, { Component } from 'react';
import styled from 'styled-components';
import { gamesArray } from '../Games/gamesArray';

const ModalContainer = styled.div`
	display: ${(props) => (props.open ? 'flex' : 'none')};
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
	height: 150px;
	width: 200px;
`;

const VersionSelectContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export class GamesMenuModal extends Component {
	state = {
		selectedVersion: {
			Jeopardy: 0,
			'Name That Tune': 0,
			'Family Feud': 0,
			'What The Hell Is It?': 0,
			'Wheel Of Fortune': 0,
			'$25,000 Pyramid': 0,
			'Newlywed Game': 0,
			'Couples Conundrum': 0,
			ESP: 0,
			'Card Sharks': 0,
		},
	};
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

	handleChange = (e, title) => {
		const gameList = this.state.selectedVersion;
		gameList[title] = Number(e.target.value);
		this.setState({
			selectedVersion: gameList,
		});
	};

	render() {
		return (
			<ModalContainer open={this.props.open} onClick={this.handleOutsideClick}>
				<GamesMenuModalDiv onClick={this.handleModalClick}>
					{this.props.timeline === 'gamesMenu' &&
						gamesArray.map((game, index) => {
							return (
								<GameButton
									key={index}
									onClick={() => {
										this.handleGameClick(game);
									}}
								>
									<GameLogo src={`images/${game.logo}`} />
								</GameButton>
							);
						})}
					{this.props.timeline === 'versionSelect' &&
						gamesArray
							.filter((game) => game.title === this.props.currentGame.title)
							.reduce((acc, val) => {
								if (!acc.includes(val.versions.rating)) {
									acc.push(val.versions.rating);
								}
							})
							.map((rating) => {
								return (
									<VersionSelectContainer>
										<h1>{rating.toUpperCase()}</h1>
										{gamesArray
											.filter(
												(game) => game.title === this.props.selectedGame.title
											)
											.map((game) => {
												return (
													<select size='5'>
														{game.versions.map((version) => {
															if (version.rating === rating) {
																return <option>{version.title}</option>;
															} else return null;
														})}
													</select>
												);
											})}
									</VersionSelectContainer>
								);
							})}
				</GamesMenuModalDiv>
			</ModalContainer>
		);
	}
}

export default GamesMenuModal;
