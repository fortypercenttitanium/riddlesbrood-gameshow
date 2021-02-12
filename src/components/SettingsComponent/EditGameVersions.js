import React, { useState, useEffect } from 'react';
import { GameLogosContainer } from './styles/EditVersionsStyles';
import { gamesArray } from '../Games/helpers/shared/gamesArray.js';
import importAll from '../Games/helpers/shared/importAll';
import {
	GameButton,
	GameLogo,
} from '../ControlComponents/GamesMenu/GamesMenuModalStyles';
import renderVersionForm from './helpers/renderVersionForm';
const { ipcRenderer } = window.require('electron');

const logos = importAll(
	require.context('../../assets/images/logos', false, /\.png$|.jpg$|.jpeg$/)
);

function EditGameVersions({ setTitle }) {
	const [selectedGame, setSelectedGame] = useState();
	const [formData, setFormData] = useState({});
	const [gamesList, setGamesList] = useState([]);
	const [versionSelect, setVersionSelect] = useState([]);

	useEffect(() => {
		setTitle('Select a game:');
	}, [setTitle]);

	useEffect(() => {
		async function getGames() {
			setGamesList(await gamesArray());
		}
		getGames();
	}, []);

	useEffect(() => {
		async function populateGameVersions() {
			const allVersions = await ipcRenderer.invoke('GET_ALL_GAME_VERSIONS');
			const selectedGameVersions = selectedGame
				? allVersions[selectedGame.shortName]
				: [];
			setVersionSelect(selectedGameVersions);
		}
		populateGameVersions();
	}, [selectedGame]);

	const handleGameClick = (game) => {
		console.log(game);
		setSelectedGame(game);
	};

	return (
		<>
			{selectedGame ? (
				<form>
					<h1>{selectedGame.title}</h1>
					{renderVersionForm(selectedGame.shortName)}
				</form>
			) : (
				<GameLogosContainer>
					{gamesList.length > 0 &&
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
				</GameLogosContainer>
			)}
		</>
	);
}

export default EditGameVersions;
