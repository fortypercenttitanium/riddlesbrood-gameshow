import React, { useState, useEffect } from 'react';
import { GameLogosContainer } from './styles/EditVersionsStyles';
import { gamesArray } from '../Games/helpers/shared/gamesArray.js';
import importAll from '../Games/helpers/shared/importAll';
import {
	GameButton,
	GameLogo,
} from '../ControlComponents/GamesMenu/GamesMenuModalStyles';

const logos = importAll(
	require.context('../../assets/images/logos', false, /\.png$|.jpg$|.jpeg$/)
);

function EditGameVersions({ setTitle }) {
	const [selectedGame, setSelectedGame] = useState('');
	const [formData, setFormData] = useState({});
	const [gamesList, setGamesList] = useState([]);

	useEffect(() => {
		setTitle('Select a game:');
	}, [setTitle]);

	useEffect(() => {
		async function getGames() {
			setGamesList(await gamesArray());
		}
		getGames();
	});

	const handleGameClick = (game) => {
		setSelectedGame(game);
	};

	return (
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
	);
}

export default EditGameVersions;
