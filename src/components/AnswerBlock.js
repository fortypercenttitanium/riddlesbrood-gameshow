import React, { Component } from 'react';
import styled from 'styled-components';

const AnswerBlockDiv = styled.div`
	grid-area: 7 / 4 / 8 / 11;
	height: 100%;
	width: 1050px;
	background: url(images/answerblock.png);
	background-size: contain;
	margin: auto;
`;

export class AnswerBlock extends Component {
	render() {
		return <AnswerBlockDiv>{this.props.answer}</AnswerBlockDiv>;
	}
}

export default AnswerBlock;
