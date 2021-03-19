export default function importAll(r) {
	const files = {};
	r.keys().forEach((item) => {
		r(item).default
			? (files[item.replace('./', '')] = r(item).default)
			: (files[item.replace('./', '')] = r(item));
	});
	return files;
}
