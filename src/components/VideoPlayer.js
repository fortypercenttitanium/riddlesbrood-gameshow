import React, { Component } from "react";

export class VideoPlayer extends Component {
	render() {
		return (
			<div>
				<video
					width="1200"
					height="900"
					src={this.props.videoPath}
					type="video/mp4"
					autoPlay
				>
					<p>Unsupported video type</p>
				</video>
			</div>
		);
	}
}


export default VideoPlayer;
