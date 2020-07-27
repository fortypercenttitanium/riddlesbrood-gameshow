import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import LogoScreen from './LogoScreen';
import * as Games from './Games/gamesArray';

const { Jeopardy, FamilyFeud, Pyramid, Wheel } = Games;

export class ControlScreen extends Component {
	render() {
		const {
			currentGame,
			timeline,
			setAnswer,
			VFX,
			endVideo,
			sfxVolume,
			score,
			changeScore,
			timer,
			setTimer,
			runTimer,
			killTimer,
			playSound,
			stopSound,
			pauseOrResumeSound,
			setScoreType,
			window,
		} = this.props;
		const gameProps = {
			setAnswer: setAnswer,
			sfxVolume: sfxVolume,
			score: score,
			changeScore,
			setScoreType: setScoreType,
			timer: timer,
			setTimer: setTimer,
			runTimer: runTimer,
			killTimer: killTimer,
			playSound: playSound,
			stopSound: stopSound,
			pauseOrResumeSound: pauseOrResumeSound,
			version: currentGame.version,
			window: window,
		};
		const GameComponent = currentGame.title;
		const components = {
			Jeopardy: <Jeopardy {...gameProps} />,
			'Family Feud': <FamilyFeud {...gameProps} />,
			'$25,000 Pyramid': <Pyramid {...gameProps} />,
			'Wheel Of Fortune': <Wheel {...gameProps} />,
		};

		return (
			<div
				style={{
					height: '100%',
					width: '100%',
					textAlign: 'center',
					border: '1px solid black',
					position: 'relative',
				}}
			>
				{timeline === 'app-open' ? <LogoScreen /> : null}
				{timeline === 'in-game' ? components[GameComponent] : null}
				{VFX.playing && <VideoPlayer file={VFX.file} onEnded={endVideo} />}
			</div>
		);
	}
}

export default ControlScreen;
