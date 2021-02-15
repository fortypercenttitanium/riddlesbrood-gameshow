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
	const { formData, handleContentChange, selectedGame } = props;
	switch (game) {
		case 'couples': {
			return (
				<Couples
					formData={formData}
					handleContentChange={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'esp': {
			return (
				<ESP
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'familyFeud': {
			return (
				<FamilyFeud
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'jeopardy': {
			return (
				<Jeopardy
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'nameThatTune': {
			return (
				<NameThatTune
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'pyramid': {
			return (
				<Pyramid
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'whatTheHellIsIt': {
			return (
				<WhatIsIt
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'wheel': {
			return (
				<Wheel
					formData={formData}
					setFormData={handleContentChange}
					selectedGame={selectedGame}
				/>
			);
		}
		default: {
			return <h2>Error</h2>;
		}
	}
}
