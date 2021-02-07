import styled from 'styled-components';

const EditContainer = styled.div`
	margin: auto;
	width: 60%;
	display: flex;
	flex-direction: column;
`;

const EditHeaderWrapper = styled.div`
	margin: 2rem auto;
	text-align: center;
	display: flex;
`;

const EditSelectBoxWrapper = styled.div`
	margin: 1rem auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	width: 70%;
`;

const EditButtonsWrapper = styled.div`
	margin: auto;
	text-align: center;
	display: flex;
	justify-items: center;
	margin: 2rem auto;
`;

const EditHeader = styled.h1`
	margin: auto;
	font-weight: bold;
`;

const EditMiniHeader = styled.h2`
	margin: 1rem auto;
	border: 1px solid white;
	padding: 1rem;
	cursor: pointer;
	border-radius: 10px;
	color: #222;
	transition: 0.3s;
	&:hover {
		background: #eee;
		color: black;
		transition: 0.3s;
	}
`;

const EditSelect = styled.select`
	width: 90%;
	margin: auto;
	border: 1px solid red;
`;

const EditButtonDiv = styled.div`
	display: flex;
	padding: 0.3rem;
	text-align: center;
`;

const EditButtonText = styled.h3`
	margin: auto;
	font-size: 1rem;
`;

const EditButton = styled.button`
	margin: 1rem auto auto 2rem;
`;

const EditInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto 0;
	background: #eee;
	padding: 2rem;
	border: 1px solid green;
`;

const EditInputLabel = styled.label`
	margin: 1rem 0 0.5rem 2rem;
`;

const EditInput = styled.input`
	margin-left: 2rem;
`;

const EditForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 2rem;
`;

export {
	EditButtonDiv,
	EditButtonText,
	EditButtonsWrapper,
	EditContainer,
	EditHeader,
	EditHeaderWrapper,
	EditSelect,
	EditSelectBoxWrapper,
	EditInputWrapper,
	EditMiniHeader,
	EditButton,
	EditInputLabel,
	EditInput,
	EditForm,
};
