#!/usr/bin/env node

const init = require('./utils/init');
const cli = require('./utils/cli');
const { setGithubTokenCmd, getGithubUserRepoInfoCmd } = require('./cmd/cmd');
const chalk = require('chalk');
const input = cli.input;
const flags = cli.flags;
const { debug } = flags;

(async () => {
	init();
	input.includes(`help`) && cli.showHelp(0);
	// commands to be implemented
	// set token
	switch (true) {
		case input.includes('configure'):
			await setGithubTokenCmd();
			break;
		case input.includes('remove'):
			await removeGithubAuthTokenCmd();
			break;
		case input.includes('info'):
			await getGithubUserRepoInfoCmd(flags);
			break;
		default:
			console.log(chalk.red('Invalid command'));
	}
	// logs for debugging
	console.log('\n\ninput:', input);
	console.log('flags:', flags);
})();
