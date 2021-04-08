import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import InactiveScoreCard from './InactiveScoreCard';
import { StoreContext } from '../../../store/context';
import { actions } from '../../../store/actions';
import importAll from '../../Games/helpers/shared/importAll';

const longVideos = Object.values(
	importAll(
		require.context(
			'../../../assets/videos/winner_videos/long',
			false,
			/\.mp4$/
		)
	)
);

const shortVideos = importAll(
	require.context('../../../assets/videos/winner_videos/short', false, /\.mp4$/)
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

	const [currentLongVideo, setCurrentLongVideo] = useState(0);

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
		dispatch({
			type: 'PLAY_VIDEO',
			payload: {
				file: getVideo({ index, type }),
				callback: longVideos[currentLongVideo],
			},
		});
		setCurrentLongVideo(
			currentLongVideo < longVideos.length ? currentLongVideo + 1 : 0
		);
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
							setCurrentLongVideo={setCurrentLongVideo}
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
