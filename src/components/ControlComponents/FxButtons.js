import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { StoreContext } from '../../store/context';
import { actions } from '../../actions';

const FxButtonsDiv = styled.div`
	grid-area: 7 / 1 / 11 / 4;
	height: 98%;
	width: 99%;
	display: grid;
	grid-gap: 5px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	margin: 2px 2px;
`;

const FxButton = styled.div`
	display: flex;
	text-align: center;
	border: 1px solid black;
	cursor: pointer;
	user-select: none;
	border-radius: 3px;
	box-shadow: 2px 2px 2px rgba(40, 40, 40, 0.5);
	background: rgb(149, 160, 219);
	background: radial-gradient(
		circle,
		rgba(149, 160, 219, 1) 0%,
		rgba(137, 145, 186, 1) 31%,
		rgba(116, 132, 176, 1) 56%,
		rgba(84, 90, 128, 1) 100%
	);
	&:active {
		transform: scale(0.95);
	}
	&:hover {
		border-color: white;
	}
`;

const Text = styled.h3`
	margin: auto;
	user-select: none;
`;

export default function FxButtons(props) {
	const { state, dispatch } = useContext(StoreContext);
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
		state.VFX.playing
			? dispatch({ type: actions.END_VIDEO })
			: dispatch({
					type: actions.PLAY_VIDEO,
					payload: `fx_buttons/${button.file}`,
			  });
	};

	const contextHandler = (index) => {
		props.changeFX(index);
	};

	return (
		<FxButtonsDiv>
			{state.fxButtons.map((button, index) => {
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
								volume={
									(state.audio.volume.master / 100) *
									(state.audio.volume.sfx / 100)
								}
							/>
						) : null}
					</FxButton>
				);
			})}
			{state.fxButtons.length < 9 && (
				<FxButton onClick={props.toggleDevTools}>
					<Text>Dev Tools</Text>
				</FxButton>
			)}
		</FxButtonsDiv>
	);
}
