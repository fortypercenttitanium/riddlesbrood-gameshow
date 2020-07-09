import React, { Component } from 'react';
import styled from 'styled-components';

const GameLogoDiv = styled.div`
	grid-area: 1 / 2 / 2 / 4;
	height: 100%;
	width: 100%;
	text-align: center;
`;

export class GameLogo extends Component {
	render() {
		const { logo } = this.props;
		return (
			<GameLogoDiv>
				<img
					src={logo ? `images/${logo}` : 'images/RB Logo.jpg'}
					alt=''
					style={{
						height: '120px',
						maxWidth: '100%',
						margin: 'auto',
					}}
				/>
			</GameLogoDiv>
		);
	}
}

export default GameLogo;
