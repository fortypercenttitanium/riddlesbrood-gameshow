import React, { Component } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

const FxButtonsDiv = styled.div`
	grid-area: 7 / 1 / 11 / 4;
	height: 98%;
	width: 98%;
	display: grid;
	grid-gap: 3px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	margin: auto;
`;

const FxButton = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	text-align: center;
	border: 1px solid black;
	cursor: pointer;
	user-select: none;
	&:active {
		transform: scale(0.95);
	}
`;

const Text = styled.h3`
	margin: auto;
	user-select: none;
`;

export class FxButtons extends Component {
	clickHandler = (e) => {
		const audio = e.currentTarget.querySelector('audio');
		e.currentTarget.parentNode.querySelectorAll('audio').forEach((sound) => {
			sound.pause();
		});
		audio.load();
		audio.play();
	};

	render() {
		return (
			<FxButtonsDiv>
				{this.props.buttons.map((button, index) => {
					return (
						<FxButton
							key={index}
							onClick={(e) => {
								if (this.props.buttons[index].type === 'audio') {
									this.clickHandler(e);
								}
							}}
						>
							<Text>{button.name}</Text>
							{button.type === 'audio' ? (
								<ReactAudioPlayer
									src={button.path}
									volume={this.props.volume}
								/>
							) : null}
						</FxButton>
					);
				})}
			</FxButtonsDiv>
		);
	}
}

export default FxButtons;
