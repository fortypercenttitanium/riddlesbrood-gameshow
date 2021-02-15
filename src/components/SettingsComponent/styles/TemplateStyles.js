import styled from 'styled-components';

const Header = styled.h1`
	margin: auto;
	font-weight: bold;
`;

const HeaderWrapper = styled.div`
	margin: 2rem auto;
	text-align: center;
	display: flex;
`;

const ReturnButton = styled.button`
	padding: 1rem;
	font-weight: bold;
	cursor: pointer;
	margin: auto 2rem;
`;

const ButtonsWrapper = styled.div`
	margin: 2rem auto;
	width: 80%;
	text-align: center;
	display: flex;
	justify-content: center;
	padding-top: 2rem;
	border-top: 1px solid rgba(0, 0, 0, 0.4);
`;

export { ReturnButton, ButtonsWrapper, HeaderWrapper, Header };
