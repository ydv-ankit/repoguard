const { createGithubClient } = require('../config/githubClientInstance');
const { LogError } = require('../utils/Logger');

const getUsers = args => {
	let users = Array();
	let isUser = false;
	for (let index = 0; index < args.length; index++) {
		if (args[index] === '--users') {
			isUser = true;
			continue;
		} else if (args[index].includes('-')) {
			isUser = false;
		} else if (isUser) {
			users.push(args[index]);
		}
	}
	return users;
};

const githubRepoCollaboratorsCmd = async flags => {
	const client = createGithubClient();
	if (!flags.owner || !flags.repo) {
		LogError('Owner and repo are required');
		return;
	}
	// get collaborators
	if (flags.get && !flags.invite) {
		if (flags.all) {
			client.collaborators.getAll({
				owner: flags.owner,
				repo: flags.repo
			});
		} else if (flags.username) {
			client.collaborators.getUser({
				owner: flags.owner,
				repo: flags.repo,
				username: flags.username
			});
		} else {
			LogError('username or all flag is required to get collaborators');
			return;
		}
	} else if (flags.add) {
		if (flags.users) {
			client.collaborators.addUsers({
				owner: flags.owner,
				repo: flags.repo,
				users: getUsers(process.argv.slice(3))
			});
		} else {
			LogError('users flag is required to add collaborators');
			return;
		}
	} else if (flags.remove && !flags.invite) {
		if (flags.users) {
			client.collaborators.removeUsers({
				owner: flags.owner,
				repo: flags.repo,
				users: getUsers(process.argv.slice(3))
			});
		} else {
			LogError('users flag is required to remove collaborators');
			return;
		}
	} else if (flags.invite) {
        if (flags.get) {
            client.collaborators.getInvites({
                owner: flags.owner,
				repo: flags.repo
			});
		} else if (flags.rm) {
			client.collaborators.removeInvitation({
                owner: flags.owner,
				repo: flags.repo,
                invite_id: flags.rm
			});
		}else{
            LogError('get flag or rm flag with invite id is required');
        }
	} else {
        LogError('not get flag');
	}
};

module.exports = {
	githubRepoCollaboratorsCmd
};
