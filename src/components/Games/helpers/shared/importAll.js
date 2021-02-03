export default function importAll(r) {
	const files = {};
	r.keys().forEach((item) => {
		files[item.replace('./', '')] = r(item);
	});
	return files;
}
