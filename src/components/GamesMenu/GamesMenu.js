import React, { Component } from 'react';
import styled from 'styled-components';

const GamesMenuDiv = styled.div`
	display: flex;
	background-color: #eef98b;
	width: 150px;
	height: 120px;
	border-right: 5px solid black;
	border-bottom: 5px solid black;
	border-radius: 0 0 90% 0;
	text-align: center;
	cursor: pointer;
	grid-area: 1 / 1 / 2 / 2;
`;

const Title = styled.h1`
	position: relative;
	right: 10px;
	font-size: 1.8rem;
`;

export class GamesMenu extends Component {
	clickHandler = () => {
		this.props.toggleGamesMenu();
	};
	render() {
		return (
			<GamesMenuDiv onClick={this.clickHandler}>
				<Title>Games Menu</Title>
			</GamesMenuDiv>
		);
	}
}

export default GamesMenu;
