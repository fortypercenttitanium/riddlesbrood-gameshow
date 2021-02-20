import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FlexContainer, CenteredDiv } from './styles/EditVersionsStyles';
import { makeStyles } from '@material-ui/core/styles';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
	buttonSpacing: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

function Init({ setTimeline, setTitle }) {
	const classes = useStyles();

	useEffect(() => {
		setTitle('Riddlesbrood Gameshow');
	}, [setTitle]);

	const handleLaunchClick = () => {
		ipcRenderer.send('LAUNCH_GAME');
	};
	const handleEditClick = () => {
		setTimeline('edit-select');
	};

	return (
		<FlexContainer>
			<CenteredDiv className={classes.buttonSpacing}>
				<Button
					size='large'
					variant='contained'
					color='primary'
					onClick={handleLaunchClick}
				>
					Start game
				</Button>
				<Button
					size='large'
					variant='contained'
					color='primary'
					onClick={handleEditClick}
				>
					Edit content
				</Button>
			</CenteredDiv>
		</FlexContainer>
	);
}

export default Init;
