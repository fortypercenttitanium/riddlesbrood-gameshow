import React, { useEffect, useState } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddVersionButton from '../styles/AddVersionButton';

function Wheel({ setAssets, handleSubmitAdd }) {
	const [content, setContent] = useState([]);
	const [isContentInitialized, setIsContentInitialized] = useState(false);

	useEffect(() => {
		// initialize content format
		if (!isContentInitialized) {
			setContent([
				{
					category: '',
					puzzle: '',
					solved: false,
				},
			]);
			setAssets([]);
			setIsContentInitialized(true);
		}
	}, [setContent, isContentInitialized, setAssets]);

	const addPuzzle = () => {
		const newContent = [...content];
		newContent.push({
			category: '',
			puzzle: '',
			solved: false,
		});
		setContent(newContent);
	};

	const removePuzzle = (index) => {
		if (content.length > 1) {
			const newContent = [...content];
			newContent.splice(index, 1);
			setContent(newContent);
		}
	};

	const handleChangeCategory = (e, index) => {
		const newContent = [...content];
		newContent[index].category = e.target.value;
		setContent(newContent);
	};

	const handleChangePuzzle = (e, index) => {
		if (e.target.value.match(/^[a-zA-Z ]*$/g)) {
			const newContent = [...content];
			newContent[index].puzzle = e.target.value.toUpperCase();
			setContent(newContent);
			if (content[index].puzzle.length > 52) {
				newContent[index].puzzle = newContent[index].puzzle.slice(0, 52);
				setContent(newContent);
			}
		}
	};
	if (!content.length) return <div />;
	return (
		<FlexContainer>
			{content.map((obj, index) => {
				return (
					<FlexContainer>
						<CenteredDiv>
							<Fab
								size='medium'
								color='secondary'
								aria-label='delete'
								onClick={() => removePuzzle(index)}
								style={{ margin: 'auto 1rem auto 0' }}
							>
								<DeleteIcon />
							</Fab>
							<TextField
								id='filled-basic'
								label='Category'
								variant='filled'
								style={{ width: '20rem' }}
								onChange={(e) => handleChangeCategory(e, index)}
								value={obj.category || ''}
								required
							/>
						</CenteredDiv>
						<CenteredDiv key={index}>
							<TextField
								id='outlined-basic'
								label={`Puzzle (${obj.category})`}
								variant='outlined'
								value={obj.puzzle || ''}
								style={{ width: '20rem', marginLeft: '15%' }}
								required
								onChange={(e) => {
									handleChangePuzzle(e, index);
								}}
								helperText='Must be 52 characters or fewer'
							/>
						</CenteredDiv>
					</FlexContainer>
				);
			})}
			<CenteredDiv>
				<Fab size='small' color='primary' aria-label='add' onClick={addPuzzle}>
					<AddIcon />
				</Fab>
			</CenteredDiv>
			<AddVersionButton onSubmit={() => handleSubmitAdd(content)} />
		</FlexContainer>
	);
}

export default Wheel;
