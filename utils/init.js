const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = () => {
	unhandled();
	welcome({
		title: `repoguard`,
		tagLine: `- Ankit Ydv`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#0778FF',
		color: '#000000',
		bold: true,
		clear: false
	});
};
