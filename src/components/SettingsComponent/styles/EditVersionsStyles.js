import styled from 'styled-components';

const GameLogosContainer = styled.div`
	display: flex;
	justify-items: center;
	text-align: center;
	padding: 2rem;
	flex-wrap: wrap;
	border: 3px solid black;
	border-radius: 5px;
	width: 80%;
	margin: auto;
`;

const VersionForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
	width: ${(props) => props.width || '80%'};
	max-height: 40rem;
	overflow: auto;
	text-align: center;
	border: 1px solid grey;
	padding: 1rem;
	background: #eee;
`;

const FlexContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-basis: 100%;
	justify-content: center;
	margin: auto;
	text-align: center;
`;

const CenteredDiv = styled.div`
	display: flex;
	margin: auto;
	justify-content: center;
	padding: 1rem;
	flex: 1 0 100%;
	width: 100%;
`;

export { GameLogosContainer, VersionForm, CenteredDiv, FlexContainer };
