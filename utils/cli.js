const meow = require('meow');
const meowHelp = require('../cli-help/index');

const flags = {
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `print CLI version`
	},
	repo: {
		type: `string`,
		alias: `r`,
		desc: `repository name`
	},
	username: {
		type: `string`,
		alias: `u`,
		desc: `username`
	}
};

const commands = {
	help: { desc: `print this help info` },
	info: {
		flags: {
			r: 'repository name',
			u: 'username'
		},
		desc: `print info about repository`
	},
	configure: { desc: `configure GitHub token` },
	remove: { desc: `remove GitHub token` }
};

const helpText = meowHelp({
	name: `repoguard`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
