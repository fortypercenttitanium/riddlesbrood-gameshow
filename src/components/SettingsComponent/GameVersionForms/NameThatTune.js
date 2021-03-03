import React, { useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddVersionButton from '../styles/AddVersionButton';

const nanoid = customAlphabet(
	'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	8
);

function NameThatTune({ setAssets, assets, handleSubmitAdd }) {
	const [content, setContent] = useState();
	const [isContentInitialized, setIsContentInitialized] = useState(false);

	useEffect(() => {
		// initialize content format
		if (!isContentInitialized) {
			setContent([{ title: '', artist: '', file: '', isPlaying: false }]);
			setAssets([]);
			setIsContentInitialized(true);
		}
	}, [setContent, isContentInitialized, setAssets]);

	const addSong = () => {
		setContent([
			...content,
			{ title: '', artist: '', file: '', isPlaying: false },
		]);
	};

	const removeSong = (index) => {
		if (content.length > 1) {
			let newContent = [...content];
			newContent.splice(index, 1);
			setContent(newContent);
		}
	};

	const handleChangeTitle = (e, index) => {
		const newContent = [...content];
		newContent[index].title = e.target.value;
		setContent(newContent);
	};

	const handleChangeArtist = (e, index) => {
		const newContent = [...content];
		newContent[index].artist = e.target.value;
		setContent(newContent);
	};

	const handleChangeFile = (e, index) => {
		const file = e.target.files[0];
		const ext = file.name.split('.').pop();
		const id = nanoid();

		const newContent = [...content];
		const newAssets = [...assets];

		newAssets[index] = {
			path: file.path,
			fileName: `${id}.${ext}`,
			forQuestion: index,
		};

		setAssets(newAssets);
		setContent(newContent);
	};

	return (
		<FlexContainer>
			{content.length > 0 &&
				content.map((song, index) => {
					return (
						<FlexContainer key={index}>
							<CenteredDiv>
								<Fab
									size='small'
									color='secondary'
									aria-label='delete'
									onClick={() => removeSong(index)}
									style={{ margin: 'auto 1rem auto 0' }}
								>
									<DeleteIcon />
								</Fab>
								<TextField
									id='outlined-basic'
									label={`Song #${index + 1} Artist`}
									variant='outlined'
									value={song.artist}
									style={{ width: '15rem' }}
									required
									onChange={(e) => {
										handleChangeArtist(e, index);
									}}
								/>
								<TextField
									id='outlined-basic'
									label={`Song #${index + 1} Title`}
									variant='outlined'
									value={song.title}
									style={{ width: '15rem', margin: 'auto 2rem 0' }}
									required
									onChange={(e) => {
										handleChangeTitle(e, index);
									}}
								/>
							</CenteredDiv>
							<CenteredDiv style={{ padding: 0 }}>
								<input
									type='file'
									label='Upload song file'
									style={{ width: '30rem', margin: 'auto' }}
									required
									accept='.mp3,.wav'
									onChange={(e) => handleChangeFile(e, index)}
								/>
							</CenteredDiv>
						</FlexContainer>
					);
				})}
			<CenteredDiv>
				<Fab size='small' color='primary' aria-label='add' onClick={addSong}>
					<AddIcon />
				</Fab>
			</CenteredDiv>
			<AddVersionButton onSubmit={() => handleSubmitAdd(content)} />
		</FlexContainer>
	);
}

export default NameThatTune;
