import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FlexContainer, CenteredDiv } from './styles/EditVersionsStyles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	buttonSpacing: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

function EditSelect({ setTimeline, setTitle }) {
	const classes = useStyles();

	useEffect(() => {
		setTitle('Select an option:');
	}, [setTitle]);

	const handleFx = () => {
		setTimeline('edit-fx');
	};
	const handleVersions = () => {
		setTimeline('edit-game-versions');
	};

	return (
		<FlexContainer>
			<CenteredDiv className={classes.buttonSpacing}>
				<Button
					size='large'
					variant='contained'
					color='primary'
					onClick={handleFx}
				>
					Edit FX Buttons
				</Button>
				<Button
					size='large'
					variant='contained'
					color='primary'
					onClick={handleVersions}
				>
					Edit game versions
				</Button>
			</CenteredDiv>
		</FlexContainer>
	);
}

export default EditSelect;
