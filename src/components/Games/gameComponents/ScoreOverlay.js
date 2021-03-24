import React from 'react';
import styled from 'styled-components';

const ScoreOverlayContainer = styled.div`
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	color: white;

	.pa {
		position: absolute;
	}

	.f {
		display: flex;
	}

	.a0 {
		top: 0;
		left: 0;
	}
	.a1 {
		top: 0;
		right: 0;
	}

	.a2 {
		bottom: 0;
		left: 0;
	}

	.a3 {
		bottom: 0;
		right: 0;
	}

	.bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		justify-content: center;
	}
`;

function ScoreOverlay({ ScoreComponent, position, score }) {
	return position === 'corners' ? (
		<ScoreOverlayContainer className='f pa'>
			{score.scoreBoard.map((scoreNumber, index) => {
				return (
					<div key={index} className={`a${index} pa f`}>
						<ScoreComponent
							player={index + 1}
							score={scoreNumber}
							type={score.type}
						/>
					</div>
				);
			})}
		</ScoreOverlayContainer>
	) : position === 'bottom' ? (
		<ScoreOverlayContainer className='f pa'>
			<div className='f bottom'>
				{score.scoreBoard.map((scoreNumber, index) => {
					return (
						<ScoreComponent
							key={index}
							player={index + 1}
							score={scoreNumber}
							type={score.type}
						/>
					);
				})}
			</div>
		</ScoreOverlayContainer>
	) : null;
}

export default ScoreOverlay;
