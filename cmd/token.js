const prompts = require('prompts');
const { LogError } = require('../utils/Logger');
const { setGithubToken } = require('../utils/token');

const setGithubTokenCmd = async () => {
	await prompts({
		type: 'password',
		name: 'token',
		message: 'GitHub Auth Token: ',
		validate: value =>
			value !== null && value !== '' ? true : 'Please enter a token'
	})
		.then(data=> {
			setGithubToken(data.token);
		})
		.catch(error => {
			LogError('Error setting GitHub Token');
		});
};

const removeGithubAuthTokenCmd = async () => {
	setGithubToken('');
};

module.exports = {
	setGithubTokenCmd,
	removeGithubAuthTokenCmd
};
