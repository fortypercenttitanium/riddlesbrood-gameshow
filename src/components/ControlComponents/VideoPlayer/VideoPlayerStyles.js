import styled from 'styled-components';

const VideoContainer = styled.div`
	width: 100%;
	height: 100%;
	display: ${(props) => (props.show ? 'flex' : 'none')};
	background: black;
	text-align: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
`;

export { VideoContainer };
