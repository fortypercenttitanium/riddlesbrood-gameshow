import React, { useContext, useRef, useEffect } from 'react';
import { VideoContainer } from './VideoPlayerStyles';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';

// TODO: create functions for playing/stopping videos. export them to the top parent level.
// Add a listener for ipcRenderer for the play/stop video events. Send all requests to play videos
// to ipcMain.

export default function VideoPlayer({ window }) {
	let StoreContext;
	if (window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (window === 'gameboard') {
		StoreContext = StoreContextGB;
	}
	const { state, dispatch } = useContext(StoreContext);

	const video = useRef();

	useEffect(() => {
		video.current.volume =
			(state.audio.volume.sfx / 100) * (state.audio.volume.master / 100);
	}, [state.audio.volume]);

	useEffect(() => {
		if (state.VFX.playing && video.current.paused) {
			video.current.play();
		} else {
			video.current.pause();
			video.current.load();
		}
	}, [state.VFX.playing]);

	const handleClickContainer = () => {
		dispatch({ type: 'END_VIDEO' });
	};

	return (
		<VideoContainer
			onClick={handleClickContainer}
			style={{ pointerEvents: state.VFX.playing ? 'auto' : 'none' }}
		>
			<video
				ref={video}
				width='100%'
				src={state.VFX.file}
				type='video/mp4'
				onEnded={() => {
					dispatch({ type: 'END_VIDEO' });
				}}
			>
				<p>Unsupported video type</p>
			</video>
		</VideoContainer>
	);
}
