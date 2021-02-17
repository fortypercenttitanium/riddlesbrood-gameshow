/*
Title: String
Rating: String ('r', 'pg13', 'kids')
Content: {
  "prompt": String,
  "answers": [
    {"answer": String,
    "revealed": false}
  ]  
}
*/

import React, { useEffect } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

function FamilyFeud({ formData, handleContentChange }) {
	const { content } = formData;

	useEffect(() => {
		// initialize content format
		if (!content.hasOwnProperty('prompt')) {
			handleContentChange({
				prompt: '',
				answers: [
					{
						answer: '',
						revealed: false,
					},
				],
			});
		}
	}, [handleContentChange, content]);

	const addAnswer = () => {
		if (content.answers.length < 10) {
			const newContent = { ...content };
			newContent.answers.push({ answer: '', revealed: false });
			handleContentChange(newContent);
		}
	};

	const removeAnswer = (index) => {
		if (content.answers.length > 1) {
			const newContent = { ...content };
			newContent.answers.splice(index, 1);
			handleContentChange(newContent);
		}
	};

	const handleChange = (e, index) => {
		if (e.target.value.length < 18) {
			const newContent = { ...content };
			newContent.answers[index] = { answer: e.target.value, revealed: false };
			handleContentChange(newContent);
		}
	};

	const handlePromptChange = (e) => {
		const newContent = { ...content };
		newContent.prompt = e.target.value;
		handleContentChange(newContent);
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
		</FlexContainer>
	);
}

export default FamilyFeud;
