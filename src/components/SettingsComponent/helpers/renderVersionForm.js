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
	const { formData, setFormData, selectedGame } = props;
	switch (game) {
		case 'couples': {
			return (
				<Couples
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'esp': {
			return (
				<ESP
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'familyFeud': {
			return (
				<FamilyFeud
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'jeopardy': {
			return (
				<Jeopardy
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'nameThatTune': {
			return (
				<NameThatTune
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'pyramid': {
			return (
				<Pyramid
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'whatTheHellIsIt': {
			return (
				<WhatIsIt
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		case 'wheel': {
			return (
				<Wheel
					formData={formData}
					setFormData={setFormData}
					selectedGame={selectedGame}
				/>
			);
		}
		default: {
			return <h2>Error</h2>;
		}
	}
}
