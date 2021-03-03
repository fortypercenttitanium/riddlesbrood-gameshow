import React, { useEffect, useState } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddVersionButton from '../styles/AddVersionButton';

function FamilyFeud({ setAssets, handleSubmitAdd }) {
	const [content, setContent] = useState();
	const [isContentInitialized, setIsContentInitialized] = useState(false);

	useEffect(() => {
		// initialize content format
		if (!isContentInitialized) {
			setContent({
				prompt: '',
				answers: [
					{
						answer: '',
						revealed: false,
					},
				],
			});
			setAssets([]);
			setIsContentInitialized(true);
		}
	}, [setContent, isContentInitialized, setAssets]);

	const addAnswer = () => {
		if (content.answers.length < 10) {
			const newContent = { ...content };
			newContent.answers.push({ answer: '', revealed: false });
			setContent(newContent);
		}
	};

	const removeAnswer = (index) => {
		if (content.answers.length > 1) {
			const newContent = { ...content };
			newContent.answers.splice(index, 1);
			setContent(newContent);
		}
	};

	const handleChange = (e, index) => {
		if (e.target.value.length < 18) {
			const newContent = { ...content };
			newContent.answers[index] = { answer: e.target.value, revealed: false };
			setContent(newContent);
		}
	};

	const handlePromptChange = (e) => {
		const newContent = { ...content };
		newContent.prompt = e.target.value;
		setContent(newContent);
	};

	return (
		<FlexContainer>
			<CenteredDiv>
				<TextField
					id='filled-basic'
					label='Prompt'
					variant='filled'
					style={{ width: '20rem' }}
					onChange={handlePromptChange}
					value={content.prompt || ''}
					required
				/>
			</CenteredDiv>
			{content.answers &&
				content.answers.map((obj, index) => {
					return (
						<CenteredDiv key={index}>
							<Fab
								size='small'
								color='secondary'
								aria-label='delete'
								onClick={() => removeAnswer(index)}
								style={{ margin: 'auto 1rem auto 0' }}
							>
								<DeleteIcon />
							</Fab>
							<TextField
								id='outlined-basic'
								label={`Survey says #${index + 1}`}
								variant='outlined'
								value={obj.answer || ''}
								style={{ width: '20rem' }}
								required
								onChange={(e) => {
									handleChange(e, index);
								}}
								helperText='Must be 18 characters or fewer'
							/>
						</CenteredDiv>
					);
				})}
			<CenteredDiv>
				<Fab size='small' color='primary' aria-label='add' onClick={addAnswer}>
					<AddIcon />
				</Fab>
			</CenteredDiv>
			<AddVersionButton onSubmit={() => handleSubmitAdd(content)} />
		</FlexContainer>
	);
}

export default FamilyFeud;
