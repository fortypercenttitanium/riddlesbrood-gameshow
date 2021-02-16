const { ipcRenderer } = window.require('electron');

export default async function getAllGameVersions() {
	const versions = await ipcRenderer.invoke('GET_GAME_VERSIONS', 'all');
	return versions;
}
