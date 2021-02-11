import React from 'react';
import {
	ReturnButton,
	ButtonsWrapper,
	Header,
	HeaderWrapper,
} from '../styles/TemplateStyles';
import { returnToEditSelect, returnToInit } from '../helpers/timelines';

function EditContentTemplate({ timeline, setTimeline, title, children }) {
	const returnClickSettings = () => {
		returnToEditSelect(setTimeline);
	};
	const returnClickHome = () => {
		returnToInit(setTimeline);
	};

	return (
		<div>
			<HeaderWrapper>
				<Header>{title}</Header>
			</HeaderWrapper>
			{children}
			<div>
				{timeline !== 'init' && (
					<ButtonsWrapper>
						{timeline !== 'edit-select' && (
							<ReturnButton onClick={returnClickSettings}>
								Return to settings menu
							</ReturnButton>
						)}
						<ReturnButton onClick={returnClickHome}>
							Return to home menu
						</ReturnButton>
					</ButtonsWrapper>
				)}
			</div>
		</div>
	);
}

export default EditContentTemplate;
