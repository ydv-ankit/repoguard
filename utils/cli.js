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
	},
	owner: {
		type: `string`,
		alias: `o`,
		desc: `owner(user) of repository`
	},
	get: {
		type: `boolean`,
		desc: `get collaborator info`
	},
	add: {
		type: `boolean`,
		desc: `add repository collaborator(s)`
	},
	users: {
		type: `string`,
		desc: `users to add`,
		isMultiple: true
	},
	remove: {
		type: `boolean`,
		desc: `remove collaborator(s)`
	},
	invite: {
		type: `boolean`,
		alias: `i`,
		desc: `invite collaborator(s)`
	},
	rm: {
		type: `string`,
		desc: `remove collaborator invitation`
	},
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
	update: {
		flags: {
			r: 'repository',
			u: 'username'
		},
		desc: `update a repository`
	},
	colab: {
		flags: {
			r: 'repository',
			u: 'username',
			o: 'owner',
			a: 'all collaborators',
			i: 'get invited collaborators',
			rm: 'remove collaborator invitation',
			get: 'get collaborators',
			update: 'update collaborators',
			users: 'users to add/remove from collaborators',
			remove: 'remove collaborators'
		},
		desc: `manage repository collaborators`
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
