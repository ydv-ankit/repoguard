const fs = require('fs');
const { tokenFilepath, tokenFilename } = require('./constants');
const { LogError, LogSuccess } = require('./Logger');

const getGithubToken = () => {
	try {
		const fileContent = fs.readFileSync(
			`${tokenFilepath}/${tokenFilename}`,
			{
				encoding: 'utf-8'
			}
		);
		return fileContent;
	} catch (err) {
		LogError(
			'No token found. Please run `repoguard configure` to set a token.'
		);
		process.exit(1);
	}
};

const setGithubToken = token => {
	try {
		if (!fs.existsSync(tokenFilepath)) {
			try {
				fs.mkdirSync(tokenFilepath, { recursive: true });
			} catch (error) {
				LogError('failed to create token directory');
				return false;
			}
		}
		fs.writeFileSync(tokenFilepath + tokenFilename, token);
		LogSuccess(
			'Token added successfully\nrun `repoguard help` to view available commands'
		);
		return true;
	} catch (err) {
		throw new Error('failed to add token');
	}
};

const removeGithubToken = () => {
	try {
		fs.unlinkSync(`${tokenFilepath}/${tokenFilename}`);
		LogSuccess('Token removed');
		return true;
	} catch (err) {
		LogError('failed to remove token');
	}
};

module.exports = { getGithubToken, setGithubToken, removeGithubToken };
