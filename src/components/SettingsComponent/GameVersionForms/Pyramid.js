import React, { useEffect, useState } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));

function Pyramid({ formData, handleContentChange, setAssets }) {
	const classes = useStyles();
	const { content } = formData;

	const [isContentInitialized, setIsContentInitialized] = useState(false);

	useEffect(() => {
		// initialize content format
		if (!isContentInitialized) {
			handleContentChange([
				{
					category: '',
					completed: false,
					words: [''],
				},
			]);
			setAssets([]);
			setIsContentInitialized(true);
		}
	}, [handleContentChange, isContentInitialized, setAssets]);

	const addWord = (categoryIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].words.push('');
		handleContentChange(newContent);
	};

	const addCategory = () => {
		const newContent = [...content];
		newContent.push({ category: '', completed: false, words: [''] });
		handleContentChange(newContent);
	};

	const handleChangeCategory = (e, categoryIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].category = e.target.value;
		handleContentChange(newContent);
	};

	const handleChangeWord = (e, categoryIndex, wordIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].words[wordIndex] = e.target.value;
		handleContentChange(newContent);
	};

	const removeCategory = (categoryIndex) => {
		if (content.length > 1) {
			const newContent = [...content];
			newContent.splice(categoryIndex, 1);
			handleContentChange(newContent);
		}
	};

	const removeWord = (categoryIndex, wordIndex) => {
		if (content[categoryIndex].words.length > 1) {
			const newContent = [...content];
			newContent[categoryIndex].words.splice(wordIndex, 1);
			handleContentChange(newContent);
		}
	};

	return (
		<FlexContainer>
			{content.length &&
				content.map((obj, categoryIndex) => {
					return (
						<FlexContainer key={categoryIndex} style={{ marginRight: '15%' }}>
							<CenteredDiv>
								<Fab
									className={classes.extendedIcon}
									variant='extended'
									size='large'
									color='secondary'
									aria-label='delete'
									onClick={() => removeCategory(categoryIndex)}
									style={{ margin: 'auto 1rem auto 0' }}
								>
									<DeleteIcon />
									Delete category
								</Fab>
								<TextField
									id='filled-basic'
									label={`Category #${categoryIndex + 1}`}
									variant='filled'
									style={{ width: '20rem' }}
									onChange={(e) => handleChangeCategory(e, categoryIndex)}
									value={content[categoryIndex].category || ''}
									required
								/>
							</CenteredDiv>
							{obj.words.map((word, wordIndex) => {
								return (
									<FlexContainer key={wordIndex}>
										<CenteredDiv style={{ marginLeft: '25%', padding: '3px' }}>
											<Fab
												size='small'
												color='secondary'
												aria-label='delete'
												onClick={() => removeWord(categoryIndex, wordIndex)}
												style={{ margin: 'auto 1rem auto 0' }}
											>
												<DeleteIcon />
											</Fab>
											<TextField
												id='outlined-basic'
												label={`Word #${wordIndex + 1}`}
												variant='outlined'
												value={word || ''}
												style={{ width: '20rem' }}
												required
												onChange={(e) => {
													handleChangeWord(e, categoryIndex, wordIndex);
												}}
											/>
										</CenteredDiv>
									</FlexContainer>
								);
							})}
							<CenteredDiv>
								<Fab
									variant='extended'
									className={classes.extendedIcon}
									size='small'
									color='primary'
									aria-label='add'
									onClick={(e) => addWord(categoryIndex)}
								>
									<AddIcon />
									Add word
								</Fab>
							</CenteredDiv>
						</FlexContainer>
					);
				})}
			<CenteredDiv style={{ marginRight: '45%' }}>
				<Fab
					variant='extended'
					className={classes.extendedIcon}
					size='large'
					color='primary'
					aria-label='add'
					onClick={addCategory}
				>
					<AddIcon />
					New category
				</Fab>
			</CenteredDiv>
		</FlexContainer>
	);
}

export default Pyramid;
