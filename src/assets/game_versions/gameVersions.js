const { ipcRenderer } = window.require('electron');

export default async function getGameVersions(config = {}) {
	const { filtered, game } = config;
	const versions = await ipcRenderer.invoke('GET_GAME_VERSIONS', 'all');
	const filteredVersions = {};
	Object.keys(versions).forEach((version) => {
		filteredVersions[version] = versions[version].map((versionObj) => {
			return {
				title: versionObj.title,
				rating: versionObj.rating,
			};
		});
	});
	return filtered ? filteredVersions : game ? versions[game] : versions;
}
