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
	margin: auto;
`;

const ButtonsWrapper = styled.div`
	margin: 3rem auto;
	width: 50%;
	text-align: center;
	display: flex;
	justify-items: center;
`;

export { ReturnButton, ButtonsWrapper, HeaderWrapper, Header };
