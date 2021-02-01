import React from 'react';
import {
	VersionSelectDiv,
	VersionSelect,
	VersionH1,
	VersionOption,
} from './GamesMenuModalStyles';

function VersionSelection({ rating, gamesArray, optionHandler, title }) {
	return (
		<VersionSelectDiv>
			<VersionH1>
				{rating !== 'kids' && 'Rated'} {rating.toUpperCase()}
			</VersionH1>
			<VersionSelect size='10'>
				{gamesArray
					.find((game) => game.title === title)
					.versions.map((gameVer, gameVerIndex) => {
						return (
							gameVer.rating === rating && (
								<VersionOption
									key={gameVerIndex}
									onClick={(e) => {
										optionHandler(e, title, gameVerIndex, rating);
									}}
								>
									{gameVer.title}
								</VersionOption>
							)
						);
					})}
			</VersionSelect>
		</VersionSelectDiv>
	);
}

export default VersionSelection;
