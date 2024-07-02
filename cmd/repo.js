const prompts = require('prompts');
const { createGithubClient } = require('../config/githubClientInstance');
const { LogError } = require('../utils/Logger');

const getGithubUserRepoInfoCmd = async flags => {
	const client = createGithubClient();
	if (flags.all && flags.username) {
		client.repos.list(flags.username);
		return;
	} else if (!flags.username) {
		LogError('Please provide a username');
		return;
	} else if (!flags.repo) {
		LogError('Please provide a repository name');
		return;
	}
	// fetch user repo info
	client.repos.get({
		owner: flags.username,
		repo: flags.repo
	});
};

const deleteGithubRepoCmd = async flags => {
	const client = createGithubClient();
	if (!flags.username) {
		LogError('Please provide a username');
		return;
	}
	if (!flags.repo) {
		LogError('Please provide a repository name');
		return;
	}
	client.repos.delete({
		owner: flags.username,
		repo: flags.repo
	});
};

const createGithubRepoCmd = async () => {
	const client = createGithubClient();
	const repo_ques = [
		{
			type: 'text',
			name: 'name',
			message: 'Repository name?',
			validate: value =>
				value !== null && value !== ''
					? true
					: 'Repository name required'
		},
		{
			type: 'text',
			name: 'description',
			message: 'Description?'
		},
		{
			type: 'confirm',
			name: 'private',
			message: 'Make this repo private?',
			initial: false
		},
		{
			type: 'text',
			name: 'homepage',
			message: 'Homepage?'
		}
	];
	prompts(repo_ques)
		.then(repo_details => {
			client.repos.create(repo_details);
		})
		.catch(error => {
			return null;
		});
};

const updateGithubRepoCmd = async flags => {
	const client = createGithubClient();
	if (!flags.username) {
		LogError('Please provide a username');
		return;
	}
	if (!flags.repo) {
		LogError('Please provide a repository name');
		return;
	}
	const repo_ques = [
		{
			type: 'text',
			name: 'name',
			message: 'Repository name?',
			validate: value =>
				value !== null && value !== ''
					? true
					: 'Repository name required'
		},
		{
			type: 'text',
			name: 'description',
			message: 'Description?'
		},
		{
			type: 'text',
			name: 'homepage',
			message: 'Homepage?'
		},
		{
			type: 'select',
			name: 'visibility',
			message: 'Make this repo public or private?',
			choices: [
				{
					title: 'public',
					value: 'public'
				},
				{
					title: 'private',
					value: 'private'
				}
			],
			initial: 1
		}
	];
	prompts(repo_ques)
		.then(repo_details => {
			client.repos.update({
				owner: flags.username,
				repo: flags.repo,
				updates: repo_details
			});
		})
		.catch(error => {
			return null;
		});
};

module.exports = {
	getGithubUserRepoInfoCmd,
	deleteGithubRepoCmd,
	createGithubRepoCmd,
	updateGithubRepoCmd
};
