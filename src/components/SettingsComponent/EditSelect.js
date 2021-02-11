import React, { useEffect } from 'react';

function EditSelect({ setTimeline, setTitle }) {
	useEffect(() => {
		setTitle('Select an option:');
	}, [setTitle]);

	const handleFx = () => {
		setTimeline('edit-fx');
	};
	const handleVersions = () => {
		setTimeline('edit-game-versions');
	};

	return (
		<div>
			<button onClick={handleFx}>Add/remove FX</button>
			<button onClick={handleVersions}>Game versions</button>
		</div>
	);
}

export default EditSelect;
