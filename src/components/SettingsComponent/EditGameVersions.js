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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
		margin: theme.spacing(3),
		minWidth: 120,
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
			const versions = await ipcRenderer.invoke('GET_GAME_VERSIONS', 'custom');
			const selectedGameVersions =
				selectedGame && versions[selectedGame.shortName]
					? versions[selectedGame.shortName]
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
		setDeleteSelection({});
		setFormOpen('');
	};

	const handleTitleChange = (e) => {
		setFormData({
			...formData,
			title: e.target.value,
		});
	};

	const handleRatingChange = (e) => {
		setFormData({
			...formData,
			rating: e.target.value,
		});
	};

	const handleContentChange = (content) => {
		setFormData({
			...formData,
			content,
		});
	};

	const handleClickOpenAdd = () => {
		setFormOpen(formOpen === 'add' ? '' : 'add');
	};

	const handleClickOpenDelete = () => {
		setFormOpen(formOpen === 'delete' ? '' : 'delete');
	};

	const handleDeleteSelection = (e) => {
		setDeleteSelection(e.target.value);
	};

	const handleSubmitAdd = async (e) => {
		e.preventDefault();
		const versions = await ipcRenderer.invoke('GET_GAME_VERSIONS', 'all');
		// if (versions===formData.title)
		console.log(versions);
	};

	const handleSubmitDelete = (e) => {
		e.preventDefault();
		console.log(deleteSelection);
	};

	return (
		<>
			{selectedGame ? (
				<>
					<CenteredDiv className={classes.buttonSpacing}>
						<Button
							color='default'
							onClick={handleClickReset}
							style={{ position: 'absolute', left: '2rem' }}
						>
							<ArrowBackIosIcon />
							Back to Games
						</Button>
						<Button
							variant='contained'
							color={formOpen === 'add' ? 'primary' : 'default'}
							onClick={handleClickOpenAdd}
						>
							Add version
						</Button>
						<Button
							variant='contained'
							color={formOpen === 'delete' ? 'primary' : 'default'}
							onClick={handleClickOpenDelete}
						>
							Delete version
						</Button>
					</CenteredDiv>
					{formOpen === 'add' && (
						<VersionForm onSubmit={handleSubmitAdd}>
							<CenteredDiv>
								<FormControl className={classes.formControl}>
									<TextField
										id='outlined-basic'
										label='Version Title'
										variant='outlined'
										style={{ width: '20rem' }}
										onChange={handleTitleChange}
										required
									/>
								</FormControl>
								<FormControl variant='outlined' className={classes.formControl}>
									<InputLabel id='demo-simple-select-outlined-label'>
										Rating
									</InputLabel>
									<Select
										labelId='demo-simple-select-outlined-label'
										id='demo-simple-select-outlined'
										labelWidth={45}
										value={formData.rating}
										onChange={handleRatingChange}
										required
									>
										<MenuItem value='kids'>Kids</MenuItem>
										<MenuItem value='pg13'>PG-13</MenuItem>
										<MenuItem value='r'>R</MenuItem>
									</Select>
								</FormControl>
							</CenteredDiv>
							<CenteredDiv>
								{renderVersionForm(selectedGame.shortName, {
									formData,
									handleContentChange,
									selectedGame,
								})}
							</CenteredDiv>

							<FormControl>
								<Button
									style={{ margin: '1rem auto' }}
									variant='contained'
									color='primary'
									type='submit'
									size='large'
								>
									ADD VERSION
								</Button>
							</FormControl>
						</VersionForm>
					)}
					{formOpen === 'delete' && (
						<VersionForm width={'25%'} onSubmit={handleSubmitDelete}>
							<FormControl component='fieldset'>
								<FormLabel component='legend'>Versions</FormLabel>
								<RadioGroup
									aria-label='deleteVersion'
									name='deleteVersion'
									value={deleteSelection}
									onChange={handleDeleteSelection}
								>
									{versionSelect.map((version, index) => {
										return (
											<FormControlLabel
												value={version.title}
												key={version.title}
												control={<Radio required />}
												label={`${version.title} (${version.rating})`}
											/>
										);
									})}
								</RadioGroup>
							</FormControl>
							<CenteredDiv>
								<FormControl>
									<Button type='submit' variant='contained' color='secondary'>
										DELETE
									</Button>
								</FormControl>
							</CenteredDiv>
						</VersionForm>
					)}
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
