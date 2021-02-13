import React, { useState, useEffect } from 'react';
import {
	GameLogosContainer,
	VersionForm,
	CenteredDiv,
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
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
const { ipcRenderer } = window.require('electron');

const logos = importAll(
	require.context('../../assets/images/logos', false, /\.png$|.jpg$|.jpeg$/)
);

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(5),
		minWidth: 100,
	},
	buttonSpacing: {
		'& > *': {
			margin: theme.spacing(1),
		},
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
	const [deleteSelection, setDeleteSelection] = useState({});
	const [formOpen, setFormOpen] = useState('');

	useEffect(() => {
		setTitle(
			selectedGame ? `${selectedGame.title} Versions` : 'Select a game:'
		);
	}, [setTitle, selectedGame]);

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

	const handleClickOpenAdd = () => {
		setFormOpen(formOpen === 'add' ? '' : 'add');
	};

	const handleClickOpenDelete = () => {
		setFormOpen(formOpen === 'delete' ? '' : 'delete');
	};

	const handleTitleChange = (e) => {
		setFormData({
			...formData,
			title: e.target.value,
		});
	};

	const handleDeleteSelection = (e) => {
		setDeleteSelection(e.target.value);
	};

	return (
		<>
			{selectedGame ? (
				<>
					<CenteredDiv className={classes.buttonSpacing}>
						<Button
							variant='contained'
							color={formOpen === 'add' ? 'primary' : 'secondary'}
							onClick={handleClickOpenAdd}
						>
							Add version
						</Button>
						<Button
							variant='contained'
							color={formOpen === 'delete' ? 'primary' : 'secondary'}
							onClick={handleClickOpenDelete}
						>
							Delete version
						</Button>
					</CenteredDiv>
					{formOpen === 'add' && (
						<VersionForm>
							<CenteredDiv>
								<FormControl className={classes.formControl}>
									<TextField
										id='standard-basic'
										label='Version Title'
										onChange={handleTitleChange}
									/>
								</FormControl>
								<FormControl className={classes.formControl}>
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
								</FormControl>
							</CenteredDiv>

							{renderVersionForm(selectedGame.shortName, {
								formData,
								setFormData,
								selectedGame,
							})}
						</VersionForm>
					)}
					{formOpen === 'delete' && (
						<VersionForm>
							<FormControl component='fieldset'>
								<FormLabel component='legend'>Versions</FormLabel>
								<RadioGroup
									aria-label='deleteVersion'
									name='deleteVersion'
									value={deleteSelection}
									onChange={handleDeleteSelection}
								>
									{versionSelect.map((version) => {
										return (
											<FormControlLabel
												value={version.title}
												key={version.title}
												control={<Radio />}
												label={`${version.title} (${version.rating})`}
											/>
										);
									})}
								</RadioGroup>
							</FormControl>
						</VersionForm>
					)}
					<CenteredDiv style={{ marginTop: '3rem' }}>
						<ReturnButton onClick={handleClickReset}>
							Choose different game
						</ReturnButton>
					</CenteredDiv>
				</>
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
