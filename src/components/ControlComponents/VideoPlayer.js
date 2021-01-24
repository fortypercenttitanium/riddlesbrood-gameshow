import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext as StoreContextCP } from '../../store/context';
import { StoreContext as StoreContextGB } from '../../Gameboard';

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

export default function VideoPlayer(props) {
	let StoreContext;
	if (props.window === 'controlPanel') {
		StoreContext = StoreContextCP;
	} else if (props.window === 'gameboard') {
		StoreContext = StoreContextGB;
	}
	const { state, dispatch } = useContext(StoreContext);
	return (
		<VideoContainer>
			<video
				width='100%'
				src={state.VFX.file}
				type='video/mp4'
				autoPlay
				onEnded={() => {
					dispatch({ type: 'END_VIDEO' });
				}}
			>
				<p>Unsupported video type</p>
			</video>
		</VideoContainer>
	);
}
