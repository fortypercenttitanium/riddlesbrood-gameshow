const { ipcRenderer } = window.require('electron');

export default async function getAllGameVersions() {
	return await ipcRenderer.invoke('GET_ALL_GAME_VERSIONS');
}
