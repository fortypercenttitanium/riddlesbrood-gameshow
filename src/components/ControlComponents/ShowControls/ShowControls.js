import React, { useState, useContext, useEffect } from 'react';
import projector from '../../../assets/images/icons/projector.png';
import {
	ShowControlsDiv,
	Button,
	Label,
	ProjectorImage,
	HalfButton,
	AltLabel,
} from './ShowControlsStyles';
import { StoreContext } from '../../../store/context';
import importAll from '../../Games/helpers/shared/importAll';
const { ipcRenderer } = window.require('electron');

const showControlVideos = importAll(
	require.context(
		'../../../assets/videos/show_control_videos',
		false,
		/\.mp4|\.mov$/
	)
);

const commercialVideos = Object.values(
	importAll(require.context('../../../assets/videos/commercials'))
);

export default function ShowControls({ projectorMode }) {
	const { state, dispatch } = useContext(StoreContext);
	const [currentCommercial, setCurrentCommercial] = useState(0);

	// set preloaded custom message
	useEffect(() => {
		ipcRenderer
			.invoke('GET_CUSTOM_PRESHOW_MESSAGE')
			.then((message) =>
				dispatch({ type: 'SET_CUSTOM_PRESHOW_MESSAGE', payload: message })
			)
			.catch((err) => console.error(err));
	}, [dispatch]);

	const handleClickVideo = (e) => {
		ipcRenderer.send('PLAY_VIDEO_SEND', {
			file: showControlVideos[e.currentTarget.dataset.video],
			callbackQueue: e.currentTarget.dataset.callback
				? [{ file: showControlVideos[e.currentTarget.dataset.callback] }]
				: undefined,
		});
	};

	const handleClickPreshow = () => {
		dispatch({ type: 'RESET_GAME' });
	};

	const handleClickCommercial = () => {
		ipcRenderer.send('PLAY_VIDEO_SEND', {
			file: showControlVideos['brb.mp4'],
			callbackQueue: [{ file: commercialVideos[currentCommercial] }],
		});

		const nextCommercial =
			currentCommercial >= commercialVideos.length - 1
				? 0
				: currentCommercial + 1;
		setCurrentCommercial(nextCommercial);
	};

	const handleContext = async () => {
		try {
			const options = {
				title: 'Enter custom message',
				label: 'Cancel button will leave message as is.',
				value: state.customPreshowMessage || '',
				height: 200,
				width: 400,
			};

			const message = await ipcRenderer.invoke('PROMPT', { options });

			// if prompt cancelled, leave message as-is
			if (message !== null) {
				ipcRenderer.send('SET_CUSTOM_PRESHOW_MESSAGE', message);
				dispatch({ type: 'SET_CUSTOM_PRESHOW_MESSAGE', payload: message });
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleCustomMessageClick = () => {
		dispatch({ type: 'SHOW_CUSTOM_MESSAGE' });
	};

	return (
		<ShowControlsDiv>
			<div className='split-button'>
				<HalfButton onClick={handleClickPreshow}>
					<Label>Preshow</Label>
				</HalfButton>
				<HalfButton
					onClick={handleCustomMessageClick}
					onContextMenu={handleContext}
				>
					<AltLabel>
						{state.customPreshowMessage ||
							'Right-click to set custom preshow message'}
					</AltLabel>
				</HalfButton>
			</div>
			<Button
				data-video='five_min_intro.mp4'
				data-callback='quick_intro.mp4'
				onClick={handleClickVideo}
				area='1 / 2 / 2 / 3'
			>
				<Label>5 MIN INTRO</Label>
			</Button>
			<Button
				data-video='quick_intro.mp4'
				onClick={handleClickVideo}
				area='1 / 3 / 2 / 4'
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
			<Button onClick={handleClickCommercial} area='2 / 1 / 3 / 2'>
				<Label>COMMERCIAL BREAK</Label>
			</Button>
			<Button area='2 / 3 / 3 / 4'>
				<ProjectorImage src={projector} alt='' onClick={projectorMode} />
			</Button>
		</ShowControlsDiv>
	);
}
