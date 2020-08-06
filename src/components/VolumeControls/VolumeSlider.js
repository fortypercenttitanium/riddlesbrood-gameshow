import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { StoreContext } from '../../App';

const useStyles = makeStyles({
	root: {
		width: '80%',
		textAlign: 'center',
		margin: 'auto',
		userSelect: 'none',
	},
});

export default function VolumeSlider(props) {
	const { state, dispatch } = useContext(StoreContext);
	const classes = useStyles();
	const { label, type } = props;

	const handleChange = (event, value) => {
		dispatch({ type: 'CHANGE_VOLUME', payload: { type, level: value } });
	};

	return (
		<div className={classes.root}>
			<Typography id='continuous-slider' gutterBottom>
				{label}
			</Typography>
			<Grid container spacing={2}>
				<Grid item>
					<VolumeDown />
				</Grid>
				<Grid item xs>
					<Slider
						value={state.audio.volume[type]}
						valueLabelDisplay='auto'
						onChange={handleChange}
						aria-labelledby='continuous-slider'
					/>
				</Grid>
				<Grid item>
					<VolumeUp />
				</Grid>
			</Grid>
		</div>
	);
}
