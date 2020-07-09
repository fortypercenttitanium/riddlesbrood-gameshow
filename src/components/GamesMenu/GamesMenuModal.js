import React, { Component } from 'react';
import styled from 'styled-components';
import { gamesArray } from '../Games/gamesArray';

const ModalContainer = styled.div`
	display: ${(props) => (props.open ? 'flex' : 'none')};
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
`;

const GamesMenuModalDiv = styled.div`
	position: absolute;
	display: flex;
	flex-wrap: wrap;
	width: 60%;
	max-height: 60%;
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	text-align: center;
	background: #e2e0cb;
	border: 1px solid black;
	z-index: 3;
`;

const GameButton = styled.div`
	width: 25%;
	padding: 1rem;
	border: 1px solid white;
	margin: auto;
	text-align: center;
	cursor: pointer;
	user-select: none;
	&:hover {
		background-color: white;
		transition: 0.8s;
	}
`;

const GameTitle = styled.h1`
	font-size: 2rem;
`;

export class GamesMenuModal extends Component {
	handleOutsideClick = (e) => {
		this.props.close();
	};
	handleModalClick = (e) => {
		e.stopPropagation();
	};
	handleGameClick = (game) => {
		this.props.setGame(game);
		this.props.close();
	};
	render() {
		return (
			<ModalContainer open={this.props.open} onClick={this.handleOutsideClick}>
				<GamesMenuModalDiv onClick={this.handleModalClick}>
					{gamesArray.map((game, index) => {
						return (
							<GameButton
								key={index}
								onClick={() => {
									this.handleGameClick(game);
								}}
							>
								<GameTitle>{game.title}</GameTitle>
							</GameButton>
						);
					})}
				</GamesMenuModalDiv>
			</ModalContainer>
		);
	}
}

export default GamesMenuModal;
