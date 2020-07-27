import React, { Component } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	text-align: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export class VideoPlayer extends Component {
	render() {
		return (
			<VideoContainer>
				<video
					width='100%'
					src={'videos/' + this.props.file}
					type='video/mp4'
					autoPlay
					onEnded={this.props.onEnded}
				>
					<p>Unsupported video type</p>
				</video>
			</VideoContainer>
		);
	}
}

export default VideoPlayer;
