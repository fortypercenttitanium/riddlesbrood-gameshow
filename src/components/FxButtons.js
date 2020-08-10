import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { StoreContext } from '../App';

const FxButtonsDiv = styled.div`
	grid-area: 7 / 1 / 11 / 4;
	height: 98%;
	width: 98%;
	display: grid;
	grid-gap: 3px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	margin: auto;
`;

const FxButton = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	text-align: center;
	border: 1px solid black;
	cursor: pointer;
	user-select: none;
	&:active {
		transform: scale(0.95);
	}
`;

const Text = styled.h3`
	margin: auto;
	user-select: none;
`;

export default function FxButtons(props) {
	const { state, dispatch } = useContext(StoreContext);
	const clickHandler = (e) => {
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
	return (
		<FxButtonsDiv>
			{state.fxButtons.map((button, index) => {
				return (
					<FxButton
						key={index}
						onClick={(e) => {
							if (button.type === 'audio') {
								clickHandler(e);
							} else if (button.type === 'video') {
								dispatch({ type: 'PLAY_VIDEO', payload: button.file });
							}
						}}
					>
						<Text>{button.name}</Text>
						{button.type === 'audio' ? (
							<ReactAudioPlayer
								src={`soundfx/${button.file}`}
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
