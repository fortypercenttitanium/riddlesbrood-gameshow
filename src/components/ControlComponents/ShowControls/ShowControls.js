import React, { useContext } from 'react';
import projector from '../../../assets/images/icons/projector.png';
import {
	ShowControlsDiv,
	Button,
	Label,
	ProjectorImage,
} from './ShowControlsStyles';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';
import importAll from '../../Games/helpers/shared/importAll';

const videos = importAll(
	require.context(
		'../../../assets/videos/show_control_videos',
		false,
		/\.mp4|\.mov$/
	)
);

export default function ShowControls({ projectorMode }) {
	const { state, dispatch } = useContext(StoreContext);
	const { VFX } = state;

	const handleClickVideo = (e) => {
		VFX.playing
			? dispatch({ type: actions.END_VIDEO })
			: dispatch({
					type: actions.PLAY_VIDEO,
					payload: { file: videos[e.currentTarget.dataset.video] },
			  });
	};
	return (
		<ShowControlsDiv>
			<Button area='1 / 1 / 2 / 2'>
				<Label>Preshow</Label>
			</Button>
			<Button area='2 / 1 / 3 / 2'>
				<Label>5 mins</Label>
			</Button>
			<Button
				data-video='Riddlesbrood 10sec NO SPIN Animated LOGO.mp4'
				area='1 / 2 / 2 / 3'
				onClick={handleClickVideo}
			>
				<Label>
					START
					<br />
					SHOW
				</Label>
			</Button>
			<Button area='2 / 2 / 3 / 3'>
				<Label>
					END
					<br />
					SHOW
				</Label>
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
