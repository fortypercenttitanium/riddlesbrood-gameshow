import React, { useState, useEffect } from 'react';
import {
	GameLogosContainer,
	VersionForm,
	TitleRatingContainer,
} from './styles/EditVersionsStyles';
import { gamesArray } from '../Games/helpers/shared/gamesArray.js';
import importAll from '../Games/helpers/shared/importAll';
import {
	GameButton,
	GameLogo,
} from '../ControlComponents/GamesMenu/GamesMenuModalStyles';
import { ReturnButton } from './styles/TemplateStyles';
import renderVersionForm from './helpers/renderVersionForm';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
const { ipcRenderer } = window.require('electron');

const logos = importAll(
	require.context('../../assets/images/logos', false, /\.png$|.jpg$|.jpeg$/)
);

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
		minWidth: 400,
	},
}));

function EditGameVersions({ setTitle }) {
	const classes = useStyles();
	const formInit = {
		title: '',
		rating: '',
		content: {},
	};
	const [selectedGame, setSelectedGame] = useState();
	const [formData, setFormData] = useState(formInit);
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

	const handleClickGame = (game) => {
		setSelectedGame(game);
	};

	const handleClickReset = (e) => {
		e.preventDefault();
		setSelectedGame();
		setFormData(formInit);
	};

	const handleRatingChange = (e) => {
		setFormData({
			...formData,
			rating: e.target.value,
		});
	};

	const handleTitleChange = (e) => {
		setFormData({
			...formData,
			title: e.target.value,
		});
	};

	return (
		<>
			{selectedGame ? (
				<FormControl className={classes.formControl}>
					<div>
						{' '}
						<InputLabel id='demo-simple-select-label'>Rating</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={formData.rating}
							onChange={handleRatingChange}
						>
							<MenuItem value='kids'>Kids</MenuItem>
							<MenuItem value='pg13'>PG-13</MenuItem>
							<MenuItem value='r'>R</MenuItem>
						</Select>
					</div>
					<div>
						<TextField
							id='standard-basic'
							label='Version Title'
							onChange={handleTitleChange}
						/>
					</div>
					{renderVersionForm(selectedGame.shortName, {
						formData,
						setFormData,
						selectedGame,
					})}
					<ReturnButton onClick={handleClickReset}>
						Choose different game
					</ReturnButton>
				</FormControl>
			) : (
				<GameLogosContainer>
					{gamesList.length > 0 &&
						gamesList.map((game, index) => {
							return (
								game.shortName !== 'cardSharks' && (
									<GameButton
										key={index}
										onClick={() => {
											handleClickGame(game);
										}}
									>
										<GameLogo src={logos[game.logo]} />
									</GameButton>
								)
							);
						})}
				</GameLogosContainer>
			)}
		</>
	);
}

export default EditGameVersions;
