/*
Title: String
Rating: String ('r', 'pg13', 'kids')
Content: [(String)]
*/

import React, { useEffect } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

function Couples({ formData, handleContentChange, selectedGame }) {
	const content = formData.content;

	useEffect(() => {
		if (!Array.isArray(content)) {
			handleContentChange(['']);
		}
	}, [handleContentChange, content]);

	const addQuestion = () => {
		handleContentChange([...content, '']);
	};

	const removeQuestion = (index) => {
		if (content.length > 1) {
			let newContent = [...content];
			newContent.splice(index, 1);
			handleContentChange(newContent);
		}
	};

	const handleChange = (e, index) => {
		const newContent = [...content];
		newContent[index] = e.target.value;
		handleContentChange(newContent);
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
								style={{ margin: 'auto 1rem auto 0' }}
							>
								<DeleteIcon />
							</Fab>
							<TextField
								id='outlined-basic'
								label={`Question #${index + 1}`}
								variant='outlined'
								value={question}
								style={{ width: '40rem' }}
								required
								onChange={(e) => {
									handleChange(e, index);
								}}
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
		</FlexContainer>
	);
}

export default Couples;
