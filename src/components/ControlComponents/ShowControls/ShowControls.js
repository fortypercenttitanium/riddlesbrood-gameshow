import React from 'react';
import projector from '../../../assets/images/icons/projector.png';
import {
	ShowControlsDiv,
	Button,
	Label,
	ProjectorImage,
} from './ShowControlsStyles';

export default function ShowControls({ projectorMode }) {
	return (
		<ShowControlsDiv>
			<Button area='1 / 1 / 2 / 2'>
				<Label>Preshow</Label>
			</Button>
			<Button area='2 / 1 / 3 / 2'>
				<Label>5 mins</Label>
			</Button>
			<Button area='1 / 2 / 2 / 3'>
				<Label>
					START
					<br />
					SHOW
				</Label>
			</Button>
			<Button area='2 / 2 / 3 / 3'>
				<Label>
					END
					<br />
					SHOW
				</Label>
			</Button>
			<Button area='1 / 3 / 2 / 4'>
				<Label>
					INTER
					<br />
					MISSION
				</Label>
			</Button>
			<Button area='2 / 3 / 3 / 4'>
				<ProjectorImage src={projector} alt='' onClick={projectorMode} />
			</Button>
		</ShowControlsDiv>
	);
}
