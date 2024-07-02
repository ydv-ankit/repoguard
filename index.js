#!/usr/bin/env node

const init = require('./utils/init');
const cli = require('./utils/cli');
const { setGithubTokenCmd, getGithubUserRepoInfoCmd, deleteGithubRepoCmd, createGithubRepoCmd } = require('./cmd/cmd');
const chalk = require('chalk');
const input = cli.input;
const flags = cli.flags;

(async () => {
	// commands to be implemented
	// set token
	switch (true) {
		case input.length === 0 && Object.keys(flags).length === 1:
			init();
			break;
		case input.includes('help'):
			cli.showHelp(0);
			break;
		case input.includes('configure'):
			await setGithubTokenCmd();
			break;
		case input.includes('remove'):
			await removeGithubAuthTokenCmd();
			break;
		case input.includes('info'):
			await getGithubUserRepoInfoCmd(flags);
			break;
		case input.includes('delete'):
			await deleteGithubRepoCmd(flags);
			break;
		case input.includes('create'):
			await createGithubRepoCmd(flags);
			break;
		default:
			console.log(chalk.red('Invalid command'));
	}
})();
