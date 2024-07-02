const prompts = require('prompts');
const { loadOra } = require('../utils/ora-spinner');
const { setGithubToken } = require('../utils/token');
const { createGithubClient } = require('../config/githubClientInstance');

const setGithubTokenCmd = async () => {
	const ora = await loadOra();
	const spinner = ora();
	const getToken = async () => {
		const response = await prompts({
			type: 'text',
			name: 'token',
			message: 'GitHub Auth Token: ',
			validate: value =>
				value !== null && value !== '' ? true : 'Please enter a token'
		});
		return response.token;
	};
	getToken()
		.then(token => {
			spinner.start('Setting GitHub Token');
			setGithubToken(token);
			spinner.succeed('GitHub Token added');
		})
		.catch(error => {
			spinner.fail('Failed to add GitHub Token');
		});
};

const removeGithubAuthTokenCmd = async () => {
	const ora = await loadOra();
	const spinner = ora();
	spinner.start('Removing GitHub Token');
	setGithubToken('');
	spinner.succeed('GitHub Token removed');
};

const getGithubUserRepoInfoCmd = async flags => {
	const client = createGithubClient();
	console.log('flags:', flags);
	const ora = await loadOra();
	const spinner = ora();
	spinner.start('Fetching GitHub User Repo Info\n');
	if (!flags.username) {
		spinner.fail('Please provide a username');
		// return;
	}
	if (!flags.repository) {
		spinner.fail('Please provide a repository name');
		// return;
	}
	// fetch user repo info
};

module.exports = {
	setGithubTokenCmd,
	removeGithubAuthTokenCmd,
	getGithubUserRepoInfoCmd
};
