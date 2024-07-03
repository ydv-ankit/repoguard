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
	},
	all: {
		type: `boolean`,
		alias: `a`,
		desc: `get all repositories`
	}
};

const commands = {
	help: { desc: `print this help info` },
	configure: { desc: `configure GitHub token` },
	remove: { desc: `remove GitHub token` },
	create: {
		desc: `create a repository`
	},
	info: {
		flags: {
			r: 'repository name',
			u: 'username',
			a: 'all repositories'
		},
		desc: `print info about repository`
	},
	delete: {
		flags: {
			r: 'repository'
		},
		desc: `delete a repository`
	},
	update:{
		flags: {
			r: 'repository',
			u: 'username'
		},
		desc: `update a repository`
	}
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
