import React, { useContext } from 'react';
import { FxButton, FxButtonsDiv, Text } from './FxButtonsStyles';
import ReactAudioPlayer from 'react-audio-player';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';

export default function FxButtons({ changeFX, toggleDevTools }) {
	const { state, dispatch } = useContext(StoreContext);
	const { audio, fxButtons, VFX } = state;

	const clickHandlerAudio = (e) => {
		const audio = e.currentTarget.querySelector('audio');
		if (!audio.paused) {
			audio.pause();
			audio.load();
		} else {
			e.currentTarget.parentNode.querySelectorAll('audio').forEach((sound) => {
				sound.pause();
			});
			audio.load();
			audio.play();
		}
	};

	const clickHandlerVideo = (button) => {
		VFX.playing
			? dispatch({ type: actions.END_VIDEO })
			: dispatch({
					type: actions.PLAY_VIDEO,
					payload: `fx_buttons/${button.file}`,
			  });
	};

	const contextHandler = (index) => {
		changeFX(index);
	};

	return (
		<FxButtonsDiv>
			{fxButtons.map((button, index) => {
				return (
					<FxButton
						key={index}
						onContextMenu={() => contextHandler(index)}
						onClick={(e) => {
							if (button.type === 'audio') {
								clickHandlerAudio(e);
							} else if (button.type === 'video') {
								clickHandlerVideo(button);
							}
						}}
					>
						<Text>{button.name}</Text>
						{button.type === 'audio' ? (
							<ReactAudioPlayer
								src={`fx_buttons/${button.file}`}
								volume={(audio.volume.master / 100) * (audio.volume.sfx / 100)}
							/>
						) : null}
					</FxButton>
				);
			})}
			{fxButtons.length < 9 && (
				<FxButton onClick={toggleDevTools}>
					<Text>Dev Tools</Text>
				</FxButton>
			)}
		</FxButtonsDiv>
	);
}
