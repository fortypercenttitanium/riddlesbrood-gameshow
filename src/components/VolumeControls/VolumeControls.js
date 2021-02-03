import React from 'react';
import VolumeSlider from './VolumeSlider';
import VolumeControlsDiv from './VolumeControlsStyles';

export default function VolumeControls() {
	return (
		<VolumeControlsDiv>
			<VolumeSlider label='Master volume' type='master' />
			<VolumeSlider label='Music volume' type='music' />
			<VolumeSlider label='Sound FX volume' type='sfx' />
		</VolumeControlsDiv>
	);
}
