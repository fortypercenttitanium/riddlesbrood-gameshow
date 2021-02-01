import styled from 'styled-components';

const PyramidHomeScreen = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	background-color: ${(props) =>
		props.team === 0 ? '#999' : props.team === 1 ? '#710e0e' : '#0e1871'};
	flex-direction: column;
	text-align: center;
	position: relative;
`;

const Title = styled.h1`
	flex: 1;
	margin: 1% auto;
	padding: 1rem;
	color: #ddd;
`;

const TurnContainer = styled.div`
	display: flex;
	flex: 1;
	width: 100%;
	margin: auto;
`;

const Container = styled.div`
	display: flex;
	flex-grow: 5;
	flex-direction: row;
	width: 100%;
`;

const ModalContainer = styled(Container)`
	flex-grow: 1;
`;

const VerticalStack = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	background: rgb(230, 230, 230);
	color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
`;

const CategoryContainer = styled.div`
	display: grid;
	grid-template-areas:
		'cat1 cat2'
		'cat3 cat4';
	grid-gap: 5px;
	width: 40%;
	margin: auto;
`;

const CategoryCard = styled.div`
	background-size: cover;
	height: 80px;
	background-image: url('media/images/pyramid-box.png');
	grid-area: ${(props) => props.gridArea};
	text-align: center;
	display: ${(props) => (props.done ? 'none' : 'flex')};
	cursor: pointer;
	&:hover {
		color: white;
	}
`;

const Span = styled.span`
	margin: auto;
	font-size: 1rem;
	font-weight: bold;
`;

const Modal = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	color: #ddd;
	background-color: inherit;
	text-align: center;
	cursor: pointer;
	display: ${(props) => (props.display === 'board' ? 'none' : 'flex')};
	flex-direction: column;
`;

const Button = styled.div`
	color: #eee;
	background: ${(props) =>
		props.type === 'correct'
			? 'rgb(97, 165, 85)'
			: props.type === 'incorrect'
			? 'rgb(167, 68, 57)'
			: '#000'};
	padding: 1rem 0;
	width: 20%;
	margin: auto;
	font-weight: bold;
	&:hover {
		opacity: 0.8;
	}
`;

const ModalDiv = styled.div`
	margin: auto;
	padding: 0;
	flex: 1;
	display: flex;
`;

const H1 = styled.h1`
	margin: auto;
	font-size: 2rem;
`;

const H2 = styled.h2`
	margin: auto;
	padding: 1rem;
	font-size: 1.5rem;
`;

const TeamButton = styled.div`
	background-color: ${(props) => (props.team === 1 ? 'red' : 'blue')};
	border: ${(props) => (props.team === 1 ? '3px solid red' : '3px solid blue')};
	color: white;
	padding: 1rem;
	margin: auto;
	cursor: pointer;
	border-color: ${(props) => props.activeTeam === props.team && 'white'};
	&:hover {
		border-color: rgba(255, 255, 255, 0.8);
	}
`;

export {
	PyramidHomeScreen,
	Title,
	TurnContainer,
	Container,
	ModalContainer,
	VerticalStack,
	ScoreContainer,
	CategoryContainer,
	CategoryCard,
	Span,
	Modal,
	Button,
	ModalDiv,
	H1,
	H2,
	TeamButton,
};
