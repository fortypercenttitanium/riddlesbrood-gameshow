import React from 'react';
import NameThatTune from '../GameVersionForms/NameThatTune';
import Couples from '../GameVersionForms/Couples';
import ESP from '../GameVersionForms/ESP';
import FamilyFeud from '../GameVersionForms/FamilyFeud';
import Jeopardy from '../GameVersionForms/Jeopardy';
import Pyramid from '../GameVersionForms/Pyramid';
import WhatIsIt from '../GameVersionForms/WhatIsIt';
import Wheel from '../GameVersionForms/Wheel';

export default function renderVersionForm(
	game,
	{ formData, handleContentChange, assets, setAssets }
) {
	switch (game) {
		case 'couples': {
			return (
				<Couples
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
				/>
			);
		}
		case 'esp': {
			return (
				<ESP
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
				/>
			);
		}
		case 'familyFeud': {
			return (
				<FamilyFeud
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
				/>
			);
		}
		case 'jeopardy': {
			return (
				<Jeopardy
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
					assets={assets}
				/>
			);
		}
		case 'nameThatTune': {
			return (
				<NameThatTune
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
					assets={assets}
				/>
			);
		}
		case 'pyramid': {
			return (
				<Pyramid
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
				/>
			);
		}
		case 'whatTheHellIsIt': {
			return (
				<WhatIsIt
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
					assets={assets}
				/>
			);
		}
		case 'wheel': {
			return (
				<Wheel
					formData={formData}
					handleContentChange={handleContentChange}
					setAssets={setAssets}
				/>
			);
		}
		default: {
			return <h2>Error</h2>;
		}
	}
}
