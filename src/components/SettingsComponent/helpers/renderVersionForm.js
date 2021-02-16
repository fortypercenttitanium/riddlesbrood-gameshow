import React from 'react';
import NameThatTune from '../GameVersionForms/NameThatTune';
import Couples from '../GameVersionForms/Couples';
import ESP from '../GameVersionForms/ESP';
import FamilyFeud from '../GameVersionForms/FamilyFeud';
import Jeopardy from '../GameVersionForms/Jeopardy';
import Pyramid from '../GameVersionForms/Pyramid';
import WhatIsIt from '../GameVersionForms/WhatIsIt';
import Wheel from '../GameVersionForms/Wheel';

export default function renderVersionForm(game, props) {
	const { formData, handleContentChange } = props;
	switch (game) {
		case 'couples': {
			return (
				<Couples
					formData={formData}
					handleContentChange={handleContentChange}
				/>
			);
		}
		case 'esp': {
			return (
				<ESP formData={formData} handleContentChange={handleContentChange} />
			);
		}
		case 'familyFeud': {
			return (
				<FamilyFeud
					formData={formData}
					handleContentChange={handleContentChange}
				/>
			);
		}
		case 'jeopardy': {
			return (
				<Jeopardy
					formData={formData}
					handleContentChange={handleContentChange}
				/>
			);
		}
		case 'nameThatTune': {
			return (
				<NameThatTune
					formData={formData}
					handleContentChange={handleContentChange}
				/>
			);
		}
		case 'pyramid': {
			return (
				<Pyramid
					formData={formData}
					handleContentChange={handleContentChange}
				/>
			);
		}
		case 'whatTheHellIsIt': {
			return (
				<WhatIsIt
					formData={formData}
					handleContentChange={handleContentChange}
				/>
			);
		}
		case 'wheel': {
			return (
				<Wheel formData={formData} handleContentChange={handleContentChange} />
			);
		}
		default: {
			return <h2>Error</h2>;
		}
	}
}
