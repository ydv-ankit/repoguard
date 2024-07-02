const { LogError } = require('../utils/Logger');
const { setGithubToken } = require('../utils/token');

const setGithubTokenCmd = async () => {
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
			setGithubToken(token);
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
