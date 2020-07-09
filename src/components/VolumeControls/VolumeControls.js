import React, { Component } from 'react';
import VolumeSlider from './VolumeSlider';

export class VolumeControls extends Component {
	render() {
		return (
			<div
				style={{
					gridArea: '2 / 1 / 4 / 4',
					border: '1px solid black',
				}}
			>
				<VolumeSlider
					volume={this.props.volume}
					changeVolume={this.props.changeVolume}
					label='Master volume'
					type='master'
				/>
				<VolumeSlider
					volume={this.props.volume}
					changeVolume={this.props.changeVolume}
					label='Music volume'
					type='music'
				/>
				<VolumeSlider
					volume={this.props.volume}
					changeVolume={this.props.changeVolume}
					label='Sound FX volume'
					type='sfx'
				/>
			</div>
		);
	}
}

export default VolumeControls;
