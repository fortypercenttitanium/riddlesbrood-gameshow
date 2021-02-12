import React from 'react';
// import Couples from '../GameVersionForms';
// import ESP from '../GameVersionForms';
// import FamilyFeud from '../GameVersionForms';
// import Jeopardy from '../GameVersionForms';
// import Pyramid from '../GameVersionForms';
// import WhatIsIt from '../GameVersionForms';
// import Wheel from '../GameVersionForms';

export default function renderVersionForm(game) {
	switch (game) {
		case 'couples': {
			return <p>Couples</p>;
		}
		case 'esp': {
			return <p>esp</p>;
		}
		case 'familyFeud': {
			return <p>familyFeud</p>;
		}
		case 'jeopardy': {
			return <p>jeopardy</p>;
		}
		case 'pyramid': {
			return <p>pyramid</p>;
		}
		case 'whatTheHellIsIt': {
			return <p>whatTheHellIsIt</p>;
		}
		case 'wheel': {
			return <p>wheel</p>;
		}
		default: {
			return <h2>Error</h2>;
		}
	}
}
