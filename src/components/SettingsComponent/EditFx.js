import React, { useState, useEffect, useRef } from 'react';
import { returnToEditSelect, returnToInit } from './helpers/timelines';
import {
	EditButtonDiv,
	EditButtonText,
	EditButtonsWrapper,
	EditForm,
	EditContainer,
	EditHeader,
	EditHeaderWrapper,
	EditSelect,
	EditSelectBoxWrapper,
	EditInputWrapper,
	EditMiniHeader,
	EditButton,
	EditInput,
	EditInputLabel,
} from './styles/EditFxStyles';
import { ReturnButton } from './styles/SharedStyles';
const { ipcRenderer } = window.require('electron');

function EditFx({ setTimeline }) {
	const [name, setName] = useState('');
	const [fxFiles, setFxFiles] = useState([]);
	const [newFilesAvilable, setNewFilesAvailable] = useState(true);
	const [addMenuOpen, setAddMenuOpen] = useState(false);
	const [deleteMenuOpen, setDeleteMenuOpen] = useState(false);
	const [deleteMenuSelection, setDeleteMenuSelection] = useState('');
	const fileSelect = useRef();
	const form = useRef();

	useEffect(() => {
		async function getFiles() {
			const files = await ipcRenderer.invoke('GET_CUSTOM_FX_BUTTON_FILES');
			console.log(files);
			setFxFiles(files);
		}
		if (newFilesAvilable) {
			getFiles();
			setNewFilesAvailable(false);
		}
	}, [newFilesAvilable]);

	const handleClickAddMenu = () => {
		setAddMenuOpen(!addMenuOpen);
	};

	const handleClickDeleteMenu = () => {
		setDeleteMenuOpen(!deleteMenuOpen);
	};

	const handleChangeName = (e) => {
		e.target.setCustomValidity('');
		if (e.target.checkValidity()) {
			setName(e.target.value);
		} else {
			e.target.setCustomValidity(
				'Please use alphanumeric characters, dash, or underscore'
			);
			e.target.reportValidity();
		}
	};

	const handleInvalid = (e) => {
		e.target.setCustomValidity(
			'Please use alphanumeric characters, dash, or underscore'
		);
	};
	const handleDeleteSelection = (e) => {
		setDeleteMenuSelection(e.target.value);
	};
	async function handleClickAdd(e) {
		e.preventDefault();
		const filePath = fileSelect.current.files[0].path;
		const ext = filePath.split('.').pop();
		const result = await ipcRenderer.invoke('NEW_FX_BUTTON', {
			name,
			filePath,
			ext,
		});
		if (result) {
			setName('');
			form.current.reset();
			setNewFilesAvailable(true);
			setAddMenuOpen(false);
		}
	}
	async function handleClickRemove(e) {
		e.preventDefault();
		const result = await ipcRenderer.invoke(
			'DELETE_FX_BUTTON',
			deleteMenuSelection
		);
		if (result) {
			setDeleteMenuSelection('');
			setDeleteMenuOpen(false);
			setNewFilesAvailable(true);
		}
	}
	const returnClickSettings = () => {
		returnToEditSelect(setTimeline);
	};
	const returnClickHome = () => {
		returnToInit(setTimeline);
	};

	return (
		<EditContainer>
			<EditHeaderWrapper>
				<EditHeader>Edit FX</EditHeader>
			</EditHeaderWrapper>
			<EditForm ref={form} onSubmit={handleClickAdd}>
				<EditMiniHeader onClick={handleClickAddMenu}>
					Add new FX button
				</EditMiniHeader>
				{addMenuOpen && (
					<EditInputWrapper>
						<EditInputLabel htmlFor='name'>Enter name of FX</EditInputLabel>
						<EditInput
							id='name'
							name='name'
							type='text'
							width='30%'
							pattern='^[\w\-]*$'
							onChange={handleChangeName}
							onInvalid={handleInvalid}
							required
						/>
						<EditInputLabel htmlFor='file'>Choose fx file: </EditInputLabel>
						<EditInput
							id='file'
							name='file'
							type='file'
							width='100%'
							accept='.mp3,.mp4,.wav'
							ref={fileSelect}
							required
						/>
						<EditButton type='submit'>
							<EditButtonDiv>
								<EditButtonText>Add FX</EditButtonText>
							</EditButtonDiv>
						</EditButton>
					</EditInputWrapper>
				)}
			</EditForm>
			<EditMiniHeader onClick={handleClickDeleteMenu}>
				Delete FX button
			</EditMiniHeader>
			{deleteMenuOpen && (
				<>
					<p style={{ margin: 'auto' }}>Select file to delete:</p>
					<EditSelectBoxWrapper>
						<EditSelect onChange={handleDeleteSelection} size='10'>
							{fxFiles
								.sort((a, b) =>
									a.name.toLowerCase() < b.name.toLowerCase() ? -1 : +1
								)
								.map((file) => {
									return (
										<option
											value={file.name}
											style={{ padding: '5px' }}
											key={file.name}
										>
											{file.name.split('.')[0]} ({file.type})
										</option>
									);
								})}
						</EditSelect>
						<EditButtonDiv>
							<EditButton type='button' onClick={handleClickRemove}>
								<EditButtonDiv>
									<EditButtonText>Delete FX</EditButtonText>
								</EditButtonDiv>
							</EditButton>
						</EditButtonDiv>
					</EditSelectBoxWrapper>
				</>
			)}
			<EditButtonsWrapper>
				<ReturnButton onClick={returnClickSettings}>
					Return to settings menu
				</ReturnButton>
				<ReturnButton onClick={returnClickHome}>
					Return to home screen
				</ReturnButton>
			</EditButtonsWrapper>
		</EditContainer>
	);
}

export default EditFx;
