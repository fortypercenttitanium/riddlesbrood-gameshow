import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const AddButton = withStyles((theme) => ({
	root: {
		color: '#ddddd',
		padding: '1.2rem 2rem',
		fontWeight: 'bold',
		textShadow: '2px 2px 2px rgb(50, 50, 50)',
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
}))(Button);

function AddVersionButton(onSubmit) {
	return (
		<FormControl>
			<AddButton
				style={{ margin: '1rem auto' }}
				variant='contained'
				color='primary'
				type='button'
				size='large'
				onClick={onSubmit}
			>
				ADD VERSION
			</AddButton>
		</FormControl>
	);
}

export default AddVersionButton;
