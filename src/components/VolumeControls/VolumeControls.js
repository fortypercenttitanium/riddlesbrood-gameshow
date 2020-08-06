import React from 'react';
import VolumeSlider from './VolumeSlider';

export default function VolumeControls() {
	return (
		<div
			style={{
				gridArea: '2 / 1 / 4 / 4',
				border: '1px solid black',
			}}
		>
			<VolumeSlider label='Master volume' type='master' />
			<VolumeSlider label='Music volume' type='music' />
			<VolumeSlider label='Sound FX volume' type='sfx' />
		</div>
	);
}
