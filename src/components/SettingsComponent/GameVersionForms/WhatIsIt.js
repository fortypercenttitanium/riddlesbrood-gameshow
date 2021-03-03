/*
Title: String
Rating: String ('r', 'pg13', 'kids')
Content: [
  {
    "title": String,
    "file": String(file location)
  }
]
*/
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

function WhatIsIt({ setAssets, assets, handleSubmitAdd }) {
	const [content, setContent] = useState([]);
	const [isContentInitialized, setIsContentInitialized] = useState(false);

	useEffect(() => {
		// initialize content format
		if (!isContentInitialized) {
			setContent([{ title: '', file: '' }]);
			setAssets([]);
			setIsContentInitialized(true);
		}
	}, [setContent, isContentInitialized, setAssets]);

	const addQuestion = () => {
		setContent([...content, { title: '', file: '' }]);
	};

	const removeQuestion = (index) => {
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

	const handleChangeFile = (e, index) => {
		const file = e.target.files[0];
		const ext = file.name.split('.').pop();
		const id = nanoid();

		const newAssets = [...assets];

		newAssets[index] = {
			path: file.path,
			fileName: `${id}.${ext}`,
			forQuestion: index,
		};

		setAssets(newAssets);
	};

	return (
		<FlexContainer>
			{content.length > 0 &&
				content.map((question, index) => {
					return (
						<CenteredDiv key={index}>
							<Fab
								size='small'
								color='secondary'
								aria-label='delete'
								onClick={() => removeQuestion(index)}
								style={{ margin: 'auto 1rem auto auto' }}
							>
								<DeleteIcon />
							</Fab>
							<TextField
								id='outlined-basic'
								label={`Picture #${index + 1} Title`}
								variant='outlined'
								value={question.artist}
								style={{ margin: 'auto 1rem' }}
								required
								onChange={(e) => {
									handleChangeTitle(e, index);
								}}
							/>
							<input
								type='file'
								label='Upload image file'
								style={{ margin: 'auto auto auto 1rem' }}
								required
								accept='.png,.jpg,.jpeg,.gif'
								onChange={(e) => handleChangeFile(e, index)}
							/>
						</CenteredDiv>
					);
				})}
			<CenteredDiv>
				<Fab
					size='small'
					color='primary'
					aria-label='add'
					onClick={addQuestion}
				>
					<AddIcon />
				</Fab>
			</CenteredDiv>
			<AddVersionButton onSubmit={() => handleSubmitAdd(content)} />
		</FlexContainer>
	);
}

export default WhatIsIt;
