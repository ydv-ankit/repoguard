#!/usr/bin/env node

const init = require('./utils/init');
const cli = require('./utils/cli');
const {
	deleteGithubRepoCmd,
	createGithubRepoCmd,
	getGithubUserRepoInfoCmd,
	updateGithubRepoCmd
} = require('./cmd/repo');
const { removeGithubAuthTokenCmd, setGithubTokenCmd } = require('./cmd/token');
const chalk = require('chalk');
const { githubRepoCollaboratorsCmd } = require('./cmd/colab');
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
			getGithubUserRepoInfoCmd(flags);
			break;
		case input.includes('delete'):
			await deleteGithubRepoCmd(flags);
			break;
		case input.includes('create'):
			await createGithubRepoCmd(flags);
			break;
		case input.includes('update'):
			updateGithubRepoCmd(flags)
			break;
		case input.includes('colab'):
			githubRepoCollaboratorsCmd(flags);
			break;
		default:
			console.log(chalk.red('invalid command'));
			cli.showHelp(1);
	}
})();
