import React, {
	useContext,
	useRef,
	useEffect,
	useState,
	useMemo,
	useCallback,
} from 'react';
import { VideoContainer } from './VideoPlayerStyles';
import { StoreContext as StoreContextCP } from '../../../store/context';
import { StoreContext as StoreContextGB } from '../../MainComponents/Gameboard';
import ReactAudioPlayer from 'react-audio-player';
const { ipcRenderer } = window.require('electron');

export default function VideoPlayer({ windowInstance }) {
	let StoreContext;
	if (windowInstance === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (windowInstance === 'gameboard') {
		StoreContext = StoreContextGB;
	}

	const [currentVideoPlayer, setCurrentVideoPlayer] = useState(0);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const [musicVolumeRef, setMusicVolumeRef] = useState(50);

	const { state, dispatch } = useContext(StoreContext);
	const { audio, gameController } = state;

	const video = useRef();
	const video2 = useRef();
	const musicPlayer = useRef();

	const duckVolume = useCallback(() => {
		return dispatch({
			type: 'CHANGE_VOLUME',
			payload: { type: 'music', level: 0 },
		});
	}, [dispatch]);

	const restoreVolume = useCallback(
		(volumeRef) => {
			const volumeLevel =
				typeof volumeRef === 'number' ? volumeRef : musicVolumeRef;

			return dispatch({
				type: 'CHANGE_VOLUME',
				payload: {
					type: 'music',
					level: volumeLevel,
				},
			});
		},
		[musicVolumeRef, dispatch]
	);

	const allVideos = useMemo(() => [video, video2], [video, video2]);
	const activeVideoPlayer = useMemo(
		() => allVideos[currentVideoPlayer],
		[allVideos, currentVideoPlayer]
	);
	const inactiveVideoPlayer = useMemo(
		() => allVideos[currentVideoPlayer === 0 ? 1 : 0],
		[allVideos, currentVideoPlayer]
	);

	const stopAllVideos = useCallback(
		(volumeRef) => {
			allVideos.forEach((video) => {
				video.current.pause();
				video.current.load();
			});
			musicPlayer.current.audioEl.current.pause();
			musicPlayer.current.audioEl.current.load();
			setIsVideoPlaying(false);
			restoreVolume(volumeRef);
		},
		[allVideos, restoreVolume]
	);

	useEffect(() => {
		ipcRenderer.on('PLAY_VIDEO_RECEIVE', (_, payload) => {
			if (isVideoPlaying) {
				stopAllVideos();
			} else {
				const { file, callbackQueue, loop, song, isJeopardyQuestion } = payload;

				const currentMusicVolume = audio.volume.music;

				// to update the STOP_VIDEO_RECEIVE callback
				setMusicVolumeRef(currentMusicVolume);
				duckVolume();
				setIsVideoPlaying(true);
				activeVideoPlayer.current.src = file;
				activeVideoPlayer.current.play();
				activeVideoPlayer.current.loop = loop;
				activeVideoPlayer.current.onended = () => {
					if (callbackQueue && callbackQueue.length) {
						return playNextVideo(
							callbackQueue.slice(1),
							inactiveVideoPlayer,
							callbackQueue[0].song,
							currentMusicVolume
						);
					}

					if (isJeopardyQuestion) {
						dispatch({ type: 'SET_TIMER', payload: 17 });
						dispatch({ type: 'RUN_TIMER' });
					}
					stopAllVideos(currentMusicVolume);
				};

				if (callbackQueue && callbackQueue.length) {
					inactiveVideoPlayer.current.src = callbackQueue[0].file;
					inactiveVideoPlayer.current.loop = callbackQueue[0].loop;
					inactiveVideoPlayer.current.preload = 'auto';
				}

				if (song) {
					musicPlayer.current.audioEl.current.src = song;
					musicPlayer.current.audioEl.current.play();
				}
			}
		});

		function playNextVideo(callbackQueue, player, song, currentMusicVolume) {
			if (callbackQueue.length) {
				const nextPlayer = allVideos.find((vid) => vid !== player);
				nextPlayer.current.src = callbackQueue[0].file;
				nextPlayer.current.loop = callbackQueue[0].loop;
				player.current.onended = () =>
					playNextVideo(
						callbackQueue.slice(1),
						nextPlayer,
						callbackQueue[0].song,
						currentMusicVolume
					);
			} else {
				player.current.onended = () => stopAllVideos(currentMusicVolume);
			}
			player.current.play();
			if (song) {
				musicPlayer.current.audioEl.current.src = song;
				musicPlayer.current.audioEl.current.play();
			}
			setCurrentVideoPlayer(allVideos.indexOf(player));
		}

		return () => ipcRenderer.removeAllListeners('PLAY_VIDEO_RECEIVE');
	}, [
		activeVideoPlayer,
		allVideos,
		currentVideoPlayer,
		dispatch,
		inactiveVideoPlayer,
		isVideoPlaying,
		audio.volume.music,
		stopAllVideos,
		duckVolume,
	]);

	useEffect(() => {
		ipcRenderer.on('STOP_VIDEO_RECEIVE', () => {
			stopAllVideos();
		});
		return () => ipcRenderer.removeAllListeners('STOP_VIDEO_RECEIVE');
	}, [stopAllVideos]);

	useEffect(() => {
		allVideos.forEach((vid) => {
			vid.current.volume =
				windowInstance === 'gameboard'
					? (audio.volume.sfx / 100) * (audio.volume.master / 100)
					: 0;
		});
	}, [audio.volume, windowInstance, allVideos]);

	useEffect(() => {
		allVideos.forEach((vid, index) => {
			vid.current.style.display =
				index === currentVideoPlayer ? 'block' : 'none';
		});
	}, [currentVideoPlayer, allVideos]);

	const handleClickContainer = () => {
		// check if jeopardy video question is playing
		if (
			gameController.currentQuestion &&
			!(
				gameController.currentQuestion.type === 'video' &&
				gameController.display === 'question'
			)
		) {
			ipcRenderer.send('STOP_VIDEO_SEND');
		}
	};

	return (
		<VideoContainer
			onClick={handleClickContainer}
			style={{ pointerEvents: isVideoPlaying ? 'auto' : 'none' }}
			show={isVideoPlaying}
		>
			<video ref={video} width='100%' type='video/mp4'>
				<p>Unsupported video type</p>
			</video>
			<video ref={video2} width='100%' type='video/mp4'>
				<p>Unsupported video type</p>
			</video>
			<ReactAudioPlayer
				ref={musicPlayer}
				volume={
					windowInstance === 'gameboard'
						? (state.audio.volume.master / 100) * (state.audio.volume.sfx / 100)
						: 0
				}
			/>
		</VideoContainer>
	);
}
