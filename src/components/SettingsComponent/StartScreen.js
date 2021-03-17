import React, { useState } from 'react';
import Init from './Init';
import EditSelect from './EditSelect';
import EditFx from './EditFx';
import EditGameVersions from './EditGameVersions';
import { StartScreenContainer } from './styles/StartScreenStyles';
import EditContentTemplate from './templates/EditContentTemplate';

function StartScreen() {
	const [timeline, setTimeline] = useState('init');
	const [title, setTitle] = useState('Riddlesbrood Gameshow');

	const render = (timeline) => {
		return timeline === 'init' ? (
			<Init setTimeline={setTimeline} setTitle={setTitle} />
		) : timeline === 'edit-select' ? (
			<EditSelect setTimeline={setTimeline} setTitle={setTitle} />
		) : timeline === 'edit-fx' ? (
			<EditFx setTimeline={setTimeline} setTitle={setTitle} />
		) : timeline === 'edit-game-versions' ? (
			<EditGameVersions setTimeline={setTimeline} setTitle={setTitle} />
		) : null;
	};

	return (
		<StartScreenContainer>
			<EditContentTemplate
				title={title}
				timeline={timeline}
				setTimeline={setTimeline}
			>
				{render(timeline)}
			</EditContentTemplate>
		</StartScreenContainer>
	);
}

export default StartScreen;
