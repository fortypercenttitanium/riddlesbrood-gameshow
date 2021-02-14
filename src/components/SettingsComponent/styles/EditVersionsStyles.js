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
	flex-direction: column;
	justify-content: center;
	margin: auto;
	flex: 0;
	width: ${(props) => props.width || '60%'};
	text-align: center;
	border: 1px solid grey;
	padding: 1rem;
`;

const CenteredDiv = styled.div`
	display: flex;
	margin: auto;
	justify-content: center;
	padding: 1rem;
`;

export { GameLogosContainer, VersionForm, CenteredDiv };
