#!/usr/bin/env node

const init = require('./utils/init');
const cli = require('./utils/cli');
const { deleteGithubRepoCmd, createGithubRepoCmd, getGithubUserRepoInfoCmd } = require('./cmd/repo');
const { removeGithubAuthTokenCmd, setGithubTokenCmd } = require('./cmd/token');
const chalk = require('chalk');
const input = cli.input;
const flags = cli.flags;

(async () => {
	// commands to be implemented
	// set token
	switch (true) {
		case process.argv.length < 3:
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
			console.log(chalk.red('invalid command'));
			cli.showHelp(1);
	}
})();
