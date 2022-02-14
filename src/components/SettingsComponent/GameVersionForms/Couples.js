import React, { useEffect, useState } from 'react';
import { CenteredDiv, FlexContainer } from '../styles/EditVersionsStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddVersionButton from '../styles/AddVersionButton';

function Couples({ setAssets, handleSubmitAdd }) {
  const [roundOne, setRoundOne] = useState([]);
  const [roundTwo, setRoundTwo] = useState([]);
  const [isContentInitialized, setIsContentInitialized] = useState(false);

  useEffect(() => {
    // initialize content format
    if (!isContentInitialized) {
      setRoundOne(['']);
      setRoundTwo(['']);
      setAssets([]);
      setIsContentInitialized(true);
    }
  }, [isContentInitialized, setAssets]);

  const rounds = [roundOne, roundTwo];
  const setRounds = [setRoundOne, setRoundTwo];

  const addQuestion = (round) => {
    const newContent = [...rounds[round], ''];
    setRounds[round](newContent);
  };

  const removeQuestion = (index, round) => {
    if (rounds[round].length > 1) {
      let newContent = [...rounds[round]];
      newContent.splice(index, 1);
      setRounds[round](newContent);
    }
  };

  const handleChange = (e, index, round) => {
    const newContent = [...rounds[round]];
    newContent[index] = e.target.value;
    setRounds[round](newContent);
  };

  return (
    <FlexContainer>
      <h1>Round 1</h1>
      {roundOne.length > 0 &&
        roundOne.map((question, index) => {
          const round = 0;
          return (
            <CenteredDiv key={index}>
              <Fab
                size="small"
                color="secondary"
                aria-label="delete"
                onClick={() => removeQuestion(index, round)}
                style={{ margin: 'auto 1rem auto 0' }}
              >
                <DeleteIcon />
              </Fab>
              <TextField
                id="outlined-basic"
                label={`Question #${index + 1}`}
                variant="outlined"
                value={question}
                style={{ width: '40rem' }}
                required
                onChange={(e) => {
                  handleChange(e, index, round);
                }}
              />
            </CenteredDiv>
          );
        })}
      <CenteredDiv>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => addQuestion(0)}
        >
          <AddIcon />
        </Fab>
      </CenteredDiv>
      <h1>Round 2</h1>
      {roundTwo.length > 0 &&
        roundTwo.map((question, index) => {
          const round = 1;
          return (
            <CenteredDiv key={index}>
              <Fab
                size="small"
                color="secondary"
                aria-label="delete"
                onClick={() => removeQuestion(index, round)}
                style={{ margin: 'auto 1rem auto 0' }}
              >
                <DeleteIcon />
              </Fab>
              <TextField
                id="outlined-basic"
                label={`Question #${index + 1}`}
                variant="outlined"
                value={question}
                style={{ width: '40rem' }}
                required
                onChange={(e) => {
                  handleChange(e, index, round);
                }}
              />
            </CenteredDiv>
          );
        })}
      <CenteredDiv>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => addQuestion(1)}
        >
          <AddIcon />
        </Fab>
      </CenteredDiv>
      <AddVersionButton
        onSubmit={() => handleSubmitAdd([roundOne, roundTwo])}
      />
    </FlexContainer>
  );
}

export default Couples;
