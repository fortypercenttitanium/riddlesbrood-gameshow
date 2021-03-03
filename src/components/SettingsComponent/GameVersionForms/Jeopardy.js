/*
Title: String
Rating: String ('r', 'pg13', 'kids')
Content: [
  {
    "category": String,
    "questions" [
      {
        "value": Number (100-500),
				"type": String("video", "audio"),
				"question": String ("Question text", "video_file_name"),
				"answer": String,
				"completed": false,
				"dailyDouble": Boolean
      }
    ]
  }
]
*/

import React, { useEffect, useState } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import { makeStyles } from '@material-ui/core/styles';
import { customAlphabet } from 'nanoid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import jeopardyFormInit from '../helpers/jeopardyFormInit';
import AddVersionButton from '../styles/AddVersionButton';

const nanoid = customAlphabet(
	'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	8
);

const useStyles = makeStyles((theme) => ({
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

function Jeopardy({ setAssets, assets, handleSubmitAdd }) {
	const classes = useStyles();

	const [content, setContent] = useState();
	const [isContentInitialized, setIsContentInitialized] = useState(false);

	useEffect(() => {
		// initialize content format
		if (!isContentInitialized) {
			setContent(jeopardyFormInit);
			setAssets([]);
			setIsContentInitialized(true);
		}
	}, [setContent, isContentInitialized, setAssets]);

	const handleChangeCategory = (e, categoryIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].category = e.target.value;
		setContent(newContent);
	};

	const handleChangeQuestion = (value, categoryIndex, questionIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].questions[questionIndex].question = value;
		setContent(newContent);
	};

	const handleChangeQuestionType = (type, categoryIndex, questionIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].questions[questionIndex].type = type;
		setContent(newContent);
	};

	const handleChangeAnswer = (e, categoryIndex, questionIndex) => {
		const newContent = [...content];
		newContent[categoryIndex].questions[questionIndex].answer = e.target.value;
		setContent(newContent);
	};

	const handleChangeFile = (e, categoryIndex, questionIndex) => {
		const file = e.target.files[0];
		const ext = file.name.split('.').pop();
		const id = nanoid();

		const newAssets = [...assets];

		newAssets[questionIndex] = {
			path: file.path,
			fileName: `${id}.${ext}`,
			forQuestion: { categoryIndex, questionIndex },
		};

		setAssets(newAssets);
	};

	return (
		<FlexContainer>
			{content.length &&
				content.map((obj, categoryIndex) => {
					return (
						<FlexContainer
							className={classes.root}
							key={categoryIndex}
							style={{
								borderBottom: '1px dotted black',
								paddingBottom: '3rem',
							}}
						>
							<CenteredDiv>
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
							{obj.questions.map((question, questionIndex) => {
								return (
									<FlexContainer
										key={questionIndex}
										style={{
											paddingTop: '1.5rem',
										}}
									>
										<ButtonGroup aria-label='outlined primary button group'>
											<Button
												style={{ width: '6rem' }}
												variant='contained'
												color={question.type === 'text' ? 'primary' : 'default'}
												onClick={() =>
													handleChangeQuestionType(
														'text',
														categoryIndex,
														questionIndex
													)
												}
											>
												Text
											</Button>
											<Button
												style={{ width: '6rem' }}
												variant='contained'
												color={
													question.type === 'video' ? 'primary' : 'default'
												}
												onClick={() =>
													handleChangeQuestionType(
														'video',
														categoryIndex,
														questionIndex
													)
												}
											>
												Video
											</Button>
										</ButtonGroup>
										<CenteredDiv style={{ paddingTop: 2 }}>
											{question.type === 'text' ? (
												<TextField
													id='outlined-basic'
													label={`Question #${questionIndex + 1}`}
													variant='outlined'
													value={question.question || ''}
													style={{ width: '20rem' }}
													required
													onChange={(e) => {
														handleChangeQuestion(
															e.target.value,
															categoryIndex,
															questionIndex
														);
													}}
												/>
											) : (
												<input
													type='file'
													style={{ width: '20rem', margin: 'auto 0' }}
													accept='.mp4'
													label='Upload video question file'
													required
													onChange={(e) =>
														handleChangeFile(e, categoryIndex, questionIndex)
													}
												/>
											)}

											<TextField
												id='outlined-basic'
												label={`Answer #${questionIndex + 1}`}
												variant='outlined'
												value={question.answer || ''}
												style={{ width: '20rem' }}
												required
												onChange={(e) => {
													handleChangeAnswer(e, categoryIndex, questionIndex);
												}}
											/>
										</CenteredDiv>
									</FlexContainer>
								);
							})}
						</FlexContainer>
					);
				})}
			<AddVersionButton onSubmit={() => handleSubmitAdd(content)} />
		</FlexContainer>
	);
}

export default Jeopardy;
