import React, { useContext, useState, useEffect } from 'react';
import {
	FxButton,
	FxButtonsDiv,
	Text,
	BigText,
	FxSelect,
	FxSelectContainer,
	FxSelectModal,
	SelectButton,
} from './FxButtonsStyles';
import ReactAudioPlayer from 'react-audio-player';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';
import importAll from '../../Games/helpers/shared/importAll';
const { ipcRenderer } = window.require('electron');

const coreFiles = importAll(
	require.context(
		'../../../assets/fx_buttons',
		false,
		/\.mp4|\.mp3|\.wav|\.mov$/
	)
);

export default function FxButtons() {
	const { state, dispatch } = useContext(StoreContext);
	const { audio, fxButtons } = state;
	const [buttonFiles, setButtonFiles] = useState([]);
	const [selectionWindowOpen, setSelectionWindowOpen] = useState(-1);
	const [selection, setSelection] = useState();

	useEffect(() => {
		async function setAvailableFxButtons() {
			const files = await ipcRenderer.invoke('GET_FX_BUTTON_FILES', 'all');
			setButtonFiles(
				files.sort((a, b) =>
					a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
				)
			);
		}
		setAvailableFxButtons();
	}, []);

	useEffect(() => {
		async function getFxButtons() {
			const buttons = await ipcRenderer.invoke('GET_FX_BUTTONS');
			dispatch({ type: actions.CHANGE_FX_BUTTONS, payload: buttons });
		}
		!fxButtons.length && getFxButtons();
	}, [fxButtons, dispatch]);

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
		ipcRenderer.send('PLAY_VIDEO_SEND', {
			file:
				button.file.slice(0, 6) === 'app://'
					? button.file
					: coreFiles[button.file],
		});
	};

	const contextHandler = (index) => {
		setSelectionWindowOpen(index);
	};

	const handleOutsideClick = () => {
		setSelectionWindowOpen(-1);
		setSelection(undefined);
	};

	const handleSelectChange = (file) => {
		setSelection(file);
	};

	const handleSubmit = () => {
		if (selectionWindowOpen >= 0) {
			const fx = [...fxButtons];
			const alreadySelected = fx.findIndex(
				(button) => button.name === selection.name
			);
			if (alreadySelected >= 0) {
				fx[alreadySelected] = { name: null, type: null, file: null };
			}
			fx[selectionWindowOpen] = selection;
			ipcRenderer.send('SET_FX_BUTTONS', fx);
			dispatch({ type: actions.CHANGE_FX_BUTTONS, payload: fx });
		}
		handleOutsideClick();
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
						<Text>{button.name.replace(/[-_]/g, ' ')}</Text>
						{button.type === 'audio' && (
							<ReactAudioPlayer
								src={
									button.file.slice(0, 6) === 'app://'
										? button.file
										: coreFiles[button.file]
								}
								volume={(audio.volume.master / 100) * (audio.volume.sfx / 100)}
							/>
						)}
					</FxButton>
				);
			})}
			{selectionWindowOpen >= 0 && (
				<FxSelectModal onClick={handleOutsideClick}>
					<FxSelectContainer onClick={(e) => e.stopPropagation()}>
						<BigText color='#ddd'>
							Select FX for button {selectionWindowOpen + 1}
						</BigText>
						<FxSelect size='14'>
							{buttonFiles.map((file) => {
								return (
									<option
										onClick={() => handleSelectChange(file)}
										key={file.name}
										style={{ padding: '5px' }}
									>
										{file.name} ({file.type})
									</option>
								);
							})}
						</FxSelect>
						<SelectButton
							type='button'
							disabled={!selection}
							onClick={handleSubmit}
						>
							Assign {selection ? selection.name : ''} to fx button{' '}
							{selectionWindowOpen + 1}
						</SelectButton>
					</FxSelectContainer>
				</FxSelectModal>
			)}
		</FxButtonsDiv>
	);
}
