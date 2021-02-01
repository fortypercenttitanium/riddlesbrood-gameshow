export default function importAll(r) {
	const videos = {};
	r.keys().forEach((item) => {
		videos[item.replace('./', '')] = r(item);
	});
	return videos;
}
