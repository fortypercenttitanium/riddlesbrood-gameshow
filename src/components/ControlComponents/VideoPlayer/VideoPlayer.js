import React, { useContext, useRef, useEffect } from 'react';
import { VideoContainer } from './VideoPlayerStyles';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';

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

	return (
		<VideoContainer>
			<video
				ref={video}
				width='100%'
				src={state.VFX.file}
				type='video/mp4'
				autoPlay
				onEnded={() => {
					dispatch({ type: 'END_VIDEO' });
				}}
			>
				<p>Unsupported video type</p>
			</video>
		</VideoContainer>
	);
}
