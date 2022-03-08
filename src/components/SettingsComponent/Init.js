import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DownloadProgress from './styles/DownloadProgress';
import { FlexContainer, CenteredDiv } from './styles/EditVersionsStyles';
import { makeStyles } from '@material-ui/core/styles';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
  buttonSpacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Init({ setTimeline, setTitle }) {
  const classes = useStyles();
  const [version, setVersion] = useState('(fetching version info...)');
  const [debugging, setDebugging] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [downloadProgress, setDownloadProgress] = useState();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function handleDebugChange(e) {
    setDebugging(e.target.checked);
  }

  useEffect(() => {
    setTitle('Riddlesbrood Gameshow');
  }, [setTitle]);

  useEffect(() => {
    ipcRenderer.on('message', (e, message) => {
      setButtonsDisabled(true);
      setUpdateMessage(message);
    });
    ipcRenderer.on('DISABLE_BUTTONS', () => {
      setButtonsDisabled(true);
    });
    ipcRenderer.on('ENABLE_BUTTONS', () => {
      setButtonsDisabled(false);
    });
    ipcRenderer.on('UPDATE_DOWNLOAD_PROGRESS', (e, value) => {
      setDownloadProgress(value);
    });
  }, []);

  useEffect(() => {
    async function getAppVersion() {
      const currentVersion = await ipcRenderer.invoke('GET_APP_VERSION');
      if (currentVersion) {
        setVersion(currentVersion);
      }
    }
    getAppVersion();
  }, []);

  const handleLaunchClick = () => {
    ipcRenderer.send('LAUNCH_GAME', { debugging });
  };
  const handleEditClick = () => {
    setTimeline('edit-select');
  };

  return (
    <FlexContainer>
      <CenteredDiv>
        <p className="version">Version {version}</p>
      </CenteredDiv>
      <CenteredDiv>
        <p className="update-message">{updateMessage}</p>
      </CenteredDiv>
      {downloadProgress !== undefined && (
        <div style={{ width: '250px' }}>
          <DownloadProgress value={downloadProgress} />
        </div>
      )}
      <CenteredDiv className={classes.buttonSpacing}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleLaunchClick}
          disabled={buttonsDisabled}
        >
          Start game
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          disabled={buttonsDisabled}
        >
          Edit content
        </Button>
      </CenteredDiv>
      <div>
        <label htmlFor="debug">
          Debug mode
          <input type="checkbox" onChange={handleDebugChange} />
        </label>
      </div>
    </FlexContainer>
  );
}

export default Init;
