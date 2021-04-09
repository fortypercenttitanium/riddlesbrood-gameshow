import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import InactiveScoreCard from './InactiveScoreCard';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';
import importAll from '../../Games/helpers/shared/importAll';
import winnerIntro from '../../../assets/videos/winner_videos/long/winner_intro.mp4';
import winnerLoop from '../../../assets/videos/winner_videos/long/winner_loop.mp4';
const { ipcRenderer } = window.require('electron');

const shortVideos = importAll(
	require.context('../../../assets/videos/winner_videos/short', false, /\.mp4$/)
);

const winnerSongs = Object.values(
	importAll(
		require.context('../../../assets/sound_fx/winner', false, /\.mp3|\.wav$/)
	)
);

const ScoreBoardDiv = styled.div`
	display: flex;
	grid-area: 8 / 4 / 11 / 11;
	width: 912px;
	height: 95%;
	margin: auto;
`;

export default function ScoreBoard({ playSound }) {
	const { state, dispatch } = useContext(StoreContext);
	const { score } = state.gameController;

	const [currentSong, setCurrentSong] = useState(0);

	const toggleCardActive = (index) => {
		let newScore = score;
		newScore.scoreBoard[index] === null
			? (newScore.scoreBoard[index] = 0)
			: (newScore.scoreBoard[index] = null);
		dispatch({
			type: actions.SET_SCORE,
			payload: newScore,
		});
	};

	const getVideo = ({ index, type }) => {
		return shortVideos[`${type} ${index + 1}.mp4`];
	};

	const playVideo = ({ index, type }) => {
		ipcRenderer.send('PLAY_VIDEO_SEND', {
			file: getVideo({ index, type }),
			callbackQueue: [
				{
					file: winnerIntro,
					song: winnerSongs[currentSong],
				},
				{ file: winnerLoop, loop: true },
			],
		});
	};

	return (
		<ScoreBoardDiv>
			{score.scoreBoard.map((number, index) => {
				if (number !== null) {
					return (
						<ScoreCard
							name={`${score.type === 'team' ? 'Team' : 'Player'} ${index + 1}`}
							active={true}
							key={index}
							index={index}
							score={number}
							playSound={playSound}
							playVideo={() => playVideo({ index, type: score.type })}
							toggleCardActive={toggleCardActive}
							alt={
								score.type === 'team' &&
								score.scoreBoard.filter((number) => typeof number === 'number')
									.length === 2
							}
						/>
					);
				} else {
					return (
						<InactiveScoreCard
							name={`${score.type === 'team' ? 'Team' : 'Player'} ${index + 1}`}
							key={index}
							toggleCardActive={toggleCardActive}
							index={index}
							active={false}
						/>
					);
				}
			})}
		</ScoreBoardDiv>
	);
}
