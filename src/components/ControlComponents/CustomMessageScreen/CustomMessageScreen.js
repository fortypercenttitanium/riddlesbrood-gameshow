import React from 'react';
import styled from 'styled-components';
import customMessageBackgroundLoop from '../../../assets/videos/show_control_videos/custom_message_background.mp4';
import font from '../../../assets/fonts/Dobkin/Dobkin.ttf';

const CustomMessageWrapper = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	color: #eee;
	@font-face {
		font-family: 'Dobkin';
		src: url(${font});
	}
	font-family: Dobkin;

	.video {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
	}

	.message-container {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 60%;
		margin: auto;
	}

	.custom-message {
		margin: auto;
		font-size: 8rem;
		z-index: 1000;
	}
`;

function CustomMessageScreen({ message }) {
	return (
		<CustomMessageWrapper>
			<video
				className='video'
				autoPlay
				loop
				src={customMessageBackgroundLoop}
			></video>
			<div className='message-container'>
				{message &&
					message.split(' ').map((word, i) => (
						<h1 key={i} className='custom-message'>
							{word}
						</h1>
					))}
			</div>
		</CustomMessageWrapper>
	);
}

export default CustomMessageScreen;
