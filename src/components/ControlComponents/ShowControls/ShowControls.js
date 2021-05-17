import React, { useContext } from 'react';
import projector from '../../../assets/images/icons/projector.png';
import {
	ShowControlsDiv,
	Button,
	Label,
	ProjectorImage,
} from './ShowControlsStyles';
import { StoreContext } from '../../../store/context';
import importAll from '../../Games/helpers/shared/importAll';
const { ipcRenderer } = window.require('electron');

const videos = importAll(
	require.context(
		'../../../assets/videos/show_control_videos',
		false,
		/\.mp4|\.mov$/
	)
);

export default function ShowControls({ projectorMode }) {
	const { dispatch } = useContext(StoreContext);

	const handleClickVideo = (e) => {
		ipcRenderer.send('PLAY_VIDEO_SEND', {
			file: videos[e.currentTarget.dataset.video],
			callbackQueue: e.currentTarget.dataset.callback
				? [{ file: videos[e.currentTarget.dataset.callback] }]
				: undefined,
		});
	};

	const handleClickPreshow = () => {
		dispatch({ type: 'RESET_GAME' });
	};

	return (
		<ShowControlsDiv>
			<Button onClick={handleClickPreshow} area='1 / 1 / 2 / 2'>
				<Label>Preshow</Label>
			</Button>
			<Button
				data-video='five_min_intro.mp4'
				data-callback='quick_intro.mp4'
				onClick={handleClickVideo}
				area='2 / 1 / 3 / 2'
			>
				<Label>5 MIN INTRO</Label>
			</Button>
			<Button
				data-video='quick_intro.mp4'
				onClick={handleClickVideo}
				area='1 / 2 / 2 / 3'
			>
				<Label>QUICK INTRO</Label>
			</Button>
			<Button
				data-video='end_of_show.mp4'
				onClick={handleClickVideo}
				area='2 / 2 / 3 / 3'
			>
				<Label>END SHOW</Label>
			</Button>
			<Button area='1 / 3 / 2 / 4'>
				<Label>
					INTER
					<br />
					MISSION
				</Label>
			</Button>
			<Button area='2 / 3 / 3 / 4'>
				<ProjectorImage src={projector} alt='' onClick={projectorMode} />
			</Button>
		</ShowControlsDiv>
	);
}
