const { LogError } = require('../utils/Logger');
const { getGithubToken } = require('../utils/token');
const { GithubClient } = require('./github-client');

const createGithubClient = () => {
	const token = getGithubToken();
	return new GithubClient(token);
};

module.exports = { createGithubClient };
