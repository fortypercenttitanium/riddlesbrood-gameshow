import React, { useContext, useRef, useEffect } from 'react';
import { VideoContainer } from './VideoPlayerStyles';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';

export default function VideoPlayer({ windowInstance }) {
	let StoreContext;
	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}
	const { state, dispatch } = useContext(StoreContext);

	const video = useRef();

	useEffect(() => {
		video.current.volume =
			windowInstance === 'gameboard'
				? (state.audio.volume.sfx / 100) * (state.audio.volume.master / 100)
				: 0;
	}, [state.audio.volume, windowInstance]);

	useEffect(() => {
		if (state.VFX.playing && video.current.paused) {
			video.current.play();
		} else {
			video.current.pause();
			video.current.load();
		}
	}, [state.VFX.playing]);

	const handleClickContainer = () => {
		// check if jeopardy video question is playing
		if (
			state.gameController.currentQuestion &&
			!(
				state.gameController.currentQuestion.type === 'video' &&
				state.gameController.display === 'question'
			)
		) {
			dispatch({ type: 'END_VIDEO' });
		}
	};

	return (
		<VideoContainer
			onClick={handleClickContainer}
			style={{ pointerEvents: state.VFX.playing ? 'auto' : 'none' }}
			show={state.VFX.playing}
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
